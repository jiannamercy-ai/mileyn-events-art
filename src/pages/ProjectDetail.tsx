import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useContent } from "@/lib/content";
import { DetailLayout } from "@/components/site/DetailLayout";

export function ProjectDetail({ slug }: { slug: string }) {
  const projects = useContent().projects;
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-cream text-espresso flex items-center justify-center px-6 py-24">
        <div className="max-w-xl text-center">
          <h1 className="font-display text-4xl">Project not found</h1>
          <p className="mt-4 text-espresso/70">We couldn't find the project you're looking for.</p>
          <div className="mt-8">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-amber-gold bg-amber-gold/10 px-6 py-3 text-sm uppercase tracking-[0.2em] text-amber-gold transition hover:bg-amber-gold/20"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isRecurring = project.recurringAnnual && project.yearEditions && project.yearEditions.length > 0;
  const gallery = project.gallery?.length ? project.gallery : [project.img];
  
  // Sort year editions by year descending (most recent first)
  const sortedYearEditions = isRecurring
    ? [...project.yearEditions!].sort((a, b) => b.year - a.year)
    : [];

  return (
    <DetailLayout eyebrow={project.type} title={project.name} heroImg={project.img}>
      <div className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-amber-gold text-xs uppercase tracking-[0.35em]">{project.type}</p>
            <div className="text-3xl md:text-4xl font-display text-espresso">{project.name}</div>
            {!isRecurring && (
              <div className="text-sm text-espresso/70">{project.location} · {project.guests} · {project.date}</div>
            )}
            {isRecurring && (
              <div className="text-sm text-amber-gold font-medium">Recurring Annual Event</div>
            )}
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-amber-gold bg-amber-gold/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-amber-gold transition hover:bg-amber-gold/20"
          >
            ← Back To Portfolio
          </Link>
        </div>

        {/* Non-recurring project display */}
        {!isRecurring && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((src, index) => (
                <motion.img
                  key={`${src}-${index}`}
                  src={src}
                  alt={`${project.name} image ${index + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                  className="h-72 w-full rounded-xl object-cover"
                  loading="lazy"
                />
              ))}
            </div>

            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <h2 className="font-display text-3xl">Project Story</h2>
                <p className="text-lg leading-relaxed text-espresso/85 font-light">{project.story}</p>
              </div>

              <div className="space-y-6 rounded-xl border border-amber-gold/20 bg-cream p-6 shadow-sm">
                <h3 className="font-display text-2xl">Highlights</h3>
                <div className="space-y-3">
                  {project.highlights.map((highlight) => (
                    <p key={highlight} className="text-sm text-espresso/80">• {highlight}</p>
                  ))}
                </div>
              </div>
            </div>

            {project.testimonial?.quote && (
              <blockquote className="border-l-2 border-amber-gold pl-6 italic font-display text-2xl text-espresso/90">
                "{project.testimonial.quote}"
                <footer className="mt-4 not-italic text-xs uppercase tracking-[0.3em] text-taupe font-sans">
                  — {project.testimonial.author}
                </footer>
              </blockquote>
            )}
          </>
        )}

        {/* Recurring annual event display */}
        {isRecurring && (
          <div className="space-y-8">
            <div className="border-t border-amber-gold/20 pt-8">
              <h2 className="font-display text-3xl mb-8">Annual Editions Archive</h2>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {sortedYearEditions.map((edition, idx) => (
                  <motion.div
                    key={`${edition.year}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    className="space-y-4 rounded-lg border border-amber-gold/30 overflow-hidden bg-cream/50"
                  >
                    {/* Year badge */}
                    <div className="bg-amber-gold text-espresso px-4 py-2">
                      <div className="font-display text-2xl font-bold">{edition.year}</div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-4 space-y-3">
                      <div>
                        <h3 className="font-display text-xl text-espresso">{edition.title}</h3>
                        <p className="text-sm text-amber-gold mt-1">{edition.date}</p>
                      </div>
                      <p className="text-sm text-espresso/75 leading-relaxed">{edition.description}</p>
                    </div>

                    {/* Gallery preview */}
                    {edition.gallery && edition.gallery.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                        {edition.gallery.slice(0, 4).map((img, i) => (
                          <img
                            key={`${edition.year}-${i}`}
                            src={img}
                            alt={`${edition.title} photo ${i + 1}`}
                            className="h-24 w-full object-cover rounded"
                            loading="lazy"
                          />
                        ))}
                        {edition.gallery.length > 4 && (
                          <div className="h-24 w-full rounded bg-espresso/10 flex items-center justify-center">
                            <span className="text-xs text-espresso/60 font-medium">+{edition.gallery.length - 4} more</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DetailLayout>
  );
}
