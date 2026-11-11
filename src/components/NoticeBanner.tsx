import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const NoticeBanner: React.FC = () => {
  return (
    <aside aria-label="Aviso de Distribuidor Independiente" className="bg-[#004d3c] text-white text-xs py-2.5 px-4 border-b border-[#00795F]/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00A550] shrink-0" />
          <p className="text-emerald-50 text-[11px] sm:text-xs">
            <span className="font-bold text-white">Aviso Importante:</span> Sitio web informativo desarrollado por Distribuidores Independientes Autorizados de HGW Panamá. No es la web corporativa oficial de Health Green World.
          </p>
        </div>
        <div className="text-[11px] text-emerald-200/90 whitespace-nowrap">
          Atención y Envíos Panamá: <span className="text-white font-semibold">+507 6778-8375</span>
        </div>
      </div>
    </aside>
  );
};
