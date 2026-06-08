import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/admin/TextInput";
import { TextArea } from "@/components/admin/TextArea";
import { ImageUploader } from "@/components/admin/ImageUploader";

type YearEdition = {
  year: number;
  title: string;
  date: string;
  description: string;
  gallery: string[];
};

interface YearEditionManagerProps {
  editions: YearEdition[];
  onUpdate: (editions: YearEdition[]) => void;
}

export function YearEditionManager({ editions, onUpdate }: YearEditionManagerProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleAddEdition = () => {
    const newYear = new Date().getFullYear();
    const newEdition: YearEdition = {
      year: newYear,
      title: `Edition ${newYear}`,
      date: "",
      description: "",
      gallery: [],
    };
    onUpdate([...editions, newEdition]);
    setExpandedId(newYear);
  };

  const handleUpdateEdition = (index: number, field: string, value: any) => {
    const updated = [...editions];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const handleDeleteEdition = (index: number) => {
    onUpdate(editions.filter((_, i) => i !== index));
  };

  const handleAddPhoto = (index: number, photoUrl: string) => {
    handleUpdateEdition(index, "gallery", [...editions[index].gallery, photoUrl]);
  };

  const handleRemovePhoto = (index: number, photoIndex: number) => {
    const newGallery = editions[index].gallery.filter((_, i) => i !== photoIndex);
    handleUpdateEdition(index, "gallery", newGallery);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {editions.length === 0 ? (
          <div className="rounded-lg border border-amber-gold/20 bg-cream/50 p-4 text-center text-sm text-espresso/60">
            No annual editions yet. Add one below to get started.
          </div>
        ) : (
          editions.map((edition, idx) => (
            <div key={`${edition.year}-${idx}`} className="rounded-lg border border-amber-gold/20 overflow-hidden bg-cream/50">
              {/* Header */}
              <button
                onClick={() => setExpandedId(expandedId === edition.year ? null : edition.year)}
                className="w-full flex items-center justify-between p-4 hover:bg-amber-gold/5 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-left">
                    <div className="font-display text-lg text-amber-gold">{edition.year}</div>
                    <div className="text-sm text-espresso">{edition.title}</div>
                  </div>
                </div>
                {expandedId === edition.year ? (
                  <ChevronUp className="w-5 h-5 text-amber-gold flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-amber-gold flex-shrink-0" />
                )}
              </button>

              {/* Expanded content */}
              {expandedId === edition.year && (
                <div className="border-t border-amber-gold/20 p-4 space-y-4 bg-white/30">
                  <TextInput
                    label="Year"
                    value={String(edition.year)}
                    onChange={(val) => handleUpdateEdition(idx, "year", parseInt(val) || 0)}
                    type="number"
                  />

                  <TextInput
                    label="Event Title"
                    value={edition.title}
                    onChange={(val) => handleUpdateEdition(idx, "title", val)}
                    placeholder="e.g., Spring Gala 2025"
                  />

                  <TextInput
                    label="Date"
                    value={edition.date}
                    onChange={(val) => handleUpdateEdition(idx, "date", val)}
                    placeholder="e.g., May 15, 2025"
                  />

                  <TextArea
                    label="Description"
                    value={edition.description}
                    onChange={(val) => handleUpdateEdition(idx, "description", val)}
                    placeholder="Brief description of this year's event..."
                    rows={3}
                  />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-espresso">Event Photos ({edition.gallery.length})</label>
                    </div>

                    {/* Photo gallery preview */}
                    {edition.gallery.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {edition.gallery.map((photo, photoIdx) => (
                          <div
                            key={photoIdx}
                            className="relative group aspect-square rounded-lg overflow-hidden border border-amber-gold/20"
                          >
                            <img src={photo} alt={`Photo ${photoIdx + 1}`} className="w-full h-full object-cover" />
                            <button
                              onClick={() => handleRemovePhoto(idx, photoIdx)}
                              className="absolute top-1 right-1 p-1 bg-espresso/80 rounded opacity-0 group-hover:opacity-100 transition"
                            >
                              <X className="w-3 h-3 text-cream" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload section */}
                    <ImageUploader
                      onUpload={(url) => handleAddPhoto(idx, url)}
                      label="Add photo"
                    />
                  </div>

                  {/* Delete button */}
                  <div className="pt-2 border-t border-amber-gold/20">
                    <Button
                      onClick={() => handleDeleteEdition(idx)}
                      variant="outline"
                      size="sm"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Delete Edition
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add new edition button */}
      <Button
        onClick={handleAddEdition}
        variant="outline"
        size="sm"
        className="w-full border-amber-gold text-amber-gold hover:bg-amber-gold/10"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Annual Edition
      </Button>
    </div>
  );
}
