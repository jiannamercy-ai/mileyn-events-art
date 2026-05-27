import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DEFAULT_CONTENT, type SiteContent, saveContent } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { AboutEditor } from "@/components/admin/AboutEditor";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { TextInput } from "@/components/admin/TextInput";
import { TextArea } from "@/components/admin/TextArea";
import { ArrayManager } from "@/components/admin/ArrayManager";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminDashboard,
});

type Tab =
  | "hero"
  | "about"
  | "services"
  | "projects"
  | "team"
  | "teamFull"
  | "testimonials"
  | "social"
  | "footer";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Portfolio" },
  { id: "team", label: "Team Collage" },
  { id: "teamFull", label: "Team Bios" },
  { id: "testimonials", label: "Testimonials" },
  { id: "social", label: "Contact / Social" },
  { id: "footer", label: "Footer" },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("hero");
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    let active = true;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      try {
        const { data } = await supabase
          .from("site_content")
          .select("data")
          .eq("id", "singleton")
          .maybeSingle();
        if (!active) return;
        const over = (data?.data as Partial<SiteContent>) || null;
        const merged: any = { ...DEFAULT_CONTENT };
        if (over) {
          for (const k of Object.keys(over)) {
            const v = (over as any)[k];
            if (v == null) continue;
            if (Array.isArray(v)) merged[k] = v;
            else if (typeof v === "object") merged[k] = { ...(DEFAULT_CONTENT as any)[k], ...v };
            else merged[k] = v;
          }
        }
        setContent(merged);
      } finally {
        if (active) setLoading(false);
      }
    })();
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate({ to: "/admin/login" });
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [navigate]);


  const save = async () => {
    setSaving(true);
    try {
      await saveContent(content);
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e: any) {
      alert("Save failed: " + (e?.message || "unknown"));
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };


  const reset = () => {
    if (confirm("Reset ALL content back to factory defaults? This cannot be undone.")) {
      setContent(DEFAULT_CONTENT);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-espresso text-cream flex items-center justify-center">
        <p className="text-amber-gold">Loading…</p>
      </main>
    );
  }

  const update = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) =>
    setContent((c) => ({ ...c, [k]: v }));

  return (
    <main className="min-h-screen bg-espresso text-cream">
      <header className="sticky top-0 z-20 bg-espresso/95 backdrop-blur border-b border-amber-gold/30">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-2xl text-amber-gold">Mileyn Admin</h1>
            <Link to="/" className="text-xs uppercase tracking-[0.25em] text-cream/70 hover:text-amber-gold">
              View Site →
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {savedAt && <span className="text-xs text-cream/60">Saved at {savedAt}</span>}
            <button
              onClick={reset}
              className="text-[11px] uppercase tracking-[0.25em] text-cream/70 hover:text-red-300 px-3 py-2"
            >
              Reset
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="bg-amber-gold text-espresso font-medium px-5 py-2 text-xs tracking-[0.25em] uppercase hover:bg-amber-gold/90 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save All"}
            </button>
            <button onClick={logout} className="text-[11px] uppercase tracking-[0.25em] text-cream/70 hover:text-amber-gold">
              Sign Out
            </button>
          </div>
        </div>
        <nav className="mx-auto max-w-7xl px-6 pb-3 flex gap-2 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] border ${
                tab === t.id
                  ? "border-amber-gold text-amber-gold bg-amber-gold/10"
                  : "border-cream/20 text-cream/70 hover:text-amber-gold hover:border-amber-gold/50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 space-y-6">
        {tab === "hero" && <HeroEditor hero={content.hero} onChange={(hero) => update("hero", hero)} />}
        {tab === "about" && <AboutEditor about={content.about} onChange={(about) => update("about", about)} />}
        {tab === "services" && <ServicesManager services={content.services} onChange={(services) => update("services", services)} />}
        {tab === "projects" && <ProjectsManager projects={content.projects} onChange={(projects) => update("projects", projects)} />}
        {tab === "team" && (
          <div className="space-y-6">
            <h3 className="font-display text-xl text-amber-gold">Team Collage Section</h3>
            <TextInput
              value={content.team.eyebrow}
              onChange={(eyebrow) => update("team", { ...content.team, eyebrow })}
              label="Eyebrow"
            />
            <TextInput
              value={content.team.headingTop}
              onChange={(headingTop) => update("team", { ...content.team, headingTop })}
              label="Heading (Top Line)"
            />
            <TextInput
              value={content.team.headingEm}
              onChange={(headingEm) => update("team", { ...content.team, headingEm })}
              label="Heading (Gold Emphasized)"
            />
            <TextArea
              value={content.team.intro}
              onChange={(intro) => update("team", { ...content.team, intro })}
              label="Intro Text"
              rows={4}
            />
            <TextArea
              value={content.team.quote}
              onChange={(quote) => update("team", { ...content.team, quote })}
              label="Quote"
              rows={2}
            />
            <ArrayManager<{ src: string; caption: string }>
              items={content.team.frames}
              onChange={(frames) => update("team", { ...content.team, frames })}
              label="Collage Frames (Image + Caption)"
              createNew={() => ({ src: "", caption: "" })}
              renderItem={(frame, _index, onChange) => (
                <div className="space-y-2">
                  <TextInput
                    value={frame.src}
                    onChange={(src) => onChange({ ...frame, src })}
                    placeholder="Image URL"
                  />
                  <TextInput
                    value={frame.caption}
                    onChange={(caption) => onChange({ ...frame, caption })}
                    placeholder="Frame caption"
                  />
                </div>
              )}
            />
          </div>
        )}
        {tab === "teamFull" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-amber-gold">Team Members</h3>
              <button
                onClick={() => update("teamFull", [...content.teamFull, { slug: `member-${Date.now()}`, name: "", role: "", img: "", bio: "", specialties: [], years: "" }])}
                className="flex items-center gap-2 px-3 py-2 bg-amber-gold/20 hover:bg-amber-gold/30 border border-amber-gold/50 rounded text-amber-gold text-xs uppercase tracking-[0.15em] transition-colors"
              >
                + Add Member
              </button>
            </div>
            <ArrayManager<(typeof content.teamFull)[number]>
              items={content.teamFull}
              onChange={(teamFull) => update("teamFull", teamFull)}
              createNew={() => ({ slug: `member-${Date.now()}`, name: "", role: "", img: "", bio: "", specialties: [], years: "" })}
              renderItem={(member, _index, onChange) => (
                <div className="space-y-3 p-4 bg-charcoal/40 border border-amber-gold/20 rounded">
                  <TextInput
                    value={member.slug}
                    onChange={(slug) => onChange({ ...member, slug })}
                    label="ID (slug)"
                  />
                  <TextInput
                    value={member.name}
                    onChange={(name) => onChange({ ...member, name })}
                    label="Name"
                  />
                  <TextInput
                    value={member.role}
                    onChange={(role) => onChange({ ...member, role })}
                    label="Role"
                  />
                  <TextInput
                    value={member.img}
                    onChange={(img) => onChange({ ...member, img })}
                    label="Photo URL"
                  />
                  <TextArea
                    value={member.bio}
                    onChange={(bio) => onChange({ ...member, bio })}
                    label="Bio"
                    rows={3}
                  />
                  <TextInput
                    value={member.years}
                    onChange={(years) => onChange({ ...member, years })}
                    label="Years Experience"
                  />
                  <ArrayManager<string>
                    items={member.specialties}
                    onChange={(specialties) => onChange({ ...member, specialties })}
                    label="Specialties"
                    createNew={() => ""}
                    renderItem={(specialty, _i, onSpecialtyChange) => (
                      <TextInput
                        value={specialty}
                        onChange={onSpecialtyChange}
                        placeholder="e.g., Floral Design"
                      />
                    )}
                  />
                </div>
              )}
            />
          </div>
        )}
        {tab === "testimonials" && (
          <div className="space-y-6">
            <h3 className="font-display text-xl text-amber-gold">Testimonials</h3>
            <ArrayManager<(typeof content.testimonials)[number]>
              items={content.testimonials}
              onChange={(testimonials) => update("testimonials", testimonials)}
              createNew={() => ({ quote: "", name: "", role: "" })}
              renderItem={(testimonial, _index, onChange) => (
                <div className="space-y-3">
                  <TextArea
                    value={testimonial.quote}
                    onChange={(quote) => onChange({ ...testimonial, quote })}
                    label="Quote"
                    rows={3}
                  />
                  <TextInput
                    value={testimonial.name}
                    onChange={(name) => onChange({ ...testimonial, name })}
                    label="Name"
                  />
                  <TextInput
                    value={testimonial.role}
                    onChange={(role) => onChange({ ...testimonial, role })}
                    label="Role / Event"
                  />
                </div>
              )}
            />
          </div>
        )}
        {tab === "social" && (
          <div className="space-y-6">
            <h3 className="font-display text-xl text-amber-gold">Contact & Social Links</h3>
            <TextInput
              value={content.social.whatsapp}
              onChange={(whatsapp) => update("social", { ...content.social, whatsapp })}
              label="WhatsApp Number (with country code, no spaces)"
              placeholder="+254712345678"
            />
            <TextInput
              value={content.social.whatsappDisplay}
              onChange={(whatsappDisplay) => update("social", { ...content.social, whatsappDisplay })}
              label="WhatsApp Display (formatted)"
              placeholder="+254 (712) 345 678"
            />
            <TextInput
              value={content.social.email}
              onChange={(email) => update("social", { ...content.social, email })}
              label="Email"
              type="email"
            />
            <TextInput
              value={content.social.instagram}
              onChange={(instagram) => update("social", { ...content.social, instagram })}
              label="Instagram Handle (without @)"
              placeholder="mileyn_events"
            />
            <TextInput
              value={content.social.phone}
              onChange={(phone) => update("social", { ...content.social, phone })}
              label="Phone (tel:)"
              placeholder="+254712345678"
            />
          </div>
        )}
        {tab === "footer" && (
          <div className="space-y-6">
            <h3 className="font-display text-xl text-amber-gold">Footer</h3>
            <TextArea
              value={content.footer.tagline}
              onChange={(tagline) => update("footer", { ...content.footer, tagline })}
              label="Tagline"
              rows={2}
            />
            <TextInput
              value={content.footer.copyright}
              onChange={(copyright) => update("footer", { ...content.footer, copyright })}
              label="Copyright Line"
            />
          </div>
        )}

        <div className="sticky bottom-4 flex justify-end">
          <button
            onClick={save}
            disabled={saving}
            className="bg-amber-gold text-espresso font-medium px-8 py-3 text-xs tracking-[0.3em] uppercase shadow-lg hover:bg-amber-gold/90 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save All Changes"}
          </button>
        </div>
      </div>
    </main>
  );
}

