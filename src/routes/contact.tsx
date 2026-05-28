import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { GoldenThread } from "@/components/site/GoldenThread";
import { Contact } from "@/components/site/Contact";
import { useContent } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mileyn Events" },
      { name: "description", content: "Get in touch with Mileyn Events. Tell us about your event and let's create something exquisite together." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const content = useContent();
  const SOCIAL = content.social;
  const heroImg = content.contact?.heroImg || content.hero.image;

  const contactInfoItems = [
    {
      icon: MessageCircle,
      label: "WhatsApp (Fastest)",
      value: SOCIAL.whatsappDisplay,
      href: `https://wa.me/${SOCIAL.whatsapp.replace(/[^0-9]/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: SOCIAL.email,
      href: `mailto:${SOCIAL.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: SOCIAL.whatsappDisplay,
      href: `tel:${SOCIAL.phone}`,
    },
  ];

  return (
    <main className="bg-cream text-espresso min-h-screen">
      <Navbar visible={true} />

      {/* Hero/Intro Section */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-espresso text-cream pt-32 pb-20 px-6 md:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-gold text-xs uppercase tracking-[0.3em] hover:text-cream transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8"
          >
            <h1 className="font-display text-5xl md:text-6xl leading-[1.1] text-balance max-w-4xl">
              Tell us about your event — we'll guide you from there.
            </h1>
            <div className="mt-8">
              <GoldenThread width={56} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-cream py-8">
        <Contact />
      </section>

      {/* Contact Info Section */}
      <section className="bg-cream px-6 md:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-espresso mb-4">
              Reach Out Directly
            </h2>
            <GoldenThread width={40} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactInfoItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={idx}
                  href={item.href}
                  target={item.icon === MessageCircle ? "_blank" : undefined}
                  rel={item.icon === MessageCircle ? "noopener,noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="group bg-white p-8 rounded-sm ring-1 ring-amber-gold/15 hover:ring-amber-gold/40 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col items-start gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-3 bg-amber-gold/10 rounded-sm"
                    >
                      <Icon className="h-6 w-6 text-amber-gold" />
                    </motion.div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-espresso/60 font-medium mb-2">
                        {item.label}
                      </p>
                      <p className="text-base md:text-lg text-espresso font-light group-hover:text-amber-gold transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-16 p-10 bg-espresso text-cream rounded-sm"
          >
            <p className="text-lg leading-relaxed font-light">
              Whether you reach out by email, phone, or WhatsApp, we respond promptly. Most inquiries receive a reply within 24 hours—often sooner.
            </p>
            <div className="mt-6">
              <GoldenThread width={40} />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
