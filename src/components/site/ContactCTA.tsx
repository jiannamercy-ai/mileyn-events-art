import { useContent } from "@/lib/content";

interface ContactCTAProps {
  variant?: "primary" | "secondary" | "text";
  className?: string;
  showLabel?: boolean;
}

export function ContactCTA({
  variant = "primary",
  className = "",
  showLabel = false,
}: ContactCTAProps) {
  const SOCIAL = useContent().social;
  
  const waNumber = SOCIAL.whatsapp.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hello Mileyn — I'd like to discuss an event."
  )}`;
  const emailUrl = `mailto:${SOCIAL.email}?subject=${encodeURIComponent(
    "Event Inquiry"
  )}`;

  const baseClasses = "text-xs tracking-[0.3em] uppercase font-medium transition-colors";

  const variants = {
    primary: `bg-amber-gold text-espresso px-8 py-4 hover:bg-amber-gold/90 ${className}`,
    secondary: `border border-amber-gold text-amber-gold px-8 py-4 hover:bg-amber-gold hover:text-espresso ${className}`,
    text: `text-amber-gold thread-link inline-block ${className}`,
  };

  return (
    <div className="flex flex-col gap-3">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${variants[variant]} gold-sweep`}
      >
        {showLabel ? "WhatsApp" : "Message on WhatsApp"}
      </a>
      <a
        href={emailUrl}
        className={`${baseClasses} text-[11px] text-amber-gold/70 hover:text-amber-gold`}
      >
        or email us
      </a>
    </div>
  );
}
