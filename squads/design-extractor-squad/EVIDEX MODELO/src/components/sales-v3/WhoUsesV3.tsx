import { Quote, TrendingUp, Users, Zap } from "lucide-react";

export function WhoUsesV3() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg font-bold">
              Quem usa Evidex
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Empresas que lidam com volume alto de entregas e precisam de faturamento rápido e evidências organizadas.
          </p>
        </div>

        {/* Casos Reais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Case 1 */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
            <Quote className="w-10 h-10 text-[#D4FF00] mb-6" />
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              "Reduzimos o tempo de faturamento de 2 dias para algumas horas. A equipe do escritório parou de passar o dia digitando canhoto e agora cuida de exceções e relacionamento com cliente."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4FF00] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#0A2540]" />
              </div>
              <div>
                <p className="font-bold text-[#0A2540]">Nome do Cliente</p>
                <p className="text-sm text-gray-600">Cargo na Empresa</p>
                <p className="text-xs text-gray-500 mt-1">Transportadora Regional</p>
              </div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
            <Quote className="w-10 h-10 text-[#D4FF00] mb-6" />
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              "Com múltiplas filiais, a gente perdia dinheiro com desencontro de informação. Agora tudo está centralizado, rastreável e o financeiro fecha muito mais rápido."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4FF00] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#0A2540]" />
              </div>
              <div>
                <p className="font-bold text-[#0A2540]">Nome do Cliente</p>
                <p className="text-sm text-gray-600">Cargo na Empresa</p>
                <p className="text-xs text-gray-500 mt-1">Distribuidor Nacional</p>
              </div>
            </div>
          </div>

          {/* Case 3 */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
            <Quote className="w-10 h-10 text-[#D4FF00] mb-6" />
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              "Nos períodos de alta demanda, não precisamos contratar gente extra só para digitar canhoto. O Evidex escala sozinho e a gente mantém a operação enxuta o ano todo."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4FF00] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#0A2540]" />
              </div>
              <div>
                <p className="font-bold text-[#0A2540]">Nome do Cliente</p>
                <p className="text-sm text-gray-600">Cargo na Empresa</p>
                <p className="text-xs text-gray-500 mt-1">Operação com Pico Sazonal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Números que Importam */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0A2540]/90 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl text-white text-center mb-12 font-bold">
            Números que importam
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#D4FF00] mb-3">
                1.000+
              </div>
              <p className="text-white text-lg">
                documentos processados por dia
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#D4FF00] mb-3">
                50+
              </div>
              <p className="text-white text-lg">
                empresas usando em operação
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#D4FF00] mb-3">
                98%
              </div>
              <p className="text-white text-lg">
                satisfação dos motoristas
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#D4FF00] mb-3">
                &lt;3
              </div>
              <p className="text-white text-lg">
                meses tempo médio de ROI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
