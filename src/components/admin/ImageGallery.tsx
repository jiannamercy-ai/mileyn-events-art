import { useState } from "react";
import { uploadImage } from "@/lib/content";
import { Upload, X, GripVertical, Loader2 } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  disabled?: boolean;
  maxImages?: number;
}

export function ImageGallery({ images, onChange, label, disabled, maxImages }: ImageGalleryProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    if (maxImages && images.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setError("");
    setLoading(true);
    try {
      const url = await uploadImage(file);
      onChange([...images, url]);
    } catch (e: any) {
      const errorMsg = typeof e === 'string' ? e : (e?.message || "Upload failed - please check console");
      console.error("ImageGallery upload error:", e);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) {
      setError("Please drop image files");
      return;
    }

    setError("");
    for (const file of files) {
      if (maxImages && images.length >= maxImages) break;

      if (file.size > 10 * 1024 * 1024) {
        setError("One or more files exceed 10MB limit");
        continue;
      }

      setLoading(true);
      try {
        const url = await uploadImage(file);
        onChange([...images, url]);
      } catch (e: any) {
        const errorMsg = typeof e === 'string' ? e : (e?.message || "Upload failed - please check console");
        console.error("ImageGallery drop error:", e);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onChange(newImages);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOverItem = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    moveImage(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      {label && <label className="block text-xs uppercase tracking-[0.2em] text-taupe font-medium">{label}</label>}

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed border-amber-gold/40 rounded p-6 text-center transition-colors ${
          !disabled && !loading ? "cursor-pointer hover:border-amber-gold/70" : ""
        } ${disabled || loading ? "opacity-60" : ""}`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled || loading || (maxImages ? images.length >= maxImages : false)}
          className="hidden"
          id="gallery-upload"
        />
        <label htmlFor="gallery-upload" className={!disabled && !loading ? "cursor-pointer" : ""}>
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-amber-gold animate-spin" />
              <p className="text-xs text-cream/70">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-amber-gold/60" />
              <p className="text-xs text-cream/70">Drag images here or click to upload</p>
              <p className="text-[10px] text-cream/50">Max 10MB per image</p>
              {maxImages && <p className="text-[10px] text-cream/50">{images.length}/{maxImages}</p>}
            </div>
          )}
        </label>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* Gallery Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] text-cream/50">{images.length} image(s) uploaded</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                draggable={!disabled && images.length > 1}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOverItem(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative rounded overflow-hidden bg-charcoal border border-amber-gold/20 transition-all ${
                  draggedIndex === index ? "opacity-50 border-amber-gold/60" : ""
                } ${!disabled && images.length > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
              >
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover" />

                {images.length > 1 && (
                  <div className="absolute top-2 left-2 p-1 bg-espresso/90 rounded">
                    <GripVertical className="w-3 h-3 text-amber-gold/60" />
                  </div>
                )}

                <button
                  onClick={() => removeImage(index)}
                  disabled={disabled}
                  className="absolute top-2 right-2 p-1 bg-espresso/90 rounded hover:bg-espresso transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
