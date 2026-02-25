import { ArrowRight, MessageCircle, Zap } from "lucide-react";

export function FinalCTASimple() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-[#0A2540] via-[#01203f] to-[#0A2540] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #D4FF00 2px, transparent 2px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Animated glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4FF00]/20 rounded-full blur-[150px]"></div>

      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#D4FF00] mb-8 shadow-2xl">
            <Zap className="w-10 h-10 md:w-12 md:h-12 text-[#0A2540]" strokeWidth={2.5} />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 leading-[1.1]">
            <span className="bg-[#D4FF00] text-[#0A2540] px-6 py-3 inline-block rounded-2xl shadow-lg mb-4">
              Pronto para Começar?
            </span>
          </h2>

          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 max-w-4xl mx-auto leading-relaxed">
            Transforme sua operação de entregas hoje mesmo
          </p>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 md:mb-12 max-w-3xl mx-auto">
            Agende uma demonstração gratuita e veja o Evidex funcionando em tempo real
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 md:mb-16">
            <button
              className="group inline-flex items-center justify-center gap-3 px-10 md:px-14 py-5 md:py-6 rounded-full bg-[#D4FF00] text-[#0A2540] hover:scale-105 transition-all text-xl md:text-2xl w-full sm:w-auto shadow-2xl hover:shadow-[#D4FF00]/50 font-bold"
            >
              <span className="whitespace-nowrap">Agendar Demonstração</span>
              <ArrowRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </button>
            
            <button
              className="group inline-flex items-center justify-center gap-3 px-10 md:px-14 py-5 md:py-6 rounded-full border-3 border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00] hover:text-[#0A2540] transition-all text-xl md:text-2xl w-full sm:w-auto font-bold"
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />
              <span className="whitespace-nowrap">Falar no WhatsApp</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-[#D4FF00] mb-2" style={{ textShadow: '0 0 30px rgba(212, 255, 0, 0.5)' }}>
                ⚡
              </div>
              <p className="text-white text-base md:text-lg">
                Implementação Rápida
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-[#D4FF00] mb-2" style={{ textShadow: '0 0 30px rgba(212, 255, 0, 0.5)' }}>
                🎯
              </div>
              <p className="text-white text-base md:text-lg">
                Suporte Completo
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-[#D4FF00] mb-2" style={{ textShadow: '0 0 30px rgba(212, 255, 0, 0.5)' }}>
                💰
              </div>
              <p className="text-white text-base md:text-lg">
                ROI Garantido
              </p>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-12 md:mt-16">
            <p className="text-lg md:text-xl text-white/60">
              Junte-se às transportadoras que já automatizaram suas entregas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
