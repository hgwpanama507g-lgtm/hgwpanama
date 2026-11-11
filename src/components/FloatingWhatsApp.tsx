import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="mb-2 bg-white text-stone-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-2 animate-fade-in max-w-xs">
          <span>¿Deseas cotizar o consultar en Panamá? ¡Escríbenos!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-700 p-0.5"
            aria-label="Cerrar sugerencia"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating button */}
      <a
        href="https://wa.me/50767788375?text=Hola%20HGW%20Panam%C3%A1%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos%20y%20entregas."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat por WhatsApp con HGW Panamá"
        className="w-14 h-14 bg-[#00A550] hover:bg-[#008f44] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#00A550]/40 hover:scale-105 active:scale-95 transition-all"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#00A550]" />
      </a>
    </div>
  );
};
