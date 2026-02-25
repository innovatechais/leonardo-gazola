import { Camera, Cpu, CheckCircle } from "lucide-react";
import step1Image from "figma:asset/8f5eef55dbe96aac527d1b7e1cbb81ab8d45e2ef.png";
import step2Image from "figma:asset/da80fc7cbc42dd18f4f4c83e9922a65717106852.png";
import step3Image from "figma:asset/c175ea7682c8c46bc38a3238ba4607eac2a8d525.png";

export function HowItWorksFlow() {
  const steps = [
    {
      number: 1,
      icon: Camera,
      title: "Motorista Envia a Foto",
      description: "Acabou a entrega, tira foto do canhoto no WhatsApp e envia para o número da empresa usando o mesmo app de sempre.",
      image: step1Image
    },
    {
      number: 2,
      icon: Cpu,
      title: "Leitura Instantânea",
      description: "Em 2-3 segundos o sistema lê automaticamente: número da nota, pedido, data, carimbo e assinatura.",
      image: step2Image
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Confirmação e Pronto",
      description: "Motorista confere, responde \"OK\" e o pedido entra como faturado no sistema. Documento guardado para sempre.",
      image: step3Image
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            O Fluxo Completo em <span className="text-[#0A2540]">3 Passos Simples</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 px-4 max-w-4xl mx-auto">
            De foto a faturamento automático em segundos
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative max-w-6xl mx-auto">
          {/* Linha Conectora - Desktop */}
          <div className="hidden lg:block absolute top-[80px] left-[15%] right-[15%] h-1 bg-gradient-to-r from-[#D4FF00] via-[#D4FF00] to-[#D4FF00]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4FF00]/50 to-transparent blur-sm"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
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
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-medium mb-3 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

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
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium mb-2">
                ⚡ De Foto a Faturado em Segundos
              </p>
              <p className="text-lg md:text-xl text-white/80">
                100% automático • 24h por dia • Zero erros
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
