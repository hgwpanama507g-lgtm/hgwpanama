import React from 'react';
import { PRODUCTS } from '../data/products';
import { Link } from '../router';
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  CreditCard, 
  Check, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  Package, 
  Phone, 
  Mail, 
  MapPin, 
  UserCheck, 
  ExternalLink,
  Award,
  Zap,
  PlayCircle,
  AlertCircle
} from 'lucide-react';
import { DISTRIBUTOR_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const ToothpastesLandingPage: React.FC = () => {
  // Only the 3 toothpastes arriving/available in Panama (pasta green excluded per user request)
  const availableToothpastes = PRODUCTS.filter(
    p => p.category === 'cuidado-bucal' && p.id !== 'pasta-herbal-china' && p.slug !== 'green-world-herbs-toothpaste'
  );

  // Specific WhatsApp generator for individual products (Client vs Partner)
  const getProductWhatsappUrl = (productName: string, productSlug: string, mode: 'cliente' | 'socio') => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.hgwpanama.com';
    const pageUrl = `${origin}/producto/${productSlug}`;

    let msg = '';
    if (mode === 'cliente') {
      msg = `¡Hola Yamilka! Me interesa comprar como CLIENTE la pasta dental *${productName}* a precio regular de $8.00 USD. ¿Tienen disponibilidad inmediata para envío por Servientrega y pago por Yappy? (${pageUrl}) Mi nombre es:`;
    } else {
      msg = `¡Hola Yamilka! Me interesa comprar la pasta dental *${productName}* como SOCIO con el 30% de descuento al acumular 50 BV y afiliarme a HGW Panamá. (${pageUrl}) Mi nombre es:`;
    }
    return `https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-[#00795F] rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-4 h-4" /> 100% Sin Flúor ni Triclosán
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight text-center">
            Pastas Dentales HGW <br className="hidden sm:inline" />
            <span className="text-[#00795F]">Cuidado Bucal Avanzado en Panamá</span>
          </h1>
          <p className="text-base sm:text-xl text-stone-600 font-medium max-w-3xl mx-auto leading-relaxed text-center">
            Formuladas con tecnología de probióticos bioactivos, nanoturmalina e ingredientes milenarios de la medicina tradicional china. Limpieza profunda, blanqueamiento natural y protección bucal para toda la familia.
          </p>
        </div>

        {/* Highlights / Service Policies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-stone-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-[#00795F] rounded-2xl shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Costo de Envío</h3>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Hasta <strong className="text-stone-900">$9.00 USD</strong> según distancia (Cobertura a todo Panamá).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-[#00795F] rounded-2xl shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Tiempo de Entrega</h3>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Entre <strong className="text-stone-900">24 a 48 horas</strong> (sin contar fines de semana ni feriados).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-[#00795F] rounded-2xl shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Método de Pago</h3>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Pagos seguros y rápidos por <strong className="text-[#00795F]">Yappy</strong> (Banco General).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-[#00795F] rounded-2xl shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Envíos a Domicilio</h3>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Entregas a domicilio en todo el país por <strong className="text-stone-900">Servientrega</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2 border-b border-stone-200 pb-4">
            <span className="text-xs font-black text-[#00795F] uppercase tracking-wider block">Catálogo Oficial Panamá</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 text-center">Pastas Dentales Disponibles</h2>
            <span className="inline-block text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full uppercase mt-1">
              {availableToothpastes.length} Variedades en Inventario
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {availableToothpastes.map((product) => {
              const bvValue = product.bv || (product.id === 'pasta-probioticos' ? 2.5 : 3.0);
              const clientWhatsapp = getProductWhatsappUrl(product.name, product.slug, 'cliente');
              const partnerWhatsapp = getProductWhatsappUrl(product.name, product.slug, 'socio');

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all group"
                >
                  <div>
                    {/* Top image & badges */}
                    <div className="relative bg-stone-50 p-6 flex items-center justify-center border-b border-stone-100 overflow-hidden">
                      <div className="w-48 h-48 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* BV Badge */}
                      <span className="absolute top-4 right-4 bg-stone-900 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                        ⭐ {bvValue.toFixed(2)} BV
                      </span>

                      {/* Fluoride-free badge */}
                      <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                        Sin Flúor ni Triclosán
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                        {product.code && <span>Cód: {product.code}</span>}
                        <span>Contenido: {product.netContent || '120 gr'}</span>
                      </div>

                      <h3 className="text-xl font-black text-stone-900 leading-snug">
                        <Link to={`/producto/${product.slug}`} className="hover:text-[#00795F] transition-colors">
                          {product.name}
                        </Link>
                      </h3>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Pricing block */}
                      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Precio al Público:</span>
                          <span className="text-3xl font-black text-stone-900">$8.00 <span className="text-xs font-bold text-stone-500">USD</span></span>
                        </div>
                        <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs">
                          <span className="text-stone-600 font-medium">¿Deseas 30% de descuento?</span>
                          <span className="text-[#00795F] font-black">Acumula 50 BV en afiliación</span>
                        </div>
                      </div>

                      {/* Detailed Benefits directly from official Catalog - Size 16px black text */}
                      <div className="space-y-3 pt-3 border-t border-stone-100">
                        <h4 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#00795F]" /> Beneficios del Catálogo Oficial:
                        </h4>
                        <ul className="space-y-3">
                          {product.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                              <span className="text-[16px] text-black leading-relaxed font-normal">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Action Buttons (Cliente vs Socio) */}
                  <div className="p-6 pt-0 space-y-2.5">
                    <a
                      href={clientWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-stone-900 hover:bg-black text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Comprar como Cliente ($8.00)</span>
                    </a>

                    <a
                      href={partnerWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-[#00795F] hover:bg-[#004d3c] text-white text-xs sm:text-sm font-black rounded-xl shadow-md shadow-[#00795F]/20 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Comprar como Socio (30% Descuento)</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TRAINING VIDEOS SECTION */}
        <div id="videos-capacitacion" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-black uppercase tracking-wider">
              <PlayCircle className="w-4 h-4" /> Videos de Capacitación
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 text-center">
              Aprende sobre Nuestras Pastas Dentales
            </h2>
            <p className="text-stone-600 text-sm font-medium text-center">
              Conoce a través de estas capacitaciones los beneficios de la nanoturmalina, ingredientes botánicos y el cuidado bucal avanzado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Video Pasta Blanca */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg flex flex-col justify-between">
              <div>
                <div className="aspect-video w-full bg-black relative">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/ktx3RJ54zgI"
                    title="Capacitación Pasta Dental de Turmalina Versión Blanca HGW"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00795F] bg-emerald-50 px-2 py-0.5 rounded-md">
                    Capacitación Oficial
                  </span>
                  <h3 className="text-base font-black text-stone-900 leading-snug">
                    Pasta Dental de Turmalina – Versión Blanca
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Descubre cómo los péptidos de soja, el xilitol, la menta y la turmalina combaten patógenos orales y eliminan el mal aliento.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a
                  href="https://youtu.be/ktx3RJ54zgI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver en YouTube</span>
                </a>
              </div>
            </div>

            {/* 2. Video Pasta Negra */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg flex flex-col justify-between">
              <div>
                <div className="aspect-video w-full bg-black relative">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/mmWFwGHLdfM"
                    title="Capacitación Pasta Dental de Turmalina Versión Negra HGW"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md">
                    Capacitación Oficial
                  </span>
                  <h3 className="text-base font-black text-stone-900 leading-snug">
                    Pasta Dental de Turmalina – Versión Negra
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Conoce el poder blanqueador suave sin abrasivos agresivos, acción antibacteriana con madreselva y protección de encías.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a
                  href="https://youtu.be/mmWFwGHLdfM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver en YouTube</span>
                </a>
              </div>
            </div>

            {/* 3. Pasta con Probioticos */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg flex flex-col justify-between">
              <div>
                <div className="aspect-video w-full bg-black relative">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/ffYtOh7xwEo"
                    title="Capacitación Pasta Dental con Probióticos HGW"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00795F] bg-emerald-50 px-2 py-0.5 rounded-md">
                    Capacitación Oficial
                  </span>
                  <h3 className="text-base font-black text-stone-900 leading-snug">
                    Pasta Dental con Probióticos
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Aprende cómo la tecnología de probióticos bioactivos restablece el microbioma oral, blanquea y protege las encías.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a
                  href="https://youtu.be/ffYtOh7xwEo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver en YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Prevención y Cuidado Básico */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-lg space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-[#00795F] uppercase tracking-widest block">Hábitos Saludables</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 text-center">Prevención y Cuidado Básico</h2>
            <p className="text-stone-600 text-sm sm:text-base font-medium text-center">
              Recomendaciones esenciales para mantener una salud bucodental óptima todos los días.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-center">
              <div className="text-4xl">🦷</div>
              <h3 className="font-extrabold text-stone-900 text-base">Cepillado Diario</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Cepillar los dientes al menos dos veces al día con pasta dental adecuada.
              </p>
            </div>

            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-center">
              <div className="text-4xl">🧵</div>
              <h3 className="font-extrabold text-stone-900 text-base">Uso de Hilo Dental</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Usar hilo dental a diario para eliminar residuos entre los dientes.
              </p>
            </div>

            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-center">
              <div className="text-4xl">🩺</div>
              <h3 className="font-extrabold text-stone-900 text-base">Visita al Odontólogo</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Visitar al dentista de forma regular (cada 6 a 12 meses) para revisiones y limpiezas profesionales.
              </p>
            </div>
          </div>
        </div>

        {/* How to Order / Shipping Policy Detail */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-lg space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-[#00795F] uppercase tracking-widest block">Información de Entrega y Pago</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 text-center">Envíos a Todo Panamá</h2>
            <p className="text-stone-600 text-sm sm:text-base font-medium text-center">
              Realizamos envíos a domicilio en las 10 provincias y comarcas con la empresa líder de logística.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00795F] font-black flex items-center justify-center mx-auto">1</div>
              <h3 className="font-extrabold text-stone-900 text-base text-center">Costos Transparentes</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-center">
                El costo de envío es de <strong>hasta $9.00 USD según la distancia</strong> de tu localidad en Panamá.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00795F] font-black flex items-center justify-center mx-auto">2</div>
              <h3 className="font-extrabold text-stone-900 text-base text-center">Tiempos de Entrega</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-center">
                Entrega estimada entre <strong>24 a 48 horas hábiles</strong> (sin contar fines de semana ni días feriados).
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00795F] font-black flex items-center justify-center mx-auto">3</div>
              <h3 className="font-extrabold text-stone-900 text-base text-center">Pagos por Yappy</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-center">
                Paga de forma instantánea y confiable con <strong>Yappy (Banco General)</strong> al coordinar tu pedido.
              </p>
            </div>
          </div>
        </div>

        {/* ORAL HEALTH DISCLAIMER */}
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
          <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-black uppercase tracking-wider block text-amber-950 text-xs sm:text-sm">
              Recomendación y Aviso de Salud Bucal:
            </strong>
            <p>
              Nuestras pastas dentales HGW están diseñadas para complementar tu higiene diaria con ingredientes naturales y botánicos, pero recuerda que <strong>no curan ni tratan enfermedades</strong>. Te recomendamos con mucho cariño visitar a tu odontólogo de confianza para tu chequeo y limpieza dental cada 6 meses, asegurando así una sonrisa siempre radiante y saludable.
            </p>
          </div>
        </div>

        {/* AUTHOR / DISTRIBUTOR PROFILE SECTION (Yamilka Batista) - Centered Photo Above Pitch */}
        <div className="bg-gradient-to-br from-emerald-900 via-[#004d3c] to-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A550]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center space-y-8">
            
            {/* Photo & Identity Centered */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-[#00A550] via-emerald-400 to-white shadow-2xl">
                <img
                  src="https://media.academiahgw.online/wp-content/uploads/2026/11/Foto-de-Perfil-Yamilka-Batista-Emprendedora-HGW-2-1024x1024.jpeg"
                  alt="Yamilka Batista - Distribuidora Independiente Autorizada HGW Panamá"
                  className="w-full h-full object-cover rounded-full bg-stone-800"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/Foto-de-Perfil-Yamilka-Batista-Emprendedora-HGW-1-1024x1024.jpeg";
                  }}
                />
                <span className="absolute bottom-2 right-2 bg-[#00A550] text-white p-2 rounded-full shadow-lg border-2 border-emerald-950">
                  <UserCheck className="w-5 h-5" />
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-extrabold text-emerald-300 border border-white/10 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Tu Asesora y Enlace Directo
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white text-center">Yamilka Batista</h3>
                <p className="text-emerald-300 font-bold text-sm mt-0.5 text-center">Distribuidora Independiente Autorizada HGW Panamá</p>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-emerald-200 border border-white/15">
                  <span>Código de Patrocinio:</span>
                  <strong className="text-white font-black">Yamilka507</strong>
                </div>
              </div>
            </div>

            {/* Pitch Elevator & Content Centered */}
            <div className="space-y-6 w-full">
              <div className="space-y-3">
                <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug text-center">
                  Ayudando a las familias a sonreír con productos más sanos, puros y naturales.
                </h4>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-normal text-center max-w-2xl mx-auto">
                  ¡Hola! Soy Yamilka Batista. Mi pasión y propósito es ayudarte a ti y a tu familia a cuidar la sonrisa de la manera más saludable y consciente posible. Muchas personas no conocen la cantidad de químicos agresivos presentes en los dentífricos convencionales; por eso, me dedico a orientarte y facilitarte alternativas verdaderamente beneficiosas: pastas dentales innovadoras, <strong>100% libres de flúor y libres de triclosán</strong>, enriquecidas con probióticos bioactivos y nanoturmalina. Mi compromiso es brindarte una atención cercana, honesta y personalizada para que protejas tus encías, mantengas un aliento fresco duradero y disfrutes de una salud bucal plena todos los días.
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola Yamilka! Vi tu perfil en la landing de pastas dentales HGW Panamá y deseo consultarte. Mi nombre es:')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl transition-all group flex flex-col items-center text-center space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
                  </div>
                  <strong className="text-white text-base font-black group-hover:text-emerald-300 transition-colors">
                    +507 6778-8375
                  </strong>
                  <span className="text-[11px] text-emerald-200">Chat directo inmediato</span>
                </a>

                {/* Email */}
                <div className="p-4 bg-white/10 border border-white/15 rounded-2xl flex flex-col items-center text-center space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Correo</span>
                  </div>
                  <strong className="text-white text-xs sm:text-sm font-bold truncate select-all">
                    hgwpanama507g@gmail.com
                  </strong>
                  <span className="text-[11px] text-emerald-200">Atención y consultas</span>
                </div>

                {/* Location */}
                <div className="p-4 bg-white/10 border border-white/15 rounded-2xl flex flex-col items-center text-center space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Ubicación</span>
                  </div>
                  <strong className="text-white text-sm font-black">
                    Ciudad de Panamá
                  </strong>
                  <span className="text-[11px] text-emerald-200">Envíos a todo Panamá</span>
                </div>
              </div>

              {/* Action Link to Official Affiliate Registration */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://www.healthgreenworld.com/?userName=Yamilka507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-emerald-50 text-stone-900 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg uppercase tracking-wider"
                >
                  <span>Afiliarse en Portal Oficial HGW</span>
                  <ExternalLink className="w-4 h-4 text-[#00795F]" />
                </a>

                <span className="text-xs text-emerald-300 font-medium text-center">
                  Patrocinador oficial autorizado: <strong>Yamilka507</strong>
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
