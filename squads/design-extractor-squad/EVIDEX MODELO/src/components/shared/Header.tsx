import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoLight from "figma:asset/453b7a6eb0a8e583af05e365947b59a7eb0117c3.png";

interface HeaderProps {
  salesMode?: boolean;
}

export function Header({ salesMode = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const institutionalLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Como Funciona", href: "#como-funciona" },
    { name: "Benefícios", href: "#beneficios" },
    { name: "FAQ", href: "#faq" }
  ];

  const salesLinks = [
    { name: "Como Funciona", href: "#como-funciona" },
    { name: "Benefícios", href: "#beneficios" }
  ];

  const navLinks = salesMode ? salesLinks : institutionalLinks;

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 120;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <nav className="relative rounded-2xl backdrop-blur-2xl bg-white/70 border border-white/20 shadow-2xl shadow-black/5">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src={logoLight}
                alt="Evidex" 
                className="h-12 w-auto"
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollToSection(e, link.href)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:text-[#0A2540] hover:bg-[#D4FF00]/20 transition-all font-medium"
                >
                  {link.name}
                </a>
              ))}

              {salesMode && (
                <button
                  className="ml-2 px-6 py-2 rounded-xl bg-[#D4FF00] text-[#0A2540] font-medium hover:scale-105 transition-all shadow-sm"
                >
                  Demonstração
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gray-900" />
                ) : (
                  <Menu size={24} className="text-gray-900" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 space-y-2 border-t border-gray-200">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    setTimeout(() => handleScrollToSection(e, link.href), 100);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-xl text-gray-600 hover:text-[#0A2540] hover:bg-[#D4FF00]/20 transition-all"
                >
                  {link.name}
                </a>
              ))}

              {salesMode && (
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-4 py-2 rounded-xl bg-[#D4FF00] text-[#0A2540] font-medium text-center"
                >
                  Demonstração
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
