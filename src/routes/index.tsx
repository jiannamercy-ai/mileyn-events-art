import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IntroAnimation } from "@/components/site/IntroAnimation";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { BrandStrip } from "@/components/site/BrandStrip";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { WhyMileyn } from "@/components/site/WhyMileyn";
import { CorporateWeddingSplit } from "@/components/site/CorporateWeddingSplit";
import { Testimonials } from "@/components/site/Testimonials";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ConciergeIndicator } from "@/components/site/ConciergeIndicator";
import { FloatingSocials } from "@/components/site/FloatingSocials";
import { AdminToggle } from "@/components/site/AdminToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mileyn Events — Curators of Refined Experiences" },
      { name: "description", content: "Luxury event planning. Weddings, galas, and private celebrations curated with quiet precision." },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const played = sessionStorage.getItem("mileynIntroPlayed") === "true";
    setIntroDone(played);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("mileynIntroPlayed", "true");
    setIntroDone(true);
  };

  if (introDone === null) {
    return <div className="fixed inset-0 bg-espresso" />;
  }

  return (
    <main className="relative bg-cream text-espresso">
      {!introDone && <IntroAnimation onComplete={handleIntroComplete} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar visible={introDone} />

      <Hero ready={introDone} />
      <BrandStrip />
      <Services />
      <Portfolio />
      <WhyMileyn />
      <CorporateWeddingSplit />
      <Testimonials />
      <FinalCTA />
      <Footer />

      <ConciergeIndicator />
      <FloatingSocials />
      <AdminToggle />
    </main>
  );
}
