import { useState } from "react";
import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { ImageUploader } from "./ImageUploader";
import { ArrayManager } from "./ArrayManager";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import type { Service } from "@/data/site";

interface ServicesManagerProps {
  services: Service[];
  onChange: (services: Service[]) => void;
  disabled?: boolean;
}

export function ServicesManager({ services, onChange, disabled }: ServicesManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const createNewService = (): Service => ({
    slug: `service-${Date.now()}`,
    name: "",
    tagline: "",
    img: "",
    intro: "",
    whatsIncluded: [],
    process: [],
    signature: "",
    starting: "",
  });

  const addService = () => {
    onChange([...services, createNewService()]);
    setShowNew(true);
    setEditingId(services.length > 0 ? services[services.length - 1].slug : "");
  };

  const updateService = (slug: string, updates: Partial<Service>) => {
    onChange(
      services.map((s) => (s.slug === slug ? { ...s, ...updates } : s))
    );
  };

  const removeService = (slug: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      onChange(services.filter((s) => s.slug !== slug));
      setEditingId(null);
    }
  };

  const editingService = services.find((s) => s.slug === editingId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-amber-gold">Services</h3>
        <button
          onClick={addService}
          disabled={disabled}
          className="flex items-center gap-2 px-3 py-2 bg-amber-gold/20 hover:bg-amber-gold/30 border border-amber-gold/50 rounded text-amber-gold text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-2">
        {services.map((service) => (
          <div
            key={service.slug}
            className="flex items-center gap-3 p-3 bg-charcoal/40 border border-amber-gold/30 rounded hover:border-amber-gold/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-cream truncate">{service.name || "Untitled Service"}</p>
              <p className="text-xs text-cream/50 truncate">{service.tagline}</p>
            </div>
            <button
              onClick={() => setEditingId(editingId === service.slug ? null : service.slug)}
              className="p-2 hover:bg-amber-gold/20 rounded transition-colors"
            >
              <Edit2 className="w-4 h-4 text-amber-gold" />
            </button>
            <button
              onClick={() => removeService(service.slug)}
              disabled={disabled}
              className="p-2 hover:bg-red-400/20 rounded transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Edit Panel */}
      {editingService && (
        <div className="p-6 bg-charcoal/60 border border-amber-gold/30 rounded space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-lg text-amber-gold">Edit Service</h4>
            <button
              onClick={() => setEditingId(null)}
              className="p-1 hover:bg-amber-gold/20 rounded transition-colors"
            >
              <X className="w-4 h-4 text-amber-gold" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <TextInput
              value={editingService.slug}
              onChange={(slug) => {
                const oldSlug = editingService.slug;
                updateService(oldSlug, { slug });
                setEditingId(slug);
              }}
              label="Service ID (slug)"
              disabled={disabled}
              helperText="Unique identifier, use hyphens (e.g., luxury-weddings)"
            />
            <TextInput
              value={editingService.name}
              onChange={(name) => updateService(editingService.slug, { name })}
              label="Service Name"
              disabled={disabled}
              required
            />
            <TextInput
              value={editingService.tagline}
              onChange={(tagline) => updateService(editingService.slug, { tagline })}
              label="Tagline"
              disabled={disabled}
              helperText="Short description"
            />
          </div>

          {/* Image */}
          <ImageUploader
            value={editingService.img}
            onChange={(img) => updateService(editingService.slug, { img })}
            label="Service Image"
            disabled={disabled}
          />

          {/* Description */}
          <TextArea
            value={editingService.intro}
            onChange={(intro) => updateService(editingService.slug, { intro })}
            label="Full Description"
            placeholder="Detailed service description..."
            disabled={disabled}
            rows={5}
          />

          {/* What's Included */}
          <ArrayManager<string>
            items={editingService.whatsIncluded}
            onChange={(whatsIncluded) => updateService(editingService.slug, { whatsIncluded })}
            label="What's Included"
            disabled={disabled}
            createNew={() => ""}
            renderItem={(item, _index, onChange) => (
              <TextInput
                value={item}
                onChange={onChange}
                placeholder="e.g., Full creative direction & design boards"
                disabled={disabled}
              />
            )}
          />

          {/* Process Steps */}
          <ArrayManager<{ title: string; body: string }>
            items={editingService.process}
            onChange={(process) => updateService(editingService.slug, { process })}
            label="Process Steps"
            disabled={disabled}
            createNew={() => ({ title: "", body: "" })}
            renderItem={(step, _index, onChange) => (
              <div className="space-y-2">
                <TextInput
                  value={step.title}
                  onChange={(title) => onChange({ ...step, title })}
                  placeholder="Step title"
                  disabled={disabled}
                />
                <TextArea
                  value={step.body}
                  onChange={(body) => onChange({ ...step, body })}
                  placeholder="Step description"
                  disabled={disabled}
                  rows={2}
                />
              </div>
            )}
          />

          {/* Signature & Starting Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextArea
              value={editingService.signature}
              onChange={(signature) => updateService(editingService.slug, { signature })}
              label="Signature Note"
              placeholder="e.g., We accept a limited number of weddings each year..."
              disabled={disabled}
              rows={3}
            />
            <TextInput
              value={editingService.starting}
              onChange={(starting) => updateService(editingService.slug, { starting })}
              label="Starting Price"
              placeholder="e.g., From KSh 1.8M"
              disabled={disabled}
            />
          </div>
        </div>
      )}

      {services.length === 0 && (
        <div className="text-center py-8 text-cream/50">
          <p>No services yet. Click "Add Service" to create one.</p>
        </div>
      )}
    </div>
  );
}
