import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Company } from "@/lib/content";
import { ImageUploader } from "./ImageUploader";
import { TextInput } from "./TextInput";

interface ClientsManagerProps {
  items: Company[];
  onChange: (items: Company[]) => void;
  disabled?: boolean;
  maxItems?: number;
}

export function ClientsManager({
  items,
  onChange,
  disabled,
  maxItems,
}: ClientsManagerProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addItem = () => {
    if (maxItems && items.length >= maxItems) return;
    onChange([...items, { logo: "", name: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: Company) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs uppercase tracking-[0.2em] text-taupe font-medium">
        Companies / Clients
      </label>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-charcoal/40 border border-amber-gold/30 rounded"
          >
            <div className="flex gap-3">
              {/* Logo Preview */}
              {item.logo && (
                <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden border border-amber-gold/30 bg-cream flex items-center justify-center">
                  <img
                    src={item.logo}
                    alt={item.name || `Company ${index + 1}`}
                    className="w-full h-full object-contain p-2"
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
                    {item.name || `Company #${index + 1}`}
                  </p>
                  <p className="text-xs text-cream/60 truncate">
                    {item.logo || "No logo uploaded"}
                  </p>
                </button>

                {/* Expanded Content */}
                {expandedIndex === index && (
                  <div className="mt-3 pt-3 border-t border-amber-gold/20 space-y-3">
                    <ImageUploader
                      value={item.logo}
                      onChange={(logo) => updateItem(index, { ...item, logo })}
                      label="Company Logo"
                    />
                    <TextInput
                      value={item.name}
                      onChange={(name) => updateItem(index, { ...item, name })}
                      label="Company Name"
                      placeholder="e.g., Acme Corporation"
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
        Add Company
      </button>
    </div>
  );
}
