import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ShoppingBag,
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
  Package,
  Hash,
  HeartHandshake,
  Users,
  ThumbsUp,
} from 'lucide-react';
import { PRODUCTS, CERTIFICATIONS, MEMBERSHIP_PLANS, Product } from '../data/products';
import { AFFILIATION_CONFIG } from '../config/affiliation';
import { findProductBySlug } from '../data/seoMetadata';
import { DIRECT_SALES_ASSOCIATIONS } from '../components/AboutHGW';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactSection } from '../components/ContactSection';
import { LazyYouTubeEmbed } from '../components/LazyYouTubeEmbed';
import { Link, Navigate } from '../router';
import { DISTRIBUTOR_WHATSAPP_NUMBER, getAffiliationWhatsAppUrl } from '../utils/whatsapp';
import { renderWithHGWLinks } from '../utils/hgwLinker';
import { AdsterraResponsiveBanner, AdsterraSmartlinkCard } from '../components/AdsterraAds';

interface ProductDetailPageProps {
  slug: string;
}

function getHeroVideoForProduct(product: Product): { id: string; title: string } {
  if (product.slug === 'pasta-dental-con-probioticos') {
    return { id: 'ffYtOh7xwEo', title: 'Capacitación Pasta Dental con Probióticos HGW' };
  }
  if (product.slug === 'pasta-dental-de-turmalina-blanca') {
    return { id: 'ktx3RJ54zgI', title: 'Pasta Dental de Turmalina Blanca HGW' };
  }
  if (product.slug === 'pasta-dental-de-turmalina-negra') {
    return { id: 'mmWFwGHLdfM', title: 'Pasta Dental de Turmalina Negra HGW' };
  }
  if (product.category === 'cuidado-bucal') {
    return { id: 'ffYtOh7xwEo', title: `${product.name} - Cuidado Bucal HGW` };
  }
  if (product.category === 'membresias') {
    return { id: 'Poy4FvvfcfA', title: `Afiliación y Registro ${product.name}` };
  }
  return { id: 'r-BFxBuhhbc', title: `${product.name} - Línea Oficial HGW` };
}

function getIngredientEmoji(ingredient: string): string {
  const lower = ingredient.toLowerCase();
  if (/(arándano|arandano|blueberry|vaccinium|baya)/.test(lower)) return '🫐';
  if (/(café|cafe|coffee|moca|mocha|arabica|arábica)/.test(lower)) return '☕';
  if (/(ganoderma|reishi|cordyceps|hongo|melena|shiitake)/.test(lower)) return '🍄';
  if (/(turmalina|tourmaline|cuarzo|mineral|piedra|imán|magnét|infrarrojo|anión|anion)/.test(lower)) return '💎';
  if (/(probiótico|probiotico|lactobacil|lactiberry|bacteri|ferment)/.test(lower)) return '🦠';
  if (/(té negro|te negro|té verde|te verde|té rojo|matcha|oolong)/.test(lower)) return '🍵';
  if (/(menta|mentol|hierbabuena|eucalipto|xilitol|xylitol)/.test(lower)) return '🍃';
  if (/(alga roja)/.test(lower)) return '🌊';
  if (/(espirulina|spirulina|alga|clorofila|moringa|espinaca|brócoli|verde)/.test(lower)) return '🥬';
  if (/(oliva|aceite de oliva|aceite|almendra|coco|karité|jojoba)/.test(lower)) return '🫒';
  if (/(soya|soja|leche|proteína|aminoácido|péptido|peptido|polipéptido)/.test(lower)) return '🥛';
  if (/(colágeno|colageno|hialurónico|elastina|vitamina e|seda)/.test(lower)) return '✨';
  if (/(miel|propóleo|jalea|polen)/.test(lower)) return '🍯';
  if (/(cacao|chocolate)/.test(lower)) return '🍫';
  if (/(limón|limon|naranja|cítrico|citrico|vitamina c|uva|fresa|fruta|manzana)/.test(lower)) return '🍋';
  if (/(diente de león|diente de leon)/.test(lower)) return '🌼';
  if (/(rosa|flor|lavanda|caléndula|calendula|manzanilla|madreselva|jazmín|loto)/.test(lower)) return '🌸';
  if (/(fibra|avena|trigo|maíz|cereal|semilla|germen)/.test(lower)) return '🌾';
  if (/(zinc|calcio|magnesio|hierro|selenio|potasio|sodio|ion)/.test(lower)) return '⚡';
  if (/(agua|h2o|hidrógeno|hidrogeno|alcalin)/.test(lower)) return '💧';
  if (/(aloe|sábila|ginseng|jengibre|cúrcuma|raíz|regaliz|bletilla|extracto|herbal|botánic)/.test(lower)) return '🌿';
  return '🌱';
}

