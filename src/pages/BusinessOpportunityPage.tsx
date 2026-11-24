import React from 'react';
import { TrendingUp, DollarSign, ShieldCheck, Phone, Sparkles, Package, ShieldAlert, ExternalLink, Play } from 'lucide-react';
import { Link } from '../router';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';
import { LazyYouTubeEmbed } from '../components/LazyYouTubeEmbed';
import { AFFILIATION_CONFIG } from '../config/affiliation';

export const BusinessOpportunityPage: React.FC = () => {
  const registrationUrl = AFFILIATION_CONFIG.affiliateUrl;


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
                href={AFFILIATION_CONFIG.contactSectionUrl}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Información y Contacto</span>
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
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Inversión (Costo)</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">B/. 98.00</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">B/. 180.00</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">B/. 540.00</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-extrabold text-[#00795F] bg-emerald-50/50">B/. 1040.00</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Cantidad de Productos</td>
                  <td className="py-3.5 px-4 text-center font-bold">6 productos</td>
                  <td className="py-3.5 px-4 text-center font-bold">19 productos</td>
                  <td className="py-3.5 px-4 text-center font-bold">47 productos</td>
                  <td className="py-3.5 px-4 text-center font-black text-[#00795F] bg-emerald-50/50">115 productos</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Selección de Productos</td>
                  <td className="py-3.5 px-4 text-center" colSpan={4}>
                    <span className="text-[#00795F] font-bold">La cantidad de productos y los costos en dólares pueden variar porque usted puede escoger los productos de su preferencia.</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">Descuento / Activación</td>
                  <td className="py-3.5 px-4 text-center font-bold">30%</td>
                  <td className="py-3.5 px-4 text-center font-bold">30%</td>
                  <td className="py-3.5 px-4 text-center font-bold">30%</td>
                  <td className="py-3.5 px-4 text-center font-black text-emerald-800 bg-emerald-50/50">
                    30% activación y 52% descuento en recompras
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
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">50 USD</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">120 USD</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-bold">360 USD</td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-black text-[#00795F] bg-emerald-50/50">720 USD</td>
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
                <LazyYouTubeEmbed
                  videoId="oOZhonOYD6Q"
                  title="Presentación de Negocio HGW"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-black group-hover:text-[#00795F] transition-colors">La Oportunidad de Negocio</h3>
                <p className="text-sm text-stone-600 mt-2">Conoce cómo funciona el sistema de ganancias mutuas y el plan de compensación oficial.</p>
              </div>
            </div>

            {/* Video 2: Productos */}
            <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="aspect-video relative">
                <LazyYouTubeEmbed
                  videoId="r-BFxBuhhbc"
                  title="Línea de Productos HGW"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-black group-hover:text-[#00795F] transition-colors">Nuestros Productos</h3>
                <p className="text-sm text-stone-600 mt-2">Explora la ciencia detrás de la turmalina, el arándano y el ganoderma en nuestra línea oficial.</p>
              </div>
            </div>

            {/* Video 3: Afiliación */}
            <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="aspect-video relative">
                <LazyYouTubeEmbed
                  videoId="cR-aHkU9N4A"
                  title="Cómo Afiliarse Online HGW"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-black group-hover:text-[#00795F] transition-colors">Afiliación en Línea</h3>
                <p className="text-sm text-stone-600 mt-2">Tutorial paso a paso para realizar tu registro correctamente en el portal corporativo.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial Video & Official Registration CTA (2-Column CSS Grid) */}
        <div id="formulario-prerregistro" className="scroll-mt-24">
          <div className="bg-stone-50 border border-[#00795F]/25 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Column (First on mobile): Tutorial Video */}
              <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md">
                <div className="px-5 py-3.5 bg-stone-900 text-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#00795F] flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 fill-current text-white" />
                    </span>
                    <span className="font-extrabold text-sm tracking-tight">
                      Tutorial Oficial de Registro HGW
                    </span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 shrink-0">
                    Paso a Paso
                  </span>
                </div>
                <div className="aspect-video w-full bg-black relative">
                  <LazyYouTubeEmbed
                    videoId="Poy4FvvfcfA"
                    title="Tutorial de Registro HGW"
                    className="w-full h-full absolute inset-0"
                  />
                </div>
              </div>

              {/* Right Column (Below video on mobile): Heading, Explanation & CTA Button */}
              <div className="flex flex-col items-start justify-center space-y-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00795F]/10 text-[#00795F] rounded-full text-xs font-black uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Registro Oficial HGW Panamá</span>
                </span>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight bg-gradient-to-r from-[#004d3c] via-[#00795F] to-[#00A550] bg-clip-text text-transparent">
                  ¿Cómo me afilio a HGW?
                </h2>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl w-full">
                  <p className="text-sm font-bold text-black leading-relaxed">
                    {AFFILIATION_CONFIG.primaryNotice}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl w-full space-y-2">
                  <h3 className="text-xs text-black font-bold">
                    ¿Llegaste por tu cuenta y no tienes patrocinador?
                  </h3>
                  <p className="text-xs text-black leading-relaxed">
                    Si no cuentas con una persona que te haya invitado, puedes optar por registrarte a través de mi enlace de distribuidora independiente o comunicarte para orientarte:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00795F] hover:bg-[#004d3c] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Enlace Alternativo de Registro</span>
                    </a>
                    <a
                      href={AFFILIATION_CONFIG.contactSectionUrl}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-black font-bold text-xs rounded-xl border border-slate-300 transition-colors"
                    >
                      <span>Sección de Contacto</span>
                    </a>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed italic border-t border-slate-100 pt-3">
                  {AFFILIATION_CONFIG.independenceDisclaimer}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
