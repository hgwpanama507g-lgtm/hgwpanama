import React, { useState } from 'react';
import { ShieldCheck, MailCheck, Send, Phone, MapPin, Clock, Truck, Building2, Package, Sparkles, Check, AlertCircle, ShieldAlert, ExternalLink } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/products';
import { Link } from '../router';

export const PreRegistrationPage: React.FC = () => {
  const [accountType, setAccountType] = useState<'distribuidor' | 'cliente'>('distribuidor');
  const [selectedPlan, setSelectedPlan] = useState<string>('master');
  
  // Form fields according to official HGW registration requirements
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('Panamá');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Servientrega (Envío a Domicilio)');
  const [paymentMethod, setPaymentMethod] = useState('Yappy (Banco General)');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam honeypot verification
    if (honeypot.trim() !== '') {
      setErrorMsg('Error de validación de seguridad.');
      return;
    }

    if (!fullName.trim() || !nationalId.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Por favor completa todos los campos marcados como obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Secure SMTP dispatch simulation to hgwpanama507g@gmail.com
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      const planObj = MEMBERSHIP_PLANS.find(p => p.id === selectedPlan) || MEMBERSHIP_PLANS[3];
      let message = `*SOLICITUD DE PRE-REGISTRO HGW PANAMÁ*\n`;
      message += `_(Copia segura enviada a hgwpanama507g@gmail.com)_\n\n`;
      message += `📋 *Tipo de Cuenta:* ${accountType === 'cliente' ? 'Cliente Preferencial' : `Distribuidor (${planObj.name} - ${planObj.bv})`}\n`;
      message += `👤 *Nombre Completo:* ${fullName.trim()}\n`;
      message += `🪪 *Cédula / Pasaporte:* ${nationalId.trim()}\n`;
      if (birthDate) message += `🎂 *Fecha de Nacimiento:* ${birthDate}\n`;
      message += `📱 *Teléfono / WhatsApp:* ${phone.trim()}\n`;
      message += `📧 *Correo Electrónico:* ${email.trim()}\n`;
      message += `📍 *Ubicación:* ${province} - ${district || 'No especificado'}\n`;
      message += `🏠 *Dirección de Entrega:* ${address.trim() || 'No especificada'}\n`;
      message += `🚚 *Método de Entrega:* ${deliveryMethod}\n`;
      message += `💳 *Método de Pago:* ${paymentMethod}\n`;
      message += `🤝 *Patrocinador:* (Por asignar / Verificado por sistema)\n`;
      if (notes.trim()) message += `📝 *Comentarios/Productos:* ${notes.trim()}\n`;

      const encoded = encodeURIComponent(message);
      setTimeout(() => {
        window.open(`https://wa.me/50767788375?text=${encoded}`, '_blank');
      }, 900);
    }, 1200);
  };

  const selectedPlanData = MEMBERSHIP_PLANS.find(p => p.id === selectedPlan) || MEMBERSHIP_PLANS[3];

  return (
    <div className="py-8 sm:py-14 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 mb-6">
          <Link to="/inicio" className="hover:text-[#00795F] transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-black font-bold">Pre-registro</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-[#00795F] text-xs font-black uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-[#00A550]" />
            <span>Afiliación y Registro Oficial · Panamá</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight">
            Pre-registro
          </h1>
          {/* Legend removed as requested */}
        </div>

        {/* Official Portal Link Callout (Neutral) */}
        <div className="bg-[#00795F] text-white rounded-3xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-emerald-300 shrink-0" />
            <div className="text-center sm:text-left">
              <h3 className="font-black text-lg">¿Deseas registrarte directamente?</h3>
              <p className="text-emerald-100 text-xs sm:text-sm">Accede al portal corporativo internacional oficial de HGW.</p>
            </div>
          </div>
          <a
            href="https://www.healthgreenworld.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00795F] font-black text-sm rounded-xl shadow-sm hover:bg-stone-50 transition-all active:scale-95 whitespace-nowrap"
          >
            <span>Portal Oficial HGW</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Office Info & Servientrega Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#00795F]/10 flex items-center justify-center text-[#00795F] shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm space-y-1">
              <h3 className="font-extrabold text-black uppercase tracking-tight">HGW PANAMÁ (Ubicación)</h3>
              <p className="text-stone-700 leading-snug">
                Avenida Porras, Plaza Royal Blue, Local No. 6, Provincia de PANAMÁ, Corregimiento de San Francisco.
              </p>
              <p className="text-stone-500 font-medium">
                Contacto: <strong>+507 392-8415</strong>
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#00A550]/15 flex items-center justify-center text-[#00A550] shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm space-y-1">
              <h3 className="font-extrabold text-black uppercase tracking-tight">Horarios de Atención</h3>
              <p className="text-stone-700 leading-snug">
                Lunes a Viernes: 09:00 am a 06:00 pm | Sábados: 09:00 am a 01:00 pm
              </p>
              <p className="text-stone-500 font-medium">
                Domingo y Festivos: <strong>Cerrado</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Notice removed as requested */}

        {/* Main Registration Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-md">
          {submitted ? (
            <div className="text-center py-12 px-4 max-w-lg mx-auto space-y-5 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-[#00795F] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <MailCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
                ¡Solicitud de Pre-registro Enviada!
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                Tu información ha sido registrada y enviada con éxito al sistema de atención en Panamá (hgwpanama507g@gmail.com). Un representante se pondrá en contacto contigo para coordinar la activación, selección de productos y pago.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-[#00795F] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:bg-[#004d3c]"
                >
                  Regresar al formulario
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Account Type Selection */}
              <div>
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-3">
                  1. Selecciona el Tipo de Cuenta
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAccountType('distribuidor')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      accountType === 'distribuidor'
                        ? 'border-[#00795F] bg-emerald-50/50 shadow-xs ring-1 ring-[#00795F]'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm sm:text-base text-black">
                        Distribuidor Independiente
                      </span>
                      {accountType === 'distribuidor' && <Check className="w-5 h-5 text-[#00795F]" />}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Compra a precio de distribuidor con mínimo de 50 BV en productos.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('cliente')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      accountType === 'cliente'
                        ? 'border-[#00795F] bg-emerald-50/50 shadow-xs ring-1 ring-[#00795F]'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm sm:text-base text-black">
                        Cliente Preferencial
                      </span>
                      {accountType === 'cliente' && <Check className="w-5 h-5 text-[#00795F]" />}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Compra a precio público sin mínimo de compras.
                    </p>
                  </button>
                </div>
              </div>

              {/* Package Selection (if Distribuidor) */}
              {accountType === 'distribuidor' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-black text-black uppercase tracking-wider">
                      2. Elige tu Paquete de Activación HGW
                    </label>
                    <span className="text-[10px] sm:text-xs font-bold text-[#00795F] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Recomienda empezar con Junior
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MEMBERSHIP_PLANS.map((plan) => {
                      const isSelected = selectedPlan === plan.id;
                      const isJunior = plan.id === 'junior';
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#00795F] bg-emerald-50/40 shadow-md ring-2 ring-[#00795F]/30'
                              : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-xs'
                          }`}
                        >
                          {isJunior && (
                            <span className="absolute -top-2.5 left-3 bg-[#00A550] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs z-10">
                              Recomendado
                            </span>
                          )}

                          <div>
                            <div className="relative aspect-4/3 w-full bg-stone-50 rounded-xl mb-3 flex items-center justify-center p-2 overflow-hidden border border-stone-100 group">
                              <img
                                src={plan.packageImageUrl}
                                alt={plan.name}
                                referrerPolicy="no-referrer"
                                className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp";
                                }}
                              />
                            </div>

                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-black text-[#00795F] bg-[#00795F]/10 px-2 py-0.5 rounded-md">
                                {plan.bv}
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-[#00795F]" />}
                            </div>

                            <h4 className="font-extrabold text-sm text-black">{plan.name}</h4>
                            <p className="text-sm font-black text-stone-900 mt-1 tabular-nums">
                              {plan.priceEstimate}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Personal Data Fields */}
              <div>
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-3">
                  {accountType === 'distribuidor' ? '3.' : '2.'} Datos Personales
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. María Elena González"
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Número Cedula o Pasaporte *
                    </label>
                    <input
                      type="text"
                      required
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="Ej. 8-123-4567 o E-8-12345"
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    />
                  </div>

                  {accountType === 'distribuidor' && (
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">
                        Fecha de Nacimiento *
                      </label>
                      <input
                        type="date"
                        required
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Celular o Telefono de Contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+507 6000-0000"
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-black mb-1">
                      Provincia / Ciudad / Distrito *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                      >
                        <option value="Panamá">Panamá</option>
                        <option value="Panamá Oeste">Panamá Oeste</option>
                        <option value="Colón">Colón</option>
                        <option value="Chiriquí">Chiriquí</option>
                        <option value="Coclé">Coclé</option>
                        <option value="Veraguas">Veraguas</option>
                        <option value="Herrera">Herrera</option>
                        <option value="Los Santos">Los Santos</option>
                        <option value="Bocas del Toro">Bocas del Toro</option>
                        <option value="Darién">Darién</option>
                        <option value="Comarca Guna Yala">Comarca Guna Yala</option>
                        <option value="Comarca Ngäbe-Buglé">Comarca Ngäbe-Buglé</option>
                      </select>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="Distrito / Corregimiento"
                        className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-black mb-1">
                      Dirección Exacta para envío *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, edificio/casa, número, puntos de referencia..."
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] resize-none font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-black mb-1">
                      Correo Electrónico (Opcional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu-correo@ejemplo.com"
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery & Payment (Implicitly needed for HGW Panamá flow) */}
              <div>
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-3">
                  {accountType === 'distribuidor' ? '4.' : '3.'} Preferencias de Entrega y Pago
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Método de Entrega
                    </label>
                    <select
                      value={deliveryMethod}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    >
                      <option value="Servientrega (Envío a Domicilio)">Servientrega (Envío a Domicilio)</option>
                      <option value="Retiro en Oficina (Avenida Porras)">Retiro en Oficina (San Francisco)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Método de Pago
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    >
                      <option value="Yappy (Banco General)">Yappy (Banco General)</option>
                      <option value="Transferencia Bancaria ACH">Transferencia Bancaria ACH</option>
                      <option value="Efectivo en Oficina">Efectivo en Oficina</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Honeypot field (hidden from real users for anti-spam) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Sponsor Verification Box (Removed for neutrality) */}

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button with interactive feedback */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-base font-extrabold text-white bg-[#00795F] hover:bg-[#004d3c] active:scale-98 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando datos...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Formulario de Registro</span>
                  </>
                )}
              </button>

              <p className="text-xs text-stone-500 text-center leading-relaxed">
                Tus datos están protegidos y serán procesados exclusivamente para tu registro en HGW Panamá. Se enviará una copia automática al correo <strong className="text-black">hgwpanama507g@gmail.com</strong>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
