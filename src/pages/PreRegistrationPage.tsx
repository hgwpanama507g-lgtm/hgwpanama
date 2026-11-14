import React from 'react';
import { ShieldCheck, Play, Send, ExternalLink, Phone, Building2, Clock } from 'lucide-react';
import { Link } from '../router';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

export const PreRegistrationPage: React.FC = () => {
  const registrationUrl = "https://www.healthgreenworld.com/?userName=Yamilka507";
  const whatsappUrl = getAffiliationWhatsAppUrl();

  return (
    <div className="py-8 sm:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 mb-6">
          <Link to="/inicio" className="hover:text-[#00795F] transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-black font-bold">Pre-registro y Activación</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-md mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-[#00795F] text-xs font-black uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-[#00A550]" />
            <span>Guía de Registro Oficial HGW Panamá</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight mb-4">
            Video Tutorial de Registro
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Sigue los pasos del video tutorial para completar tu registro oficial en el sistema de HGW, y una vez finalices, contáctanos por WhatsApp para activar tu cuenta y coordinar tu paquete de bienvenida.
          </p>
        </div>

        {/* Video Tutorial Section */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-300 shadow-xl mb-10">
          <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00795F] flex items-center justify-center text-white font-black">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg">Tutorial Oficial de Afiliación HGW</h3>
                <p className="text-stone-400 text-xs">Paso a paso para nuevos distribuidores y clientes</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-red-600/90 text-white text-xs font-black rounded-lg uppercase tracking-wider">
              YouTube Video
            </span>
          </div>

          <div className="aspect-video w-full bg-black relative">
            <iframe
              src="https://www.youtube.com/embed/Poy4FvvfcfA"
              title="Tutorial de Registro HGW"
              className="w-full h-full absolute inset-0 border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Action Buttons: Registration & WhatsApp */}
        <div className="bg-gradient-to-br from-emerald-50 via-white to-stone-50 rounded-[2.5rem] p-8 sm:p-12 border border-emerald-100 shadow-xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="text-stone-700 text-base max-w-xl mx-auto font-medium">
            Haz clic en el botón de registro oficial para crear tu cuenta con el patrocinador autorizado Yamilka507, y luego infórmanos por WhatsApp para recibir tu asesoría personalizada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 bg-[#00795F] hover:bg-[#004d3c] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#00795F]/20 flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-wider"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Ir al Registro Oficial HGW</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-wider"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>Informar Registro por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Office & Hours Info Footer Card */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#00795F]/10 flex items-center justify-center text-[#00795F] shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-black text-sm uppercase tracking-tight mb-1">Oficina HGW Panamá</h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Avenida Porras, Plaza Royal Blue, Local No. 6, San Francisco, Panamá.
              </p>
              <p className="text-stone-500 text-xs font-bold mt-1">Tel: +507 392-8415</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 flex items-start gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#00A550]/15 flex items-center justify-center text-[#00A550] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-black text-sm uppercase tracking-tight mb-1">Horario de Atención</h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Lunes a Viernes: 09:00 am - 06:00 pm | Sábados: 09:00 am - 01:00 pm.
              </p>
              <p className="text-stone-500 text-xs font-bold mt-1">Domingos y Feriados: Cerrado</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
