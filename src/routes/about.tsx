import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GoldenThread } from "@/components/site/GoldenThread";
import { SocialLinks } from "@/components/site/SocialLinks";
import { useContent } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mileyn Events" },
      { name: "description", content: "Learn about Mileyn Events Services Ltd., a Nairobi-based event production and design company." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const bulletPoints = [
    "Understand your vision",
    "Design the experience",
    "Execute with precision",
  ];

  const differentiators = [
    "We focus on complete event experiences, not isolated services",
    "We maintain high standards of organization and execution",
    "We are built for both design and logistics",
    "We prioritize professional delivery, not guesswork",
  ];

  const content = useContent();
  const heroImg = content.about.image || content.hero.image;

  return (
    <main className="bg-cream text-espresso min-h-screen">
      {/* Hero/Intro Section */}
      <section className="relative py-32 px-6 md:px-12 text-cream">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.img
            src={heroImg}
            alt="About hero background"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        </div>
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-gold text-xs uppercase tracking-[0.3em] hover:text-cream transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl mt-8 leading-[1.05] text-balance max-w-4xl"
          >
            We don't just set up events. We build experiences.
          </motion.h1>
          <div className="mt-8">
            <GoldenThread width={56} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-12">
        <motion.div
          className="mx-auto max-w-4xl space-y-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Company Overview */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-lg md:text-xl leading-relaxed font-light text-espresso/90">
              Mileyn Events Services Ltd. is a Nairobi-based event production and design company specializing in delivering structured, high-quality event solutions for both corporate and private clients. We combine creativity with precision to ensure every event is not only beautiful — but seamlessly executed.
            </p>
          </motion.div>

          {/* Philosophy / Our Approach */}
          <motion.div variants={itemVariants} className="space-y-6 border-y border-amber-gold/20 py-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl">Our Approach</h2>
              <div className="mt-4">
                <GoldenThread width={40} />
              </div>
            </div>
            <p className="text-lg leading-relaxed text-espresso/85 font-light">
              We believe every event should feel effortless to the client — even though it requires detailed planning behind the scenes.
            </p>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-taupe font-medium">Our role is to:</p>
              <ul className="space-y-2">
                {bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <span className="mt-2 h-2 w-2 rounded-full bg-amber-gold flex-shrink-0" />
                    <span className="text-espresso/85 leading-relaxed font-light">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* What Makes Us Different */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl">What Makes Us Different</h2>
            <div className="mt-4">
              <GoldenThread width={40} />
            </div>
            <ul className="space-y-4 mt-8">
              {differentiators.map((point, idx) => {
                const parts = point.split("**");
                return (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="mt-2 h-2 w-2 rounded-full bg-amber-gold flex-shrink-0" />
                    <span className="text-espresso/85 leading-relaxed font-light">
                      {parts.map((part, i) =>
                        i % 2 === 1 ? (
                          <span key={i} className="font-semibold">
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
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
            Work with a team that understands both design and execution.
          </h2>
          <Link
            to="/"
            hash="contact"
            className="inline-block bg-amber-gold text-espresso px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold/90 transition-colors"
          >
            Start Your Inquiry
          </Link>
          <div className="pt-8">
            <SocialLinks tone="dark" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
