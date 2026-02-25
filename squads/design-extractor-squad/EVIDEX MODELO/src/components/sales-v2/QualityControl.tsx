import { AlertCircle, Camera, CheckCircle, Edit3, ShieldCheck } from "lucide-react";

export function QualityControl() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            <span className="bg-[#D4FF00] text-[#0A2540] px-6 py-3 inline-block rounded-2xl shadow-lg">
              E Se Algo Estiver Errado?
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 px-4 max-w-4xl mx-auto mt-6">
            Sistema inteligente garante 100% de qualidade
          </p>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-5xl mx-auto">
          
          {/* Card Principal de Explicação */}
          <div className="bg-gradient-to-br from-[#0A2540] to-[#01203f] rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#D4FF00] mb-12">
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#D4FF00] flex items-center justify-center shadow-xl">
                <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-[#0A2540]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Controle de Qualidade Automático
                </h3>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  O sistema não deixa passar nenhum erro. Se detectar algo errado,
                  solicita correção automaticamente ao motorista.
                </p>
              </div>
            </div>

            {/* Fluxo de Correção */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              
              {/* Passo 1: Detecta Erro */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#D4FF00]/30">
                <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-4 shadow-lg">
                  <AlertCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h4 className="text-xl font-bold text-[#D4FF00] mb-3">
                  1. Detecta o Problema
                </h4>
                <p className="text-white/80 text-base">
                  Sistema identifica informação faltando ou ilegível
                </p>
              </div>

              {/* Passo 2: Solicita Correção */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#D4FF00]/30">
                <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center mb-4 shadow-lg">
                  <Edit3 className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h4 className="text-xl font-bold text-[#D4FF00] mb-3">
                  2. Pede Correção
                </h4>
                <p className="text-white/80 text-base">
                  Motorista pode enviar nova foto OU digitar manualmente
                </p>
              </div>

              {/* Passo 3: Valida e Libera */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#D4FF00]/30">
                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h4 className="text-xl font-bold text-[#D4FF00] mb-3">
                  3. Valida e Libera
                </h4>
                <p className="text-white/80 text-base">
                  Só libera quando 100% completo e validado
                </p>
              </div>
            </div>
          </div>

          {/* Opções de Correção */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Opção 1: Nova Foto */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#D4FF00] transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
                  <Camera className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-[#0A2540]">
                  Opção 1: Nova Foto
                </h4>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Motorista tira uma foto melhor do documento e envia novamente. 
                Sistema processa automaticamente.
              </p>
            </div>

            {/* Opção 2: Digite Manualmente */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#D4FF00] transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center shadow-md">
                  <Edit3 className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-[#0A2540]">
                  Opção 2: Digitar
                </h4>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Se preferir, motorista pode digitar a informação faltante 
                diretamente no WhatsApp.
              </p>
            </div>
          </div>

          {/* Resultado Final */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-10 shadow-2xl text-center border-4 border-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2.5} />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Isso Elimina 100% do Retrabalho
              </h3>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Cada documento só entra no sistema quando está perfeito. 
              Seu financeiro nunca mais precisa voltar para corrigir erros.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-[#0A2540] to-[#01203f] rounded-3xl px-8 md:px-12 py-6 md:py-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4FF00]/10 to-transparent"></div>
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-2">
                🎯 Qualidade Garantida Sempre
              </p>
              <p className="text-lg md:text-xl text-white/80">
                Sistema trabalha 24h por dia sem nunca se cansar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