/* --------------------------- Reusable primitives -------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-charcoal/40 border border-amber-gold/20 p-6 md:p-8 space-y-4">
      <h2 className="font-display text-2xl text-amber-gold">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70">{label}</span>
      {textarea ? (
        <textarea
          rows={rows}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full bg-espresso/60 border border-cream/15 focus:border-amber-gold p-3 text-cream text-sm focus:outline-none"
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full bg-espresso/60 border border-cream/15 focus:border-amber-gold p-3 text-cream text-sm focus:outline-none"
        />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const handleFile = async (f: File) => {
    setBusy(true);
    try {
      const url = await uploadImage(f);
      onChange(url);
    } catch (e: any) {
      alert("Upload failed: " + (e?.message || "unknown"));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70">{label}</span>
      <div className="mt-2 flex gap-3 items-start">
        {value ? (
          <img src={value} alt="" className="h-24 w-32 object-cover border border-amber-gold/30" />
        ) : (
          <div className="h-24 w-32 border border-dashed border-cream/20 flex items-center justify-center text-xs text-cream/50">
            no image
          </div>
        )}
        <div className="flex-1 space-y-2">
          <label className="inline-block cursor-pointer bg-amber-gold text-espresso text-[10px] uppercase tracking-[0.25em] px-3 py-2 hover:bg-amber-gold/90">
            {busy ? "Uploading…" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.currentTarget.value = "";
              }}
            />
          </label>
          <input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL"
            className="w-full bg-espresso/60 border border-cream/15 focus:border-amber-gold p-2 text-cream text-xs focus:outline-none"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="text-[10px] uppercase tracking-[0.25em] text-red-300 hover:text-red-200"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StringListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70">{label}</span>
      <div className="mt-2 space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => {
                const next = [...value];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 bg-espresso/60 border border-cream/15 focus:border-amber-gold p-2 text-cream text-sm focus:outline-none"
            />
            <button
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="text-xs text-red-300 hover:text-red-200 px-2"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange([...value, ""])}
          className="text-[10px] uppercase tracking-[0.25em] text-amber-gold hover:text-amber-gold/80"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ Tab editors ------------------------------- */

