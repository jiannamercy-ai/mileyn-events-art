import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/lib/content";
import { GoldenThread } from "@/components/site/GoldenThread";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Mileyn Events" },
      { name: "description", content: "Explore our featured projects and portfolio of exceptional events." },
    ],
  }),
  component: PortfolioPage,
});

type FilterCategory = "weddings" | "corporate" | "private";

function PortfolioPage() {
  const projects = useContent().projects;
  const SOCIAL = useContent().social;
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("weddings");

  const filterConfig = {
    weddings: {
      label: "Weddings",
      fn: (type: string) => type.includes("Wedding") || type.includes("Destination"),
    },
    corporate: {
      label: "Corporate",
      fn: (type: string) => type.includes("Corporate") || type.includes("Gala") || type.includes("Launch"),
    },
    private: {
      label: "Private",
      fn: (type: string) => type.includes("Private") || type.includes("Anniversary") || type.includes("Celebration"),
    },
  };

  const filteredProjects = projects.filter((p) => filterConfig[activeFilter].fn(p.type));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <main className="bg-cream text-espresso min-h-screen">
      <Navbar visible={true} />
      {/* Header Section */}
      <section className="bg-espresso text-cream py-24 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-gold text-xs uppercase tracking-[0.3em] hover:text-cream transition-colors"
          >
            ← Back
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl mt-8 leading-[1.05] text-balance max-w-4xl"
          >
            Our Work
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
            Each project reflects our commitment to detail, design, and execution.
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="flex flex-wrap gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
          >
            {(Object.keys(filterConfig) as FilterCategory[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className="relative pb-2 text-sm md:text-base font-light tracking-[0.15em] uppercase transition-colors"
              >
                <span className={activeFilter === key ? "text-amber-gold" : "text-espresso/60 hover:text-espresso"}>
                  {filterConfig[key].label}
                </span>
                <AnimatePresence>
                  {activeFilter === key && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-gold"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid Gallery */}
      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => window.location.href = `/portfolio/${project.slug}`}
                >
                  {/* Card Container */}
                  <div className="space-y-4">
                    {/* Image Container with Hover Effect */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-espresso/5">
                      <motion.img
                        src={project.img}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        loading="lazy"
                      />
                      {/* Overlay on Hover */}
                      <motion.div
                        className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-colors duration-300"
                        initial={false}
                      />
                    </div>

                    {/* Project Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl text-espresso group-hover:text-amber-gold transition-colors">
                          {project.name}
                        </h3>
                      </div>

                      {/* Type Tag */}
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1.5 border border-amber-gold/40 text-xs uppercase tracking-[0.15em] text-taupe hover:border-amber-gold hover:text-amber-gold transition-colors">
                          {project.type}
                        </span>
                      </div>

                      {/* Link */}
                      <Link
                        to={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 text-amber-gold text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
                      >
                        View Project <span>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-espresso/60 font-light">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-espresso text-cream py-20 px-6 md:px-12 border-t border-amber-gold/20">
        <motion.div
          className="mx-auto max-w-4xl text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1]">
            Ready to create your next unforgettable event?
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
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
