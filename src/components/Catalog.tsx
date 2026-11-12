import React, { useState, useMemo } from 'react';
import { Search, Eye, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';
import { Link } from '../router';

interface CatalogProps {
  isHomeView?: boolean;
}

export const Catalog: React.FC<CatalogProps> = ({ isHomeView = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'in-stock' | 'coming-soon'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'cafes-bebidas', label: 'Cafés y Bebidas' },
    { id: 'candies-snacks', label: 'Candies y Snacks' },
    { id: 'cuidado-bucal', label: 'Cuidado Bucal' },
    { id: 'turmalina', label: 'Turmalina y Bienestar' },
    { id: 'nutricion', label: 'Nutrición y Colágeno' },
    { id: 'cuidado-personal', label: 'Cuidado Personal' },
    { id: 'hogar-accesorios', label: 'Hogar y Accesorios' },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Availability filter
      if (availabilityFilter === 'in-stock' && (item.isComingSoon || !item.inStock)) {
        return false;
      }
      if (availabilityFilter === 'coming-soon' && !item.isComingSoon) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients?.some(i => i.toLowerCase().includes(query));
        const matchesBenefits = item.benefits.some(b => b.toLowerCase().includes(query));

        if (!matchesName && !matchesDesc && !matchesIngredients && !matchesBenefits) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [searchQuery, selectedCategory, availabilityFilter, sortBy]);

  const displayedProducts = isHomeView ? filteredProducts.slice(0, 8) : filteredProducts;

  return (
    <section id="catalogo" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00795F] uppercase tracking-wider mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A550]" />
              <span>Línea Original de Bienestar</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>HGW Panamá</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
              {isHomeView ? 'Productos Destacados' : 'Catálogo de Productos Oficiales'}
            </h2>
            <p className="text-base text-stone-700 mt-2 max-w-2xl font-normal leading-relaxed">
              Explora nuestras fórmulas botánicas, cafés funcionales de arándano y ganoderma, tecnología de nanoturmalina y suplementos con precios oficiales en Panamá. Cada producto cuenta con su ficha técnica completa.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="text-sm text-stone-700 font-semibold shrink-0">
            Mostrando <span className="text-black font-extrabold tabular-nums">{displayedProducts.length}</span> de <span className="text-black font-extrabold tabular-nums">{PRODUCTS.length}</span> productos
          </div>
        </div>

        {/* Controls: Search Bar & Segmented Filters */}
        <div className="bg-stone-50 p-4 sm:p-6 rounded-3xl border border-stone-200 mb-8 space-y-4 shadow-2xs">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="md:col-span-7 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre o ingrediente (arándano, turmalina, ganoderma...)"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500 hover:text-black"
                  >
                    Limpiar
                  </button>
                )}
              </div>
              <button className="px-6 py-3 bg-[#00795F] hover:bg-[#004d3c] text-white font-black text-sm rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap uppercase">
                BUSCAR
              </button>
            </div>

            {/* Availability Filter Buttons */}
            <div className="md:col-span-5 flex items-center justify-between sm:justify-end gap-1.5 p-1 bg-stone-200/80 rounded-xl">
              <button
                onClick={() => setAvailabilityFilter('all')}
                className={`flex-1 sm:flex-none px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
                  availabilityFilter === 'all'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-stone-700 hover:text-black'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setAvailabilityFilter('in-stock')}
                className={`flex-1 sm:flex-none px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
                  availabilityFilter === 'in-stock'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-stone-700 hover:text-black'
                }`}
              >
                Disponibles
              </button>
              <button
                onClick={() => setAvailabilityFilter('coming-soon')}
                className={`flex-1 sm:flex-none px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
                  availabilityFilter === 'coming-soon'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-stone-700 hover:text-black'
                }`}
              >
                Próximamente
              </button>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-stone-200">
            {categories.map((cat) => {
              const count = PRODUCTS.filter(p => cat.id === 'all' || p.category === cat.id).length;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#00795F] text-white shadow-xs'
                      : 'bg-white text-stone-800 hover:text-black border border-stone-300 hover:border-stone-400'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-1.5 text-xs tabular-nums ${isActive ? 'text-emerald-200 font-extrabold' : 'text-stone-500'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-stone-50 rounded-3xl border border-dashed border-stone-300">
            <Filter className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-extrabold text-black">No se encontraron productos</h3>
            <p className="text-sm text-stone-600 mt-1 max-w-sm mx-auto">
              No hay productos que coincidan con &ldquo;{searchQuery}&rdquo; en la categoría seleccionada.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setAvailabilityFilter('all');
              }}
              className="mt-4 px-5 py-2.5 text-xs font-bold text-[#00795F] bg-white border border-[#00795F]/40 rounded-xl hover:bg-stone-50 transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {displayedProducts.map((product) => {
              const productUrl = `/producto/${product.slug}`;
              const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://hgwpanama.com/productos';
              const whatsappOrderText = encodeURIComponent(
                `¡Hola! Estaba visitando tu tienda online (${currentUrl}) y quería consultar o adquirir el producto "${product.name}" (${product.priceFormatted}). Mi nombre es:`
              );
              const whatsappLink = `https://wa.me/50767788375?text=${whatsappOrderText}`;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-stone-200 hover:border-[#00795F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative isolate"
                >
                  {/* Top image container linking directly to product page with subtle zoom on hover */}
                  <Link
                    to={productUrl}
                    className="relative aspect-square w-full bg-stone-50 p-3 sm:p-6 flex items-center justify-center overflow-hidden border-b border-stone-100 block isolate"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain transform group-hover:scale-108 transition-transform duration-300 ease-out drop-shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp";
                      }}
                    />

                    {/* Status Badge in corner */}
                    {product.isComingSoon ? (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500 text-white text-[9px] sm:text-[11px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md sm:rounded-lg shadow-xs">
                        Próximamente
                      </span>
                    ) : product.featured ? (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#00795F] text-white text-[9px] sm:text-[11px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md sm:rounded-lg flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00A550]" />
                        <span className="hidden xs:inline">Destacado</span>
                      </span>
                    ) : null}

                    {/* Quick view icon badge */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/95 text-stone-800 group-hover:text-[#00795F] rounded-lg sm:rounded-xl shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category label */}
                      <div className="text-[10px] sm:text-xs font-bold text-[#00795F] uppercase tracking-wider mb-1 line-clamp-1">
                        {product.categoryLabel}
                      </div>

                      {/* Product Title linking to /producto/:slug */}
                      <h3 className="text-xs sm:text-base font-extrabold text-black group-hover:text-[#00795F] transition-colors leading-snug line-clamp-2 sm:line-clamp-1">
                        <Link to={productUrl} title={product.name}>
                          {product.name}
                        </Link>
                      </h3>

                      {/* Short Description */}
                      <p className="text-[17px] text-stone-700 mt-1 sm:mt-2 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {product.presentation && (
                        <div className="text-[10px] sm:text-xs text-stone-500 mt-1.5 font-medium truncate">
                          {product.presentation}
                        </div>
                      )}
                    </div>

                    {/* Price and Action Bar */}
                    <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3.5 border-t border-stone-100">
                      <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                        <span className="text-[10px] sm:text-xs text-stone-500 font-semibold">Precio</span>
                        <span className="text-sm sm:text-xl font-black text-black tabular-nums">
                          {product.priceFormatted}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                        {/* Ver Ficha (Navigates to friendly URL page) */}
                        <Link
                          to={productUrl}
                          className="w-full py-1.5 sm:py-2.5 px-2 sm:px-3 text-[11px] sm:text-xs font-bold text-white bg-[#00795F] hover:bg-[#004d3c] rounded-lg sm:rounded-xl transition-all hover:shadow-xs active:scale-95 flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Ver Ficha y Consultar</span>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* If in Home view, add button to go to full /productos */}
        {isHomeView && (
          <div className="mt-12 text-center">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 hover:bg-black text-white text-sm font-extrabold rounded-2xl shadow-md transition-all active:scale-95"
            >
              <span>Ver Catálogo Completo ({PRODUCTS.length} Productos)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

