import { Zap, Shield, DollarSign, LayoutDashboard, RefreshCw, TrendingUp, Wallet, Clock, CheckCheck, BarChart3 } from "lucide-react";

export function WhyItMattersV3() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg font-bold">
              Por que importa
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Quando você tem a prova certa no momento certo, tudo fica mais rápido, mais seguro e mais barato.
          </p>
        </div>

        {/* Benefícios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Benefício 1 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Velocidade Real</h3>
            <p className="text-gray-600 leading-relaxed">
              O pedido vai de "entregue" para "faturado" em segundos. Sem fila de digitação, sem esperar o motorista voltar, sem atraso no caixa.
            </p>
          </div>

          {/* Benefício 2 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Prova que Vale</h3>
            <p className="text-gray-600 leading-relaxed">
              Cada evidência fica guardada com rastreamento completo: quem enviou, quando, de onde. Se aparecer disputa, você tem tudo documentado.
            </p>
          </div>

          {/* Benefício 3 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <DollarSign className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Menos Custo Operacional</h3>
            <p className="text-gray-600 leading-relaxed">
              Elimina horas de digitação, reduz erros e retrabalho. Sua equipe foca no que importa, não em conferir papel.
            </p>
          </div>

          {/* Benefício 4 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <LayoutDashboard className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Controle Centralizado</h3>
            <p className="text-gray-600 leading-relaxed">
              Um só lugar para ver todas as entregas, documentos e pendências. Informação atualizada em tempo real.
            </p>
          </div>

          {/* Benefício 5 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <RefreshCw className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">ERP Sempre Sincronizado</h3>
            <p className="text-gray-600 leading-relaxed">
              Financeiro e operação trabalham com os mesmos dados, atualizados automaticamente. Sem desencontro de informação.
            </p>
          </div>

          {/* Benefício 6 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Decisão Rápida</h3>
            <p className="text-gray-600 leading-relaxed">
              Você vê o que está acontecendo agora, não ontem. Identifica problemas antes que virem crise.
            </p>
          </div>
        </div>

        {/* O que você ganha na prática */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0A2540]/90 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl text-white text-center mb-12 font-bold">
            O que você ganha na prática
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Resultado 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Wallet className="w-10 h-10 text-[#D4FF00] mb-4" />
              <p className="text-white leading-relaxed">
                Economia de <strong>milhares de reais por ano</strong> em custos operacionais
              </p>
            </div>

            {/* Resultado 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Clock className="w-10 h-10 text-[#D4FF00] mb-4" />
              <p className="text-white leading-relaxed">
                Processamento completo em <strong>segundos, não em horas</strong>
              </p>
            </div>

            {/* Resultado 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <CheckCheck className="w-10 h-10 text-[#D4FF00] mb-4" />
              <p className="text-white leading-relaxed">
                <strong>99% menos erros</strong> em comparação com digitação manual
              </p>
            </div>

            {/* Resultado 4 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <BarChart3 className="w-10 h-10 text-[#D4FF00] mb-4" />
              <p className="text-white leading-relaxed">
                Retorno do investimento em <strong>menos de 3 meses</strong> para operações médias
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
