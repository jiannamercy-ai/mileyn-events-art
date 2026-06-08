import { motion } from "framer-motion";
import { GoldenThread } from "./GoldenThread";
import { useContent } from "@/lib/content";

export function ClientLogos() {
  const COMPANIES = useContent().companies;

  if (!COMPANIES || COMPANIES.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-cream text-espresso py-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl">Clients We've Worked With</h2>
          <div className="mt-5 flex justify-center">
            <GoldenThread width={40} />
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {COMPANIES.map((company, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="h-24 w-24 md:h-28 md:w-28 flex items-center justify-center bg-cream border border-amber-gold/30 rounded-sm overflow-hidden hover:border-amber-gold/60 transition-colors">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain p-3"
                />
              </div>
              <p className="text-sm md:text-base text-espresso/80 text-center font-medium max-w-24">
                {company.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