function HeroEditor({ value, onChange }: { value: SiteContent["hero"]; onChange: (v: SiteContent["hero"]) => void }) {
  const set = <K extends keyof SiteContent["hero"]>(k: K, v: SiteContent["hero"][K]) => onChange({ ...value, [k]: v });
  return (
    <Section title="Hero (top of homepage)">
      <ImageField label="Background image" value={value.image} onChange={(v) => set("image", v)} />
      <Field label="Headline (start)" value={value.headline} onChange={(v) => set("headline", v)} />
      <Field label="Headline (gold italic word)" value={value.headlineEm} onChange={(v) => set("headlineEm", v)} />
      <Field label="Headline (end)" value={value.headlineTail} onChange={(v) => set("headlineTail", v)} />
      <Field label="Subheading" value={value.subhead} onChange={(v) => set("subhead", v)} textarea />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Primary CTA label" value={value.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} />
        <Field label="Secondary CTA label" value={value.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} />
      </div>
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70">Stats</span>
        <div className="mt-2 space-y-2">
          {value.stats.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2">
              <input
                value={s.v}
                onChange={(e) => {
                  const next = [...value.stats];
                  next[i] = { ...s, v: e.target.value };
                  set("stats", next);
                }}
                placeholder="150+"
                className="bg-espresso/60 border border-cream/15 p-2 text-cream text-sm focus:outline-none focus:border-amber-gold"
              />
              <input
                value={s.l}
                onChange={(e) => {
                  const next = [...value.stats];
                  next[i] = { ...s, l: e.target.value };
                  set("stats", next);
                }}
                placeholder="Events Curated"
                className="bg-espresso/60 border border-cream/15 p-2 text-cream text-sm focus:outline-none focus:border-amber-gold"
              />
              <button onClick={() => set("stats", value.stats.filter((_, j) => j !== i))} className="text-red-300 px-2">✕</button>
            </div>
          ))}
          <button
            onClick={() => set("stats", [...value.stats, { v: "", l: "" }])}
            className="text-[10px] uppercase tracking-[0.25em] text-amber-gold"
          >
            + Add stat
          </button>
        </div>
      </div>
      <StringListField label="Trust strip lines" value={value.trust} onChange={(v) => set("trust", v)} />
    </Section>
  );
}

