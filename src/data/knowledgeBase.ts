import { PRODUCTS } from './products.js';

export interface KnowledgeItem {
  category: string;
  title: string;
  content: string;
}

export const getSiteKnowledgeBase = (): string => {
  let kb = `=== INFORMACIÓN GENERAL DEL SITIO HGW PANAMÁ (SOCIO INDEPENDIENTE YAMILKA 507) ===\n`;
  kb += `Este sitio NO es de HGW Corporativo. Es operado por un Socio Comercial Independiente.\n`;
  kb += `Enlace de afiliación oficial: https://www.healthgreenworld.com/?userName=Yamilka507\n`;
  kb += `Teléfono de WhatsApp del distribuidor: +507 6778-8375\n`;
  kb += `Oficina física principal en Panamá (corporativa): Avenida Porras, Plaza Royal Blue, Local No. 6, San Francisco, Ciudad de Panamá. Teléfono: +507 392-8415.\n\n`;

  kb += `=== PLAN DE NEGOCIO Y MEMBRESÍAS ===\n`;
  kb += `- Afiliación: Para registrarse y unirse como socio distribuidor, se usa el link de referido: https://www.healthgreenworld.com/?userName=Yamilka507\n`;
  kb += `- Paquetes de Activación (Prejunior, Junior, Senior y Master): Tienen 30% de descuento en su compra inicial.\n`;
  kb += `- Recompras: En recompra, solo el nivel Master compra con 52% de descuento. Se requieren recompras mínimas de 10 puntos mensuales, todos los meses, equivalentes aproximadamente a 25 dólares en productos de libre elección.\n`;
  kb += `- Importante para socios actuales: Si el visitante ya es socio, indícale amablemente que se comunique con su patrocinador o con el número de oficina (+507 392-8415) o su oficina de registro. No resolver trámites internos ni pedir registro nuevamente.\n\n`;

  kb += `=== CATÁLOGO DE PRODUCTOS HGW (PRECIOS PÚBLICOS) ===\n`;
  PRODUCTS.forEach((p) => {
    kb += `- ${p.name} | Categoría: ${p.categoryLabel} | Precio Público: ${p.priceFormatted} | Presentación: ${p.presentation}\n`;
    kb += `  Descripción: ${p.shortDescription || p.description}\n`;
    if (p.benefits && p.benefits.length > 0) {
      kb += `  Beneficios: ${p.benefits.join('; ')}\n`;
    }
    if (p.ingredients && p.ingredients.length > 0) {
      kb += `  Ingredientes: ${p.ingredients.join(', ')}\n`;
    }
    kb += `\n`;
  });

  kb += `=== PAUTAS Y RESTRICCIONES CLAVE ===\n`;
  kb += `- Nunca prometer ingresos económicos garantizados ni resultados milagrosos de salud.\n`;
  kb += `- No dar consejos médicos ni prometer curas. Ante temas de salud, recomendar siempre consultar a un profesional médico.\n`;
  kb += `- Si el usuario pregunta algo que no está en la base de conocimiento o requiere atención personalizada, indícale amablemente que lo consultarás y pídele su nombre y teléfono (con código de país) para que el administrador le dé seguimiento directo.\n`;

  return kb;
};
