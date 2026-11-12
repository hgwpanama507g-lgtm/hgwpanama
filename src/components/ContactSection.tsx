import React, { useState } from 'react';
import { Phone, Mail, Clock, CheckCircle2, Send, FileText, ArrowRight, MapPin, ShieldAlert } from 'lucide-react';
import { Link } from '../router';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Consulta de Productos');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://hgwpanama.com';
    let text = '';
    
    if (topic === 'Afiliación y Membresías') {
      text = `¡Hola! Estaba visitando tu tienda online (${currentUrl}) y quería preguntar sobre cómo afiliarse a HGW Panamá. Mi nombre es: ${name.trim() || ''}`;
      if (message.trim()) text += `\nDetalles: ${message.trim()}`;
    } else {
      text = `¡Hola! Estaba visitando tu tienda online (${currentUrl})\n`;
      if (name.trim()) text += `👤 Nombre: ${name.trim()}\n`;
      text += `📌 Asunto: ${topic}\n`;
      if (message.trim()) text += `💬 Mensaje: ${message.trim()}\n`;
    }

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/50767788375?text=${encoded}`, '_blank');
  };

  return (
    <section id="contacto" className="py-12 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00795F] uppercase tracking-wider mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A550]" />
                <span>Atención Personalizada en Panamá</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                Contáctanos en Panamá
              </h2>
              <p className="text-[17px] text-stone-800 mt-2 leading-relaxed font-normal">
                Estamos a tu disposición para asesorarte sobre cualquier producto, confirmar existencias, coordinar entregas o guiarte en tu proceso de afiliación y prerregistro.
              </p>
            </div>

            {/* Differentiated Attention Notice for Registered Partners */}
            <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-2xl text-xs space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Aclaración Importante sobre Canales de Atención</span>
              </div>
              <p className="text-[17px] text-stone-800 leading-relaxed font-normal">
                El número de WhatsApp <strong className="text-black">+507 6778-8375</strong> corresponde a un <strong>Distribuidor Independiente</strong> para atender consultas comerciales, pedidos y nuevos afiliados. <em>No es un número oficial corporativo de la empresa HGW.</em>
              </p>
              <div className="pt-2 border-t border-amber-200 text-stone-900">
                <strong className="text-black">¿Ya eres socio registrado de HGW?</strong> Si ya cuentas con un código de socio en HGW, debes comunicarte directamente con tu <strong>patrocinador</strong> o llamar al teléfono oficial de las oficinas principales: <strong className="text-[#00795F] font-extrabold">+507 392-8415</strong> para asistencia sobre tus órdenes o trámites corporativos.
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Main Office Address */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00795F]/15 flex items-center justify-center text-[#00795F] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Oficinas Principales en Panamá</h3>
                  <p className="text-sm sm:text-base font-bold text-black mt-0.5 leading-snug">
                    Avenida Porras, Plaza Royal Blue, Local No. 6
                  </p>
                  <p className="text-xs text-stone-600 mt-1">
                    Provincia de PANAMÁ, Corregimiento de San Francisco.
                  </p>
                  <p className="text-xs font-bold text-[#00795F] mt-1.5 flex items-center gap-2">
                    <span>Teléfono Oficina Principal: <strong>+507 392-8415</strong></span>
                  </p>
                </div>
              </div>

              {/* WhatsApp Item */}
              <a
                href={getAffiliationWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-stone-50 hover:bg-emerald-50/70 rounded-2xl border border-stone-200 hover:border-[#00795F] transition-all flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00A550]/15 flex items-center justify-center text-[#00A550] group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">WhatsApp Distribuidor Independiente</h3>
                  <p className="text-lg font-black text-black group-hover:text-[#00795F] transition-colors tabular-nums">
                    +507 6778-8375
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">Atención directa para cotizaciones, ventas y nuevas afiliaciones</p>
                </div>
              </a>

              {/* Email Item */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00795F]/10 flex items-center justify-center text-[#00795F] shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Correo Electrónico</h3>
                  <p className="text-base font-bold text-black select-all">
                    hgwpanama507g@gmail.com
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">Buzón directo para pre-registros y atención oficial</p>
                </div>
              </div>

              {/* Hours */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-200/80 flex items-center justify-center text-stone-800 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Horarios de Atención</h3>
                  <p className="text-xs sm:text-sm font-bold text-black leading-snug">
                    Lunes a Viernes: 09:00 am a 06:00 pm<br />
                    Sábados: 09:00 am a 01:00 pm<br />
                    <span className="text-stone-500 font-normal">Domingos y Festivos: Cerrado</span>
                  </p>
                  <p className="text-xs text-[#00795F] font-bold mt-1">Envíos a todo el país vía Servientrega</p>
                </div>
              </div>

            </div>

            {/* Quick banner linking to Dedicated Preregistration Page */}
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00795F] uppercase">
                  <FileText className="w-4 h-4" />
                  <span>¿Deseas emprender con nosotros?</span>
                </div>
                <p className="text-sm font-black text-black">
                  Llena el formulario oficial de pre-registro
                </p>
              </div>
              <Link
                to="/preregistro"
                className="px-4 py-2.5 bg-[#00795F] hover:bg-[#004d3c] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap active:scale-95"
              >
                <span>Pre-registro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 bg-stone-100 border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-800 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00A550] shrink-0" />
              <span>Garantía de productos 100% auténticos suministrados por distribuidores autorizados de HGW en Panamá.</span>
            </div>

          </div>

          {/* Right Column: Form sending directly to WhatsApp */}
          <div className="lg:col-span-7 bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-sm">
            <h3 className="text-2xl font-black text-black mb-1">
              Envíanos un mensaje directo
            </h3>
            <p className="text-[17px] text-stone-700 mb-6 font-normal">
              Escribe tus datos y tu consulta. Al enviar se abrirá WhatsApp con tu mensaje redactado listo para enviar.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Carlos Rodríguez"
                  className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                  Motivo de la consulta *
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] transition-all font-medium"
                >
                  <option value="Consulta de Productos">Consulta sobre productos específicos</option>
                  <option value="Hacer un Pedido">Hacer un pedido y coordinar entrega</option>
                  <option value="Afiliación y Membresías">Afiliarme como socio distribuidor</option>
                  <option value="Envíos al Interior">Consultar envíos a provincias</option>
                  <option value="Otro">Otro motivo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                  Mensaje o detalle de tu consulta *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe aquí tu duda, producto que te interesa o tu ubicación en Panamá..."
                  className="w-full px-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] transition-all resize-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 text-base font-black text-white bg-[#00A550] hover:bg-[#008f44] rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#00A550]/20 active:scale-95 transition-all text-center"
              >
                <Send className="w-5 h-5" />
                <span>Enviar mensaje por WhatsApp</span>
              </button>

              <p className="text-xs text-stone-500 text-center">
                Respuesta en minutos en horario de atención. Al enviar serás redirigido a la aplicación oficial de WhatsApp.
              </p>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

