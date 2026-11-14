export const DISCLAIMER_MEDICO = 'Estos productos no sustituyen consejo médico.';

export const POLITICA_ENVIOS_RESUMEN =
  'Envíos solo a Panamá, desde USD 5.00, entrega de 24 a 48 horas después de confirmado el pedido, sin contar sábados ni días feriados. Devoluciones: consultar con el fabricante.';

export interface DistributorProfile {
  nombre: string;
  whatsapp: string;
  correo: string;
  link_registro: string;
  link_video: string;
  urls_videos: string;
  link_grupo: string;
  youtube: string;
  link_zoom: string;
}

export const EMPTY_DISTRIBUTOR_PROFILE: DistributorProfile = {
  nombre: '',
  whatsapp: '',
  correo: '',
  link_registro: '',
  link_video: '',
  urls_videos: '',
  link_grupo: '',
  youtube: '',
  link_zoom: '',
};

export function applyDistributorVariables(
  template: string,
  profile: DistributorProfile
): string {
  const nombre = profile.nombre.trim() || '[Tu nombre]';
  const whatsapp = profile.whatsapp.trim() || '[Tu WhatsApp]';
  const correo = profile.correo.trim() || '[Tu correo]';
  const linkRegistro = profile.link_registro.trim() || '[Tu link de registro]';
  const linkVideo =
    profile.link_video.trim() || profile.youtube.trim() || '[Tu link de video]';
  const linkGrupo =
    profile.link_grupo.trim() || '[Link de tu grupo o canal de WhatsApp]';
  const linkZoom = profile.link_zoom.trim() || '[Tu link de Zoom]';
  const youtube = profile.youtube.trim() || '[Tu canal de YouTube]';

  return template
    .replace(/\{\{nombre\}\}/g, nombre)
    .replace(/\{\{whatsapp\}\}/g, whatsapp)
    .replace(/\{\{correo\}\}/g, correo)
    .replace(/\{\{link_registro\}\}/g, linkRegistro)
    .replace(/\{\{link_video\}\}/g, linkVideo)
    .replace(/\{\{link_grupo\}\}/g, linkGrupo)
    .replace(/\{\{link_zoom\}\}/g, linkZoom)
    .replace(/\{\{youtube\}\}/g, youtube);
}

export interface TrainingScript {
  id: string;
  category: string;
  title: string;
  context: string;
  text: string;
}

// 1. Guiones de invitación, presentación y cierre de negocio
export const BUSINESS_SCRIPTS: TrainingScript[] = [
  {
    id: 'inv-conocido',
    category: 'Invitación',
    title: 'Invitación a conocido o amigo cercano',
    context: 'Ideal para contactos de confianza en WhatsApp.',
    text: `¡Hola! Te saluda {{nombre}}. ¿Cómo has estado?
Te escribo porque estoy desarrollando un proyecto de bienestar y consumo inteligente en Panamá con HGW y pensé en ti. Tienen productos de uso diario (cafés funcionales, cuidado personal, pastas dentales sin flúor y accesorios de turmalina) y un plan de expansión muy interesante.

Si te parece, te comparto un video corto para que lo veas sin compromiso y me cuentas qué te parece. ¿Te lo envío por aquí?`
  },
  {
    id: 'inv-estado-redes',
    category: 'Invitación',
    title: 'Respuesta a quien preguntó en estados o redes',
    context: 'Cuando alguien comenta "Info" o responde tu estado.',
    text: `¡Hola! Gracias por escribirme, te saluda {{nombre}}.
Con gusto te comparto la información. En HGW trabajamos con productos naturales de apoyo al bienestar y una oportunidad de negocio que puedes hacer desde tu celular o presencial en Panamá.

Primero mira este video breve donde se explica cómo funciona:
{{link_video}}

Cuando termines de verlo escríbeme aquí a mi WhatsApp {{whatsapp}} y resolvemos cualquier duda.`
  },
  {
    id: 'inv-consumo-inteligente',
    category: 'Invitación',
    title: 'Invitación enfocada en consumo con descuento',
    context: 'Para personas interesadas primero en los productos.',
    text: `¡Hola! Soy {{nombre}}.
¿Sabías que con HGW puedes adquirir tus productos de uso diario (cafés, cuidado bucal sin flúor, suplementos y más) con descuento de socio desde tu primera activación, y si deseas, recomendar la marca para generar ingresos adicionales?

Si quieres conocer cómo funcionan los paquetes en Panamá, te invito a nuestra comunidad de información aquí: {{link_grupo}} o escríbeme al {{whatsapp}}.`
  },
  {
    id: 'pres-oportunidad',
    category: 'Presentación',
    title: 'Presentación rápida del negocio y Plan Mutuo',
    context: 'Resumen claro para enviar por WhatsApp después de mostrar interés.',
    text: `Te comparto un resumen claro de cómo trabajamos con HGW en Panamá:

1) Productos reales de alta rotación: cafés saludables, bebidas funcionales, cuidado bucal sin flúor, suplementos y línea de turmalina.
2) Activación con productos a tu elección: eliges los productos de tu preferencia según el paquete (Pre-Junior 50 BV, Junior 100 BV, Senior 300 BV o Master 600 BV).
3) Múltiples formas de ganar: venta directa (30% y hasta 60% en Master), bono de inicio rápido, bono de desarrollo, bono de equipo y recompra.

Aquí puedes ver la presentación completa en video:
{{link_video}}

Si deseas conectarte a la próxima sesión en vivo por Zoom:
{{link_zoom}}

Cualquier pregunta estoy atento(a): {{nombre}} · {{whatsapp}}`
  },
  {
    id: 'pres-envio-video-zoom',
    category: 'Presentación',
    title: 'Envío de material + invitación a Zoom y comunidad',
    context: 'Para mantener conectado al prospecto mientras evalúa.',
    text: `Hola, te saluda {{nombre}}. Como acordamos, aquí tienes el video explicativo del proyecto HGW:
{{link_video}}

También te dejo el enlace de nuestro grupo/canal informativo donde compartimos novedades y horarios de presentaciones en vivo:
{{link_grupo}}

Si quieres conectar en vivo por Zoom este es nuestro enlace de sala:
{{link_zoom}}

Me confirmas apenas lo revises para responder tus preguntas.`
  },
  {
    id: 'cierre-registro',
    category: 'Cierre',
    title: 'Cierre directo con enlace de registro',
    context: 'Cuando el prospecto ya entendió el modelo y decide registrarse.',
    text: `¡Excelente decisión! Bienvenido(a) al equipo.
Para crear tu código en HGW sigue estos 2 pasos sencillos:

1) Ingresa a mi enlace oficial de registro:
{{link_registro}}
2) Completa tus datos personales y guárdalos.

Apenas finalices me avisas por aquí ({{whatsapp}}) o al correo {{correo}} para ayudarte a seleccionar los productos de tu preferencia en tu paquete de activación y agregarte a nuestro grupo de entrenamiento:
{{link_grupo}}`
  },
  {
    id: 'cierre-eleccion-paquete',
    category: 'Cierre',
    title: 'Cierre ayudando a elegir membresía de activación',
    context: 'Para prospectos indecisos entre Pre-Junior, Junior, Senior o Master.',
    text: `Hola, te saluda {{nombre}}. Para iniciar hoy solo eliges el paquete que mejor se adapte a tu meta (en todos escoges los productos de tu preferencia):

• Pre-Junior (50 BV): aprox. B/. 98.00 · ~6 productos · 30% descuento.
• Junior (100 BV): aprox. B/. 180.00 · ~19 productos · 30% descuento.
• Senior (300 BV): aprox. B/. 540.00 · ~47 productos · 30% descuento.
• Master (600 BV): aprox. B/. 1,040.00 · ~115 productos · 30% activación y 52% descuento en recompras.

(Nota: la cantidad de productos y el costo en dólares pueden variar porque tú eliges los productos que prefieras).

¿Con cuál de estos paquetes te gustaría arrancar para enviarte tu enlace {{link_registro}} y guiarte paso a paso?`
  },
  {
    id: 'cierre-seguimiento-48h',
    category: 'Cierre',
    title: 'Seguimiento amable 24-48 horas después',
    context: 'Para retomar conversación sin presionar.',
    text: `¡Hola! Te saluda {{nombre}}. Paso por aquí brevemente para saber si pudiste ver el video que te compartí ({{link_video}}) y qué fue lo que más te llamó la atención: ¿los productos de bienestar o la oportunidad de generar ingresos?

Estoy a la orden por aquí en {{whatsapp}} o en {{correo}} si quieres que repasemos tus dudas.`
  }
];

