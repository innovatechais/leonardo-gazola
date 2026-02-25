import { ArrowRight, Calendar, MessageCircle, CheckCircle, Users } from "lucide-react";

export function FinalCTA() {
  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: "Clique no Botão",
      description: "E preencha seus dados básicos"
    },
    {
      number: "02",
      icon: MessageCircle,
      title: "Agendamos Conversa",
      description: "Resposta em até 24 horas"
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Piloto em Ação",
      description: "Validação em 30 dias"
    },
    {
      number: "04",
      icon: Users,
      title: "Você Decide",
      description: "Sem compromisso inicial"
    }
  ];

  return (
    <section id="demonstracao" className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-[#0A2540] to-[#0A2540]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF00]/5 to-transparent"></div>
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 text-white leading-[1.1]">
            Agende sua Demonstração
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Veja na prática como nossa IA pode transformar sua operação
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-lg bg-[#D4FF00] flex items-center justify-center text-[#0A2540] text-lg font-bold shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-[#D4FF00] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0A2540]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl mb-2 text-white leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            className="group inline-flex items-center justify-center gap-3 px-10 md:px-14 py-5 md:py-6 rounded-full bg-[#D4FF00] text-[#0A2540] hover:scale-105 transition-all text-lg md:text-xl shadow-2xl hover:shadow-3xl font-medium"
          >
            <span className="whitespace-nowrap">Quero uma Demonstração</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>
          <p className="text-sm md:text-base text-white/60 mt-4">
            Sem compromisso • Resposta em até 24 horas
          </p>
        </div>
      </div>
    </section>
  );
}
