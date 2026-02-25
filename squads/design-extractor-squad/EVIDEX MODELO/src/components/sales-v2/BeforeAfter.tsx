import { Clock, Zap, XCircle, CheckCircle2 } from "lucide-react";

export function BeforeAfter() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            <span className="bg-[#D4FF00] text-[#0A2540] px-6 py-3 inline-block rounded-2xl shadow-lg">
              De Dias para Segundos
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 px-4 max-w-4xl mx-auto mt-6">
            Veja a transformação radical no seu processo de faturamento
          </p>
        </div>

        {/* Comparação ANTES vs AGORA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* ANTES - Card Vermelho/Cinza */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 md:p-10 shadow-xl border-4 border-gray-300">
              {/* Badge ANTES */}
              <div className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                <XCircle className="w-6 h-6" />
                ANTES
              </div>

              {/* Título */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Processo Manual
              </h3>

              {/* Timeline ANTES */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">Hora 0</p>
                    <p className="text-gray-700">Motorista entrega e tira foto</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">+24 horas</p>
                    <p className="text-gray-700">Motorista volta ao escritório com papel</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">+48 horas</p>
                    <p className="text-gray-700">Digitação manual no sistema</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">+72 horas</p>
                    <p className="text-gray-700">Financeiro confere e libera</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-red-100 border-2 border-red-300 rounded-xl">
                  <p className="text-red-800 font-bold flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Erros encontrados: Volta tudo para correção
                  </p>
                </div>
              </div>

              {/* Tempo Total */}
              <div className="mt-8 text-center">
                <p className="text-5xl font-bold text-red-600 mb-2">3 DIAS</p>
                <p className="text-lg text-gray-700">tempo total do processo</p>
              </div>
            </div>
          </div>

          {/* AGORA - Card Verde/Amarelo */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#0A2540] to-[#01203f] rounded-3xl p-8 md:p-10 shadow-2xl border-4 border-[#D4FF00]">
              {/* Badge AGORA */}
              <div className="inline-flex items-center gap-2 bg-[#D4FF00] text-[#0A2540] px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                <CheckCircle2 className="w-6 h-6" />
                AGORA
              </div>

              {/* Título */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Com Evidex
              </h3>

              {/* Timeline AGORA */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8 text-[#0A2540]" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#D4FF00]">Segundo 0</p>
                    <p className="text-white/90">Motorista envia foto no WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8 text-[#0A2540]" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#D4FF00]">Segundo 2-3</p>
                    <p className="text-white/90">Sistema lê automaticamente</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8 text-[#0A2540]" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#D4FF00]">Segundo 10</p>
                    <p className="text-white/90">Motorista confirma "OK"</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-[#0A2540]" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#D4FF00]">Segundo 15</p>
                    <p className="text-white/90">Pedido JÁ ESTÁ FATURADO</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-[#D4FF00]/20 border-2 border-[#D4FF00] rounded-xl">
                  <p className="text-[#D4FF00] font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    100% validado e sem erros
                  </p>
                </div>
              </div>

              {/* Tempo Total */}
              <div className="mt-8 text-center">
                <p className="text-5xl font-bold text-[#D4FF00] mb-2" style={{ textShadow: '0 0 30px rgba(212, 255, 0, 0.5)' }}>
                  30 SEGUNDOS
                </p>
                <p className="text-lg text-white/80">tempo total do processo</p>
              </div>
            </div>

            {/* Selo de Destaque */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D4FF00] rounded-full flex items-center justify-center shadow-2xl border-4 border-white rotate-12 animate-pulse">
              <div className="text-center">
                <p className="text-[#0A2540] font-bold text-xl">288x</p>
                <p className="text-[#0A2540] text-sm font-bold">MAIS RÁPIDO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusão Visual */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-[#0A2540] to-[#01203f] rounded-3xl px-8 md:px-12 py-6 md:py-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4FF00]/10 to-transparent"></div>
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-2">
                ⚡ A Diferença é Brutal
              </p>
              <p className="text-lg md:text-xl text-white/80">
                Seus concorrentes ainda levam dias. Você fatura em segundos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
