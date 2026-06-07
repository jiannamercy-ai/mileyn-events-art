import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GoldenThread } from "@/components/site/GoldenThread";
import { SocialLinks } from "@/components/site/SocialLinks";
import { useContent } from "@/lib/content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Mileyn Events" },
      { name: "description", content: "Event production, design, tenting solutions, and premium rentals." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const content = useContent();
  const SOCIAL = content.social;
  const heroImg = content.servicesPage?.heroImg || content.portfolio?.heroImg || content.hero.image;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const serviceCategories = [
    {
      title: "Event Production",
      description: "We handle the technical and structural elements of your event.",
      includes: [
        "Stage setup",
        "Lighting and ambiance",
        "Backdrops and installations",
        "Technical coordination",
      ],
    },
    {
      title: "Event Design & Styling",
      description: "We create visually cohesive environments that reflect your theme and vision.",
      includes: [
        "Concept development",
        "Floral styling",
        "Table and space design",
        "Decorative installations",
      ],
    },
    {
      title: "Tent & Infrastructure Solutions",
      description: "We provide high-quality tenting and spatial design solutions.",
      includes: [
        "Miluxe tents",
        "Pagoda tents",
        "Draping and interior finishes",
        "Layout planning",
        "Custom Structures",
      ],
    },
    {
      title: "Premium Event Rentals",
      description: "Our inventory supports both aesthetics and function.",
      includes: [
        "Chairs (Chiavari, Luxe styles)",
        "Tables and linen",
        "Decor accessories",
        "Lounge setups",
      ],
    },
  ];

  const processSteps = [
    "Inquiry & Consultation",
    "Concept Development",
    "Proposal & Refinement",
    "Execution & Setup",
    "Event Delivery",
  ];

  return (
    <main className="bg-cream text-espresso min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-espresso text-cream">
        <motion.img
          src={heroImg}
          alt="Our Services"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.75 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/40" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-16 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-gold text-xs uppercase tracking-[0.3em] hover:text-cream transition-colors w-fit"
          >
            ← Back
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl mt-8 leading-[1.05] text-balance max-w-4xl"
          >
            Our Services
          </motion.h1>
          <div className="mt-8">
            <GoldenThread width={56} />
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 px-6 md:px-12">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-lg md:text-xl leading-relaxed font-light text-espresso/90">
            Our services are designed to provide a complete, stress-free event experience — from concept to execution.
          </p>
        </motion.div>
      </section>

      {/* Four Service Categories */}
      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {serviceCategories.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="space-y-6 border-b border-amber-gold/20 pb-8"
              >
                <div>
                  <p className="text-amber-gold text-xs uppercase tracking-[0.3em] font-medium">
                    Service {index + 1}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl mt-3">{service.title}</h2>
                  <div className="mt-4">
                    <GoldenThread width={32} />
                  </div>
                </div>

                <p className="text-espresso/85 leading-relaxed font-light">
                  {service.description}
                </p>

                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-taupe font-medium">
                    Includes:
                  </p>
                  <ul className="space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-gold flex-shrink-0" />
                        <span className="text-espresso/85 font-light text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6 md:px-12 border-y border-amber-gold/20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl">Our Process</h2>
              <div className="mt-4">
                <GoldenThread width={40} />
              </div>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 mt-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step Number Circle */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="h-12 w-12 rounded-full bg-amber-gold text-espresso font-display text-lg font-semibold flex items-center justify-center">
                      {index + 1}
                    </div>

                    {/* Connecting Line (hidden on mobile, shown on desktop between steps) */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute left-6 top-12 w-0.5 h-12 bg-amber-gold/30" />
                    )}

                    {/* Step Label */}
                    <p className="mt-4 text-sm md:text-base font-light text-espresso text-center md:text-left leading-snug">
                      {step}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            Let's plan your event the right way.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${SOCIAL.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Mileyn — I'd like to discuss an event.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-gold text-espresso px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold/90 transition-colors"
            >
              Message on WhatsApp
            </a>
            <a
              href={`mailto:${SOCIAL.email}?subject=${encodeURIComponent("Event Inquiry")}`}
              className="inline-block border border-amber-gold text-amber-gold px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold hover:text-espresso transition-colors"
            >
              Or Email Us
            </a>
          </div>
          <div className="pt-8">
            <SocialLinks tone="dark" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
