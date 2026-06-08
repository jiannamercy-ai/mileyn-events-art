import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useContent } from "@/lib/content";
import { GoldenThread } from "@/components/site/GoldenThread";
import { SocialLinks } from "@/components/site/SocialLinks";
import { TeamGallery } from "@/components/site/TeamGallery";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet The Team — Mileyn Events" },
      { name: "description", content: "The curators behind Mileyn Events." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const TEAM_FULL = useContent().teamFull;
  return (
    <main className="bg-cream text-espresso min-h-screen">
      <section className="relative bg-espresso text-cream py-24 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-gold text-xs uppercase tracking-[0.3em] hover:text-cream transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </Link>
          <p className="mt-8 text-amber-gold text-xs uppercase tracking-[0.4em]">The People</p>
          <h1 className="font-display text-5xl md:text-7xl mt-3">Meet The Curators</h1>
          <div className="mt-6"><GoldenThread width={56} /></div>
          <p className="mt-8 max-w-xl text-cream/75 text-lg font-light leading-relaxed">
            A small, deliberate team. Each one of us is here because we cannot imagine doing anything else.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto max-w-6xl space-y-24">
          {TEAM_FULL.map((m, i) => (
            <motion.article
              key={m.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9 }}
              className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-champagne">
                <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-amber-gold text-xs uppercase tracking-[0.3em]">{m.role}</p>
                <h2 className="font-display text-4xl md:text-5xl mt-2">{m.name}</h2>
                <div className="mt-4"><GoldenThread width={36} /></div>
                <p className="mt-6 text-espresso/85 leading-relaxed font-light">{m.bio}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {m.specialties.map((s) => (
                    <span key={s} className="text-sm text-taupe flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-amber-gold" />{s}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-taupe">{m.years} with Mileyn</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <TeamGallery />

      <section className="bg-espresso text-cream py-20 px-6 md:px-12 text-center">
        <h2 className="font-display text-3xl md:text-5xl">Work with us</h2>
        <div className="mt-8 flex justify-center"><SocialLinks tone="dark" /></div>
      </section>
    </main>
  );
}
