import fluent from 'figma:asset/81246dbecfd22313223d2d44ece216a885746be3.png';
import unifeitep from 'figma:asset/8aa83eaca70e6b09a3ef5c2cfbd2e74a00e5659f.png';
import xcale from 'figma:asset/195a21f7ab768b744a87584f4102c7f1cefabde2.png';
import bridge from 'figma:asset/267ef1061fa413ceecad2741e0fb1f5d88503547.png';
import metaltintas from 'figma:asset/27df15321d64a60b019d8380a873a8103b40b7de.png';
import ordemeprogresso from 'figma:asset/6c24b5aa3f7cdfd5267c913f5022b0b2d061248f.png';
import sistemaprever from 'figma:asset/298b280cbc33db43cfef49abb7d20358e1dab7e5.png';

export function LogoCloud() {
  const companies = [
    { name: "Sistema Prever", logo: sistemaprever },
    { name: "UniFeitep", logo: unifeitep },
    { name: "Ordem e Progresso", logo: ordemeprogresso },
    { name: "Metaltintas", logo: metaltintas },
    { name: "XCale", logo: xcale },
    { name: "Bridge", logo: bridge }
  ];

  return (
    <section className="hidden relative py-12 md:py-16 bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <p className="text-center text-sm md:text-base text-gray-500 mb-8 md:mb-12">
          Transportadoras que confiam na Evidex
        </p>
        
        <div className="relative w-full overflow-hidden">
          {/* Gradiente esquerda */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          
          {/* Gradiente direita */}
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes scroll-logos {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(calc(-100% / 4));
                }
              }
              .logo-scroll-container {
                animation: scroll-logos 30s linear infinite;
                display: flex;
                width: max-content;
              }
            `
          }} />
          
          <div className="logo-scroll-container">
            {/* Múltiplos conjuntos para garantir loop sem corte visível */}
            {[...Array(4)].map((_, setIndex) => (
              companies.map((company, index) => (
                <div
                  key={`set${setIndex}-${index}`}
                  className="flex items-center justify-center flex-shrink-0 px-12 md:px-16"
                >
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="h-16 md:h-20 w-auto object-contain rounded-lg"
                  />
                </div>
              ))
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
