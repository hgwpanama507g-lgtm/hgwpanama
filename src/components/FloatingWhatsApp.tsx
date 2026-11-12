import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ShieldAlert, Phone, HelpCircle } from 'lucide-react';
import { getAffiliationWhatsAppUrl, CORPORATE_OFFICE_PHONE } from '../utils/whatsapp';
import { useRouter } from '../router';

export const FloatingWhatsApp: React.FC = () => {
  const [showCard, setShowCard] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const { currentPath } = useRouter();
  const [whatsappHref, setWhatsappHref] = useState(() => getAffiliationWhatsAppUrl());

  // Dynamically recalculate WhatsApp URL whenever the visitor navigates to another page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWhatsappHref(getAffiliationWhatsAppUrl(window.location.href));
    }
  }, [currentPath]);

  const handleOpenWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Ensure the very latest URL is computed right at the moment of click
    if (typeof window !== 'undefined') {
      const freshUrl = getAffiliationWhatsAppUrl(window.location.href);
      e.currentTarget.href = freshUrl;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      
      {/* Detailed Distributor vs Corporate Assistance Card */}
      {showCard && (
        <div className="mb-3 w-80 sm:w-96 bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 p-4 animate-fade-in text-xs space-y-3 relative">
          <button
            onClick={() => setShowCard(false)}
            className="absolute top-3 right-3 text-stone-400 hover:text-black p-1 rounded-md hover:bg-stone-100 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A550] animate-pulse" />
            <h4 className="font-extrabold text-sm text-black">
              WhatsApp Distribuidor Independiente
            </h4>
          </div>

          <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <p className="font-bold text-[#00795F]">
              Atención a nuevos clientes y prospectos:
            </p>
            <p className="text-stone-700 leading-relaxed text-[11px]">
              Este número (+507 6778-8375) es atendido por un <strong>Distribuidor Independiente</strong> para consultas sobre productos, compras y afiliaciones. <em>No es una línea oficial ni corporativa de la empresa HGW.</em>
            </p>
          </div>

          <div className="p-2.5 bg-amber-50 border border-amber-200/90 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 font-extrabold text-amber-900">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>¿Ya eres socio registrado de HGW?</span>
            </div>
            <p className="text-stone-700 leading-relaxed text-[11px]">
              Si ya te encuentras afiliado en HGW, debes comunicarte directamente con tu <strong>patrocinador</strong> o llamar al teléfono de oficinas principales: <strong className="text-black">{CORPORATE_OFFICE_PHONE}</strong>.
            </p>
          </div>

          <div className="pt-1">
            <a
              href={whatsappHref}
              onClick={handleOpenWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#00A550] hover:bg-[#008f44] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear con el Distribuidor</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating prompt tooltip if card is closed */}
      {!showCard && showBadge && (
        <div className="mb-2 bg-white text-stone-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-2 animate-fade-in max-w-xs">
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-black block">WhatsApp Distribuidor:</span>
            <span className="text-stone-600">¿Deseas información sobre afiliación o pedidos?</span>
          </div>
          <button
            onClick={() => setShowBadge(false)}
            className="text-stone-400 hover:text-stone-700 p-0.5"
            aria-label="Cerrar sugerencia"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowCard(!showCard)}
          aria-label="Ver información sobre el número de contacto"
          className="w-8 h-8 rounded-full bg-white text-stone-700 hover:text-black border border-stone-300 shadow-md flex items-center justify-center text-xs font-bold hover:scale-105 transition-transform"
          title="Aviso de atención y soporte a socios"
        >
          <HelpCircle className="w-4 h-4 text-[#00795F]" />
        </button>

        <a
          href={whatsappHref}
          onClick={handleOpenWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar al distribuidor independiente por WhatsApp"
          className="w-14 h-14 bg-[#00A550] hover:bg-[#008f44] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#00A550]/40 hover:scale-105 active:scale-95 transition-all"
        >
          <MessageCircle className="w-7 h-7 fill-white text-[#00A550]" />
        </a>
      </div>

    </div>
  );
};
