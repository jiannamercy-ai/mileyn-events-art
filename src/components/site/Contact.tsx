import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoldenThread } from "./GoldenThread";
import { SocialLinks } from "./SocialLinks";
import { useContent } from "@/lib/content";

const EVENT_TYPES = [
  "Wedding",
  "Corporate Gala / Launch",
  "Conference",
  "Private Celebration",
  "Destination Event",
  "Other",
];

const BUDGET_RANGES = [
  "Under KSh 500K",
  "KSh 500K – 1M",
  "KSh 1M – 3M",
  "KSh 3M – 6M",
  "KSh 6M+",
];

export function Contact() {
  const SOCIAL = useContent().social;
  const [submitted, setSubmitted] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPulsing(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const eventType = String(data.get("eventType") || "").trim();
    const eventDate = String(data.get("eventDate") || "").trim();
    const guestCount = String(data.get("guestCount") || "").trim();
    const venue = String(data.get("venue") || "").trim();
    const budget = String(data.get("budget") || "").trim();
    const message = String(data.get("message") || "").trim();

    const lines = [
      "New booking inquiry — Mileyn Events",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Event type: ${eventType || "—"}`,
      `Event date: ${eventDate || "—"}`,
      `Guest count: ${guestCount || "—"}`,
      `Venue: ${venue || "—"}`,
      `Budget range: ${budget || "—"}`,
      "",
      "Message:",
      message || "—",
    ];
    const body = lines.join("\n");
    const subject = `Booking Inquiry — ${name || "New Lead"}${eventType ? ` (${eventType})` : ""}`;

    const mailUrl = `mailto:${SOCIAL.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const waNumber = SOCIAL.whatsapp.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(body)}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      window.location.href = mailUrl;
    }, 350);

    setTimeout(() => {
      setSubmitted(true);
      setPulsing(false);
    }, 700);
  };

  return (
    <section id="contact" className="relative bg-cream text-espresso py-28 px-6 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-amber-gold text-[11px] uppercase tracking-[0.4em] font-medium glow-gold-text">
            Begin Your Inquiry
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-balance mt-3">
            Let's Create Something <em className="font-light italic text-amber-gold glow-gold-text">Exquisite</em> Together
          </h2>
          <div className="mt-5 flex justify-center"><GoldenThread width={48} /></div>
          <p className="mt-5 text-espresso/75 text-sm md:text-base max-w-xl mx-auto">
            Your booking form delivers to both our inbox <span className="text-amber-gold font-medium">and</span> our WhatsApp the moment you press send.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mt-14 bg-white p-8 md:p-14 shadow-[0_30px_80px_-40px_rgba(60,42,36,0.45)] ring-1 ring-amber-gold/15"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-x-8 gap-y-6"
              >
                <Field label="Name" name="name" required />
                <Field label="Phone" name="phone" type="tel" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Event Date" name="eventDate" type="date" />
                <Field label="Guest Count" name="guestCount" type="number" placeholder="e.g. 150" />
                <Field label="Venue" name="venue" placeholder="Venue or city if undecided" />
                <SelectField label="Event Type" name="eventType" options={EVENT_TYPES} />
                <SelectField label="Budget Range" name="budget" options={BUDGET_RANGES} />
                <Field label="Tell Us About Your Event" name="message" textarea placeholder="Vision, theme, anything that matters to you..." className="md:col-span-2" />

                <div className="md:col-span-2 mt-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <motion.button
                      type="submit"
                      animate={pulsing ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.4 }}
                      className="gold-sweep bg-amber-gold text-espresso font-medium px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold/90 transition-colors relative overflow-hidden shadow-[0_15px_35px_-12px_rgba(200,169,126,0.7)]"
                    >
                      Submit Inquiry
                      {pulsing && (
                        <motion.span
                          className="absolute inset-0 bg-amber-gold rounded-full"
                          initial={{ scale: 0, opacity: 0.5 }}
                          animate={{ scale: 8, opacity: 0 }}
                          transition={{ duration: 0.8 }}
                        />
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        const waNumber = SOCIAL.whatsapp.replace(/[^0-9]/g, "");
                        window.open(`https://wa.me/${waNumber}`, "_blank", "noopener,noreferrer");
                      }}
                      className="bg-transparent border-2 border-amber-gold text-amber-gold font-medium px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold hover:text-espresso transition-colors"
                    >
                      Chat on WhatsApp
                    </motion.button>
                  </div>
                  <p className="mt-3 text-[11px] text-taupe">
                    Submit your inquiry to receive a response in both email <span className="text-amber-gold">and</span> WhatsApp within 24 hours.
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8 }}
                className="text-center py-10"
              >
                <p className="font-display text-2xl md:text-3xl text-espresso text-balance leading-snug">
                  Your inquiry is on its way — by email and WhatsApp.<br />We'll respond within 24 hours — usually sooner.<br />
                  <em className="text-amber-gold not-italic font-light italic">We're already excited.</em>
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="h-px bg-amber-gold mx-auto mt-8"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <SocialLinks tone="light" />
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-espresso/85">
            <a href={`mailto:${SOCIAL.email}`} className="thread-link">{SOCIAL.email}</a>
            <span className="h-1 w-1 rounded-full bg-amber-gold" />
            <a href={`tel:${SOCIAL.phone}`} className="thread-link">{SOCIAL.whatsappDisplay}</a>
            <span className="h-1 w-1 rounded-full bg-amber-gold" />
            <span>By Appointment Only</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const Cmp = textarea ? "textarea" : "input";
  return (
    <label className={`relative flex flex-col gap-2 ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-espresso/70 font-medium">{label}{required && " *"}</span>
      <Cmp
        name={name}
        type={textarea ? undefined : type}
        required={required}
        placeholder={placeholder}
        rows={textarea ? 4 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent border-b border-espresso/25 py-3 text-espresso placeholder:text-taupe/70 focus:outline-none transition-colors resize-none"
      />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-1/2 h-px bg-amber-gold"
        animate={{ width: focused ? "100%" : 0, x: "-50%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  const [focused, setFocused] = useState(false);
  return (
    <label className="relative flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-[0.3em] text-espresso/70 font-medium">{label}</span>
      <select
        name={name}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent border-b border-espresso/25 py-3 text-espresso focus:outline-none"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-1/2 h-px bg-amber-gold"
        animate={{ width: focused ? "100%" : 0, x: "-50%" }}
        transition={{ duration: 0.3 }}
      />
    </label>
  );
}
