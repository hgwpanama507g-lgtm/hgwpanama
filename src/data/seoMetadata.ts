import { PRODUCTS } from './products';
import { HGW_DOCUMENTS } from './documents';

export interface SeoMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'website' | 'article' | 'product';
  siteName: string;
  keywords?: string;
  product?: {
    name: string;
    price: number;
    currency: string;
    image: string;
    description: string;
    inStock: boolean;
  };
}

export const PRODUCT_SLUG_ALIASES: Record<string, string> = {
  'blueberry-coffee-hgw': 'blueberry-coffee',
  'cafe-soluble-de-ganoderma': 'ganoderma-soluble-coffee',
  'cafe-trebol': 'trebol-coffee',
  'cafe-de-ashwagandha': 'ashwaganda-coffee',
  'blacktea-coffee': 'black-tea-coffee',
  'berry-juice-high-vc': 'berry-juice',
  'fresh-drink-chang-jing-jing': 'bebida-digestiva-chang-jing-jing',
  'vino-de-arandanos': 'blueberry-wine',
  'blueberry-candy': 'caramelos-de-arandano',
  'mermelada-de-arandanos': 'mermelada-frutada',
  'pasta-dental-turmalina-negra': 'pasta-dental-de-turmalina-negra',
  'plantillas-de-turmalina': 'plantilla-de-turmalina',
  'protector-de-cuello-autocalentable-turmalina': 'protector-de-cuello-de-turmalina',
  'protector-intimo-diario-turmalina': 'enjoyable-panty-liner',
  'toalla-sanitaria-dia-turmalina': 'enjoyable-day-use',
  'toalla-sanitaria-noche-turmalina': 'enjoyable-night-use',
  'press-on-nails-unas-acrilicas': 'press-on-nails',
  'capsula-spirulina-plus': 'spirulina-plus',
  'peptido-de-colageno-de-arandano': 'peptido-de-colageno-y-arandanos',
  'tourmaline-thermo-waterson': 'thermo-de-turmalina',
  'vaso-termico-hgw': 'vaso-termico',
  'taza-de-cafe-termica-hgw': 'coffee-cup',
  'collar-de-turmalina-no-2': 'collar-de-turmalina',
  'pulsera-de-turmalina-no-33': 'pulsera-de-turmalina',
};

export function findProductBySlug(slug: string) {
  const normalized = slug.trim().replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!normalized) return undefined;
  const targetSlug = PRODUCT_SLUG_ALIASES[normalized] || normalized;
  return PRODUCTS.find(
    (p) =>
      p.slug.toLowerCase() === targetSlug ||
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === targetSlug ||
      p.id.toLowerCase() === normalized ||
      (p.code && p.code.toLowerCase() === normalized)
  );
}

const DEFAULT_IMAGE = 'https://media.academiahgw.online/wp-content/uploads/2026/11/LOGO-HGW-PANAMA-DISTRIBUIDOR-INDEPENDIENTE.png';
const BASE_URL = 'https://www.hgwpanama.com';

export const SHIPPING_AND_RETURNS_POLICY = {
  sectionTitle: 'Envíos y devoluciones',
  shippingLine: 'Envíos solo a Panamá, desde USD 5.00.',
  deliveryTimeLine:
    'Tiempo estimado de entrega: de 24 a 48 horas después de confirmado el pedido, sin contar sábados ni días feriados.',
  returnConditionsLine: 'Condiciones de devolución: consultar con el fabricante.',
  otherCountriesLine: 'Para otros países, regístrate en el siguiente enlace de referido:',
  registerUrl: 'https://www.healthgreenworld.com/?userName=Yamilka507',
  shippingRateUsd: '5.00',
  destinationCountry: 'PA',
  handlingDaysMin: 0,
  handlingDaysMax: 1,
  transitDaysMin: 1,
  transitDaysMax: 2,
  returnPolicyCategory: 'https://schema.org/MerchantReturnUnspecified'
} as const;

export const PRODUCT_OFFER_SHIPPING_DETAILS = {
  "@type": "OfferShippingDetails",
  "shippingRate": {
    "@type": "MonetaryAmount",
    "value": SHIPPING_AND_RETURNS_POLICY.shippingRateUsd,
    "currency": "USD"
  },
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": SHIPPING_AND_RETURNS_POLICY.destinationCountry
  },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": {
      "@type": "QuantitativeValue",
      "minValue": SHIPPING_AND_RETURNS_POLICY.handlingDaysMin,
      "maxValue": SHIPPING_AND_RETURNS_POLICY.handlingDaysMax,
      "unitCode": "DAY"
    },
    "transitTime": {
      "@type": "QuantitativeValue",
      "minValue": SHIPPING_AND_RETURNS_POLICY.transitDaysMin,
      "maxValue": SHIPPING_AND_RETURNS_POLICY.transitDaysMax,
      "unitCode": "DAY"
    }
  }
} as const;

