import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Testimonial } from "@/lib/content";
import { ImageUploader } from "./ImageUploader";
import { TextInput } from "./TextInput";

interface TestimonialsManagerProps {
  items: Testimonial[];
  onChange: (items: Testimonial[]) => void;
  disabled?: boolean;
  maxItems?: number;
}

export function TestimonialsManager({
  items,
  onChange,
  disabled,
  maxItems,
}: TestimonialsManagerProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addItem = () => {
    if (maxItems && items.length >= maxItems) return;
    onChange([...items, { image: "", alt: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: Testimonial) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs uppercase tracking-[0.2em] text-taupe font-medium">
        Testimonial Images
      </label>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-charcoal/40 border border-amber-gold/30 rounded"
          >
            <div className="flex gap-3">
              {/* Image Preview */}
              {item.image && (
                <div className="flex-shrink-0 w-24 h-24 rounded overflow-hidden border border-amber-gold/30">
                  <img
                    src={item.image}
                    alt={item.alt || `Testimonial ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1">
                {/* Expand/Collapse Toggle */}
                <button
                  onClick={() =>
                    setExpandedIndex(
                      expandedIndex === index ? null : index
                    )
                  }
                  className="w-full text-left"
                >
                  <p className="text-sm text-cream font-medium">
                    Testimonial #{index + 1}
                  </p>
                  <p className="text-xs text-cream/60 truncate">
                    {item.image || "No image uploaded"}
                  </p>
                </button>

                {/* Expanded Content */}
                {expandedIndex === index && (
                  <div className="mt-3 pt-3 border-t border-amber-gold/20 space-y-3">
                    <ImageUploader
                      value={item.image}
                      onChange={(image) =>
                        updateItem(index, { ...item, image })
                      }
                      label="Testimonial Image"
                    />
                    <TextInput
                      value={item.alt || ""}
                      onChange={(alt) =>
                        updateItem(index, { ...item, alt })
                      }
                      label="Alt Text (optional)"
                      placeholder="Brief description of testimonial"
                    />
                  </div>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeItem(index)}
                disabled={disabled}
                className="flex-shrink-0 p-2 hover:bg-red-400/20 rounded transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        disabled={disabled || (maxItems && items.length >= maxItems)}
        className="flex items-center gap-2 px-3 py-2 bg-amber-gold/20 hover:bg-amber-gold/30 border border-amber-gold/50 rounded text-amber-gold text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Testimonial Image
      </button>
    </div>
  );
}
