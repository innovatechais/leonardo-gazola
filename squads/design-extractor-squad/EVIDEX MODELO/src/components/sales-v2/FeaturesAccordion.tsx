import { Zap, TrendingDown, Shield, Gauge, GitMerge, Eye } from "lucide-react";

export function FeaturesAccordion() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            Transforme sua Operação
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 px-4 max-w-4xl mx-auto">
            Benefícios reais e mensuráveis que impactam diretamente seus resultados
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {[
            {
              icon: Zap,
              title: "Agilidade Extrema",
              description: "Leitura feita em segundos, sem depender de processos manuais lentos."
            },
            {
              icon: TrendingDown,
              title: "Menos Retrabalho",
              description: "Elimina erros manuais e inconsistências no processamento de documentos."
            },
            {
              icon: Shield,
              title: "Redução de Custos",
              description: "Menos mão de obra, zero erros, resultados imediatos. Sua operação mais enxuta."
            },
            {
              icon: Gauge,
              title: "Controle Total",
              description: "Informações centralizadas e atualizadas em tempo real."
            },
            {
              icon: GitMerge,
              title: "Integração Automática",
              description: "ERP e financeiro sempre sincronizados, sem intervenção manual."
            },
            {
              icon: Eye,
              title: "Visão em Tempo Real",
              description: "Decisões mais rápidas e assertivas com dados atualizados constantemente."
            }
          ].map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#D4FF00] transition-colors"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-4 md:mb-6">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#0A2540]" />
                </div>
                <h3 className="text-xl md:text-2xl mb-3 text-gray-900 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Proven Results Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0A2540] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF00]/10 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-12 text-center">
                Resultados Comprovados
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4FF00] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#0A2540] text-sm font-bold">✓</span>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed">
                      <strong>Economia de milhares de reais</strong> por ano em custos operacionais
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4FF00] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#0A2540] text-sm font-bold">✓</span>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed">
                      <strong>Processamento completo feito em segundos</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4FF00] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#0A2540] text-sm font-bold">✓</span>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed">
                      <strong>99% menos erros</strong> em comparação com digitação manual
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4FF00] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#0A2540] text-sm font-bold">✓</span>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed">
                      <strong>Retorno sobre investimento</strong> em menos de 3 meses para operações médias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
