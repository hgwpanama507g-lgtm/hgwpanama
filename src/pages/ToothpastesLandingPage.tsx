import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Check,
  Sparkles,
  ExternalLink,
  MessageCircle,
  BookOpen,
  FileText,
  ShieldCheck,
  Truck,
  Clock,
  CreditCard,
  Award,
  Zap,
  Leaf,
  Droplets,
  HeartHandshake,
  AlertCircle,
} from 'lucide-react';
import { PRODUCTS, CERTIFICATIONS, MEMBERSHIP_PLANS } from '../data/products';
import { DIRECT_SALES_ASSOCIATIONS } from '../components/AboutHGW';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactSection } from '../components/ContactSection';
import { ShippingAndReturnsSection } from '../components/ShippingAndReturnsSection';
import { Link } from '../router';
import { DISTRIBUTOR_WHATSAPP_NUMBER, getAffiliationWhatsAppUrl } from '../utils/whatsapp';
import { renderWithHGWLinks } from '../utils/hgwLinker';

const DENTAL_SERVICES = [
  {
    id: 1,
    title: '100% Libres de Flúor y Triclosán',
    detail:
      'Fórmulas naturales diseñadas para el cuidado bucal diario de toda la familia, sin ingredientes agresivos ni abrasivos químicos.',
    bullets: [
      'Con probióticos bioactivos, nanoturmalina, xilitol y extractos botánicos.',
      'Limpieza profunda, aliento fresco duradero y protección suave de encías.',
    ],
    ctaLabel: 'Ver Pastas Disponibles',
    ctaHref: '#productos-pastas',
  },
  {
    id: 2,
    title: 'Envíos a Domicilio en Todo Panamá',
    detail:
      'Entregas confiables a domicilio en las 10 provincias y comarcas mediante Servientrega o encomienda provincial.',
    bullets: [
      'Costo de envío desde USD 5.00 hasta USD 9.00 según distancia.',
      'Tiempo estimado de entrega entre 24 y 48 horas hábiles.',
    ],
    ctaLabel: 'Política de Envíos',
    ctaTo: '/envios-y-devoluciones',
  },
  {
    id: 3,
    title: 'Pago Seguro y Rápido por Yappy',
    detail:
      'Coordinación directa por WhatsApp (+507 6778-8375) con opciones de pago cómodas y verificación inmediata.',
    bullets: [
      'Pagos instantáneos mediante Yappy (Banco General) o transferencia ACH.',
      'Asesoría personalizada para elegir la variedad ideal según tu necesidad.',
    ],
    ctaLabel: 'Consultar por WhatsApp',
    ctaHref: 'whatsapp',
  },
  {
    id: 4,
    title: 'Precio Cliente ($8.00) o Socio (30% a 52% Descuento)',
    detail:
      'Puedes adquirir tus pastas dentales como cliente al por menor o activarte con membresía para obtener precios de distribuidor.',
    bullets: [
      'Precio regular al público: $8.00 USD cada unidad (120 gr).',
      'Al acumular 50 BV en afiliación inicial accedes al 30% de descuento inmediato.',
    ],
    ctaLabel: 'Ver Membresías HGW',
    ctaTo: '/membresias',
  },
];

const DENTAL_HIGHLIGHTS_EIGHT = [
  { name: '100% Sin Flúor', Icon: ShieldCheck },
  { name: 'Sin Triclosán', Icon: Sparkles },
  { name: 'Probióticos Bioactivos', Icon: Droplets },
  { name: 'Nanoturmalina', Icon: Zap },
  { name: 'Extractos Herbales', Icon: Leaf },
  { name: 'Envío Servientrega', Icon: Truck },
  { name: '24 a 48 Horas', Icon: Clock },
  { name: 'Pago por Yappy', Icon: CreditCard },
];

