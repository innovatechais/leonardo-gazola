import { CheckCircle, Smartphone, Zap, GitMerge, Activity } from "lucide-react";
import step2Image from "figma:asset/da80fc7cbc42dd18f4f4c83e9922a65717106852.png";

export function WhatIsThis() {
  return (
    <section className="relative py-16 md:py-24 bg-[#0A2540]">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4 text-white">
            Automação Completa de Canhotos
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 px-4 max-w-4xl mx-auto">
            Evidex Canhotos IA é uma solução que lê, <strong className="text-[#D4FF00]">valida e integra canhotos em segundos, eliminando digitação manual e retrabalho.</strong>
          </p>
        </div>

        {/* Main Content with Image */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <img
                  src={step2Image}
                  alt="IA processando e validando canhoto automaticamente"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-2 text-white">Solução Completa</h3>
                  <p className="text-base md:text-lg text-gray-300">
                    Solução + implantação + suporte contínuo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-2 text-white">Conexão via WhatsApp</h3>
                  <p className="text-base md:text-lg text-gray-300">
                    Facilita para o motorista porque já usa o app diariamente. Sem necessidade de novos aplicativos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-2 text-white">Fácil de Usar</h3>
                  <p className="text-base md:text-lg text-gray-300">
                    Motorista envia foto pelo WhatsApp; nosso sistema faz todo o trabalho e você acompanha em tempo real
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center flex-shrink-0">
                  <GitMerge className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-2 text-white">Integração Total</h3>
                  <p className="text-base md:text-lg text-gray-300">
                    Conecta com ERPs e sistemas de transporte via API
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-2 text-white">Rastreamento Completo</h3>
                  <p className="text-base md:text-lg text-gray-300">
                    Pedido marcado como faturado automaticamente com histórico de auditoria
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
