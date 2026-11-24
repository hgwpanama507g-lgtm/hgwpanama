import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Send,
  MapPin,
  ShieldAlert,
  CheckCircle2,
  Check,
  RefreshCw,
} from 'lucide-react';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';
import { ShippingAndReturnsSection } from './ShippingAndReturnsSection';
import { ScrollReveal } from './ScrollReveal';

const PANAMA_PROVINCES = [
  'Panamá',
  'Panamá Oeste',
  'Colón',
  'Chiriquí',
  'Coclé',
  'Veraguas',
  'Herrera',
  'Los Santos',
  'Bocas del Toro',
  'Darién',
  'Comarca Guna Yala',
  'Comarca Ngäbe-Buglé',
  'Comarca Emberá-Wounaan',
];

interface ContactSectionProps {
  showExtendedNotices?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  showExtendedNotices = false,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [email, setEmail] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [isNotRobot, setIsNotRobot] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre y apellido (campo obligatorio).');
      return;
    }
    if (!province.trim()) {
      setErrorMsg('Por favor selecciona tu provincia (campo obligatorio).');
      return;
    }
    if (!inquiry.trim()) {
      setErrorMsg('Por favor escribe tu consulta (campo obligatorio).');
      return;
    }
    if (!isNotRobot) {
      setErrorMsg('Por favor marca la casilla "No soy un robot" para continuar.');
      return;
    }

    const currentUrl =
      typeof window !== 'undefined' ? window.location.href : 'https://www.hgwpanama.com';

    let text = `¡Hola! Estaba visitando tu tienda online (${currentUrl}) y deseo realizar una consulta:\n\n`;
    text += `Nombre y apellido: ${fullName.trim()}\n`;
    if (phone.trim()) text += `Teléfono: +507 ${phone.trim()}\n`;
    text += `Provincia: ${province.trim()}\n`;
    if (email.trim()) text += `Correo: ${email.trim()}\n`;
    text += `Consulta: ${inquiry.trim()}\n`;

    setSubmitted(true);
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/50767788375?text=${encoded}`, '_blank');
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-24 py-14 sm:py-20 bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
              Contacto
            </h2>
            <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
              Envíanos tu consulta sobre productos, pedidos, envíos o afiliaciones en la República de Panamá.
            </p>
          </div>

          {/* 2 Columns: Left = Form | Right = Google Map centered on Panama */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-6 bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">¡Consulta preparada!</strong>
                    <span>
                      Se abrió WhatsApp con tu mensaje listo para enviar al +507 6778-8375.
                    </span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div
                  role="alert"
                  className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold"
                >
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Row 1: Nombre y apellido (required), Teléfono (+507 & Panama Flag) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  <div className="sm:col-span-7">
                    <label
                      htmlFor="contact-full-name"
                      className="block text-xs font-bold text-slate-800 mb-1.5"
                    >
                      Nombre y apellido <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Tu nombre y apellido"
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4472C4]/30 focus:border-[#4472C4]"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-bold text-slate-800 mb-1.5"
                    >
                      Teléfono
                    </label>
                    <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#4472C4]/30 focus-within:border-[#4472C4]">
                      {/* Panama Flag SVG + +507 Prefix */}
                      <div className="flex items-center gap-1.5 pl-3 pr-2 py-2.5 bg-slate-50 border-r border-slate-200 shrink-0">
                        <svg
                          className="w-5 h-3.5 rounded-[2px] shadow-2xs shrink-0"
                          viewBox="0 0 36 24"
                          aria-label="Bandera de Panamá"
                        >
                          <rect width="18" height="12" fill="#FFFFFF" />
                          <rect x="18" width="18" height="12" fill="#DA121A" />
                          <rect y="12" width="18" height="12" fill="#072357" />
                          <rect x="18" y="12" width="18" height="12" fill="#FFFFFF" />
                          <polygon
                            points="9,2.8 9.9,5.5 12.8,5.5 10.5,7.2 11.4,9.9 9,8.2 6.6,9.9 7.5,7.2 5.2,5.5 8.1,5.5"
                            fill="#072357"
                          />
                          <polygon
                            points="27,14.8 27.9,17.5 30.8,17.5 28.5,19.2 29.4,21.9 27,20.2 24.6,21.9 25.5,19.2 23.2,17.5 26.1,17.5"
                            fill="#DA121A"
                          />
                        </svg>
                        <span className="text-xs font-bold text-slate-800">+507</span>
                      </div>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="6123-4567"
                        className="w-full px-3 py-2.5 text-base sm:text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none tabular-nums"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Provincia (required), Correo (opcional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="contact-province"
                      className="block text-xs font-bold text-slate-800 mb-1.5"
                    >
                      Provincia <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="contact-province"
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4472C4]/30 focus:border-[#4472C4]"
                    >
                      <option value="">Selecciona tu provincia</option>
                      {PANAMA_PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-slate-800 mb-1.5"
                    >
                      Correo (opcional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4472C4]/30 focus:border-[#4472C4]"
                    />
                  </div>
                </div>

                {/* Row 3: Escriba su consulta (required) & No soy un robot reCAPTCHA box */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
                  <div className="sm:col-span-7">
                    <label
                      htmlFor="contact-inquiry"
                      className="block text-xs font-bold text-slate-800 mb-1.5"
                    >
                      Escriba su consulta <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="contact-inquiry"
                      rows={4}
                      required
                      value={inquiry}
                      onChange={(e) => setInquiry(e.target.value)}
                      placeholder="Cuéntanos qué producto o membresía te interesa..."
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4472C4]/30 focus:border-[#4472C4] resize-none"
                    />
                  </div>

                  {/* reCAPTCHA-style "No soy un robot" widget */}
                  <div className="sm:col-span-5 sm:pt-6">
                    <div
                      onClick={() => setIsNotRobot(!isNotRobot)}
                      role="checkbox"
                      aria-checked={isNotRobot}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          setIsNotRobot(!isNotRobot);
                        }
                      }}
                      className="bg-white border border-slate-300 rounded-xl p-3.5 shadow-2xs flex items-center justify-between gap-2 cursor-pointer select-none hover:border-[#4472C4] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-colors shrink-0 ${
                            isNotRobot
                              ? 'bg-[#4472C4] border-[#4472C4] text-white'
                              : 'bg-white border-slate-400'
                          }`}
                        >
                          {isNotRobot && <Check className="w-4 h-4 stroke-[3]" />}
                        </span>
                        <span className="text-xs font-semibold text-slate-800">
                          No soy un robot
                        </span>
                      </div>

                      <div className="flex flex-col items-center text-[9px] text-slate-500 leading-tight shrink-0">
                        <RefreshCw className="w-4 h-4 text-[#4472C4] mb-0.5" />
                        <span className="font-bold">reCAPTCHA</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#4472C4] hover:bg-[#33599E] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-[#4472C4]/25 flex items-center justify-center gap-2.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta por WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Right Column: Google Maps Embedded Centered on Panama */}
            <div className="lg:col-span-6 space-y-4">
              <div className="w-full h-[360px] sm:h-[430px] rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-[#EEF3FB]">
                <iframe
                  title="Mapa de Panamá - HGW Panamá"
                  src="https://maps.google.com/maps?q=Panama&ll=8.537981,-80.782127&z=7&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Compact Quick Contact Cards beneath Map */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getAffiliationWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#F8FAFC] hover:bg-[#EEF3FB] rounded-2xl border border-slate-200 flex items-center gap-3 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#4472C4]/10 text-[#4472C4] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">
                      WhatsApp Distribuidor
                    </span>
                    <strong className="text-sm font-black text-slate-900 tabular-nums">
                      +507 6778-8375
                    </strong>
                  </div>
                </a>

                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4472C4]/10 text-[#4472C4] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">
                      Correo Pre-registro
                    </span>
                    <strong className="text-xs sm:text-sm font-black text-slate-900 truncate block select-all">
                      hgwpanama507g@gmail.com
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clarifications & Shipping/Returns only shown on /contacto page */}
          {showExtendedNotices && (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Aclaración Importante sobre Canales de Atención</span>
                </div>
                <p className="text-slate-800 leading-relaxed">
                  El número de WhatsApp <strong>+507 6778-8375</strong> es atendido por un{' '}
                  <strong>Distribuidor Independiente</strong> para ventas y nuevas afiliaciones.{' '}
                  <em>No es una línea oficial corporativa de la empresa HGW.</em>
                </p>
                <p className="text-slate-800 leading-relaxed pt-1 border-t border-amber-200/80">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#4472C4]" />
                  <strong>¿Ya eres socio registrado?</strong> Comunícate con tu patrocinador o a las oficinas principales en Avenida Porras, Plaza Royal Blue, Local No. 6, San Francisco, Panamá:{' '}
                  <strong>+507 392-8415</strong>.
                </p>
              </div>

              <div>
                <ShippingAndReturnsSection compact />
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};
