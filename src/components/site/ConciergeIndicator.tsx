import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ConciergeIndicator() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-72 rounded-sm bg-cream p-6 shadow-[0_20px_60px_-20px_rgba(60,42,36,0.4)]"
          >
            {/* Tracing border */}
            <span className="pointer-events-none absolute inset-0">
              <motion.span
                className="absolute left-0 top-0 h-px bg-amber-gold"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.25, delay: 0 }}
              />
              <motion.span
                className="absolute right-0 top-0 w-px bg-amber-gold"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.25, delay: 0.25 }}
              />
              <motion.span
                className="absolute right-0 bottom-0 h-px bg-amber-gold"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.25, delay: 0.5 }}
              />
              <motion.span
                className="absolute left-0 bottom-0 w-px bg-amber-gold"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.25, delay: 0.75 }}
              />
            </span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="font-display text-lg text-espresso leading-snug">
                We're here. Tell us about your dream event.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="thread-link mt-4 inline-block text-amber-gold text-sm tracking-widest uppercase"
              >
                Begin →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setOpen((v) => !v);
          // Scroll to contact form
          setTimeout(() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }}
        className="group flex items-center gap-3 rounded-full bg-espresso/85 backdrop-blur px-4 py-2.5 text-cream text-xs tracking-[0.18em] uppercase shadow-lg hover:bg-espresso transition-colors"
      >
        <span className="relative flex h-2 w-2">
          <motion.span
            className="absolute inset-0 rounded-full bg-amber-gold"
            animate={{
              scale: [1, 1.6, 1, 1.6, 1, 2.2, 1],
              opacity: [1, 0.4, 1, 0.4, 1, 0.2, 1],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative inline-block h-2 w-2 rounded-full bg-amber-gold" />
        </span>
        Curators Available
      </button>
    </div>
  );
}