function AboutEditor({ value, onChange }: { value: SiteContent["about"]; onChange: (v: SiteContent["about"]) => void }) {
  const set = <K extends keyof SiteContent["about"]>(k: K, v: SiteContent["about"][K]) => onChange({ ...value, [k]: v });
  return (
    <Section title="About section">
      <ImageField label="Editorial image" value={value.image} onChange={(v) => set("image", v)} />
      <Field label="Heading (top line)" value={value.headingTop} onChange={(v) => set("headingTop", v)} />
      <Field label="Heading (gold italic line)" value={value.headingEm} onChange={(v) => set("headingEm", v)} />
      <Field label="Paragraph 1" value={value.p1} onChange={(v) => set("p1", v)} textarea rows={4} />
      <Field label="Paragraph 2" value={value.p2} onChange={(v) => set("p2", v)} textarea rows={4} />
      <StringListField label="Bullet points (4 recommended)" value={value.bullets} onChange={(v) => set("bullets", v)} />
    </Section>
  );
}

function TeamCollageEditor({ value, onChange }: { value: SiteContent["team"]; onChange: (v: SiteContent["team"]) => void }) {
  const set = <K extends keyof SiteContent["team"]>(k: K, v: SiteContent["team"][K]) => onChange({ ...value, [k]: v });
  return (
    <Section title="Team — Behind The Curtain collage">
      <Field label="Eyebrow" value={value.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <Field label="Heading (top)" value={value.headingTop} onChange={(v) => set("headingTop", v)} />
      <Field label="Heading (gold italic)" value={value.headingEm} onChange={(v) => set("headingEm", v)} />
      <Field label="Intro paragraph" value={value.intro} onChange={(v) => set("intro", v)} textarea rows={4} />
      <Field label="Pull quote" value={value.quote} onChange={(v) => set("quote", v)} />
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70">Collage frames</span>
        <div className="mt-2 space-y-4">
          {value.frames.map((f, i) => (
            <div key={i} className="border border-cream/10 p-4 space-y-3">
              <ImageField
                label={`Frame ${i + 1} image`}
                value={f.src}
                onChange={(v) => {
                  const next = [...value.frames];
                  next[i] = { ...f, src: v };
                  set("frames", next);
                }}
              />
              <Field
                label="Caption"
                value={f.caption}
                onChange={(v) => {
                  const next = [...value.frames];
                  next[i] = { ...f, caption: v };
                  set("frames", next);
                }}
              />
              <button
                onClick={() => set("frames", value.frames.filter((_, j) => j !== i))}
                className="text-[10px] uppercase tracking-[0.25em] text-red-300"
              >
                Remove frame
              </button>
            </div>
          ))}
          <button
            onClick={() => set("frames", [...value.frames, { src: "", caption: "" }])}
            className="text-[10px] uppercase tracking-[0.25em] text-amber-gold"
          >
            + Add frame
          </button>
        </div>
      </div>
    </Section>
  );
}

function ServiceFields({ value, onChange }: { value: SiteContent["services"][number]; onChange: (v: SiteContent["services"][number]) => void }) {
  const set = (patch: Partial<typeof value>) => onChange({ ...value, ...patch });
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Slug (URL id, no spaces)" value={value.slug} onChange={(v) => set({ slug: v })} />
        <Field label="Name" value={value.name} onChange={(v) => set({ name: v })} />
      </div>
      <Field label="Tagline" value={value.tagline} onChange={(v) => set({ tagline: v })} />
      <ImageField label="Cover image" value={value.img} onChange={(v) => set({ img: v })} />
      <Field label="Intro" value={value.intro} onChange={(v) => set({ intro: v })} textarea rows={4} />
      <StringListField label="What's included" value={value.whatsIncluded} onChange={(v) => set({ whatsIncluded: v })} />
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70">Process steps</span>
        <div className="mt-2 space-y-2">
          {value.process.map((p, i) => (
            <div key={i} className="border border-cream/10 p-3 space-y-2">
              <input
                value={p.title}
                onChange={(e) => {
                  const next = [...value.process];
                  next[i] = { ...p, title: e.target.value };
                  set({ process: next });
                }}
                placeholder="Step title"
                className="w-full bg-espresso/60 border border-cream/15 p-2 text-cream text-sm focus:outline-none focus:border-amber-gold"
              />
              <textarea
                rows={2}
                value={p.body}
                onChange={(e) => {
                  const next = [...value.process];
                  next[i] = { ...p, body: e.target.value };
                  set({ process: next });
                }}
                placeholder="Step description"
                className="w-full bg-espresso/60 border border-cream/15 p-2 text-cream text-sm focus:outline-none focus:border-amber-gold"
              />
              <button onClick={() => set({ process: value.process.filter((_, j) => j !== i) })} className="text-[10px] text-red-300">Remove</button>
            </div>
          ))}
          <button
            onClick={() => set({ process: [...value.process, { title: "", body: "" }] })}
            className="text-[10px] uppercase tracking-[0.25em] text-amber-gold"
          >
            + Add step
          </button>
        </div>
      </div>
      <Field label="Signature line" value={value.signature} onChange={(v) => set({ signature: v })} />
      <Field label="Starting price" value={value.starting} onChange={(v) => set({ starting: v })} />
    </div>
  );
}