function filterNaturalIngredients(ingredients?: string[]): string[] {
  if (!ingredients || ingredients.length === 0) return [];
  const excludedPattern =
    /(artificial|semiartificial|saborizante|aromatizante|acesulfamo|sucralosa|sorbitol|manitol|eritritol|maltodextrina|dextrina|estearato|dióxido de silicio|dioxido de silicio|citrato|ácido málico|acido malico|ácido cítrico|acido citrico|celulosa|hidroxipropil|caseinato|hidrogenado|fosfato|ésteres|esteres|otros componentes|codex alimentarius|sulfitos|edulcorantes de perfil|crema no láctea|crema anhidra|azúcar blanca|azúcar blanco|azúcar granulada|jarabe de malta|lactosa|leche descremada|leche desnatada|suero de leche|base de caramelo|base edulcorada|base funcional|base adaptable|agentes limpiadores|sin flúor|sin triclosán|sin pigmentos|acrílico|adhesivo|broche|velcro|acero inoxidable|componentes eléctricos|estructura|neopreno|polipropileno|auto-apagado|soporte anatómico|tapa hermética|tejido|glicerina|agua destilada|sal,|sal\b)/i;

  return ingredients
    .map((item) => item.replace(/^Tela no tejida\s*\/\s*/i, '').trim())
    .filter((item) => {
      if (!item) return false;
      if (/crema no láctea de origen vegetal/i.test(item)) return true;
      if (/\bE\s*-?\s*\d{3,4}/i.test(item)) return false;
      if (/^tela no tejida$/i.test(item)) return false;
      return !excludedPattern.test(item);
    });
}

function getAudienceAndReasons(product: Product, isMembership: boolean) {
  const isIngestible = ['cafes-bebidas', 'candies-snacks', 'nutricion'].includes(product.category);
  const actionVerb = isIngestible ? 'tomarlo' : 'usarlo';

  let audienceTitle = `¿Para quién está dirigido ${product.name}?`;
  let audiencePoints: string[] = [];

  if (isMembership) {
    audiencePoints = [
      'Personas en Panamá interesadas en consumir productos naturales HGW con descuento permanente del 30% al 52%.',
      'Emprendedores que buscan iniciar su propio negocio independiente con horarios flexibles y respaldo internacional.',
      'Familias que desean ahorrar en compras recurrentes de bienestar, bebidas funcionales y cuidado personal.',
    ];
  } else if (product.category === 'cuidado-bucal') {
    audiencePoints = [
      'Familias, adultos y niños que buscan una higiene bucal diaria 100% libre de flúor y triclosán.',
      'Personas con encías sensibles o que prefieren fórmulas botánicas con nanoturmalina, probióticos y xilitol.',
      'Quienes desean aliento fresco prolongado y limpieza suave sin abrasivos químicos agresivos.',
    ];
  } else if (product.category === 'cafes-bebidas') {
    audiencePoints = [
      'Amantes del café y bebidas funcionales que buscan disfrutar un sabor delicioso con antioxidantes naturales.',
      'Estudiantes, profesionales y personas activas que desean acompañar su jornada con vitalidad equilibrada.',
      'Quienes prefieren alternativas enriquecidas con extracto de arándano, ganoderma lucidum o cordyceps.',
    ];
  } else if (product.category === 'turmalina' || product.category === 'hogar-accesorios') {
    audiencePoints = [
      'Personas que pasan largas horas de pie, frente al computador o realizando actividad física diaria.',
      'Quienes buscan accesorios bioenergéticos, confort térmico natural e hidratación de calidad en su rutina.',
      'Adultos y adultos mayores interesados en complementar su bienestar diario con tecnología de turmalina.',
    ];
  } else if (product.category === 'cuidado-personal') {
    audiencePoints = [
      'Personas que cuidan su piel e higiene íntima con ingredientes suaves, extractos herbales y minerales.',
      'Quienes desean reemplazar productos convencionales con jabones botánicos o líneas con aniones y turmalina.',
      'Toda la familia en búsqueda de frescura, suavidad y limpieza respetuosa para uso diario.',
    ];
  } else {
    audiencePoints = [
      'Personas comprometidas con mejorar su bienestar diario mediante nutrición celular y extractos naturales.',
      'Adultos activos que desean complementar su alimentación con antioxidantes, vitaminas y fitonutrientes.',
      'Familias en Ciudad de Panamá y provincias que buscan productos certificados con respaldo internacional.',
    ];
  }

  const reasonsTitle = isMembership
    ? `¿Por qué deberías activarte hoy con ${product.name}?`
    : `¿Por qué deberías empezar a ${actionVerb}?`;

  const benefitReasons =
    product.benefits && product.benefits.length > 0
      ? product.benefits.slice(0, 3)
      : [
          product.shortDescription,
          'Elaborado con ingredientes naturales seleccionados bajo estándares FDA, ISO 9001 y GMP.',
          'Fácil de incorporar en tu rutina diaria con entrega rápida en Ciudad de Panamá y provincias.',
        ];

  return { audienceTitle, audiencePoints, reasonsTitle, reasonsPoints: benefitReasons, isIngestible };
}