const DENTAL_TRAINING_VIDEOS = [
  {
    id: 'ktx3RJ54zgI',
    title: 'Pasta Dental de Turmalina – Versión Blanca',
    description:
      'Descubre cómo los péptidos de soja, el xilitol, la menta y la turmalina combaten patógenos orales y eliminan el mal aliento.',
    url: 'https://youtu.be/ktx3RJ54zgI',
  },
  {
    id: 'mmWFwGHLdfM',
    title: 'Pasta Dental de Turmalina – Versión Negra',
    description:
      'Conoce el poder blanqueador suave sin abrasivos agresivos, acción antibacteriana con madreselva y protección de encías.',
    url: 'https://youtu.be/mmWFwGHLdfM',
  },
  {
    id: 'ffYtOh7xwEo',
    title: 'Pasta Dental con Probióticos HGW',
    description:
      'Aprende cómo la tecnología de probióticos bioactivos restablece el microbioma oral, blanquea naturalmente y protege las encías.',
    url: 'https://youtu.be/ffYtOh7xwEo',
  },
];

const DENTAL_GUIDES = [
  {
    title: 'Cepillado Diario Consciente',
    excerpt:
      'Cepilla tus dientes al menos dos veces al día con pasta dental sin flúor ni triclosán para cuidar el esmalte y las encías.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta-dental-con-probioticos-HGW.jpg',
    to: '/producto/pasta-dental-con-probioticos',
  },
  {
    title: 'Turmalina Bioenergética Bucal',
    excerpt:
      'Conoce cómo los minerales de nanoturmalina y extractos botánicos promueven frescura prolongada y bienestar oral.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/21._OLIVE_SOAP_TOURMALINE_SOAP-1024x576.png',
    to: '/informacion#turmalina',
  },
  {
    title: 'Ficha Técnica Oficial en PDF',
    excerpt:
      'Descarga y revisa la guía educativa oficial de nuestra línea de cuidado bucal con ingredientes, modo de uso y respaldo.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/34._SERIE_SMILIFE_BLUEBERRY-1024x576.png',
    to: '/documentos/pasta-dental-de-turmalina',
  },
  {
    title: 'Hilo Dental y Revisión Odontológica',
    excerpt:
      'Complementa el cepillado con uso diario de hilo dental y visita a tu odontólogo cada 6 a 12 meses para chequeo preventivo.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/Banner-Productos-HGW-1024x682.jpg',
    to: '/envios-y-devoluciones',
  },
];

const DENTAL_FAQS = [
  {
    question: '¿Las pastas dentales HGW contienen flúor o triclosán?',
    answer:
      'No. Todas nuestras pastas dentales HGW disponibles en Panamá (Probióticos, Turmalina Blanca y Turmalina Negra) son 100% libres de flúor y libres de triclosán, formuladas con ingredientes naturales y botánicos.',
  },
  {
    question: '¿Cuál es el precio y cómo puedo comprar en Panamá?',
    answer:
      'El precio regular al público es de $8.00 USD por unidad (120 gr). Puedes hacer clic en "Comprar como Cliente ($8.00)" en cualquiera de las 3 variedades para coordinar tu entrega por WhatsApp al +507 6778-8375.',
  },
  {
    question: '¿Cuánto cuesta el envío y cuánto tarda en llegar?',
    answer:
      'Realizamos envíos a domicilio en todo Panamá vía Servientrega desde $5.00 hasta $9.00 USD según la distancia, con tiempo estimado de entrega de 24 a 48 horas hábiles (sin contar fines de semana ni feriados).',
  },
  {
    question: '¿Cómo obtengo el 30% de descuento como socio?',
    answer:
      'Al afiliarte con nuestro patrocinio autorizado en Panamá (código Yamilka507) acumulando 50 BV en adelante en tu primera compra, obtienes automáticamente descuentos de distribuidor de 30% hasta 52% según tu paquete.',
  },
];

