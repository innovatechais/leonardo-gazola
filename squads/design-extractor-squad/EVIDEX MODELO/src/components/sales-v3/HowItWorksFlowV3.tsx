import { Camera, Zap, CheckCircle, Database } from "lucide-react";
import step1Image from "figma:asset/8f5eef55dbe96aac527d1b7e1cbb81ab8d45e2ef.png";
import step2Image from "figma:asset/da80fc7cbc42dd18f4f4c83e9922a65717106852.png";
import step3Image from "figma:asset/c175ea7682c8c46bc38a3238ba4607eac2a8d525.png";

export function HowItWorksFlowV3() {
  const steps = [
    {
      number: 1,
      icon: Camera,
      title: "Motorista Tira a Foto",
      description: "Ele abre o WhatsApp (que já está no celular), tira a foto do canhoto e manda na conversa. Não precisa instalar nada, não precisa fazer login, não precisa treinar.",
      details: [
        "Centralizar o documento",
        "Evitar reflexo/sombra",
        "Segurar firme e tirar foto nítida"
      ],
      image: step1Image
    },
    {
      number: 2,
      icon: Zap,
      title: "Sistema Lê e Mostra os Dados",
      description: "Em 2 ou 3 segundos, o Evidex lê o documento e devolve uma mensagem formatada com os dados principais. O motorista vê tudo na tela antes de confirmar.",
      image: step2Image
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Motorista Confere e Confirma",
      description: "Ele olha os dados que apareceram na tela e tudo acontece ali mesmo no WhatsApp, sem sair da conversa.",
      options: [
        { emoji: "✓", title: "Tudo certo:", text: "digita \"OK\"" },
        { emoji: "✏️", title: "Algo errado:", text: "corrige por texto/áudio" },
        { emoji: "📸", title: "Foto ruim:", text: "sistema pede outra" }
      ],
      image: step3Image
    },
    {
      number: 4,
      icon: Database,
      title: "Pedido Faturado e Evidência Guardada",
      description: "Assim que o motorista confirma, acontece automaticamente:",
      checklist: [
        "Pedido marcado como faturado no ERP",
        "Documento original armazenado com rastreabilidade total",
        "Histórico completo disponível no dashboard web",
        "Empresa pode fazer download e auditoria quando quiser"
      ],
      image: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMHNlcnZlciUyMHRlY2hub2xvZ3klMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcwMzE2MTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section id="como-funciona" className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg font-bold">Como funciona</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 px-4 max-w-4xl mx-auto font-medium">
            Simples para o motorista. Automático para a empresa. Transparente para todos.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative max-w-7xl mx-auto">
          {/* Linha Conectora - Desktop */}
          <div className="hidden lg:block absolute top-[80px] left-[8%] right-[8%] h-1 bg-gradient-to-r from-[#D4FF00] via-[#D4FF00] to-[#D4FF00]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4FF00]/50 to-transparent blur-sm"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex flex-col items-center">
                  {/* Ícone Circular */}
                  <div className="relative z-10 mb-8">
                    <div className="w-40 h-40 rounded-full bg-[#0A2540] border-4 border-[#D4FF00] flex items-center justify-center shadow-2xl">
                      <Icon className="w-16 h-16 text-[#D4FF00]" strokeWidth={1.5} />
                    </div>
                    {/* Número Badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#D4FF00] border-4 border-white flex items-center justify-center shadow-lg">
                      <span className="text-[#0A2540] text-xl font-bold">{step.number}</span>
                    </div>
                  </div>

                  {/* Imagem */}
                  <div className="w-full mb-6 relative group">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border-4 border-gray-200 shadow-xl">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Overlay com gradiente */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0A2540]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Conteúdo */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#0A2540]">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Detalhes Específicos */}
                  {step.details && (
                    <div className="w-full bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                      <p className="font-bold text-[#0A2540] text-sm mb-2">O que ele faz:</p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#D4FF00] mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.options && (
                    <div className="w-full grid grid-cols-1 gap-2">
                      {step.options.map((option, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <p className="text-xs text-gray-700">
                            <span className="mr-1">{option.emoji}</span>
                            <strong>{option.title}</strong> {option.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.checklist && (
                    <div className="w-full bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                      <ul className="space-y-2 text-sm text-gray-700">
                        {step.checklist.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#D4FF00] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Seta Conectora - Mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-8">
                      <div className="w-1 h-12 bg-gradient-to-b from-[#D4FF00] to-[#D4FF00]/30"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Final */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-[#0A2540] to-[#0A2540] rounded-3xl px-8 md:px-12 py-6 md:py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4FF00]/10 to-transparent"></div>
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-2">
                ⚡ De Foto a Faturado em Menos de 1 Minuto
              </p>
              <p className="text-lg md:text-xl text-white/80">
                100% automático • 24/7 disponível • Zero fricção
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
