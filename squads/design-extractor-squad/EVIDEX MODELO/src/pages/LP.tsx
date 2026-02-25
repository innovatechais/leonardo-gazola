import { useState, useEffect } from "react";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { DevPopup } from "../components/shared/DevPopup";
import { HeroClean } from "../components/sales-v2/HeroClean";
import { LogoCloud } from "../components/sales-v2/LogoCloud";
import { WhatIsThis } from "../components/sales-v2/WhatIsThis";
import { HowItWorksFlow } from "../components/sales-v2/HowItWorksFlow";
import { PlatformPreview } from "../components/sales-v2/PlatformPreview";
import { FeaturesAccordion } from "../components/sales-v2/FeaturesAccordion";
import { TrustGuarantee } from "../components/sales-v2/TrustGuarantee";
import { PricingClean } from "../components/sales-v2/PricingClean";
import { Testimonials } from "../components/sales-v2/Testimonials";
import { FAQ } from "../components/sales-v2/FAQ";
import { FinalCTA } from "../components/sales-v2/FinalCTA";

export function LP() {
  const [showDevPopup, setShowDevPopup] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Se o usuário scrollar mais de 100px e ainda não mostrou o popup
      if (window.scrollY > 100 && !hasScrolled) {
        setShowDevPopup(true);
        setHasScrolled(true);
        // Bloqueia o scroll
        document.body.style.overflow = 'hidden';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const handleClosePopup = () => {
    setShowDevPopup(false);
    // Desbloqueia o scroll
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header salesMode={true} />
      <main>
        <HeroClean />
        <LogoCloud />
        <section id="solucao">
          <WhatIsThis />
        </section>
        <section id="como-funciona">
          <HowItWorksFlow />
        </section>
        <PlatformPreview />
        <section id="beneficios">
          <FeaturesAccordion />
        </section>
        <TrustGuarantee />
        <PricingClean />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer salesMode={true} />
      
      {/* Dev Popup */}
      {showDevPopup && <DevPopup onClose={handleClosePopup} />}
    </div>
  );
}
