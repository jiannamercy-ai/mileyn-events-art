import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { ImageUploader } from "./ImageUploader";
import { ArrayManager } from "./ArrayManager";
import type { SiteContent } from "@/lib/content";

interface AboutEditorProps {
  about: SiteContent["about"];
  onChange: (about: SiteContent["about"]) => void;
  disabled?: boolean;
}

export function AboutEditor({ about, onChange, disabled }: AboutEditorProps) {
  const updateAbout = (updates: Partial<SiteContent["about"]>) => {
    onChange({ ...about, ...updates });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl text-amber-gold mb-4">About Section</h3>
      </div>

      {/* About Image */}
      <ImageUploader
        value={about.image}
        onChange={(image) => updateAbout({ image })}
        label="About Section Image"
        disabled={disabled}
      />

      {/* Heading Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          value={about.headingTop}
          onChange={(headingTop) => updateAbout({ headingTop })}
          label="Main Heading"
          disabled={disabled}
          helperText="First line of heading"
        />
        <TextInput
          value={about.headingEm}
          onChange={(headingEm) => updateAbout({ headingEm })}
          label="Highlighted Heading"
          disabled={disabled}
          helperText="Emphasized text (gold color)"
        />
      </div>

      {/* Paragraphs */}
      <TextArea
        value={about.p1}
        onChange={(p1) => updateAbout({ p1 })}
        label="Paragraph 1"
        placeholder="First paragraph content..."
        disabled={disabled}
        rows={4}
      />

      <TextArea
        value={about.p2}
        onChange={(p2) => updateAbout({ p2 })}
        label="Paragraph 2"
        placeholder="Second paragraph content..."
        disabled={disabled}
        rows={4}
      />

      {/* Bullet Points */}
      <ArrayManager<string>
        items={about.bullets}
        onChange={(bullets) => updateAbout({ bullets })}
        label="Key Points / Bullets"
        disabled={disabled}
        createNew={() => ""}
        renderItem={(bullet, _index, onChange) => (
          <TextInput
            value={bullet}
            onChange={onChange}
            placeholder="e.g., Attention to detail at every level"
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}
