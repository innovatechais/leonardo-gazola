import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Funciona com meu ERP?",
      answer: "Sim! Integramos via API/webhook com os principais ERPs do mercado. Se houver limitação técnica, utilizamos conector por arquivo ou rotina automatizada. Durante a demonstração, validamos a compatibilidade com seu sistema específico."
    },
    {
      question: "Qual a acurácia da leitura?",
      answer: "Projetamos acurácia ≥95% em documentos legíveis. Exceções (fotos de baixa qualidade ou campos ilegíveis) são automaticamente encaminhadas para conferência humana, mantendo a rastreabilidade completa."
    },
    {
      question: "Precisa de app novo para o motorista?",
      answer: "Não! O motorista usa o WhatsApp que já está instalado no celular dele. Basta tirar a foto do canhoto e enviar na conversa. Zero treinamento complexo."
    },
    {
      question: "E se a foto estiver ruim?",
      answer: "O sistema detecta automaticamente fotos de baixa qualidade e solicita uma nova captura. A evidência original é mantida para auditoria. O motorista recebe feedback imediato via WhatsApp."
    },
    {
      question: "Como funciona a LGPD e segurança?",
      answer: "100% compliance com LGPD. Dados criptografados em trânsito e repouso. Armazenamento em cloud seguro (AWS/Azure) com backup redundante. Política de retenção customizável. Auditoria completa disponível."
    },
    {
      question: "Qual o investimento?",
      answer: "Modelo SaaS com mensalidade baseada no volume. Teste por 30 dias: se a solução não comprovar ganho operacional mensurável, você não paga a mensalidade e pode cancelar. ROI típico em menos de 3 meses. Transparência total nos valores durante a demonstração."
    }
  ];

  return (
    <section id="faq" className="relative py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg md:text-xl text-gray-600 px-4">
            Respostas para as principais dúvidas
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border-b border-gray-200 py-2"
            >
              <AccordionTrigger className="py-4 md:py-6 hover:no-underline text-left">
                <span className="text-xl sm:text-2xl md:text-3xl text-gray-900 pr-4 leading-tight">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 md:pb-6">
                <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
