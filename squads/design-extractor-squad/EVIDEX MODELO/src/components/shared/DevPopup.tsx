import { X } from "lucide-react";
import logoEvidex from "figma:asset/45f31c03d8f493c9f03f863b7e5bfe6ed13243c3.png";

interface DevPopupProps {
  onClose: () => void;
}

export function DevPopup({ onClose }: DevPopupProps) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"></div>
      
      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border-4 border-[#D4FF00] overflow-hidden">
          {/* Header with close button */}
          <div className="relative bg-gradient-to-br from-[#0A2540] to-[#0A2540] p-6 pb-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex justify-center mb-4">
              <img 
                src={logoEvidex}
                alt="Evidex" 
                className="h-16 w-auto"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-4">
              SITE EM DESENVOLVIMENTO
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Estamos preparando algo incrível para você! Em breve, nosso site estará completo.
            </p>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 rounded-xl bg-[#D4FF00] text-[#0A2540] font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Entendi
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
