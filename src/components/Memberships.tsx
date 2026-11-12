import React from 'react';
import { Check, ArrowRight, ExternalLink, ShieldCheck, Sparkles, Phone, Award, ShieldAlert } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/products';
import { Link } from '../router';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

export const Memberships: React.FC = () => {
  return (
    <section id="membresias" className="py-12 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00795F] uppercase tracking-wider mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A550]" />
            <span>Planes Oficiales de Activación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
            Membresías HGW Panamá
          </h2>
          <p className="text-[18px] text-stone-800 mt-3 leading-relaxed font-normal">
            Elige tu plan de activación para consumir con descuento preferencial o emprender como Distribuidor Independiente autorizado. En todos los planes recibes <strong>productos de tu preferencia</strong> y respaldo local en Panamá.
          </p>

          {/* Clarification banner: Diamante is a rank, not a membership */}
          <div className="mt-4 p-3 bg-white border border-stone-300 rounded-2xl text-xs sm:text-sm text-stone-800 font-medium inline-block shadow-2xs">
            <span className="font-extrabold text-black">Aclaración Importante:</span> Diamante es un rango de liderazgo que se alcanza con desarrollo de equipo y volumen, no una membresía de ingreso. Los 4 paquetes de afiliación inicial son <strong>Pre-Junior, Junior, Senior y Master</strong>.
          </div>

          {/* Registered member notice */}
          <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-stone-800 font-medium max-w-2xl mx-auto flex items-center justify-center gap-2 text-center shadow-2xs">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>¿Ya eres socio registrado de HGW?</strong> Debes comunicarte directamente con tu patrocinador o llamar a oficinas principales: <strong className="text-black">+507 392-8415</strong>.
            </span>
          </div>
        </div>

        {/* 4 Cards Grid - No rank logos, pure clean typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {MEMBERSHIP_PLANS.map((plan) => {
            const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://hgwpanama.com/membresias';
            const planWhatsappText = encodeURIComponent(
              `¡Hola! Estaba visitando tu tienda online (${currentUrl}) y quería preguntar sobre cómo afiliarse a HGW Panamá con el plan "${plan.name}" (${plan.bv}). Mi nombre es:`
            );
            const planWhatsappUrl = `https://wa.me/50767788375?text=${planWhatsappText}`;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 ${
                  plan.recommended
                    ? 'border-[#00795F] shadow-xl ring-2 ring-[#00795F]/30 relative'
                    : 'border-stone-300 shadow-sm hover:border-stone-400 hover:shadow-md'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00795F] text-white text-xs font-black px-4 py-1 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-[#00A550]" />
                    <span>Más Recomendado</span>
                  </div>
                )}

                <div>
                  {/* Clean BV points badge - No rank logos */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#00795F]/10 text-[#00795F] text-xs font-black rounded-xl border border-[#00795F]/20">
                      {plan.bv}
                    </span>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                      Activación
                    </span>
                  </div>

                  {/* Package Photography with subtle hover zoom */}
                  <div className="relative aspect-4/3 w-full bg-stone-50 rounded-2xl p-2.5 mb-4 flex items-center justify-center overflow-hidden border border-stone-200/80 group">
                    <img
                      src={plan.packageImageUrl}
                      alt={plan.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain hover:scale-106 transition-transform duration-300 ease-out drop-shadow-2xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp";
                      }}
                    />
                  </div>

                  {/* Title & Price */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-black">{plan.name}</h3>
                    <div className="mt-2 text-2xl sm:text-3xl font-black text-black tabular-nums">
                      {plan.priceEstimate}
                    </div>
                    <p className="text-xs font-bold text-[#00795F] mt-1">
                      {plan.productsChoice}
                    </p>
                  </div>

                  {/* Direct Sales Highlight */}
                  <div className="mt-4 p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200">
                    <div className="text-xs font-bold text-stone-600 uppercase">Ganancia Venta Directa</div>
                    <div className="text-base font-black text-emerald-900 mt-0.5">
                      {plan.directSaleProfit}
                    </div>
                  </div>

                  {/* Official PDF Conditions breakdown */}
                  <div className="mt-5 pt-4 border-t border-stone-200 space-y-2.5 text-xs sm:text-sm text-black">
                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-700 font-medium">Bono Inicio Rápido:</span>
                      <strong className="text-black tabular-nums">{plan.fastStartBonus}</strong>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-700 font-medium">Bono Desarrollo:</span>
                      <strong className="text-black tabular-nums">{plan.developmentBonus}</strong>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-700 font-medium">Bono Equipo:</span>
                      <strong className="text-black tabular-nums">{plan.teamBonus}</strong>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-700 font-medium">Tope Diario:</span>
                      <strong className="text-black tabular-nums">{plan.dailyEarningsCap}</strong>
                    </div>

                    {plan.eliteBonus && (
                      <div className="flex items-center justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-700 font-medium">Bono Élite:</span>
                        <strong className="text-[#00795F]">{plan.eliteBonus}</strong>
                      </div>
                    )}

                    <div className="flex items-center justify-between py-1">
                      <span className="text-stone-700 font-medium">Bono Recompra:</span>
                      <strong className="text-black tabular-nums">{plan.repurchaseBonus}</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col gap-2">
                  <a
                    href={planWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-center ${
                      plan.recommended
                        ? 'bg-[#00795F] hover:bg-[#004d3c] text-white shadow-md hover:shadow-lg'
                        : 'bg-stone-900 hover:bg-black text-white hover:shadow-md'
                    }`}
                  >
                    <span>Activar por WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    to="/preregistro"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center text-[#00795F] bg-stone-100 hover:bg-stone-200 transition-colors"
                  >
                    Pre-registro
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Master Membership Callout Banner */}
        <div className="bg-gradient-to-r from-[#004d3c] via-[#00795F] to-[#00A550] text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-black text-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Beneficio Comercial Exclusivo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                ¿Sabías que con el Plan Master ganas hasta un 52% en tus compras personales?
              </h3>
              <p className="text-[17px] sm:text-[18px] text-emerald-100 leading-relaxed max-w-2xl font-normal">
                Al comprar como miembro Master (600 BV), obtienes los precios más bajos de distribuidor con hasta un 52% de beneficio, permitiéndote márgenes del 60% en ventas directas al por menor en Panamá.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                to="/oportunidad-de-negocio"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-stone-100 text-[#00795F] font-black text-sm rounded-xl shadow-md transition-all active:scale-95 text-center"
              >
                <span>Conoce el Plan de Negocio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getAffiliationWhatsAppUrl()}
                onClick={(e) => {
                  if (typeof window !== 'undefined') {
                    e.currentTarget.href = getAffiliationWhatsAppUrl(window.location.href);
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white bg-black/20 hover:bg-black/30 font-bold text-xs sm:text-sm rounded-xl transition-all text-center border border-white/20 active:scale-95"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Hablar con un Distribuidor</span>
              </a>
            </div>

          </div>
        </div>

        {/* Official registration link banner */}
        <div className="bg-stone-100 border border-stone-300 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00795F] uppercase">
                <ShieldCheck className="w-4 h-4 text-[#00A550]" />
                <span>Patrocinio Oficial Panamá: Yamilka507</span>
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold text-black">
                ¿Deseas registrarte directamente en el portal oficial HGW?
              </h4>
              <p className="text-[17px] text-stone-700 leading-relaxed font-normal">
                Puedes completar tu registro en el sistema corporativo internacional de Green World bajo el código oficial de nuestro equipo.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://www.healthgreenworld.com/?userName=Yamilka507"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#00795F] hover:bg-[#004d3c] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all"
              >
                <span>Portal Oficial HGW</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                to="/preregistro"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-black font-bold text-xs sm:text-sm rounded-xl transition-all"
              >
                <span>Pre-registro</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

