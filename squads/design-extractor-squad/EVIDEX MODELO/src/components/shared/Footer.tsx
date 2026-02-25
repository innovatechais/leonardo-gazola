import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import logoDark from "figma:asset/45f31c03d8f493c9f03f863b7e5bfe6ed13243c3.png";

interface FooterProps {
  salesMode?: boolean;
}

export function Footer({ salesMode = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 md:py-16 lg:py-20 px-4 bg-[#0A2540]">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 md:mb-6">
            Vamos Conversar?
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Está pronto para transformar a gestão de canhotos da sua transportadora? Entre em contato conosco e descubra como podemos ajudar.
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
            <h4 className="text-white text-lg mb-3">Sobre a Evidex</h4>
            <p className="text-gray-400 text-base leading-relaxed">
              Tecnologia e inovação para o setor de transporte e logística. Soluções baseadas em IA para aumentar eficiência e reduzir custos.
            </p>
          </div>

          {/* Soluções */}
          <div>
            <h4 className="text-white text-lg md:text-xl mb-4 md:mb-6">Soluções</h4>
            <ul className="space-y-3">
              <li><a href="#solucao" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Automação de Canhotos</a></li>
              <li><a href="#solucao" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Integração com ERP</a></li>
              <li><a href="#beneficios" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Dashboards em Tempo Real</a></li>
              <li><a href="#solucao" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">IA para Logística</a></li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-white text-lg md:text-xl mb-4 md:mb-6">Recursos</h4>
            <ul className="space-y-3">
              <li><a href="#faq" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Central de Ajuda</a></li>
              <li><a href="#demonstracao" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Documentação</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">Casos de Sucesso</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4FF00] transition-colors text-base">→ Login</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white text-lg md:text-xl mb-4 md:mb-6">Redes Sociais</h4>
            <div className="flex gap-3">
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
        </div>



        {/* Bottom Bar */}
        <div className="pt-8 md:pt-10 border-t border-white/10">
          <p className="text-gray-400 text-base md:text-lg text-center">
            © {currentYear} Evidex. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
