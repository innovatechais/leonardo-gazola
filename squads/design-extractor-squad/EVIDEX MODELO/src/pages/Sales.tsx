import { useState, useEffect } from "react";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { DevPopup } from "../components/shared/DevPopup";
import { HeroSimple } from "../components/sales-v2/HeroSimple";
import { HowItWorksFlow } from "../components/sales-v2/HowItWorksFlow";
import { BeforeAfter } from "../components/sales-v2/BeforeAfter";
import { Benefits } from "../components/sales-v2/Benefits";
import { Savings } from "../components/sales-v2/Savings";
import { QualityControl } from "../components/sales-v2/QualityControl";
import { FinalCTASimple } from "../components/sales-v2/FinalCTASimple";

export function Sales() {
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
        {/* 1. Hero com Headline Clara */}
        <HeroSimple />
        
        {/* 2. Como Funciona - 3 Passos */}
        <section id="como-funciona">
          <HowItWorksFlow />
        </section>
        
        {/* 3. Antes vs Agora */}
        <BeforeAfter />
        
        {/* 4. Benefícios */}
        <section id="beneficios">
          <Benefits />
        </section>
        
        {/* 5. Economia Real */}
        <Savings />
        
        {/* 6. Controle de Qualidade */}
        <QualityControl />
        
        {/* 7. CTA Final */}
        <FinalCTASimple />
      </main>
      <Footer salesMode={true} />
      
      {/* Dev Popup */}
      {showDevPopup && <DevPopup onClose={handleClosePopup} />}
    </div>
  );
}
