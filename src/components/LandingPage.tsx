import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Check,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  MessageCircle,
  BookOpen,
  Play,
  FileText,
} from 'lucide-react';
import { PRODUCTS, CERTIFICATIONS, MEMBERSHIP_PLANS } from '../data/products';
import { ScrollReveal } from './ScrollReveal';
import { Link } from '../router';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';
import { renderWithHGWLinks } from '../utils/hgwLinker';

const SERVICES_LIST = [
  {
    id: 1,
    title: 'Servicio 1 · Productos Naturales con Respaldo Global',
    detail:
      'Fórmulas originales de arándano silvestre, ganoderma lucidum, cordyceps, probióticos y tecnología de nanoturmalina avaladas por normativas FDA, ISO 9001 y GMP.',
    ctaLabel: 'Ver Catálogo',
    ctaTo: '/productos',
  },
  {
    id: 2,
    title: 'Servicio 2 · Asesoría Personalizada en Panamá',
    detail:
      'Orientación directa 1 a 1 vía WhatsApp (+507 6778-8375) con distribuidor independiente autorizado para ayudarte a elegir los productos ideales para tu rutina.',
    ctaLabel: 'Consultar por WhatsApp',
    ctaHref: 'whatsapp',
  },
  {
    id: 3,
    title: 'Servicio 3 · Envíos Confiables a Todo el País',
    detail:
      'Entregas en Panamá desde USD 5.00 en un tiempo estimado de 24 a 48 horas hábiles vía Servientrega o encomienda provincial (Uno Express, Fletes Chavale).',
    ctaLabel: 'Política de Envíos',
    ctaTo: '/envios-y-devoluciones',
  },
  {
    id: 4,
    title: 'Servicio 4 · Membresías y Plan de Ganancias Mutuas',
    detail:
      'Actívate con Pre-Junior, Junior, Senior o Master escogiendo los productos de tu preferencia y accede a descuentos preferenciales de hasta 52% en recompras.',
    ctaLabel: 'Ver Oportunidad',
    ctaTo: '/oportunidad-de-negocio',
  },
];

const THREE_COL_LINES = [
  {
    title: 'Cafés y Bebidas Funcionales',
    description:
      'Bebidas solubles enriquecidas con extracto de arándano azul, ganoderma, cordyceps y té negro diseñadas para acompañar tu energía y bienestar diario.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/blueberry-coffee-p-500.png',
    fallback:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp',
    href: '/productos',
  },
  {
    title: 'Tecnología de Turmalina',
    description:
      'Collares, pulseras, protectores y termos con minerales de turmalina que aportan confort térmico natural e iones negativos para tu rutina.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/Collar-de-turmalina-No.-2.png',
    fallback:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp',
    href: '/productos',
  },
  {
    title: 'Cuidado Bucal Sin Flúor',
    description:
      'Pastas dentales con probióticos, turmalina y extractos herbales libres de flúor y triclosán para el cuidado integral de toda la familia.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta-dental-con-probioticos-HGW.jpg',
    fallback:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp',
    href: '/pastas-dentales',
  },
];

const HOME_FAQS = [
  {
    question: '1. ¿Cómo puedo realizar un pedido en Panamá?',
    answer:
      "Puedes explorar nuestro catálogo completo, revisar la ficha técnica de cada artículo y hacer clic en 'Consultar por WhatsApp' para coordinar la entrega y el método de pago directamente al +507 6778-8375.",
  },
  {
    question: '2. ¿Cuáles son los métodos de pago disponibles?',
    answer:
      'Aceptamos pagos mediante Yappy (Banco General), transferencias bancarias ACH y efectivo contraentrega en áreas seleccionadas de Ciudad de Panamá y Panamá Oeste.',
  },
  {
    question: '3. ¿Realizan entregas al interior del país?',
    answer:
      'Sí. Coordinamos envíos a todas las provincias de Panamá (Chiriquí, Colón, Veraguas, Herrera, Los Santos, Coclé, Bocas del Toro y Darién) desde USD 5.00 en 24 a 48 horas hábiles.',
  },
  {
    question: '4. ¿Cómo puedo afiliarme como socio distribuidor para obtener hasta 52% de beneficio?',
    answer:
      'Puedes registrarte bajo el patrocinio autorizado en Panamá (código Yamilka507), eligiendo el paquete de activación (Pre-Junior 50 BV, Junior 100 BV, Senior 300 BV o Master 600 BV) con los productos de tu preferencia.',
  },
];