// 2. Guiones de productos, membresías, testimonios, pagos y envíos
export const PRODUCT_SALES_SCRIPTS: TrainingScript[] = [
  {
    id: 'prod-venta-inicial',
    category: 'Venta de Productos',
    title: 'Atención a cliente interesado en productos',
    context: 'Primer mensaje de venta consultiva por WhatsApp.',
    text: `¡Hola! Con mucho gusto te atiende {{nombre}}.
Todos los productos HGW están pensados para el apoyo al bienestar diario (cafés funcionales, cuidado bucal sin flúor, suplementos nutricionales y accesorios con turmalina).
${DISCLAIMER_MEDICO}

Cuéntame, ¿qué línea te interesa más o qué objetivo de bienestar buscas apoyar hoy para recomendarte la mejor opción?
También puedes ver información en video aquí: {{link_video}}`
  },
  {
    id: 'prod-membresias-resumen',
    category: 'Paquetes y Membresías',
    title: 'Explicación de los 4 paquetes de membresía',
    context: 'Para clientes que quieren activar descuento de distribuidor.',
    text: `¡Hola! Soy {{nombre}}. Si compras con frecuencia o quieres distribuir, te conviene activarte con una membresía oficial HGW en Panamá:

• Paquete Pre-Junior: B/. 98.00 - 50 BV - 6 productos (aprox.) - 30%
  Beneficios: Bono Inicio rápido $5.00 · Bono desarrollo 0.20 USD · Bono equipo 5% · Tope diario 50 USD · Recompra 5% · Venta directa 30%.
• Paquete Junior: B/. 180.00 - 100 BV - 19 productos (aprox.) - 30%
  Beneficios: Bono Inicio rápido $10.00 · Bono desarrollo 0.50 USD · Bono equipo 7% · Tope diario 120 USD · Recompra 5% · Venta directa 30%.
• Paquete Senior: B/. 540.00 - 300 BV - 47 productos (aprox.) - 30%
  Beneficios: Bono Inicio rápido $30.00 · Bono desarrollo 1.50 USD · Bono equipo 8% · Tope diario 360 USD · Élite 4% hasta 3ra gen. · Recompra 5% · Venta directa 30%.
• Paquete Master: B/. 1,040.00 - 600 BV - 115 productos (aprox.) - 30% activación y 52% descuento en recompras
  Beneficios: Bono Inicio rápido $60.00 · Bono desarrollo 3.00 USD · Bono equipo 10% · Tope diario 720 USD · Élite 4% hasta 6ta gen. · Recompra 5% · Venta directa 60%.

Importante: La cantidad de productos y los costos en dólares pueden variar porque usted escoge los productos de su preferencia.
Para registrarte usa este enlace: {{link_registro}} y escríbeme al {{whatsapp}}.`
  },
  {
    id: 'prod-testimonio-responsable',
    category: 'Testimonios',
    title: 'Cómo compartir testimonios de bienestar (sin afirmaciones médicas)',
    context: 'Plantilla ética para compartir experiencias reales de consumo.',
    text: `Te comparto mi experiencia personal con los productos HGW: desde que los incorporé en mi rutina diaria he sentido un gran apoyo al bienestar, más energía en mi día a día y mayor comodidad en mi descanso y cuidado personal.

Cada persona es distinta y recuerda siempre que estos productos son alimentos funcionales, suplementos o accesorios de uso diario: ${DISCLAIMER_MEDICO}

Si deseas probarlos, con gusto te asesoro por aquí ({{whatsapp}}) — {{nombre}}.`
  },
  {
    id: 'prod-pagos-panama',
    category: 'Métodos de Pago',
    title: 'Explicación de métodos de pago en Panamá',
    context: 'Para cerrar un pedido y coordinar el pago de forma segura.',
    text: `Para confirmar tu pedido en Panamá puedes realizar el pago de forma práctica mediante:
• Yappy (Banco General)
• Transferencia bancaria ACH

Una vez realizado el pago, me envías el comprobante por este WhatsApp ({{whatsapp}}) junto con tu nombre completo, teléfono y dirección exacta para procesar el despacho.
Atendido por: {{nombre}} · {{correo}}`
  },
  {
    id: 'prod-envios-devoluciones',
    category: 'Envíos y Devoluciones',
    title: 'Información oficial de envíos y devoluciones',
    context: 'Texto oficial alineado con las condiciones de la tienda.',
    text: `Información de envíos y devoluciones:
• ${POLITICA_ENVIOS_RESUMEN}
• Para otros países fuera de Panamá, puedes registrarte directamente en el siguiente enlace de referido:
{{link_registro}}

Si deseas confirmar tu pedido en Panamá escríbeme aquí: {{whatsapp}} ({{nombre}}).`
  },
  {
    id: 'prod-postventa',
    category: 'Seguimiento',
    title: 'Seguimiento post-venta después de la entrega',
    context: 'Enviar 3 a 5 días después de que el cliente recibió su pedido.',
    text: `¡Hola! Te saluda {{nombre}}. Quería confirmar que recibiste bien tu pedido y preguntarte cómo te ha ido usando tu producto HGW en tu rutina diaria de apoyo al bienestar.

Recuerda seguir el modo de uso del empaque y tener presente que ${DISCLAIMER_MEDICO.toLowerCase()}
Si quieres conocer más productos o unirte a nuestro grupo informativo, aquí tienes el enlace: {{link_grupo}}`
  }
];

