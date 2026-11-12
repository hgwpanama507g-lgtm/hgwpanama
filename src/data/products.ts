export interface Product {
  id: string;
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
  presentation?: string;
  benefits: string[];
  ingredients?: string[];
  usage?: string;
  precautions?: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "col-01",
    slug: "collar-de-turmalina-no-2",
    name: "Collar de Turmalina No. 2",
    category: "turmalina",
    categoryLabel: "Turmalina y Bienestar",
    price: 40.00,
    priceFormatted: "$40.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Collar-de-turmalina-No.-2.png",
    shortDescription: "Elegante accesorio artesanal que combina la sofisticación de la joyería moderna con las propiedades bioenergéticas de la turmalina natural.",
    presentation: "1 Collar con broche de seguridad",
    benefits: [
      "Emite iones negativos que ayudan a equilibrar el campo bioenergético corporal.",
      "Promueve una sensación de calma y reducción del estrés diario.",
      "Actúa como un escudo natural contra la contaminación electromagnética (celulares, Wi-Fi).",
      "Mejora la microcirculación en el área del cuello y hombros.",
      "Diseño versátil para uso diario o eventos especiales."
    ],
    ingredients: ["Cuentas de Turmalina natural seleccionada", "Hilo de alta resistencia", "Cierre hipoalergénico"],
    usage: "Llevar puesto diariamente como accesorio personal. Se recomienda que el collar tenga contacto directo con la piel para aprovechar mejor los iones negativos.",
    precautions: "Evitar el contacto directo con perfumes, cremas o agentes químicos fuertes. Limpiar periódicamente con un paño suave húmedo."
  },
  {
    id: "pul-01",
    slug: "pulsera-de-turmalina-no-33",
    name: "Pulsera de Turmalina No. 33",
    category: "turmalina",
    categoryLabel: "Turmalina y Bienestar",
    price: 20.00,
    priceFormatted: "$20.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Pulsera-de-turmalina-No.-33-scaled.jpg",
    shortDescription: "Delicada pulsera artesanal diseñada para brindar bienestar constante mediante la liberación de aniones por contacto térmico corporal.",
    presentation: "1 Pulsera ajustable/elástica",
    benefits: [
      "Ayuda a reducir la fatiga en la muñeca y el brazo por uso excesivo de dispositivos.",
      "Libera calor infrarrojo lejano que estimula la circulación sanguínea local.",
      "Promueve el equilibrio de la energía vital (Qi).",
      "Accesorio liviano y ergonómico para uso prolongado.",
      "Materiales naturales de alta calidad."
    ],
    ingredients: ["Piedras de Turmalina mineral", "Nácar / Cristales decorativos", "Base elástica reforzada"],
    usage: "Colocar en la muñeca (derecha o izquierda) de modo que las piedras tengan contacto con la piel. Ideal para usar durante la jornada laboral.",
    precautions: "No sumergir en agua clorada (piscinas). Guardar en su estuche cuando no se utilice para evitar rayaduras en las piedras."
  },
  // --- CAFÉS Y BEBIDAS ---
  {
    id: "110",
    slug: "blueberry-coffee-hgw",
    name: "Blueberry Coffee HGW",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/blueberry-coffee-p-500.png",
    shortDescription: "Café soluble enriquecido con superalimento a base de arándanos (Vaccinium corymbosum L.), rico en antocianinas y antioxidantes.",
    presentation: "180 g (15 g x 12 sobres)",
    benefits: [
      "Alto contenido de antocianinas con actividad antioxidante 50 veces superior a la vitamina E.",
      "100% de biodisponibilidad y rápida absorción celular en el organismo.",
      "Apoyo y protección para la agudeza visual y la salud ocular.",
      "Potencia el sistema inmunológico, la concentración y la memoria.",
      "Práctico, instantáneo y con delicioso sabor balanceado."
    ],
    ingredients: [
      "Café instantáneo en polvo",
      "Arándanos en polvo (Vaccinium corymbosum)",
      "Crema no láctea de origen vegetal"
    ],
    usage: "Vierta el contenido de 1 sachet en una taza, agregue aproximadamente 150 ml de agua caliente, mezcle homogéneamente y disfrute de su agradable sabor.",
    precautions: "No consumir si es alérgico a alguno de los ingredientes. Conservar en lugar fresco y seco."
  },
  {
    id: "114",
    slug: "cafe-soluble-de-ganoderma",
    name: "Café soluble de Ganoderma",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/ganoderma-p-500.png",
    shortDescription: "Café instantáneo fortificado con extracto milenario de Ganoderma lucidum (hongo Reishi) para energía sostenible y defensas.",
    presentation: "180 g (15 g x 12 sobres)",
    benefits: [
      "Reduce el estrés oxidativo celular y regula naturalmente el sistema inmune.",
      "Favorece respuestas antiinflamatorias en el organismo.",
      "Estimulante y energizante suave sin irritar el estómago.",
      "Mejora la atención y reduce la sensación de fatiga física y mental."
    ],
    ingredients: [
      "Café instantáneo en polvo seleccionado",
      "Extracto puro de Ganoderma lucidum",
      "Crema no láctea",
      "Azúcar granulada blanca moderada"
    ],
    usage: "Disolver 1 sachet en 150 ml de agua caliente, revolver bien y beber a temperatura adecuada.",
    precautions: "Almacenar a temperatura ambiente en lugar fresco y seco."
  },
  {
    id: "108",
    slug: "coffee-ceps",
    name: "Coffee Ceps",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 20.00,
    priceFormatted: "$20.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Cordyceps-Coffee.png",
    shortDescription: "Bebida instantánea sin azúcar que combina café selecto con micelio fermentado del milenario hongo Cordyceps sinensis.",
    presentation: "42 g (3.5 g x 12 sobres)",
    benefits: [
      "Sin azúcar añadida, ideal para estilos de vida conscientes y activos.",
      "Fortificado con micelio de Cordyceps sinensis rico en aminoácidos y vitaminas.",
      "Mejora la capacidad de ejercicio y la resistencia física.",
      "Promueve la salud renal y pulmonar tradicionalmente descrita en oriente.",
      "Reduce la fatiga muscular y estimula la vitalidad."
    ],
    ingredients: [
      "Café soluble premium",
      "Micelio fermentado de Cordyceps sinensis",
      "Endulzado de origen natural"
    ],
    usage: "Vierta 1 sachet en 150 ml de agua caliente, mezcle homogéneamente y consuma.",
    precautions: "Apto para diabéticos bajo supervisión habitual de su dieta. Conservar en ambiente fresco."
  },
  {
    id: "106",
    slug: "blacktea-coffee",
    name: "BlackTea Coffee",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 20.00,
    priceFormatted: "$20.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/black-tea-p-500.png",
    shortDescription: "Armoniosa combinación de café y té negro instantáneo sin azúcar, diseñado para la agilidad mental y digestión ligera.",
    presentation: "42 g (3.5 g x 12 sobres)",
    benefits: [
      "Sin azúcar, endulzado naturalmente.",
      "Favorece la concentración y rapidez de pensamiento.",
      "Coadyuva con la digestión gastrointestinal y posee suave efecto diurético.",
      "Excelente sinergia de antioxidantes de té negro y café."
    ],
    ingredients: ["Café soluble", "Extracto de té negro (Camellia sinensis)"],
    usage: "Vierta 1 sachet en 150 ml de agua caliente, mezcle y disfrute.",
    precautions: "No recomendado para personas con litiasis renal o anemia severa sin consultar a su médico."
  },
  {
    id: "112",
    slug: "cafe-de-ashwagandha",
    name: "Café de Ashwagandha",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/aswaganda-coffee.png",
    shortDescription: "Café con raíz adaptógena de Ashwagandha, formulado para regular el estrés, aportar claridad mental y calma activa.",
    presentation: "180 g (15 g x 12 sobres)",
    benefits: [
      "Propiedades adaptógenas que modulan el estrés y la ansiedad.",
      "Energía sostenible sin sobreestimulación nerviosa.",
      "Ayuda a conciliar un sueño reparador en la noche.",
      "Soporte antiinflamatorio e inmunitario natural."
    ],
    ingredients: [
      "Café instantáneo",
      "Extracto de Withania somnifera (Ashwagandha)",
      "Extracto de frambuesa y extracto de Eucommia",
      "Crema no láctea"
    ],
    usage: "Disolver 1 sachet en 150 ml de agua tibia. Mezclar enérgicamente para disolver por completo.",
    precautions: "No recomendado durante embarazo o lactancia."
  },
  {
    id: "116",
    slug: "cafe-trebol",
    name: "Café Trébol",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 23.00,
    priceFormatted: "$23.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/trebol.png",
    shortDescription: "Bebida a base de extracto de trébol rojo, rosa, semilla de lino y pueraria, ideal para el bienestar femenino y hormonal.",
    presentation: "180 g (15 g x 12 sobres)",
    benefits: [
      "Rico en isoflavonas naturales que apoyan en etapas de menopausia.",
      "Propiedades antiinflamatorias y digestivas.",
      "Aporte de fitoestrógenos para la vitalidad femenina.",
      "Agradable aroma floral y sabor suave."
    ],
    ingredients: [
      "Café instantáneo",
      "Extracto de Trifolium pratense (trébol rojo)",
      "Extracto de raíz de pueraria",
      "Extracto de rosa y semilla de lino",
      "Crema no láctea"
    ],
    usage: "Disolver 1 sachet en 150 ml de agua tibia o caliente.",
    precautions: "No recomendado para mujeres gestantes."
  },
  {
    id: "104",
    slug: "berry-juice-high-vc",
    name: "Berry Juice HIGH VC",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 25.00,
    priceFormatted: "$25.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/berry-juice-p-500.png",
    shortDescription: "Bebida en polvo ultra concentrada con alto contenido de Vitamina C natural y mix de arándanos, uvas, moras, cerezas y frambuesas.",
    presentation: "180 g (6 g x 30 sachets)",
    benefits: [
      "Explosión antioxidante de frutos rojos: arándano, mora, cereza, frambuesa y uva.",
      "Protege la agudeza visual de niños y adultos frente a pantallas.",
      "Estimula la síntesis natural de colágeno y la elasticidad de la piel.",
      "Fortalece el sistema inmunológico frente a cambios de clima."
    ],
    ingredients: [
      "Jugo de arándano en polvo",
      "Extracto concentrado de uva",
      "Extracto de cereza con melatonina vegetal",
      "Extracto de frambuesa y mora"
    ],
    usage: "Vierta 1 sachet en 150 ml de agua tibia o fría, revuelva y disfrute de su fresco sabor frutal.",
    precautions: "Mantener a temperatura menor a 30°C."
  },
  {
    id: "118",
    slug: "choco-blue",
    name: "Choco Blue",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 40.00,
    priceFormatted: "$40.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Choco_Blue_HGW-removebg-preview.png",
    shortDescription: "Deliciosa bebida de cacao puro natural, leche descremada de Nueva Zelanda y arándanos ricos en antioxidantes.",
    presentation: "660 g (33 g x 20 sachets)",
    benefits: [
      "Combinación premium de cacao puro y nutrientes de arándano.",
      "Aporte proteico y de calcio con bajo contenido de grasa.",
      "Energía limpia y bienestar cardiovascular para toda la familia.",
      "Versátil: se prepara tanto en agua caliente como en leche."
    ],
    ingredients: ["Cacao puro natural", "Leche descremada", "Arándano deshidratado en polvo"],
    usage: "Disolver 1 sachet en 180 ml de agua o leche caliente, mezclar hasta espumar.",
    precautions: "Contiene derivados lácteos."
  },
  {
    id: "120",
    slug: "choco-gano",
    name: "Choco Gano",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 40.00,
    priceFormatted: "$40.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Choco-Gano-HGW.webp",
    shortDescription: "Bebida instantánea de cacao seleccionado con extracto de Ganoderma lucidum y leche descremada.",
    presentation: "660 g (33 g x 20 sachets)",
    benefits: [
      "Sabor dulce reconfortante con perfil bajo en grasa.",
      "Propiedades adaptógenas e inmunoestimulantes del Ganoderma.",
      "Práctico formato en sobres individuales de 33 gramos.",
      "Ideal para el desayuno o merienda familiar."
    ],
    ingredients: ["Cacao natural", "Extracto de Ganoderma lucidum", "Leche descremada en polvo"],
    usage: "Vaciar 1 sobre en una taza con 180 ml de agua o leche caliente y revolver bien.",
    precautions: "Contiene lácteos."
  },
  {
    id: "122",
    slug: "fresh-drink-chang-jing-jing",
    name: "Fresh Drink Chang Jing Jing",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 13.00,
    priceFormatted: "$13.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/fresh-drink-p-500.png",
    shortDescription: "Bebida verde depurativa con hierba de cebada, bayas de goji, diente de león y clorofila para el colon y tránsito intestinal.",
    presentation: "126 g (21 g x 6 sachets)",
    benefits: [
      "Limpieza suave pero profunda del tracto digestivo y colon.",
      "Rico en fibra natural soluble y cero grasas.",
      "Efecto alcalinizante que equilibra el pH del cuerpo.",
      "Estimula el rendimiento hepático y la desintoxicación."
    ],
    ingredients: [
      "Hierba de cebada en polvo",
      "Bayas de Goji (Lycium barbarum)",
      "Raíz de Gan Cao (Regaliz)",
      "Flor y hojas de diente de león",
      "Crisantemo y ácido cítrico"
    ],
    usage: "Vierta 1 sachet en 500 ml de agua fresca, agite suavemente hasta disolver por completo y consuma en ayunas o durante la mañana.",
    precautions: "No consumir si es alérgico a alguno de los ingredientes botánicos."
  },
  {
    id: "168",
    slug: "pro-shaping-tea",
    name: "Pro Shaping Tea",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 24.00,
    priceFormatted: "$24.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/TE-QUEMADOR-DE-GRAS-HGW.jpeg",
    shortDescription: "Infusión herbal concentrada con té verde, semillas de casia, espino blanco y ginseng para apoyar la reducción de grasas.",
    presentation: "72 g (24 bolsitas filtrantes)",
    benefits: [
      "Acción termogénica y depurativa que apoya el metabolismo lipídico.",
      "Favorece la reducción de niveles elevados de colesterol.",
      "Mejora la circulación y la digestión ligera después de comidas pesadas.",
      "Formato en bolsitas filtrantes de alta pureza."
    ],
    ingredients: [
      "Té verde (Camellia sinensis)",
      "Espino blanco (Crataegus spp.)",
      "Sang Ye (Folium mori)",
      "Semen Cassiae (Semillas de casia)",
      "Ginseng (Panax ginseng)",
      "Arroz rojo (Oriza sativa)"
    ],
    usage: "Colocar 1 bolsita en una taza con 250 ml de agua hirviendo y dejar reposar 5 minutos.",
    precautions: "Conservar en lugar fresco."
  },
  {
    id: "124",
    slug: "vino-de-arandanos",
    name: "Vino de arándanos",
    category: "cafes-bebidas",
    categoryLabel: "Cafés y Bebidas Funcionales",
    price: 36.00,
    priceFormatted: "$36.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Vino-de-arandanos-HGW.jpg",
    shortDescription: "Bebida elaborada a base de frutos puros de arándano silvestre fermentado, con alta concentración de antocianinas.",
    presentation: "Botella de vidrio 750 ml",
    benefits: [
      "Potente concentración de antocianinas y fitonutrientes naturales.",
      "Excelente antioxidante que protege el sistema cardiovascular y neuronal.",
      "Sabor frutal exquisito para celebraciones y momentos de bienestar.",
      "Temperatura de servicio recomendada: 12 a 14 °C."
    ],
    ingredients: ["Frutos seleccionados de arándanos", "Sulfitos propios del proceso de fermentación"],
    usage: "Dejar reposar la botella antes de abrirla y descorchar 30 minutos antes de consumir para permitir su oxigenación.",
    precautions: "El consumo excesivo de alcohol es perjudicial. Venta prohibida a menores de 18 años."
  },

  // --- CANDIES Y SNACKS ---
  {
    id: "133",
    slug: "biolacti-candy",
    name: "Biolacti Candy",
    category: "candies-snacks",
    categoryLabel: "Candies y Snacks Funcionales",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Biolacti-candy-HGW-scaled.png",
    shortDescription: "Caramelos duros enriquecidos con 3 cepas de probióticos activos y delicioso sabor a leche descremada.",
    presentation: "Envase de 30 g (~60 unidades)",
    benefits: [
      "Aporta cepas probióticas activas (Lactobacillus acidophilus, Bifidobacterium lactis, Streptococcus thermophilus).",
      "Equilibra la microbiota intestinal y reduce la pesadez estomacal.",
      "Bajo en azúcares y sin conservantes agresivos.",
      "Portátil y cómodo de consumir en cualquier momento."
    ],
    ingredients: [
      "Lactobacillus acidophilus",
      "Bifidobacterium lactis",
      "Streptococcus thermophilus",
      "Leche descremada en polvo",
      "Lactosa"
    ],
    usage: "Consumir 1 a 3 unidades después de comer o cuando se requiera alivio digestivo.",
    precautions: "Mantener el envase bien cerrado."
  },
  {
    id: "135",
    slug: "blueberry-candy",
    name: "Blueberry Candy",
    category: "candies-snacks",
    categoryLabel: "Candies y Snacks Funcionales",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Blueberry-Candy.png",
    shortDescription: "Caramelos artesanales con concentrado puro de arándanos para disfrutar antioxidantes y frescura a donde vayas.",
    presentation: "Envase de 30 g (~60 unidades)",
    benefits: [
      "Rico en antocianinas y antioxidantes naturales.",
      "Delicioso sabor natural a fruta silvestre sin culpas.",
      "Práctico frasco dosificador para llevar en el bolso, auto o trabajo."
    ],
    ingredients: ["Polvo concentrado de arándano puro", "Base confitera suave"],
    usage: "Disolver lentamente en la boca según se desee.",
    precautions: "Conservar en lugar fresco."
  },
  {
    id: "139",
    slug: "coffee-candy",
    name: "Coffee Candy",
    category: "candies-snacks",
    categoryLabel: "Candies y Snacks Funcionales",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Coffee-Candy-HGW-scaled.png",
    shortDescription: "Caramelo duro con extracto de café y leche descremada, perfecto para un impulso de energía y enfoque inmediato.",
    presentation: "Envase de 30 g (~60 unidades)",
    benefits: [
      "Efecto energizante y estimulante rápido.",
      "Mejora la concentración en jornadas laborales o de estudio.",
      "Aroma y textura auténtica a buen café recién preparado."
    ],
    ingredients: ["Extracto de café tostado", "Leche descremada en polvo"],
    usage: "Disfrutar de 1 a 2 caramelos en momentos que requieran alerta mental.",
    precautions: "Contiene cafeína."
  },
  {
    id: "141",
    slug: "ganubi-candy",
    name: "Ganubi Candy",
    category: "candies-snacks",
    categoryLabel: "Candies y Snacks Funcionales",
    price: 8.30,
    priceFormatted: "$8.30",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Ganubi-Candy-HGW-scaled.png",
    shortDescription: "Caramelos duros que integran extracto de Ganoderma lucidum, ñame silvestre y acerola rica en vitamina C.",
    presentation: "Envase de 30 g (~60 unidades)",
    benefits: [
      "Apoyo inmunológico continuo con bioactivos del hongo Ganoderma.",
      "Aporte de antioxidantes y tonificación estomacal gracias al ñame.",
      "Sabor herbal suave y equilibrado."
    ],
    ingredients: ["Extracto de Ganoderma lucidum", "Extracto de ñame", "Extracto de acerola"],
    usage: "Consumir a lo largo del día según preferencia.",
    precautions: "Conservar fuera de la exposición solar directa."
  },
  {
    id: "143",
    slug: "gestifruit-candy",
    name: "Gestifruit Candy",
    category: "candies-snacks",
    categoryLabel: "Candies y Snacks Funcionales",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Gestifruit-Candy-HGW-scaled.png",
    shortDescription: "Caramelo con sabor cítrico a mandarina, espino blanco, extracto de Melena de León y fucoidan para digestión y frescura.",
    presentation: "Envase de 30 g (~60 unidades)",
    benefits: [
      "Estimula la digestión suave y combate la pesadez.",
      "Contiene extracto de hongo Melena de León (Hericium erinaceus) y fucoidan.",
      "Sabor a mandarina refrescante y natural."
    ],
    ingredients: ["Extracto de mandarina", "Melena de León", "Espino blanco", "Ñame", "Cebada", "Fucoidan"],
    usage: "Consumir después de las comidas principales.",
    precautions: "Conservar tapado herméticamente."
  },
  {
    id: "147",
    slug: "herbal-fresh-candy",
    name: "Herbal Fresh Candy",
    category: "candies-snacks",
    categoryLabel: "Candies y Snacks Funcionales",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/HERBAL-FRESH-CANDY-HGW.png",
    shortDescription: "Caramelos con sabor floral de flor de Camelia y extractos herbales para aliento fresco y duradero.",
    presentation: "Envase de 30 g (~60 unidades)",
    benefits: [
      "Frescura bucal prolongada y alivio de garganta.",
      "Sabor delicado a flor de Camelia.",
      "Perfecto tras las comidas o antes de citas y reuniones de trabajo."
    ],
    ingredients: ["Extracto floral de Camelia", "Menta herbal", "Base vegetal"],
    usage: "Disolver en boca cuando se desee refrescar el aliento.",
    precautions: "Conservar en lugar seco."
  },
  {
    id: "149",
    slug: "moruva-candy",
    name: "Moruva Candy",
    category: "candies-snacks",
    categoryLabel: "Candies y Snacks Funcionales",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Moruva-candy-HGW-scaled.png",
    shortDescription: "Caramelos duros que combinan el superalimento Moringa con extracto de uva rico en resveratrol.",
    presentation: "Envase de 30 g (~60 unidades)",
    benefits: [
      "Riqueza de fitonutrientes y clorofila de moringa.",
      "Antioxidantes de semilla y piel de uva.",
      "Apoyo a los niveles diarios de energía y bienestar celular."
    ],
    ingredients: ["Extracto de moringa oleifera", "Concentrado de uva"],
    usage: "Consumir de 1 a 3 caramelos al día.",
    precautions: "Conservar en ambiente seco."
  },
  {
    id: "151",
    slug: "peptipro-candy",
    name: "Peptipro Candy",
    category: "candies-snacks",
    categoryLabel: "Candies y Snacks Funcionales",
    price: 5.80,
    priceFormatted: "$5.80",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Peptipro-Candy-HGW-scaled.png",
    shortDescription: "Innovador caramelo con péptidos bioactivos de colágeno hidrolizado, ginseng asiático y rosa mosqueta.",
    presentation: "Envase de 30 g (~60 unidades)",
    benefits: [
      "Péptidos de colágeno de alta absorción para piel, uñas y cabello.",
      "Ginseng coreano para reducir la sensación de cansancio y fatiga.",
      "Fácil de tomar en cualquier lugar sin necesidad de agua ni mezclas."
    ],
    ingredients: ["Péptidos de colágeno", "Panax ginseng", "Rosa mosqueta", "Frijol mungo"],
    usage: "Disfrutar de 2 a 4 unidades al día.",
    precautions: "Apto para adultos."
  },
  {
    id: "145",
    slug: "mermelada-de-arandanos",
    name: "Mermelada de Arándanos",
    category: "candies-snacks",
    categoryLabel: "Candies y Snacks Funcionales",
    price: 12.00,
    priceFormatted: "$12.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/mermelada-p-500.png",
    shortDescription: "Deliciosa concentración de arándanos enteros seleccionados con textura suave y trozos de fruta auténtica.",
    presentation: "Tarro de 200 g",
    benefits: [
      "Elaborada con fruta fresca de arándanos rica en antocianinas.",
      "Ideal para desayunos saludables, tostadas, panqueques o postres.",
      "Proceso cuidadoso que preserva las vitaminas del fruto."
    ],
    ingredients: ["Arándanos naturales", "Jarabe de malta", "Pectina cítrica", "Ácido cítrico"],
    usage: "Servir al gusto en desayunos o meriendas.",
    precautions: "Refrigerar después de abrir."
  },

  // --- CUIDADO BUCAL ---
  {
    id: "156",
    slug: "pasta-dental-con-probioticos",
    name: "Pasta Dental con Probióticos",
    category: "cuidado-bucal",
    categoryLabel: "Cuidado Bucal Avanzado",
    price: 8.00,
    priceFormatted: "$8.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta-dental-con-probioticos-HGW-1024x1024.jpg",
    shortDescription: "Pasta dental avanzada con lisados celulares de Lactobacillus, libre de flúor y triclosán para la microbiota oral.",
    presentation: "Tubo de 120 g",
    benefits: [
      "100% Libre de flúor y libre de triclosán.",
      "Contiene lisados de Lactobacillus que estimulan las defensas de encías y mucosas.",
      "Inhibe bacterias asociadas a placa, sarro y mal aliento.",
      "Apto para toda la familia: niños, adultos, embarazadas y adultos mayores."
    ],
    ingredients: [
      "Lisado de fermento de Lactobacillus",
      "Filtrado de leche fermentada láctica",
      "Extracto de menta fresca",
      "Base mineral no abrasiva"
    ],
    usage: "Cepillar dientes, encías y lengua de 2 a 3 minutos después de cada comida.",
    precautions: "Mantener en lugar fresco."
  },
  {
    id: "158",
    slug: "pasta-dental-de-turmalina-blanca",
    name: "PASTA DENTAL DE TURMALINA (Versión Blanca)",
    category: "cuidado-bucal",
    categoryLabel: "Cuidado Bucal Avanzado",
    price: 8.00,
    priceFormatted: "$8.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta-dental-con-turmalina-blanca.jpg",
    shortDescription: "Fórmula con microcristales de turmalina, xilitol, menta y péptidos de soya para blanqueamiento natural y encías firmes.",
    presentation: "Tubo de 120 g",
    benefits: [
      "Libera iones negativos que reducen la adhesión de la placa bacteriana.",
      "Péptidos de soya que fortalecen la barrera gingival.",
      "Extractos de raíz de regaliz y diente de león que calman encías sensibles.",
      "Frescura intensa a menta natural sin flúor."
    ],
    ingredients: ["Nanoturmalina blanca", "Péptidos de soya", "Xilitol", "Extracto de regaliz y diente de león"],
    usage: "Cepillarse 3 veces al día con cepillo de cerdas suaves.",
    precautions: "No ingerir."
  },
  {
    id: "159",
    slug: "pasta-dental-turmalina-negra",
    name: "TOURMALINE TOOTHPASTE (Versión Negra)",
    category: "cuidado-bucal",
    categoryLabel: "Cuidado Bucal Avanzado",
    price: 8.00,
    priceFormatted: "$8.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta_dental_con_turmalina_negra-removebg-preview.png",
    shortDescription: "Limpieza profunda con micropartículas de Turmalina Negra, extracto de madreselva y xilitol para remover manchas y bacterias.",
    presentation: "Tubo de 120 g",
    benefits: [
      "Microabrasión no agresiva que remueve manchas de café, té y tabaco sin dañar el esmalte.",
      "Propiedades antibacterianas de la madreselva y la Bletilla striata.",
      "Sin flúor, sin agentes químicos nocivos.",
      "Protege contra la inflamación y sangrado gingival."
    ],
    ingredients: ["Polvo de Turmalina Negra", "Madreselva", "Xilitol", "Raíz de Bletilla striata", "Menta"],
    usage: "Usar diariamente en cada cepillado.",
    precautions: "Aclarar bien con agua tras su uso."
  },
  {
    id: "153",
    slug: "green-world-herbs-toothpaste",
    name: "Green World Herbs Toothpaste",
    category: "cuidado-bucal",
    categoryLabel: "Cuidado Bucal Avanzado",
    price: 8.80,
    priceFormatted: "$8.80",
    inStock: false,
    isComingSoon: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Pasta-de-Dientes-a-Base-de-Hierbas-Chinas-para-Tener-Dientes-Fuertes.jpg",
    shortDescription: "Pasta dental formulada a base de hierbas tradicionales chinas y polisacáridos activos de Lycium barbarum.",
    presentation: "Tubo de 100 g",
    benefits: [
      "Rica en esencia de Lycium chinense para promover la inmunidad oral.",
      "Combate la fatiga gingival y el sangrado espontáneo.",
      "Fragancia natural botánica con toque mentolado.",
      "Sin colorantes sintéticos añadidos."
    ],
    ingredients: ["Extracto de Lycium barbarum", "Extracto de hojas de arce", "Menta natural"],
    usage: "Cepillado diario matutino y nocturno.",
    precautions: "Próximamente disponible en Panamá."
  },

  // --- TURMALINA Y BIENESTAR FÍSICO ---
  {
    id: "92",
    slug: "protector-de-cintura-de-turmalina",
    name: "Protector de cintura de turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios y Fisioterapia de Turmalina",
    price: 69.00,
    priceFormatted: "$69.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/protector_de_cintura_hgw-removebg-preview.png",
    shortDescription: "Faja lumbar ergonómica con nanoturmalina e imanes terapéuticos que generan calor biológico natural y soporte espinal.",
    presentation: "1 Unidad con tiras elásticas dobles de alta resistencia",
    benefits: [
      "Genera calor biológico profundo por fricción e infrarrojo lejano sin electricidad.",
      "Alivia molestias en la columna lumbar, ciática y rigidez postural.",
      "Diseño ergonómico, transpirable y ajustable a cualquier contextura.",
      "Mejora la microcirculación de la zona baja de la espalda."
    ],
    ingredients: ["Tejido elástico de alta densidad", "Nanoturmalina activa", "Piedras magnéticas de neodimio"],
    usage: "Colocar sobre la piel seca en la zona lumbar. Ajustar tiras. Para acelerar el calor, friccionar ligeramente el área con la mano antes de colocar. Usar entre 30 min y 2 horas al día.",
    precautions: "No usar sobre heridas abiertas o si se porta marcapasos sin autorización médica."
  },
  {
    id: "93",
    slug: "protector-de-cuello-autocalentable-turmalina",
    name: "Protector de cuello autocalentable de turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios y Fisioterapia de Turmalina",
    price: 16.00,
    priceFormatted: "$16.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Protector_de_cuello_con_turmalina_HGW-removebg-preview.png",
    shortDescription: "Cuellera anatómica autocalentable para aliviar tensión cervical, estrés y rigidez acumulada por pantallas.",
    presentation: "1 Unidad con velcro ajustable",
    benefits: [
      "Libera calor natural e iones negativos por contacto directo con la piel.",
      "Alivia el dolor de cuello, tortícolis y fatiga de trapecios.",
      "Ligero y portátil para usar en oficina, hogar o viajes largos.",
      "No requiere baterías ni cables."
    ],
    ingredients: ["Turmalina micronizada", "Puntos magnéticos", "Neopreno transpirable"],
    usage: "Ajustar con el velcro en el cuello durante 15 a 45 minutos al día.",
    precautions: "Suspender si la sensación térmica es excesiva según la sensibilidad cutánea."
  },
  {
    id: "95",
    slug: "protector-de-rodilla-de-turmalina",
    name: "Protector de Rodilla de Turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios y Fisioterapia de Turmalina",
    price: 55.00,
    priceFormatted: "$55.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/protector_de_rodilla_hgw-removebg-preview.png",
    shortDescription: "Rodilleras ortopédicas ajustables con turmalina activa y magnetoterapia para alivio articular y estabilidad.",
    presentation: "1 Par de rodilleras ajustables",
    benefits: [
      "Calor terapéutico suave que estimula la circulación sinovial.",
      "Ideal para personas con desgaste articular, meniscos o deportistas.",
      "Soporte y estabilidad durante la marcha y subida de escaleras.",
      "Tejido transpirable y flexible que permite libre movimiento."
    ],
    ingredients: ["Partículas de turmalina", "Bandas magnéticas", "Tejido elástico de compresión"],
    usage: "Ajustar en la rodilla sobre la piel limpia. Usar de 30 minutos a 2 horas diarias.",
    precautions: "Lavar a mano con agua fría y jabón neutro sin frotar bruscamente."
  },
  {
    id: "86",
    slug: "plantillas-de-turmalina",
    name: "Plantillas de turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios y Fisioterapia de Turmalina",
    price: 9.00,
    priceFormatted: "$9.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Plantillas-de-turmalina-HGW.webp",
    shortDescription: "Plantillas anatómicas recortables con nodos de turmalina que estimulan puntos de reflexología podal.",
    presentation: "1 Par (talla universal recortable)",
    benefits: [
      "Estimulación continua de puntos de reflexología plantar.",
      "Mejora el retorno venoso y combate la pesadez de piernas cansadas.",
      "Efecto térmico natural para pies fríos o jornadas largas de pie.",
      "Fáciles de recortar y colocar en cualquier tipo de calzado."
    ],
    ingredients: ["Polímero flexible amortiguador", "Nodos de turmalina mineral"],
    usage: "Recortar según la silueta de la plantilla de su calzado y colocar con el lado punteado hacia arriba.",
    precautions: "Limpiar con un paño húmedo."
  },
  {
    id: "80",
    slug: "almohada-magnetica-de-turmalina",
    name: "Almohada magnética de turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios y Fisioterapia de Turmalina",
    price: 89.00,
    priceFormatted: "$89.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Almohada-de-turmalina.png",
    shortDescription: "Almohada cervical ergonómica con imanes continuos y turmalina para un sueño profundo y descanso ortopédico.",
    presentation: "1 Unidad con funda desmontable lavable",
    benefits: [
      "Diseño anatómico con curvatura que sostiene la columna cervical en alineación perfecta.",
      "Piedras de turmalina que disipan campos electromagnéticos estáticos.",
      "Facilita la relajación muscular profunda durante la noche.",
      "Espuma viscoelástica de memoria indeformable."
    ],
    ingredients: ["Espuma viscoelástica con memoria", "Rejilla de turmalina", "Imanes terapéuticos"],
    usage: "Usar diariamente como almohada principal de descanso nocturno.",
    precautions: "Lavar únicamente la funda exterior."
  },
  {
    id: "84",
    slug: "colgante-piedra-energetica",
    name: "Colgante Piedra Energética",
    category: "turmalina",
    categoryLabel: "Accesorios y Fisioterapia de Turmalina",
    price: 50.00,
    priceFormatted: "$50.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Colgante-de-Piedra-Energetica.webp",
    shortDescription: "Accesorio portable de turmalina volcánica prensada que emite aniones (iones negativos) para protección electromagnética.",
    presentation: "1 Dije con cordón ajustable en estuche",
    benefits: [
      "Emisión constante de iones negativos protectores ante campos electromagnéticos (wifi, computadoras, celulares).",
      "Mejora la vitalidad general y ayuda a disipar el cansancio mental.",
      "Basado en investigaciones sobre la microenergía de la turmalina.",
      "Diseño sobrio y elegante para hombres y mujeres."
    ],
    ingredients: ["Turmalina mineral natural compactada"],
    usage: "Llevar sobre el pecho o cerca del cuerpo diariamente.",
    precautions: "Evitar golpes fuertes sobre superficies duras."
  },
  {
    id: "82",
    slug: "collar-de-turmalina",
    name: "Collar de turmalina",
    category: "turmalina",
    categoryLabel: "Accesorios y Fisioterapia de Turmalina",
    price: 40.00,
    priceFormatted: "$40.00",
    inStock: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/Collar-de-turmalina-No.-15.png",
    shortDescription: "Joyería artesanal elaborada a mano con cuentas esféricas de piedras naturales de turmalina multicolor.",
    presentation: "1 Collar ajustable con cierre de seguridad",
    benefits: [
      "Pieza artesanal única que une estilo sofisticado y equilibrio energético.",
      "Piedras naturales de turmalina en tonos negros, sandía y verdes.",
      "Ideal para uso diario u ocasiones formales."
    ],
    ingredients: ["Piedras naturales de turmalina facetadas o esféricas"],
    usage: "Colocar como gargantilla o collar.",
    precautions: "Limpieza periódica en solución salina marina (1 cucharada en 500ml de agua por 4 horas)."
  },
  {
    id: "94",
    slug: "protector-intimo-diario-turmalina",
    name: "Protector Intimo diario con Turmalina",
    category: "turmalina",
    categoryLabel: "Cuidado Personal y Femenino",
    price: 5.50,
    priceFormatted: "$5.50",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Protectores-intimos-HGW.png",
    shortDescription: "Protector diario femenino ultrafino con banda aniónica verde de turmalina y suave capa 100% algodón.",
    presentation: "Paquete de 30 unidades selladas",
    benefits: [
      "Banda aniónica de turmalina que neutraliza olores y proliferación bacteriana.",
      "Capa de algodón suave hipoalergénica que previene irritaciones.",
      "Diseño anatómico transpirable para total libertad diaria."
    ],
    ingredients: ["Celulosa vegetal", "Tela no tejida de algodón", "Banda con extracto de turmalina"],
    usage: "Adherir a la ropa interior y cambiar cuando sea necesario.",
    precautions: "No arrojar al inodoro."
  },
  {
    id: "96",
    slug: "toalla-sanitaria-dia-turmalina",
    name: "Toalla Sanitaria Día con Turmalina",
    category: "turmalina",
    categoryLabel: "Cuidado Personal y Femenino",
    price: 5.50,
    priceFormatted: "$5.50",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Toalla-sanitaria-con-turmalina-HGW-uso-dia.png",
    shortDescription: "Toalla sanitaria para uso diurno con banda de turmalina generadora de aniones y ultra absorción.",
    presentation: "Paquete de 10 unidades individuales",
    benefits: [
      "Alta capacidad de absorción y retención de líquidos sin humedad superficial.",
      "Banda aniónica que alivia cólicos y molestias inflamatorias por calor biológico.",
      "Empaque sellado con apertura resellable higiénica."
    ],
    ingredients: ["Algodón puro", "Banda aniónica de nanoturmalina", "Polímero absorbente biodegradable"],
    usage: "Uso durante el ciclo menstrual diurno.",
    precautions: "Conservar en lugar seco y libre de humedad."
  },
  {
    id: "97",
    slug: "toalla-sanitaria-noche-turmalina",
    name: "Toalla Sanitaria Noche con Turmalina",
    category: "turmalina",
    categoryLabel: "Cuidado Personal y Femenino",
    price: 4.50,
    priceFormatted: "$4.50",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Toalla-sanitaria-con-turmalina-HGW-uso-nocturno.png",
    shortDescription: "Toalla sanitaria anatómica nocturna con mayor longitud, alas protectoras y banda de aniones de turmalina.",
    presentation: "Paquete de 8 unidades de mayor cobertura",
    benefits: [
      "Mayor cobertura posterior que previene fugas al dormir.",
      "Control de olores e higiene profunda durante horas de descanso.",
      "Sensación ultra suave de frescura continua."
    ],
    ingredients: ["Tela no tejida", "Núcleo de celulosa y gel", "Banda de turmalina activa"],
    usage: "Colocar antes de acostarse para protección durante toda la noche.",
    precautions: "Uso externo exclusivamente."
  },

  // --- CUIDADO PERSONAL Y BELLEZA ---
  {
    id: "31",
    slug: "jabon-de-turmalina",
    name: "Jabón de turmalina",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 4.62,
    priceFormatted: "$4.62",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Jabon-de-turmalina.jpeg",
    shortDescription: "Fórmula de limpieza profunda con nanoturmalina negra que activa la piel mediante la liberación de iones negativos y calor térmico.",
    presentation: "Barra de 100 g",
    benefits: [
      "Limpia profundamente los poros, eliminando toxinas y residuos de maquillaje.",
      "Ayuda a controlar el exceso de grasa y previene la aparición de espinillas.",
      "Estimula la microcirculación cutánea, mejorando la oxigenación celular.",
      "Deja la piel con una sensación de frescura y vitalidad.",
      "Apto para uso facial y corporal en todo tipo de piel."
    ],
    ingredients: ["Jabón base vegetal", "Polvo de turmalina negra (nanopartículas)", "Glicerina vegetal", "Aceites esenciales suavizantes"],
    usage: "Humedecer la piel y la barra de jabón. Generar abundante espuma y aplicar sobre el rostro o cuerpo con masajes circulares durante 1 o 2 minutos. Enjuagar con suficiente agua.",
    precautions: "Evitar el contacto con los ojos. Si observa alguna reacción desfavorable, suspenda su uso. Mantener en una jabonera seca."
  },
  {
    id: "20",
    slug: "jabon-de-artemisa",
    name: "Jabón de Artemisa",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 7.20,
    priceFormatted: "$7.20",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Jabon-de-artemisa.jpeg",
    shortDescription: "Jabón artesanal formulado con extractos de Artemisia argyi, conocida por sus propiedades antibacterianas y antiinflamatorias.",
    presentation: "Barra de 100 g",
    benefits: [
      "Combate bacterias y microorganismos en la superficie de la piel.",
      "Calma irritaciones, picazón y rojeces cutáneas.",
      "Proporciona una exfoliación suave que remueve células muertas.",
      "Ideal para pieles grasas o con tendencia a dermatitis leve.",
      "Aroma herbal natural que promueve la relajación."
    ],
    ingredients: ["Extracto de hoja de Artemisia argyi", "Aceite esencial de Artemisa", "Sodio palmato", "Carbonato de calcio"],
    usage: "Lavar el área deseada con la espuma del jabón, dejar actuar unos instantes y aclarar con abundante agua.",
    precautions: "Uso externo solamente. Mantener fuera del alcance de los niños."
  },
  {
    id: "56",
    slug: "jabon-de-oliva",
    name: "Olive Soap – Jabón de Oliva",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 4.62,
    priceFormatted: "$4.62",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Jabon-de-Oliva.jpeg",
    shortDescription: "Jabón ultra hidratante con aceite de oliva virgen, miel pura y vitamina E para pieles sensibles y resecas.",
    presentation: "Barra de 100 g",
    benefits: [
      "Nutre y bloquea la pérdida de humedad gracias a la miel y el aceite de oliva.",
      "La vitamina E protege la piel frente al fotoenvejecimiento.",
      "pH suavemente alcalino ideal para la limpieza facial matutina.",
      "Especialmente recomendado para cutículas delgadas o piel sensible."
    ],
    ingredients: ["Aceite de oliva virgen", "Miel especial", "Vitamina E (Tocoferol)", "Glicerina"],
    usage: "Usar diariamente en rostro y cuerpo durante el baño matutino.",
    precautions: "Conservar en jabonera con drenaje."
  },
  {
    id: "58",
    slug: "press-on-nails-unas-acrilicas",
    name: "Press On Nails / Uñas acrilicas",
    category: "cuidado-personal",
    categoryLabel: "Belleza y Accesorios",
    price: 8.58,
    priceFormatted: "$8.58",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Press-on-nails-HGW.png",
    shortDescription: "Uñas acrílicas listas para colocar en minutos, resistentes y reutilizables en variados diseños contemporáneos.",
    presentation: "Caja de 30 piezas con adhesivos y accesorios",
    benefits: [
      "Manicura profesional de salón en 5 minutos en casa.",
      "No dañan las uñas naturales al colocarlas o retirarlas adecuadamente.",
      "Reutilizables con adhesivos de repuesto.",
      "Variedad de tallas que se adaptan a cada uña."
    ],
    ingredients: ["Acrílico ABS de grado médico", "Adhesivos hipoalergénicos"],
    usage: "Limpiar y desengrasar las uñas, seleccionar la talla, colocar la pestaña adhesiva y presionar 15 segundos.",
    precautions: "Evitar contacto prolongado con agua caliente en la primera hora tras la aplicación."
  },
  {
    id: "60",
    slug: "smilife-blueberry-essence",
    name: "SMILIFE Blueberry Essence",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 49.29,
    priceFormatted: "$49.29",
    inStock: false,
    isComingSoon: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/SMILIFE-Blueberry-Essence.jpg",
    shortDescription: "Esencia facial concentrada con extracto de arándano, ácido hialurónico, péptidos tensores y colágeno.",
    presentation: "Frasco dosificador con gotero",
    benefits: [
      "Alta concentración de péptidos tensores (acetil hexapéptido-8, palmitoil tripéptido-5).",
      "Hidratación profunda con hialuronato de sodio y ceramida 3.",
      "Deja la piel con aspecto radiante, suave y firme.",
      "Extracto botánico de arándano, ginseng y aloe vera."
    ],
    ingredients: ["Extracto de Vaccinium Angustifolium", "Ácido hialurónico", "Péptidos tensores", "Colágeno hidrolizado"],
    usage: "Aplicar 3-4 gotas sobre rostro limpio y dar toques suaves con la yema de los dedos.",
    precautions: "Próximamente disponible en Panamá. Para uso externo."
  },
  {
    id: "62",
    slug: "smilife-blueberry-eye-cream",
    name: "SMILIFE Blueberry Eye Cream",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 35.94,
    priceFormatted: "$35.94",
    inStock: false,
    isComingSoon: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/SMILIFE-Blueberry-Eye-Cream.jpg",
    shortDescription: "Crema para el contorno de ojos con tripéptidos, centella asiática, alantoína y arándano para ojeras y líneas finas.",
    presentation: "Tubo oftálmico de precisión",
    benefits: [
      "Disminuye la apariencia de bolsas y ojeras oscuras.",
      "Restaura la elasticidad del párpado y patas de gallo.",
      "Textura suave de rápida penetración sin residuo pegajoso."
    ],
    ingredients: ["Ácido hialurónico reticulado", "Tripéptido de cobre-1", "Centella asiática", "Mantequilla de karité"],
    usage: "Aplicar una pequeña cantidad en el hueso orbital dando suaves golpecitos con el dedo anular.",
    precautions: "Próximamente disponible."
  },
  {
    id: "68",
    slug: "smilife-blueberry-toner",
    name: "SMILIFE Blueberry Toner",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 30.80,
    priceFormatted: "$30.80",
    inStock: false,
    isComingSoon: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/SMILIFE-Blueberry-Toner.jpg",
    shortDescription: "Tónico facial revitalizante con fermentos probióticos bífidos, extracto de arándano y ácido etil-ascórbico.",
    presentation: "Frasco de 120 ml",
    benefits: [
      "Equilibra el pH cutáneo tras la limpieza facial.",
      "Aporta antioxidantes y prepara la piel para absorber sueros y cremas.",
      "Sensación refrescante instantánea."
    ],
    ingredients: ["Fermento bífido", "Extracto de arándano", "Vitamina C estable", "Colágeno"],
    usage: "Aplicar con algodón o directo con las palmas tras el limpiador.",
    precautions: "Próximamente disponible."
  },
  {
    id: "74",
    slug: "smilife-facial-cleanser",
    name: "SMILIFE Facial Cleanser",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 16.43,
    priceFormatted: "$16.43",
    inStock: false,
    isComingSoon: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/SMILIFE-Facial-Cleanser.jpg",
    shortDescription: "Limpiador facial espumoso con aminoácidos, extracto de arándano, bambú y ceramidas.",
    presentation: "Tubo de 100 ml",
    benefits: [
      "Limpia a fondo grasa e impurezas sin alterar la barrera cutánea.",
      "Espuma rica, densa y cremosa que no reseca.",
      "Deja la piel suave, luminosa y elástica."
    ],
    ingredients: ["Glicinato de sodio", "Extracto de arándano", "Ceramida 3", "Extracto de bambú"],
    usage: "Hacer espuma con agua en las palmas, masajear el rostro 1 minuto y aclarar bien.",
    precautions: "Próximamente disponible."
  },
  {
    id: "76",
    slug: "smilife-keratin-shampoo",
    name: "SMILIFE Keratin Shampoo",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 16.00,
    priceFormatted: "$16.00",
    inStock: false,
    isComingSoon: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/SHAMPOO-SMILIFE-HGW.jpg",
    shortDescription: "Champú capilar fortificado con queratina hidrolizada y plantas chinas para reparar puntas abiertas y resequedad.",
    presentation: "Botella de 500 ml",
    benefits: [
      "Repara la fibra capilar desde la raíz hasta las puntas.",
      "Estimula el folículo piloso con jengibre y Polygonum multiflorum.",
      "Deja el cabello sedoso, nutrido y con brillo duradero."
    ],
    ingredients: ["Queratina hidrolizada", "Extracto de Polygonum multiflorum", "Extracto de raíz de jengibre", "Thuja orientalis"],
    usage: "Aplicar sobre cabello mojado, masajear el cuero cabelludo y enjuagar con agua templada.",
    precautions: "Próximamente disponible."
  },
  {
    id: "78",
    slug: "smilife-tourmaline-shower-gel",
    name: "SMILIFE Tourmaline Shower Gel",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 12.00,
    priceFormatted: "$12.00",
    inStock: false,
    isComingSoon: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/SMILIFE-Tourmaline-Shower-Gel.webp",
    shortDescription: "Gel de ducha energizante con microextracto de turmalina para eliminar impurezas y revitalizar la piel.",
    presentation: "Botella de 500 ml",
    benefits: [
      "Sensación tonificante en todo el cuerpo durante la ducha.",
      "Espuma rica y cremosa que respeta el manto lipídico.",
      "Aroma fresco y limpio."
    ],
    ingredients: ["Extracto de turmalina", "Tensioactivos suaves", "Ácido cítrico"],
    usage: "Aplicar sobre esponja o manos, generar espuma y aclarar con agua.",
    precautions: "Próximamente disponible."
  },
  {
    id: "70",
    slug: "smilife-deodorant-man",
    name: "SMILIFE Deodorant Man",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 22.15,
    priceFormatted: "$22.15",
    inStock: false,
    isComingSoon: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/DESODORANTE-HOMBRE-HGW.webp",
    shortDescription: "Desodorante corporal en spray masculino con zinc activo, extracto de arándano y hamamelis.",
    presentation: "Spray de 100 ml",
    benefits: [
      "Neutraliza bacterias causantes del mal olor con PCA de zinc.",
      "Fórmula botánica suave sin alcohol abrasivo.",
      "Protección fresca y confortable durante toda la jornada."
    ],
    ingredients: ["PCA de zinc", "Extracto de arándano", "Extracto de Hamamelis virginiana", "Ácido hialurónico"],
    usage: "Rociar a 15 cm de las axilas limpias y secas.",
    precautions: "Próximamente disponible."
  },
  {
    id: "72",
    slug: "smilife-deodorant-woman",
    name: "SMILIFE Deodorant Woman",
    category: "cuidado-personal",
    categoryLabel: "Cuidado Personal y Cosméticos",
    price: 22.15,
    priceFormatted: "$22.15",
    inStock: false,
    isComingSoon: true,
    image: "https://hgwpanama.com/wp-content/uploads/2026/10/DESODORANTE-MUJER-HGW.webp",
    shortDescription: "Desodorante corporal en spray femenino con extractos naturales, confort calmante y frescura floral.",
    presentation: "Spray de 100 ml",
    benefits: [
      "Cuida la piel delicada de las axilas femeninas.",
      "Control de olores con activos botánicos y zinc.",
      "Humecta y deja la piel suave y perfumada."
    ],
    ingredients: ["Zinc PCA", "Extracto de Vaccinium angustifolium", "Hamamelis", "Hialuronato sódico"],
    usage: "Aplicar de 1 a 3 pulverizaciones sobre la piel limpia.",
    precautions: "Próximamente disponible."
  },

  // --- NUTRICIÓN Y SUPLEMENTOS ---
  {
    id: "127",
    slug: "capsula-spirulina-plus",
    name: "Cápsula Spirulina Plus",
    category: "nutricion",
    categoryLabel: "Nutrición y Suplementos",
    price: 25.00,
    priceFormatted: "$25.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Spirulina-en-capsulas-Plus-con-Gingseng-HGW.jpg",
    shortDescription: "Superalimento en cápsulas con espirulina cultivada y extracto de ginseng para defensas, energía y desintoxicación.",
    presentation: "Frasco con 60 cápsulas (500 mg c/u)",
    benefits: [
      "Microalga espirulina rica en proteínas completas, hierro, ficocianina y complejo B.",
      "Fortalecida con Panax ginseng para resistir la fatiga diaria.",
      "Apoya la depuración y eliminación natural de toxinas.",
      "Ayuda en el control del apetito y fortalecimiento del sistema inmune."
    ],
    ingredients: ["Polvo de espirulina pura (Spirulina platensis)", "Extracto de Panax ginseng"],
    usage: "Adultos: tomar 1 o 2 cápsulas al día con un vaso de agua.",
    precautions: "Consultar a su médico en caso de embarazo, lactancia o gota."
  },
  {
    id: "131",
    slug: "peptido-de-colageno-de-arandano",
    name: "Péptido de colágeno de arándano",
    category: "nutricion",
    categoryLabel: "Nutrición y Suplementos",
    price: 29.00,
    priceFormatted: "$29.00",
    inStock: true,
    featured: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/colageno-p-500.png",
    shortDescription: "Bebida en jalea concentrada con péptido y tripéptido de colágeno, 11 superfrutas, vitaminas y minerales.",
    presentation: "Caja de 300 g (12 sachets)",
    benefits: [
      "Péptido y tripéptido de colágeno de absorción inmediata para cartílagos, huesos y piel.",
      "Enriquecido con concentrado de cereza, arándano, acaí, acerola, piña, papaya y kiwi.",
      "Aporte de vitaminas A, C, B1, B6, B12, D, E y minerales (calcio, zinc, magnesio).",
      "Consistencia suave y delicioso sabor a frutas naturales sin azúcar añadida."
    ],
    ingredients: [
      "Péptido y tripéptido de colágeno hidrolizado",
      "Jugo compuesto de frutas: arándano, cereza, acaí, acerola, naranja sanguina, kiwi",
      "Vitaminas y minerales quelatados",
      "Fructooligosacáridos (FOS)"
    ],
    usage: "Consumir 1 sachet al día directamente del empaque o diluido en un poco de agua.",
    precautions: "No consumir en caso de alergia a los ingredientes marinos o frutales."
  },
  {
    id: "129",
    slug: "lactiberry",
    name: "Lactiberry",
    category: "nutricion",
    categoryLabel: "Nutrición y Suplementos",
    price: 28.00,
    priceFormatted: "$28.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/lactiberry-p-500.png",
    shortDescription: "Mezcla nutritiva instantánea a base de arándanos con trozos de fruta, suero de leche de Nueva Zelanda y té negro.",
    presentation: "300 g (10 sachets)",
    benefits: [
      "Proteína de suero de alta calidad combinada con antocianinas de arándano.",
      "Soporte nutricional para la masa muscular y vitalidad ósea.",
      "Sabor cremoso delicioso con trocitos visibles de arándano.",
      "Té negro que favorece la protección cardiovascular y digestión."
    ],
    ingredients: ["Suero de leche de Nueva Zelanda", "Arándanos en polvo y trozos", "Té negro (Camellia sinensis)", "Leche descremada"],
    usage: "Disolver 1 sachet en 150 ml de agua caliente, mezclar y tomar a temperatura agradable.",
    precautions: "Contiene derivados de la leche."
  },

  // --- HOGAR Y ACCESORIOS ---
  {
    id: "160",
    slug: "hervidor-electrico",
    name: "Hervidor Eléctrico",
    category: "hogar-accesorios",
    categoryLabel: "Hogar y Equipos Funcionales",
    price: 60.00,
    priceFormatted: "$60.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Hervidor_electrico-removebg-preview.png",
    shortDescription: "Hervidor eléctrico de acero inoxidable con apagado automático, ideal para preparar cafés e infusiones HGW.",
    presentation: "1 Unidad con base giratoria 360°",
    benefits: [
      "Hierve agua en pocos minutos con alta eficiencia energética.",
      "Cuerpo higiénico de acero inoxidable y asa antiquemaduras.",
      "Sistema de seguridad con apagado automático tras la ebullición.",
      "El aliado perfecto para preparar tu café Ganoderma, Choco Blue o Pro Shaping Tea."
    ],
    ingredients: ["Acero inoxidable de grado alimentario", "Base eléctrica homologada"],
    usage: "Llenar con agua hasta el nivel indicado, encender y servir al alcanzar la temperatura.",
    precautions: "Desconectar antes de limpiar la base."
  },
  {
    id: "164",
    slug: "tourmaline-thermo-waterson",
    name: "Tourmaline Thermo (WATERSON)",
    category: "hogar-accesorios",
    categoryLabel: "Hogar y Equipos Funcionales",
    price: 95.00,
    priceFormatted: "$95.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Thermo_de_turmalina-removebg-preview.png",
    shortDescription: "Termo ionizador de acero inoxidable con filtro interno de turmalina natural que ayuda a alcalinizar el agua.",
    presentation: "Termo de 500 ml con filtro integrado",
    benefits: [
      "Convierte el agua común en agua enriquecida con iones negativos y pH alcalino.",
      "Acero inoxidable de grado alimenticio no tóxico de doble pared al vacío.",
      "Conserva la temperatura de líquidos fríos o calientes por muchas horas.",
      "Diseño anatómico, elegante y fácil de llevar al gimnasio o trabajo."
    ],
    ingredients: ["Piedras naturales de turmalina", "Acero inoxidable 304 de doble pared"],
    usage: "Llenar con agua purificada, dejar reposar 10-15 minutos para que la turmalina interactúe con el líquido y beber.",
    precautions: "Lavar y secar bien el filtro periódicamente."
  },
  {
    id: "166",
    slug: "vaso-termico-hgw",
    name: "Vaso Térmico HGW",
    category: "hogar-accesorios",
    categoryLabel: "Hogar y Equipos Funcionales",
    price: 36.00,
    priceFormatted: "$36.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Vaso_termico-removebg-preview.png",
    shortDescription: "Vaso térmico hermético y ecológico para llevar tus bebidas frías o calientes sin derrames en el día a día.",
    presentation: "Vaso de 450 ml con tapa hermética",
    benefits: [
      "Aislamiento térmico de alto rendimiento que mantiene el calor o frío por horas.",
      "Tapa hermética con boquilla antifugas para el auto o mochila.",
      "Reutilizable, libre de BPA y resistente a olores.",
      "Diseño ergonómico con acabado mate premium."
    ],
    ingredients: ["Acero inoxidable grado alimentario", "Tapa libre de BPA"],
    usage: "Verter la bebida fría o caliente, enroscar la tapa y disfrutar.",
    precautions: "Lavar con esponja suave."
  },
  {
    id: "162",
    slug: "taza-de-cafe-termica-hgw",
    name: "Taza de café termica HGW",
    category: "hogar-accesorios",
    categoryLabel: "Hogar y Equipos Funcionales",
    price: 26.00,
    priceFormatted: "$26.00",
    inStock: true,
    image: "https://media.academiahgw.online/wp-content/uploads/2026/11/Coffee_Cup-removebg-preview.png",
    shortDescription: "Taza térmica compacta de 390 ml con asa ergonómica y tapa protectora para disfrutar de tu café en la oficina o casa.",
    presentation: "Taza térmica de 390 ml",
    benefits: [
      "Mantiene tu café o té caliente por más tiempo sin quemar las manos.",
      "Base antideslizante y tamaño perfecto para máquinas de café.",
      "Material duradero fácil de lavar."
    ],
    ingredients: ["Acero inoxidable y polímero aislante térmico"],
    usage: "Ideal para servir Blueberry Coffee, Cordyceps Coffee o Choco Blue.",
    precautions: "No apta para microondas."
  }
];