const EDUCATIONAL_GUIDES = [
  {
    title: 'Arándanos Azules y Antioxidantes',
    excerpt:
      'Descubre por qué el arándano silvestre es un pilar de nuestras bebidas, caramelos y suplementos funcionales en Panamá.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/18._HGW_Blueberry_Soybean_Milk_Drink-1024x576.png',
    to: '/informacion#arandanos',
  },
  {
    title: 'Turmalina Bioenergética',
    excerpt:
      'Conoce la ciencia detrás de los minerales naturales, aniones e infrarrojo lejano aplicados a bienestar y cuidado personal.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/21._OLIVE_SOAP_TOURMALINE_SOAP-1024x576.png',
    to: '/informacion#turmalina',
  },
  {
    title: 'Cafés con Ganoderma y Cordyceps',
    excerpt:
      'Explora cómo combinamos granos aromáticos con hongos adaptógenos milenarios para acompañar tu energía diaria.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/16._HGW_SERIE_CAF_-1024x576.png',
    to: '/informacion#cafe',
  },
  {
    title: 'Catálogos y Fichas Técnicas PDF',
    excerpt:
      'Consulta la biblioteca oficial con ingredientes, presentaciones, modo de uso y respaldo internacional de HGW.',
    image:
      'https://media.academiahgw.online/wp-content/uploads/2026/11/12._CORDYCEPS-1024x576.png',
    to: '/documentos',
  },
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const [activeServiceIdx, setActiveServiceIdx] = useState<number | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const product = findProductBySlug(slug);

  useEffect(() => {
    setActiveServiceIdx(null);
    setOpenFaqIdx(null);
  }, [slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCategory = PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    if (sameCategory.length >= 4) return sameCategory.slice(0, 4);
    const others = PRODUCTS.filter(
      (p) => p.category !== product.category && p.category !== 'membresias' && p.id !== product.id
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [product]);

  if (!product) {
    return <Navigate to="/productos" replace />;
  }

  const isMembership =
    product.category === 'membresias' ||
    product.id.startsWith('membresia-') ||
    product.slug.startsWith('membresia-');

  const registrationUrl = AFFILIATION_CONFIG.affiliateUrl;
  const whatsappUrl = getAffiliationWhatsAppUrl(
    typeof window !== 'undefined' ? window.location.href : undefined
  );

  const productWhatsappUrl = `https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `¡Hola Yamilka! Estaba viendo *${product.name}* (${product.priceFormatted} USD) en tu tienda HGW Panamá y deseo comprarlo o hacer una consulta. Mi nombre es:`
  )}`;

  const partnerWhatsappUrl = `https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `¡Hola Yamilka! Me interesa adquirir *${product.name}* con descuento de socio (30% al 52%) y conocer cómo afiliarme a HGW Panamá. Mi nombre es:`
  )}`;

  const heroVideo = getHeroVideoForProduct(product);

  const naturalIngredients = filterNaturalIngredients(product.ingredients);

  const ingredientPillars =
    naturalIngredients.length > 0
      ? naturalIngredients.map((ing) => ({
          emoji: getIngredientEmoji(ing),
          title: ing,
          description: `Ingrediente de origen natural seleccionado en ${product.name} para acompañar tu bienestar diario.`,
        }))
      : [
          {
            emoji: getIngredientEmoji(product.name),
            title: 'Componentes Naturales y Bioenergéticos',
            description:
              'Formulación enfocada en bienestar integral con materiales y extractos naturales seleccionados.',
          },
          {
            emoji: '🌿',
            title: 'Origen Natural y Calidad Certificada',
            description:
              'Respaldado por certificaciones internacionales FDA, ISO 9001, GMP y Halal.',
          },
          {
            emoji: '✨',
            title: 'Respaldo Oficial HGW Panamá',
            description:
              'Asesoría directa y entregas seguras en Ciudad de Panamá y todas las provincias.',
          },
        ];

  const productServices = [
    {
      id: 1,
      title: isMembership
        ? `Detalles y Beneficios de ${product.name}`
        : `Descripción y Beneficios de ${product.name}`,
      detail: product.description || product.shortDescription,
      bullets: (product.benefits && product.benefits.length > 0
        ? product.benefits
        : product.advantages || []
      ).slice(0, 4),
      ctaLabel: 'Ver Ficha Completa Abajo',
      ctaHref: '#ficha-producto',
    },
    {
      id: 2,
      title: 'Presentación, Contenido y Ficha Técnica',
      detail: `Presentación oficial de ${product.categoryLabel} con estándares internacionales de calidad e inocuidad.`,
      bullets: [
        product.netContent ? `Contenido neto: ${product.netContent}` : `Categoría: ${product.categoryLabel}`,
        product.presentation ? `Presentación: ${product.presentation}` : 'Producto original sellado de fábrica HGW',
        product.shelfLife ? `Vida útil: ${product.shelfLife}` : 'Respaldo internacional FDA, ISO 9001 y GMP',
      ],
      ctaLabel: 'Ver Ficha Técnica PDF',
      ctaTo: `/documentos/${product.documentSlug || 'catalogo-productos-hgw-panama-2026'}`,
    },
    {
      id: 3,
      title: 'Modo de Uso y Recomendaciones',
      detail:
        product.usage ||
        'Utiliza este producto siguiendo las indicaciones de su empaque y ficha técnica oficial para aprovechar al máximo sus propiedades.',
      bullets: product.precautions
        ? [product.precautions]
        : [
            'Asesoría directa 1 a 1 vía WhatsApp (+507 6778-8375).',
            'Ideal para incorporar en tu rutina diaria de bienestar.',
          ],
      ctaLabel: 'Consultar por WhatsApp',
      ctaHref: productWhatsappUrl,
      external: true,
    },
    {
      id: 4,
      title: 'Envíos en Todo Panamá y Pago por Yappy',
      detail:
        'Entregas confiables en Ciudad de Panamá y todas las provincias en 24 a 48 horas hábiles vía Servientrega o encomienda provincial.',
      bullets: [
        'Pagos cómodos por Yappy (Banco General), ACH o efectivo según zona.',
        'Opción de adquirir como cliente o con descuento de socio (30% a 52%).',
      ],
      ctaLabel: 'Ver Membresías y Descuentos',
      ctaTo: '/membresias',
    },
  ];

  const productHighlightsEight = [
    { name: product.categoryLabel, Icon: Leaf },
    { name: product.inStock ? 'Disponible Panamá' : 'Bajo Pedido', Icon: Package },
    { name: product.netContent || 'Original HGW', Icon: Award },
    { name: product.bv ? `${product.bv.toFixed(2)} BV` : 'Calidad Global', Icon: Zap },
    { name: 'Asesoría 1 a 1', Icon: ShieldCheck },
    { name: 'Envío Servientrega', Icon: Truck },
    { name: '24 a 48 Horas', Icon: Clock },
    { name: 'Pago por Yappy', Icon: CreditCard },
  ];

  const productFaqs = [
    {
      question: `¿Cuál es el precio y cómo puedo comprar ${product.name} en Panamá?`,
      answer: `El precio de ${product.name} es de ${product.priceFormatted} USD. Puedes hacer clic en el botón "Comprar" para ir directo a la tienda oficial o escribirnos por WhatsApp al +507 6778-8375 para coordinar tu entrega.`,
    },
    {
      question: '¿Realizan envíos a domicilio en la ciudad y provincias?',
      answer:
        'Sí. Realizamos entregas en Ciudad de Panamá y envíos a todas las provincias (Panamá Oeste, Chiriquí, Colón, Coclé, Veraguas, Herrera, Los Santos, Bocas del Toro y Darién) vía Servientrega o encomienda en 24 a 48 horas hábiles.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Aceptamos pagos por Yappy (Banco General), transferencias ACH y pago en efectivo contraentrega en áreas seleccionadas de Ciudad de Panamá.',
    },
    {
      question: `¿Cómo obtengo descuento de socio (30% a 52%) al comprar ${product.name}?`,
      answer:
        'Para afiliarte a HGW y comprar con descuento, contacta a la persona que te invitó. Si no tienes patrocinador, puedes registrarte a través del enlace de distribuidora independiente de este sitio y activar tu membresía (Pre-Junior 50 BV, Junior 100 BV, Senior 300 BV o Master 600 BV) para acceder a precios preferenciales desde el 30% hasta el 52% en todo el catálogo.',
    },
  ];

  const { audienceTitle, audiencePoints, reasonsTitle, reasonsPoints } = getAudienceAndReasons(
    product,
    isMembership
  );

  const juniorPlan = MEMBERSHIP_PLANS.find((m) => m.id === 'junior') || MEMBERSHIP_PLANS[1];
  const seniorPlan = MEMBERSHIP_PLANS.find((m) => m.id === 'senior') || MEMBERSHIP_PLANS[2];
  const masterPlan = MEMBERSHIP_PLANS.find((m) => m.id === 'master') || MEMBERSHIP_PLANS[3];
  const showcasePackages = [
    { ...juniorPlan, isHighlighted: false },
    { ...seniorPlan, isHighlighted: false },
    { ...masterPlan, isHighlighted: true },
  ];

  return (
    <div className="bg-white text-black">
      {/* =================================================================
          (2) BANNER A TODO EL ANCHO 21:7 CON LA IMAGEN DEL PRODUCTO
          ================================================================= */}
      <section aria-label={`Banner principal ${product.name}`} className="w-full bg-[#4472C4]">
        <div className="relative w-full aspect-[21/7] min-h-[180px] sm:min-h-[240px] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://media.academiahgw.online/wp-content/uploads/2026/11/Banner-Productos-HGW-1024x682.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#23437D]/88 via-[#4472C4]/75 to-[#23437D]/85 flex items-center justify-center px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-blue-100 mb-1.5">
                {product.categoryLabel} {product.code ? `· Cód. ${product.code}` : ''} · HGW Panamá
              </p>
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
                {product.name}
              </h2>
              <p className="hidden sm:block text-sm md:text-base text-blue-50 font-medium mt-2 max-w-2xl mx-auto line-clamp-2">
                {product.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdsterraResponsiveBanner variant="leaderboard" className="bg-white border-b border-slate-100" />

      {/* =================================================================
          (3) HERO EN 2 COLUMNAS + BOTONES CTA DEBAJO (AFILIADO Y CONTACTO)
          ================================================================= */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-white border-b border-slate-100">
        <img
          src={product.image}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-15 pointer-events-none select-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-white/92 via-white/88 to-[#EEF3FB]/92 pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <nav className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-slate-600 mb-8 overflow-x-auto whitespace-nowrap">
              <Link to="/" className="text-[#00AEEF] hover:text-[#0088CC] underline underline-offset-2 transition-colors">
                Inicio
              </Link>
              <span className="text-slate-300">/</span>
              <Link to="/productos" className="text-[#00AEEF] hover:text-[#0088CC] underline underline-offset-2 transition-colors">
                {product.categoryLabel}
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-black font-black truncate">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Columna Izquierda: Título, Precio, Descripción y Botones CTA */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#EEF3FB] text-[#4472C4] text-xs font-extrabold uppercase tracking-wider">
                    {product.categoryLabel}
                  </span>
                  {product.inStock ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
                      En Stock Panamá
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
                      Consultar Disponibilidad
                    </span>
                  )}
                  {product.category === 'cuidado-bucal' && (
                    <span className="px-3 py-1 rounded-full bg-[#4472C4] text-white text-xs font-extrabold uppercase tracking-wider">
                      Sin Flúor ni Triclosán
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-black tracking-tight leading-tight text-balance">
                  {renderWithHGWLinks(product.name)}
                </h1>

                <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#4472C4] tabular-nums">
                    {product.priceFormatted} <span className="text-base font-bold text-black">USD</span>
                  </span>
                  {product.bv && (
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-black">
                      {product.bv.toFixed(2)} BV
                    </span>
                  )}
                </div>

                <p className="text-base sm:text-[17px] text-black leading-relaxed max-w-xl font-normal">
                  {renderWithHGWLinks(product.shortDescription)}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#4472C4] hover:bg-[#33599E] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#4472C4]/25 hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Comprar en Tienda Oficial</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={productWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-[#EEF3FB] text-[#00AEEF] border border-[#00AEEF]/35 font-extrabold text-sm sm:text-base rounded-2xl shadow-sm transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Pedir por WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Columna Derecha: Tarjeta Visual del Producto + Specs + Botón Comprar Afiliado */}
              <div className="w-full">
                <div className="rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF3FB] text-[#4472C4] text-[11px] font-black uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Producto Original HGW</span>
                    </span>
                    {product.code && (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-600">
                        <Hash className="w-3.5 h-3.5 text-[#4472C4]" />
                        Cód. {product.code}
                      </span>
                    )}
                  </div>

                  <div className="aspect-[4/3] w-full rounded-2xl bg-[#F8FAFC] border border-slate-100 p-4 flex items-center justify-center overflow-hidden group">
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
                  </div>

                  {/* Mini ficha rápida */}
                  {(product.netContent || product.presentation) && (
                    <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
                      {product.netContent && (
                        <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                          <span className="block text-[10px] font-bold uppercase text-slate-500">
                            Contenido
                          </span>
                          <strong className="text-black font-extrabold">{product.netContent}</strong>
                        </div>
                      )}
                      {product.presentation && (
                        <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                          <span className="block text-[10px] font-bold uppercase text-slate-500">
                            Presentación
                          </span>
                          <strong className="text-black font-extrabold line-clamp-1">
                            {product.presentation}
                          </strong>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <a
                      href={registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 bg-[#4472C4] hover:bg-[#33599E] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#4472C4]/25 inline-flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Comprar ({product.priceFormatted} USD)</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Llamado a la Acción debajo del Hero: Link de Afiliado + Contacto */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-200/80">
              <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border border-[#4472C4]/25 shadow-lg flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="text-center md:text-left">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#4472C4] mb-1">
                    Compra Directa o Asesoría Personalizada
                  </p>
                  <h2 className="text-lg sm:text-xl font-black text-black">
                    ¿Listo para adquirir {product.name} o resolver tus dudas?
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md shadow-[#4472C4]/25 hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ir al Link Oficial de Compra</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="#contacto"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-black text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ir a Contacto</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (4) SERVICIOS, ESPECIFICACIONES + 8 CARACTERÍSTICAS (Acordeón animado hacia abajo)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Información Clave y Formas de Compra
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Todo sobre {product.name}: ficha técnica, modo de uso, pagos por Yappy y envíos en Panamá.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <LazyYouTubeEmbed videoId={heroVideo.id} title={heroVideo.title} useNoCookie />
              </div>

              <div className="space-y-4">
                {productServices.map((srv, idx) => {
                  const isSelected = activeServiceIdx === idx;
                  return (
                    <div
                      key={srv.id}
                      className={`rounded-2xl transition-all duration-300 overflow-hidden shadow-sm border ${
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
                          className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-out ${
                            isSelected ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Despliegue suave hacia abajo con CSS grid-rows */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          isSelected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                        aria-hidden={!isSelected}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 sm:px-6 py-4 sm:py-5 bg-white text-black border-t border-slate-200 space-y-3">
                            <p className="text-[17px] leading-relaxed text-black break-words">
                              {renderWithHGWLinks(srv.detail)}
                            </p>
                            {srv.bullets.length > 0 && (
                              <ul className="space-y-2 text-[17px] leading-relaxed text-black">
                                {srv.bullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-2.5 break-words">
                                    <span className="text-[#4472C4] font-black leading-relaxed shrink-0">
                                      •
                                    </span>
                                    <span>{renderWithHGWLinks(bullet)}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {srv.external ? (
                              <a
                                href={srv.ctaHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00AEEF] underline underline-offset-4 hover:text-[#0088CC] pt-1"
                              >
                                <span>{srv.ctaLabel}</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            ) : srv.ctaHref?.startsWith('#') ? (
                              <a
                                href={srv.ctaHref}
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00AEEF] underline underline-offset-4 hover:text-[#0088CC] pt-1"
                              >
                                <span>{srv.ctaLabel}</span>
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            ) : (
                              <Link
                                to={srv.ctaTo || '/productos'}
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00AEEF] underline underline-offset-4 hover:text-[#0088CC] pt-1"
                              >
                                <span>{srv.ctaLabel}</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 8 Destacados en Grid 2 columnas móvil / 4 tablet & escritorio */}
            <div className="mt-12 sm:mt-14 pt-10 border-t border-slate-200/80">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                  Ventajas y Respaldo de Compra en Panamá
                </h3>
                <p className="text-sm sm:text-base text-black mt-1.5 font-normal">
                  Calidad certificada, atención personalizada y envíos seguros a todo el país.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {productHighlightsEight.map(({ name, Icon }) => (
                  <a
                    key={name}
                    href="#ficha-producto"
                    className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#4472C4]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center group"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EEF3FB] text-[#4472C4] group-hover:bg-[#4472C4] group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-300 shadow-2xs">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold text-black group-hover:text-[#00AEEF] transition-colors leading-snug line-clamp-2">
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
          (5) PILARES DEL PRODUCTO: INGREDIENTES CLAVE ILUSTRADOS CON EMOJIS
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Pilares e Ingredientes de {product.name}
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Conoce los ingredientes y componentes principales que hacen única esta fórmula de HGW.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {ingredientPillars.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div
                    className="w-24 h-24 rounded-full bg-[#EEF3FB] border-4 border-white shadow-md flex items-center justify-center text-5xl mb-5 group-hover:scale-105 group-hover:border-[#4472C4]/40 transition-all duration-300 select-none"
                    aria-hidden="true"
                  >
                    {item.emoji}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-black mb-2 leading-snug">
                    {renderWithHGWLinks(item.title)}
                  </h3>
                  <p className="text-sm text-black leading-relaxed max-w-xs font-normal">
                    {renderWithHGWLinks(item.description)}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AdsterraResponsiveBanner variant="in-content" className="bg-white border-b border-slate-100" />

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
                Certificaciones internacionales de calidad, inocuidad y manufactura, junto con las asociaciones de venta directa que respaldan a HGW.
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
                      loading="lazy"
                      decoding="async"
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
                      loading="lazy"
                      decoding="async"
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
          (8) FICHA COMPLETA DEL PRODUCTO (SIN INGREDIENTES REPETIDOS) + RELACIONADOS
          ================================================================= */}
      <section
        id="ficha-producto"
        className="scroll-mt-24 py-14 sm:py-20 bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Ficha Técnica y Especificaciones
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Detalle oficial de {product.name} en Panamá.
              </p>
            </div>

            {/* Tarjeta completa del producto */}
            <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="aspect-square w-full rounded-2xl bg-white border border-slate-100 p-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-4 bg-[#EEF3FB] rounded-2xl border border-[#4472C4]/25 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-black uppercase tracking-wider">
                        Precio Oficial:
                      </span>
                      <span className="text-3xl font-black text-[#4472C4] tabular-nums">
                        {product.priceFormatted} <span className="text-xs font-bold text-black">USD</span>
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#4472C4]/20 flex items-center justify-between text-xs">
                      <span className="text-black font-medium">Descuento de Socio:</span>
                      <span className="text-[#4472C4] font-black">30% a 52% con membresía</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <a
                      href={registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-5 bg-[#4472C4] hover:bg-[#33599E] text-white text-sm font-black rounded-xl shadow-md shadow-[#4472C4]/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Comprar en Tienda Oficial</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href={productWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-5 bg-slate-900 hover:bg-black text-white text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pedir como Cliente ({product.priceFormatted})</span>
                    </a>

                    <a
                      href={partnerWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-5 bg-white hover:bg-[#EEF3FB] text-[#00AEEF] border border-[#00AEEF]/35 text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Comprar como Socio (30% a 52% Descuento)</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  {product.description && (
                    <div>
                      <h3 className="text-xl font-black text-black mb-2">
                        {isMembership ? 'Detalle del Paquete' : 'Descripción'}
                      </h3>
                      <p className="text-[17px] text-black leading-relaxed font-normal">
                        {renderWithHGWLinks(product.description)}
                      </p>
                    </div>
                  )}

                  {product.benefits && product.benefits.length > 0 && (
                    <div>
                      <h3 className="text-xl font-black text-black mb-3">Beneficios Principales</h3>
                      <ul className="space-y-2.5 text-[17px] leading-snug text-black">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 break-words">
                            <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                            <span>{renderWithHGWLinks(benefit)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.advantages && product.advantages.length > 0 && (
                    <div>
                      <h3 className="text-xl font-black text-black mb-3">
                        {isMembership ? 'Bonos y Requisitos' : 'Ventajas Destacadas'}
                      </h3>
                      <ul className="space-y-2 text-[17px] leading-snug text-black">
                        {product.advantages.map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 break-words">
                            <span className="text-[#4472C4] font-black shrink-0">•</span>
                            <span>{renderWithHGWLinks(adv)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.usage && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200">
                      <h3 className="text-lg font-black text-black mb-2">Modo de Uso</h3>
                      <p className="text-[17px] text-black leading-relaxed whitespace-pre-line font-normal">
                        {renderWithHGWLinks(product.usage)}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to={`/documentos/${product.documentSlug || 'catalogo-productos-hgw-panama-2026'}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-sm rounded-xl transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Ver Ficha Técnica en PDF</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {(product.category === 'turmalina' || product.slug.includes('turmalina')) && (
              <div className="mb-14 p-5 sm:p-6 bg-amber-50 border-2 border-amber-400 rounded-2xl text-black text-sm sm:text-base font-bold leading-relaxed space-y-1.5 shadow-sm w-full">
                <span className="text-amber-900 font-black uppercase flex items-center gap-1.5">
                  ⚠️ ADVERTENCIA DE SEGURIDAD CRÍTICA:
                </span>
                <p className="font-medium text-black">
                  Quedan estrictamente prohibidos para las personas que llevan marcapasos en el cuerpo.
                </p>
              </div>
            )}

            {/* Productos Relacionados */}
            {relatedProducts.length > 0 && (
              <div>
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                    Más Productos de {product.categoryLabel}
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-center"
                    >
                      <div>
                        <Link
                          to={`/producto/${rel.slug}`}
                          className="aspect-square w-full rounded-xl sm:rounded-2xl bg-white border border-slate-100 p-3 sm:p-5 flex items-center justify-center overflow-hidden mb-3 sm:mb-4 group"
                        >
                          <img
                            src={rel.image}
                            alt={rel.name}
                            loading="lazy"
                            decoding="async"
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </Link>
                        <div className="text-[10px] sm:text-xs font-bold text-[#4472C4] uppercase tracking-wider mb-1 line-clamp-1">
                          {rel.categoryLabel} · {rel.priceFormatted}
                        </div>
                        <h4 className="text-sm sm:text-base font-extrabold text-black mb-2 line-clamp-2 leading-snug">
                          {rel.name}
                        </h4>
                      </div>

                      <Link
                        to={`/producto/${rel.slug}`}
                        className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all active:scale-95 inline-flex items-center justify-center gap-1.5"
                      >
                        <span>Ver Producto</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

      <AdsterraResponsiveBanner variant="in-content" className="bg-white border-b border-slate-100" />

      {/* =================================================================
          (9) ACERCA DE LA EMPRESA (Con Logo Oficial de HGW)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
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
                  loading="lazy"
                  decoding="async"
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
                    to="/documentos"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Ver Catálogos y Documentos PDF</span>
                  </Link>
                  <Link
                    to="/oficinas"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#EEF3FB] text-[#00AEEF] border border-[#00AEEF]/30 font-bold text-sm rounded-2xl transition-all"
                  >
                    <span>Oficinas Panamá y LATAM</span>
                  </Link>
                </div>
              </div>

              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <LazyYouTubeEmbed
                  videoId="oOZhonOYD6Q"
                  title="Presentación Corporativa HGW"
                  useNoCookie
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (10) OPORTUNIDAD
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Oportunidad y Descuentos para Socios
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="aspect-[3/2] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <LazyYouTubeEmbed
                  videoId="Poy4FvvfcfA"
                  title="Tutorial Oficial de Registro y Oportunidad HGW"
                  useNoCookie
                />
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <h3 className="text-2xl sm:text-3xl font-black text-black leading-tight">
                  Gana hasta un <span className="text-[#4472C4]">52% de beneficio</span> con el Plan de Ganancias Mutuas
                </h3>

                <p className="text-base text-black leading-relaxed font-normal">
                  En HGW tú decides cómo crecer. Para afiliarte, contacta a la persona que te invitó. Si llegaste por tu cuenta y no tienes patrocinador, puedes registrarte a través de este portal independiente para adquirir {product.name} y todo el catálogo con descuentos desde el 30% hasta el 52%.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Link
                    to="/oportunidad-de-negocio"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <span>Ver Plan de Negocio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/preregistro"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EEF3FB] hover:bg-[#dbe6f8] text-[#4472C4] border border-[#4472C4]/30 font-bold text-sm rounded-2xl transition-all"
                  >
                    <span>¿Cómo me afilio a HGW?</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (11) GUÍAS EDUCATIVAS (4 COLUMNAS)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Guías Educativas y Recursos HGW
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Aprende más sobre nuestros ingredientes ancestrales, formulaciones y documentación técnica.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EDUCATIONAL_GUIDES.map((guide, idx) => (
                <Link
                  key={idx}
                  to={guide.to}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-100 mb-4">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp';
                      }}
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-black group-hover:text-[#00AEEF] transition-colors mb-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-black leading-relaxed font-normal">{guide.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#00AEEF] underline underline-offset-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Leer guía completa</span>
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AdsterraSmartlinkCard className="bg-[#F8FAFC] border-b border-slate-100" />

      {/* =================================================================
          (12) PREGUNTAS FRECUENTES (Acordeón animado hacia abajo, texto 17px negro)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Preguntas Frecuentes
              </h2>
              <p className="text-sm sm:text-base text-black mt-2.5 font-normal">
                Respuestas rápidas sobre {product.name}, pagos por Yappy, envíos y membresías en Panamá.
              </p>
            </div>

            <div className="space-y-4">
              {productFaqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden shadow-sm border border-[#4472C4]/25 bg-white transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full py-4 px-4 sm:px-6 bg-[#4472C4] hover:bg-[#33599E] text-white text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-out ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                      aria-hidden={!isOpen}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 sm:px-6 py-4 sm:py-5 text-[17px] text-black leading-relaxed bg-white border-t border-slate-100 font-normal break-words">
                          {renderWithHGWLinks(faq.answer)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =================================================================
          (12.5) ¿PARA QUIÉN ESTÁ DIRIGIDO? Y ¿POR QUÉ EMPEZAR A TOMARLO/USARLO?
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {/* Columna 1: Para quién está dirigido */}
              <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF3FB] text-[#4472C4] flex items-center justify-center mb-5">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight">
                    {audienceTitle}
                  </h2>
                  <ul className="space-y-3.5 text-[17px] text-black leading-relaxed">
                    {audiencePoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                        <span>{renderWithHGWLinks(point)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Columna 2: Por qué deberías empezar a tomarlo / usarlo */}
              <div className="bg-gradient-to-br from-[#EEF3FB] via-white to-white rounded-3xl p-6 sm:p-9 border-2 border-[#4472C4]/30 shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#4472C4] text-white flex items-center justify-center mb-5 shadow-sm">
                    <ThumbsUp className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight">
                    {reasonsTitle}
                  </h2>
                  <ul className="space-y-3.5 text-[17px] text-black leading-relaxed mb-6">
                    {reasonsPoints.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                        <span>{renderWithHGWLinks(reason)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 bg-[#4472C4] hover:bg-[#33599E] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md shadow-[#4472C4]/25 inline-flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Empezar Ahora</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="#contacto"
                    className="py-3.5 px-6 bg-white hover:bg-[#EEF3FB] text-[#00AEEF] border border-[#00AEEF]/35 font-extrabold text-sm sm:text-base rounded-2xl inline-flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Consultar</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
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
                Elige los productos de tu preferencia en cada paquete. Diamante es un rango de liderazgo, no una membresía de ingreso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {showcasePackages.map((pkg) => {
                const pkgWhatsAppText = encodeURIComponent(
                  `¡Hola! Estaba viendo ${product.name} y quería preguntar sobre cómo afiliarse a HGW Panamá con el paquete "${pkg.name}" (${pkg.bv}). Mi nombre es:`
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
                          loading="lazy"
                          decoding="async"
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

                      <h3 className="text-2xl font-black text-black">{pkg.name}</h3>

                      <div className="text-3xl font-black text-[#4472C4] mt-2 mb-3 tabular-nums">
                        {pkg.priceEstimate}
                      </div>

                      <p className="text-sm sm:text-base text-black leading-relaxed mb-5 font-normal">
                        {pkg.description}
                      </p>

                      <ul className="space-y-2.5 text-left text-[17px] leading-snug text-black mb-6 border-t border-slate-100 pt-4">
                        <li className="flex items-start gap-2.5 break-words">
                          <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                          <span>
                            Bono Inicio Rápido: <strong>{pkg.fastStartBonus}</strong>
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5 break-words">
                          <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                          <span>
                            Bono Equipo: <strong>{pkg.teamBonus}</strong>
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5 break-words">
                          <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                          <span>
                            Tope Diario: <strong>{pkg.dailyEarningsCap}</strong>
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5 break-words">
                          <Check className="w-5 h-5 text-[#4472C4] shrink-0 mt-1" />
                          <span>
                            Venta Directa: <strong>{pkg.directSaleProfit}</strong>
                          </span>
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
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00AEEF] underline underline-offset-4 hover:text-[#0088CC]"
              >
                <span>Ver las 4 membresías oficiales (incluyendo Pre-Junior 50 BV)</span>
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
                  loading="lazy"
                  decoding="async"
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
                  <span>Distribuidora Independiente</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-black leading-tight">
                  Atención y Asesoría Personalizada · Panamá
                </h3>
                <p className="text-base text-black leading-relaxed font-normal">
                  Este portal es administrado de forma independiente para brindar información sobre productos y bienestar. Te oriento con transparencia sobre cada producto y te acompaño en tus dudas. Realizamos entregas confiables a través de Servientrega en todo Panamá. Si deseas afiliarte, recuerda contactar primero a la persona que te invitó; si no tienes patrocinador, con gusto puedo orientarte en el proceso.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#4472C4]/25 hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://www.hgwpanama.com/producto/${product.slug}`
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
                  `https://www.hgwpanama.com/producto/${product.slug}`
                )}&text=${encodeURIComponent(`${product.name} - HGW Panamá`)}`}
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
          (15) CONTACTO (Formulario + Mapa de Panamá)
          ================================================================= */}
      <ContactSection />
    </div>
  );
};
