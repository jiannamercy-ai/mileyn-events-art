import { motion } from "framer-motion";

const BLOCKS = [
  {
    eyebrow: "Corporate Events",
    title: "Precision-driven execution",
    body: "For brands, organizations, and institutions. Product launches, conferences, award ceremonies, corporate dinners and brand activations — structured, professional, on-brand.",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=75",
    cta: "Explore Corporate Events",
    href: "#services",
  },
  {
    eyebrow: "Weddings & Private",
    title: "Beautifully designed celebrations",
    body: "Tailored to your story. From ceremony setup and reception design to floral styling and full event transformation — elegant, cohesive, thoughtfully executed.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=75",
    cta: "Explore Weddings",
    href: "#services",
  },
];

export function CorporateWeddingSplit() {
  return (
    <section className="relative bg-cream text-espresso py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-amber-gold text-[11px] uppercase tracking-[0.4em] font-medium">
            Two Worlds. One Standard.
          </p>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            Built for <em className="font-light italic text-amber-gold">both</em> design and logistics
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {BLOCKS.map((b, i) => (
            <motion.a
              key={b.eyebrow}
              href={b.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative block overflow-hidden bg-espresso text-cream"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={b.img}
                  alt={b.eyebrow}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <p className="text-amber-gold text-[10px] uppercase tracking-[0.4em] font-medium">
                  {b.eyebrow}
                </p>
                <h3 className="font-display text-2xl md:text-3xl mt-3 text-balance">{b.title}</h3>
                <p className="mt-3 text-sm md:text-base text-cream/85 font-light max-w-md">
                  {b.body}
                </p>
                <span className="thread-link mt-5 inline-block text-amber-gold text-xs uppercase tracking-[0.25em] font-medium">
                  {b.cta} →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