export interface ProductGuideItem {
  id: string;
  name: string;
  categoryLabel: string;
  priceFormatted: string;
  presentation: string;
  purpose: string;
  benefits: string[];
}

// Guía completa de TODOS los productos (lenguaje seguro: apoyo al bienestar, sin prometer curas ni tratamientos)
export const PRODUCTS_WELLNESS_GUIDE: ProductGuideItem[] = [
  // Cafés y Bebidas
  {
    id: '290',
    name: 'Trébol Coffee',
    categoryLabel: 'Cafés y Bebidas',
    priceFormatted: '$23.00',
    presentation: '15g x 12 sobres (180g)',
    purpose: 'Bebida instantánea con café y extracto de trébol rojo pensada como alternativa diaria de apoyo al bienestar femenino, la relajación y el confort digestivo.',
    benefits: [
      'Apoyo al bienestar general durante etapas de cambio hormonal.',
      'Contribuye a una sensación de confort digestivo tras las comidas.',
      'Aporta antioxidantes de extractos botánicos en un formato práctico.'
    ]
  },
  {
    id: '291',
    name: 'Ashwaganda Coffee',
    categoryLabel: 'Cafés y Bebidas',
    priceFormatted: '$23.00',
    presentation: '15g x 12 sobres (180g)',
    purpose: 'Café instantáneo enriquecido con extracto adaptógeno de ashwagandha para apoyar la vitalidad diaria, la concentración y el manejo del estrés cotidiano.',
    benefits: [
      'Apoyo al bienestar físico y mental en jornadas exigentes.',
      'Favorece el enfoque y la energía sostenida durante el día.',
      'Contribuye a la relajación y al equilibrio general del organismo.'
    ]
  },
  {
    id: '0134',
    name: 'Blueberry Coffee',
    categoryLabel: 'Cafés y Bebidas',
    priceFormatted: '$23.00',
    presentation: '15g x 12 sobres (180g)',
    purpose: 'Café funcional combinado con polvo de arándanos para brindar energía cotidiana y aporte natural de antioxidantes.',
    benefits: [
      'Fuente práctica de antocianinas y antioxidantes naturales del arándano.',
      'Apoyo al bienestar visual, cognitivo y vitalidad diaria.',
      'Sabor suave y preparación instantánea en casa u oficina.'
    ]
  },
  {
    id: '0131',
    name: 'Ganoderma Soluble Coffee',
    categoryLabel: 'Cafés y Bebidas',
    priceFormatted: '$23.00',
    presentation: '15g x 12 sobres (180g)',
    purpose: 'Café soluble combinado con extracto de Ganoderma lucidum como bebida diaria de apoyo al bienestar y a las defensas naturales.',
    benefits: [
      'Aporta compuestos antioxidantes naturales propios del Ganoderma.',
      'Apoyo al bienestar del sistema de defensas y vitalidad diaria.',
      'Ayuda a reducir la sensación de fatiga en la rutina diaria.'
    ]
  },
  {
    id: '0227',
    name: 'Cordyceps Coffee',
    categoryLabel: 'Cafés y Bebidas',
    priceFormatted: '$23.00',
    presentation: '15g x 12 sobres (180g)',
    purpose: 'Café instantáneo fortificado con micelio de Cordyceps sinensis orientado a apoyar la energía natural y el rendimiento cotidiano.',
    benefits: [
      'Apoyo al vigor físico y la vitalidad en actividades diarias o deportivas.',
      'Contribuye al bienestar general y al aporte de antioxidantes.',
      'Presentación práctica en sobres individuales listos para preparar.'
    ]
  },
  {
    id: '0260',
    name: 'Black Tea Coffee',
    categoryLabel: 'Cafés Premium Sin Azúcar',
    priceFormatted: '$20.00',
    presentation: '3.5g x 12 sobres (42g)',
    purpose: 'Café premium sin azúcar combinado con extracto de té negro, ideal para quienes prefieren una bebida ligera de apoyo al bienestar y concentración.',
    benefits: [
      'Opción sin azúcar añadida para el disfrute diario.',
      'Apoyo a la agilidad mental y a una sensación ligera tras las comidas.',
      'Aporta polifenoles y antioxidantes naturales del té negro.'
    ]
  },
  {
    id: '0262',
    name: 'Coffee Ceps',
    categoryLabel: 'Cafés Premium Sin Azúcar',
    priceFormatted: '$20.00',
    presentation: '3.5g x 12 sobres (42g)',
    purpose: 'Café negro sin azúcar enriquecido con micelio fermentado de Cordyceps sinensis para el apoyo a la energía física y al bienestar diario.',
    benefits: [
      'Sin azúcar añadida y de preparación rápida en agua caliente.',
      'Apoyo al bienestar físico y resistencia cotidiana.',
      'Fuente de aminoácidos y nutrientes funcionales del Cordyceps.'
    ]
  },
  {
    id: '0261',
    name: 'Berry Gano Coffee',
    categoryLabel: 'Cafés Premium Sin Azúcar',
    priceFormatted: '$20.00',
    presentation: '3.5g x 12 sobres (42g)',
    purpose: 'Mezcla sin azúcar de café soluble con extractos de arándanos, Ganoderma lucidum y ginseng para un apoyo integral al bienestar.',
    benefits: [
      'Sin azúcar añadida; combina tres extractos botánicos valorados.',
      'Apoyo al bienestar celular gracias a sus antioxidantes.',
      'Contribuye a mantener energía equilibrada y concentración.'
    ]
  },
  // Caramelos y Dulces
  {
    id: 'candy-coffee',
    name: 'Coffee Candy',
    categoryLabel: 'Caramelos y Dulces',
    priceFormatted: '$5.80',
    presentation: '30g (0.5g x 60 unidades)',
    purpose: 'Caramelos duros con extracto de café diseñados para llevar energía rápida y concentración práctica en cualquier momento.',
    benefits: [
      'Alternativa práctica cuando no puedes preparar una taza de café.',
      'Apoyo a la atención y vitalidad en viajes, oficina o estudio.',
      'Formato compacto y discreto de 60 unidades.'
    ]
  },
  {
    id: 'candy-ganubi',
    name: 'Ganubi Candy',
    categoryLabel: 'Caramelos y Dulces',
    priceFormatted: '$8.30',
    presentation: '30g (0.5g x 60 unidades)',
    purpose: 'Caramelos funcionales con extracto de Ganoderma lucidum para integrar de forma práctica sus antioxidantes en la rutina diaria.',
    benefits: [
      'Aporta antioxidantes naturales de apoyo al bienestar diario.',
      'Sabor suave y agradable, fácil de consumir fuera de casa.',
      'Contribuye al bienestar general y equilibrio cotidiano.'
    ]
  },
  {
    id: '0144',
    name: 'Caramelos de Arándano (Blueberry Candy)',
    categoryLabel: 'Caramelos y Dulces',
    priceFormatted: '$5.80',
    presentation: '30g (60 unidades)',
    purpose: 'Caramelos nutritivos elaborados con polvo de arándanos ricos en antocianinas como snack funcional para toda la familia.',
    benefits: [
      'Aporta antocianinas y antioxidantes propios del arándano.',
      'Apoyo al bienestar visual y celular en formato portátil.',
      'Alternativa dulce con sabor frutal natural.'
    ]
  },
  {
    id: '0338',
    name: 'Biolacti Candy',
    categoryLabel: 'Caramelos y Dulces',
    priceFormatted: '$5.80',
    presentation: '30g (60 unidades)',
    purpose: 'Caramelos duros con mezcla de 4 cepas probióticas activas y sabor a leche descremada para apoyar el bienestar digestivo.',
    benefits: [
      'Apoyo al equilibrio de la microbiota y confort intestinal.',
      'Bajo aporte de azúcares (con sorbitol y sucralosa).',
      'Fácil de llevar para consumir probióticos en cualquier lugar.'
    ]
  },
  {
    id: '0329',
    name: 'Peptipro Candy',
    categoryLabel: 'Caramelos y Dulces',
    priceFormatted: '$5.80',
    presentation: '30g (60 unidades)',
    purpose: 'Caramelos formulados con péptidos de colágeno y sabor a ginseng para apoyar el cuidado de la piel y la vitalidad.',
    benefits: [
      'Apoyo nutricional para la firmeza de piel, cabello y uñas.',
      'El ginseng contribuye a una sensación de energía cotidiana.',
      'Porciones exactas y fáciles de incluir en la rutina.'
    ]
  },
  {
    id: '0332',
    name: 'Gestifrut Candy',
    categoryLabel: 'Caramelos y Dulces',
    priceFormatted: '$5.80',
    presentation: '30g (60 unidades)',
    purpose: 'Caramelos con sabor a mandarina, espino blanco, fucoidan y melena de león como complemento práctico para el confort digestivo.',
    benefits: [
      'Refresca el aliento con sabor cítrico natural a mandarina.',
      'Apoyo al bienestar digestivo después de las comidas.',
      'Ingredientes botánicos seleccionados en frasco de 60 unidades.'
    ]
  },
  {
    id: '0336-moruva',
    name: 'Moruva Candy',
    categoryLabel: 'Caramelos y Dulces',
    priceFormatted: '$5.80',
    presentation: '30g (0.5g x 60 unidades)',
    purpose: 'Caramelos de moringa y extracto de uva ricos en polifenoles para complementar la alimentación diaria con antioxidantes vegetales.',
    benefits: [
      'Aporta antioxidantes naturales provenientes de la uva.',
      'Apoyo a la vitalidad y bienestar general por la moringa.',
      'Alternativa dulce de origen vegetal para llevar a todos lados.'
    ]
  },
  {
    id: '0336-herbal',
    name: 'Herbal Fresh Candy',
    categoryLabel: 'Caramelos y Dulces',
    priceFormatted: '$5.80',
    presentation: '30g (0.5g x 60 unidades)',
    purpose: 'Caramelos con extractos herbales diseñados para brindar frescura bucal y aliento agradable durante el día.',
    benefits: [
      'Sensación prolongada de frescura en la boca y garganta.',
      'Ideal después de las comidas o antes de reuniones.',
      'Fórmula ligera con extractos botánicos.'
    ]
  },
  // Dulces Berry y Bebidas
  {
    id: 'choco-blue',
    name: 'Choco Blue',
    categoryLabel: 'Dulces Berry y Bebidas',
    priceFormatted: '$40.00',
    presentation: '660g (33g x 20 sachets)',
    purpose: 'Bebida nutritiva en polvo a base de cacao natural, leche descremada y arándanos para desayunos o meriendas llenas de antioxidantes.',
    benefits: [
      'Aporta antioxidantes naturales del cacao y del arándano.',
      'Incluye proteínas y calcio de leche descremada baja en grasa.',
      'Opción reconfortante para disfrutar fría o caliente en familia.'
    ]
  },
  {
    id: '0339',
    name: 'Choco Gano',
    categoryLabel: 'Dulces Berry y Bebidas',
    priceFormatted: '$40.00',
    presentation: '660g (20 porciones de 33g)',
    purpose: 'Bebida instantánea de cacao y leche descremada enriquecida con extracto de Ganoderma para acompañar el desayuno con apoyo antioxidante.',
    benefits: [
      'Energía nutritiva de perfil bajo en grasa para el día a día.',
      'Apoyo al bienestar general gracias al extracto de Ganoderma.',
      'Sobres individuales que conservan frescura y sabor.'
    ]
  },
  {
    id: '0209',
    name: 'Lactiberry – Producto lácteo y té negro',
    categoryLabel: 'Dulces Berry y Bebidas',
    priceFormatted: '$26.00',
    presentation: '300g (10 sobres de 30g)',
    purpose: 'Bebida nutritiva instantánea con suero de leche de Nueva Zelanda, arándanos y té negro para complementar la dieta diaria.',
    benefits: [
      'Aporta proteínas del suero lácteo y antioxidantes del arándano.',
      'Apoyo al bienestar general y vitalidad cotidiana.',
      'Sabor cremoso y natural con trocitos de fruta.'
    ]
  },
  {
    id: '0147',
    name: 'Mermelada Frutada (Blueberry Fruit Tea / Jam)',
    categoryLabel: 'Dulces Berry y Bebidas',
    priceFormatted: '$12.00',
    presentation: 'Frasco de 200g',
    purpose: 'Concentrado frutal de arándanos para disfrutar en desayunos o infusiones mientras incorporas antioxidantes naturales en la mesa familiar.',
    benefits: [
      'Elaborada cuidadosamente para conservar el sabor y nutrientes del arándano.',
      'Aporta antocianinas de apoyo al bienestar celular y visual.',
      'Versátil para untar o disolver en té caliente o frío.'
    ]
  },
  {
    id: '0215',
    name: 'Péptido de Colágeno y Arándanos',
    categoryLabel: 'Dulces Berry y Bebidas',
    priceFormatted: '$29.00',
    presentation: '300g (12 sachets)',
    purpose: 'Alimento funcional con péptidos y tripéptidos de colágeno, concentrado de frutas, vitaminas y minerales para apoyar piel y articulaciones.',
    benefits: [
      'Apoyo nutricional para elasticidad de la piel, cartílagos y huesos.',
      'Enriquecido con vitaminas (A, C, complejo B, D, E) y minerales.',
      'Consistencia suave de fácil digestión y agradable sabor frutal.'
    ]
  },
  {
    id: '0257',
    name: 'Blueberry Wine – Vino de arándanos',
    categoryLabel: 'Dulces Berry y Bebidas',
    priceFormatted: '$36.00',
    presentation: 'Botella de vidrio 750 ml',
    purpose: 'Bebida enológica elaborada mediante fermentación natural de arándanos silvestres para consumo responsable adulto en ocasiones especiales.',
    benefits: [
      'Concentración natural de polifenoles propios del arándano fermentado.',
      'Experiencia aromática y frutal para maridaje adulto.',
      'Uso exclusivo para mayores de 18 años con consumo moderado.'
    ]
  },
  // Mix Herbales
  {
    id: '0211',
    name: 'Bebida Digestiva Chang Jing Jing (Fresh Drink)',
    categoryLabel: 'Mix Herbales',
    priceFormatted: '$13.00',
    presentation: '21g (6 sachets)',
    purpose: 'Mezcla herbal instantánea con hierba de cebada, goji, diente de león y fibra dietética como apoyo al confort digestivo y tránsito intestinal.',
    benefits: [
      'Rica en fibra soluble y clorofila vegetal sin grasas añadidas.',
      'Apoyo al bienestar digestivo y sensación de ligereza diaria.',
      'Bebida verde refrescante de rápida disolución en agua.'
    ]
  },
  {
    id: '0221',
    name: 'Pro-Shaping Tea – Mezcla de hierbas para infusión',
    categoryLabel: 'Mix Herbales',
    priceFormatted: '$23.00',
    presentation: '72g (24 bolsitas filtrantes)',
    purpose: 'Infusión herbal aromática con té verde, semillas de casia, espino blanco y ginseng para complementar hábitos de alimentación saludable y digestión.',
    benefits: [
      'Apoyo al metabolismo de lípidos dentro de un estilo de vida saludable.',
      'Infusión digestiva y tonificante con hierbas tradicionales.',
      'Prácticas bolsitas filtrantes listas en 5 minutos.'
    ]
  },
  {
    id: '0253',
    name: 'Berry Juice – Jugo de bayas rico en vitamina C',
    categoryLabel: 'Mix Herbales',
    priceFormatted: '$25.00',
    presentation: '6g x 30 sachets',
    purpose: 'Bebida en polvo con vitamina C y mezcla de arándano, uva, mora, frambuesa y cereza para apoyar defensas, piel y bienestar visual.',
    benefits: [
      'Alto aporte de vitamina C que apoya las defensas y la síntesis de colágeno.',
      'Mezcla de 5 superfrutas ricas en antioxidantes naturales.',
      'Apto para complementar la hidratación diaria de la familia.'
    ]
  },
  {
    id: '0213',
    name: 'Proteína de Soya y Arándano',
    categoryLabel: 'Mix Herbales',
    priceFormatted: '$36.00',
    presentation: '240g (12 sachets)',
    purpose: 'Bebida proteica vegetal con proteína aislada de soya, maní, konjac y arándanos para apoyar la nutrición diaria y el mantenimiento muscular.',
    benefits: [
      'Aporta aminoácidos esenciales de origen vegetal y fibra konjac.',
      'Favorece la saciedad y apoya el cuidado muscular tras el ejercicio.',
      'Endulzada con xilitol y libre de octógonos.'
    ]
  },
  // Suplementos
  {
    id: '0008',
    name: 'Spirulina Plus (Producto natural)',
    categoryLabel: 'Suplementos',
    priceFormatted: '$25.00',
    presentation: '500mg x 60 cápsulas',
    purpose: 'Suplemento nutricional en cápsulas a base de microalga espirulina rica en proteínas, clorofila, vitaminas y minerales para energía diaria.',
    benefits: [
      'Apoyo integral a la nutrición diaria, vitalidad y energía natural.',
      'Contribuye al bienestar del sistema inmune y procesos de depuración.',
      'Superalimento vegetal en dosificación práctica de 1 a 2 cápsulas al día.'
    ]
  },
  // Cuidado Personal e Higiene Íntima / Turmalina
  {
    id: '1122',
    name: 'Enjoyable Panty Liner – Toalla íntima de uso diario',
    categoryLabel: 'Cuidado Personal',
    priceFormatted: '$5.50',
    presentation: 'Paquete de 30 unidades',
    purpose: 'Protector íntimo diario ultrafino de algodón suave con banda aniónica de turmalina para brindar frescura, confort e higiene femenina cotidiana.',
    benefits: [
      'Textura de algodón suave que brinda comodidad y transpirabilidad.',
      'Banda con turmalina que ayuda a mantener sensación de frescura.',
      'Diseño anatómico multicapas para el cuidado diario.'
    ]
  },
  {
    id: '1123',
    name: 'Enjoyable Day Use – Toalla íntima de uso diurno',
    categoryLabel: 'Cuidado Personal',
    priceFormatted: '$5.50',
    presentation: 'Paquete de 10 unidades',
    purpose: 'Toalla sanitaria diurna de algodón suave con banda aniónica de turmalina diseñada para brindar absorción segura y confort durante el día.',
    benefits: [
      'Capa suave en contacto con la piel para reducir molestias por roce.',
      'Alta capacidad de absorción con estructura respirable.',
      'Confort femenino durante la jornada diurna.'
    ]
  },
  {
    id: '1121',
    name: 'Enjoyable Night Use – Toalla íntima de uso nocturno',
    categoryLabel: 'Cuidado Personal',
    priceFormatted: '$4.40',
    presentation: 'Paquete de 8 unidades',
    purpose: 'Toalla sanitaria nocturna anatómica con banda de turmalina y textura de algodón para brindar protección prolongada durante el descanso.',
    benefits: [
      'Diseño anatómico nocturno de amplia cobertura y absorción.',
      'Sensación suave y fresca durante las horas de sueño.',
      'Empaque individual higiénico y seguro.'
    ]
  },
  {
    id: '2034',
    name: 'Plantilla de Turmalina',
    categoryLabel: 'Cuidado Personal',
    priceFormatted: '$9.00',
    presentation: '1 par adaptable',
    purpose: 'Plantillas ergonómicas con partículas de turmalina para estimular puntos de confort plantar y reducir la sensación de cansancio al caminar.',
    benefits: [
      'Brinda sensación térmica suave y confort durante jornadas largas de pie.',
      'Recortables según la talla del calzado para uso diario discreto.',
      'Apoyo al bienestar y descanso de los pies sin químicos ni baterías.'
    ]
  },
  {
    id: '1204',
    name: 'Press On Nails (Kit de uñas postizas)',
    categoryLabel: 'Cuidado Personal',
    priceFormatted: '$8.58',
    presentation: 'Kit de 24 a 30 piezas',
    purpose: 'Kit práctico de uñas acrílicas reutilizables para lucir manos arregladas en pocos minutos sin maltratar la uña natural.',
    benefits: [
      'Aplicación rápida en casa ideal para eventos o viajes.',
      'Reutilizables con el cuidado adecuado.',
      'Diseños modernos sin necesidad de lámpara UV ni daño a la uña.'
    ]
  },
  {
    id: 'jabon-turmalina',
    name: 'Jabón de Turmalina',
    categoryLabel: 'Cuidado Personal',
    priceFormatted: '$4.62',
    presentation: 'Barra de 100g',
    purpose: 'Jabón artesanal formulado con polvo de nanoturmalina para limpieza profunda del rostro y cuerpo con control suave del exceso de grasa.',
    benefits: [
      'Ayuda a remover impurezas y exceso de sebo de los poros.',
      'Exfoliación suave que deja la piel limpia y renovada.',
      'Apto para rutina diaria de higiene facial y corporal.'
    ]
  },
  {
    id: 'jabon-artemisa',
    name: 'Jabón de Artemisa',
    categoryLabel: 'Cuidado Personal',
    priceFormatted: '$7.20',
    presentation: 'Barra de 100g',
    purpose: 'Jabón herbal con extracto de artemisa diseñado para la higiene suave y el confort de pieles sensibles.',
    benefits: [
      'Sensación calmante y refrescante sobre pieles delicadas.',
      'Ayuda a cuidar la barrera natural de la piel durante el baño.',
      'Aroma herbal limpio y relajante.'
    ]
  },
  {
    id: 'jabon-oliva',
    name: 'Olive Soap – Jabón de Oliva',
    categoryLabel: 'Cuidado Personal',
    priceFormatted: '$4.62',
    presentation: 'Barra de 100g',
    purpose: 'Jabón suave elaborado con aceite de oliva virgen extra para brindar hidratación y nutrición a pieles secas o delicadas.',
    benefits: [
      'Limpia sin resecar, ayudando a conservar la suavidad de la piel.',
      'Fórmula gentil ideal para toda la familia.',
      'Sensación humectante y confortable tras cada uso.'
    ]
  },
  // Accesorios de Turmalina
  {
    id: '2165',
    name: 'Protector de Cintura de Turmalina',
    categoryLabel: 'Accesorios de Turmalina',
    priceFormatted: '$69.00',
    presentation: '1 protector lumbar ajustable',
    purpose: 'Faja lumbar ergonómica con nanoturmalina y módulos magnéticos que genera calor suave al contacto con la piel para soporte y confort diario.',
    benefits: [
      'Brinda sensación de calor reconfortante y relajación en la zona lumbar.',
      'Apoya una mejor postura durante actividades diarias o trabajo.',
      'No requiere electricidad ni baterías; transpirable y ajustable.'
    ]
  },
  {
    id: '2167',
    name: 'Protector de Cuello de Turmalina',
    categoryLabel: 'Accesorios de Turmalina',
    priceFormatted: '$16.00',
    presentation: '1 protector cervical ajustable',
    purpose: 'Banda cervical autocalentable con partículas de turmalina para proporcionar calor suave y sensación de alivio ante la tensión del cuello.',
    benefits: [
      'Favorece la relajación muscular en cuello y nuca tras el trabajo o estudio.',
      'Ligero, portátil y fácil de ajustar en segundos.',
      'Activa su calor natural con la propia temperatura corporal.'
    ]
  },
  {
    id: '2166',
    name: 'Protector de Rodilla de Turmalina',
    categoryLabel: 'Accesorios de Turmalina',
    priceFormatted: '$55.00',
    presentation: '1 protector de rodilla ajustable',
    purpose: 'Soporte articular ergonómico con partículas de turmalina que ofrece estabilidad suave y efecto térmico reconfortante en la rodilla.',
    benefits: [
      'Sensación de calor suave que favorece el confort y relajación articular.',
      'Diseño anatómico flexible que permite libertad de movimiento.',
      'Ideal como apoyo en caminatas, actividad diaria o descanso.'
    ]
  },
  {
    id: '2130',
    name: 'Pulsera de Turmalina',
    categoryLabel: 'Accesorios de Turmalina',
    priceFormatted: '$20.00',
    presentation: '1 pulsera hecha a mano',
    purpose: 'Pulsera artesanal con piedras naturales de turmalina pensada como accesorio elegante de bienestar y equilibrio personal diario.',
    benefits: [
      'Elaborada a mano con piedras naturales adaptables a la muñeca.',
      'Accesorio estético asociado tradicionalmente con armonía y calma.',
      'Fácil de limpiar y combinar en el uso cotidiano.'
    ]
  },
  {
    id: '2129',
    name: 'Collar de Turmalina',
    categoryLabel: 'Accesorios de Turmalina',
    priceFormatted: '$40.00',
    presentation: '1 collar hecho a mano',
    purpose: 'Collar artesanal con piedras naturales de turmalina diseñado para acompañar tu estilo diario con sensación de equilibrio y bienestar.',
    benefits: [
      'Diseño artesanal elegante con piedras de turmalina natural.',
      'Ligero y cómodo para uso prolongado durante el día.',
      'Tradicionalmente valorado para promover sensaciones de bienestar y calma.'
    ]
  },
  {
    id: 'colgante-piedra',
    name: 'Colgante Piedra Energética',
    categoryLabel: 'Turmalina y Bienestar',
    priceFormatted: '$50.00',
    presentation: '1 colgante con cordón ajustable',
    purpose: 'Colgante de minerales volcánicos y turmalina diseñado como accesorio personal para promover sensación de equilibrio y vitalidad.',
    benefits: [
      'Diseño sobrio con cordón ajustable para llevar a diario.',
      'Combina minerales volcánicos y turmalina negra.',
      'Acompaña hábitos enfocados en el bienestar y la calma mental.'
    ]
  },
  // Equipos
  {
    id: '2113',
    name: 'Thermo de Turmalina',
    categoryLabel: 'Equipos',
    priceFormatted: '$95.00',
    presentation: '1 unidad (500 ml)',
    purpose: 'Termo portátil de acero inoxidable con piedras naturales de turmalina en su interior pensado para hidratarte con agua de sabor ligero y equilibrado.',
    benefits: [
      'Acero inoxidable de grado alimentario, liviano y reutilizable.',
      'Contiene piedras de turmalina natural para acompañar la hidratación diaria.',
      'Práctico de 500 ml para oficina, gimnasio o viajes.'
    ]
  },
  {
    id: '0213-cup',
    name: 'Coffee Cup',
    categoryLabel: 'Equipos',
    priceFormatted: '$26.00',
    presentation: 'Vaso térmico 390 ml',
    purpose: 'Vaso térmico de acero inoxidable con tapa hermética diseñado para conservar frías o calientes tus bebidas HGW por más horas.',
    benefits: [
      'Doble pared aislante y tapa antifugas libre de BPA.',
      'Fácil de lavar, reutilizable y resistente a olores.',
      'Tamaño ideal de 390 ml para llevar tus cafés funcionales.'
    ]
  },
  {
    id: '1213',
    name: 'Vaso Térmico',
    categoryLabel: 'Equipos',
    priceFormatted: '$31.50',
    presentation: '1 unidad térmica reutilizable',
    purpose: 'Vaso térmico resistente de uso diario diseñado para mantener la temperatura ideal de tus bebidas frías o calientes fuera de casa.',
    benefits: [
      'Conserva la temperatura de infusiones, cafés o jugos por más tiempo.',
      'Tapa con ajuste seguro que ayuda a evitar derrames.',
      'Diseño moderno pensado para acompañarte en todo lugar.'
    ]
  },
  {
    id: 'hervidor',
    name: 'Hervidor Eléctrico',
    categoryLabel: 'Equipos',
    priceFormatted: '$60.00',
    presentation: '1 unidad eléctrica',
    purpose: 'Hervidor rápido de acero inoxidable con auto-apagado de seguridad para preparar tus cafés, tés e infusiones HGW en pocos minutos.',
    benefits: [
      'Calienta el agua rápidamente ahorrando tiempo en casa u oficina.',
      'Sistema de apagado automático al alcanzar la temperatura.',
      'Complemento ideal para demostrar y preparar bebidas HGW.'
    ]
  },
  {
    id: '2192',
    name: 'Almohada Magnética de Turmalina',
    categoryLabel: 'Equipos',
    priceFormatted: '$89.00',
    presentation: '1 unidad ergonómica',
    purpose: 'Almohada viscoelástica ergonómica con módulos magnéticos y turmalina diseñada para brindar soporte cervical y confort durante el descanso.',
    benefits: [
      'Brinda soporte anatómico al cuello y sensación de calor suave.',
      'Contribuye a la relajación y a una mejor calidad de descanso.',
      'No requiere electricidad; ideal para cama, sofá o viajes.'
    ]
  },
  // Cuidado Bucal
  {
    id: 'pasta-probioticos',
    name: 'Probiotics Toothpaste (Pasta Dental con Probióticos)',
    categoryLabel: 'Cuidado Bucal',
    priceFormatted: '$8.00',
    presentation: 'Tubo de 120g',
    purpose: 'Dentífrico diario 100% libre de flúor y triclosán formulado con probióticos y turmalina para apoyar el equilibrio de la flora bucal y un aliento fresco.',
    benefits: [
      'Libre de flúor, triclosán y abrasivos agresivos.',
      'Apoya el equilibrio natural del microbioma bucal y encías protegidas.',
      'Aporta limpieza suave y sensación prolongada de frescura.'
    ]
  },
  {
    id: 'pasta-turmalina-blanca',
    name: 'Tourmaline Toothpaste – Versión Blanca',
    categoryLabel: 'Cuidado Bucal',
    priceFormatted: '$8.00',
    presentation: 'Tubo de 120g',
    purpose: 'Pasta dental herbal sin flúor ni triclosán con nanoturmalina, xilitol y extracto de menta para una limpieza dental diaria y aliento fresco.',
    benefits: [
      'Libre de flúor y triclosán; apta para el cuidado diario familiar.',
      'Contiene xilitol, extractos herbales tradicionales y turmalina.',
      'Frescura intensa a menta y apoyo al cuidado de dientes y encías.'
    ]
  },
  {
    id: 'pasta-turmalina-negra',
    name: 'Tourmaline Toothpaste – Versión Negra',
    categoryLabel: 'Cuidado Bucal',
    priceFormatted: '$8.00',
    presentation: 'Tubo de 120g',
    purpose: 'Pasta dental sin flúor ni triclosán con nanoturmalina, carbón botánico activo, madreselva y xilitol para apoyar la limpieza profunda y brillo natural.',
    benefits: [
      'Ayuda a remover manchas superficiales sin dañar el esmalte.',
      'Libre de flúor y triclosán con refrescante sabor a menta.',
      'Apoya la higiene bucal integral y el cuidado de las encías.'
    ]
  },
  {
    id: 'pasta-herbal-china',
    name: 'Pasta Dental Menta Fresca y Xylitol (Herbs)',
    categoryLabel: 'Cuidado Bucal',
    priceFormatted: '$8.80',
    presentation: 'Tubo de 120g',
    purpose: 'Dentífrico de color herbal 100% natural sin flúor ni triclosán con madreselva, menta y xilitol para higiene bucal diaria y frescura natural.',
    benefits: [
      'Sin pigmentos artificiales, sin flúor y sin triclosán.',
      'Sensación calmante y refrescante en encías y boca.',
      'Ideal para quienes buscan cuidado bucal tradicional con hierbas.'
    ]
  }
];

