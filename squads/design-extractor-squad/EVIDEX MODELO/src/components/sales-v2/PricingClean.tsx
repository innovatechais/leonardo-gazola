import { ArrowRight, CheckCircle, Award, Calendar, TrendingUp } from "lucide-react";

export function PricingClean() {
  return (
    <section id="precos" className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4FF00] text-[#0A2540]">
            <Award className="w-5 h-5" />
            <span className="text-sm md:text-base font-medium">Oferta Especial de Lançamento</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            Primeira Mensalidade Grátis
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 px-4 max-w-4xl mx-auto mb-6">
            Você investe apenas na <strong>implementação</strong> (consultoria + mapeamento + integração). Após o sistema entrar em operação, ganhe a <strong>primeira mensalidade 100% grátis</strong> para validar os resultados.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-10 border-2 border-gray-200 hover:border-[#D4FF00] transition-colors">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <CheckCircle className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl md:text-3xl mb-3 text-gray-900 leading-tight">
              Implementação Completa
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Consultoria e mapeamento inclusos
            </p>
          </div>

          {/* Card 2 - Destacado */}
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0A2540] rounded-2xl md:rounded-3xl p-8 md:p-10 border-2 border-[#D4FF00] relative overflow-hidden transform md:scale-105 shadow-2xl">
            <div className="absolute top-0 right-0 bg-[#D4FF00] text-[#0A2540] px-4 py-1 text-sm font-bold rounded-bl-xl">
              DESTAQUE
            </div>
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <Calendar className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl md:text-3xl mb-3 text-white leading-tight">
              1º Mês Gratuito
            </h3>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Valide o ROI sem custo mensal
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-10 border-2 border-gray-200 hover:border-[#D4FF00] transition-colors">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl md:text-3xl mb-3 text-gray-900 leading-tight">
              Garantia de Resultados
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              30 dias para comprovar ganho real
            </p>
          </div>
        </div>

        {/* How It Works - Timeline */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 border border-gray-200">
            <h3 className="text-2xl md:text-3xl mb-8 text-gray-900 text-center">
              Como Funciona
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Investimento Inicial",
                  description: "Você paga apenas pela implementação (consultoria + mapeamento + integração com seu ERP)"
                },
                {
                  step: "2",
                  title: "Sistema em Operação",
                  description: "Após implementação, o sistema entra em funcionamento e começa a processar canhotos"
                },
                {
                  step: "3",
                  title: "1º Mês Grátis",
                  description: "Primeira mensalidade é 100% gratuita para você validar os resultados na prática"
                },
                {
                  step: "4",
                  title: "ROI Comprovado",
                  description: "Se não comprovar ganho operacional mensurável em 30 dias, você pode cancelar"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4FF00] flex items-center justify-center text-[#0A2540] font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg md:text-xl mb-2 text-gray-900 font-medium">
                      {item.title}
                    </h4>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <a
            href="#demonstracao"
            className="inline-flex items-center justify-center gap-3 px-10 md:px-14 py-5 md:py-6 rounded-full bg-[#D4FF00] text-[#0A2540] hover:scale-105 transition-all text-lg md:text-xl shadow-xl hover:shadow-2xl font-medium"
          >
            <span className="whitespace-nowrap">Quero Aproveitar Esta Oferta</span>
            <ArrowRight className="w-6 h-6 flex-shrink-0" />
          </a>
          <p className="text-sm md:text-base text-gray-500 mt-4">
            Oferta válida por tempo limitado • ROI típico em menos de 3 meses
          </p>
        </div>
      </div>
    </section>
  );
}
