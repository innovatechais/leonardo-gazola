import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function FAQV3() {
  const faqs = [
    {
      question: "Funciona com meu ERP?",
      answer: "Sim. Integramos via API com os principais ERPs do mercado (SAP, TOTVS, Sankhya, Bling e outros). Se o seu sistema tiver limitação técnica, usamos conectores por arquivo ou rotinas automatizadas. Durante a demonstração, validamos a compatibilidade com o seu sistema específico."
    },
    {
      question: "Qual a acurácia da leitura?",
      answer: "A meta de acurácia é ≥95% em documentos legíveis. Quando a foto está nítida e bem enquadrada, a taxa operacional chega a 99%+. Se aparecer uma exceção (foto ruim ou campo ilegível), o sistema encaminha automaticamente para conferência humana, mantendo a rastreabilidade completa."
    },
    {
      question: "O motorista precisa baixar algum app?",
      answer: "Não. Ele usa o WhatsApp que já está instalado no celular. É só tirar a foto do canhoto e enviar na conversa. Zero treinamento complexo, zero login, zero senha nova para decorar."
    },
    {
      question: "E se a foto ficar ruim?",
      answer: "O sistema detecta automaticamente quando a foto está com qualidade inadequada e pede uma nova captura. O feedback é educado, direto e chega na hora. A evidência original sempre fica preservada para auditoria, mesmo que precise refazer."
    },
    {
      question: "Como funciona a LGPD e a segurança dos dados?",
      answer: "100% compliance com LGPD. Dados criptografados em trânsito e em repouso, armazenamento em nuvem segura (AWS/Azure) com backup redundante, política de retenção customizável conforme sua necessidade. Auditoria completa disponível: você sabe quem acessou o quê e quando."
    },
    {
      question: "Quanto custa?",
      answer: "Modelo SaaS com mensalidade baseada no volume de documentos. A oferta de lançamento dá direito a implementação completa (consultoria + mapeamento + integração) e primeira mensalidade grátis. Você testa por 30 dias: se a solução não comprovar ganho operacional mensurável, pode cancelar sem pagar a mensalidade. ROI típico em menos de 3 meses. Transparência total nos valores durante a demonstração."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg font-bold">
              Perguntas Frequentes
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Respostas diretas para você decidir com clareza.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100 px-6 md:px-8 overflow-hidden data-[state=open]:border-[#D4FF00]"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 group">
                <div className="flex items-start gap-4 pr-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#D4FF00] flex items-center justify-center group-data-[state=open]:rotate-45 transition-transform">
                    <Plus className="w-5 h-5 text-[#0A2540]" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-[#0A2540]">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-12 md:pl-14">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA after FAQ */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-600 mb-6">
            Ainda tem dúvidas? Vamos conversar!
          </p>
          <a
            href="https://wa.me/5544998394857"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0A2540] text-white text-lg font-bold hover:scale-105 transition-all shadow-lg"
          >
            Falar com Especialista
          </a>
        </div>
      </div>
    </section>
  );
}
