import { motion } from "framer-motion";

export function BrandStrip() {
  return (
    <section className="relative bg-espresso text-cream py-16 px-6 md:px-12 border-y border-amber-gold/20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-amber-gold text-[10px] uppercase tracking-[0.4em] font-medium">
          Our Positioning
        </p>
        <p className="mt-5 font-display text-2xl md:text-4xl leading-snug text-balance">
          Not just decor. Not just rentals.{" "}
          <em className="not-italic italic font-light text-amber-gold">
            We create complete event experiences.
          </em>
        </p>
      </motion.div>
    </section>
  );
}
