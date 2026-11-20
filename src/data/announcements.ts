import { DISTRIBUTOR_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const ANNOUNCEMENT_DISTRIBUTOR = {
  name: 'Yamilka Batista',
  sponsorCode: 'Yamilka507',
  whatsappDisplay: '+507 6778-8375',
  whatsappNumber: DISTRIBUTOR_WHATSAPP_NUMBER,
  registrationUrl: 'https://www.healthgreenworld.com/?userName=Yamilka507',
} as const;

export interface AnnouncementItem {
  id: string;
  badge: string;
  dateLabel?: string;
  headline: string;
  paragraphs: string[];
  imageUrl: string;
  /** Título persuasivo para la imagen (25 a 30 caracteres) */
  imageTitle: string;
  imageAlt: string;
  ctaTitle: string;
  ctaSubtitle: string;
  whatsappPrefill: string;
  productSlug?: string;
  productButtonLabel?: string;
}

/**
 * Lista de anuncios promocionales y novedades HGW Panamá.
 * Para subir más contenido en el futuro, agrega un nuevo objeto al inicio o final de este arreglo.
 */
export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'tourmaline-insoles-hgw',
    badge: 'Producto Destacado',
    headline: '👣✨ ¡COMODIDAD QUE TE ACOMPAÑA EN CADA PASO!',
    paragraphs: [
      'Cada día es una nueva oportunidad para seguir avanzando, ¡hazlo con comodidad y confianza! 💚',
      '🌿 Con las Tourmaline Healthcare Insoles HGW, dale a tus pies un toque especial de confort para acompañarte en tus actividades diarias.',
      '💫 ¡Porque cada paso merece sentirse bien!',
    ],
    imageUrl: '/assets/aistudio/image_b607f677.png',
    // 28 caracteres (rango requerido: 25 a 30 caracteres)
    imageTitle: '¡Confort total en cada paso!',
    imageAlt: 'Plantillas de Turmalina HGW - Comodidad al caminar y confort para pies',
    ctaTitle: 'Contacto directo para compras o afiliaciones',
    ctaSubtitle:
      'Adquiere tus Plantillas de Turmalina HGW con envío a todo Panamá o regístrate como socio distribuidor para obtener precios preferenciales.',
    whatsappPrefill:
      '¡Hola Yamilka! Vi el anuncio de las Tourmaline Healthcare Insoles (Plantillas de Turmalina HGW) en hgwpanama.com y deseo información para comprar o afiliarme. Mi nombre es:',
    productSlug: 'plantilla-de-turmalina',
    productButtonLabel: 'Ver ficha de Plantillas HGW',
  },
  {
    id: 'thermo-waterson-hgw',
    badge: 'Producto Destacado',
    headline: '💧✨ ¡HIDRÁTATE CON ESTILO EN CADA MOMENTO!',
    paragraphs: [
      'Tu día está lleno de movimiento, y tener tu bebida favorita cerca hace la diferencia. 💙',
      '🌿 Con el Thermo Waterson HGW, disfruta de la practicidad y comodidad de llevar tus bebidas a donde vayas.',
      '🌟 ¡Un compañero ideal para tu rutina diaria!',
    ],
    imageUrl: '/assets/aistudio/image_45258fc5.png',
    // 28 caracteres (rango requerido: 25 a 30 caracteres)
    imageTitle: '¡Tu bebida siempre perfecta!',
    imageAlt: 'Thermo de Turmalina Waterson HGW - Mantén tu bebida en su temperatura ideal',
    ctaTitle: 'Contacto directo para compras o afiliaciones',
    ctaSubtitle:
      'Adquiere tu Thermo Waterson HGW con envío a todo Panamá o regístrate como socio distribuidor para obtener precios preferenciales.',
    whatsappPrefill:
      '¡Hola Yamilka! Vi el anuncio del Thermo Waterson HGW en hgwpanama.com y deseo información para comprar o afiliarme. Mi nombre es:',
    productSlug: 'thermo-de-turmalina',
    productButtonLabel: 'Ver ficha del Thermo Waterson',
  },
];
