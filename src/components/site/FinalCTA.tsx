import { motion } from "framer-motion";
import { useContent } from "@/lib/content";

export function FinalCTA() {
  const SOCIAL = useContent().social;
  const waNumber = SOCIAL.whatsapp.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hello Mileyn — I'd like to discuss an event."
  )}`;

  return (
    <section className="relative bg-espresso text-cream py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(200,169,126,0.25),transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <p className="text-amber-gold text-[11px] uppercase tracking-[0.4em] font-medium">
          Let's Begin
        </p>
        <h2 className="font-display text-4xl md:text-6xl mt-5 text-balance leading-tight">
          Let's Create Something{" "}
          <em className="font-light italic text-amber-gold">Exceptional</em>
        </h2>
        <p className="mt-6 text-cream/80 text-base md:text-lg font-light max-w-xl mx-auto">
          Tell us about your event and we'll guide you through the process.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="gold-sweep bg-amber-gold text-espresso px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-amber-gold/90 transition-colors"
          >
            Request a Proposal
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-sweep border border-amber-gold text-amber-gold px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-amber-gold hover:text-espresso transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
