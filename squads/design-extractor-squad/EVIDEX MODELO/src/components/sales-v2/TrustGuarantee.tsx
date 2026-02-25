import { MapPin, Cpu, Target, Shield, Database, FileCheck } from "lucide-react";

export function TrustGuarantee() {
  const credentials = [
    {
      icon: MapPin,
      title: "Presença Nacional",
      description: "Sede em Maringá-PR com atuação em todo Brasil no setor de transporte e logística"
    },
    {
      icon: Cpu,
      title: "Especialistas em IA",
      description: "Time especializado em automação, inteligência artificial e integrações com ERPs"
    },
    {
      icon: Target,
      title: "Foco em Resultados",
      description: "Decisões mais rápidas e precisas através de tecnologia de ponta"
    }
  ];

  const security = [
    {
      icon: Shield,
      title: "LGPD",
      description: "Dados tratados com base legal clara. Criptografia em trânsito e repouso. Controles rigorosos de acesso."
    },
    {
      icon: Database,
      title: "Proteção de Dados",
      description: "Armazenamento seguro de evidências. Backup redundante e política de retenção ajustável."
    },
    {
      icon: FileCheck,
      title: "Auditoria Completa",
      description: "Rastreabilidade 100% de todas as operações. Logs detalhados e relatórios para compliance."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            Por Que Confiar na Evidex?
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 px-4 max-w-4xl mx-auto">
            Expertise, segurança e compromisso com seus resultados
          </p>
        </div>

        {/* Credentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16 md:mb-20">
          {credentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-8 md:p-10 border border-gray-200"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-4 md:mb-6">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#0A2540]" />
                </div>
                <h3 className="text-2xl md:text-3xl mb-3 md:mb-4 text-gray-900 leading-tight">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security & Compliance Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0A2540] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF00]/10 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-12 text-center">
                Segurança & Compliance
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {security.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#0A2540]" />
                      </div>
                      <h4 className="text-xl md:text-2xl mb-3 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
