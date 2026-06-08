import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Corporate", href: "/corporate" },
  { label: "Weddings", href: "/weddings" },
  { label: "Private Events", href: "/private-events" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-cream/85 backdrop-blur-md border-b border-amber-gold/15" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex flex-col leading-none">
          <span className="logo-mileyn text-[18px] md:text-[22px]">Mileyn</span>
          <span className="logo-events text-[7px] md:text-[8px] mt-1">Events</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href as any}
              className={`thread-link text-[13px] tracking-wide font-body font-light ${
                scrolled ? "text-espresso" : "text-cream"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden md:inline-flex gold-sweep items-center justify-center bg-amber-gold text-cream px-5 py-2.5 text-[12px] tracking-[0.18em] uppercase font-body font-medium hover:bg-amber-gold/90 transition-colors"
        >
          Begin Your Vision
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0, backgroundColor: open ? "#C8A97E" : scrolled ? "#3C2A24" : "#F9F7F4" }}
            className="block h-px w-6"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1, backgroundColor: scrolled ? "#3C2A24" : "#F9F7F4" }}
            className="block h-px w-6"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0, backgroundColor: open ? "#C8A97E" : scrolled ? "#3C2A24" : "#F9F7F4" }}
            className="block h-px w-6"
          />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="md:hidden overflow-hidden bg-cream"
      >
        <div className="flex flex-col px-8 py-6 gap-4">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              to={l.href as any}
              onClick={() => setOpen(false)}
              className="text-espresso font-display text-2xl py-3 border-b border-amber-gold/30"
            >
              {l.label}
              {i === LINKS.length - 1 ? null : null}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 bg-amber-gold text-cream px-5 py-3 text-center tracking-widest uppercase text-xs"
          >
            Begin Your Vision
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
