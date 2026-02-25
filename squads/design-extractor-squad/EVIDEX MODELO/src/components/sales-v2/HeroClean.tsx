import { ArrowRight, MessageCircle } from "lucide-react";

export function HeroClean() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1608153760327-cd3808dc6ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGRyaXZlciUyMHNtYXJ0cGhvbmUlMjBwaG90byUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc3MDI0NTA2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Motorista tirando foto de canhoto"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        {/* Main Hero Content */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 pt-8 md:pt-12 lg:pt-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight mb-6 md:mb-8 leading-[1.1] px-4">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg">
              Evidências rápidas.
            </span>
            <br />
            <span className="text-[#0A2540] font-bold">
              Entregas seguras.
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed px-4 font-medium">
            Evidex é a plataforma que captura e valida provas de entrega via WhatsApp!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 mb-12 md:mb-16">
            <button
              className="group inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-full bg-[#D4FF00] text-[#0A2540] hover:scale-105 transition-all text-lg md:text-xl w-full sm:w-auto shadow-lg hover:shadow-xl font-medium"
            >
              <span className="whitespace-nowrap">Quero uma Demonstração</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </button>
            <button
              className="group inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-full border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-all text-lg md:text-xl w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <span className="whitespace-nowrap">Falar no WhatsApp</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#01203f] rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl md:text-5xl font-bold text-[#D4FF00] mb-2" style={{ textShadow: '0 0 20px rgba(212, 255, 0, 0.3)' }}>
                100%
              </div>
              <div className="text-[rgb(255,255,255)] text-lg">Automático</div>
            </div>
            <div className="bg-[rgb(1,32,63)] rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl md:text-5xl font-bold text-[#D4FF00] mb-2" style={{ textShadow: '0 0 20px rgba(212, 255, 0, 0.3)' }}>
                Segundos
              </div>
              <div className="text-[rgb(255,255,255)] text-lg">Processamento</div>
            </div>
            <div className="bg-[rgb(1,32,63)] rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl md:text-5xl font-bold text-[#D4FF00] mb-2" style={{ textShadow: '0 0 20px rgba(212, 255, 0, 0.3)' }}>
                24h
              </div>
              <div className="text-[rgb(255,255,255)] text-lg">Disponibilidade</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
