import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DetailLayout } from "@/components/site/DetailLayout";
import { GoldenThread } from "@/components/site/GoldenThread";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Events — Mileyn Events" },
      {
        name: "description",
        content: "Professional event execution for brands that require precision, reliability, and impact.",
      },
    ],
  }),
  component: CorporatePage,
});

function CorporatePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const eventsWeHandle = [
    "Product launches",
    "Conferences",
    "Award ceremonies",
    "Corporate dinners",
    "Brand activations",
  ];

  const whyChooseUs = [
    "Structured execution",
    "Professional coordination",
    "Clean, high-end setups",
    "Ability to handle scale",
  ];

  return (
    <DetailLayout
      eyebrow="Corporate Events"
      title="Professional Excellence"
      heroImg="/hero-event.jpg"
    >
      <div className="space-y-20">
        {/* Intro Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="space-y-6"
        >
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-balance">
            Professional event execution for brands that require precision, reliability, and impact.
          </h2>
          <div>
            <GoldenThread width={48} />
          </div>
        </motion.div>

        {/* Events We Handle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="border-t border-amber-gold/20 pt-12 space-y-6"
        >
          <div>
            <p className="text-amber-gold text-xs uppercase tracking-[0.3em] font-medium mb-4">
              Events We Handle
            </p>
            <h3 className="font-display text-3xl md:text-4xl">
              A Diverse Range of Corporate Experiences
            </h3>
          </div>

          <motion.ul
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {eventsWeHandle.map((event) => (
              <motion.li
                key={event}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-gold" />
                <span className="text-lg text-espresso/85 font-light leading-relaxed">
                  {event}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Why Corporates Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="border-t border-amber-gold/20 pt-12 space-y-8"
        >
          <div>
            <p className="text-amber-gold text-xs uppercase tracking-[0.3em] font-medium mb-4">
              Why Corporates Choose Us
            </p>
            <h3 className="font-display text-3xl md:text-4xl mb-8">
              Our Commitment to Excellence
            </h3>
          </div>

          <motion.ul
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {whyChooseUs.map((reason) => (
              <motion.li
                key={reason}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-gold" />
                <span className="text-lg text-espresso/85 font-light leading-relaxed">
                  {reason}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="border-t border-amber-gold/20 pt-12 text-center space-y-6"
        >
          <h3 className="font-display text-3xl md:text-4xl">
            Partner with a team that delivers without compromise.
          </h3>
          <Link
            to="/"
            hash="contact"
            className="inline-block bg-espresso text-cream px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:bg-espresso/90 transition-colors border border-espresso"
          >
            Work With Us
          </Link>
        </motion.div>
      </div>
    </DetailLayout>
  );
}
