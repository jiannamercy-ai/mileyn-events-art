import { motion } from "framer-motion";
import { useState } from "react";
import { useContent } from "@/lib/content";

export function TeamGallery() {
  const { teamGallery } = useContent();
  const [activeTab, setActiveTab] = useState<"team" | "bts" | "all">("all");

  const teamImages = teamGallery.team || [];
  const btsImages = teamGallery.behindTheScenes || [];
  const allImages = [...teamImages, ...btsImages];

  const displayImages = activeTab === "team" ? teamImages : activeTab === "bts" ? btsImages : allImages;

  if (allImages.length === 0) {
    return null;
  }

  const tabs = [
    { id: "team", label: "Team" },
    { id: "bts", label: "Behind the Scenes" },
    { id: "all", label: "All" },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 bg-cream text-espresso">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-amber-gold text-xs uppercase tracking-[0.35em] mb-3">Our Story</p>
          <h2 className="font-display text-4xl md:text-5xl">
            <span className="text-espresso">The Team </span>
            <span className="text-amber-gold">& Behind the Scenes</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-3 md:gap-6 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "team" | "bts" | "all")}
              className={`px-4 md:px-6 py-2 text-sm uppercase tracking-[0.2em] transition-all border rounded-full ${
                activeTab === tab.id
                  ? "border-amber-gold bg-amber-gold text-cream"
                  : "border-amber-gold/30 text-amber-gold hover:border-amber-gold/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {displayImages.map((image, idx) => (
            <motion.div
              key={`${image}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow group"
            >
              <img
                src={image}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {displayImages.length === 0 && (
          <div className="text-center py-12 text-espresso/50">
            <p className="text-sm">No images available for this gallery.</p>
          </div>
        )}
      </div>
    </section>
  );
}
