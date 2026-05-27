import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { GoldenThread } from "./GoldenThread";
import { useContent } from "@/lib/content";

const PORTFOLIO_CTAS = [
  "Step Inside",
  "Read The Story",
  "Walk The Garden",
  "Open The Album",
  "Hear The Brand",
  "Pull Up A Chair",
];

export function Portfolio() {
  const PROJECTS = useContent().projects;

  return (
    <section id="portfolio" className="relative bg-espresso text-cream py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-6xl">Selected Experiences</h2>
          <div className="mt-5"><GoldenThread width={48} /></div>
          <p className="mt-6 text-cream/80 text-lg font-light max-w-2xl">
            A glimpse into the environments we've designed and executed.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((item, i) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative aspect-[3/4] overflow-hidden bg-charcoal"
            >
              <Link to={`/portfolio/${item.slug}`} className="block h-full w-full cursor-pointer">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent group-hover:from-espresso/90 transition-all duration-500" />
                <span className="pointer-events-none absolute inset-0 border border-amber-gold/0 group-hover:border-amber-gold/80 transition-colors duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-amber-gold/80 text-[10px] uppercase tracking-[0.3em]">{item.type}</p>
                  <h3 className="font-display text-2xl text-cream mt-1">{item.name}</h3>
                  <span className="mt-2 inline-block text-amber-gold text-[11px] uppercase tracking-[0.25em] glow-gold-text opacity-0 group-hover:opacity-100 transition-opacity">
                    {PORTFOLIO_CTAS[i % PORTFOLIO_CTAS.length]} →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <Link
            to="/portfolio"
            className="inline-block px-8 py-3 bg-amber-gold text-espresso font-medium text-sm uppercase tracking-[0.15em] hover:bg-amber-gold/90 transition-all duration-300 hover:shadow-lg"
          >
            View Full Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
