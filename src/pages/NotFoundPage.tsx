import React from 'react';
import { Home, Search, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from '../router';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 px-4 py-20">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* Error Illustration / Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#00795F]/10 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto border border-stone-100 ring-8 ring-[#00795F]/5">
            <AlertCircle className="w-12 h-12 text-[#00795F]" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-6xl font-black text-black tracking-tighter">404</h1>
          <h2 className="text-2xl font-extrabold text-stone-900">Página no encontrada</h2>
          <p className="text-stone-600 font-medium leading-relaxed">
            Lo sentimos, el enlace que intentas seguir no existe o ha sido movido permanentemente. 
            Es posible que sea una ruta antigua de nuestro sitio anterior.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-4 bg-[#00795F] hover:bg-[#004d3c] text-white font-black rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group"
          >
            <Home className="w-5 h-5" />
            <span>Ir al Inicio</span>
          </Link>
          
          <Link
            to="/productos"
            className="w-full sm:w-auto px-8 py-4 bg-white border border-stone-200 text-stone-800 font-bold rounded-2xl shadow-sm hover:bg-stone-50 transition-all flex items-center justify-center gap-2 group"
          >
            <Search className="w-5 h-5" />
            <span>Ver Catálogo</span>
          </Link>
        </div>

        <div className="pt-8 flex items-center justify-center gap-2 text-stone-400 font-bold text-xs uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>HGW Panamá · Distribuidor Oficial</span>
        </div>
      </div>
    </div>
  );
};

import { ShieldCheck } from 'lucide-react';