// 3. Objeciones frecuentes con respuestas listas para WhatsApp
export const OBJECTION_SCRIPTS: TrainingScript[] = [
  {
    id: 'obj-caro',
    category: 'Precio / Presupuesto',
    title: '“Es muy caro / no tengo dinero ahora”',
    context: 'Cuando el prospecto frena por el monto de la inversión o producto.',
    text: `Te entiendo perfectamente, a muchos nos pasó igual al inicio. Justamente por eso en HGW existen opciones escalonadas:
• Si solo deseas probar, puedes comenzar con un producto accesible como nuestras pastas dentales sin flúor ($8.00) o caramelos funcionales ($5.80).
• Si te interesa emprender, el paquete Pre-Junior inicia en B/. 98.00 aprox. (escoges tus propios productos y ya obtienes 30% de descuento para consumo o reventa).

No se trata de gastar, sino de redirigir productos que igual ya usas en casa (café, pasta dental, jabón) hacia una marca que te da descuento e ingresos. Si quieres, vemos juntos la opción más cómoda para ti. — {{nombre}} ({{whatsapp}})`
  },
  {
    id: 'obj-tiempo',
    category: 'Tiempo',
    title: '“No tengo tiempo para hacer otro negocio”',
    context: 'Para personas con empleo tradicional o agenda ocupada.',
    text: `Justo por falta de tiempo es que este modelo funciona tan bien: no tienes que dejar tu trabajo ni cumplir horarios fijos.
Puedes avanzar a tu ritmo desde el celular en ratos libres compartiendo tu catálogo, videos ({{link_video}}) o conectando a tus interesados a las charlas por Zoom ({{link_zoom}}), donde el equipo te apoya explicando todo.

Con 30 a 45 minutos al día bien enfocados puedes empezar a construir tu red. ¿Te gustaría ver cómo organizamos la agenda semanal? — {{nombre}}`
  },
  {
    id: 'obj-piramide',
    category: 'Confianza / Modelo',
    title: '“¿Eso es una pirámide o estafa?”',
    context: 'Respuesta clara, respetuosa y transparente.',
    text: `¡Excelente pregunta! Es muy válido asegurarse antes de invertir.
Una pirámide ilegal capta dinero sin entregar producto real. En HGW (Health Green World):
1) Siempre recibes el 100% de tu compra en productos físicos reales de consumo diario a tu elección.
2) Hay oficina física en Ciudad de Panamá (Avenida Porras, Plaza Royal Blue, Local No. 6, San Francisco) con atención presencial y envíos por Servientrega.
3) Nuestros productos cuentan con certificaciones internacionales de calidad (FDA, ISO 9001, GMP, HACCP, Halal).

Si gustas, puedes mirar el video explicativo aquí ({{link_video}}) o acompañarnos en una presentación en vivo para que lo compruebes tú mismo(a). — {{nombre}}`
  },
  {
    id: 'obj-no-se-vender',
    category: 'Habilidades',
    title: '“No sé vender / no me gustan las ventas”',
    context: 'Para prospectos tímidos o sin experiencia comercial.',
    text: `No te preocupes, nadie nace sabiendo y aquí no vendemos a la fuerza.
En HGW compartimos nuestra experiencia usando los productos (el café que tomas todos los días, la pasta dental sin flúor, el jabón) y conectamos a las personas con la información o el catálogo.
Además, tendrás acceso a nuestro grupo de apoyo ({{link_grupo}}) y a guiones listos paso a paso para responder por WhatsApp sin complicarte.

¿Te animas a ver cómo trabajamos en equipo? — {{nombre}} · {{whatsapp}}`
  },
  {
    id: 'obj-pensarlo',
    category: 'Indecisión',
    title: '“Tengo que pensarlo / consultarlo”',
    context: 'Respuesta sin presión que deja la puerta abierta con fecha.',
    text: `Por supuesto, tómate tu tiempo para analizarlo bien. Para ayudarte a tomar una decisión con toda la información clara, te dejo:
• Video resumen: {{link_video}}
• Enlace oficial si decides explorar el registro: {{link_registro}}

¿Qué duda específica te gustaría aclarar antes de decidir (productos, paquetes o ganancias)? Con gusto te respondo por aquí ({{whatsapp}}). — {{nombre}}`
  },
  {
    id: 'obj-envios-pais',
    category: 'Logística',
    title: '“¿Cuánto cuesta el envío / envían a mi país?”',
    context: 'Respuesta exacta alineada con las políticas del sitio.',
    text: `Con gusto te confirmo nuestras condiciones de envío y entregas:
• ${POLITICA_ENVIOS_RESUMEN}

Si te encuentras fuera de Panamá, puedes registrarte directamente como socio o cliente internacional con mi enlace de referido aquí:
{{link_registro}}

Si estás en Panamá y quieres hacer tu pedido ahora, escríbeme a {{whatsapp}} — {{nombre}}.`
  },
  {
    id: 'obj-cura-enfermedad',
    category: 'Cumplimiento / Salud',
    title: '“¿Este producto cura una enfermedad específica?”',
    context: 'Respuesta responsable obligatoria para cumplir reglas de redacción.',
    text: `Es muy importante aclararte con total honestidad: los productos de HGW son alimentos funcionales, suplementos nutricionales y accesorios diseñados para el apoyo al bienestar diario. No prometen curas ni tratamientos de enfermedades, y ${DISCLAIMER_MEDICO.toLowerCase()}

Si estás buscando complementar tu bienestar general o mejorar tus hábitos diarios (como tomar un café con extractos naturales o usar una pasta dental sin flúor), con gusto te comparto qué contiene cada producto para que lo evalúes junto a tu médico de confianza. — {{nombre}} ({{whatsapp}})`
  }
];