function ProjectFields({ value, onChange }: { value: SiteContent["projects"][number]; onChange: (v: SiteContent["projects"][number]) => void }) {
  const set = (patch: Partial<typeof value>) => onChange({ ...value, ...patch });
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Slug" value={value.slug} onChange={(v) => set({ slug: v })} />
        <Field label="Name" value={value.name} onChange={(v) => set({ name: v })} />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Type" value={value.type} onChange={(v) => set({ type: v })} />
        <Field label="Location" value={value.location} onChange={(v) => set({ location: v })} />
        <Field label="Guests" value={value.guests} onChange={(v) => set({ guests: v })} />
        <Field label="Date" value={value.date} onChange={(v) => set({ date: v })} />
      </div>
      <ImageField label="Cover image" value={value.img} onChange={(v) => set({ img: v })} />
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70">Gallery images</span>
        <div className="mt-2 space-y-3">
          {value.gallery.map((g, i) => (
            <ImageField
              key={i}
              label={`Gallery image ${i + 1}`}
              value={g}
              onChange={(v) => {
                const next = [...value.gallery];
                next[i] = v;
                set({ gallery: next });
              }}
            />
          ))}
          <div className="flex gap-2">
            <button
              onClick={() => set({ gallery: [...value.gallery, ""] })}
              className="text-[10px] uppercase tracking-[0.25em] text-amber-gold"
            >
              + Add gallery slot
            </button>
            {value.gallery.length > 0 && (
              <button
                onClick={() => set({ gallery: value.gallery.slice(0, -1) })}
                className="text-[10px] uppercase tracking-[0.25em] text-red-300"
              >
                − Remove last
              </button>
            )}
          </div>
        </div>
      </div>
      <Field label="Story" value={value.story} onChange={(v) => set({ story: v })} textarea rows={5} />
      <StringListField label="Highlights" value={value.highlights} onChange={(v) => set({ highlights: v })} />
      <div className="border-t border-cream/10 pt-3">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-2">Optional testimonial</p>
        <Field
          label="Quote"
          value={value.testimonial?.quote || ""}
          onChange={(v) =>
            set({ testimonial: { quote: v, author: value.testimonial?.author || "" } })
          }
          textarea
        />
        <Field
          label="Author"
          value={value.testimonial?.author || ""}
          onChange={(v) =>
            set({ testimonial: { quote: value.testimonial?.quote || "", author: v } })
          }
        />
      </div>
    </div>
  );
}

