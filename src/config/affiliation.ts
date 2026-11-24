/**
 * Configuración centralizada de Afiliación y Contacto Independiente
 * Permite actualizar el enlace de afiliación y los datos de contacto
 * de la administradora en un solo lugar sin buscar en todo el código.
 */

export const AFFILIATION_CONFIG = {
  // Enlace de afiliación alternativo (solo para quien no tiene patrocinador)
  affiliateUrl: 'https://www.healthgreenworld.com/?userName=Yamilka507',
  sponsorCode: 'Yamilka507',
  administratorName: 'Yamilka Batista',

  // Enlace a la sección de contacto
  contactSectionUrl: 'https://www.hgwpanama.com/#contacto',
  contactSectionPath: '/#contacto',

  // Contacto directo de la administradora
  phone: '+507 6778-8375',
  phoneClean: '50767788375',
  email: 'hgwpanama507g@gmail.com',

  // Mensaje principal oficial sobre cómo afiliarse
  primaryNotice:
    'Para afiliarte a HGW, contacta a la persona que te invitó. Ella será tu patrocinador y te guiará en el proceso.',

  // Mensaje secundario (para quien llegó por cuenta propia y NO tiene patrocinador)
  secondaryNotice:
    'Si llegaste por tu cuenta y no tienes quien te patrocine, puedes afiliarte a través de mi enlace: https://www.healthgreenworld.com/?userName=Yamilka507. También puedes contactarme directamente en https://www.hgwpanama.com/#contacto.',

  // Aviso de independencia obligatorio
  independenceDisclaimer:
    'Este es un sitio informativo independiente. No es el sitio oficial de HGW ni está administrado por la empresa. La información se basa en materiales públicos y documentos de referencia.',
} as const;
