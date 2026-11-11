export interface DocumentItem {
  id: string;
  title: string;
  category: 'cafes-bebidas' | 'nutricion' | 'cuidado-personal' | 'turmalina' | 'planes';
  categoryLabel: string;
  url: string;
  description: string;
  size: string;
}

export const HGW_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-12',
    title: '12. Cordyceps HGW - Ficha Técnica y Beneficios',
    category: 'nutricion',
    categoryLabel: 'Nutrición y Suplementos',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/12.-CORDYCEPS.pdf',
    description: 'Información oficial sobre el hongo Cordyceps militaris, propiedades adaptógenas y soporte inmunológico.',
    size: '2.4 MB'
  },
  {
    id: 'doc-13',
    title: '13. Espirulina HGW - Superalimento y Nutrición Celular',
    category: 'nutricion',
    categoryLabel: 'Nutrición y Suplementos',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/13.-ESPIRULINA.pdf',
    description: 'Detalle de la microalga espirulina combinada con ginseng, proteínas completas y clorofila.',
    size: '1.8 MB'
  },
  {
    id: 'doc-16',
    title: '16. HGW Serie Café Funcional (Ganoderma, Arándano y Cordyceps)',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/16.-HGW-SERIE-CAFE.pdf',
    description: 'Catálogo completo de la línea de cafés solubles enriquecidos con extractos herbales y hongo reishi.',
    size: '3.5 MB'
  },
  {
    id: 'doc-17',
    title: '17. HGW Blueberry Collagen Peptide (Colágeno con Arándano)',
    category: 'nutricion',
    categoryLabel: 'Nutrición y Suplementos',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/17.-HGW-Blueberry-Collagen-Peptide.pdf',
    description: 'Ficha técnica de péptidos y tripéptidos de colágeno marino con superfrutas.',
    size: '2.1 MB'
  },
  {
    id: 'doc-18',
    title: '18. HGW Blueberry Soybean Milk Drink',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/18.-HGW-Blueberry-Soybean-Milk-Drink.pdf',
    description: 'Bebida nutritiva a base de soya seleccionada y extracto de arándano silvestre.',
    size: '1.9 MB'
  },
  {
    id: 'doc-20',
    title: '20. Blueberry Candy (Candies Fitonutritivos)',
    category: 'nutricion',
    categoryLabel: 'Candies y Snacks',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/20.-BLUEBERRY-CANDY.pdf',
    description: 'Caramelos funcionales de arándano ricos en antioxidantes y antocianinas.',
    size: '1.5 MB'
  },
  {
    id: 'doc-21',
    title: '21. Olive Soap & Tourmaline Soap (Jabones Botánicos)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/21.-OLIVE-SOAP_TOURMALINE-SOAP.pdf',
    description: 'Guía de uso y propiedades de los jabones de turmalina negra y aceite de oliva virgen.',
    size: '2.0 MB'
  },
  {
    id: 'doc-22',
    title: '22. Lactiberry - Bebida Probiótica con Arándanos',
    category: 'nutricion',
    categoryLabel: 'Nutrición y Suplementos',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/22.-LACTIBERRY.pdf',
    description: 'Suero de leche enriquecido con probióticos, trozos de arándano y té negro.',
    size: '2.2 MB'
  },
  {
    id: 'doc-34',
    title: '34. Serie Smilife Blueberry (Cosmética Avanzada)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/34.-SERIE-SMILIFE-BLUEBERRY.pdf',
    description: 'Línea completa de sueros, tónicos, limpiadores y cremas con extracto de arándano y péptidos.',
    size: '4.8 MB'
  },
  {
    id: 'doc-39',
    title: '39. Accesorios de Turmalina (Fajas y Protectores Terapéuticos)',
    category: 'turmalina',
    categoryLabel: 'Turmalina y Bienestar',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/39.-Accesorio-de-Turmalina.pdf',
    description: 'Protectores de cintura, rodillas y cuello autocalentables con nanoturmalina e imanes.',
    size: '3.1 MB'
  },
  {
    id: 'doc-42',
    title: '42. Berry Juice - Concentrado de Frutas Silvestres',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/42.-BERRY-JUICE.pdf',
    description: 'Bebida funcional líquida con 11 superfrutas y antioxidantes esenciales.',
    size: '2.3 MB'
  },
  {
    id: 'doc-44',
    title: '44. Smilife Keratin Shampoo',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/44.-SMILIFE-KERATIN-SHAMPOO.pdf',
    description: 'Champú capilar con queratina hidrolizada y extractos herbales para la raíz y fibra capilar.',
    size: '1.7 MB'
  },
  {
    id: 'doc-45',
    title: '45. Smilife Tourmaline Shower Gel',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/45.-SMILIFE-TOURMALINE-SHOWER-GEL.pdf',
    description: 'Gel de ducha energizante con microextracto de turmalina.',
    size: '1.6 MB'
  },
  {
    id: 'doc-47',
    title: '47. Blueberry Wine (Bebida Enológica Funcional)',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/47.-BLUEBERRY-WINE.pdf',
    description: 'Elaborado mediante fermentación natural de arándanos silvestres.',
    size: '2.9 MB'
  },
  {
    id: 'doc-70',
    title: '70. Protectores e Higiene Íntima con Turmalina',
    category: 'turmalina',
    categoryLabel: 'Turmalina y Bienestar',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/70.-PROTECTORES-TURMALINA.pdf',
    description: 'Toallas sanitarias y protectores diarios con banda aniónica de turmalina.',
    size: '2.5 MB'
  },
  {
    id: 'doc-76',
    title: '76. Ashwagandha Coffee - Café Adaptógeno',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/76.-Ashwagandha-Coffee.pdf',
    description: 'Café gourmet con raíz de Ashwagandha para el manejo del estrés y la vitalidad.',
    size: '2.0 MB'
  },
  {
    id: 'doc-77',
    title: '77. Trébol Coffee HGW',
    category: 'cafes-bebidas',
    categoryLabel: 'Cafés y Bebidas',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/77.-TREBOL-COFFEE.pdf',
    description: 'Fórmula exclusiva de café funcional con extractos botánicos.',
    size: '1.8 MB'
  },
  {
    id: 'doc-92',
    title: '92. Mundo de la Manicura (Press On Nails HGW)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/92.-Mundo-de-la-manicura.pdf',
    description: 'Catálogo de uñas acrílicas reutilizables y accesorios de belleza.',
    size: '3.4 MB'
  },
  {
    id: 'doc-100',
    title: '100. Pasta Dental de Turmalina (Blanca y Negra)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/100.-Pasta-dental-de-turmalina.pdf',
    description: 'Guía de higiene bucal con micropartículas de turmalina y xilitol.',
    size: '2.1 MB'
  },
  {
    id: 'doc-112',
    title: '112. HGW Probiotics Toothpaste (Pasta con Probióticos)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/112.-HGW-PROBIOTICS-TOOTHPASTE.pdf',
    description: 'Pasta dental con lisados de Lactobacillus para la microbiota oral.',
    size: '2.2 MB'
  },
  {
    id: 'doc-115',
    title: '115. Jabón de Artemisa HGW',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/115.-JABON-DE-ARTEMISA-1.pdf',
    description: 'Propiedades calmantes y purificantes del extracto de Artemisia argyi.',
    size: '1.6 MB'
  },
  {
    id: 'doc-116',
    title: '116. Almohada Magnética de Turmalina',
    category: 'turmalina',
    categoryLabel: 'Turmalina y Bienestar',
    url: 'https://media.academiahgw.online/wp-content/uploads/2026/11/116.-Almohada-de-Turmalina.pdf',
    description: 'Guía de descanso cervical y ergonomía con imanes y turmalina.',
    size: '2.8 MB'
  }
];
