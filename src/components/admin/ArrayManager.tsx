import { Plus, X, GripVertical } from "lucide-react";
import { useState } from "react";

interface ArrayManagerProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, onChange: (value: T) => void) => React.ReactNode;
  createNew: () => T;
  label?: string;
  disabled?: boolean;
  maxItems?: number;
}

export function ArrayManager<T>({
  items,
  onChange,
  renderItem,
  createNew,
  label,
  disabled,
  maxItems,
}: ArrayManagerProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addItem = () => {
    if (maxItems && items.length >= maxItems) return;
    onChange([...items, createNew()]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: T) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    onChange(newItems);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    moveItem(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      {label && <label className="block text-xs uppercase tracking-[0.2em] text-taupe font-medium">{label}</label>}

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            draggable={!disabled && items.length > 1}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`p-4 bg-charcoal/40 border border-amber-gold/30 rounded transition-all ${
              draggedIndex === index ? "opacity-50 border-amber-gold/60" : ""
            } ${!disabled && items.length > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
          >
            <div className="flex gap-3">
              {items.length > 1 && (
                <div className="flex items-start pt-1">
                  <GripVertical className="w-4 h-4 text-amber-gold/40" />
                </div>
              )}

              <div className="flex-1">{renderItem(item, index, (value) => updateItem(index, value))}</div>

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
        className="flex items-center gap-2 px-3 py-2 bg-amber-gold/20 hover:bg-amber-gold/30 border border-amber-gold/50 rounded text-amber-gold text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
        Add Item
      </button>
    </div>
  );
}