function TeamMemberFields({ value, onChange }: { value: SiteContent["teamFull"][number]; onChange: (v: SiteContent["teamFull"][number]) => void }) {
  const set = (patch: Partial<typeof value>) => onChange({ ...value, ...patch });
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Slug" value={value.slug} onChange={(v) => set({ slug: v })} />
        <Field label="Name" value={value.name} onChange={(v) => set({ name: v })} />
      </div>
      <Field label="Role" value={value.role} onChange={(v) => set({ role: v })} />
      <Field label="Years experience" value={value.years} onChange={(v) => set({ years: v })} />
      <ImageField label="Portrait" value={value.img} onChange={(v) => set({ img: v })} />
      <Field label="Bio" value={value.bio} onChange={(v) => set({ bio: v })} textarea rows={4} />
      <StringListField label="Specialties" value={value.specialties} onChange={(v) => set({ specialties: v })} />
    </div>
  );
}

/* ------------------------------ List editor ------------------------------- */

function ListEditor<T>({
  title,
  value,
  onChange,
  blank,
  renderItem,
  label,
}: {
  title: string;
  value: T[];
  onChange: (v: T[]) => void;
  blank: () => T;
  renderItem: (item: T, set: (v: T) => void) => React.ReactNode;
  label: (item: T) => string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section title={title}>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="border border-cream/10">
            <div className="flex items-center justify-between bg-espresso/40 px-4 py-3">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="text-left flex-1 text-sm text-cream hover:text-amber-gold"
              >
                {open === i ? "▼" : "▶"} {label(item) || `Item ${i + 1}`}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (i === 0) return;
                    const next = [...value];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    onChange(next);
                  }}
                  className="text-xs text-cream/60 hover:text-amber-gold px-2"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => {
                    if (i === value.length - 1) return;
                    const next = [...value];
                    [next[i + 1], next[i]] = [next[i], next[i + 1]];
                    onChange(next);
                  }}
                  className="text-xs text-cream/60 hover:text-amber-gold px-2"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${label(item)}"?`)) onChange(value.filter((_, j) => j !== i));
                  }}
                  className="text-xs text-red-300 hover:text-red-200 px-2"
                >
                  Delete
                </button>
              </div>
            </div>
            {open === i && (
              <div className="p-4 bg-charcoal/30">
                {renderItem(item, (v) => {
                  const next = [...value];
                  next[i] = v;
                  onChange(next);
                })}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => {
            onChange([...value, blank()]);
            setOpen(value.length);
          }}
          className="bg-amber-gold/10 border border-amber-gold/40 text-amber-gold text-xs uppercase tracking-[0.25em] px-4 py-2 hover:bg-amber-gold/20"
        >
          + Add new
        </button>
      </div>
    </Section>
  );
}
