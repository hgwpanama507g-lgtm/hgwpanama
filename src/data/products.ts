export interface Product {
  id: string;
  code?: string;
  slug: string;
  name: string;
  category: 'cafes-bebidas' | 'candies-snacks' | 'cuidado-bucal' | 'turmalina' | 'cuidado-personal' | 'hogar-accesorios' | 'nutricion';
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  inStock: boolean;
  isComingSoon?: boolean;
  image: string;
  shortDescription: string;
  description?: string;
  netContent?: string;
  sachets?: string;
  presentation?: string;
  shelfLife?: string;
  advantages?: string[];
  benefits: string[];
  ingredients?: string[];
  usage?: string;
  precautions?: string;
  featured?: boolean;
  documentSlug?: string;
  inOfficialCatalog?: boolean;
}

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. CAFÉS (Catálogo Oficial HGW 2026)
  // ==========================================
  {
    id: "290",
    code: "290",
    slug: "trebol-coffee",
    name: "Trébol Coffee",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/trebol.png",
    netContent: "15 gr",
    sachets: "12 sobres",
    presentation: "15g x 12 sobres (180g)",
    shelfLife: "24 meses",
    shortDescription: "El café de trifolium pratense es una bebida que se elabora a partir de flores secas de trébol rojo y ofrece una alternativa interesante al café tradicional.",
    description: "El Trifolium pratense, o trébol rojo, es una planta que se encuentra comúnmente en todo el mundo. Sus flores rosadas a rojas han sido utilizadas durante siglos por diversas culturas por sus propiedades medicinales y su potencial en la preparación de infusiones. El café de trifolium pratense es una bebida que se elabora a partir de estas flores secas y ofrece una alternativa interesante al café tradicional.",
    advantages: [
      "Presentación práctica de consumo",
      "Agradable sabor",
      "Tiene propiedades anti inflamatorias",
      "Contribuye a mejorar la digestión",
      "Coadyuva a elevar el busto en las mujeres"
    ],
    benefits: [
      "Reducción de síntomas de la menopausia: Se ha utilizado tradicionalmente para ayudar a aliviar los sofocos y otros síntomas asociados con la menopausia.",
      "Potencial antiinflamatorio: El trébol rojo tiene propiedades anti inflamatorias que pueden ser útiles para ciertas condiciones.",
      "Apoyo al sistema inmunológico: Algunos estudios sugieren que el trébol rojo puede fortalecer el sistema inmunológico, ayudando al cuerpo a combatir infecciones.",
      "Ayuda a la digestión: Puede contribuir a la mejora de la digestión y aliviar problemas gastrointestinales menores.",
      "Relajación y alivio del estrés: El café de trifolium pratense se utiliza a menudo como una bebida relajante que puede ayudar a aliviar el estrés y la ansiedad."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza, agregue aproximadamente 150 ml de agua tibia, mezcle homogéneamente, y disfrute de su sabor agradable.",
    ingredients: [
      "Crema no láctea (jarabe de almidón, aceite vegetal hidrogenado, caseinato de sodio, hidrogenofosfato de dimetilo, ésteres de ácidos grasos mono y digliderol, dióxido de silicio)",
      "Café instantáneo en polvo",
      "Extracto de rosa",
      "Extracto de semilla de lino",
      "Extracto de raíz de pueraria",
      "Extracto de trifolium pratense",
      "Sal, xilitol, eritritol, acesulfamo, dióxido de silicio, crema anhidra"
    ],
    precautions: "No recomendable para mujeres embarazadas ni bebés. Este producto también incluye ingredientes herbales naturales. No consumir si el sellado está roto o el producto está dañado. Es normal que se formen grumos después de la adición inicial de agua. Mezcle bien para romper los grumos del producto.",
    documentSlug: "trebol-coffee-hgw",
    inOfficialCatalog: true
  },
  {
    id: "291",
    code: "291",
    slug: "ashwaganda-coffee",
    name: "Ashwaganda Coffee",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/aswaganda-coffee.png",
    netContent: "15 gr",
    sachets: "12 sobres",
    presentation: "15g x 12 sobres (180g)",
    shelfLife: "24 meses",
    shortDescription: "Variante especial del café que combina las propiedades estimulantes de la cafeína con los beneficios relajantes y adaptógenos de la ashwaganda.",
    description: "El café ashwaganda es una variante especial del café que combina las propiedades estimulantes de la cafeína con los beneficios relajantes y adaptógenos de la ashwaganda. La ashwaganda, es una planta medicinal que se ha utilizado durante siglos en la medicina oriental debido a sus propiedades terapéuticas de relajación para el cuerpo humano.",
    advantages: [
      "Práctico e Instantáneo",
      "Fortalece al sistema inmunológico",
      "Ayuda a mejorar la concentración y claridad mental."
    ],
    benefits: [
      "Reducción del Estrés y la Ansiedad: Uno de los beneficios clave de la ashwaganda es su capacidad para reducir el estrés y la ansiedad. Cuando se combina con el café, proporciona una sensación de energía sostenible sin la estimulación excesiva.",
      "Mejora del Enfoque y la Concentración: La cafeína del café ashwaganda puede ayudar a mejorar la concentración y la claridad mental.",
      "Potencial para la Regulación del Sueño: Algunas personas han informado que el café ashwaganda les ayuda a mantener la energía durante el día y a conciliar el sueño más fácilmente por la noche.",
      "Propiedades Anti inflamatorias: La ashwaganda tiene propiedades anti inflamatorias que pueden ser beneficiosas para la salud en general.",
      "Apoyo a la Salud Inmunológica: Algunas investigaciones sugieren que la ashwaganda puede fortalecer el sistema inmunológico, lo que podría ser beneficioso en la prevención de enfermedades."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza, agregue aproximadamente 150 ml de agua tibia, mezcle homogéneamente, y disfrute de su sabor agradable.",
    ingredients: [
      "Crema no láctea (suero de almidón, aceite vegetal hidrogenado, caseinato de sodio, fosfato de hidrogeno dipotásico, ésteres de ácidos grasos mono y diglecerol, dióxido de silicio)",
      "Café instantáneo en polvo",
      "Extracto de ginseng indio",
      "Extracto de ostra",
      "Extracto de flor masculina de Eucommia",
      "Extracto de frambuesa",
      "Sal, xilitol, eritritol, acesulfamo, dióxido de silicio, celulosa microcristalina"
    ],
    precautions: "No recomendable para mujeres embarazadas ni bebés. Este producto también incluye ingredientes herbales naturales. No consumir si el sellado está roto o el producto está dañado. Es normal que se formen grumos después de la adición inicial de agua. Mezcle bien para romper los grumos del producto.",
    documentSlug: "ashwagandha-coffee-cafe-adaptogeno",
    inOfficialCatalog: true
  },
  {
    id: "0134",
    code: "0134",
    slug: "blueberry-coffee",
    name: "Blueberry Coffee",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/blueberry-coffee-p-500.png",
    netContent: "180 gr",
    sachets: "12 sobres",
    presentation: "15g x 12 sobres (180g)",
    shelfLife: "12 meses",
    shortDescription: "HGW combina el café soluble con el superalimento a base de arándanos, ofreciendo a sus consumidores un alimento funcional para el cuidado de su salud.",
    description: "HGW combina el café soluble con el superalimento a base de arándanos, ofreciendo a sus consumidores un alimento funcional para el cuidado de su salud.",
    advantages: [
      "Práctico e Instantáneo.",
      "Nutritivo, saludable y fortificado con arándanos.",
      "De suave textura, agradable aroma y un sabor delicioso.",
      "Elaborado con ingredientes cuidadosamente seleccionados, seguros, funcionales y de alta calidad."
    ],
    benefits: [
      "Café: Es rico en antocianinas, moléculas más pequeñas que la procianidina y de mejores efectos de osmosis y antioxidantes. La actividad antioxidante de las antocianinas es 50 veces mayor que la vitamina \"E\" y 200 veces mayor que la vitamina C. Tiene un 100% de biodisponibilidad para el cuerpo humano y actúa en la sangre 20 minutos después de ser tomado.",
      "Arándanos (Vaccinium corymbosum L): Es un potente aliado que ayuda a potenciar el sistema inmunológico y a la vez ayuda a quemar grasas. Disminuye la posibilidad de sufrir enfermedades neurodegenerativas, gracias a su alto contenido de nutrientes y antioxidantes. Ayuda a reforzar el sistema inmunológico, potencia el trabajo de la vista, los riñones y mejora la memoria, también favorece la absorción del hierro en el cuerpo y promueve la reducción del colesterol."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza, agregue aproximadamente 150 ml de agua caliente, mezcle homogéneamente, beba a una temperatura adecuada y disfrute de su sabor agradable.",
    ingredients: [
      "Crema no láctea",
      "Café instantáneo en polvo",
      "Arándanos en polvo",
      "Eritritol, xilitol, sal, acesulfamo de potasio, dióxido de Silicio y saborizante"
    ],
    precautions: "No consumir si es alérgico a alguno de los ingredientes.",
    documentSlug: "hgw-blueberry-soybean-milk-drink",
    inOfficialCatalog: true
  },
  {
    id: "0131",
    code: "0131",
    slug: "ganoderma-soluble-coffee",
    name: "Ganoderma Soluble Coffee",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/ganoderma-p-500.png",
    netContent: "180 gr",
    sachets: "12 sobres",
    presentation: "15g x 12 sobres (180g)",
    shelfLife: "24 meses",
    shortDescription: "HGW combina el café soluble con el milenario superalimento Ganoderma lucidum, ofreciendo así a sus consumidores un alimento funcional que ayude y garantice el cuidado de su salud.",
    description: "HGW combina el café soluble con el milenario superalimento Ganoderma lucidum, ofreciendo así a sus consumidores un alimento funcional que ayude y garantice el cuidado de su salud.",
    advantages: [
      "Práctico e Instantáneo.",
      "Nutritivo y Saludable.",
      "De suave textura, agradable aroma y sabor delicioso.",
      "Elaborado con ingredientes cuidadosamente seleccionados, seguros, funcionales y de alta calidad.",
      "Fortificado con extracto de Ganoderma lucidum."
    ],
    benefits: [
      "Café: \"estimulante\", \"energizante\", mejora la atención y concentración del individuo, reduce la sensación de fatiga mental, física y consigue retardar la aparición del Alzheimer.",
      "Ganoderma lucidum: Reduce el estrés oxidativo de las células, regula el sistema inmune, inhibe la angiogénesis y la formación de tumores. Favorece las respuestas antiinflamatorias en el organismo."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza, agregue aproximadamente 150 ml de agua caliente, mezcle homogéneamente, beba a una temperatura adecuada y disfrute de su sabor agradable.",
    ingredients: [
      "Café instantáneo en polvo",
      "Crema no láctea",
      "Ganoderma",
      "Azúcar granulada blanca",
      "Aromatizantes"
    ],
    precautions: "No consumir si es alérgico a alguno de los ingredientes.",
    documentSlug: "hgw-serie-cafe-funcional",
    inOfficialCatalog: true
  },
  {
    id: "0227",
    code: "0227",
    slug: "cordyceps-coffee",
    name: "Cordyceps Coffee",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Cordyceps-Coffee.png",
    netContent: "180 gr",
    sachets: "12 sobres",
    presentation: "15g x 12 sobres (180g)",
    shelfLife: "24 meses",
    shortDescription: "En la medicina alternativa el Cordyceps a menudo es utilizado para incrementar la energía natural de las personas, mejorar su rendimiento atlético, estimular el sistema inmune y retrasar el proceso de envejecimiento.",
    description: "En la medicina alternativa el Cordyceps a menudo es utilizado para incrementar la energía natural de las personas, mejorar su rendimiento atlético, estimular el sistema inmune y retrasar el proceso de envejecimiento. Tradicionalmente este producto es utilizado como coadyuvante en el tratamiento de enfermedades respiratorias como bronquitis crónica y asma bronquial.",
    advantages: [
      "Práctico e Instantáneo.",
      "De suave textura, agradable aroma y sabor delicioso.",
      "Fortificado con el milenario Cordyceps sinensis.",
      "Libre de octógonos."
    ],
    benefits: [
      "Cordyceps Sinensis: Es un tipo de hongo medicinal que ofrece beneficios antioxidantes y antiinflamatorios. Utilizado durante mucho tiempo en la medicina tradicional china y disponible como un suplemento dietético.",
      "Café: \"Estimulante\", \"energizante\", mejora la atención y concentración del individuo. Reduce la sensación de fatiga mental y física. Consigue retardar la aparición del Alzheimer."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza, agregue aproximadamente 150 ml de agua caliente, mezcle homogéneamente, beba a una temperatura adecuada y disfrute de su sabor agradable.",
    ingredients: [
      "Crema no láctea (jarabe de glucosa, aceite vegetal hidrogenado, caseinato de sodio, fosfato de dipotasio, mono y diglicéridos de ácidos grasos, dióxido de silicio amorfo)",
      "Café instantáneo en polvo",
      "Micelio de Cordyceps (cordyceps sinensis) en polvo",
      "Dióxido de Silicio Amorfo (E 551), celulosa microcristalina (E 460(i)), Sal, Acesulfamo de potasio (E 950), saborizante alimenticio"
    ],
    precautions: "Conservar el producto a temperatura ambiente en un lugar fresco y seco.",
    documentSlug: "cordyceps-hgw-ficha-tecnica",
    inOfficialCatalog: true
  },

  // ==========================================
  // 2. CAFÉS PREMIUM SIN AZÚCAR
  // ==========================================
  {
    id: "0260",
    code: "0260",
    slug: "black-tea-coffee",
    name: "Black Tea Coffee",
    category: "cafes-bebidas",
    categoryLabel: "Cafés Premium Sin Azúcar",
    price: 20.00,
    priceFormatted: "$20.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/black-tea-p-500.png",
    netContent: "42 gr",
    sachets: "12 sobres",
    presentation: "3.5g x 12 sobres (42g)",
    shelfLife: "24 meses",
    shortDescription: "Café premium sin azúcar endulzado naturalmente y fortificado con té negro, altamente benéfico para la salud cerebral y digestiva.",
    description: "La calidad de cafés de HGW nos hace líderes en el mercado, productos elaborados con materia prima de primera calidad hechos en base a Arándanos, Cordyceps, Ganoderma y té negro, entre otros. Los cafés de HGW contienen antioxidantes y otras sustancias activas que pueden reducir la inflamación interna y proteger los sistemas de las personas contra el efecto de las enfermedades.",
    advantages: [
      "Sin Azúcar y endulzado naturalmente.",
      "Práctico e Instantáneo.",
      "De suave textura, agradable aroma y sabor delicioso.",
      "Altamente benéfico para la salud cerebral."
    ],
    benefits: [
      "Café: Reduce la fatiga muscular y promueve la secreción de jugo digestivo, promueve la función renal y digestión, previene la distensión gástrica y aliviando el estreñimiento.",
      "Té negro: Coadyuva con la digestión gastrointestinal, promueve el apetito, tiene un efecto diurético, elimina el edema y fortalece la función cardíaca.",
      "Elimina la fatiga, promueve la reacción del pensamiento más rápido y mejora la memoria al estimular la corteza cerebral."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza, agregue aproximadamente 150 ml de agua caliente, mezcle homogéneamente, beba a una temperatura adecuada y disfrute de su sabor agradable.",
    ingredients: [
      "Café instantáneo en polvo",
      "Extracto de té negro (Camellia sinensis)"
    ],
    precautions: "Pacientes con cálculos, anemia o psicastenia no deben beber té negro. Las personas que toman medicamentos no se les permite beber té negro. El té negro destruye el efecto pesticida.",
    documentSlug: "hgw-serie-cafe-funcional",
    inOfficialCatalog: true
  },
  {
    id: "0262",
    code: "0262",
    slug: "coffee-ceps",
    name: "Coffee Ceps",
    category: "cafes-bebidas",
    categoryLabel: "Cafés Premium Sin Azúcar",
    price: 20.00,
    priceFormatted: "$20.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/cofee-ceps-p-500.png",
    netContent: "42 gr",
    sachets: "12 sobres",
    presentation: "3.5g x 12 sobres (42g)",
    shelfLife: "24 meses",
    shortDescription: "Café premium sin azúcar y endulzado naturalmente, fortificado con el milenario Cordyceps sinensis para vitalidad física, riñón y pulmón.",
    description: "Café premium sin azúcar y endulzado naturalmente, fortificado con el milenario Cordyceps sinensis. Rico en aminoácidos y vitaminas, su uso a largo plazo puede mejorar significativamente la inmunidad funcional.",
    advantages: [
      "Sin Azúcar y endulzado naturalmente.",
      "Práctico e Instantáneo.",
      "De suave textura, agradable aroma y sabor delicioso.",
      "Fortificado con el milenario Cordyceps sinensis."
    ],
    benefits: [
      "Café: Reduce la fatiga muscular y promueve la secreción de jugo digestivo, promueve la función renal y digestión, previene la distensión gástrica y aliviando el estreñimiento.",
      "Promueve la salud del riñón y el pulmón, es capaz de detener el sangrado y reducir la flema. Coadyuva a aliviar los síntomas de la menopausia.",
      "Tiene altos efectos que complementan la fuerza física, mejoran la capacidad del ejercicio y promueven la recuperación ante enfermedades cardiovasculares y cerebrovasculares.",
      "Micelio Cordyceps fermentado: Rico en aminoácidos y vitaminas. Su uso a largo plazo puede mejorar significativamente la inmunidad funcional y reducir la incidencia de infecciones y tumores."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza, agregue aproximadamente 150 ml de agua caliente, mezcle homogéneamente, beba a una temperatura adecuada y disfrute de su sabor agradable.",
    ingredients: [
      "Café instantáneo puro",
      "Micelio de Cordyceps sinensis fermentado"
    ],
    precautions: "Conservar el producto a temperatura ambiente en un lugar fresco y seco.",
    documentSlug: "cordyceps-hgw-ficha-tecnica",
    inOfficialCatalog: true
  },
  {
    id: "0261",
    code: "0261",
    slug: "berry-gano-coffee",
    name: "Berry Gano Coffee",
    category: "cafes-bebidas",
    categoryLabel: "Cafés Premium Sin Azúcar",
    price: 20.00,
    priceFormatted: "$20.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/blueberry-coffee-p-500.png",
    netContent: "42 gr",
    sachets: "12 sobres",
    presentation: "3.5g x 12 sobres (42g)",
    shelfLife: "24 meses",
    shortDescription: "HGW combina el café soluble sin azúcar con superalimento de arándanos, Ganoderma lucidum y extracto de ginseng.",
    description: "HGW combina el café soluble con el superalimento a base de arándanos, ofreciendo a sus consumidores un alimento funcional para el cuidado de su salud.",
    advantages: [
      "Sin azúcar, endulzado naturalmente.",
      "Práctico e Instantáneo.",
      "Fortificado con arándanos.",
      "Fortificado con extracto de Ganoderma Lucidum."
    ],
    benefits: [
      "Café: Reduce la fatiga muscular y promueve la secreción de jugo digestivo, previene la distensión gástrica y aliviando el estreñimiento.",
      "Extracto de Arándanos: Gran contenido de antioxidantes, efecto ralentizador del envejecimiento y función anticancerígena.",
      "Extracto de Ganoderma: Regula el sistema inmunológico, antitumoral y reduce los efectos secundarios causados por la radioterapia y la quimioterapia.",
      "Extracto de Ginseng: Antifatiga, antienvejecimiento y mejora la inmunidad del cuerpo.",
      "Potencia el trabajo de la vista, los riñones y mejora la memoria, también favorece la absorción del hierro en el cuerpo y promueve la reducción del colesterol."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza, agregue aproximadamente 150 ml de agua caliente, mezcle homogéneamente, beba a una temperatura adecuada y disfrute de su sabor agradable.",
    ingredients: [
      "Café instantáneo en polvo",
      "Extracto de arándanos",
      "Extracto de Ganoderma lucidum",
      "Extracto de ginseng",
      "Crema no láctea de origen vegetal"
    ],
    precautions: "No se recomienda a personas alérgicas a Ganoderma, mujeres durante el embarazo o período de lactancia o niños menores de 12 años.",
    documentSlug: "hgw-serie-cafe-funcional",
    inOfficialCatalog: true
  },

  // ==========================================
  // 3. CARAMELOS Y DULCES (Catálogo 2026)
  // ==========================================
  {
    id: "candy-coffee",
    code: "Sin código",
    slug: "coffee-candy",
    name: "Coffee Candy",
    category: "candies-snacks",
    categoryLabel: "Caramelos y Dulces",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Coffee-Candy-HGW-scaled.png",
    netContent: "30g (0.5g x 60u.)",
    presentation: "30g (0.5g x 60 unidades)",
    shelfLife: "24 meses",
    shortDescription: "Combina el gusto delicioso del café con la practicidad de un caramelo: energía, buen ánimo y bienestar en cualquier momento.",
    description: "Combina el gusto delicioso del café con la practicidad de un caramelo: una forma innovadora y agradable de llevar contigo energía, buen ánimo y bienestar, ideal para esos momentos en que necesitas un impulso extra.",
    advantages: [
      "Combinación práctica de sabor y energía en formato de caramelo.",
      "Ideal para cuando no puedes preparar café tradicional, pero necesitas un estímulo rápido.",
      "Portátil y discreto — lo puedes llevar en el bolso, cartera o auto, listo para consumir."
    ],
    benefits: [
      "Gracias a su contenido de café, ofrece un efecto estimulante y energizante.",
      "Ayudando a mejorar la concentración, la atención y a reducir la fatiga mental o física.",
      "Puede aportar protección celular y beneficio al sistema inmune."
    ],
    usage: "Dejar disolver en la boca en cualquier momento que se requiera energía, atención o un estímulo rápido.",
    ingredients: [
      "Extracto de café seleccionado",
      "Base de caramelo duro con edulcorantes naturales"
    ],
    precautions: "Conservar en lugar fresco y seco bien cerrado.",
    documentSlug: "blueberry-candy-fitonutritivos",
    inOfficialCatalog: true
  },
  {
    id: "candy-ganubi",
    code: "Sin código",
    slug: "ganubi-candy",
    name: "Ganubi Candy",
    category: "candies-snacks",
    categoryLabel: "Caramelos y Dulces",
    price: 8.30,
    priceFormatted: "$8.30",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Ganubi-Candy-HGW-scaled.png",
    netContent: "30g (0.5g x 60u.)",
    presentation: "30g (0.5g x 60 unidades)",
    shelfLife: "24 meses",
    shortDescription: "La forma más dulce y práctica de integrar los beneficios del hongo medicinal Ganoderma lucidum en tu rutina diaria.",
    description: "Te ofrece la forma más dulce y práctica de integrar los beneficios del hongo medicinal Ganoderma lucidum en tu rutina diaria. Disfruta de su sabor suave y natural, mientras cuidas tu bienestar desde el primer bocado.",
    advantages: [
      "Práctico y fácil de consumir en cualquier momento del día",
      "Sabor natural, dulce y agradable",
      "Formato conveniente para llevar contigo: perfecto para el trabajo, viajes o reuniones"
    ],
    benefits: [
      "Aporta antioxidantes naturales gracias al Ganoderma ayuda a reducir el estrés oxidativo en las células.",
      "Contribuye a fortalecer el sistema inmune, favoreciendo una protección integral.",
      "Puede ayudar a mejorar el equilibrio general del organismo, apoyando procesos naturales de bienestar."
    ],
    usage: "Dejar disolver en la boca 1 o más caramelos al día según preferencia.",
    ingredients: [
      "Extracto puro de Ganoderma lucidum (Reishi)",
      "Edulcorantes naturales",
      "Base funcional de caramelo duro"
    ],
    precautions: "Mantener en lugar fresco y fuera de la humedad.",
    documentSlug: "blueberry-candy-fitonutritivos",
    inOfficialCatalog: true
  },
  {
    id: "0144",
    code: "0144",
    slug: "caramelos-de-arandano",
    name: "Caramelos de Arándano (Blueberry Candy)",
    category: "candies-snacks",
    categoryLabel: "Caramelos y Dulces",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Blueberry-Candy.png",
    netContent: "30 gr",
    presentation: "30 gr (60 unidades)",
    shelfLife: "24 meses",
    shortDescription: "Los caramelos con Arándanos de HGW son una dulce y divertida forma de no dejar de aprovechar los beneficios nutritivos de los arándanos.",
    description: "Los caramelos con Arándanos de HGW son una dulce y divertida forma de no dejar de aprovechar los beneficios nutritivos de los arándanos.",
    advantages: [
      "Nutritivos y Saludables.",
      "Elaborado con el mayor cuidado para conservar su valor nutricional.",
      "Una dulce forma de llevar los arándanos contigo a todos lados.",
      "Con un aroma y sabor deliciosamente naturales.",
      "Ideal para endulzar tu día sin culpas."
    ],
    benefits: [
      "Los Arándanos: El alto contenido antioxidante de los arándanos ayuda a regular la respuesta inmune, promueve la actividad antiinflamatoria y fortalece las membranas celulares, entre otras funciones importantes.",
      "La Antocianina: Es uno de los principales bioactivos contenidos en los arándanos y en la actualidad existen diversos estudios que presentan evidencia científica que los extractos ricos en antocianinas pueden mejorar la agudeza visual."
    ],
    usage: "Retire el precinto y levante la tapa del frasco, tome la porción requerida (una o más unidades), y disfrute de su agradable sabor.",
    ingredients: [
      "Polvo de arándanos (blueberry)",
      "Azúcar blanco granulado",
      "D-manitol (E421)",
      "Maltodextrina",
      "Ácido cítrico (E330)",
      "HPMC (hidroxipropilmetilcelulosa), (E 464)",
      "Saborizante"
    ],
    precautions: "No consumir si es alérgico a alguno de los ingredientes.",
    documentSlug: "blueberry-candy-fitonutritivos",
    inOfficialCatalog: true
  },
  {
    id: "0338",
    code: "0338",
    slug: "biolacti-candy",
    name: "Biolacti Candy",
    category: "candies-snacks",
    categoryLabel: "Caramelos y Dulces",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Biolacti-candy-HGW-scaled.png",
    netContent: "30 g",
    presentation: "30 g (60 unidades)",
    shelfLife: "24 meses",
    shortDescription: "Caramelo duro con mezcla de 4 cepas probióticas activas y exquisito sabor a leche descremada con bajo aporte de azúcares.",
    description: "Este innovador caramelo duro no es solo una golosina; es una fuente conveniente y sabrosa de Probióticos, diseñada para ayudarte a mantener el equilibrio de tu flora intestinal día a día. Cada unidad de Biolacti Candy está cargada con una potente mezcla de cepas probióticas activas clave incluyendo lactobacillus acidophilus y Bifidobacterium longum que trabajan en sinergia para reforzar y equilibrar la microbiota intestinal. Este apoyo fundamental para una digestión saludable, el bienestar general y el refuerzo de las defensas naturales de tu cuerpo. Disfruta de todos los beneficios de los probióticos en un formato que es una verdadera delicia. Su exquisito sabor a leche descremada hace que tomar tus probióticos sea un placer, sin las texturas o sabores neutros de otros suplementos. Además, gracias a la utilización de Sorbitol y Sucralosa, este caramelo mantiene un bajo aporte de azúcares, haciendo que sea una opción inteligente.",
    advantages: [
      "Soporte Digestivo Portátil: Aporta probióticos esenciales para el equilibrio intestinal en un formato de caramelo fácil de llevar.",
      "Bajo en Azúcares: Endulzado con Sorbitol y Sucralosa, presenta un bajo contenido de azúcares (2.8g por 100g).",
      "Delicioso y Funcional: Integra los beneficios de las cepas probióticas en un agradable sabor a leche descremada."
    ],
    benefits: [
      "Potente mezcla de cepas probióticas activas clave incluyendo Lactobacillus acidophilus y Bifidobacterium longum que trabajan en sinergia para reforzar y equilibrar la microbiota intestinal.",
      "Apoyo fundamental para una digestión saludable, el bienestar general y el refuerzo de las defensas naturales de tu cuerpo.",
      "Exquisito sabor a leche descremada con bajo aporte de azúcares (endulzado con Sorbitol y Sucralosa)."
    ],
    usage: "Retire el precinto y levante la tapa del frasco, tome la porción requerida (1 o más unidades) y disfrute de su agradable sabor preferentemente cuando necesites un apoyo extra de vitalidad.",
    ingredients: [
      "Sorbitol (E420(i))",
      "Lactosa",
      "Leche descremada en polvo",
      "Mix de Probióticos (Lactobacillus acidophilus; Bifidobacterium longum; Bifidobacterium lactis y Streptococcus thermophilus)",
      "Aromatizante alimentario artificial (Aroma a leche)",
      "Ácido málico, DL-(E296)",
      "Estearato de magnesio (E 470(iii))",
      "Sucralosa (E 955)"
    ],
    precautions: "Conservar en lugar fresco y seco bien cerrado.",
    documentSlug: "blueberry-candy-fitonutritivos",
    inOfficialCatalog: true
  },
  {
    id: "0329",
    code: "0329",
    slug: "peptipro-candy",
    name: "Peptipro Candy",
    category: "candies-snacks",
    categoryLabel: "Caramelos y Dulces",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Peptipro-Candy-HGW-scaled.png",
    netContent: "30 g",
    presentation: "30 g (60 unidades)",
    shelfLife: "24 meses",
    shortDescription: "Innovador caramelo duro formulado con Péptidos de Colágeno y un delicioso sabor a Ginseng para vitalidad diaria.",
    description: "Peptipro Candy es un innovador caramelo duro formulado con Péptidos de Colágeno y un delicioso sabor a Ginseng. Diseñado para ofrecer un apoyo activo para su bienestar diario de una manera práctica y agradable. La dosis de vitalidad que puedes llevar contigo a todas partes.",
    advantages: [
      "Alta Biodisponibilidad: Los péptidos de colágeno son de fácil absorción para una mayor eficacia.",
      "Sabor Agradable: Combina los beneficios del colágeno con el refrescante y característico sabor del Ginseng en un caramelo.",
      "Dosis Precisas: Cada caramelo ofrece una porción exacta, facilitando su consumo constante."
    ],
    benefits: [
      "Apoya la Salud de Piel, Cabello y Uñas: Los péptidos de colágeno son fundamentales para mantener la firmeza de la piel y la fuerza del cabello y uñas.",
      "Ayuda a Reducir la Fatiga: El Ginseng contribuye a disminuir la sensación de cansancio y a mantener los niveles de energía.",
      "Formato Discreto y Delicioso: Disfruta de los beneficios del colágeno y el ginseng en cualquier momento y lugar, sin necesidad de agua o mezclas."
    ],
    usage: "Retire el precinto y levante la tapa del frasco, tome la porción requerida (1 o más unidades) y disfrute de su agradable sabor preferentemente cuando necesites un apoyo extra de vitalidad.",
    ingredients: [
      "Sorbitol (E 420(i))",
      "Maltodextrina",
      "Colágeno de rosa mosqueta (Rosa rubiginosa L.)",
      "Soya (Glycine max)",
      "Frijol mungo (Vigna radiata)",
      "Guisante (Pisum sativum)",
      "Ginseng (Panax ginseng)",
      "Estearato de magnesio (E 470(iii))"
    ],
    precautions: "Conservar en lugar fresco y seco.",
    documentSlug: "hgw-blueberry-collagen-peptide",
    inOfficialCatalog: true
  },
  {
    id: "0332",
    code: "0332",
    slug: "gestifruit-candy",
    name: "Gestifrut Candy",
    category: "candies-snacks",
    categoryLabel: "Caramelos y Dulces",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Gestifruit-Candy-HGW-scaled.png",
    netContent: "30 g",
    presentation: "30 g (60 unidades)",
    shelfLife: "24 meses",
    shortDescription: "Deliciosa opción con intenso sabor a mandarina, extracto de Espino blanco, Fucoidan y Melena de León.",
    description: "Disfruta de los caramelos Gestifrut Candy, una deliciosa opción con intenso sabor a mandarina que te brinda frescura en cada momento. Elaborados con la calidad de siempre, estos caramelos duros son perfectos para endulzar tu día, ya sea en el trabajo, en casa o mientras estás en movimiento.",
    advantages: [
      "Toque Fresco: El sabor vibrante a mandarina proporciona una estimulación sensorial instantánea, ayudando a despejar la mente.",
      "Práctico y discreto: Consume bienestar en cualquier momento y lugar.",
      "Dulce con propósito: Sustituye caramelos comunes por beneficios reales."
    ],
    benefits: [
      "Sabor Refrescante y Natural: Disfruta del auténtico y vibrante sabor de la mandarina en cada caramelo, ideal para refrescar tu aliento y paladar.",
      "Práctico Formato: El envase contiene 60 unidades, perfecto para compartir, llevar contigo a donde vayas (bolso, coche, oficina) y listo siempre a mano.",
      "Caramelo Duradero: Su textura de caramelo duro garantiza una experiencia de sabor prolongada. Su extracto de mandarina es fuente natural de vitamina C, que fortalece el sistema inmunológico."
    ],
    usage: "Retire el precinto y levante la tapa del frasco, tome la porción requerida (1 o más unidades) y disfrute de su agradable sabor.",
    ingredients: [
      "Sorbitol (E 420(i))",
      "Maltodextrina",
      "Extracto de Espino blanco (Crataegus pinnatifida Bunge) en polvo",
      "Fucoidan",
      "Cáscara de Mandarino (Citrus reticulata blanco) en polvo",
      "Ácido málico DL (E 296)",
      "Aromatizante alimentario artificial (Aroma a Espino blanco)",
      "Extracto de Melena de león (Hericium erinaceus) en polvo",
      "Estearato de magnesio (E470(iii))",
      "Extracto de rizoma de Nagaimo (Dioscorea opposita) en polvo",
      "Extracto de Cebada (Hordeum vulgare L.)"
    ],
    precautions: "Conservar en lugar fresco y seco.",
    documentSlug: "blueberry-candy-fitonutritivos",
    inOfficialCatalog: true
  },
  {
    id: "0336-moruva",
    code: "0336",
    slug: "moruva-candy",
    name: "Moruva Candy",
    category: "candies-snacks",
    categoryLabel: "Caramelos y Dulces",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Moruva-candy-HGW-scaled.png",
    netContent: "30g (0.5g x 60u.)",
    presentation: "30g (0.5g x 60 unidades)",
    shelfLife: "24 meses",
    shortDescription: "Caramelo duro con antioxidantes naturales de uva y moringa para apoyar los niveles de energía y complementar la alimentación diaria.",
    description: "Caramelos duros que aúnan las bondades de la moringa y la uva en un formato cómodo y delicioso, ideales para complementar la nutrición diaria.",
    advantages: [
      "Presentación práctica y fácil de transportar.",
      "Formato en caramelo duro, cómodo de consumir en cualquier momento.",
      "Sabor agradable que facilita su consumo diario."
    ],
    benefits: [
      "Aporta antioxidantes naturales gracias a la uva.",
      "Contribuye al bienestar general por su contenido de moringa.",
      "Puede apoyar los niveles de energía de forma natural.",
      "Ayuda a complementar la alimentación diaria.",
      "Brinda una alternativa dulce con ingredientes de origen vegetal."
    ],
    usage: "Consumir de 1 a 3 caramelos al día. Dejar disolver en la boca. Puede tomarse en cualquier momento del día. Conservar en un lugar fresco y seco, bien cerrado.",
    ingredients: [
      "Extracto de moringa de alta pureza",
      "Concentrado y extracto de uva rico en polifenoles",
      "Base de caramelo duro vegetal"
    ],
    precautions: "Conservar en un lugar fresco y seco, bien cerrado.",
    documentSlug: "blueberry-candy-fitonutritivos",
    inOfficialCatalog: true
  },
  {
    id: "0336-herbal",
    code: "0336",
    slug: "herbal-fresh-candy",
    name: "Herbal Fresh Candy",
    category: "candies-snacks",
    categoryLabel: "Caramelos y Dulces",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/HERBAL-FRESH-CANDY-HGW.png",
    netContent: "30g (0.5g x 60u.)",
    presentation: "30g (0.5g x 60 unidades)",
    shelfLife: "24 meses",
    shortDescription: "Caramelos con ingredientes naturales y extractos herbales para una sensación prolongada de frescura y aliento limpio.",
    description: "Caramelos formulados con ingredientes botánicos naturales que promueven una sensación de frescura y bienestar en la boca.",
    advantages: [
      "Sabor agradable y refrescante.",
      "Fórmula con ingredientes naturales.",
      "Fácil de llevar contigo en cualquier momento.",
      "Ideal para después de comer o al hablar mucho."
    ],
    benefits: [
      "Promueve una sensación de frescura en la boca.",
      "Ayuda a mantener el aliento fresco durante el día.",
      "Puede contribuir a una sensación de bienestar gracias a sus extractos herbales.",
      "Opción más natural frente a caramelos comunes con muchos aditivos.",
      "Aporta un momento de disfrute sin sensación pesada."
    ],
    usage: "Consumir 1 caramelo cuando necesites frescura en el aliento. Repetir según preferencia, cuidando la cantidad diaria. Masticar o dejar disolver. Úsalo después de comidas o antes de reuniones/socializar para sentirte más seguro con tu aliento.",
    ingredients: [
      "Extractos herbales naturales seleccionados",
      "Esencia botánica refrescante",
      "Base edulcorada natural"
    ],
    precautions: "Conservar en frasco cerrado en lugar fresco y seco.",
    documentSlug: "blueberry-candy-fitonutritivos",
    inOfficialCatalog: true
  },

  // ==========================================
  // 4. DULCES BERRY Y BEBIDAS
  // ==========================================
  {
    id: "choco-blue",
    code: "Sin código",
    slug: "choco-blue",
    name: "Choco Blue",
    category: "candies-snacks",
    categoryLabel: "Dulces Berry y Bebidas",
    price: 40.00,
    priceFormatted: "$40.00",
    inStock: true,
    featured: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Choco_Blue_HGW-removebg-preview.png",
    netContent: "660g (33g x 20 sachets)",
    sachets: "20 sachets",
    presentation: "660g (33g x 20 sachets)",
    shelfLife: "24 meses",
    shortDescription: "La mezcla perfecta de cacao natural, leche descremada y arándanos, una bebida en polvo nutritiva y reconfortante.",
    description: "La mezcla perfecta de cacao natural, leche descremada y arándanos, una bebida en polvo nutritiva y reconfortante que combina energía, sabor y bienestar. Ideal para disfrutar en cualquier momento del día: desayuno, merienda o una pausa dulce.",
    advantages: [
      "Sabor delicioso, reconfortante y natural",
      "Versátil: se puede disfrutar con agua caliente o leche, según tu preferencia.",
      "Formato que facilita su preparación rápida, ideal para el hogar o la oficina."
    ],
    benefits: [
      "El cacao natural es fuente de antioxidantes, que ayudan a proteger las células del estrés oxidativo.",
      "La leche descremada aporta proteínas y calcio, con bajo contenido de grasa, siendo una opción balanceada y nutritiva.",
      "El componente de arándano aporta antioxidantes y nutrientes naturales que favorecen la salud cardiovascular, el bienestar general y pueden contribuir al cuidado celular."
    ],
    usage: "Disuelve el producto en una taza de agua caliente o leche, mezcla bien y disfruta. Perfecto en desayuno, merienda o como bebida reconfortante en cualquier momento del día.",
    ingredients: [
      "Cacao natural puro en polvo",
      "Leche descremada",
      "Polvo de arándanos (Vaccinium corymbosum L.)",
      "Antioxidantes naturales"
    ],
    precautions: "Conservar en lugar fresco y seco.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: true
  },
  {
    id: "0339",
    code: "0339",
    slug: "choco-gano",
    name: "Choco Gano",
    category: "candies-snacks",
    categoryLabel: "Dulces Berry y Bebidas",
    price: 40.00,
    priceFormatted: "$40.00",
    inStock: true,
    featured: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Choco-Gano-HGW.webp",
    netContent: "660 g",
    sachets: "20 porciones de 33g",
    presentation: "660 g (20 porciones de 33g)",
    shelfLife: "24 meses",
    shortDescription: "Bebida instantánea que combina el reconfortante sabor del cacao con la suavidad de la leche descremada y el valioso aporte del Ganoderma.",
    description: "CHOCO GANO, la exquisita mezcla en polvo para preparar una bebida instantánea que combina el reconfortante sabor del cacao con la suavidad de la leche descremada y el valioso aporte del Ganoderma. Diseñado para quienes buscan un momento de placer y bienestar en su día a día, este producto no solo deleita el paladar, sino que también incorpora propiedades benéficas gracias a su composición única. Cada caja contiene 20 porciones de 33 gramos, ideal para disfrutar de forma regular sin complicaciones.",
    advantages: [
      "Listo en instantes: Disolución inmediata en agua fría o caliente.",
      "Práctico y portátil: Sobres individuales ideales para llevar a cualquier lugar.",
      "Bienestar integral: Aporta energía con los beneficios antioxidantes del Ganoderma."
    ],
    benefits: [
      "Ofrece energía y nutrición con un perfil bajo en grasa, gracias a la leche descremada.",
      "El Ganoderma, reconocido por sus propiedades antioxidantes y de apoyo al sistema inmunológico, enriquece esta fórmula cuidando tu salud.",
      "Textura suave y homogénea en sobres individuales que garantizan frescura y dosificación perfecta."
    ],
    usage: "Preparar Choco Gano es tan fácil como disfrutarlo:\n1. Vacía el contenido de un sachet de 33 g en una taza.\n2. Añade aproximadamente 180 ml de agua o leche caliente.\n3. Mezcla bien hasta obtener una textura suave y homogénea.",
    ingredients: [
      "Cacao natural en polvo",
      "Leche descremada en polvo",
      "Extracto de Ganoderma lucidum",
      "Edulcorantes de perfil controlado"
    ],
    precautions: "Conservar en lugar fresco y seco.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: true
  },
  {
    id: "0209",
    code: "0209",
    slug: "lactiberry",
    name: "Lactiberry – Producto lácteo y té negro",
    category: "candies-snacks",
    categoryLabel: "Dulces Berry y Bebidas",
    price: 26.00,
    priceFormatted: "$26.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/lactiberry-p-500.png",
    netContent: "300 gr",
    sachets: "10 sobres (30 g c/u)",
    presentation: "300 gr (10 sachets de 30 g c/u)",
    shelfLife: "12 meses",
    shortDescription: "Fórmula a base de arándanos, producto lácteo derivado de Nueva Zelanda y té negro para la nutrición diaria.",
    description: "HGW ha desarrollado una agradable, instantánea y nutritiva fórmula a base de arándanos, producto lácteo y té negro para contribuir a la nutrición diaria de sus consumidores.",
    advantages: [
      "Elaborado con el mayor cuidado para conservar su valor nutricional.",
      "Con nutrientes que aportan a la dieta diaria requerida en el consumo humano.",
      "Puede presentar trozos de la fruta de arándanos.",
      "Con un delicioso aroma y un sabor natural.",
      "Nutritiva y Saludable.",
      "Con producto lácteo derivado de la producción de leche de Nueva Zelanda."
    ],
    benefits: [
      "Los Arándanos: El alto contenido antioxidante de los arándanos ayuda a regular la respuesta inmune, promueve la actividad antiinflamatoria y fortalece las membranas celulares, entre otras funciones importantes.",
      "La Antocianina: Es uno de los principales bioactivos contenidos en los arándanos y en la actualidad existen diversos estudios que presentan evidencia científica que los extractos ricos en antocianinas pueden mejorar la agudeza visual.",
      "Suero de leche: Es una fuente de proteínas que podría mejorar el contenido de los nutrientes en la dieta y tener efectos beneficiosos sobre el sistema inmunológico.",
      "Té Negro: Disminuye el riesgo de fractura de cadera en mujeres y hombres ancianos, también contiene antioxidantes y otras sustancias que podrían ayudar a proteger el corazón y los vasos sanguíneos."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza, agregue aproximadamente 150ml de agua caliente, mezcle homogéneamente y beba a una temperatura adecuada.",
    ingredients: [
      "Crema no láctea",
      "Azúcar blanca granulada",
      "Arándanos en polvo (1.5%)",
      "Suero de leche",
      "Té (Camellia sinensis) negro",
      "Leche desnatada en polvo",
      "Maltodextrina, E 551 y saborizante"
    ],
    precautions: "No consumir si es alérgico a alguno de los ingredientes.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: true
  },
  {
    id: "0147",
    code: "0147",
    slug: "mermelada-frutada",
    name: "Mermelada Frutada (Blueberry Fruit Tea / Jam)",
    category: "candies-snacks",
    categoryLabel: "Dulces Berry y Bebidas",
    price: 12.00,
    priceFormatted: "$12.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/mermelada-p-500.png",
    netContent: "200 gr",
    presentation: "Frasco de 200 gr",
    shelfLife: "12 meses",
    shortDescription: "La Mermelada HGW es una deliciosa concentración de arándanos, elaborada con el mayor cuidado para preservar todos sus valores nutricionales.",
    description: "La Mermelada HGW es una deliciosa concentración de arándanos, elaborada con el mayor cuidado para preservar todos sus valores nutricionales.",
    advantages: [
      "Una dulce forma de presentar los arándanos en la mesa familiar para disfrutar los desayunos.",
      "Nutritiva y saludable.",
      "De suave textura, agradable aroma y sabor deliciosamente natural.",
      "Puede contener trozos de arándanos.",
      "Elaborado con el mayor cuidado y de forma tradicional."
    ],
    benefits: [
      "Arándanos: El alto contenido antioxidante de los arándanos ayuda a regular la respuesta inmune, promueve la actividad antiinflamatoria y fortalece las membranas celulares, entre otras funciones importantes.",
      "La Antocianina: Es uno de los principales bioactivos contenidos en los arándanos y en la actualidad existen diversos estudios que presentan evidencia científica que los extractos ricos en antocianinas pueden mejorar la agudeza visual."
    ],
    usage: "Retire el precinto de seguridad del producto, destape y tome la porción según necesidad. Disfrute de su agradable sabor natural.",
    ingredients: [
      "Arándano",
      "Azúcar blanca granulada",
      "Jarabe de malta",
      "Pectina y ácido cítrico"
    ],
    precautions: "No consumir si es alérgico a alguno de los ingredientes. Conservar refrigerado después de abrir.",
    documentSlug: "blueberry-candy-fitonutritivos",
    inOfficialCatalog: true
  },
  {
    id: "0215",
    code: "0215",
    slug: "peptido-de-colageno-y-arandanos",
    name: "Péptido de Colágeno y Arándanos",
    category: "candies-snacks",
    categoryLabel: "Dulces Berry y Bebidas",
    price: 29.00,
    priceFormatted: "$29.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/17._HGW_Blueberry_Collagen_Peptide-1024x576.png",
    netContent: "300 gr",
    sachets: "12 sobres",
    presentation: "300 gr (12 sachets)",
    shelfLife: "24 meses",
    shortDescription: "Nutritivo y funcional a base de mezcla de jugo concentrado de frutas y verduras; fortificado con péptidos de colágeno, vitaminas y minerales.",
    description: "Nutritivo y funcional a base de mezcla de jugo concentrado de frutas y verduras; fortificado con péptidos de colágeno, vitaminas y minerales.",
    advantages: [
      "Consistencia blanda para la fácil digestión.",
      "Con fresco y agradable sabor a fruta natural.",
      "Elaborado con jugo concentrado de frutas y verduras.",
      "Fortificado con Péptido de Colágeno, vitaminas y minerales.",
      "Empaque seguro y práctico."
    ],
    benefits: [
      "Elaborado con ingredientes naturales, nutritivos y funcionales regenerativos enfocados en restaurar y rejuvenecer las células del cuerpo, en especial cartílagos, huesos, articulaciones y elasticidad de la piel.",
      "Las frutas y verduras son las principales fuentes de alimentación saludable del colágeno HGW. Son una fuente versátil de proteínas y elementos importantes de la nutrición moderna indispensable para el cuerpo.",
      "El Colágeno por sus propiedades nutricionales y fisiológicas contribuye al cuidado de la salud previniendo el desgaste natural del paso del tiempo sobre el sistema óseo, piel, órganos y células de todo el organismo.",
      "Las vitaminas y minerales son micronutrientes que regulan el funcionamiento del organismo ayudando a prevenir diferentes enfermedades."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en una taza o vaso, mezcle con agua tibia o consuma directamente y disfrute de su agradable sabor frutal natural.",
    ingredients: [
      "Jugo compuesto de frutas y verduras: Cereza, arándanos, manzana, piña, papaya, kiwi, limón, naranja sanguina, acerola, açaí y uva.",
      "Fortificado con: Péptido y Tripéptido de colágeno",
      "Vitaminas (A, C, B1, B6, B12, D, E)",
      "Minerales (calcio, magnesio, hierro, zinc)",
      "Extracto de levadura y fructooligosacáridos (FOS)",
      "Otros componentes de grado alimentario aprobados por CODEX ALIMENTARIUS y FDA"
    ],
    precautions: "No consumir si es alérgico a los componentes del producto.",
    documentSlug: "hgw-blueberry-collagen-peptide",
    inOfficialCatalog: true
  },
  {
    id: "0257",
    code: "0257",
    slug: "blueberry-wine",
    name: "Blueberry Wine – Vino de arándanos",
    category: "candies-snacks",
    categoryLabel: "Dulces Berry y Bebidas",
    price: 36.00,
    priceFormatted: "$36.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Vino-de-arandanos-HGW.jpg",
    netContent: "750 ml",
    presentation: "Botella de vidrio de 750 ml",
    shelfLife: "24 meses",
    shortDescription: "El vino de arándano aumenta el sistema neuronal. Los arándanos utilizados para hacer este vino producen compuestos que protegen nuestro sistema inmunológico.",
    description: "El vino de arándano aumenta el sistema neuronal. Los arándanos utilizados para hacer este vino producen compuestos que protegen nuestro sistema inmunológico. Puede reducir el colesterol e incluso reducir las tasas inflamatorias en el cuerpo.",
    advantages: [
      "Es ideal contra la diabetes, enfermedades neurodegenerativas.",
      "Tiene un potente efecto antiinflamatorio.",
      "Es efectivo para combatir el envejecimiento."
    ],
    benefits: [
      "El vino de arándano aumenta el sistema neuronal y protege nuestro sistema inmunológico.",
      "Puede reducir el colesterol e incluso reducir las tasas inflamatorias en el cuerpo.",
      "Gran concentración de antioxidantes naturales y polifenoles bioactivos."
    ],
    usage: "Deje reposar la botella al menos una hora antes de abrirla. Descorche media hora antes de su consumo y déjelo \"respirar\" para aumentar su aroma y potenciar su sabor. Temperatura de servicio: 12 a 14 °C.",
    ingredients: [
      "Frutos de arándanos seleccionados",
      "Contiene sulfitos propios de fermentación"
    ],
    precautions: "Conservar el producto a temperatura ambiente en un lugar fresco y seco. Mantener fuera del alcance de los niños. EL CONSUMO EXCESIVO DE ALCOHOL ES DAÑINO PARA LA SALUD. VENTA PROHIBIDA A MENORES DE 18 AÑOS DE EDAD.",
    documentSlug: "blueberry-wine-bebida-enologica",
    inOfficialCatalog: true
  },

  // ==========================================
  // 5. MIX HERBALES (Catálogo 2026)
  // ==========================================
  {
    id: "0211",
    code: "0211",
    slug: "bebida-digestiva-chang-jing-jing",
    name: "Bebida Digestiva Chang Jing Jing (Fresh Drink)",
    category: "cafes-bebidas",
    categoryLabel: "Mix Herbales",
    price: 13.00,
    priceFormatted: "$13.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/fresh-drink-p-500.png",
    netContent: "21 gr",
    sachets: "6 sobres",
    presentation: "21 gr (6 sachets)",
    shelfLife: "24 meses",
    shortDescription: "Selecta mezcla herbal de preparación instantánea en una deliciosa bebida refrescante, digestiva y natural para limpieza profunda del colon.",
    description: "Es una selecta mezcla herbal de preparación instantánea en una deliciosa bebida refrescante, digestiva y natural capaz de ofrecer una limpieza amigable pero profunda del colón, previniendo cuadros de intoxicación severa y cuidados contra el cáncer del intestino. Siente el poder de la naturaleza y recupera tu vitalidad.",
    advantages: [
      "Instantáneo y de fácil disolución.",
      "Bebida verde, refrescante y digestiva.",
      "Elaborado con la más cuidadosa selección de plantas fitonutritivas y funcionales.",
      "Rico en fibra y cero en grasas.",
      "Contiene un fresco y agradable sabor a hierba natural.",
      "Con un empaque seguro y práctico."
    ],
    benefits: [
      "Hierba de cebada: Es rica en nutrientes, tales como; vitaminas, minerales, proteínas y fibra soluble, necesarias para la dieta humana junto a la clorofila.",
      "Bayas de goji: Son muy ricas en antioxidantes naturales que mejoran nuestro sistema inmunitario.",
      "Raíz de gan cao o regaliz: Es un agente saborizante utilizado en la preparación de algunos alimentos y tradicionalmente manejado por la cultura china para aliviar algunos malestares digestivos.",
      "Diente de león: Apreciado como ingrediente culinario ya que puede ser añadido en sopas, ensaladas o infusiones, entre otros alimentos y tradicionalmente es utilizado por la cultura china para mejorar el rendimiento hepático.",
      "Clorofila: Consumida tradicionalmente como un buen tónico vital por su excelente efecto alcalinizante que equilibra el pH en el cuerpo humano, mejorando el rendimiento físico e intelectual.",
      "Ingesta de fibra: Contribuye a regular el tránsito intestinal y el estreñimiento."
    ],
    usage: "Vierta el contenido de un sachet en 500 ml de agua, agite suavemente hasta disolver, beba y disfrute su refrescante sabor a hierba verde.",
    ingredients: [
      "Cebada en polvo",
      "Bayas de goji (fruto)",
      "Gan Cao (raíz)",
      "Diente de león (flor y hojas)",
      "Crisantemo (flor)",
      "Dextrina resistente",
      "Ácido cítrico (E330), citrato de sodio (E331), dióxido de silicio (E551), sucralosa (E955), celulosa microcristalina (E460i)"
    ],
    precautions: "No consumir si es alérgico a alguno de los ingredientes.",
    documentSlug: "hgw-serie-cafe-funcional",
    inOfficialCatalog: true
  },
  {
    id: "0221",
    code: "0221",
    slug: "pro-shaping-tea",
    name: "Pro-Shaping Tea – Mezcla de hierbas para infusión",
    category: "cafes-bebidas",
    categoryLabel: "Mix Herbales",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/TE-QUEMADOR-DE-GRAS-HGW.jpeg",
    netContent: "72 gr",
    sachets: "24 sobres",
    presentation: "72 gr (24 bolsitas filtrantes)",
    shelfLife: "36 meses",
    shortDescription: "Aromática bebida digestiva, tonificante y natural capaz de eliminar tejidos lípidos del organismo o grasas localizadas y reducir el colesterol.",
    description: "HGW ha combinado una selecta mezcla para la preparación instantánea de una aromática bebida digestiva, tonificante y natural capaz de eliminar tejidos lípidos del organismo o grasas localizadas, así como reducir los niveles elevados de colesterol en la sangre. ¡Siente el poder de la naturaleza y recupera tu vitalidad!",
    advantages: [
      "Concentrado de hierbas en bolsita filtrante.",
      "Mezcla digestiva, tonificante y aromática.",
      "Con ingredientes milenarios, tradicionales y naturales.",
      "Elaborado con el mayor cuidado para conservar su valor nutricional.",
      "Con un empaque seguro y práctico."
    ],
    benefits: [
      "Té verde: Diferentes estudios realizados refieren su uso como antioxidante, en casos de asma e hiperlipemias, así como coadyuvante en el tratamiento del sobrepeso.",
      "Semillas de casia: Tradicionalmente usadas por la cultura china para ayudar a mejorar la circulación y activar el flujo sanguíneo.",
      "Espino blanco: Tradicionalmente usado en infusiones para contribuir a mejorar el funcionamiento del sistema circulatorio.",
      "Ginseng: Tradicionalmente usado en infusiones para contribuir a mejorar el funcionamiento del sistema circulatorio.",
      "Arroz rojo: En la medicina tradicional china lo han utilizado para solucionar problemas digestivos y circulatorios."
    ],
    usage: "Coloque una bolsita filtrante en una taza y agregue 250 ml de agua hirviendo, deje reposar por 5 minutos aproximadamente. Disfrute del aromático y suave sabor de la infusión.",
    ingredients: [
      "Espino (Crataegus spp.)",
      "Sang ye (Folium mori)",
      "Té verde (Camellia sinensis)",
      "Semen Cassiae",
      "Ginseng (Panax ginseng)",
      "Arroz (Oryza sativa)"
    ],
    precautions: "No consumir si es alérgico a alguno de los ingredientes.",
    documentSlug: "hgw-serie-cafe-funcional",
    inOfficialCatalog: true
  },
  {
    id: "0253",
    code: "0253",
    slug: "berry-juice",
    name: "Berry Juice – Jugo de bayas rico en vitamina C",
    category: "cafes-bebidas",
    categoryLabel: "Mix Herbales",
    price: 25.00,
    priceFormatted: "$25.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/berry-juice-p-500.png",
    netContent: "6 gr",
    sachets: "30 sachets",
    presentation: "6 gr x 30 sachets",
    shelfLife: "24 meses",
    shortDescription: "Jugo de uva en polvo rico en vitamina C con arándanos, frambuesas, moras y cerezas para inmunidad y salud visual.",
    description: "Jugo de uva en polvo rico en vitamina C, el sabor y la nutrición son más atractivos si están presentes en un solo producto. ¡Una explosión de arándanos, frambuesas, moras y cerezas!",
    advantages: [
      "Protege la salud visual de los niños.",
      "Antioxidante, antiinflamatorio y antibacteriano.",
      "Promueve la producción de colágeno.",
      "Ayuda a regular la inmunidad.",
      "Contiene una variedad de frutas ricas en nutrientes y alto contenido de antioxidantes."
    ],
    benefits: [
      "Arándano: Enriquecido con un gran grupo de nutrientes antioxidantes antocianinas de arándano, flavonoides, polifenoles, betacaroteno, resveratrol, pterostilbeno, SOD, antioxidante, antiinflamatorio, brindando una protección ocular, anticardíaca y cerebral. Alto contenido de vitaminas y minerales como potasio, magnesio, manganeso y selenio.",
      "Moras: Conocido también como fruto de la vida y diamante negro gracias a sus propiedades antioxidantes, antiinflamatorias y antivirales. Aumenta la vitalidad celular gracias a la vitamina C y betacaroteno que contiene.",
      "Cereza: Ayuda a mejorar la calidad del sueño por su rico contenido en melatonina vegetal y su aporte nutritivo por la presencia de betacaroteno, hierro, calcio y fósforo.",
      "Uva: Excelente antioxidante natural que reduce la viscosidad de la sangre e inhibe la actividad plaquetaria."
    ],
    usage: "Vierta el contenido de 1 sachet del producto en un vaso o taza, agregue 150ml aproximadamente de agua tibia, revuelva uniformemente y disfrute de un sabor agradable.",
    ingredients: [
      "Maltodextrina",
      "L-ácido ascórbico (E 300)",
      "Jugo de arándano en polvo",
      "Jugo de uva en polvo",
      "Extracto de arándanos en polvo",
      "DL-ácido málico (E 296)",
      "Ácido cítrico (E 330)",
      "Dextrina resistente",
      "Saborizante natural a arándanos",
      "Sucralosa (E 955)",
      "Extracto de cereza en polvo, extracto de frambuesa en polvo y extracto de mora en polvo"
    ],
    precautions: "Almacenar a temperatura no mayor a 30°C. Conservar el producto a temperatura ambiente en un lugar fresco y seco.",
    documentSlug: "berry-juice-concentrado-frutas",
    inOfficialCatalog: true
  },
  {
    id: "0213",
    code: "0213",
    slug: "proteina-de-soya-y-arandano",
    name: "Proteína de Soya y Arándano",
    category: "cafes-bebidas",
    categoryLabel: "Mix Herbales",
    price: 36.00,
    priceFormatted: "$36.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/proteina-soya-p-500.png",
    netContent: "240 gr",
    sachets: "12 sobres",
    presentation: "240 gr (12 sachets)",
    shelfLife: "24 meses",
    shortDescription: "Bebida nutritiva y saludable a base de proteína aislada de soya, maní y arándano. Libre de octógonos y ligeramente dulce.",
    description: "La buena alimentación es esencial para llevar un estilo de vida saludable. Esta bebida combina proteína aislada de soya, maní y el alto poder antioxidante del arándano para el mantenimiento muscular y cardiovascular.",
    advantages: [
      "Nutritivo y saludable para tu día.",
      "Libre de Octógonos.",
      "Contiene proteínas vegetales.",
      "Ligeramente dulce."
    ],
    benefits: [
      "Proteína Aislada de Soya: Reduce las concentraciones de colesterol sanguíneo y es una fuente de isoflavonas, jugando un papel importante en la prevención de enfermedades del corazón (Wong, 1998). La proteína de soya contiene todos los aminoácidos esenciales requeridos en la nutrición humana.",
      "Proteína de Maní: De origen vegetal contiene ricas cadenas de aminoácidos en su formación, que ayudan a la construcción muscular, además sus proteínas son ricas en arginina. Es de lenta digestión, lo que lo hace un acompañante ideal en caminatas, montañismo o deportes de larga duración.",
      "Arándano: Es el alimento de mayor poder antioxidante del siglo XXI. La principal propiedad de estos frutos son sus altos contenidos de antocianinas y vitaminas, que intervienen en la formación de colágeno, huesos, dientes, glóbulos rojos y favorecen la absorción del hierro de los alimentos y la resistencia a las infecciones (EROSKI, s.f.; Ostrolucka et al., 2008).",
      "Lecitina de Soya: Una de las funciones es su poder de aportar ácidos grasos muy saludables, como el linoleico y el linolénico, además de inositol, colina y fósforo, contribuyendo a mejorar el perfil lipídico en sangre y cardiovascular.",
      "Konjac: Funciona como una fibra dietética viscosa, uno de sus principales usos nutracéuticos es disminuir el colesterol, evita también la absorción de algunas grasas y provoca saciedad, siendo un potencial coadyuvante para el control de la obesidad, hiperglucemia (disminuye los niveles de glucosa e insulina), hiperlipidemia e hipercolesterolemia (interfiere en el transporte de colesterol y ácidos biliares).",
      "Xilitol: Edulcorante, tiene propiedades anticariogénicas y su metabolismo es independiente de la insulina. Suelen ser útiles en alimentos para diabéticos o para personas con triglicéridos altos en la sangre."
    ],
    usage: "Disolver 1 sachet en 200 ml de agua tibia o fría, agitar bien y consumir.",
    ingredients: [
      "Proteína aislada de soya",
      "Proteína de maní",
      "Arándanos en polvo",
      "Lecitina de soya",
      "Konjac",
      "Xilitol"
    ],
    precautions: "Contiene derivados de soya y maní. Evite su consumo si es alérgico a alguno de sus componentes.",
    documentSlug: "hgw-blueberry-soybean-milk-drink",
    inOfficialCatalog: true
  },

  // ==========================================
  // 6. SUPLEMENTOS (Catálogo 2026)
  // ==========================================
  {
    id: "0008",
    code: "0008",
    slug: "spirulina-plus",
    name: "Spirulina Plus (Producto natural)",
    category: "cuidado-personal",
    categoryLabel: "Suplementos",
    price: 25.00,
    priceFormatted: "$25.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/13._ESPIRULINA-1024x576.png",
    netContent: "500 mg",
    presentation: "500 mg x 60 cápsulas",
    shelfLife: "24 meses",
    shortDescription: "Excelente fuente de antioxidantes, vitaminas, minerales y otros nutrientes esenciales para el cuidado de la salud basados en la microalga espirulina.",
    description: "Excelente fuente de antioxidantes, vitaminas, minerales y otros nutrientes que son esenciales para el cuidado de la salud. Las pastillas de Spirulina Plus son un suplemento nutricional basado en espirulina, una microalga considerada un superalimento.",
    advantages: [
      "Superalimento 100% natural de fácil asimilación.",
      "Excelente fuente de clorofila, proteínas y minerales esenciales.",
      "Práctica dosificación diaria en cápsulas seguras."
    ],
    benefits: [
      "Aumenta la energía y vitalidad",
      "Refuerza el sistema inmunológico",
      "Mejora la nutrición diaria",
      "Apoya la desintoxicación del organismo",
      "Contribuye al control del peso y el apetito"
    ],
    usage: "Vía de administración: Oral. Dosificación (adultos): Tomar 1 o 2 cápsulas al día con agua. Condiciones de venta: Sin receta médica.",
    ingredients: [
      "Microalga espirulina pura seleccionada (500 mg por cápsula)"
    ],
    precautions: "Si está embarazada o amamantando, consulte a un profesional de la salud antes de consumir el producto. No usar en caso de gota y/o fenilcetonuria.",
    documentSlug: "espirulina-hgw-nutricion-celular",
    inOfficialCatalog: true
  },

  // ==========================================
  // 7. CUIDADO PERSONAL (SMILIFE e Higiene)
  // ==========================================
  {
    id: "1122",
    code: "1122",
    slug: "enjoyable-panty-liner",
    name: "Enjoyable Panty Liner – Toalla íntima de uso diario",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal",
    price: 5.50,
    priceFormatted: "$5.50",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/70._PROTECTORES_TURMALINA-1024x576.png",
    netContent: "30 unidades",
    presentation: "Paquete de 30 unidades",
    shelfLife: "36 meses",
    shortDescription: "Toalla sanitaria con textura de algodón suave para la piel y con banda de turmalina generadora de aniones para la higiene y protección femenina.",
    description: "Toalla sanitaria con textura de algodón suave para la piel y con banda de turmalina generadora de aniones para la higiene y protección en el cuidado de la salud femenina.",
    advantages: [
      "Textura suave, ultrafina y una excelente absorción.",
      "Diseño de última generación.",
      "Estructurada con multicapas y materiales de primera calidad.",
      "Anatómicamente cómoda y diseñada para una máxima protección.",
      "Banda aniónica de turmalina.",
      "Empaque seguro y de alta calidad."
    ],
    benefits: [
      "La medicina holística refiere que la emisión de rayos bio-infrarrojos, genera iones negativos que ayudarían a equilibrar el pH de la zona íntima para prevenir o tratar diferentes enfermedades ocasionadas por el desequilibrio de la flora vaginal, así como la emisión de malos olores.",
      "Mejora la circulación sanguínea por lo que aliviaría los dolores o inflamaciones del proceso menstrual.",
      "Capa de algodón: Permite suavidad al contacto con la piel y no genera irritación."
    ],
    usage: "Tome 1 unidad del empaque, retire el envoltorio y las cintas siliconadas del producto, enseguida fije la parte adhesiva de la toalla sanitaria a la prenda íntima y siéntase delicadamente cómoda y protegida.",
    ingredients: [
      "Celulosa",
      "Tela no tejida / extracto de turmalina",
      "Polipropileno"
    ],
    precautions: "Sólo para uso externo. No use el producto si el empaque inicialmente se encuentra abierto, no deseche el producto directamente en el inodoro.",
    documentSlug: "protectores-e-higiene-intima-turmalina",
    inOfficialCatalog: true
  },
  {
    id: "1123",
    code: "1123",
    slug: "enjoyable-day-use",
    name: "Enjoyable Day Use – Toalla íntima de uso diurno",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal",
    price: 5.50,
    priceFormatted: "$5.50",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/70._PROTECTORES_TURMALINA-1024x576.png",
    netContent: "10 unidades",
    presentation: "Paquete de 10 unidades",
    shelfLife: "36 meses",
    shortDescription: "Toalla sanitaria con textura de algodón suave y banda de turmalina generadora de aniones para protección diurna durante el ciclo menstrual.",
    description: "Toalla sanitaria con textura de algodón suave para la piel y con banda de turmalina generadora de aniones para la higiene y protección completa en el cuidado de la salud femenina durante el período menstrual, para su uso durante el día.",
    advantages: [
      "Textura suave, ultrafina y una excelente absorción.",
      "Diseño de última generación.",
      "Estructurada con multicapas y materiales de primera calidad.",
      "Anatómicamente cómoda y para una máxima protección.",
      "Banda aniónica de turmalina.",
      "Empaque seguro y de alta calidad."
    ],
    benefits: [
      "La medicina holística refiere que la emisión de rayos bio-infrarrojos, genera iones negativos que ayudarían a equilibrar el pH de la zona íntima para prevenir o tratar diferentes enfermedades ocasionadas por el desequilibrio de la flora vaginal, así como la emisión de malos olores.",
      "Mejora la circulación sanguínea por lo que aliviaría los dolores o inflamaciones del proceso menstrual.",
      "Capa de algodón: Permite suavidad al contacto con la piel y no genera irritación."
    ],
    usage: "Tome 1 unidad del empaque, retire el envoltorio y las cintas siliconadas del producto, enseguida fije la parte adhesiva de la toalla sanitaria a la prenda íntima y siéntase delicadamente cómoda y protegida.",
    ingredients: [
      "Celulosa",
      "Tela no tejida / extracto de turmalina",
      "Polipropileno"
    ],
    precautions: "Sólo para uso externo. No use el producto si el empaque inicialmente se encuentra abierto, no deseche el producto directamente en el inodoro.",
    documentSlug: "protectores-e-higiene-intima-turmalina",
    inOfficialCatalog: true
  },
  {
    id: "1121",
    code: "1121",
    slug: "enjoyable-night-use",
    name: "Enjoyable Night Use – Toalla íntima de uso nocturno",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal",
    price: 4.40,
    priceFormatted: "$4.40",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/70._PROTECTORES_TURMALINA-1024x576.png",
    netContent: "8 unidades",
    presentation: "Paquete de 8 unidades",
    shelfLife: "36 meses",
    shortDescription: "Toalla sanitaria nocturna con textura de algodón suave y banda de turmalina generadora de aniones para máxima higiene y descanso.",
    description: "Toalla sanitaria con textura de algodón suave para la piel y con banda de turmalina generadora de aniones para la higiene y protección en el cuidado de la salud femenina, para su uso durante la noche.",
    advantages: [
      "Textura suave, ultrafina y una excelente absorción.",
      "Diseño de última generación.",
      "Estructurada con multicapas y materiales de primera calidad.",
      "Anatómicamente cómoda y para una máxima protección.",
      "Banda aniónica de turmalina.",
      "Empaque seguro y de alta calidad."
    ],
    benefits: [
      "La medicina holística refiere que la emisión de rayos bio-infrarrojos, genera iones negativos que ayudarían a equilibrar el pH de la zona íntima para prevenir o tratar diferentes enfermedades ocasionadas por el desequilibrio de la flora vaginal, así como la emisión de malos olores.",
      "Mejora la circulación sanguínea por lo que aliviaría los dolores o inflamaciones del proceso menstrual.",
      "Capa de algodón: Permite suavidad al contacto con la piel y no genera irritación."
    ],
    usage: "Tome 1 unidad del empaque, retire el envoltorio y las cintas siliconadas del producto, enseguida fije la parte adhesiva de la toalla sanitaria a la prenda íntima y siéntase delicadamente cómoda y protegida.",
    ingredients: [
      "Celulosa",
      "Tela no tejida / extracto de turmalina",
      "Polipropileno"
    ],
    precautions: "Sólo para uso externo. No use el producto si el empaque inicialmente se encuentra abierto, no deseche el producto directamente en el inodoro.",
    documentSlug: "protectores-e-higiene-intima-turmalina",
    inOfficialCatalog: true
  },
  {
    id: "2034",
    code: "2034",
    slug: "plantilla-de-turmalina",
    name: "Plantilla de Turmalina",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal",
    price: 9.00,
    priceFormatted: "$9.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/39._Accesorio_de_Turmalina-1024x576.png",
    netContent: "1 par",
    presentation: "1 par adaptable",
    shelfLife: "Larga duración",
    shortDescription: "Diseñadas para brindarte confort y equilibrio energético todo el día con reflexología y turmalina para mejorar la circulación y reducir la fatiga.",
    description: "Diseñadas para brindarte una experiencia de confort y equilibrio energético durante todo el día. Gracias a las propiedades naturales de la turmalina, estas plantillas ayudan a estimular puntos clave de reflexología, mejorando la circulación y reduciendo la fatiga.",
    advantages: [
      "Uso discreto, cómodo y diario.",
      "Estimula el bienestar de forma natural y sin químicos.",
      "Disponible en diferentes tallas.",
      "Material duradero y fácil de limpiar."
    ],
    benefits: [
      "Efecto térmico natural",
      "Estimulación de puntos energéticos",
      "Mejora la circulación sanguínea",
      "Reducción del cansancio"
    ],
    usage: "Retira las plantillas originales de tu calzado, si es necesario.\nColoca las plantillas de turmalina HGW en tus zapatos, con el lado de la turmalina hacia arriba.\nSi es necesario, recorta las plantillas siguiendo la guía de tallas marcada para un ajuste perfecto.\nÚsalas todos los días, especialmente durante actividades prolongadas o jornadas laborales.\nPara mejores resultados, úsalas por mínimo 6 a 8 horas diarias.",
    ingredients: [
      "Partículas activas de turmalina natural",
      "Estructura flexible ergonómica y transpirable"
    ],
    precautions: "Limpiar periódicamente con un paño húmedo. No exponer a calor excesivo.",
    documentSlug: "accesorios-de-turmalina",
    inOfficialCatalog: true
  },
  {
    id: "1204",
    code: "1204",
    slug: "press-on-nails",
    name: "Press On Nails (Kit de uñas postizas, 24 piezas)",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal",
    price: 8.58,
    priceFormatted: "$8.58",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/92._Mundo_de_la_manicura-1024x576.png",
    netContent: "30 unidades",
    presentation: "Kit de uñas postizas (24 piezas)",
    shelfLife: "Reutilizables",
    shortDescription: "Kit de uñas postizas de aplicación rápida y sencilla en pocos minutos para lucir siempre manos cuidadas y elegantes sin dañar tus uñas.",
    description: "Kit de uñas postizas de aplicación rápida y sencilla en pocos minutos para lucir siempre manos cuidadas y elegantes sin dañar tus uñas naturales.",
    advantages: [
      "Aplicación rápida y sencilla en pocos minutos",
      "Versátiles para cualquier ocasión",
      "Variedad de estilos y diseños modernos",
      "Reutilizables con el cuidado adecuado",
      "No dañan tus uñas naturales."
    ],
    benefits: [
      "Ahorra tiempo y dinero sin perder estilo.",
      "Luce siempre manos cuidadas y elegantes.",
      "Cambia de diseño según tu estado de ánimo o la ocasión.",
      "Ideal para viajes, emergencias o eventos de último minuto.",
      "Confianza y belleza al alcance de tus manos."
    ],
    usage: "1. Limpia y seca tus uñas naturales.\n2. Elige el tamaño adecuado para cada uña.\n3. Aplica el adhesivo incluido o pegamento especial (según preferencia).\n4. Presiona la uña postiza firmemente durante 10–15 segundos.\nEvita el contacto con agua durante al menos 1 hora tras la aplicación.\nPara retirar: remoja las uñas en agua tibia con jabón o usa removedor específico para uñas postizas. Guarda las uñas en su estuche para futuros usos.",
    ingredients: [
      "Acrílico moldeado de alta flexibilidad y resistencia",
      "Adhesivo dermatológicamente seguro"
    ],
    precautions: "No aplicar sobre uñas infectadas o piel lesionada.",
    documentSlug: "mundo-de-la-manicura-press-on-nails",
    inOfficialCatalog: true
  },

  // ==========================================
  // 8. ACCESORIOS DE TURMALINA (Catálogo 2026)
  // ==========================================
  {
    id: "2165",
    code: "2165",
    slug: "protector-de-cintura-de-turmalina",
    name: "Protector de Cintura de Turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios de Turmalina",
    price: 69.00,
    priceFormatted: "$69.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/39._Accesorio_de_Turmalina-1024x576.png",
    netContent: "1 unidad",
    presentation: "1 protector lumbar ajustable",
    shelfLife: "Larga vida útil",
    shortDescription: "Soporte natural y alivio diario lumbar que genera calor natural gracias a la nanoturmalina y piedras magnéticas.",
    description: "Soporte Natural y Alivio Diario. Genera calor natural gracias a la nanoturmalina y piedras magnéticas. Diseñado para brindarte confort, estabilidad y bienestar en tu rutina diaria. Fabricado con materiales de alta calidad y piedras magnéticas.",
    advantages: [
      "Materiales resistentes, transpirables y duraderos",
      "No requiere electricidad ni batería.",
      "Fácil de usar en cualquier momento del día.",
      "Diseño ergonómico y ajustable para mayor comodidad y soporte."
    ],
    benefits: [
      "Activa un calor terapéutico natural que alivia molestias y relaja la zona lumbar, gracias a la nanoturmalina y piedras magnéticas que incorpora.",
      "Ayuda a corregir la postura",
      "Mejora la circulación sanguínea y reduce la inflamación.",
      "Alivia dolores musculares y articulares.",
      "Brinda soporte y estabilidad a la zona lumbar"
    ],
    usage: "Coloca el protector directamente sobre la piel seca en la zona lumbar. Ajusta con las tiras elásticas hasta sentir firmeza y comodidad.\nPara activar el efecto térmico de la turmalina, se recomienda friccionar ligeramente el área con la mano durante unos segundos al colocarlo.\nÚsalo por períodos de 30 minutos a 2 horas al día, según la necesidad y tolerancia.",
    ingredients: [
      "Nanoturmalina activa",
      "Piedras magnéticas terapéuticas",
      "Tejido transpirable elástico"
    ],
    precautions: "No utilizar sobre piel irritada o heridas abiertas.",
    documentSlug: "accesorios-de-turmalina",
    inOfficialCatalog: true
  },
  {
    id: "2167",
    code: "2167",
    slug: "protector-de-cuello-de-turmalina",
    name: "Protector de Cuello de Turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios de Turmalina",
    price: 16.00,
    priceFormatted: "$16.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/39._Accesorio_de_Turmalina-1024x576.png",
    netContent: "1 unidad",
    presentation: "1 protector cervical con velcro",
    shelfLife: "Larga vida útil",
    shortDescription: "Alivio, soporte y confort térmico en la zona cervical con partículas de turmalina que estimulan la circulación y relajan la tensión muscular.",
    description: "Alivio, soporte y confort térmico en la zona cervical. Gracias a la inclusión de partículas de turmalina, este accesorio estimula suavemente la circulación sanguínea y genera un efecto de calor que ayuda a relajar los músculos y liberar tensiones acumuladas en el cuello y la parte superior de la espalda.",
    advantages: [
      "Turmalina activa: al contacto con la piel y la fricción, emite calor natural e infrarrojo lejano.",
      "Diseño ajustable, ligero y ergonómico, que se adapta perfectamente al cuello.",
      "No requiere electricidad ni baterías para funcionar.",
      "Ideal para usar en casa, en el trabajo o en momentos de descanso."
    ],
    benefits: [
      "Alivio de tensión y rigidez en la zona cervical.",
      "Mejora de la circulación sanguínea local.",
      "Relajación muscular y reducción del estrés.",
      "Ayuda a prevenir molestias por malas posturas o largas horas frente a pantallas.",
      "Promueve una sensación general de bienestar y descanso."
    ],
    usage: "Coloca el protector alrededor del cuello, ajustándolo suavemente con el cierre de velcro.\nPara activar el calor natural de la turmalina, fricciona ligeramente con la mano durante unos segundos al colocarlo.\nSe recomienda usarlo entre 15 y 45 minutos al día, según la necesidad, y siempre sobre la piel seca.",
    ingredients: [
      "Partículas activas de turmalina",
      "Tejido térmico ergonómico",
      "Cierre de velcro"
    ],
    precautions: "Siempre usar sobre piel seca. Interrumpir si la sensación de calor es excesiva.",
    documentSlug: "accesorios-de-turmalina",
    inOfficialCatalog: true
  },
  {
    id: "2166",
    code: "2166",
    slug: "protector-de-rodilla-de-turmalina",
    name: "Protector de Rodilla de Turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios de Turmalina",
    price: 55.00,
    priceFormatted: "$55.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/39._Accesorio_de_Turmalina-1024x576.png",
    netContent: "1 par o unidad",
    presentation: "1 protector de rodilla ajustable",
    shelfLife: "Larga vida útil",
    shortDescription: "Brinda alivio natural, estabilidad y confort a las articulaciones de la rodilla gracias a tecnología con partículas de turmalina.",
    description: "Brinda alivio natural, estabilidad y confort a las articulaciones de la rodilla. Su tecnología basada en partículas de turmalina activa un efecto térmico suave al contacto con la piel, ayudando a estimular la circulación sanguínea, relajar los músculos y reducir molestias.",
    advantages: [
      "Turmalina activa: al contacto con la piel y la fricción, emite calor natural e infrarrojo lejano.",
      "Diseño ajustable, ligero y ergonómico, que se adapta perfectamente a la articulación.",
      "No requiere electricidad ni baterías para funcionar.",
      "Ligero, flexible y transpirable, permite libertad de movimiento."
    ],
    benefits: [
      "Alivio de molestias, rigidez o inflamación en la zona de la rodilla.",
      "Mejora la circulación sanguínea local gracias al calor natural.",
      "Apoyo articular que ayuda a mantener la estabilidad durante el movimiento.",
      "Favorece la relajación muscular y la recuperación física.",
      "Contribuye al bienestar diario en personas con desgaste articular."
    ],
    usage: "Colocar el protector directamente sobre la rodilla, con la piel limpia y seca. Ajustar con firmeza pero sin apretar.\nPara activar el calor natural de la turmalina, fricciona ligeramente con la mano durante unos segundos al colocarlo.\nSe recomienda usar de 30 minutos a 2 horas por día, según la necesidad y la sensibilidad personal.",
    ingredients: [
      "Partículas activas de turmalina",
      "Neopreno flexible transpirable",
      "Soporte anatómico reforzado"
    ],
    precautions: "Ajustar con firmeza pero sin cortar la circulación sanguínea.",
    documentSlug: "accesorios-de-turmalina",
    inOfficialCatalog: true
  },
  {
    id: "2130",
    code: "2130",
    slug: "pulsera-de-turmalina",
    name: "Pulsera de Turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios de Turmalina",
    price: 20.00,
    priceFormatted: "$20.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Pulsera-de-turmalina-No.-33-scaled.jpg",
    netContent: "1 unidad",
    presentation: "1 pulsera hecha a mano",
    shelfLife: "Indefinida",
    shortDescription: "Hecha a mano con piedras naturales de turmalina, venerada como un importante talismán de protección contra radiación electromagnética.",
    description: "La turmalina se considera una piedra de referencia para la limpieza, la protección y la transformación. Absorbe las energías densas y las dirige hacia la tierra para ser transmutadas, además de que estimula la circulación, mejora la presión arterial, es anti estrés y quita dolores musculares.",
    advantages: [
      "Hecho a mano con piedras naturales.",
      "Sencillo y elegante.",
      "Adaptable a las medidas.",
      "Presente en variedad de mágicos colores.",
      "La turmalina es venerada como un importante talismán de protección y protege contra la radiación y los contaminantes ambientales."
    ],
    benefits: [
      "La medicina holística refiere que es uno de los minerales más potentes para absorber la radiación, es excelente para la protección contra la emisión de ondas electromagnéticas de teléfonos celulares, computadoras y otros aparatos electrónicos.",
      "Con una piedra turmalina limpiarás y purificarás la energía más densa del entorno haciéndola ligera y equilibrada. Por eso, la turmalina se considera como el mejor aliado para purificar los estados de ánimo."
    ],
    usage: "Modo de uso: Como pulsera.\n\nSugerencia de limpieza:\n1) Prepare una solución salina: vierta 1 cuchara de sal de maras o rosada en 500 ml de agua (pH 7 – 7.5).\n2) Coloque la pulsera de turmalina en la solución salina durante 4 horas aproximadamente.\n3) Retírela y séquela con un paño desechable limpio.",
    ingredients: [
      "Piedras de turmalina 100% natural",
      "Base adaptable hipoalergénica"
    ],
    precautions: "Evitar golpes y contacto con sustancias químicas corrosivas.",
    documentSlug: "accesorios-de-turmalina",
    inOfficialCatalog: true
  },
  {
    id: "2129",
    code: "2129",
    slug: "collar-de-turmalina",
    name: "Collar de Turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios de Turmalina",
    price: 40.00,
    priceFormatted: "$40.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Collar-de-turmalina-No.-2.png",
    netContent: "1 unidad",
    presentation: "1 collar hecho a mano",
    shelfLife: "Indefinida",
    shortDescription: "Collar artesanal con piedras naturales de turmalina para protección contra ondas electromagnéticas y purificación energética.",
    description: "La turmalina se considera una piedra de referencia para la limpieza, la protección y la transformación. Absorbe las energías densas y las dirige hacia la tierra para ser transmutadas, además de que estimula la circulación, mejora la presión arterial, es anti estrés y quita dolores musculares.",
    advantages: [
      "Sencillo y elegante.",
      "Hecho a mano con piedras naturales.",
      "Adaptable a las medidas.",
      "Presente en varios y mágicos colores.",
      "La turmalina es venerada como un importante talismán de protección y protege contra la radiación y los contaminantes ambientales."
    ],
    benefits: [
      "La medicina holística refiere que es uno de los minerales más potentes para absorber la radiación, es excelente para la protección contra la emisión de ondas electromagnéticas de teléfonos celulares, computadoras y otros aparatos electrónicos.",
      "Con una piedra turmalina limpiarás y purificarás la energía más densa del entorno haciéndola ligera y equilibrada. Por eso, la turmalina se considera como el mejor aliado para purificar los estados de ánimo."
    ],
    usage: "Modo de uso: Como collar.\n\nSugerencia de limpieza:\n1) Prepare una solución salina: vierta 1 cuchara de sal de maras o rosada en 500 ml de agua (pH 7 – 7.5).\n2) Coloque el collar de turmalina en la solución salina durante 4 horas aproximadamente.\n3) Retírelo y séquelo con un paño desechable limpio.",
    ingredients: [
      "Piedras de turmalina natural",
      "Broche de seguridad y cordón artesanal"
    ],
    precautions: "Evitar tirones bruscos y contacto con solventes.",
    documentSlug: "accesorios-de-turmalina",
    inOfficialCatalog: true
  },

  // ==========================================
  // 9. EQUIPOS (Catálogo 2026)
  // ==========================================
  {
    id: "2113",
    code: "2113",
    slug: "thermo-de-turmalina",
    name: "Thermo de Turmalina",
    category: "hogar-accesorios",
    categoryLabel: "Equipos",
    price: 95.00,
    priceFormatted: "$95.00",
    inStock: true,
    featured: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Thermo-de-turmalina.jpg",
    netContent: "500ml",
    presentation: "1 unidad (Capacidad 500ml)",
    shelfLife: "Larga vida útil",
    shortDescription: "Artículo fabricado a base de turmalina que convierte el agua ácida en agua alcalina de forma natural y neutraliza toxinas.",
    description: "Es un artículo fabricado a base de turmalina lo que le confiere un efecto electromagnético que proporciona beneficios importantes para el cuidado de la salud. La Turmalina es bastante estudiada por los esotéricos como la piedra energética que tiene la capacidad de convertir el agua ácida en agua alcalina de forma natural. ¡Siente fluir tu energía desde el interior de tu ser!",
    advantages: [
      "Cuenta con un diseño anatómico, elegante y color neutro natural.",
      "Elaborado con acero inoxidable, un material no tóxico, cuenta con la piedra natural de turmalina en su interior.",
      "Peso liviano y portátil.",
      "Capacidad suficiente para almacenamiento de: 500ml."
    ],
    benefits: [
      "La Turmalina: La medicina holística refiere que es uno de los minerales más potentes para absorber la radiación, es excelente para la protección contra la emisión de ondas electromagnéticas de teléfonos celulares, computadoras y otros aparatos electrónicos.",
      "La principal propiedad de la turmalina es que es un potente catalizador de energía, transformando la energía negativa en positiva.",
      "Una piedra de turmalina podría limpiar y purificar la energía más densa del entorno haciéndola ligera y equilibrada. Por eso, la turmalina es considerada como el mejor aliado para mejorar los estados de ánimos.",
      "El agua alcalina es capaz de neutralizar la acidez del cuerpo, eliminando las toxinas y desechos del cuerpo."
    ],
    usage: "Vaso portátil. Llenar con agua potable, dejar reposar unos minutos para que las piedras naturales de turmalina interactúen con el agua y disfrutar.\nConservación: Secar bien el frasco antes de guardarlo.",
    ingredients: [
      "Piedras de turmalina natural",
      "Acero Inoxidable de grado alimentario"
    ],
    precautions: "Secar bien el frasco antes guardarlo. Lavar con agua tibia y jabón neutro.",
    documentSlug: "accesorios-de-turmalina",
    inOfficialCatalog: true
  },
  {
    id: "0213-cup",
    code: "0213",
    slug: "coffee-cup",
    name: "Coffee Cup",
    category: "hogar-accesorios",
    categoryLabel: "Equipos",
    price: 26.00,
    priceFormatted: "$26.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Tazas-de-Cafe.jpg",
    netContent: "390 ml",
    presentation: "Capacidad 390 ml",
    shelfLife: "Reutilizable",
    shortDescription: "Vaso térmico Coffee Cup HGW diseñado para conservar la temperatura de tus bebidas favoritas por horas.",
    description: "Vaso térmico Coffee Cup HGW. Diseñado para conservar la temperatura de tus bebidas favoritas —calientes o frías— por horas, este práctico y elegante vaso es perfecto para acompañarte en la oficina, en tus viajes o simplemente en casa.",
    advantages: [
      "Reutilizable y ecológico",
      "Fácil de limpiar y resistente a olores.",
      "Estilo elegante disponible en varios colores.",
      "Apto para bebidas frías y calientes."
    ],
    benefits: [
      "Conserva la temperatura: Mantiene las bebidas calientes.",
      "Diseño moderno y práctico: Compacto, liviano y fácil de transportar.",
      "Materiales seguros y de calidad.",
      "Tapa hermética antifugas: Evita derrames accidentales y mantiene la bebida segura en cualquier movimiento.",
      "Ideal para tus cafés saludables HGW."
    ],
    usage: "1. Lava el vaso antes del primer uso con agua tibia y jabón.\n2. Vierte tu bebida preferida, caliente o fría.\n3. Cierra bien la tapa para asegurar el sellado térmico.\n4. Disfruta tu bebida en cualquier momento y lugar, manteniendo su temperatura por horas.\n5. Lava después de cada uso para conservar su higiene y durabilidad.",
    ingredients: [
      "Acero inoxidable de doble pared",
      "Tapa hermética antifugas libre de BPA"
    ],
    precautions: "No colocar en microondas. Lavar después de cada uso.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: true
  },
  {
    id: "1213",
    code: "1213",
    slug: "vaso-termico",
    name: "Vaso Térmico",
    category: "hogar-accesorios",
    categoryLabel: "Equipos",
    price: 31.50,
    priceFormatted: "$31.50",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/VASO-TERMICO-AZUL-NEGRO.jpg",
    netContent: "Capacidad estándar",
    presentation: "1 unidad",
    shelfLife: "Reutilizable",
    shortDescription: "Diseñados para acompañarte a donde vayas, los vasos térmicos HGW mantienen tus bebidas a la temperatura adecuada por más tiempo.",
    description: "Diseñados para acompañarte a donde vayas, los vasos térmicos HGW mantienen tus bebidas a la temperatura adecuada por más tiempo. Su estructura resistente y estilo versátil los convierte en una opción práctica para el día a día, ya sea en casa, en la oficina o en movimiento.",
    advantages: [
      "Uso reutilizable",
      "Diseño funcional con estilo moderno",
      "Fácil mantenimiento y limpieza",
      "Compatibles con bebidas frías y calientes"
    ],
    benefits: [
      "Ayudan a conservar el calor o el frío de tus bebidas.",
      "Formato cómodo que facilita su transporte.",
      "Materiales durables pensados para el uso diario.",
      "Tapa con ajuste seguro que reduce derrames.",
      "Ideales para acompañar tu rutina y hábitos saludables."
    ],
    usage: "1. Limpia el vaso antes de utilizarlo por primera vez.\n2. Agrega la bebida de tu preferencia.\n3. Ajusta correctamente la tapa para un mejor cierre.\n4. Disfruta tu bebida manteniendo su temperatura por más tiempo.\n5. Lava el vaso después de cada uso para prolongar su vida útil.",
    ingredients: [
      "Acero inoxidable duradero",
      "Tapa hermética antifugas"
    ],
    precautions: "Lava el vaso después de cada uso para prolongar su vida útil.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: true
  },
  {
    id: "hervidor",
    code: "Sin código",
    slug: "hervidor-electrico",
    name: "Hervidor Eléctrico",
    category: "hogar-accesorios",
    categoryLabel: "Equipos",
    price: 60.00,
    priceFormatted: "$60.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Hervidor-electrico.png",
    netContent: "1 unidad",
    presentation: "1 hervidor eléctrico de alta velocidad",
    shelfLife: "Garantía de fábrica",
    shortDescription: "El complemento ideal para tu estilo de vida moderno: práctico, rápido y seguro. Diseñado para calentar agua en segundos.",
    description: "El complemento ideal para tu estilo de vida moderno: práctico, rápido y seguro. Diseñado para calentar agua en segundos, facilita la preparación de tus bebidas favoritas: té, café, infusiones o chocolate, con solo pulsar un botón.",
    advantages: [
      "Velocidad y practicidad: Hierve el agua en minutos",
      "Diseño moderno y funcional.",
      "Diseño moderno y práctico: Fácil de usar, limpiar y llevar a diferentes espacios del hogar u oficina"
    ],
    benefits: [
      "Hierve agua en pocos minutos: Optimiza el tiempo y facilita la preparación de bebidas en la rutina diaria.",
      "Ahorro de energía y eficiencia: Tecnología diseñada para calentar rápidamente con un consumo eléctrico controlado.",
      "Ideal para bebidas HGW: Perfecto para preparar café, tés, infusiones y bebidas funcionales como Choco Blue de manera rápida y segura."
    ],
    usage: "1. Llena el hervidor con agua hasta el nivel indicado.\n2. Conecta a la corriente y enciéndelo.\n3. En pocos minutos, el agua estará lista para preparar tu bebida favorita.\n4. Vierte en tu taza, añade tu producto HGW favorito (café, chocolate, etc.) y disfruta.",
    ingredients: [
      "Cuerpo de acero inoxidable y componentes eléctricos certificados",
      "Sistema de auto-apagado de seguridad"
    ],
    precautions: "No encender sin agua en el interior. No sumergir la base eléctrica.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: true
  },
  {
    id: "2192",
    code: "2192",
    slug: "almohada-magnetica-de-turmalina",
    name: "Almohada Magnética de Turmalina",
    category: "hogar-accesorios",
    categoryLabel: "Equipos",
    price: 89.00,
    priceFormatted: "$89.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Almohada-de-turmalina.png",
    netContent: "1 unidad",
    presentation: "1 unidad",
    shelfLife: "Larga duración",
    shortDescription: "Accesorio ergonómico con imanes y turmalina para brindar soporte cervical, calor suave y relajación durante el descanso.",
    description: "La Almohada Magnética de Turmalina de HGW es un accesorio diseñado para brindar soporte y confort en la zona cervical. Gracias a la combinación de imanes y turmalina, ayuda a proporcionar una sensación de calor suave y relajación, convirtiéndose en una opción práctica para quienes buscan mayor bienestar y descanso diario.",
    advantages: [
      "Diseño ergonómico adaptable al cuello.",
      "Material cómodo y agradable al tacto.",
      "No requiere electricidad ni baterías.",
      "Fácil de usar en casa, oficina o durante viajes.",
      "Reutilizable y de larga duración."
    ],
    benefits: [
      "Ayuda a aliviar la tensión en cuello y zona cervical.",
      "Puede contribuir a la relajación muscular.",
      "Favorece una mejor calidad de descanso.",
      "La turmalina puede ayudar a mantener una sensación de calor suave y constante.",
      "Puede apoyar la circulación en la zona de contacto."
    ],
    usage: "Colocar la almohada en la zona cervical o en el área donde se necesite apoyo.\nUtilizar durante el descanso, al dormir o en momentos de relajación.\nPuede usarse diariamente según necesidad.\nMantener limpia y conservar en un lugar seco.",
    ingredients: [
      "Estructura viscoelástica ergonómica",
      "Módulos magnéticos de bio-imanes",
      "Nanopartículas de turmalina"
    ],
    precautions: "No sumergir en agua. Limpiar con funda protectora lavable.",
    documentSlug: "almohada-magnetica-de-turmalina",
    inOfficialCatalog: true
  },

  // ==========================================
  // PRODUCTOS DE LA WEB (Fuera del Catálogo 2026)
  // Conservados intactos para evitar rotura de URLs
  // ==========================================
  {
    id: "pasta-probioticos",
    slug: "pasta-dental-con-probioticos",
    name: "Pasta Dental con Probióticos",
    category: "cuidado-bucal",
    categoryLabel: "Cuidado Bucal",
    price: 8.00,
    priceFormatted: "$8.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Pasta-dental-con-probioticos-HGW-1.jpg",
    netContent: "120 g",
    presentation: "Tubo de 120 g",
    shelfLife: "24 meses",
    shortDescription: "Dentífrico de avanzada con complejo de probióticos para equilibrio de la microbiota oral y aliento fresco.",
    advantages: ["Fortalece la flora bucal", "Sin abrasivos dañinos", "Frescura prolongada"],
    benefits: [
      "Mantiene el equilibrio del microbioma bucal.",
      "Protege contra la formación de placa bacteriana y caries.",
      "Proporciona frescura duradera sin dañar el esmalte dental."
    ],
    ingredients: ["Complejo de probióticos activos", "Flúor controlado", "Extractos de menta"],
    usage: "Cepillar los dientes minuciosamente al menos 2 veces al día tras las comidas.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: false
  },
  {
    id: "pasta-turmalina-blanca",
    slug: "pasta-dental-de-turmalina-blanca",
    name: "Pasta Dental de Turmalina (Versión Blanca)",
    category: "cuidado-bucal",
    categoryLabel: "Cuidado Bucal",
    price: 8.00,
    priceFormatted: "$8.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Pasta-dental-con-turmalina-blanca.jpg",
    netContent: "120 g",
    presentation: "Tubo de 120 g",
    shelfLife: "24 meses",
    shortDescription: "Pasta dental formulada con extracto de nanoturmalina para blanqueamiento natural y encías protegidas.",
    advantages: ["Blanqueamiento progresivo suave", "Protección gingival", "Acción bioenergética"],
    benefits: [
      "Ayuda a remover manchas superficiales sin agredir el esmalte.",
      "Propiedades aniónicas de la turmalina que protegen las encías sensibles.",
      "Aliento limpio y puro todo el día."
    ],
    ingredients: ["Micropartículas de turmalina", "Sílice hidratada suave", "Extractos botánicos"],
    usage: "Cepillar suavemente después de cada comida durante 2 minutos.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: false
  },
  {
    id: "pasta-turmalina-negra",
    slug: "pasta-dental-de-turmalina-negra",
    name: "Tourmaline Toothpaste (Versión Negra)",
    category: "cuidado-bucal",
    categoryLabel: "Cuidado Bucal",
    price: 8.00,
    priceFormatted: "$8.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Pasta-dental-con-turmalina-negra.jpg",
    netContent: "120 g",
    presentation: "Tubo de 120 g",
    shelfLife: "24 meses",
    shortDescription: "Dentífrico de carbón activado botánico y nanoturmalina para purificación profunda y neutralización de olores.",
    advantages: ["Carbón activado purificante", "Fórmula anti-sarro", "Sin colorantes sintéticos"],
    benefits: [
      "Absorción activa de toxinas y compuestos causantes del mal aliento.",
      "Limpieza profunda en zonas interdentales.",
      "Efecto détox en la cavidad oral."
    ],
    ingredients: ["Carbón activo botánico", "Nanoturmalina", "Aceite esencial de menta"],
    usage: "Usar en el cepillado habitual diario.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: false
  },
  {
    id: "pasta-herbal-china",
    slug: "green-world-herbs-toothpaste",
    name: "Green World Herbs Toothpaste",
    category: "cuidado-bucal",
    categoryLabel: "Cuidado Bucal",
    price: 8.80,
    priceFormatted: "$8.80",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Pasta-de-Dientes-a-Base-de-Hierbas-Chinas-para-Tener-Dientes-Fuertes.jpg",
    netContent: "120 g",
    presentation: "Tubo de 120 g",
    shelfLife: "24 meses",
    shortDescription: "Dentífrico herbal con medicina tradicional china para el fortalecimiento de encías y piezas dentales.",
    advantages: ["Extractos herbales milenarios", "Alivia inflamación gingival", "Fórmula calmante"],
    benefits: [
      "Fortalece los tejidos gingivales ante sangrado o sensibilidad.",
      "Combate bacterias causantes de afecciones periodontales.",
      "Frescura natural a hierbas orientales."
    ],
    ingredients: ["Extracto de Lonicera japonica", "Extracto de menta silvestre", "Glicerina vegetal"],
    usage: "Cepillar 2 a 3 veces al día con cepillo de cerdas suaves.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: false
  },
  {
    id: "jabon-turmalina",
    slug: "jabon-de-turmalina",
    name: "Jabón de Turmalina",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal",
    price: 4.62,
    priceFormatted: "$4.62",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Jabon-de-turmalina.jpeg",
    netContent: "100 g",
    presentation: "Barra de jabón de 100 g",
    shelfLife: "24 meses",
    shortDescription: "Jabón artesanal formulado con nanoturmalina para limpieza profunda, control de grasa y alivio de impurezas.",
    advantages: ["Control del acné y grasa", "Exfoliación suave", "Iones negativos para la piel"],
    benefits: [
      "Limpia profundamente los poros eliminando toxinas y exceso de sebo.",
      "Estimula la microcirculación cutánea gracias a la turmalina.",
      "Deja la piel suave, luminosa y renovada."
    ],
    ingredients: ["Polvo de nanoturmalina", "Aceite de palma saponificado", "Glicerina"],
    usage: "Frotar en manos con agua hasta generar espuma y masajear en rostro o cuerpo.",
    documentSlug: "accesorios-de-turmalina",
    inOfficialCatalog: false
  },
  {
    id: "jabon-artemisa",
    slug: "jabon-de-artemisa",
    name: "Jabón de Artemisa",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal",
    price: 7.20,
    priceFormatted: "$7.20",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Jabon-de-artemisa.jpeg",
    netContent: "100 g",
    presentation: "Barra de jabón de 100 g",
    shelfLife: "24 meses",
    shortDescription: "Jabón herbal con extracto puro de Artemisa (Artemisia annua) para calmar irritaciones y picazón.",
    advantages: ["Poder antibacteriano natural", "Calma pieles sensibles", "Antipruriginoso"],
    benefits: [
      "Calma rojeces, alergias dérmicas y dermatitis.",
      "Propiedades antisépticas que protegen la barrera cutánea.",
      "Aroma herbal fresco y relajante."
    ],
    ingredients: ["Extracto de Artemisia argyi", "Aceites vegetales saponificados", "Vitamina E"],
    usage: "Usar a diario durante el baño en rostro y cuerpo.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: false
  },
  {
    id: "jabon-oliva",
    slug: "jabon-de-oliva",
    name: "Olive Soap – Jabón de Oliva",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal",
    price: 4.62,
    priceFormatted: "$4.62",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Jabon-de-Oliva.jpeg",
    netContent: "100 g",
    presentation: "Barra de 100 g",
    shelfLife: "24 meses",
    shortDescription: "Jabón suave a base de aceite de oliva virgen extra para nutrición intensa y cuidado de pieles secas.",
    advantages: ["Nutrición intensa", "Hipoalergénico", "Hidratación profunda"],
    benefits: [
      "Nutre y restablece el manto hidrolipídico de la piel.",
      "Previene la resequedad y tirantez.",
      "Ideal para toda la familia y pieles delicadas."
    ],
    ingredients: ["Aceite de oliva virgen extra", "Glicerina pura", "Agua destilada"],
    usage: "Aplicar directamente sobre la piel húmeda y enjuagar con abundante agua.",
    documentSlug: "catalogo-productos-hgw-panama-2026",
    inOfficialCatalog: false
  },
  {
    id: "colgante-piedra",
    slug: "colgante-piedra-energetica",
    name: "Colgante Piedra Energética",
    category: "turmalina",
    categoryLabel: "Turmalina y Bienestar",
    price: 50.00,
    priceFormatted: "$50.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Colgante-de-Piedra-Energetica.webp",
    netContent: "1 pieza",
    presentation: "1 colgante con cordón ajustable",
    shelfLife: "Indefinida",
    shortDescription: "Colgante con minerales bioenergéticos para armonización del campo electromagnético personal.",
    advantages: ["Minerales naturales de emisión infrarroja", "Diseño sofisticado", "Armonizador cuántico"],
    benefits: [
      "Protege contra ondas de telefonía celular y radiación electromagnética.",
      "Promueve la calma mental y el equilibrio bioenergético.",
      "Mejora la sensación de vitalidad."
    ],
    ingredients: ["Piedras minerales volcánicas y turmalina negra"],
    usage: "Llevar sobre el pecho a diario a la altura del corazón o plexo solar.",
    documentSlug: "accesorios-de-turmalina",
    inOfficialCatalog: false
  }
];

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  badgeUrl: string;
  imageUrl: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cqc',
    name: 'Certificación de Calidad CQC',
    issuer: 'China Quality Certification Center',
    description: 'Aval de calidad y estandarización internacional en manufactura biotecnológica.',
    badgeUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/cqc.png',
    imageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/cqc.png'
  },
  {
    id: 'halal',
    name: 'Certificación Halal Internacional',
    issuer: 'Halal Food Council',
    description: 'Cumplimiento estricto de pureza y normas de producción para consumo global.',
    badgeUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/halal.png',
    imageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/halal.png'
  },
  {
    id: 'iqnet',
    name: 'Certificación IQNet ISO 9001',
    issuer: 'The International Certification Network',
    description: 'Sistema de Gestión de Calidad certificado en investigación y desarrollo de productos.',
    badgeUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/iqnet.png',
    imageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/iqnet.png'
  }
];

export interface MembershipPlan {
  id: string;
  name: string;
  bv: string;
  priceEstimate: string;
  packageImageUrl: string;
  description: string;
  benefits: string[];
  recommended?: boolean;
  productsChoice?: string;
  directSaleProfit?: string;
  fastStartBonus?: string;
  developmentBonus?: string;
  teamBonus?: string;
  dailyEarningsCap?: string;
  eliteBonus?: string;
  repurchaseBonus?: string;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'pre-junior',
    name: 'Pre-Junior',
    bv: '50 BV',
    priceEstimate: 'Desde $100',
    packageImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp',
    description: 'Membresía de acceso inicial para nuevos distribuidores con 50 BV acumulados en compras.',
    benefits: ['Acceso a precios de distribuidor', 'Participación en bonos iniciales', 'Tienda virtual autorizada'],
    productsChoice: 'Elige productos por valor de 50 BV',
    directSaleProfit: 'Hasta 60% en ventas',
    fastStartBonus: '20% (1ª y 2ª Gen)',
    developmentBonus: 'Hasta 10 niveles',
    teamBonus: '5%',
    dailyEarningsCap: '50 BV diarios',
    repurchaseBonus: '5%'
  },
  {
    id: 'junior',
    name: 'Junior',
    bv: '100 BV',
    priceEstimate: 'Desde $200',
    packageImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp',
    description: 'Membresía recomendada para iniciar con un paquete equilibrado de productos y 100 BV.',
    benefits: ['Acceso completo al plan de compensación', 'Bonos de inicio rápido', 'Soporte y capacitación'],
    recommended: true,
    productsChoice: 'Elige productos por valor de 100 BV',
    directSaleProfit: 'Hasta 60% en ventas',
    fastStartBonus: '20% (1ª y 2ª Gen)',
    developmentBonus: 'Hasta 10 niveles',
    teamBonus: '7%',
    dailyEarningsCap: '120 BV diarios',
    repurchaseBonus: '5%'
  },
  {
    id: 'senior',
    name: 'Senior',
    bv: '300 BV',
    priceEstimate: 'Desde $600',
    packageImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp',
    description: 'Membresía avanzada para líderes con 300 BV y mayores porcentajes en bonos de equipo.',
    benefits: ['Cobro de bonos hasta 3ª generación (Bono Élite)', 'Mayores beneficios en recompras', 'Posibilidad de escalar a Master'],
    productsChoice: 'Elige productos por valor de 300 BV',
    directSaleProfit: 'Hasta 60% en ventas',
    fastStartBonus: '20% (1ª y 2ª Gen)',
    developmentBonus: 'Hasta 10 niveles',
    teamBonus: '8%',
    dailyEarningsCap: '360 BV diarios',
    eliteBonus: '4% (Hasta 3ª Gen)',
    repurchaseBonus: '5%'
  },
  {
    id: 'master',
    name: 'Master',
    bv: '600 BV',
    priceEstimate: 'Desde $1,200',
    packageImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp',
    description: 'Membresía máxima con 600 BV. Compras con hasta 52% de beneficio y márgenes del 60% en ventas directas.',
    benefits: ['Máximos beneficios y márgenes del 60%', 'Bono Élite hasta 6ª generación', 'Acceso a bonos de liderazgo global'],
    productsChoice: 'Elige productos por valor de 600 BV',
    directSaleProfit: 'Hasta 60% en ventas',
    fastStartBonus: '20% (1ª y 2ª Gen)',
    developmentBonus: 'Hasta 10 niveles',
    teamBonus: '10%',
    dailyEarningsCap: '720 BV diarios',
    eliteBonus: '4% (Hasta 6ª Gen)',
    repurchaseBonus: '5%'
  }
];
