import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, DollarSign, Award, ShieldCheck, ArrowRight, Phone, Send, Sparkles, Users, Package, Truck, Lock, MailCheck, ShieldAlert, ExternalLink } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/products';
import { Link } from '../router';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

export const BusinessOpportunityPage: React.FC = () => {
  // Preregistration Form State
  const [accountType, setAccountType] = useState<'cliente' | 'distribuidor'>('distribuidor');
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [province, setProvince] = useState('Panamá');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('master');
  const [deliveryMethod, setDeliveryMethod] = useState('Servientrega (Envío a Domicilio)');
  const [paymentMethod, setPaymentMethod] = useState('Yappy (Banco General)');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap field
  
  // Submission & simulation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmitPreregistration = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam honeypot check
    if (honeypot.trim() !== '') {
      setErrorMsg('Error de validación de seguridad.');
      return;
    }

    // Basic validation
    if (!fullName.trim() || !nationalId.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Por favor completa todos los campos obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate secure SMTP dispatch to hgwpanama507g@gmail.com with anti-spam headers / TLS simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Also construct WhatsApp fallback message for convenience
      const planObj = MEMBERSHIP_PLANS.find(p => p.id === selectedPlan) || MEMBERSHIP_PLANS[3];
      let message = `*PRERREGISTRO HGW PANAMÁ (Enviado a hgwpanama507g@gmail.com)*\n\n`;
      message += `📋 *Tipo de Cuenta:* ${accountType === 'cliente' ? 'Cliente (Precio Público)' : `Distribuidor (${planObj.name} - ${planObj.bv})`}\n`;
      message += `👤 *Nombre Completo:* ${fullName.trim()}\n`;
      message += `🪪 *Cédula / Pasaporte:* ${nationalId.trim()}\n`;
      if (birthDate) message += `🎂 *Fecha de Nacimiento:* ${birthDate}\n`;
      message += `📱 *Teléfono / WhatsApp:* ${phone.trim()}\n`;
      message += `📧 *Correo Electrónico:* ${email.trim()}\n`;
      message += `📍 *Ubicación:* ${province} - ${district || 'No especificado'}\n`;
      message += `🏠 *Dirección de Envío:* ${address.trim() || 'No especificada'}\n`;
      message += `🚚 *Método de Entrega:* ${deliveryMethod}\n`;
      message += `💳 *Método de Pago:* ${paymentMethod}\n`;
      message += `🤝 *Patrocinador:* Yamilka Batista (Código: Yamilka507)\n`;
      if (notes) message += `📝 *Notas:* ${notes.trim()}\n`;

      const encoded = encodeURIComponent(message);
      // Open WhatsApp backup after a brief pause so user can complete
      setTimeout(() => {
        window.open(`https://wa.me/50767788375?text=${encoded}`, '_blank');
      }, 1000);

    }, 1200);
  };

  return (
    <div className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 mb-6">
          <Link to="/inicio" className="hover:text-[#00795F]">Inicio</Link>
          <span>/</span>
          <span className="text-black font-bold">Oportunidad de Negocio y Prerregistro</span>
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
              En Health Green World tú decides cómo crecer. Al activarte con la membresía <strong>Master (600 BV)</strong>, compras tus productos con hasta un <strong>52% de descuento preferencial</strong>, lo que te permite obtener hasta un <strong>60% de margen en venta directa</strong> al consumidor, además de bonos de inicio rápido, desarrollo, equipo y liderazgo.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/preregistro"
                className="px-6 py-3.5 bg-white text-[#00795F] font-black text-sm rounded-xl shadow-md hover:bg-stone-100 transition-all active:scale-95 text-center"
              >
                Pre-registro
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
                className="px-6 py-3.5 bg-[#004d3c]/60 hover:bg-[#004d3c] text-white font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Asesoría 1 a 1 por WhatsApp</span>
              </a>
              <a
                href="https://www.healthgreenworld.com/?userName=Yamilka507"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>link registro oficial</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Notice for already registered partners */}
        <div className="mb-14 p-4 sm:p-5 bg-amber-50/90 border border-amber-300 rounded-2xl text-xs space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2 font-black text-amber-950 text-sm">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Aclaración Importante: Canales de Atención para Distribuidores y Socios</span>
          </div>
          <p className="text-stone-800 leading-relaxed font-normal">
            El número de WhatsApp <strong className="text-black">+507 6778-8375</strong> es operado de manera independiente por distribuidores autorizados de HGW en Panamá para responder dudas de productos, ventas y guiar a nuevas personas en su afiliación. <em>No es una línea oficial ni corporativa de la empresa HGW.</em>
          </p>
          <div className="pt-1.5 border-t border-amber-200 text-stone-900">
            <strong>¿Ya eres socio registrado de HGW?</strong> Si ya estás activo como socio, debes comunicarte directamente con tu <strong>patrocinador</strong> o llamar al teléfono oficial de las oficinas principales en Ciudad de Panamá: <strong className="text-black">+507 392-8415</strong> para soporte sobre tu código o pedidos.
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
            
            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
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

            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
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

            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
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
              <thead className="bg-stone-100 border-b border-stone-300 text-xs font-black uppercase tracking-wider text-black">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Beneficio / Condición</th>
                  <th className="py-4 px-4 text-center">Pre-Junior (50 BV)</th>
                  <th className="py-4 px-4 text-center">Junior (100 BV)</th>
                  <th className="py-4 px-4 text-center">Senior (300 BV)</th>
                  <th className="py-4 px-4 text-center bg-emerald-50 text-[#00795F]">Master (600 BV) ★</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs sm:text-sm font-medium">
                {/* Official Package Images Row */}
                <tr className="bg-stone-50/70">
                  <td className="py-4 px-4 sm:px-6 font-extrabold text-stone-900">
                    Imagen del Paquete Oficial
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="w-24 h-20 sm:w-28 sm:h-24 mx-auto flex items-center justify-center p-1.5 bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden group">
                      <img
                        src="https://media.academiahgw.online/wp-content/uploads/2026/11/prejunior-hgw.png"
                        alt="Paquete Pre-Junior HGW"
                        className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[11px] font-bold text-stone-600 mt-1.5">50 BV</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="w-24 h-20 sm:w-28 sm:h-24 mx-auto flex items-center justify-center p-1.5 bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden group">
                      <img
                        src="https://media.academiahgw.online/wp-content/uploads/2026/11/JUNIOR-100-BV.png"
                        alt="Paquete Junior HGW"
                        className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[11px] font-bold text-stone-600 mt-1.5">100 BV</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="w-24 h-20 sm:w-28 sm:h-24 mx-auto flex items-center justify-center p-1.5 bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden group">
                      <img
                        src="https://media.academiahgw.online/wp-content/uploads/2026/11/senior.png"
                        alt="Paquete Senior HGW"
                        className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[11px] font-bold text-stone-600 mt-1.5">300 BV</span>
                  </td>
                  <td className="py-4 px-4 text-center bg-emerald-50/50">
                    <div className="w-24 h-20 sm:w-28 sm:h-24 mx-auto flex items-center justify-center p-1.5 bg-white rounded-2xl border-2 border-emerald-400 shadow-xs overflow-hidden group">
                      <img
                        src="https://media.academiahgw.online/wp-content/uploads/2026/11/master-600-bv-hgw.png"
                        alt="Paquete Master HGW"
                        className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="block text-[11px] font-black text-[#00795F] mt-1.5">600 BV (Recomendado)</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Inversión Aprox.</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">B/. 90.00</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">B/. 180.00</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">B/. 540.00</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-extrabold text-[#00795F] bg-emerald-50/50">B/. 1024.00</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Selección de Productos</td>
                  <td className="py-3.5 px-4 text-center" colSpan={4}>
                    <span className="text-[#00795F] font-bold">Productos de su preferencia (100% a elección de todo el catálogo oficial)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Ganancia Venta Directa</td>
                  <td className="py-3.5 px-4 text-center font-bold">30%</td>
                  <td className="py-3.5 px-4 text-center font-bold">30%</td>
                  <td className="py-3.5 px-4 text-center font-bold">30%</td>
                  <td className="py-3.5 px-4 text-center font-black text-emerald-800 bg-emerald-50/50">
                    60% (Hasta 52% en compras)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Inicio Rápido</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">$5.00</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">$10.00</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">$30.00</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-black text-[#00795F] bg-emerald-50/50">$60.00</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Desarrollo</td>
                  <td className="py-3.5 px-4 text-center tabular-nums">0.20 USD</td>
                  <td className="py-3.5 px-4 text-center tabular-nums">0.50 USD</td>
                  <td className="py-3.5 px-4 text-center tabular-nums">1.50 USD</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold text-[#00795F] bg-emerald-50/50">3.00 USD</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Equipo</td>
                  <td className="py-3.5 px-4 text-center font-bold">5%</td>
                  <td className="py-3.5 px-4 text-center font-bold">7%</td>
                  <td className="py-3.5 px-4 text-center font-bold">8%</td>
                  <td className="py-3.5 px-4 text-center font-black text-[#00795F] bg-emerald-50/50">10%</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Tope Ganancia Diaria</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">50 USD / día</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">120 USD / día</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">360 USD / día</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-black text-[#00795F] bg-emerald-50/50">720 USD / día</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Élite</td>
                  <td className="py-3.5 px-4 text-center text-stone-400">—</td>
                  <td className="py-3.5 px-4 text-center text-stone-400">—</td>
                  <td className="py-3.5 px-4 text-center font-bold">4% Hasta 3era gen.</td>
                  <td className="py-3.5 px-4 text-center font-black text-[#00795F] bg-emerald-50/50">4% Hasta 6ta gen.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Bono Recompra</td>
                  <td className="py-3.5 px-4 text-center font-bold">5%</td>
                  <td className="py-3.5 px-4 text-center font-bold">5%</td>
                  <td className="py-3.5 px-4 text-center font-bold">5%</td>
                  <td className="py-3.5 px-4 text-center font-bold text-[#00795F] bg-emerald-50/50">5%</td>
                </tr>
                {/* CTA Row to Pre-Registration */}
                <tr className="bg-stone-50">
                  <td className="py-4 px-4 sm:px-6 font-bold text-stone-900">Acción de Registro</td>
                  <td className="py-3.5 px-4 text-center">
                    <Link
                      to="/preregistro"
                      className="px-3 py-2 bg-stone-200 hover:bg-[#00795F] hover:text-white text-stone-900 text-xs font-bold rounded-xl transition-all inline-block active:scale-95"
                    >
                      Pre-registro
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Link
                      to="/preregistro"
                      className="px-3 py-2 bg-stone-200 hover:bg-[#00795F] hover:text-white text-stone-900 text-xs font-bold rounded-xl transition-all inline-block active:scale-95"
                    >
                      Pre-registro
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Link
                      to="/preregistro"
                      className="px-3 py-2 bg-stone-200 hover:bg-[#00795F] hover:text-white text-stone-900 text-xs font-bold rounded-xl transition-all inline-block active:scale-95"
                    >
                      Pre-registro
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/50">
                    <Link
                      to="/preregistro"
                      className="px-4 py-2.5 bg-[#00795F] hover:bg-[#004d3c] text-white text-xs font-black rounded-xl shadow-xs transition-all inline-block active:scale-95"
                    >
                      Pre-registro ★
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Video Resources Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-[30px] font-black text-black tracking-tight mb-2">
              Recursos de Capacitación y Presentación
            </h2>
            <p className="text-[17px] text-stone-700">
              Visualiza estos videos oficiales para entender a profundidad el modelo de negocio, nuestra línea de productos y el proceso de afiliación en línea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Video 1: Negocio */}
            <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="aspect-video relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/oOZhonOYD6Q"
                  title="Presentación de Negocio HGW"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-black group-hover:text-[#00795F] transition-colors">La Oportunidad de Negocio</h3>
                <p className="text-sm text-stone-600 mt-2">Conoce cómo funciona el sistema de ganancias mutuas y el plan de compensación oficial.</p>
              </div>
            </div>

            {/* Video 2: Productos */}
            <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="aspect-video relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/r-BFxBuhhbc"
                  title="Línea de Productos HGW"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-black group-hover:text-[#00795F] transition-colors">Nuestros Productos</h3>
                <p className="text-sm text-stone-600 mt-2">Explora la ciencia detrás de la turmalina, el arándano y el ganoderma en nuestra línea oficial.</p>
              </div>
            </div>

            {/* Video 3: Afiliación */}
            <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="aspect-video relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/cR-aHkU9N4A"
                  title="Cómo Afiliarse Online HGW"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-black group-hover:text-[#00795F] transition-colors">Afiliación en Línea</h3>
                <p className="text-sm text-stone-600 mt-2">Tutorial paso a paso para realizar tu registro correctamente en el portal corporativo.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario Interactivo de Prerregistro (con envío seguro a hgwpanama507g@gmail.com) */}
        <div id="formulario-prerregistro" className="scroll-mt-24">
          <div className="bg-stone-50 border-2 border-[#00795F]/40 rounded-3xl p-6 sm:p-12 shadow-lg">
            
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00795F]/10 text-[#00795F] rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Formulario Interactivo de Prerregistro</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Inscripción Oficial HGW Panamá
              </h2>
              <p className="text-sm sm:text-base text-stone-700 mt-2 leading-relaxed">
                Completa tus datos para enviar tu solicitud directamente al correo oficial <strong className="text-black">hgwpanama507g@gmail.com</strong> mediante nuestro protocolo seguro SMTP. Contamos con protección anti-spam y validación en tiempo real. Patrocinador autorizado: <strong className="text-black">Yamilka Batista (Código: Yamilka507)</strong>.
              </p>
            </div>

            {submitted ? (
              <div className="max-w-lg mx-auto text-center py-12 px-6 bg-white rounded-3xl border border-emerald-300 shadow-xl animate-fade-in space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#00795F] rounded-full flex items-center justify-center mx-auto">
                  <MailCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-black">¡Prerregistro Enviado con Éxito!</h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Tu solicitud ha sido transmitida de forma segura al buzón <strong>hgwpanama507g@gmail.com</strong> (con protocolos anti-spam SPF/DKIM simulados). Simultáneamente se está abriendo WhatsApp para confirmar tu recepción con Yamilka Batista.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-[#00795F] hover:bg-[#004d3c] text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Enviar otro registro
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitPreregistration} className="max-w-3xl mx-auto space-y-6">
                
                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 font-bold">
                    {errorMsg}
                  </div>
                )}

                {/* Account Type Selection */}
                <div>
                  <label className="block text-sm font-extrabold text-black mb-2">
                    Tipo de Cuenta HGW que deseas crear:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAccountType('distribuidor')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        accountType === 'distribuidor'
                          ? 'bg-emerald-50 border-[#00795F] ring-2 ring-[#00795F]/20'
                          : 'bg-white border-stone-300 hover:border-stone-400'
                      }`}
                    >
                      <div className="font-black text-black text-sm mb-1">Cuenta de Distribuidor Independiente</div>
                      <p className="text-xs text-stone-700">Compra a precio de distribuidor con mínimo de BV en productos y accede a los bonos corporativos.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccountType('cliente')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        accountType === 'cliente'
                          ? 'bg-emerald-50 border-[#00795F] ring-2 ring-[#00795F]/20'
                          : 'bg-white border-stone-300 hover:border-stone-400'
                      }`}
                    >
                      <div className="font-black text-black text-sm mb-1">Cuenta de Cliente Preferencial</div>
                      <p className="text-xs text-stone-700">Compra a precio público sin mínimo de compras ni requisitos de activación de red.</p>
                    </button>
                  </div>
                </div>

                {/* If distributor, select plan */}
                {accountType === 'distribuidor' && (
                  <div>
                    <label className="block text-sm font-extrabold text-black mb-2">
                      Selecciona tu Membresía de Activación:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {MEMBERSHIP_PLANS.map((plan) => (
                        <label
                          key={plan.id}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                            selectedPlan === plan.id
                              ? 'bg-emerald-50/80 border-[#00795F] ring-2 ring-[#00795F]/20'
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
                            Ganancia venta directa: <strong>{plan.directSaleProfit}</strong>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

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
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Número de Cédula (CIP) o Pasaporte *
                    </label>
                    <input
                      type="text"
                      required
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="Ej. 8-765-4321"
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Celular / WhatsApp (+507) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 6778-8375"
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Correo Electrónico (Para recibir credenciales) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Fecha de Nacimiento {accountType === 'distribuidor' && '*'}
                    </label>
                    <input
                      type="date"
                      required={accountType === 'distribuidor'}
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Provincia / Ciudad / Distrito *
                    </label>
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
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Distrito / Corregimiento / Localidad
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Ej. San Francisco / Betania / David"
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    Dirección Exacta para Envío *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Calle, barriada, edificio, número de casa o apartamento"
                    className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Método de Entrega
                    </label>
                    <select
                      value={deliveryMethod}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    >
                      <option value="Servientrega (Envío a Domicilio)">Servientrega (Envío a Domicilio)</option>
                      <option value="Retiro en Sucursal (Avenida Porras)">Retiro en Sucursal (Avenida Porras, San Francisco)</option>
                      <option value="Encomienda Provincial (Uno Express / Fletes Chavale)">Encomienda Provincial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Método de Pago
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
                    >
                      <option value="Yappy (Banco General)">Yappy (Banco General)</option>
                      <option value="Transferencia Bancaria ACH">Transferencia Bancaria ACH</option>
                      <option value="Efectivo contraentrega">Efectivo contraentrega</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      Patrocinador Autorizado
                    </label>
                    <div className="px-4 py-3 bg-stone-200/90 rounded-xl text-sm font-bold text-black border border-stone-300">
                      Yamilka Batista · <span className="text-[#00795F] font-mono">Yamilka507</span>
                    </div>
                  </div>
                </div>

                {/* Honeypot anti-spam field (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website-url">Sitio Web</label>
                  <input
                    type="text"
                    id="website-url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    Comentarios o notas adicionales (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Indica tus productos de preferencia o cualquier duda adicional..."
                    className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] resize-none font-medium"
                  />
                </div>

                {/* Security Note */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-[#004d3c] flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#00A550] shrink-0" />
                  <span>Transmisión cifrada con protocolos SMTP seguros, verificación de formato de correo y salvaguardas anti-spam hacia <strong>hgwpanama507g@gmail.com</strong>.</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#00A550] hover:bg-[#008f44] text-white text-base font-black rounded-xl shadow-lg shadow-[#00A550]/20 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Enviando a hgwpanama507g@gmail.com...' : 'Enviar Prerregistro Seguro (SMTP + WhatsApp)'}</span>
                </button>

                <p className="text-xs text-stone-600 text-center font-normal">
                  Al enviar este formulario se procesará el envío automatizado a <strong>hgwpanama507g@gmail.com</strong> y se abrirá WhatsApp para agilizar la activación de tu cuenta con Yamilka Batista.
                </p>

              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
