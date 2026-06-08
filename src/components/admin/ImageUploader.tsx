import { useState, useRef } from "react";
import { uploadImage } from "@/lib/content";
import { Loader2, Upload, X } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  disabled?: boolean;
}

export function ImageUploader({ value, onChange, label, disabled }: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    setError("");
    setLoading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (e: any) {
      const errorMsg = typeof e === 'string' ? e : (e?.message || "Upload failed - please check console");
      console.error("ImageUploader error:", e);
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
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please drop an image file");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (e: any) {
      const errorMsg = typeof e === 'string' ? e : (e?.message || "Upload failed - please check console");
      console.error("ImageUploader drop error:", e);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs uppercase tracking-[0.2em] text-taupe font-medium">{label}</label>}

      <div
        onClick={() => !disabled && !loading && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed border-amber-gold/40 rounded p-6 text-center transition-colors ${
          !disabled && !loading ? "cursor-pointer hover:border-amber-gold/70" : ""
        } ${disabled || loading ? "opacity-60" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled || loading}
          className="hidden"
        />

        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-amber-gold animate-spin" />
            <p className="text-xs text-cream/70">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-amber-gold/60" />
            <p className="text-xs text-cream/70">Drag image here or click to upload</p>
            <p className="text-[10px] text-cream/50">Max 10MB</p>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {value && (
        <div className="relative rounded overflow-hidden bg-charcoal">
          <img src={value} alt="Preview" className="w-full h-40 object-cover" />
          <button
            onClick={() => onChange("")}
            disabled={disabled || loading}
            className="absolute top-2 right-2 p-1 bg-espresso/90 rounded hover:bg-espresso transition-colors"
          >
            <X className="w-4 h-4 text-amber-gold" />
          </button>
        </div>
      )}
    </div>
  );
}
