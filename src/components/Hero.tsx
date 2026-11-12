import React from 'react';
import { ArrowRight, Phone, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from '../router';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative bg-gradient-to-b from-[#00795F]/8 via-white to-stone-50 pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#00795F] uppercase tracking-wider mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A550]" />
              <span>Salud · Bienestar · Prosperidad</span>
              <span aria-hidden="true" className="text-stone-300">/</span>
              <span>Panamá</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-[1.15] text-balance mb-5">
              Bienestar Natural y Productos Funcionales con <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00795F] to-[#00A550]">HGW Panamá</span>
            </h1>

            <p className="text-[18px] text-stone-800 leading-relaxed max-w-2xl mb-8 font-normal">
              Descubre la sinergia entre la sabiduría herbolaria milenaria y la tecnología moderna. Productos originales de arándano, turmalina, ganoderma lucidum y probióticos respaldados por certificaciones de clase mundial y asesoría personalizada de distribuidores independientes en Panamá.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8">
              <Link
                to="/productos"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-black text-white bg-[#00795F] hover:bg-[#004d3c] rounded-xl shadow-md shadow-[#00795F]/20 active:scale-95 transition-all whitespace-nowrap text-center"
              >
                <span>Ver Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/oportunidad-de-negocio"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-[#00795F] bg-white border border-[#00795F]/40 hover:bg-[#00795F]/5 rounded-xl shadow-xs active:scale-95 transition-all whitespace-nowrap text-center"
              >
                <Sparkles className="w-4 h-4 text-[#00A550]" />
                <span>Oportunidad de Negocio</span>
              </Link>
            </div>

            {/* Proof bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[17px] text-black w-full pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00A550] shrink-0" />
                <span className="font-medium">Productos 100% auténticos con registro FDA e ISO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00A550] shrink-0" />
                <span className="font-medium">Membresías con hasta 52% de beneficio comercial</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-fidelity Product & Brand Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Background gradient decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#00795F]/20 to-[#00A550]/20 rounded-3xl blur-2xl -z-10" />

              {/* Card Container */}
              <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden p-3 sm:p-4">
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src="https://media.academiahgw.online/wp-content/uploads/2026/11/Banner-Productos-HGW-1024x682.jpg"
                    alt="Línea de productos naturales y funcionales HGW"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white">
                      <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Línea Oficial Panamá</p>
                      <p className="text-[18px] sm:text-[20px] font-black">Arándano · Ganoderma · Turmalina</p>
                    </div>
                  </div>
                </div>

                {/* Sub-card highlights */}
                <div className="mt-4 grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <p className="text-xs text-stone-600 font-medium">Moneda oficial</p>
                    <p className="text-sm sm:text-base font-black text-black">Precios en USD ($)</p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <p className="text-xs text-stone-600 font-medium">Distribución</p>
                    <p className="text-sm sm:text-base font-black text-[#00795F]">Envíos en Panamá</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Column Feature / Value Strip below hero split */}
        <div className="mt-14 pt-10 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#00795F]/10 flex items-center justify-center text-[#00795F] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-black">Respaldo Internacional</h2>
              <p className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-relaxed">
                Empresa con presencia en más de 50 países y normativas FDA, GMP e ISO 9001.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#00A550]/15 flex items-center justify-center text-[#00795F] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-black">Ingredientes Ancestrales</h2>
              <p className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-relaxed">
                Arándano silvestre con antocianinas, Cordyceps, Ganoderma y Turmalina activa.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#00795F]/10 flex items-center justify-center text-[#00795F] shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-black">Atención WhatsApp Directa</h2>
              <p className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-relaxed">
                Asesoría personalizada en productos y pedidos al +507 6778-8375.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#00A550]/15 flex items-center justify-center text-[#00795F] shrink-0">
              <ArrowRight className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-black">Emprende con HGW</h2>
              <p className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-relaxed">
                Planes Pre-Junior, Junior, Senior y Master con ganancias de hasta un 52%.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

