import { motion } from "framer-motion";
import { GoldenThread } from "./GoldenThread";
import { useContent } from "@/lib/content";

export function Testimonials() {
  const TESTIMONIALS = useContent().testimonials;
  return (
    <section className="relative bg-espresso text-cream py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-6xl">In Their Own Words</h2>
          <div className="mt-5"><GoldenThread width={48} /></div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative overflow-hidden bg-charcoal border border-amber-gold/30 aspect-square"
            >
              <img
                src={testimonial.image}
                alt={testimonial.alt || `Client testimonial ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <a href="#contact" className="thread-link text-amber-gold text-xs uppercase tracking-[0.25em]">
            Ready to Start Your Event? →
          </a>
        </div>
      </div>
    </section>
  );
}
