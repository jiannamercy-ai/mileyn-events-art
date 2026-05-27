import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GoldenThread } from "@/components/site/GoldenThread";
import { SocialLinks } from "@/components/site/SocialLinks";
import { ArrowLeft } from "lucide-react";
import { useContent } from "@/lib/content";

export const Route = createFileRoute("/private-events")({
  head: () => ({
    meta: [
      { title: "Private Events — Mileyn Events" },
      { name: "description", content: "Intimate celebrations and private occasions, beautifully orchestrated." },
    ],
  }),
  component: PrivateEventsPage,
});

function PrivateEventsPage() {
  const content = useContent();
  const heroImg = (content as any).privateEvents?.heroImg || "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1600&q=75";
  
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
    "Milestone birthdays",
    "Anniversary celebrations",
    "Engagement dinners",
    "Baby welcomes",
    "Intimate gatherings",
  ];

  const whyChooseUs = [
    "Discreet & personal attention",
    "Intimate-scale expertise",
    "Sophisticated design",
    "Attention to your moment",
  ];

  return (
    <main className="bg-cream text-espresso min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-espresso text-cream">
        <motion.img
          src={heroImg}
          alt="Private Events"
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
          <p className="text-amber-gold text-xs uppercase tracking-[0.4em]">Private Events</p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-4xl md:text-7xl text-balance mt-3 leading-[1.05]"
          >
            Your Moment, Perfectly Yours
          </motion.h1>
          <div className="mt-6">
            <GoldenThread width={56} />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl space-y-20">
          {/* Intro Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="space-y-6"
          >
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-balance">
              Intimate celebrations, impeccably orchestrated.
            </h2>
            <div>
              <GoldenThread width={48} />
            </div>
            <p className="text-lg text-espresso/85 font-light leading-relaxed">
              Milestone birthdays, anniversaries, engagement dinners, and intimate gatherings. Smaller in scale, never in care. We create moments that feel entirely yours.
            </p>
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
                Occasions We Celebrate
              </p>
              <h3 className="font-display text-3xl md:text-4xl">
                Intimacy, Elevated
              </h3>
            </div>

            <motion.ul
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {offerings.map((event) => (
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

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="border-t border-amber-gold/20 pt-12 space-y-8"
          >
            <div>
              <p className="text-amber-gold text-xs uppercase tracking-[0.3em] font-medium mb-4">
                Why Choose Mileyn
              </p>
              <h3 className="font-display text-3xl md:text-4xl mb-8">
                Your Celebration, Your Way
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
              Let us make your moment unforgettable.
            </h3>
            <Link
              to="/"
              hash="contact"
              className="inline-block bg-espresso text-cream px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:bg-espresso/90 transition-colors border border-espresso"
            >
              Begin Your Vision
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-espresso text-cream py-20 px-6 md:px-12">
        <motion.div
          className="mx-auto max-w-4xl text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1]">
            Ready to celebrate?
          </h2>
          <p className="text-cream/70 font-light">
            Reach out — we'll respond personally within 24 hours.
          </p>
          <div className="pt-8">
            <SocialLinks tone="dark" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