const BLOG_ARTICLES = [
  {
    title: 'Arándanos Azules: Antioxidantes y Nutrición Celular',
    excerpt:
      'Descubre por qué el arándano silvestre (Vaccinium corymbosum) es la base de nuestras bebidas, caramelos y péptidos de colágeno en Panamá.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/18._HGW_Blueberry_Soybean_Milk_Drink-1024x576.png',
    to: '/informacion#arandanos',
  },
  {
    title: 'Turmalina Bioenergética en Accesorios e Higiene',
    excerpt:
      'Conoce la ciencia detrás de los minerales piroeléctricos, aniones e infrarrojo lejano aplicados a protectores, joyería y jabones botánicos.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/21._OLIVE_SOAP_TOURMALINE_SOAP-1024x576.png',
    to: '/informacion#turmalina',
  },
  {
    title: 'Serie Café Funcional con Ganoderma y Cordyceps',
    excerpt:
      'Explora cómo combinamos granos aromáticos con hongos adaptógenos milenarios para ofrecerte una bebida diaria equilibrada y deliciosa.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/16._HGW_SERIE_CAF_-1024x576.png',
    to: '/informacion#cafe',
  },
];

const TESTIMONIAL_PLACEHOLDERS = [
  {
    id: 1,
    title: 'Testimonio 1',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
  {
    id: 2,
    title: 'Testimonio 2',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
  {
    id: 3,
    title: 'Testimonio 3',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
];

export const LandingPage: React.FC = () => {
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Pick 3 real consumer featured products from PRODUCTS
  const featuredSlugs = [
    'blueberry-coffee',
    'pasta-dental-de-turmalina-negra',
    'thermo-de-turmalina',
  ];
  const featuredProducts = featuredSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const fallbackProducts = PRODUCTS.filter((p) => p.category !== 'membresias').slice(0, 3);
  const displayProducts = featuredProducts.length === 3 ? featuredProducts : fallbackProducts;

  // Pick top 3 certifications (FDA, ISO 9001, GMP)
  const topCertifications = CERTIFICATIONS.slice(0, 3);

  // Pick 3 membership packages with Master highlighted in the center (Junior, Master, Senior)
  const juniorPlan = MEMBERSHIP_PLANS.find((m) => m.id === 'junior') || MEMBERSHIP_PLANS[1];
  const masterPlan = MEMBERSHIP_PLANS.find((m) => m.id === 'master') || MEMBERSHIP_PLANS[3];
  const seniorPlan = MEMBERSHIP_PLANS.find((m) => m.id === 'senior') || MEMBERSHIP_PLANS[2];
  const showcasePackages = [
    { ...juniorPlan, isCenterHighlight: false },
    { ...masterPlan, isCenterHighlight: true },
    { ...seniorPlan, isCenterHighlight: false },
  ];

  const registrationUrl = 'https://www.healthgreenworld.com/?userName=Yamilka507';
  const whatsappUrl = getAffiliationWhatsAppUrl();

  return (
    <div className="bg-white text-slate-900">
      {/* =================================================================
          (2) BANNER A TODO EL ANCHO CON IMAGEN 21:7 (2100x700)
          ================================================================= */}
      <section aria-label="Banner principal HGW Panamá" className="w-full bg-[#4472C4]">
        <div className="relative w-full aspect-[21/7] min-h-[180px] sm:min-h-[240px] overflow-hidden">
          <img
            src="https://media.academiahgw.online/wp-content/uploads/2026/11/Banner-Productos-HGW-1024x682.jpg"
            alt="Catálogo Oficial de Productos Naturales y Bienestar HGW Panamá"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#23437D]/85 via-[#4472C4]/70 to-[#23437D]/80 flex items-center justify-center px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-blue-100 mb-1.5">
                Salud · Bienestar · Prosperidad en Panamá
              </p>
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
                Health Green World · HGW Panamá
              </h2>
              <p className="hidden sm:block text-sm md:text-base text-blue-50 font-medium mt-2 max-w-2xl mx-auto">
                Distribuidores Independientes Autorizados · Productos funcionales de arándano, turmalina, ganoderma y probióticos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          (3) HERO EN 2 COLUMNAS (Izquierda: Título centrado, párrafo, CTA | Derecha: Imagen/Video 1200x800)
          ================================================================= */}
      <section
        id="inicio"
        className="scroll-mt-24 py-14 sm:py-20 bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Left Column: Centered large title, paragraph & big CTA */}
              <div className="flex flex-col items-center text-center space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight text-balance">
                  Bienestar Natural y Productos Funcionales con{' '}
                  <span className="text-[#4472C4]">HGW Panamá</span>
                </h1>

                <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed max-w-xl font-normal">
                  Descubre la sinergia entre la sabiduría herbolaria milenaria y la biotecnología moderna. Productos originales de arándano silvestre, turmalina, ganoderma lucidum y probióticos respaldados por certificaciones internacionales y asesoría directa en toda la República de Panamá.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                  <Link
                    to="/productos"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#4472C4] hover:bg-[#33599E] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#4472C4]/25 hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <span>Explorar Catálogo Completo</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Image or Video 1200x800 (3:2 aspect) */}
              <div className="w-full">
                <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-[#EEF3FB] border border-slate-200 shadow-xl group">
                  <img
                    src="https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp"
                    alt="Línea oficial de productos HGW Panamá"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://media.academiahgw.online/wp-content/uploads/2026/11/Banner-Productos-HGW-1024x682.jpg';
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (4) SERVICIOS O CARACTERÍSTICAS (H2 centrado | Izquierda: 1200x800 | Derecha: 4 barras apiladas)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Servicios y Características de HGW Panamá
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal">
                Beneficios exclusivos al adquirir tus productos o activar tu código de distribuidor independiente.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              {/* Left: 1200x800 (3:2) Official Products Video */}
              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <iframe
                  src="https://www.youtube.com/embed/r-BFxBuhhbc"
                  title="Línea de Productos y Servicios HGW"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Right: 4 Stacked Service Bars */}
              <div className="space-y-4">
                {SERVICES_LIST.map((srv, idx) => {
                  const isSelected = activeServiceIdx === idx;
                  return (
                    <div
                      key={srv.id}
                      className={`rounded-2xl transition-all duration-200 overflow-hidden shadow-sm ${
                        isSelected
                          ? 'bg-[#33599E] text-white shadow-md ring-2 ring-[#4472C4]/30'
                          : 'bg-[#4472C4] hover:bg-[#33599E] text-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveServiceIdx(idx)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
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
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-blue-50 border-t border-white/15 space-y-3">
                          <p className="leading-relaxed">{srv.detail}</p>
                          {srv.ctaHref === 'whatsapp' ? (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-white underline underline-offset-4 hover:text-blue-100"
                            >
                              <span>{srv.ctaLabel}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <Link
                              to={srv.ctaTo || '/productos'}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-white underline underline-offset-4 hover:text-blue-100"
                            >
                              <span>{srv.ctaLabel}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (5) 3 COLUMNAS CON IMAGEN CIRCULAR 250x250, TÍTULO Y TEXTO CENTRADO
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Pilares de Nuestras Fórmulas Naturales
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal">
                Categorías principales diseñadas para el bienestar diario de tu familia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {THREE_COL_LINES.map((col, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group"
                >
                  <Link
                    to={col.href}
                    className="w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] rounded-full overflow-hidden border-4 border-[#EEF3FB] shadow-lg bg-[#F8FAFC] p-4 flex items-center justify-center mb-6 group-hover:border-[#4472C4] group-hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = col.fallback;
                      }}
                    />
                  </Link>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2.5">
                    {col.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xs font-normal">
                    {col.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (6) CERTIFICACIONES O RECONOCIMIENTOS (H2 | 3 cols: Imagen 1200x800, Título y Texto centrado)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Certificaciones y Reconocimientos
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal">
                Estándares internacionales de calidad, inocuidad y manufactura que respaldan cada producto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topCertifications.map((cert, idx) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-100 p-4 flex items-center justify-center mb-5">
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
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
                    C/R {idx + 1} · {cert.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (7) TESTIMONIOS (H2 | 3 cols: Imagen/Video 1200x800, Título y Texto centrado)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Testimonios
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal">
                Espacio reservado para compartir experiencias reales de clientes y socios en Panamá.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIAL_PLACEHOLDERS.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
                >
                  <div className="aspect-[3/2] w-full rounded-2xl bg-[#4472C4] text-white flex flex-col items-center justify-center p-6 mb-5 shadow-inner">
                    <Play className="w-10 h-10 text-white/90 mb-2" />
                    <span className="text-sm font-bold tracking-wide">
                      Imagen 1200x800 o Video
                    </span>
                    <span className="text-xs text-blue-100 mt-1">
                      Marcador de posición · {item.title}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (8) PRODUCTOS (H2 | 3 cols: Imagen 1000x1000, Nombre, Descripción y Botón)
          ================================================================= */}
      <section
        id="productos"
        className="scroll-mt-24 py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Productos
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal">
                Selección destacada de nuestro catálogo oficial con precios en dólares (USD) en Panamá.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-center"
                >
                  <div>
                    <Link
                      to={`/producto/${product.slug}`}
                      className="aspect-square w-full rounded-2xl bg-[#F8FAFC] border border-slate-100 p-6 flex items-center justify-center overflow-hidden mb-5 group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp';
                        }}
                      />
                    </Link>

                    <div className="text-xs font-bold text-[#4472C4] uppercase tracking-wider mb-1">
                      {product.categoryLabel} · {product.priceFormatted}
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                      {product.shortDescription}
                    </p>
                  </div>

                  <Link
                    to={`/producto/${product.slug}`}
                    className="w-full py-3.5 px-5 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-sm rounded-xl shadow-sm transition-all active:scale-95 inline-flex items-center justify-center gap-2"
                  >
                    <span>Ver Producto y Consultar</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
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
          (9) ACERCA DE LA EMPRESA (H2 centrado | Izquierda: texto + botón | Derecha: Imagen/Video 1200x800)
          ================================================================= */}
      <section
        id="sobre-nosotros"
        className="scroll-mt-24 py-14 sm:py-20 bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Acerca de la Empresa
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Left Column: Text + CTA */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Health Green World (Green World Group)
                </h3>

                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  HGW forma parte de la corporación multinacional Green World Group, fundada por la <strong>Dra. Deming Lee</strong> junto al liderazgo corporativo de <strong>Peter Lee</strong>. Con presencia en más de 50 países, combinamos investigación científica en medicina tradicional con biotecnología moderna.
                </p>

                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  En Panamá operamos bajo los más altos estándares éticos, afiliados a gremios de venta directa responsable como la Asociación Panameña de Venta Directa (APVD) y la Federación Mundial de Asociaciones de Venta Directa (WFDSA).
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Link
                    to="/documentos"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Ver Catálogos y Documentos PDF</span>
                  </Link>
                  <Link
                    to="/oficinas"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EEF3FB] hover:bg-[#dbe6f8] text-[#4472C4] font-bold text-sm rounded-2xl transition-all"
                  >
                    <span>Oficinas Panamá y LATAM</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: 1200x800 (3:2) Corporate Video */}
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
          (10) OPORTUNIDAD (H2 centrado | 2 cols invertidas: Izquierda 1200x800 | Derecha texto + botón)
          ================================================================= */}
      <section
        id="oportunidad"
        className="scroll-mt-24 py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Oportunidad
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Left Column (Inverted): 1200x800 (3:2) Tutorial Video */}
              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <iframe
                  src="https://www.youtube.com/embed/Poy4FvvfcfA"
                  title="Tutorial Oficial de Registro y Oportunidad HGW"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Right Column: Text + CTA */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Gana hasta un <span className="text-[#4472C4]">52% de beneficio</span> con el Plan de Ganancias Mutuas
                </h3>

                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  En HGW Panamá tú decides cómo crecer. Al activarte con la membresía Master (600 BV), accedes a compras personales con hasta un 52% de ahorro en recompras, márgenes del 60% en venta directa al consumidor, bonos de inicio rápido, desarrollo, bono de equipo diario y bono élite hasta la 6ta generación.
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
          (11) BLOG / ARTÍCULOS / EVENTOS / NOTICIAS (3 cols: 1200x800, Título y Extracto)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Blog, Artículos, Eventos y Noticias
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal">
                Guías educativas sobre ingredientes ancestrales, formulaciones y bienestar integral.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_ARTICLES.map((post, idx) => (
                <Link
                  key={idx}
                  to={post.to}
                  className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden bg-white border border-slate-100 mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp';
                      }}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#4472C4] transition-colors mb-2">
                    Artículo {idx + 1} · {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#4472C4]">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Leer guía completa</span>
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (12) PREGUNTAS FRECUENTES (4 barras en formato acordeón desplegable)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Preguntas Frecuentes
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal">
                Respuestas rápidas sobre pedidos, pagos, envíos en Panamá y afiliación.
              </p>
            </div>

            <div className="space-y-4">
              {HOME_FAQS.map((faq, idx) => {
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
                      className="w-full py-4 px-6 bg-[#4472C4] hover:bg-[#33599E] text-white text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 py-5 text-sm sm:text-base text-slate-700 leading-relaxed bg-white border-t border-slate-100 font-normal">
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
          (13) PAQUETES DE MEMBRESÍA O SUSCRIPCIÓN (3 cols tarjetas con 1000x1000, resaltando paquete central)
          ================================================================= */}
      <section
        id="membresias"
        className="scroll-mt-24 py-14 sm:py-20 bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Paquetes de Membresía o Suscripción
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal">
                Elige los productos de tu preferencia en cada paquete. Diamante es un rango de liderazgo, no una membresía de ingreso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {showcasePackages.map((pkg) => {
                const pkgWhatsAppText = encodeURIComponent(
                  `¡Hola! Estaba visitando tu tienda online y quería preguntar sobre cómo afiliarse a HGW Panamá con el paquete "${pkg.name}" (${pkg.bv}). Mi nombre es:`
                );
                const pkgWhatsAppUrl = `https://wa.me/50767788375?text=${pkgWhatsAppText}`;

                return (
                  <div
                    key={pkg.id}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center transition-all duration-300 relative ${
                      pkg.isCenterHighlight
                        ? 'bg-gradient-to-b from-[#EEF3FB] via-white to-white border-2 border-[#4472C4] shadow-2xl md:-translate-y-3 ring-4 ring-[#4472C4]/15'
                        : 'bg-white border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {pkg.isCenterHighlight && (
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

                      <h3 className="text-2xl font-black text-slate-900">
                        {pkg.name}
                      </h3>

                      <div className="text-3xl font-black text-[#4472C4] mt-2 mb-3 tabular-nums">
                        {pkg.priceEstimate}
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                        {pkg.description}
                      </p>

                      <ul className="space-y-2 text-left text-xs sm:text-sm text-slate-700 mb-6 border-t border-slate-100 pt-4">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#4472C4] shrink-0" />
                          <span>Bono Inicio Rápido: <strong>{pkg.fastStartBonus}</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#4472C4] shrink-0" />
                          <span>Bono Equipo: <strong>{pkg.teamBonus}</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#4472C4] shrink-0" />
                          <span>Tope Diario: <strong>{pkg.dailyEarningsCap}</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#4472C4] shrink-0" />
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
                          pkg.isCenterHighlight
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
                <span>Ver las 4 membresías oficiales (incluyendo Pre-Junior 50 BV)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (14) QUIÉNES SOMOS (H2 | Izquierda 1200x800 | Derecha título, párrafo, botón | Debajo: FB, X, IG, YT)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Quiénes Somos
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12">
              {/* Left Column: 1200x800 (3:2) Image */}
              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl">
                <img
                  src="https://media.academiahgw.online/wp-content/uploads/2026/11/Foto-de-Perfil-Yamilka-Batista-Emprendedora-HGW-2-1024x1024.jpeg"
                  alt="Yamilka Batista - Distribuidora Independiente HGW Panamá"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://media.academiahgw.online/wp-content/uploads/2026/11/Foto-de-Perfil-Yamilka-Batista-Emprendedora-HGW-1-1024x1024.jpeg';
                  }}
                />
              </div>

              {/* Right Column: Title, paragraph, CTA */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#4472C4]">
                  Patrocinio Autorizado: Yamilka507
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Yamilka Batista · Distribuidora Independiente HGW Panamá
                </h3>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Nuestro compromiso en Panamá es brindarte orientación honesta sobre los beneficios de cada producto, entregas confiables en ciudad y provincias, y acompañamiento personalizado si deseas afiliarte para consumo familiar o desarrollar tu propio emprendimiento independiente.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href={whatsappUrl}
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

            {/* Centered Social Icons below: Facebook, X, Instagram, YouTube */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.hgwpanama.com/')}`}
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
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://www.hgwpanama.com/')}&text=${encodeURIComponent('HGW Panamá - Productos Naturales y Bienestar')}`}
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
                href="https://www.youtube.com/watch?v=Poy4FvvfcfA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tutoriales en YouTube HGW"
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
    </div>
  );
};
