import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { GoldenThread } from "./GoldenThread";
import { useContent } from "@/lib/content";

const SERVICE_CTAS = [
  "Read The Full Story",
  "See What's Included",
  "Walk Through The Process",
  "Plan A Destination",
  "Step Into The Atelier",
  "Meet The Production Team",
];

export function Services() {
  const allServices = useContent().services;
  const FEATURED_SLUGS = [
    "event-production",
    "event-design-styling",
    "tent-infrastructure",
    "premium-rentals",
  ];
  const SERVICES = allServices.filter((s) => FEATURED_SLUGS.includes(s.slug));

  return (
    <section id="services" className="relative bg-cream text-espresso py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-amber-gold text-[11px] uppercase tracking-[0.4em] font-medium glow-gold-text">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-6xl mt-4">End-to-end event solutions</h2>
          <div className="mt-5 flex justify-center"><GoldenThread width={48} /></div>
          <p className="mt-6 text-taupe text-lg font-light max-w-xl mx-auto">
            We provide end-to-end event solutions tailored to your vision, your guests, and your standards.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative bg-white border border-amber-gold/30 hover:border-amber-gold transition-all duration-500 hover:shadow-[0_30px_60px_-30px_rgba(200,169,126,0.5)] hover:-translate-y-1.5"
            >
              <motion.span
                className="absolute left-0 top-0 h-px bg-amber-gold"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 + 0.2 }}
              />
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl text-espresso">{s.name}</h3>
                <p className="mt-2 text-sm text-taupe font-light">{s.tagline}</p>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="thread-link mt-5 inline-block text-amber-gold text-xs uppercase tracking-[0.25em] font-medium glow-gold-text"
                >
                  {SERVICE_CTAS[i % SERVICE_CTAS.length]} →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <Link
            to="/services"
            className="inline-block px-8 py-3 bg-amber-gold text-espresso font-medium text-sm uppercase tracking-[0.15em] hover:bg-amber-gold/90 transition-all duration-300 hover:shadow-lg"
          >
            Explore Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
