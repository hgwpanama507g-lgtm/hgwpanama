export const DISTRIBUTOR_WHATSAPP_NUMBER = "50767788375";
export const CORPORATE_OFFICE_PHONE = "+507 392-8415";

/**
 * Generates the WhatsApp URL with the exact message requested by the user:
 * «¡Hola! Estaba visitando tu tienda online (URL de la página) y quería preguntar sobre cómo afiliarse a HGW Panamá. Mi nombre es:»
 */
export const getAffiliationWhatsAppUrl = (customUrl?: string): string => {
  let pageUrl = customUrl;
  if (!pageUrl && typeof window !== 'undefined') {
    pageUrl = window.location.href;
  }
  if (!pageUrl) {
    pageUrl = 'https://hgwpanama.com';
  }

  const message = `¡Hola! Estaba visitando tu tienda online (${pageUrl}) y quería preguntar sobre cómo afiliarse a HGW Panamá. Mi nombre es:`;
  return `https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
