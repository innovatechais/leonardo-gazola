import { MessageSquare, LayoutDashboard, Plug, Zap, CheckCircle2, Camera, Shield, TrendingUp } from "lucide-react";

export function WhatIsThisV3() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg font-bold">
              O que é Evidex
            </span>
          </h2>
          {/* Timeline Vertical */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative">
              {/* Linha vertical conectando os passos */}
              <div className="absolute left-8 top-12 bottom-12 w-1 bg-gradient-to-b from-[#D4FF00] via-[#D4FF00] to-[#D4FF00] hidden md:block"></div>

              {/* Passo 1: Captura */}
              <div className="relative flex items-start gap-6 mb-12">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center z-10 shadow-lg ring-4 ring-[#D4FF00]/20">
                  <Camera className="w-8 h-8 text-[#0A2540]" />
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl font-bold text-[#0A2540]">1</span>
                    <h3 className="text-2xl font-bold text-[#0A2540]">Motorista tira a foto</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    O motorista tira uma foto do canhoto na hora da entrega. Em poucos segundos todos os dados de entrega são <strong>armazenados com segurança</strong> junto com a imagem do canhoto original.
                  </p>
                </div>
              </div>

              {/* Passo 2: Processamento */}
              <div className="relative flex items-start gap-6 mb-12">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center z-10 shadow-lg ring-4 ring-[#D4FF00]/20">
                  <Shield className="w-8 h-8 text-[#0A2540]" />
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl font-bold text-[#0A2540]">2</span>
                    <h3 className="text-2xl font-bold text-[#0A2540]">Evidência guardada</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Em poucos segundos você tem a <strong>evidência guardada</strong>, o motorista liberado para continuar a rota e o <strong>pedido faturado</strong>.
                  </p>
                </div>
              </div>

              {/* Passo 3: Resultado */}
              <div className="relative flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center z-10 shadow-lg ring-4 ring-[#D4FF00]/20">
                  <TrendingUp className="w-8 h-8 text-[#0A2540]" />
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl font-bold text-[#0A2540]">3</span>
                    <h3 className="text-2xl font-bold text-[#0A2540]">Tudo rastreável</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Tudo <strong>automático, simples e rastreável</strong>. Zero papel perdido, zero retrabalho, zero preocupação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Mockup Example */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 mb-16 border-2 border-gray-100">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <MessageSquare className="w-6 h-6 text-green-600" />
                <span className="font-bold text-[#0A2540]">Evidex Bot</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl p-4 text-[#0A2540]">
                  <p className="font-mono text-sm leading-relaxed">
                    <strong>Pedido:</strong> 4524410<br />
                    <strong>Assinatura:</strong> OK ✓<br />
                    <strong>Carimbo:</strong> OK ✓<br />
                    <strong>Data:</strong> 26/08/2025<br />
                    <strong>Nome:</strong> AMAZONAS MERCADO
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  ✓ Dados extraídos com sucesso. Confira e responda "OK" para confirmar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* O que você recebe */}
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl text-center mb-12">
            <span className="text-[#0A2540] font-bold">O que você recebe</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recurso 1 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0A2540] mb-3">Plataforma Completa</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Solução + implantação + suporte contínuo + interface web para gestão.
                  </p>
                </div>
              </div>
            </div>

            {/* Recurso 2 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0A2540] mb-3">WhatsApp Nativo</h4>
                  <p className="text-gray-600 leading-relaxed">
                    O motorista usa o WhatsApp que já está no celular dele. Zero app novo, zero login, zero fricção.
                  </p>
                </div>
              </div>
            </div>

            {/* Recurso 3 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0A2540] mb-3">Dashboard de Evidências</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Acesse todos os documentos, transações e histórico em uma interface visual organizada. Faça downloads, auditorias e rastreamento total.
                  </p>
                </div>
              </div>
            </div>

            {/* Recurso 4 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center">
                  <Plug className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0A2540] mb-3">Integração com ERP</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Conecta automaticamente com seu sistema via API. Dados validados vão direto para o financeiro sem digitação manual.
                  </p>
                </div>
              </div>
            </div>

            {/* Recurso 5 - Span completo */}
            <div className="md:col-span-2 bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0A2540] mb-3">Confirmação Inteligente</h4>
                  <p className="text-gray-600 leading-relaxed">
                    O motorista vê os dados lidos na tela e confirma com "OK". Se algo estiver errado, ele corrige por texto ou áudio. Se a foto ficou ruim, o sistema pede outra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="mt-16 bg-gradient-to-br from-[#0A2540] to-[#0A2540]/90 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-8 h-8 text-[#0A2540]" />
              </div>
              <p className="text-white font-bold">Celular</p>
            </div>

            <div className="text-[#D4FF00] text-3xl hidden md:block">→</div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-[#0A2540]" />
              </div>
              <p className="text-white font-bold">IA</p>
            </div>

            <div className="text-[#D4FF00] text-3xl hidden md:block">→</div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center mx-auto mb-3">
                <LayoutDashboard className="w-8 h-8 text-[#0A2540]" />
              </div>
              <p className="text-white font-bold">Dashboard</p>
            </div>

            <div className="text-[#D4FF00] text-3xl hidden md:block">→</div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4FF00] flex items-center justify-center mx-auto mb-3">
                <Plug className="w-8 h-8 text-[#0A2540]" />
              </div>
              <p className="text-white font-bold">ERP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