// MEMBRESÍAS ACTUALIZADAS EXCLUSIVAMENTE CON EL DOCUMENTO ADJUNTO
// (Pre-Junior, Junior, Senior, Master - SIN Diamante y SIN logotipos de rangos)
export interface MembershipPlan {
  id: string;
  name: string;
  bv: string;
  priceEstimate: string;
  productsChoice: string;
  fastStartBonus: string;
  developmentBonus: string;
  teamBonus: string;
  dailyEarningsCap: string;
  eliteBonus?: string;
  repurchaseBonus: string;
  directSaleProfit: string;
  packageImageUrl: string;
  recommended?: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "pre-junior",
    name: "Membresía Pre-Junior",
    bv: "50 BV",
    priceEstimate: "B/. 90.00 (aprox)",
    productsChoice: "Productos de su preferencia",
    fastStartBonus: "$5.00",
    developmentBonus: "0.20 USD",
    teamBonus: "5%",
    dailyEarningsCap: "50 USD",
    repurchaseBonus: "5%",
    directSaleProfit: "30%",
    packageImageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/prejunior-hgw.png",
  },
  {
    id: "junior",
    name: "Membresía Junior",
    bv: "100 BV",
    priceEstimate: "B/. 180.00 (aprox)",
    productsChoice: "Productos de su preferencia",
    fastStartBonus: "$10.00",
    developmentBonus: "0.50 USD",
    teamBonus: "7%",
    dailyEarningsCap: "120 USD",
    repurchaseBonus: "5%",
    directSaleProfit: "30%",
    packageImageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/JUNIOR-100-BV.png",
  },
  {
    id: "senior",
    name: "Membresía Senior",
    bv: "300 BV",
    priceEstimate: "B/. 540.00 (aprox)",
    productsChoice: "Productos de su preferencia",
    fastStartBonus: "$30.00",
    developmentBonus: "1.50 USD",
    teamBonus: "8%",
    dailyEarningsCap: "360 USD",
    eliteBonus: "4% Hasta 3era generación",
    repurchaseBonus: "5%",
    directSaleProfit: "30%",
    packageImageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/senior.png",
  },
  {
    id: "master",
    name: "Membresía Master",
    bv: "600 BV",
    priceEstimate: "B/. 1024.00 (aprox)",
    productsChoice: "Productos de su preferencia",
    fastStartBonus: "$60.00",
    developmentBonus: "3.00 USD",
    teamBonus: "10%",
    dailyEarningsCap: "720 USD",
    eliteBonus: "4% Hasta 6ta generación",
    repurchaseBonus: "5%",
    directSaleProfit: "60% (Hasta 52% en recompras según el plan)",
    packageImageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/master-600-bv-hgw.png",
    recommended: true,
  }
];

export const CERTIFICATIONS = [
  {
    name: "FDA Registered",
    description: "Instalaciones registradas ante la Administración de Alimentos y Medicamentos de EE.UU.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/FDA-1024x683-1.webp"
  },
  {
    name: "GMP (Good Manufacturing Practice)",
    description: "Normas de Buenas Prácticas de Manufactura en formulación, pureza y envasado.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Good_Manufacturing_Practice-1024x683-1.webp"
  },
  {
    name: "HACCP",
    description: "Análisis de Peligros y Puntos Críticos de Control en seguridad de alimentos.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/HACCP-1024x683-1.webp"
  },
  {
    name: "ISO 9001",
    description: "Certificación internacional de sistemas de gestión de calidad total.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Iso_9001-1024x683-1.webp"
  },
  {
    name: "Halal Certified",
    description: "Garantía de pureza, higiene y origen en todos los ingredientes.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Halal_Certified-1024x683-1.webp"
  },
  {
    name: "Asociación Panameña de Venta Directa",
    description: "Alineados a las normas de ética y transparencia en venta directa en Panamá.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Asociacion-Panamena-de-Venta-directa.webp"
  }
];
