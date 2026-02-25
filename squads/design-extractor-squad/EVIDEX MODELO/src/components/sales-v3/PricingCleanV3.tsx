import { Sparkles, CheckCircle2, Users, Calendar, Shield } from "lucide-react";

export function PricingCleanV3() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Oferta Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4FF00] text-[#0A2540] font-bold text-lg">
            <Sparkles className="w-5 h-5" />
            Promoção Ativa
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg font-bold">
              Primeira Mensalidade Grátis
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Você investe apenas na implementação (consultoria + mapeamento + integração com seu ERP). Quando o sistema entrar em operação, a primeira mensalidade é por nossa conta.
          </p>
        </div>

        {/* Por quê? */}
        <div className="max-w-4xl mx-auto mb-16 bg-white rounded-2xl p-8 border-2 border-gray-100">
          <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Por quê?</h3>
          <p className="text-xl text-gray-700 leading-relaxed">
            Porque queremos que você valide os resultados sem custo mensal logo no início. Se não comprovar ganho real em 30 dias, você decide se continua.
          </p>
        </div>

        {/* 3 Garantias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-3">
              Implementação Completa
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Consultoria técnica e mapeamento de processos inclusos
            </p>
          </div>

          {/* Card 2 - Destaque */}
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0A2540]/90 rounded-2xl p-8 border-2 border-[#D4FF00] shadow-2xl transform md:scale-105">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              1º Mês de Graça
            </h3>
            <p className="text-white/90 leading-relaxed">
              Valide o ROI sem pagar mensalidade
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <Calendar className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-3">
              30 Dias para Decidir
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Tempo para medir resultado real antes de comprometer
            </p>
          </div>
        </div>

        {/* Detalhes do Modelo */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-100 max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <Shield className="w-8 h-8 text-[#D4FF00] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Como funciona o investimento</h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4FF00] flex-shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    <strong>Implementação:</strong> Consultoria + mapeamento + integração com ERP (investimento único)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4FF00] flex-shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    <strong>Mensalidade SaaS:</strong> Baseada no volume de documentos processados
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4FF00] flex-shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    <strong>Oferta de lançamento:</strong> Primeira mensalidade 100% grátis
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4FF00] flex-shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    <strong>ROI típico:</strong> Menos de 3 meses para operações médias
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4FF00] flex-shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    <strong>Transparência total:</strong> Valores detalhados durante a demonstração
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 text-lg">
              Se a solução não comprovar ganho operacional mensurável em 30 dias, você pode cancelar sem pagar a mensalidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
