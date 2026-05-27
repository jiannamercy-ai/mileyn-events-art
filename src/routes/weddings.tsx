import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GoldenThread } from "@/components/site/GoldenThread";
import { SocialLinks } from "@/components/site/SocialLinks";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/weddings")({
  head: () => ({
    meta: [
      { title: "Weddings — Mileyn Events" },
      { name: "description", content: "Create your dream wedding with elegant, cohesive, and thoughtfully executed design." },
    ],
  }),
  component: WeddingsPage,
});

function WeddingsPage() {
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

  const offerings = [
    "Ceremony setup",
    "Reception design",
    "Floral styling",
    "Table settings",
    "Full event transformation",
  ];

  return (
    <main className="bg-cream text-espresso min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-espresso text-cream">
        <motion.img
          src="/hero-event.jpg"
          alt="Wedding Design"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/40" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-16 md:px-12">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-amber-gold text-xs uppercase tracking-[0.3em] hover:text-cream transition-colors w-fit"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </Link>
          <p className="text-amber-gold text-xs uppercase tracking-[0.4em]">Weddings</p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-4xl md:text-7xl text-balance mt-3 leading-[1.05]"
          >
            Your Perfect Day
          </motion.h1>
          <div className="mt-6">
            <GoldenThread width={56} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl space-y-20">
          {/* Emotional Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="space-y-6"
          >
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-balance">
              Your wedding should feel effortless, beautiful, and completely you.
            </h2>
            <div>
              <GoldenThread width={48} />
            </div>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="border-t border-amber-gold/20 pt-12 space-y-6"
          >
            <div>
              <p className="text-amber-gold text-xs uppercase tracking-[0.3em] font-medium mb-4">
                Our Approach
              </p>
              <h3 className="font-display text-3xl md:text-4xl">
                We design weddings that are elegant, cohesive, and thoughtfully executed.
              </h3>
            </div>
            <p className="text-lg md:text-xl leading-relaxed font-light text-espresso/90">
              From the first moment a guest arrives to the last dance of the evening, every detail reflects your vision. We handle the logistics so you can focus on what matters — celebrating with the people you love.
            </p>
          </motion.div>

          {/* What We Provide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="border-t border-amber-gold/20 pt-12 space-y-8"
          >
            <div>
              <p className="text-amber-gold text-xs uppercase tracking-[0.3em] font-medium mb-4">
                What We Provide
              </p>
              <h3 className="font-display text-3xl md:text-4xl mb-8">
                Complete Wedding Experience
              </h3>
            </div>

            <motion.ul
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {offerings.map((offering, index) => (
                <motion.li
                  key={offering}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-gold" />
                  <span className="text-lg text-espresso/85 font-light leading-relaxed">
                    {offering}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-espresso text-cream py-20 px-6 md:px-12">
        <motion.div
          className="mx-auto max-w-4xl text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1]">
            Let's design a wedding you'll never forget.
          </h2>
          <Link
            to="/"
            hash="contact"
            className="inline-block bg-amber-gold text-espresso px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold/90 transition-colors"
          >
            Start Planning
          </Link>
          <div className="pt-8">
            <SocialLinks tone="dark" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
