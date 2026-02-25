import { ArrowRight, MessageCircle, Calendar, Users, Rocket, ShieldCheck } from "lucide-react";

export function FinalCTAV3() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-[#0A2540] to-[#0A2540]/90">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg font-bold">
              Veja o Evidex em ação
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-medium">
            Agende uma conversa e entenda como transformar evidências em vantagem competitiva.
          </p>
        </div>

        {/* Processo em 4 Passos */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-8">
            {/* Passo 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#D4FF00] flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-[#0A2540]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#D4FF00] mb-2">Passo 1</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Você Agenda</h3>
                  <p className="text-white/80 leading-relaxed">
                    Clica no botão, preenche seus dados básicos e escolhe um horário que funciona para você.
                  </p>
                </div>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#D4FF00] flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#0A2540]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#D4FF00] mb-2">Passo 2</div>
                  <h3 className="text-2xl font-bold text-white mb-3">A Gente Conversa</h3>
                  <p className="text-white/80 leading-relaxed">
                    Resposta em até 24 horas. Vamos entender sua operação, volume de entregas, sistemas que você usa e o que você quer melhorar.
                  </p>
                </div>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#D4FF00] flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-[#0A2540]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#D4FF00] mb-2">Passo 3</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Piloto em Ação</h3>
                  <p className="text-white/80 leading-relaxed">
                    Validação em 30 dias na sua operação real. Você acompanha os resultados e decide se faz sentido continuar.
                  </p>
                </div>
              </div>
            </div>

            {/* Passo 4 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#D4FF00] flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-[#0A2540]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#D4FF00] mb-2">Passo 4</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Você Decide</h3>
                  <p className="text-white/80 leading-relaxed">
                    Sem compromisso inicial. Se comprovar ganho, seguimos juntos. Se não, sem problemas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs Finais */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="#contato"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-full bg-[#D4FF00] text-[#0A2540] text-xl font-bold hover:scale-105 transition-all shadow-2xl"
          >
            Agendar Demonstração
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="https://wa.me/5544998394857"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-full bg-white/10 backdrop-blur-sm text-white text-xl font-bold border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all"
          >
            <MessageCircle className="w-6 h-6" />
            Falar no WhatsApp
          </a>
        </div>

        {/* Nota de Segurança */}
        <div className="mt-12 text-center">
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Sem compromisso inicial. Validação em 30 dias. Primeira mensalidade grátis.
          </p>
        </div>
      </div>
    </section>
  );
}
