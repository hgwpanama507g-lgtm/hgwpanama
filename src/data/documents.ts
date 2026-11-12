export interface DocumentItem {
  id: string;
  slug: string;
  title: string;
  category: 'cafes-bebidas' | 'nutricion' | 'cuidado-personal' | 'turmalina' | 'planes';
  categoryLabel: string;
  url: string;
  description: string;
  size: string;
  coverImageUrl: string;
}

export const HGW_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-01',
    slug: 'catalogo-productos-hgw-panama-2026',
    title: 'Catálogo Oficial de Productos HGW Panamá 2026',
    category: 'cafes-bebidas',
    categoryLabel: 'Catálogos y Listados',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/CATALOGO-PANAMA-2026_compressed-2toalla.pdf',
    description: 'Catálogo completo y actualizado con toda la línea de productos disponibles para el mercado panameño este 2026.',
    size: '8.4 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/CATALOGO_PANAMA_2026_pagina1.png'
  },
  {
    id: 'doc-02',
    slug: 'listado-de-precios-hgw-panama-2026',
    title: 'Listado de Precios Oficial HGW Panamá 2026',
    category: 'planes',
    categoryLabel: 'Catálogos y Listados',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/lp-1.pdf',
    description: 'Referencia oficial de precios al público y precios de distribuidor para todos los productos en Panamá.',
    size: '1.2 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/Listado-de-precios-HGW-Panama-2026.png'
  },
  {
    id: 'doc-12',
    slug: 'cordyceps-hgw-ficha-tecnica',
    title: '12. Cordyceps HGW - Ficha Técnica y Beneficios',
    category: 'nutricion',
    categoryLabel: 'Nutrición y Suplementos',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/12.-CORDYCEPS.pdf',
    description: 'Información oficial sobre el hongo Cordyceps militaris, propiedades adaptógenas y soporte inmunológico.',
    size: '2.4 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/12._CORDYCEPS-1024x576.png'
  },
  {
    id: 'doc-13',
    slug: 'espirulina-hgw-nutricion-celular',
    title: '13. Espirulina HGW - Superalimento y Nutrición Celular',
    category: 'nutricion',
    categoryLabel: 'Nutrición y Suplementos',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/13.-ESPIRULINA.pdf',
    description: 'Detalle de la microalga espirulina combinada con ginseng, proteínas completas y clorofila.',
    size: '1.8 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/13._ESPIRULINA-1024x576.png'
  },
  {
    id: 'doc-16',
    slug: 'hgw-serie-cafe-funcional',
    title: '16. HGW Serie Café Funcional (Ganoderma, Arándano y Cordyceps)',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/16.-HGW-SERIE-CAFE.pdf',
    description: 'Catálogo completo de la línea de cafés solubles enriquecidos con extractos herbales y hongo reishi.',
    size: '3.5 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/16._HGW_SERIE_CAF_-1024x576.png'
  },
  {
    id: 'doc-17',
    slug: 'hgw-blueberry-collagen-peptide',
    title: '17. HGW Blueberry Collagen Peptide (Colágeno con Arándano)',
    category: 'nutricion',
    categoryLabel: 'Nutrición y Suplementos',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/17.-HGW-Blueberry-Collagen-Peptide.pdf',
    description: 'Ficha técnica de péptidos y tripéptidos de colágeno marino con superfrutas.',
    size: '2.1 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/17._HGW_Blueberry_Collagen_Peptide-1024x576.png'
  },
  {
    id: 'doc-18',
    slug: 'hgw-blueberry-soybean-milk-drink',
    title: '18. HGW Blueberry Soybean Milk Drink',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/18.-HGW-Blueberry-Soybean-Milk-Drink.pdf',
    description: 'Bebida nutritiva a base de soya seleccionada y extracto de arándano silvestre.',
    size: '1.9 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/18._HGW_Blueberry_Soybean_Milk_Drink-1024x576.png'
  },
  {
    id: 'doc-20',
    slug: 'blueberry-candy-fitonutritivos',
    title: '20. Blueberry Candy (Candies Fitonutritivos)',
    category: 'nutricion',
    categoryLabel: 'Candies y Snacks',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/20.-BLUEBERRY-CANDY.pdf',
    description: 'Caramelos funcionales de arándano ricos en antioxidantes y antocianinas.',
    size: '1.5 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/20._BLUEBERRY_CANDY-1024x576.png'
  },
  {
    id: 'doc-21',
    slug: 'olive-soap-tourmaline-soap',
    title: '21. Olive Soap & Tourmaline Soap (Jabones Botánicos)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/21.-OLIVE-SOAP_TOURMALINE-SOAP.pdf',
    description: 'Guía de uso y propiedades de los jabones de turmalina negra y aceite de oliva virgen.',
    size: '2.0 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/21._OLIVE_SOAP_TOURMALINE_SOAP-1024x576.png'
  },
  {
    id: 'doc-22',
    slug: 'lactiberry-bebida-probiotica',
    title: '22. Lactiberry - Bebida Probiótica con Arándanos',
    category: 'nutricion',
    categoryLabel: 'Nutrición y Suplementos',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/22.-LACTIBERRY.pdf',
    description: 'Suero de leche enriquecido con probióticos, trozos de arándano y té negro.',
    size: '2.2 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/22._LACTIBERRY-1024x576.png'
  },
  {
    id: 'doc-34',
    slug: 'serie-smilife-blueberry',
    title: '34. Serie Smilife Blueberry (Cosmética Avanzada)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/34.-SERIE-SMILIFE-BLUEBERRY.pdf',
    description: 'Línea completa de sueros, tónicos, limpiadores y cremas con extracto de arándano y péptidos.',
    size: '4.8 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/34._SERIE_SMILIFE_BLUEBERRY-1024x576.png'
  },
  {
    id: 'doc-39',
    slug: 'accesorios-de-turmalina',
    title: '39. Accesorios de Turmalina (Fajas y Protectores Terapéuticos)',
    category: 'turmalina',
    categoryLabel: 'Turmalina y Bienestar',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/39.-Accesorio-de-Turmalina.pdf',
    description: 'Protectores de cintura, rodillas y cuello autocalentables con nanoturmalina e imanes.',
    size: '3.1 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/39._Accesorio_de_Turmalina-1024x576.png'
  },
  {
    id: 'doc-42',
    slug: 'berry-juice-concentrado-frutas',
    title: '42. Berry Juice - Concentrado de Frutas Silvestres',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/42.-BERRY-JUICE.pdf',
    description: 'Bebida funcional líquida con 11 superfrutas y antioxidantes esenciales.',
    size: '2.3 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/42._BERRY_JUICE-1024x577.png'
  },
  {
    id: 'doc-44',
    slug: 'smilife-keratin-shampoo',
    title: '44. Smilife Keratin Shampoo',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/44.-SMILIFE-KERATIN-SHAMPOO.pdf',
    description: 'Champú capilar con queratina hidrolizada y extractos herbales para la raíz y fibra capilar.',
    size: '1.7 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/44._SMILIFE_KERATIN_SHAMPOO-1024x576.png'
  },
  {
    id: 'doc-45',
    slug: 'smilife-tourmaline-shower-gel',
    title: '45. Smilife Tourmaline Shower Gel',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/45.-SMILIFE-TOURMALINE-SHOWER-GEL.pdf',
    description: 'Gel de ducha energizante con microextracto de turmalina.',
    size: '1.6 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/45._SMILIFE_TOURMALINE_SHOWER_GEL-1024x576.png'
  },
  {
    id: 'doc-47',
    slug: 'blueberry-wine-bebida-enologica',
    title: '47. Blueberry Wine (Bebida Enológica Funcional)',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/47.-BLUEBERRY-WINE.pdf',
    description: 'Elaborado mediante fermentación natural de arándanos silvestres.',
    size: '2.9 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/47._BLUEBERRY_WINE-1024x576.png'
  },
  {
    id: 'doc-70',
    slug: 'protectores-e-higiene-intima-turmalina',
    title: '70. Protectores e Higiene Íntima con Turmalina',
    category: 'turmalina',
    categoryLabel: 'Turmalina y Bienestar',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/70.-PROTECTORES-TURMALINA.pdf',
    description: 'Toallas sanitarias y protectores diarios con banda aniónica de turmalina.',
    size: '2.5 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/70._PROTECTORES_TURMALINA-1024x576.png'
  },
  {
    id: 'doc-76',
    slug: 'ashwagandha-coffee-cafe-adaptogeno',
    title: '76. Ashwagandha Coffee - Café Adaptógeno',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/76.-Ashwagandha-Coffee.pdf',
    description: 'Café gourmet con raíz de Ashwagandha para el manejo del estrés y la vitalidad.',
    size: '2.0 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/76._Ashwagandha_Coffee-1024x576.png'
  },
  {
    id: 'doc-77',
    slug: 'trebol-coffee-hgw',
    title: '77. Trébol Coffee HGW',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/77.-TREBOL-COFFEE.pdf',
    description: 'Fórmula exclusiva de café funcional con extractos botánicos.',
    size: '1.8 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/77._TREBOL_COFFEE-1024x576.png'
  },
  {
    id: 'doc-92',
    slug: 'mundo-de-la-manicura-press-on-nails',
    title: '92. Mundo de la Manicura (Press On Nails HGW)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/92.-Mundo-de-la-manicura.pdf',
    description: 'Catálogo de uñas acrílicas reutilizables y accesorios de belleza.',
    size: '3.4 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/92._Mundo_de_la_manicura-1024x576.png'
  },
  {
    id: 'doc-100',
    slug: 'pasta-dental-de-turmalina',
    title: '100. Pasta Dental de Turmalina (Blanca y Negra)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/100.-Pasta-dental-de-turmalina.pdf',
    description: 'Guía de higiene bucal con micropartículas de turmalina y xilitol.',
    size: '2.1 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/100._Pasta_dental_de_turmalina-1024x576.png'
  },
  {
    id: 'doc-112',
    slug: 'hgw-probiotics-toothpaste',
    title: '112. HGW Probiotics Toothpaste (Pasta con Probióticos)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/112.-HGW-PROBIOTICS-TOOTHPASTE.pdf',
    description: 'Pasta dental con lisados de Lactobacillus para la microbiota oral.',
    size: '2.2 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/112._HGW_PROBIOTICS_TOOTHPASTE-1024x576.png'
  },
  {
    id: 'doc-115',
    slug: 'jabon-de-artemisa-hgw',
    title: '115. Jabón de Artemisa HGW',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/115.-JABON-DE-ARTEMISA-1.pdf',
    description: 'Propiedades calmantes y purificantes del extracto de Artemisia argyi.',
    size: '1.6 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/115._JABON_DE_ARTEMISA_1-1024x576.png'
  },
  {
    id: 'doc-116',
    slug: 'almohada-magnetica-de-turmalina',
    title: '116. Almohada Magnética de Turmalina',
    category: 'turmalina',
    categoryLabel: 'Turmalina y Bienestar',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/116.-Almohada-de-Turmalina.pdf',
    description: 'Guía de descanso cervical y ergonomía con imanes y turmalina.',
    size: '2.8 MB',
    coverImageUrl: 'https://media.academiahgw.online/wp-content/uploads/2026/11/116._Almohada_de_Turmalina-1024x576.png'
  }

];

