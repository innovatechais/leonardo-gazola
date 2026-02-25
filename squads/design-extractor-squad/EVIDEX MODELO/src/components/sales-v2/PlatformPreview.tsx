export function PlatformPreview() {
  return (
    <section id="diferencial" className="relative py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 leading-[1.1] px-4">
            Veja o Sistema em Ação
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 px-4 max-w-3xl mx-auto">
            Demonstração completa do processo de automação de canhotos
          </p>
        </div>

        {/* Dashboard Screenshot */}
        <div>
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-gray-200 shadow-2xl">
            <img
              src="figma:asset/14441828114cc9582986e77f42401ab65898a2ed.png"
              alt="Dashboard Evidex - Sistema de Automação de Canhotos"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