export const ToothpastesLandingPage: React.FC = () => {
  // Todos los acordeones cerrados inicialmente
  const [activeServiceIdx, setActiveServiceIdx] = useState<number | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Only the 3 toothpastes available in Panama
  const availableToothpastes = PRODUCTS.filter(
    (p) =>
      p.category === 'cuidado-bucal' &&
      p.id !== 'pasta-herbal-china' &&
      p.slug !== 'green-world-herbs-toothpaste'
  );

  // Paquetes de membresía con Master de último (Junior, Senior, Master)
  const juniorPlan = MEMBERSHIP_PLANS.find((m) => m.id === 'junior') || MEMBERSHIP_PLANS[1];
  const seniorPlan = MEMBERSHIP_PLANS.find((m) => m.id === 'senior') || MEMBERSHIP_PLANS[2];
  const masterPlan = MEMBERSHIP_PLANS.find((m) => m.id === 'master') || MEMBERSHIP_PLANS[3];
  const showcasePackages = [
    { ...juniorPlan, isHighlighted: false },
    { ...seniorPlan, isHighlighted: false },
    { ...masterPlan, isHighlighted: true },
  ];

  const registrationUrl = 'https://www.healthgreenworld.com/?userName=Yamilka507';
  const whatsappUrl = getAffiliationWhatsAppUrl();

  const getProductWhatsappUrl = (
    productName: string,
    productSlug: string,
    mode: 'cliente' | 'socio'
  ) => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://www.hgwpanama.com';
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
    <div className="bg-white text-black">
      {/* =================================================================
          (2) BANNER A TODO EL ANCHO CON IMAGEN 21:7
          ================================================================= */}
      <section aria-label="Banner principal Pastas Dentales HGW Panamá" className="w-full bg-[#4472C4]">
        <div className="relative w-full aspect-[21/7] min-h-[180px] sm:min-h-[240px] overflow-hidden">
          <img
            src="https://media.academiahgw.online/wp-content/uploads/2026/11/34._SERIE_SMILIFE_BLUEBERRY-1024x576.png"
            alt="Pastas Dentales Naturales Sin Flúor ni Triclosán HGW Panamá"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://media.academiahgw.online/wp-content/uploads/2026/11/Banner-Productos-HGW-1024x682.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#23437D]/85 via-[#4472C4]/70 to-[#23437D]/80 flex items-center justify-center px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-blue-100 mb-1.5">
                100% Sin Flúor ni Triclosán · Cuidado Bucal en Panamá
              </p>
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
                Pastas Dentales HGW · Panamá
              </h2>
              <p className="hidden sm:block text-sm md:text-base text-blue-50 font-medium mt-2 max-w-2xl mx-auto">
                Probióticos bioactivos, nanoturmalina e ingredientes herbales para una sonrisa más sana y fresca todos los días
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          (3) HERO EN 2 COLUMNAS
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex flex-col items-center text-center space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-black tracking-tight leading-tight text-balance">
                  Pastas Dentales HGW{' '}
                  <span className="text-[#4472C4]">Cuidado Bucal Avanzado en Panamá</span>
                </h1>

                <p className="text-base sm:text-[17px] text-black leading-relaxed max-w-xl font-normal">
                  Formuladas con tecnología de probióticos bioactivos, nanoturmalina e ingredientes milenarios de la medicina tradicional china. Limpieza profunda, blanqueamiento natural y protección bucal 100% libre de flúor y triclosán para toda la familia.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                  <a
                    href="#productos-pastas"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#4472C4] hover:bg-[#33599E] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#4472C4]/25 hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <span>Ver Pastas Dentales ($8.00 USD)</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="w-full">
                <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-[#EEF3FB] border border-slate-200 shadow-xl group">
                  <img
                    src="https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta-dental-con-probioticos-HGW.jpg"
                    alt="Línea de Pastas Dentales HGW Panamá"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp';
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (4) BENEFICIOS Y SERVICIOS + 8 DESTACADOS EN GRID 2 COLS MÓVIL
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Beneficios, Envíos y Formas de Compra
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Todo lo que necesitas saber sobre calidad, pagos con Yappy y entregas en todo Panamá.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/ffYtOh7xwEo"
                  title="Capacitación Pasta Dental con Probióticos HGW"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="space-y-4">
                {DENTAL_SERVICES.map((srv, idx) => {
                  const isSelected = activeServiceIdx === idx;
                  return (
                    <div
                      key={srv.id}
                      className={`rounded-2xl transition-all duration-200 overflow-hidden shadow-sm border ${
                        isSelected
                          ? 'bg-white border-[#4472C4] shadow-md ring-2 ring-[#4472C4]/25'
                          : 'bg-[#4472C4] border-[#4472C4]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveServiceIdx(isSelected ? null : idx)}
                        className={`w-full px-4 sm:px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#33599E] text-white'
                            : 'bg-[#4472C4] hover:bg-[#33599E] text-white'
                        }`}
                        aria-expanded={isSelected}
                      >
                        <span className="font-bold text-sm sm:text-base tracking-wide">
                          {srv.title}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                            isSelected ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isSelected && (
                        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-white text-black border-t border-slate-200 space-y-3">
                          <p className="text-[17px] leading-relaxed text-black break-words">
                            {srv.detail}
                          </p>
                          <ul className="space-y-2 text-[17px] leading-relaxed text-black">
                            {srv.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5 break-words">
                                <span className="text-[#4472C4] font-black leading-relaxed shrink-0">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          {srv.ctaHref === 'whatsapp' ? (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4472C4] underline underline-offset-4 hover:text-[#33599E] pt-1"
                            >
                              <span>{srv.ctaLabel}</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          ) : srv.ctaHref?.startsWith('#') ? (
                            <a
                              href={srv.ctaHref}
                              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4472C4] underline underline-offset-4 hover:text-[#33599E] pt-1"
                            >
                              <span>{srv.ctaLabel}</span>
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          ) : (
                            <Link
                              to={srv.ctaTo || '/productos'}
                              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4472C4] underline underline-offset-4 hover:text-[#33599E] pt-1"
                            >
                              <span>{srv.ctaLabel}</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 8 Destacados de la Línea Bucal (Grid 2 columnas móvil, 4 tablet/escritorio) */}
            <div className="mt-12 sm:mt-14 pt-10 border-t border-slate-200/80">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                  Ventajas de Nuestra Línea Bucal y Servicio
                </h3>
                <p className="text-sm sm:text-base text-black mt-1.5 font-normal">
                  Ingredientes naturales avanzados con entrega rápida y segura en Panamá.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {DENTAL_HIGHLIGHTS_EIGHT.map(({ name, Icon }) => (
                  <a
                    key={name}
                    href="#productos-pastas"
                    className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#4472C4]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center group"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EEF3FB] text-[#4472C4] group-hover:bg-[#4472C4] group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-300 shadow-2xs">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold text-black group-hover:text-[#4472C4] transition-colors leading-snug">
                      {name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (5) 3 VARIEDADES EN IMAGEN CIRCULAR 250x250
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                3 Variedades Disponibles en Panamá
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Cada presentación aporta 120 gr de cuidado bucal avanzado 100% libre de flúor y triclosán.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {availableToothpastes.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center text-center group"
                >
                  <Link
                    to={`/producto/${product.slug}`}
                    className="w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] rounded-full overflow-hidden border-4 border-[#EEF3FB] shadow-lg bg-[#F8FAFC] p-4 flex items-center justify-center mb-6 group-hover:border-[#4472C4] group-hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <h3 className="text-xl font-extrabold text-black mb-2.5">
                    {product.name}
                  </h3>
                  <p className="text-sm sm:text-base text-black leading-relaxed max-w-xs font-normal">
                    {product.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (6) CERTIFICACIONES Y RECONOCIMIENTOS (Grid 4 escritorio, 2 tablet, 2 móviles)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Certificaciones y Reconocimientos
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Todas las certificaciones internacionales de calidad, inocuidad y manufactura, junto con las asociaciones de venta directa que respaldan a HGW.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 mb-14">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="aspect-[3/2] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-100 p-2 sm:p-3 flex items-center justify-center mb-3 sm:mb-4">
                    <img
                      src={cert.imageUrl}
                      alt={cert.name}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png';
                      }}
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg font-extrabold text-black mb-1 sm:mb-1.5 leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-black leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                Asociaciones y Reconocimientos de Venta Directa
              </h3>
              <p className="text-xs sm:text-sm text-black mt-1.5 font-normal">
                Respaldo gremial e institucional en Panamá, Latinoamérica y el mundo.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {DIRECT_SALES_ASSOCIATIONS.map((assoc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="aspect-[3/2] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-100 p-2.5 sm:p-4 flex items-center justify-center mb-3 sm:mb-4">
                    <img
                      src={assoc.imageUrl}
                      alt={assoc.name}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png';
                      }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#4472C4] mb-1">
                    {assoc.country}
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-black mb-1 sm:mb-1.5 leading-snug">
                    {assoc.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-black leading-relaxed font-normal">
                    {assoc.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (7) VIDEOS DE CAPACITACIÓN (Aprende sobre Nuestras Pastas Dentales)
          ================================================================= */}
      <section id="videos-capacitacion" className="scroll-mt-24 py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Aprende sobre Nuestras Pastas Dentales
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Conoce a través de estas capacitaciones los beneficios de la nanoturmalina, probióticos bioactivos e ingredientes botánicos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {DENTAL_TRAINING_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="bg-[#F8FAFC] rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-center"
                >
                  <div>
                    <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner mb-5 border border-slate-200">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                        title={video.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <h3 className="text-lg font-extrabold text-black mb-2 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-black leading-relaxed font-normal mb-4">
                      {video.description}
                    </p>
                  </div>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-white hover:bg-[#EEF3FB] text-[#4472C4] border border-[#4472C4]/30 text-xs font-bold rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver en YouTube</span>
                  </a>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (8) PRODUCTOS (Catálogo Oficial de Pastas Dentales con precios y botones Cliente/Socio)
          ================================================================= */}
      <section
        id="productos-pastas"
        className="scroll-mt-24 py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Pastas Dentales Disponibles en Panamá
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                {availableToothpastes.length} variedades en inventario oficial · Precio al público $8.00 USD o 30% de descuento como socio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {availableToothpastes.map((product) => {
                const bvValue = product.bv || (product.id === 'pasta-probioticos' ? 2.5 : 3.0);
                const clientWhatsapp = getProductWhatsappUrl(product.name, product.slug, 'cliente');
                const partnerWhatsapp = getProductWhatsappUrl(product.name, product.slug, 'socio');

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-square w-full rounded-2xl bg-[#F8FAFC] border border-slate-100 p-5 flex items-center justify-center overflow-hidden mb-4 group">
                        <Link to={`/producto/${product.slug}`} className="w-full h-full flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </Link>
                        <span className="absolute top-3 right-3 bg-slate-900 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                          {bvValue.toFixed(2)} BV
                        </span>
                        <span className="absolute top-3 left-3 bg-[#4472C4] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                          Sin Flúor ni Triclosán
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-[#4472C4] mb-1.5">
                        {product.code && <span>Cód: {product.code}</span>}
                        <span>Contenido: {product.netContent || '120 gr'}</span>
                      </div>

                      <h3 className="text-xl font-black text-black mb-2 leading-snug">
                        <Link to={`/producto/${product.slug}`} className="hover:text-[#4472C4] transition-colors">
                          {product.name}
                        </Link>
                      </h3>

                      <p className="text-sm text-black leading-relaxed mb-4 font-normal">
                        {product.shortDescription}
                      </p>

                      <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 space-y-2 mb-5">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-bold text-black uppercase tracking-wider">
                            Precio al Público:
                          </span>
                          <span className="text-3xl font-black text-[#4472C4] tabular-nums">
                            $8.00 <span className="text-xs font-bold text-black">USD</span>
                          </span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                          <span className="text-black font-medium">¿Deseas 30% de descuento?</span>
                          <span className="text-[#4472C4] font-black">Acumula 50 BV en afiliación</span>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-3 border-t border-slate-100 mb-6">
                        <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#4472C4]" />
                          <span>Beneficios del Catálogo Oficial:</span>
                        </h4>
                        <ul className="space-y-2.5 text-[17px] leading-snug text-black">
                          {product.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 break-words">
                              <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <a
                        href={clientWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Comprar como Cliente ($8.00)</span>
                      </a>

                      <a
                        href={partnerWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 bg-[#4472C4] hover:bg-[#33599E] text-white text-xs sm:text-sm font-black rounded-xl shadow-md shadow-[#4472C4]/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Comprar como Socio (30% Descuento)</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/productos"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-slate-900 hover:bg-black text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <span>Ver Catálogo Completo ({PRODUCTS.length} Productos)</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (9) ACERCA DE LA EMPRESA (Con Logo Oficial de HGW)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Acerca de la Empresa
              </h2>
              <div className="mt-5">
                <img
                  src="/assets/aistudio/HGW-LOGO-DE-LA-COMPANIA_b191b3d1.png"
                  alt="Logo Oficial Health Green World (HGW)"
                  className="h-24 sm:h-28 md:h-32 w-auto object-contain mx-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <h3 className="text-2xl sm:text-3xl font-black text-black leading-tight">
                  Health Green World (Green World Group)
                </h3>

                <p className="text-base text-black leading-relaxed font-normal">
                  HGW forma parte de la corporación multinacional Green World Group, fundada por la <strong>Dra. Deming Lee</strong> junto al liderazgo corporativo de <strong>Peter Lee</strong>. Con presencia en más de 50 países, combinamos investigación científica en medicina tradicional con biotecnología moderna.
                </p>

                <p className="text-base text-black leading-relaxed font-normal">
                  En Panamá operamos bajo los más altos estándares éticos, afiliados a gremios de venta directa responsable como la Asociación Panameña de Venta Directa (APVD) y la Federación Mundial de Asociaciones de Venta Directa (WFDSA).
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Link
                    to="/documentos/pasta-dental-de-turmalina"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Ver Ficha Técnica PDF</span>
                  </Link>
                  <Link
                    to="/oficinas"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EEF3FB] hover:bg-[#dbe6f8] text-[#4472C4] font-bold text-sm rounded-2xl transition-all"
                  >
                    <span>Oficinas Panamá y LATAM</span>
                  </Link>
                </div>
              </div>

              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <iframe
                  src="https://www.youtube.com/embed/oOZhonOYD6Q"
                  title="Presentación Corporativa HGW"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (10) OPORTUNIDAD
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Oportunidad y Descuentos para Socios
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <iframe
                  src="https://www.youtube.com/embed/Poy4FvvfcfA"
                  title="Tutorial Oficial de Registro y Oportunidad HGW"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <h3 className="text-2xl sm:text-3xl font-black text-black leading-tight">
                  Obtén del <span className="text-[#4472C4]">30% al 52% de beneficio</span> en Pastas Dentales y todo el catálogo
                </h3>

                <p className="text-base text-black leading-relaxed font-normal">
                  Al activar tu código con 50 BV en adelante bajo el patrocinio autorizado en Panamá (Yamilka507), compras tus pastas dentales con descuento preferencial desde el 30% y hasta un 52% con el paquete Master (600 BV), además de generar ingresos por recomendación y ventas directas.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Link
                    to="/oportunidad-de-negocio"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <span>Ver Plan de Negocio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#EEF3FB] text-[#4472C4] border border-[#4472C4]/30 font-bold text-sm rounded-2xl transition-all"
                  >
                    <span>Registro Oficial (Yamilka507)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (11) PREVENCIÓN, CUIDADO BÁSICO Y GUÍAS (4 COLUMNAS)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Prevención, Cuidado Básico y Guías HGW
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Recomendaciones esenciales y recursos educativos para mantener una salud bucodental óptima todos los días.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DENTAL_GUIDES.map((guide, idx) => (
                <Link
                  key={idx}
                  to={guide.to}
                  className="bg-[#F8FAFC] rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden bg-white border border-slate-100 mb-4">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp';
                      }}
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-black group-hover:text-[#4472C4] transition-colors mb-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-black leading-relaxed font-normal">
                    {guide.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#4472C4]">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ver más detalles</span>
                  </span>
                </Link>
              ))}
            </div>

            {/* Aviso de Salud Bucal */}
            <div className="mt-10 bg-amber-50/90 border border-amber-200/80 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
              <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-sm text-black leading-relaxed">
                <strong className="font-black uppercase tracking-wider block text-amber-950 text-xs sm:text-sm">
                  Recomendación y Aviso de Salud Bucal:
                </strong>
                <p>
                  Nuestras pastas dentales HGW están diseñadas para complementar tu higiene diaria con ingredientes naturales y botánicos, pero recuerda que <strong>no curan ni tratan enfermedades</strong>. Te recomendamos con mucho cariño visitar a tu odontólogo de confianza para tu chequeo y limpieza dental cada 6 meses, asegurando así una sonrisa siempre radiante y saludable.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (12) PREGUNTAS FRECUENTES (Todos cerrados al cargar, texto 17px negro)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Preguntas Frecuentes sobre Pastas Dentales
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Respuestas rápidas sobre ingredientes sin flúor, precios, pagos por Yappy y envíos en Panamá.
              </p>
            </div>

            <div className="space-y-4">
              {DENTAL_FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden shadow-sm border border-[#4472C4]/25 bg-white transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full py-4 px-4 sm:px-6 bg-[#4472C4] hover:bg-[#33599E] text-white text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-6 py-4 sm:py-5 text-[17px] text-black leading-relaxed bg-white border-t border-slate-100 font-normal break-words">
                        {renderWithHGWLinks(faq.answer)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (13) PAQUETES DE MEMBRESÍA O SUSCRIPCIÓN (Master es el último, bullets 17px negro)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Paquetes de Membresía o Suscripción
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Elige los productos de tu preferencia en cada paquete, incluyendo pastas dentales. Diamante es un rango de liderazgo, no una membresía de ingreso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {showcasePackages.map((pkg) => {
                const pkgWhatsAppText = encodeURIComponent(
                  `¡Hola! Estaba visitando la página de pastas dentales y quería preguntar sobre cómo afiliarse a HGW Panamá con el paquete "${pkg.name}" (${pkg.bv}). Mi nombre es:`
                );
                const pkgWhatsAppUrl = `https://wa.me/50767788375?text=${pkgWhatsAppText}`;

                return (
                  <div
                    key={pkg.id}
                    className={`rounded-3xl p-5 sm:p-8 flex flex-col justify-between text-center transition-all duration-300 relative ${
                      pkg.isHighlighted
                        ? 'bg-gradient-to-b from-[#EEF3FB] via-white to-white border-2 border-[#4472C4] shadow-2xl ring-4 ring-[#4472C4]/15'
                        : 'bg-white border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {pkg.isHighlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4472C4] text-white text-xs font-extrabold px-5 py-1.5 rounded-full shadow-md inline-flex items-center gap-1.5 uppercase tracking-wider whitespace-nowrap">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Paquete Recomendado</span>
                      </div>
                    )}

                    <div>
                      <div className="aspect-square w-full rounded-2xl bg-[#F8FAFC] border border-slate-100 p-5 flex items-center justify-center overflow-hidden mb-5">
                        <img
                          src={pkg.packageImageUrl}
                          alt={`Paquete ${pkg.name} HGW`}
                          className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp';
                          }}
                        />
                      </div>

                      <div className="text-xs font-extrabold text-[#4472C4] uppercase tracking-wider mb-1">
                        {pkg.bv} · {pkg.productCount}
                      </div>

                      <h3 className="text-2xl font-black text-black">
                        {pkg.name}
                      </h3>

                      <div className="text-3xl font-black text-[#4472C4] mt-2 mb-3 tabular-nums">
                        {pkg.priceEstimate}
                      </div>

                      <p className="text-sm sm:text-base text-black leading-relaxed mb-5 font-normal">
                        {pkg.description}
                      </p>

                      <ul className="space-y-2.5 text-left text-[17px] leading-snug text-black mb-6 border-t border-slate-100 pt-4">
                        <li className="flex items-start gap-2.5 break-words">
                          <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                          <span>Bono Inicio Rápido: <strong>{pkg.fastStartBonus}</strong></span>
                        </li>
                        <li className="flex items-start gap-2.5 break-words">
                          <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                          <span>Bono Equipo: <strong>{pkg.teamBonus}</strong></span>
                        </li>
                        <li className="flex items-start gap-2.5 break-words">
                          <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                          <span>Tope Diario: <strong>{pkg.dailyEarningsCap}</strong></span>
                        </li>
                        <li className="flex items-start gap-2.5 break-words">
                          <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                          <span>Venta Directa: <strong>{pkg.directSaleProfit}</strong></span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2.5">
                      <a
                        href={pkgWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm transition-all active:scale-95 inline-flex items-center justify-center gap-2 ${
                          pkg.isHighlighted
                            ? 'bg-[#4472C4] hover:bg-[#33599E] text-white shadow-lg shadow-[#4472C4]/25'
                            : 'bg-slate-900 hover:bg-black text-white'
                        }`}
                      >
                        <span>Elegir {pkg.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/membresias"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#4472C4] hover:underline"
              >
                <span>Ver las 4 membresías oficiales (incluyendo Pre-Junior 50 BV con 30% descuento)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (14) QUIÉNES SOMOS
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Quiénes Somos
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12">
              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl">
                <img
                  src="https://media.academiahgw.online/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-23-at-11.35.46-PM.jpeg"
                  alt="Yamilka Batista - Distribuidora Independiente HGW Panamá"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-bottom"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/aistudio/image_2b0e74c9.png';
                  }}
                />
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#4472C4] inline-flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Patrocinio Autorizado: Yamilka507</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-black leading-tight">
                  Yamilka Batista · Tu Asesora de Pastas Dentales HGW Panamá
                </h3>
                <p className="text-base text-black leading-relaxed font-normal">
                  Si estás aquí es porque buscas algo mejor para ti y para tu familia, y quieres hacerlo con alguien en quien puedas confiar. Mi misión es compartir contigo las bondades de nuestras pastas dentales <strong>100% libres de flúor y triclosán</strong> y todos los productos HGW para que disfrutes de una mejor calidad de vida y bienestar. Te escucho, te oriento con honestidad y te acompaño en cada paso, con entregas confiables en la ciudad y en las provincias. Escríbeme, cuéntame qué necesitas y empecemos juntas.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href={`https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      '¡Hola Yamilka! Vi la página de pastas dentales HGW Panamá y deseo consultarte. Mi nombre es:'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#4472C4]/25 hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Hablar con Yamilka por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons centered below */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  'https://www.hgwpanama.com/pastas-dentales'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en Facebook"
                className="w-12 h-12 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-md hover:-translate-y-1 transition-all"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  'https://www.hgwpanama.com/pastas-dentales'
                )}&text=${encodeURIComponent('Pastas Dentales Sin Flúor HGW Panamá')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en X"
                className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-md hover:-translate-y-1 transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram y Contacto HGW Panamá"
                className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-md hover:-translate-y-1 transition-all"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@yamilkabatistaoficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Canal de YouTube Yamilka Batista Oficial"
                className="w-12 h-12 rounded-xl bg-[#FF0000] text-white flex items-center justify-center shadow-md hover:-translate-y-1 transition-all"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (15) CONTACTO (Formulario + Mapa de Panamá) + POLÍTICAS DE ENVÍO
          ================================================================= */}
      <ContactSection />

      <section className="py-12 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShippingAndReturnsSection />
        </div>
      </section>
    </div>
  );
};
