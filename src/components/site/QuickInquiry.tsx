import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useContent } from "@/lib/content";

export function QuickInquiry() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const SOCIAL = useContent().social;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const waNumber = SOCIAL.whatsapp.replace(/[^0-9]/g, "");
    const message = `Hello Mileyn — My name is ${name}. You can reach me at ${contact}. I'd like to discuss an event.`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => setOpen(true)}
            whileHover={{ width: 180 }}
            className="group fixed right-6 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-start overflow-hidden rounded-full bg-amber-gold pl-3.5 text-espresso shadow-lg"
          >
            <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span className="ml-3 whitespace-nowrap text-[11px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
              Quick Message
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/70 backdrop-blur-sm p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-cream p-10"
            >
              {!submitted ? (
                <>
                  <h3 className="font-display text-3xl text-espresso mb-1">A quick word.</h3>
                  <p className="text-taupe text-sm mb-8">Leave your details — we'll message you on WhatsApp immediately. Truly.</p>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-taupe/40 py-3 text-espresso placeholder:text-taupe focus:outline-none focus:border-amber-gold"
                    />
                    <input
                      required
                      placeholder="Phone or email"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-transparent border-b border-taupe/40 py-3 text-espresso placeholder:text-taupe focus:outline-none focus:border-amber-gold"
                    />
                    <button
                      type="submit"
                      className="gold-sweep w-full bg-amber-gold text-espresso py-3.5 text-xs uppercase tracking-[0.25em] hover:bg-amber-gold/90 font-medium"
                    >
                      Send on WhatsApp
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="font-display text-2xl text-espresso">Message sent! We'll reach out on WhatsApp.</p>
                  <motion.div initial={{ width: 0 }} animate={{ width: 60 }} className="h-px bg-amber-gold mx-auto mt-6" />
                  <button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => {
                        setSubmitted(false);
                        setName("");
                        setContact("");
                      }, 400);
                    }}
                    className="mt-8 text-amber-gold text-xs uppercase tracking-[0.25em] thread-link"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
