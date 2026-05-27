import { motion } from "framer-motion";
import { GoldenThread } from "./GoldenThread";

const POINTS = [
  "Structured planning and execution",
  "Attention to detail at every level",
  "Reliable, professional team",
  "Ability to deliver both intimate and large-scale events",
  "Clean, elegant design approach",
];

export function WhyMileyn() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="relative bg-espresso text-cream py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-display text-4xl md:text-6xl text-balance leading-tight">
            Why Clients Choose Mileyn
          </h2>
          <div className="mt-6">
            <GoldenThread width={48} />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="mt-16 grid md:grid-cols-2 gap-10 lg:gap-16"
        >
          {POINTS.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <span className="font-display text-3xl md:text-4xl text-amber-gold">
                  {String(index + 1).padStart(2, "0")}.
                </span>
              </div>
              <div className="flex-1 pt-2">
                <p className="text-lg md:text-xl font-light leading-relaxed text-cream/95">
                  {point}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
