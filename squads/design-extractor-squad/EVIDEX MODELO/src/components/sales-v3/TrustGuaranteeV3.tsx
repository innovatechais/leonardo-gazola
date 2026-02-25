import { Award, Cpu, Target, Lock, Shield, FileCheck, LayoutDashboard, Download, History } from "lucide-react";
import dashboardImage from "figma:asset/14441828114cc9582986e77f42401ab65898a2ed.png";

export function TrustGuaranteeV3() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg font-bold">
              Confie na Evidex
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Evidências só funcionam se você puder confiar nelas. Por isso construímos o Evidex com os padrões mais rigorosos.
          </p>
        </div>

        {/* Credenciais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
            <div className="w-16 h-16 rounded-2xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Expertise em Logística</h3>
            <p className="text-gray-600 leading-relaxed">
              Sede em Maringá-PR, atuação nacional no setor de transporte. Conhecemos as dores porque trabalhamos com quem vive isso todo dia.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
            <div className="w-16 h-16 rounded-2xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <Cpu className="w-8 h-8 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Tecnologia de Ponta</h3>
            <p className="text-gray-600 leading-relaxed">
              Time especializado em IA, automação e integrações de sistemas. Mantemos a plataforma atualizada com as melhores práticas do mercado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#D4FF00] transition-all">
            <div className="w-16 h-16 rounded-2xl bg-[#D4FF00] flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-[#0A2540]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">Foco em Resultado Mensurável</h3>
            <p className="text-gray-600 leading-relaxed">
              Não vendemos tecnologia por vender. Validamos ROI, acompanhamos métricas e ajustamos o que for necessário para você ganhar.
            </p>
          </div>
        </div>

        {/* Segurança & Compliance */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0A2540]/90 rounded-3xl p-8 md:p-12 mb-20">
          <h3 className="text-3xl md:text-4xl text-white text-center mb-12 font-bold">
            Segurança & Compliance
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pilar 1: LGPD */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Lock className="w-12 h-12 text-[#D4FF00] mb-6" />
              <h4 className="text-2xl font-bold text-white mb-6">LGPD 100%</h4>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Dados tratados com base legal clara</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Criptografia em trânsito e em repouso</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Controles rigorosos de acesso por perfil</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Política de retenção customizável</span>
                </li>
              </ul>
            </div>

            {/* Pilar 2: Proteção de Evidências */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Shield className="w-12 h-12 text-[#D4FF00] mb-6" />
              <h4 className="text-2xl font-bold text-white mb-6">Proteção de Evidências</h4>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Armazenamento seguro em nuvem (AWS/Azure)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Backup redundante automático</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Rastreabilidade 100%: quem acessou o quê e quando</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Evidências preservadas para auditoria futura</span>
                </li>
              </ul>
            </div>

            {/* Pilar 3: Auditoria Completa */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <FileCheck className="w-12 h-12 text-[#D4FF00] mb-6" />
              <h4 className="text-2xl font-bold text-white mb-6">Auditoria Completa</h4>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Logs detalhados de todas as operações</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Relatórios exportáveis para compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Interface web para consulta e download</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4FF00] mt-1">✓</span>
                  <span>Histórico nunca some, sempre disponível</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dashboard de Gestão */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl text-[#0A2540] text-center mb-12 font-bold">
            Dashboard de Gestão
          </h3>

          {/* Imagem do Dashboard */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4FF00]">
            <img 
              src={dashboardImage} 
              alt="Dashboard Evidex - Visão geral da plataforma"
              className="w-full h-auto"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visão Geral */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <LayoutDashboard className="w-10 h-10 text-[#D4FF00] mb-4" />
              <h4 className="text-xl font-bold text-[#0A2540] mb-4">Visão Geral</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Total de documentos processados (hoje, semana, mês)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Status de cada entrega (faturado, pendente, exceção)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Indicadores de performance em tempo real</span>
                </li>
              </ul>
            </div>

            {/* Documentos */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <Download className="w-10 h-10 text-[#D4FF00] mb-4" />
              <h4 className="text-xl font-bold text-[#0A2540] mb-4">Documentos</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Foto original de cada canhoto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Dados extraídos lado a lado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Download individual ou em lote</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Busca por período, motorista, pedido ou status</span>
                </li>
              </ul>
            </div>

            {/* Auditoria */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <History className="w-10 h-10 text-[#D4FF00] mb-4" />
              <h4 className="text-xl font-bold text-[#0A2540] mb-4">Auditoria</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Linha do tempo de cada documento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Histórico de correções (se houver)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Logs de integração com ERP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4FF00] mt-1">•</span>
                  <span>Relatórios para compliance e análise</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
