
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/lib/content";
import { WhatsAppIcon, InstagramIcon, EmailIcon } from "./BrandIcons";
import { Phone } from "lucide-react";

export function FloatingSocials() {
  const SOCIAL = useContent().social;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = `https://wa.me/${SOCIAL.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Mileyn Events — I'd like to discuss an event."
  )}`;
  const mail = `mailto:${SOCIAL.email}?subject=${encodeURIComponent("Event Inquiry — Mileyn Events")}`;
  const ig = `https://instagram.com/${SOCIAL.instagram}`;

  const items = [
    {
      label: "WhatsApp",
      href: wa,
      Icon: WhatsAppIcon,
      bg: "bg-[#25D366]",
      shadow: "shadow-[0_8px_24px_-6px_rgba(37,211,102,0.55)]",
    },
    {
      label: "Instagram",
      href: ig,
      Icon: InstagramIcon,
      bg: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]",
      shadow: "shadow-[0_8px_24px_-6px_rgba(214,41,118,0.55)]",
    },
    {
      label: "Email",
      href: mail,
      Icon: EmailIcon,
      bg: "bg-amber-gold",
      shadow: "shadow-[0_8px_24px_-6px_rgba(200,169,126,0.7)]",
    },
    {
      label: "Call",
      href: "tel:+254722110000",
      Icon: ({ className }: { className?: string }) => <Phone className={className} />,
      bg: "bg-[#2c2c2c]",
      shadow: "shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)]",
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed right-4 top-1/2 -translate-y-1/2 md:right-6 z-40 flex flex-col gap-3"
        >
          {items.map(({ label, href, Icon, bg, shadow }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`group relative flex h-13 w-13 md:h-14 md:w-14 items-center justify-center rounded-full ${bg} ${shadow} text-white`}
              style={{ height: 52, width: 52 }}
            >
              <span
                aria-hidden
                className={`absolute inset-0 rounded-full ${bg} opacity-50 animate-ping`}
                style={{ animationDuration: "2.6s" }}
              />
              <Icon className="relative h-6 w-6" />
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-sm bg-espresso text-cream text-[10px] uppercase tracking-[0.25em] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
