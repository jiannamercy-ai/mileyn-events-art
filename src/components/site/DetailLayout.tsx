import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GoldenThread } from "./GoldenThread";
import { SocialLinks } from "./SocialLinks";
import { useContent } from "@/lib/content";

export function DetailLayout({
  eyebrow,
  title,
  heroImg,
  children,
}: {
  eyebrow: string;
  title: string;
  heroImg: string;
  children: React.ReactNode;
}) {
  const SOCIAL = useContent().social;
  const waNumber = SOCIAL.whatsapp.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hello Mileyn — I'd like to discuss an event."
  )}`;
  const emailUrl = `mailto:${SOCIAL.email}?subject=${encodeURIComponent(
    "Event Inquiry"
  )}`;

  return (
    <main className="bg-cream text-espresso min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-espresso text-cream">
        <motion.img
          src={heroImg}
          alt={title}
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
          <p className="text-amber-gold text-xs uppercase tracking-[0.4em]">{eyebrow}</p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-4xl md:text-7xl text-balance mt-3 leading-[1.05]"
          >
            {title}
          </motion.h1>
          <div className="mt-6"><GoldenThread width={56} /></div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">{children}</div>
      </section>

      {/* CTA */}
      <section className="bg-espresso text-cream py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-5xl">Ready to begin?</h2>
          <p className="mt-4 text-cream/70 font-light">
            Reach out — we'll respond personally within 24 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-gold text-espresso px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold/90 transition-colors"
            >
              Message on WhatsApp
            </a>
            <a
              href={emailUrl}
              className="border border-amber-gold text-amber-gold px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold hover:text-espresso transition-colors"
            >
              Or Email Us
            </a>
          </div>
          <div className="mt-8 flex justify-center"><SocialLinks tone="dark" /></div>
        </div>
      </section>
    </main>
  );
}
