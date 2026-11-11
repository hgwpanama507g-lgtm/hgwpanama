import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, DollarSign, Award, ShieldCheck, ArrowRight, Phone, Send, Sparkles, Users, Package } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/products';
import { Link } from '../router';

export const BusinessOpportunityPage: React.FC = () => {
  // Preregistration Form State
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [province, setProvince] = useState('Panamá');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('master');
  const [paymentMethod, setPaymentMethod] = useState('Yappy (Banco General)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitPreregistration = (e: React.FormEvent) => {
    e.preventDefault();

    const planObj = MEMBERSHIP_PLANS.find(p => p.id === selectedPlan) || MEMBERSHIP_PLANS[3];

    let message = `*SOLICITUD DE PRERREGISTRO - HGW PANAMÁ*\n`;
    message += `Hola, deseo completar mi prerregistro como distribuidor independiente en HGW Panamá:\n\n`;
    message += `📋 *Membresía Seleccionada:* ${planObj.name} (${planObj.bv} - ${planObj.priceEstimate})\n`;
    message += `👤 *Nombre Completo:* ${fullName}\n`;
    message += `🪪 *Cédula / Pasaporte:* ${nationalId}\n`;
    message += `📱 *WhatsApp / Teléfono:* ${phone}\n`;
    message += `📧 *Correo Electrónico:* ${email}\n`;
    if (birthDate) message += `🎂 *Fecha de Nacimiento:* ${birthDate}\n`;
    message += `📍 *Provincia / Distrito:* ${province} - ${district || 'No especificado'}\n`;
    if (address) message += `🏠 *Dirección:* ${address}\n`;
    message += `💳 *Método de Pago Preferido:* ${paymentMethod}\n`;
    message += `🤝 *Patrocinador Oficial:* Yamilka Batista (Código: Yamilka507)\n`;
    if (notes) message += `📝 *Notas:* ${notes}\n`;
    message += `\n¿Cuáles son los siguientes pasos para coordinar la selección de mis productos de preferencia y activar mi código oficial?`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/50767788375?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 mb-6">
          <Link to="/inicio" className="hover:text-[#00795F]">Inicio</Link>
          <span>/</span>
          <span className="text-black font-bold">Oportunidad de Negocio</span>
        </div>

        {/* Hero Banner for Business Opportunity */}
        <div className="bg-gradient-to-br from-[#004d3c] via-[#00795F] to-[#00A550] text-white rounded-3xl p-8 sm:p-14 shadow-xl mb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-black tracking-wider uppercase text-emerald-200 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan de Compensación HGW Panamá</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-5">
              Gana hasta un <span className="text-emerald-300">52% en Ventas Directas</span> al comprar como Miembro Master
            </h1>

            <p className="text-base sm:text-lg text-emerald-100 leading-relaxed mb-8">
              En Health Green World tú decides cómo crecer. Al activarte con la membresía <strong>Master (600 BV)</strong>, compras tus productos con hasta un <strong>52% de descuento preferencial</strong>, lo que te permite obtener hasta un <strong>60% de margen en venta directa</strong> al consumidor, además de 6 bonos adicionales de equipo y liderazgo.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#formulario-prerregistro"
                className="px-6 py-3.5 bg-white text-[#00795F] font-black text-sm rounded-xl shadow-md hover:bg-stone-100 transition-all active:scale-95 text-center"
              >
                Formulario de Prerregistro
              </a>
              <a
                href="https://wa.me/50767788375?text=Hola%20Yamilka%2C%20deseo%20m%C3%A1s%20detalles%20sobre%20c%C3%B3mo%20ganar%20hasta%20el%2052%25%20con%20la%20Membres%C3%ADa%20Master%20de%20HGW."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#004d3c]/60 hover:bg-[#004d3c] text-white font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Asesoría 1 a 1 por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Core Pillars: Why HGW is Revolutionary */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              ¿Por qué emprender con HGW en Panamá?
            </h2>
            <p className="text-sm sm:text-base text-stone-700 mt-2">
              Un modelo de venta directa ético, transparente y adaptado a la economía panameña.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#00795F]/15 flex items-center justify-center text-[#00795F] mb-5">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-black mb-2">
                1. Máxima Rentabilidad (Hasta 52%)
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                Al adquirir tu membresía Master compras a precio de distribuidor con hasta un 52% de ahorro en recompras, permitiéndote rentabilizar tu inversión con hasta el 60% de margen neto en ventas directas.
              </p>
            </div>

            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#00A550]/20 flex items-center justify-center text-[#00795F] mb-5">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-black mb-2">
                2. Productos de tu Preferencia
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                No estás obligado a paquetes cerrados. Eliges libremente los productos que más te gustan o que tus clientes más piden: Blueberry Coffee, Ganoderma, Colágeno, protectores de turmalina y pastas dentales probióticas.
              </p>
            </div>

            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#00795F]/15 flex items-center justify-center text-[#00795F] mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-black mb-2">
                3. Plan de Ganancias Mutuas
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                Ganas por tu propio esfuerzo y también recibes apoyo por el crecimiento de tu equipo. Con bonos de inicio rápido, desarrollo, bono de equipo diario (hasta $720 USD/día en Master) y bono élite hasta la 6ta generación.
              </p>
            </div>

          </div>
        </div>

        {/* Comparison Table based on PDF document */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Tabla Comparativa de Membresías HGW
            </h2>
            <p className="text-sm text-stone-700 mt-2">
              Datos oficiales de los planes de activación vigentes para Panamá según el plan de compensación.
            </p>
          </div>

          <div className="overflow-x-auto border border-stone-300 rounded-3xl shadow-sm bg-white">
            <table className="w-full text-left text-sm text-black">
              <thead className="bg-stone-100/90 border-b border-stone-300 text-xs font-black uppercase tracking-wider text-black">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Beneficio / Condición</th>
                  <th className="py-4 px-4">Pre-Junior (50 BV)</th>
                  <th className="py-4 px-4">Junior (100 BV)</th>
                  <th className="py-4 px-4">Senior (300 BV)</th>
                  <th className="py-4 px-4 bg-emerald-50 text-[#00795F]">Master (600 BV) ★</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs sm:text-sm font-medium">
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Inversión Aprox.</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold">B/. 90.00</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold">B/. 180.00</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold">B/. 540.00</td>
                  <td className="py-3.5 px-4 tabular-nums font-extrabold text-[#00795F] bg-emerald-50/50">B/. 1024.00</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Selección de Productos</td>
                  <td className="py-3.5 px-4" colSpan={4}>
                    <span className="text-[#00795F] font-bold">Productos de su preferencia (100% a elección)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Ganancia Venta Directa</td>
                  <td className="py-3.5 px-4 font-bold">30%</td>
                  <td className="py-3.5 px-4 font-bold">30%</td>
                  <td className="py-3.5 px-4 font-bold">30%</td>
                  <td className="py-3.5 px-4 font-black text-emerald-800 bg-emerald-50/50">
                    60% (Hasta 52% en compras)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Inicio Rápido</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold">$5.00</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold">$10.00</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold">$30.00</td>
                  <td className="py-3.5 px-4 tabular-nums font-black text-[#00795F] bg-emerald-50/50">$60.00</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Desarrollo</td>
                  <td className="py-3.5 px-4 tabular-nums">0.20 USD</td>
                  <td className="py-3.5 px-4 tabular-nums">0.50 USD</td>
                  <td className="py-3.5 px-4 tabular-nums">1.50 USD</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold text-[#00795F] bg-emerald-50/50">3.00 USD</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Equipo</td>
                  <td className="py-3.5 px-4 font-bold">5%</td>
                  <td className="py-3.5 px-4 font-bold">7%</td>
                  <td className="py-3.5 px-4 font-bold">8%</td>
                  <td className="py-3.5 px-4 font-black text-[#00795F] bg-emerald-50/50">10%</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Tope Ganancia Diaria</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold">50 USD / día</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold">120 USD / día</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold">360 USD / día</td>
                  <td className="py-3.5 px-4 tabular-nums font-black text-[#00795F] bg-emerald-50/50">720 USD / día</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Élite</td>
                  <td className="py-3.5 px-4 text-stone-400">—</td>
                  <td className="py-3.5 px-4 text-stone-400">—</td>
                  <td className="py-3.5 px-4 font-bold">4% Hasta 3era gen.</td>
                  <td className="py-3.5 px-4 font-black text-[#00795F] bg-emerald-50/50">4% Hasta 6ta gen.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Recompra</td>
                  <td className="py-3.5 px-4 font-bold">5%</td>
                  <td className="py-3.5 px-4 font-bold">5%</td>
                  <td className="py-3.5 px-4 font-bold">5%</td>
                  <td className="py-3.5 px-4 font-bold text-[#00795F] bg-emerald-50/50">5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Prerregistro (Required by User Prompt) */}
        <div id="formulario-prerregistro" className="scroll-mt-24">
          <div className="bg-stone-50 border-2 border-[#00795F]/30 rounded-3xl p-6 sm:p-12 shadow-md">
            
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00795F]/10 text-[#00795F] rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Inscripción y Afiliación Oficial</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Formulario de Prerregistro HGW Panamá
              </h2>
              <p className="text-sm sm:text-base text-stone-700 mt-2 leading-relaxed">
                Completa tus datos para apartar tu código de Distribuidor Independiente bajo el patrocinio autorizado de <strong className="text-black">Yamilka Batista (Código: Yamilka507)</strong>. Te contactaremos de inmediato por WhatsApp para coordinar tu selección de productos y activación.
              </p>
            </div>

            {submitted ? (
              <div className="max-w-md mx-auto text-center py-10 px-6 bg-white rounded-2xl border border-emerald-300 shadow-sm animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#00A550] mx-auto mb-3" />
                <h3 className="text-xl font-black text-black">¡Prerregistro Enviado con Éxito!</h3>
                <p className="text-sm text-stone-700 mt-2 leading-relaxed">
                  Hemos generado tu solicitud en WhatsApp para conectar con el equipo de HGW Panamá. Si la ventana no abrió automáticamente, puedes presionar el botón abajo:
                </p>
                <a
                  href="https://wa.me/50767788375?text=Hola%20Yamilka%2C%20acabo%20de%20enviar%20mi%20formulario%20de%20prerregistro%20para%20HGW%20Panam%C3%A1."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 px-6 py-3 bg-[#00A550] text-white font-bold text-sm rounded-xl shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Abrir WhatsApp (+507 6778-8375)</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmitPreregistration} className="max-w-3xl mx-auto space-y-6">
                
                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-extrabold text-black mb-2">
                    Selecciona tu Membresía de Activación deseada:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MEMBERSHIP_PLANS.map((plan) => (
                      <label
                        key={plan.id}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          selectedPlan === plan.id
                            ? 'bg-emerald-50/70 border-[#00795F] ring-2 ring-[#00795F]/20'
                            : 'bg-white border-stone-300 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-black text-sm">{plan.name}</span>
                          <input
                            type="radio"
                            name="membership-plan"
                            value={plan.id}
                            checked={selectedPlan === plan.id}
                            onChange={() => setSelectedPlan(plan.id)}
                            className="text-[#00795F] focus:ring-[#00795F]"
                          />
                        </div>
                        <div className="text-xs font-bold text-[#00795F]">
                          {plan.bv} · {plan.priceEstimate}
                        </div>
                        <div className="text-[11px] text-stone-600 mt-1">
                          Ganancia en ventas: <strong>{plan.directSaleProfit}</strong>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Nombre y Apellidos completos *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. María Elena González"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Cédula (CIP) o Pasaporte *
                    </label>
                    <input
                      type="text"
                      required
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="Ej. 8-765-4321"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Teléfono / WhatsApp (+507) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 6778-8375"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Provincia de Residencia *
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
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
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Distrito / Corregimiento
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Ej. San Francisco / Betania / David"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    Dirección residencial / Punto de entrega
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Calle, barriada, edificio o referencia en Panamá"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Forma de pago prevista para tu activación
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                    >
                      <option value="Yappy (Banco General)">Yappy (Banco General)</option>
                      <option value="Transferencia Bancaria ACH">Transferencia Bancaria ACH</option>
                      <option value="Efectivo en Entrega">Efectivo contraentrega (área metropolitana)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Patrocinador Asignado
                    </label>
                    <div className="px-4 py-2.5 bg-stone-200/80 rounded-xl text-sm font-bold text-stone-900 border border-stone-300">
                      Yamilka Batista · Código: <span className="text-[#00795F] font-mono">Yamilka507</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    Comentarios o preguntas sobre los productos a elegir (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Indica qué productos te gustaría incluir en tu paquete o cualquier duda que tengas..."
                    className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#00A550] hover:bg-[#008f44] text-white text-base font-black rounded-xl shadow-lg shadow-[#00A550]/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar Prerregistro a WhatsApp (+507 6778-8375)</span>
                </button>

                <p className="text-xs text-stone-600 text-center">
                  Al enviar este formulario se abrirá WhatsApp con los datos listos para validar tu registro con la distribuidora autorizada en Panamá. No se requiere tarjeta de crédito en esta etapa.
                </p>

              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