export const PRODUCT_OFFER_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": SHIPPING_AND_RETURNS_POLICY.destinationCountry,
  "returnPolicyCategory": SHIPPING_AND_RETURNS_POLICY.returnPolicyCategory
} as const;

export function buildProductJsonLd(seo: SeoMetadata) {
  if (!seo.product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": seo.product.name,
    "image": seo.product.image,
    "description": seo.product.description,
    "brand": {
      "@type": "Brand",
      "name": "HGW"
    },
    "offers": {
      "@type": "Offer",
      "price": seo.product.price.toFixed(2),
      "priceCurrency": seo.product.currency,
      "availability": `https://schema.org/${seo.product.inStock ? 'InStock' : 'PreOrder'}`,
      "url": seo.url,
      "shippingDetails": PRODUCT_OFFER_SHIPPING_DETAILS,
      "hasMerchantReturnPolicy": PRODUCT_OFFER_RETURN_POLICY
    }
  };
}

export function getSeoMetadata(pathname: string): SeoMetadata {
  const cleanPath = (pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/').toLowerCase();

  // 1. Home
  if (cleanPath === '/' || cleanPath === '/inicio') {
    return {
      title: 'HGW Panamá - Distribuidores Independientes',
      description: 'Catálogo oficial de productos naturales, membresías, oportunidad de negocio y contacto con distribuidores autorizados de HGW en Panamá.',
      image: 'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp',
      url: `${BASE_URL}/`,
      type: 'website',
      siteName: 'HGW Panamá',
      keywords: 'HGW Panamá, productos HGW, café con arándanos, turmalina, ganoderma, colágeno, salud y bienestar Panamá'
    };
  }

  // 2. Full Products Catalog
  if (cleanPath === '/productos' || cleanPath === '/catalogo') {
    return {
      title: 'Catálogo de Productos – HGW Panamá',
      description: 'Conoce todos los productos oficiales de HGW en Panamá: cafés saludables, suplementos, accesorios de turmalina, cuidado bucal y cuidado personal.',
      image: 'https://media.academiahgw.online/wp-content/uploads/2026/11/Banner-Productos-HGW-1024x682.jpg',
      url: `${BASE_URL}/productos`,
      type: 'website',
      siteName: 'HGW Panamá'
    };
  }

  // 3. Pastas Dentales Landing Page
  if (cleanPath === '/pastas-dentales' || cleanPath === '/pastas') {
    return {
      title: 'Pastas Dentales HGW - 100% Sin Flúor ni Triclosán – HGW Panamá',
      description: 'Dentífricos naturales con probióticos y nanoturmalina 100% sin flúor ni triclosán. Simulador 50 BV con 30% de descuento al por mayor, pagos por Yappy y envíos por Servientrega.',
      image: 'https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta-dental-con-probioticos-HGW.jpg',
      url: `${BASE_URL}/pastas-dentales`,
      type: 'website',
      siteName: 'HGW Panamá',
      keywords: 'pasta dental sin fluor Panama, pasta dental sin triclosan, pasta dental probioticos HGW, pasta de turmalina, simulador 50 bv hgw, envios servientrega yappy panama'
    };
  }

  // 4. Memberships Page
  if (cleanPath === '/membresias' || cleanPath === '/membresías') {
    return {
      title: 'Planes de Membresía y Activación – HGW Panamá',
      description: 'Descubre los planes Pre-Junior, Junior, Senior y Master de HGW en Panamá. Accede a precios con descuento de distribuidor y plan de compensación mutuo.',
      image: 'https://media.academiahgw.online/wp-content/uploads/2026/11/master-600-bv-hgw.png',
      url: `${BASE_URL}/membresias`,
      type: 'website',
      siteName: 'HGW Panamá'
    };
  }

  // 5. Business Opportunity
  if (cleanPath === '/oportunidad-de-negocio' || cleanPath === '/oportunidad') {
    return {
      title: 'Oportunidad de Negocio y Plan Mutuo – HGW Panamá',
      description: 'Emprende con HGW Panamá. Conoce el revolucionario Plan Mutuo, bonos por equipo, recompras y ventas directas con respaldo internacional.',
      image: 'https://media.academiahgw.online/wp-content/uploads/2026/11/Banner-HGW.jpg',
      url: `${BASE_URL}/oportunidad-de-negocio`,
      type: 'website',
      siteName: 'HGW Panamá'
    };
  }

  // 6. Pre-Registration
  if (cleanPath === '/preregistro' || cleanPath === '/pre-registro') {
    return {
      title: 'Pre-registro Oficial de Nuevos Socios – HGW Panamá',
      description: 'Video tutorial paso a paso y enlace de registro oficial con el código de referido autorizado en Health Green World Panamá.',
      image: 'https://media.academiahgw.online/wp-content/uploads/2026/11/LOGO-HGW-PANAMA-BLANCO-TRANSPARENTE.png',
      url: `${BASE_URL}/preregistro`,
      type: 'website',
      siteName: 'HGW Panamá'
    };
  }

  // 7. Official Documents
  if (cleanPath === '/documentos' || cleanPath === '/documentos-pdf') {
    return {
      title: 'Documentos y Catálogos Oficiales en PDF – HGW Panamá',
      description: 'Descarga catálogos oficiales, listas de precios, fichas técnicas de productos y presentaciones de negocio de HGW en formato PDF.',
      image: 'https://media.academiahgw.online/wp-content/uploads/2026/11/CATALOGO_PANAMA_2026_pagina1.png',
      url: `${BASE_URL}/documentos`,
      type: 'website',
      siteName: 'HGW Panamá'
    };
  }

  // 8. Offices Directory
  if (cleanPath === '/oficinas' || cleanPath === '/directorio-oficinas') {
    return {
      title: 'Directorio de Oficinas y Centros de Apoyo – HGW Panamá',
      description: 'Direcciones, teléfonos y horarios de las oficinas corporativas y centros autorizados de HGW en Panamá y Latinoamérica.',
      image: DEFAULT_IMAGE,
      url: `${BASE_URL}/oficinas`,
      type: 'website',
      siteName: 'HGW Panamá'
    };
  }

  // 9. Raw Materials / Functional Ingredients Info
  if (['/informacion', '/propiedades', '/beneficios', '/ingredientes'].includes(cleanPath)) {
    return {
      title: 'Materias Primas: Arándanos, Turmalina, Café y Reishi – HGW Panamá',
      description: 'Información botánica, científica y funcional sobre los superalimentos y minerales clave de HGW: Arándano azul, Turmalina, Café arábica y Hongo Reishi.',
      image: 'https://media.academiahgw.online/wp-content/uploads/2026/11/Turmalina-1024x640.jpg',
      url: `${BASE_URL}/informacion`,
      type: 'article',
      siteName: 'HGW Panamá'
    };
  }

  // 10. Contact
  if (cleanPath === '/contacto') {
    return {
      title: 'Contacto y Asesoría Oficial – HGW Panamá',
      description: 'Comunícate con distribuidores independientes autorizados de HGW en Panamá vía WhatsApp y teléfono para pedidos, membresías y soporte.',
      image: DEFAULT_IMAGE,
      url: `${BASE_URL}/contacto`,
      type: 'website',
      siteName: 'HGW Panamá'
    };
  }

  // 10.1. Shipping & Returns
  if (cleanPath === '/envios-y-devoluciones' || cleanPath === '/envios') {
    return {
      title: 'Envíos y Devoluciones – HGW Panamá',
      description: 'Envíos solo a Panamá desde USD 5.00 con entrega de 24 a 48 horas hábiles. Condiciones de devolución y registro internacional.',
      image: DEFAULT_IMAGE,
      url: `${BASE_URL}/envios-y-devoluciones`,
      type: 'website',
      siteName: 'HGW Panamá'
    };
  }

  // 11. Individual Document Detail (/documentos/:slug)
  if (cleanPath.startsWith('/documentos/')) {
    const docSlug = cleanPath.replace('/documentos/', '').split('?')[0].split('#')[0];
    const doc = HGW_DOCUMENTS.find(d => d.slug === docSlug || d.id === docSlug || d.url.includes(docSlug));
    if (doc) {
      return {
        title: `${doc.title} – HGW Panamá`,
        description: doc.description || `Descarga en PDF: ${doc.title} de HGW Panamá (${doc.size}).`,
        image: doc.coverImageUrl || DEFAULT_IMAGE,
        url: `${BASE_URL}/documentos/${doc.slug}`,
        type: 'article',
        siteName: 'HGW Panamá'
      };
    }
  }

  // 12. Individual Product Detail (/producto/:slug or /productos/:slug or /:slug)
  const productSlug = cleanPath.startsWith('/producto/')
    ? cleanPath.replace('/producto/', '')
    : cleanPath.startsWith('/productos/')
    ? cleanPath.replace('/productos/', '')
    : cleanPath.replace(/^\//, '');

  const product = findProductBySlug(productSlug);
  if (product) {
    const desc = product.shortDescription || (product.description ? product.description.slice(0, 155) : '') || `Conoce ${product.name} de HGW Panamá. Precio: ${product.priceFormatted}.`;
    return {
      title: `${product.name} – HGW Panamá`,
      description: desc,
      image: product.image || DEFAULT_IMAGE,
      url: `${BASE_URL}/producto/${product.slug}`,
      type: 'product',
      siteName: 'HGW Panamá',
      keywords: `${product.name}, HGW Panamá, comprar ${product.name}, precio ${product.name}, ${product.categoryLabel}`,
      product: {
        name: product.name,
        price: product.price,
        currency: 'USD',
        image: product.image,
        description: desc,
        inStock: product.inStock
      }
    };
  }

  // Fallback
  return {
    title: 'HGW Panamá - Distribuidores Independientes',
    description: 'Catálogo de productos naturales, membresías y contacto con distribuidores independientes autorizados de HGW en Panamá.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}${cleanPath}`,
    type: 'website',
    siteName: 'HGW Panamá'
  };
}
