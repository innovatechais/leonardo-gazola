import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import logoDark from "figma:asset/45f31c03d8f493c9f03f863b7e5bfe6ed13243c3.png";

interface FooterV3Props {
  salesMode?: boolean;
}

export function FooterV3({ salesMode = false }: FooterV3Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 md:py-16 lg:py-20 px-4 bg-[#0A2540]">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">
            <span className="bg-[#D4FF00] text-[#0A2540] px-4 py-2 inline-block rounded-2xl shadow-lg font-bold">
              Vamos conversar?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium">
            Transforme evidências em vantagem competitiva. Entre em contato e descubra como o Evidex pode acelerar sua operação.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <MapPin className="w-8 h-8 text-[#D4FF00] mb-4" />
            <h4 className="text-white text-lg mb-2">Maringá - PR</h4>
            <p className="text-gray-400">Brasil</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Mail className="w-8 h-8 text-[#D4FF00] mb-4" />
            <h4 className="text-white text-lg mb-2">contato@evidex.com.br</h4>
            <p className="text-gray-400">Respondemos em até 24h</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Phone className="w-8 h-8 text-[#D4FF00] mb-4" />
            <h4 className="text-white text-lg mb-2">(44) 99839-4857</h4>
            <p className="text-gray-400">WhatsApp disponível</p>
          </div>
        </div>

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12 pt-8 md:pt-12 border-t border-white/10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <img 
              src={logoDark}
              alt="Evidex" 
              className="h-12 md:h-14 w-auto mb-4 md:mb-6"
            />
            <h4 className="text-white text-lg mb-3">Sobre o Evidex</h4>
            <p className="text-gray-400 text-base leading-relaxed">
              Evidex é a plataforma que transforma provas de entrega em dados confiáveis. Começamos com canhotos fiscais e estamos expandindo para outros documentos logísticos. Tecnologia, transparência e resultado mensurável para transportadoras e distribuidores que escolhem agilidade.
            </p>
          </div>

          {/* Soluções */}
          <div>
            <h4 className="text-white text-lg md:text-xl mb-4 md:mb-6">Soluções</h4>
            <ul className="space-y-3">
              <li><a href="#solucao" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Evidências de Entrega</a></li>
              <li><a href="#solucao" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Integração com ERP</a></li>
              <li><a href="#solucao" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Dashboard em Tempo Real</a></li>
              <li><a href="#solucao" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Auditoria e Compliance</a></li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-white text-lg md:text-xl mb-4 md:mb-6">Recursos</h4>
            <ul className="space-y-3">
              <li><a href="#faq" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Central de Ajuda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Documentação Técnica</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Casos de Sucesso</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white text-lg md:text-xl mb-4 md:mb-6">Empresa</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Sobre o Evidex</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Segurança e LGPD</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Contato</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base inline-flex items-center gap-2">→ Login</a></li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="mb-8 pt-8 border-t border-white/10">
          <h4 className="text-white text-lg md:text-xl mb-4 text-center">Redes Sociais</h4>
          <div className="flex gap-3 justify-center">
            <button
              className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#D4FF00] hover:border-[#D4FF00] transition-all hover:scale-105 group"
            >
              <Linkedin size={20} className="text-gray-300 group-hover:text-[#0A2540] transition-colors" />
            </button>
            <button
              className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#D4FF00] hover:border-[#D4FF00] transition-all hover:scale-105 group"
            >
              <Instagram size={20} className="text-gray-300 group-hover:text-[#0A2540] transition-colors" />
            </button>
            <button
              className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#D4FF00] hover:border-[#D4FF00] transition-all hover:scale-105 group"
            >
              <Facebook size={20} className="text-gray-300 group-hover:text-[#0A2540] transition-colors" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-10 border-t border-white/10">
          <p className="text-gray-400 text-base md:text-lg text-center">
            © {currentYear} Evidex by Innovatech. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
