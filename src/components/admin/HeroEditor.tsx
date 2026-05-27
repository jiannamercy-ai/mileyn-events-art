import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { ImageUploader } from "./ImageUploader";
import { ArrayManager } from "./ArrayManager";
import type { SiteContent, HeroStat } from "@/lib/content";

interface HeroEditorProps {
  hero: SiteContent["hero"];
  onChange: (hero: SiteContent["hero"]) => void;
  disabled?: boolean;
}

export function HeroEditor({ hero, onChange, disabled }: HeroEditorProps) {
  const updateHero = (updates: Partial<SiteContent["hero"]>) => {
    onChange({ ...hero, ...updates });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl text-amber-gold mb-4">Hero Section</h3>
      </div>

      {/* Hero Image */}
      <ImageUploader
        value={hero.image}
        onChange={(image) => updateHero({ image })}
        label="Hero Background Image"
        disabled={disabled}
      />

      {/* Headline Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          value={hero.headline}
          onChange={(headline) => updateHero({ headline })}
          label="Headline"
          disabled={disabled}
          helperText="Main heading text"
        />
        <TextInput
          value={hero.headlineEm}
          onChange={(headlineEm) => updateHero({ headlineEm })}
          label="Highlighted Text"
          disabled={disabled}
          helperText="Text to emphasize (gold color)"
        />
        <TextInput
          value={hero.headlineTail}
          onChange={(headlineTail) => updateHero({ headlineTail })}
          label="Tail Text"
          disabled={disabled}
          helperText="Final headline text"
        />
      </div>

      {/* Subhead */}
      <TextArea
        value={hero.subhead}
        onChange={(subhead) => updateHero({ subhead })}
        label="Subheading"
        placeholder="Enter supporting text..."
        disabled={disabled}
        rows={3}
        helperText="Descriptive text below headline"
      />

      {/* CTA Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          value={hero.ctaPrimary}
          onChange={(ctaPrimary) => updateHero({ ctaPrimary })}
          label="Primary Button Text"
          disabled={disabled}
          helperText="Main call-to-action"
        />
        <TextInput
          value={hero.ctaSecondary}
          onChange={(ctaSecondary) => updateHero({ ctaSecondary })}
          label="Secondary Button Text"
          disabled={disabled}
          helperText="Secondary call-to-action"
        />
      </div>

      {/* Stats */}
      <ArrayManager<HeroStat>
        items={hero.stats}
        onChange={(stats) => updateHero({ stats })}
        label="Statistics"
        disabled={disabled}
        createNew={() => ({ v: "", l: "" })}
        renderItem={(stat, _index, onChange) => (
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              value={stat.v}
              onChange={(v) => onChange({ ...stat, v })}
              placeholder="Value (e.g., 150+)"
              disabled={disabled}
            />
            <TextInput
              value={stat.l}
              onChange={(l) => onChange({ ...stat, l })}
              placeholder="Label (e.g., Events Delivered)"
              disabled={disabled}
            />
          </div>
        )}
      />

      {/* Trust Badges */}
      <ArrayManager<string>
        items={hero.trust}
        onChange={(trust) => updateHero({ trust })}
        label="Trust Badges"
        disabled={disabled}
        createNew={() => ""}
        renderItem={(trust, _index, onChange) => (
          <TextInput
            value={trust}
            onChange={onChange}
            placeholder="e.g., Fully Insured & Licensed"
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}
