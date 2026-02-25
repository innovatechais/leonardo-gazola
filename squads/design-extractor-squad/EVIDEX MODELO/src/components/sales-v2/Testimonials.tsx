import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Roberto Almeida",
      role: "Diretor de Operações",
      company: "TransLog Cargas",
      image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDQxMDE3OXww&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "Reduzimos em 70% o tempo de processamento de canhotos. O que antes levava horas, agora é resolvido em minutos. O ROI foi comprovado no primeiro mês."
    },
    {
      name: "Patricia Ferreira",
      role: "Gerente Financeiro",
      company: "Expresso Brasil",
      image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMzQzOTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "Eliminamos completamente os erros de digitação manual. Nossa equipe financeira agora foca em análise estratégica ao invés de ficar digitando documentos."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            Transportadoras Reais,
            <br />
            <span className="text-gray-400">Resultados Reais</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-10 border border-gray-200 flex flex-col hover:border-[#D4FF00] transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4FF00] text-[#D4FF00]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg md:text-xl text-gray-900 mb-8 leading-relaxed flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <div className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-base text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
