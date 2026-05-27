import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  SERVICES as DEFAULT_SERVICES,
  PROJECTS as DEFAULT_PROJECTS,
  TEAM_FULL as DEFAULT_TEAM,
  SOCIAL as DEFAULT_SOCIAL,
  type Service,
  type Project,
  type TeamMember,
} from "@/data/site";

import heroImage from "@/assets/hero-event.jpg";
import aboutImg from "@/assets/about-editorial.jpg";
import bts1 from "@/assets/team-bts-1.jpg";
import bts2 from "@/assets/team-bts-2.jpg";
import bts3 from "@/assets/team-bts-3.jpg";
import bts4 from "@/assets/team-bts-4.jpg";

export type HeroStat = { v: string; l: string };
export type TeamFrame = { src: string; caption: string };
export type Testimonial = { quote: string; name: string; role: string };

export type SiteContent = {
  hero: {
    image: string;
    headline: string;
    headlineEm: string;
    headlineTail: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: HeroStat[];
    trust: string[];
  };
  about: {
    image: string;
    headingTop: string;
    headingEm: string;
    p1: string;
    p2: string;
    bullets: string[];
  };
  services: Service[];
  projects: Project[];
  team: {
    eyebrow: string;
    headingTop: string;
    headingEm: string;
    intro: string;
    quote: string;
    frames: TeamFrame[];
  };
  teamFull: TeamMember[];
  testimonials: Testimonial[];
  social: typeof DEFAULT_SOCIAL;
  footer: { tagline: string; copyright: string };
};

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    image: heroImage,
    headline: "We Design & Deliver",
    headlineEm: "Exceptional",
    headlineTail: "Events That Feel Effortless",
    subhead:
      "From luxury weddings to high-level corporate experiences, Mileyn Events transforms spaces into unforgettable environments — with precision, elegance, and seamless execution.",
    ctaPrimary: "View Our Work",
    ctaSecondary: "Request a Proposal",
    stats: [
      { v: "150+", l: "Events Delivered" },
      { v: "50+", l: "Luxury Weddings" },
      { v: "98%", l: "Client Satisfaction" },
      { v: "8+", l: "Years In Production" },
    ],
    trust: [
      "Nairobi-based, Available Across East Africa",
      "Corporate & Private Specialists",
      "Fully Insured & Licensed",
      "End-to-End Event Solutions",
    ],
  },
  about: {
    image: aboutImg,
    headingTop: "We don't just set up events.",
    headingEm: "We build experiences.",
    p1: "Mileyn Events Services Ltd. is a Nairobi-based event production and design company specializing in delivering structured, high-quality event solutions for both corporate and private clients.",
    p2: "We combine creativity with precision to ensure every event is not only beautiful — but seamlessly executed. Every event should feel effortless to the client, even though it requires detailed planning behind the scenes.",
    bullets: [
      "Structured planning & execution",
      "Attention to detail at every level",
      "Reliable, professional team",
      "Intimate to large-scale capability",
      "Clean, elegant design approach",
      "Complete event experiences",
    ],
  },
  services: DEFAULT_SERVICES,
  projects: DEFAULT_PROJECTS,
  team: {
    eyebrow: "Behind The Curtain",
    headingTop: "The hands that",
    headingEm: "make it look effortless",
    intro:
      "We don't pose for portraits. We're usually in the back of the room — pinning a stem, relighting a wick, fixing what only we noticed. A few stolen moments from real events.",
    quote: "We measure success by what the guests don't see.",
    frames: [
      { src: bts1, caption: "Golden hour, final stems" },
      { src: bts2, caption: "The last knife laid" },
      { src: bts4, caption: "Two hundred candles before doors" },
      { src: bts3, caption: "A mood board, found" },
    ],
  },
  teamFull: DEFAULT_TEAM,
  testimonials: [
    { quote: "Mileyn didn't just decorate — they transformed the entire experience.", name: "Adaeze & Tomiwa", role: "The Pearl Wedding" },
    { quote: "Professional, organized, and executed flawlessly.", name: "L. Achieng", role: "Executive Gala Host" },
    { quote: "We exhaled the moment they took over. Truly rare.", name: "The Otieno Family", role: "Garden Soirée" },
  ],
  social: DEFAULT_SOCIAL,
  footer: {
    tagline: "Complete event experiences — designed, produced, delivered.",
    copyright: "© 2025 Mileyn Events Services Ltd. All rights reserved.",
  },
};

// Deep-merge override into defaults (arrays are replaced wholesale when provided).
function mergeContent(base: SiteContent, over: Partial<SiteContent> | null): SiteContent {
  if (!over) return base;
  const out: any = { ...base };
  for (const k of Object.keys(over) as (keyof SiteContent)[]) {
    const v = (over as any)[k];
    if (v == null) continue;
    if (Array.isArray(v)) {
      out[k] = v;
    } else if (typeof v === "object") {
      out[k] = { ...(base as any)[k], ...v };
    } else {
      out[k] = v;
    }
  }
  return out as SiteContent;
}

const Ctx = createContext<{
  content: SiteContent;
  loaded: boolean;
  reload: () => Promise<void>;
}>({ content: DEFAULT_CONTENT, loaded: false, reload: async () => {} });

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    try {
      const { data } = await supabase.from("site_content").select("data").eq("id", "singleton").maybeSingle();
      const over = (data?.data as Partial<SiteContent>) || null;
      setContent(mergeContent(DEFAULT_CONTENT, over));
    } catch (e) {
      console.error("content load failed", e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
    const onSaved = () => load();
    window.addEventListener("mileyn:content-saved", onSaved);
    return () => window.removeEventListener("mileyn:content-saved", onSaved);
  }, []);

  return <Ctx.Provider value={{ content, loaded, reload: load }}>{children}</Ctx.Provider>;
}

export function useContent() {
  return useContext(Ctx).content;
}

export async function saveContent(next: SiteContent) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ id: "singleton", data: next as any, updated_at: new Date().toISOString() });
  if (error) throw error;
  window.dispatchEvent(new CustomEvent("mileyn:content-saved"));
}

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("site-images").getPublicUrl(path);
  return data.publicUrl;
}
