import { TrendingUp, Users, Shield, FileSearch, RefreshCw, Eye } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Fatura no Mesmo Dia",
      description: "Dinheiro entra mais rápido no caixa. Melhore seu fluxo de caixa imediatamente.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "Zero Digitação",
      description: "Elimina equipe inteira de 10+ pessoas. IA faz todo o trabalho automaticamente.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Shield,
      title: "Sistema Anti-Fraude",
      description: "Totalmente rastreável. Se for questionado, você tem todas as provas necessárias.",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: FileSearch,
      title: "Zero Papel Perdido",
      description: "Tudo digital e guardado para sempre. Acesso instantâneo a qualquer documento.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: RefreshCw,
      title: "Zero Retrabalho",
      description: "Não libera se não estiver completo. Sistema só aceita informações 100% validadas.",
      color: "from-red-500 to-rose-600"
    },
    {
      icon: Eye,
      title: "Controle Total",
      description: "Vê tudo em tempo real no painel. Dashboard completo com todas as operações.",
      color: "from-cyan-500 to-teal-600"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            <span className="bg-[#D4FF00] text-[#0A2540] px-6 py-3 inline-block rounded-2xl shadow-lg">
              O Que Você Ganha
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 px-4 max-w-4xl mx-auto mt-6">
            6 benefícios transformadores para sua operação
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#D4FF00] hover:-translate-y-2"
              >
                {/* Ícone com Gradiente */}
                <div className="mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Conteúdo */}
                <h3 className="text-xl md:text-2xl font-bold text-[#0A2540] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Borda Animada no Hover */}
                <div className="absolute inset-0 rounded-3xl border-2 border-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-[#0A2540] to-[#01203f] rounded-3xl px-8 md:px-12 py-6 md:py-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4FF00]/10 to-transparent"></div>
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-2">
                💼 Transforme Sua Operação Hoje
              </p>
              <p className="text-lg md:text-xl text-white/80">
                Todos esses benefícios trabalhando 24h por dia para você
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
