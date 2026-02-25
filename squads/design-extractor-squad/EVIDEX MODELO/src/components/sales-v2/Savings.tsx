import { DollarSign, TrendingDown, Calculator, Zap } from "lucide-react";

export function Savings() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-[#0A2540] via-[#01203f] to-[#0A2540] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #D4FF00 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            <span className="bg-[#D4FF00] text-[#0A2540] px-6 py-3 inline-block rounded-2xl shadow-lg">
              Economia Real e Mensurável
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 px-4 max-w-4xl mx-auto mt-6">
            Reduza drasticamente seus custos operacionais
          </p>
        </div>

        {/* Cards de Comparação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16">
          
          {/* ANTES - Custo Tradicional */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border-2 border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-full text-base font-bold mb-6 shadow-lg">
                <TrendingDown className="w-5 h-5" />
                MODELO TRADICIONAL
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-400 mt-2"></div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Equipe Grande</h4>
                  <p className="text-white/70">10 a 15 pessoas para digitação manual</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-400 mt-2"></div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Infraestrutura</h4>
                  <p className="text-white/70">Computadores, espaço, energia, gestão</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-400 mt-2"></div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Erros e Retrabalho</h4>
                  <p className="text-white/70">Tempo perdido corrigindo informações</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-400 mt-2"></div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Atraso no Caixa</h4>
                  <p className="text-white/70">Dias até o faturamento = dinheiro parado</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center p-6 bg-red-500/20 border-2 border-red-500 rounded-2xl">
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                Alto Custo Fixo
              </p>
              <p className="text-white/80 text-lg">Todo mês, independente do volume</p>
            </div>
          </div>

          {/* AGORA - Com Evidex */}
          <div className="bg-gradient-to-br from-[#D4FF00] to-[#D4FF00]/80 rounded-3xl p-8 md:p-10 border-4 border-white shadow-2xl relative">
            {/* Badge de Destaque */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white rotate-12 animate-pulse">
              <div className="text-center">
                <p className="text-white font-bold text-sm">MELHOR</p>
                <p className="text-white text-xs font-bold">CUSTO</p>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#0A2540] text-[#D4FF00] px-5 py-2 rounded-full text-base font-bold mb-6 shadow-lg">
                <Zap className="w-5 h-5" />
                COM EVIDEX
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-[#0A2540]/10 rounded-xl p-4">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                <div>
                  <h4 className="text-[#0A2540] font-bold text-lg mb-1">Zero Equipe</h4>
                  <p className="text-[#0A2540]/70">IA faz todo o trabalho automaticamente</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[#0A2540]/10 rounded-xl p-4">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                <div>
                  <h4 className="text-[#0A2540] font-bold text-lg mb-1">Infraestrutura Mínima</h4>
                  <p className="text-[#0A2540]/70">Só precisa de WhatsApp (que já usa)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[#0A2540]/10 rounded-xl p-4">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                <div>
                  <h4 className="text-[#0A2540] font-bold text-lg mb-1">Zero Retrabalho</h4>
                  <p className="text-[#0A2540]/70">Sistema valida 100% antes de liberar</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[#0A2540]/10 rounded-xl p-4">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                <div>
                  <h4 className="text-[#0A2540] font-bold text-lg mb-1">Caixa Imediato</h4>
                  <p className="text-[#0A2540]/70">Faturamento no mesmo dia da entrega</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center p-6 bg-[#0A2540] rounded-2xl shadow-xl">
              <p className="text-3xl md:text-4xl font-bold text-[#D4FF00] mb-2" style={{ textShadow: '0 0 20px rgba(212, 255, 0, 0.3)' }}>
                Fração do Custo
              </p>
              <p className="text-white/80 text-lg">Investimento que se paga sozinho</p>
            </div>
          </div>
        </div>

        {/* Conclusão Visual */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#D4FF00]">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Calculator className="w-10 h-10 md:w-12 md:h-12 text-[#0A2540]" />
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A2540]">
                  A Matemática é Simples
                </h3>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                Elimine o custo de uma equipe inteira de digitação.<br className="hidden md:block" />
                Pague apenas pela tecnologia que trabalha 24h sem parar.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <div className="text-4xl font-bold text-green-600 mb-2">-90%</div>
                  <p className="text-gray-700 font-medium">Redução de Custos Operacionais</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">30 dias</div>
                  <p className="text-gray-700 font-medium">ROI Típico</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="text-4xl font-bold text-purple-600 mb-2">∞</div>
                  <p className="text-gray-700 font-medium">Economia Recorrente</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-[#D4FF00] rounded-3xl px-8 md:px-12 py-6 md:py-8 shadow-2xl border-4 border-white">
            <p className="text-2xl md:text-3xl lg:text-4xl text-[#0A2540] font-bold mb-2">
              💰 Descubra Quanto Você Pode Economizar
            </p>
            <p className="text-lg md:text-xl text-[#0A2540]/80 font-medium">
              Cada transportadora tem um potencial único de economia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
