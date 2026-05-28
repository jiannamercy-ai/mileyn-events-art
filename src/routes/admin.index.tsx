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
import { ImageUploader } from "@/components/admin/ImageUploader";

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

type Tab = "hero" | "about" | "services" | "projects" | "portfolio" | "corporate" | "weddings" | "privateEvents" | "team" | "teamFull" | "testimonials" | "social" | "footer";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Portfolio" },
  { id: "portfolio", label: "Portfolio Hero" },
  { id: "corporate", label: "Corporate Events" },
  { id: "weddings", label: "Weddings" },
  { id: "privateEvents", label: "Private Events" },
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

        {/* Page Hero Images */}
        {tab === "portfolio" && (
          <div className="space-y-6">
            <h3 className="font-display text-xl text-amber-gold">Portfolio Page Hero Image</h3>
            <ImageUploader
              value={content.portfolio?.heroImg || ""}
              onChange={(heroImg) => update("portfolio", { heroImg })}
              label="Hero Image"
            />
          </div>
        )}
        {tab === "corporate" && (
          <div className="space-y-6">
            <h3 className="font-display text-xl text-amber-gold">Corporate Events Hero Image</h3>
            <ImageUploader
              value={content.corporate?.heroImg || ""}
              onChange={(heroImg) => update("corporate", { heroImg })}
              label="Hero Image"
            />
          </div>
        )}
        {tab === "weddings" && (
          <div className="space-y-6">
            <h3 className="font-display text-xl text-amber-gold">Weddings Hero Image</h3>
            <ImageUploader
              value={content.weddings?.heroImg || ""}
              onChange={(heroImg) => update("weddings", { heroImg })}
              label="Hero Image"
            />
          </div>
        )}
        {tab === "privateEvents" && (
          <div className="space-y-6">
            <h3 className="font-display text-xl text-amber-gold">Private Events Hero Image</h3>
            <ImageUploader
              value={content.privateEvents?.heroImg || ""}
              onChange={(heroImg) => update("privateEvents", { heroImg })}
              label="Hero Image"
            />
          </div>
        )}

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
            <h3 className="font-display text-xl text-amber-gold">Team Members</h3>
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
