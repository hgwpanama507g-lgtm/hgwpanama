import React from 'react';
import { Truck, RotateCcw, Clock, ExternalLink, MapPin } from 'lucide-react';
import { SHIPPING_AND_RETURNS_POLICY } from '../data/seoMetadata';

interface ShippingAndReturnsSectionProps {
  compact?: boolean;
}

export const ShippingAndReturnsSection: React.FC<ShippingAndReturnsSectionProps> = ({ compact = false }) => {
  return (
    <section
      id="envios-y-devoluciones"
      aria-labelledby="envios-devoluciones-heading"
      className={`${
        compact
          ? 'bg-stone-50 rounded-2xl border border-stone-200 p-5 sm:p-6'
          : 'bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs'
      }`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-[#00795F]/10 text-[#00795F] flex items-center justify-center shrink-0">
          <Truck className="w-5 h-5" />
        </div>
        <h2
          id="envios-devoluciones-heading"
          className="text-lg sm:text-xl font-black text-black tracking-tight"
        >
          {SHIPPING_AND_RETURNS_POLICY.sectionTitle}
        </h2>
      </div>

      <div className="space-y-2 text-sm sm:text-base text-stone-800 leading-relaxed font-medium mb-5">
        <p>{SHIPPING_AND_RETURNS_POLICY.shippingLine}</p>
        <p>{SHIPPING_AND_RETURNS_POLICY.deliveryTimeLine}</p>
        <p>{SHIPPING_AND_RETURNS_POLICY.returnConditionsLine}</p>
        <p>{SHIPPING_AND_RETURNS_POLICY.otherCountriesLine}</p>
        <p className="pt-1">
          <a
            href={SHIPPING_AND_RETURNS_POLICY.registerUrl}
            rel="sponsored nofollow noopener"
            target="_blank"
            className="text-[#00795F] font-extrabold underline hover:text-[#004d3c] inline-flex items-center gap-1.5 break-all"
          >
            <span>{SHIPPING_AND_RETURNS_POLICY.registerUrl}</span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-[#00795F] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-black block">Envío exclusivo Panamá ({SHIPPING_AND_RETURNS_POLICY.destinationCountry})</span>
            <span className="text-stone-600">
              Desde USD {SHIPPING_AND_RETURNS_POLICY.shippingRateUsd}.
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-stone-200 flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-[#00795F] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-black block">Tiempos de entrega</span>
            <span className="text-stone-600">
              Preparación: {SHIPPING_AND_RETURNS_POLICY.handlingDaysMin} a {SHIPPING_AND_RETURNS_POLICY.handlingDaysMax} día · Tránsito: {SHIPPING_AND_RETURNS_POLICY.transitDaysMin} a {SHIPPING_AND_RETURNS_POLICY.transitDaysMax} días hábiles.
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-stone-200 flex items-start gap-2.5">
          <RotateCcw className="w-4 h-4 text-[#00795F] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-black block">Devoluciones</span>
            <span className="text-stone-600">
              Consultar con el fabricante.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
