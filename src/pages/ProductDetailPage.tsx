import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Phone, Check, AlertCircle, Package, Sparkles, ChevronRight, Share2 } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';
import { Link, useRouter } from '../router';

interface ProductDetailPageProps {
  slug: string;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onAddToCart }) => {
  const { navigate } = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-extrabold text-black mb-3">Producto no encontrado</h1>
        <p className="text-base text-stone-700 mb-6">
          El producto solicitado no está disponible o la URL ha cambiado.
        </p>
        <Link
          to="/productos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00795F] text-white font-bold text-sm rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo de Productos</span>
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const whatsappOrderText = encodeURIComponent(
    `Hola HGW Panamá, deseo comprar ${quantity} unidad(es) de "${product.name}" (Total: $${(product.price * quantity).toFixed(2)} USD). ¿Cómo coordinamos la entrega en Panamá?`
  );
  const whatsappUrl = `https://wa.me/50767788375?text=${whatsappOrderText}`;

  // Related products from same category
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/inicio" className="hover:text-[#00795F] transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
          <Link to="/productos" className="hover:text-[#00795F] transition-colors">
            Productos
          </Link>
          <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
          <span className="text-[#00795F]">{product.categoryLabel}</span>
          <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
          <span className="text-black font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Big Product Photography */}
          <div className="lg:col-span-6 bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200/90 flex flex-col items-center justify-center sticky top-28">
            <div className="relative w-full aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp";
                }}
              />
            </div>

            {/* Presentation Chip */}
            {product.presentation && (
              <div className="mt-6 px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-bold text-black flex items-center gap-2 shadow-xs">
                <Package className="w-4 h-4 text-[#00795F]" />
                <span>Presentación: {product.presentation}</span>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Product Purchase & Health Specs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-bold text-[#00795F] uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <span className="text-stone-300">·</span>
                {product.isComingSoon ? (
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Próximo Lanzamiento
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-[#00795F] text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Disponible en Panamá
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-black tabular-nums">
                  {product.priceFormatted}
                </span>
                <span className="text-sm text-stone-500 font-semibold">USD (Dólares en Panamá)</span>
              </div>

              {/* Short summary */}
              <p className="mt-4 text-base sm:text-lg text-stone-800 leading-relaxed font-normal">
                {product.shortDescription}
              </p>
            </div>

            {/* Purchase Action Box */}
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/90 space-y-4">
              {!product.isComingSoon ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white p-1 self-start sm:self-auto">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-stone-800 hover:text-black font-extrabold text-base rounded-lg hover:bg-stone-100 transition-colors"
                      aria-label="Menos cantidad"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-black text-base text-black tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-stone-800 hover:text-black font-extrabold text-base rounded-lg hover:bg-stone-100 transition-colors"
                      aria-label="Más cantidad"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3.5 px-6 bg-[#00795F] hover:bg-[#004d3c] text-white text-sm sm:text-base font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Agregar al Pedido (${(product.price * quantity).toFixed(2)})</span>
                  </button>
                </div>
              ) : null}

              {addedToast && (
                <div className="text-center py-2 px-4 bg-emerald-100 text-[#00795F] text-sm font-bold rounded-xl flex items-center justify-center gap-2 animate-fade-in">
                  <Check className="w-4 h-4" />
                  <span>¡Producto agregado con éxito a tu pedido!</span>
                </div>
              )}

              {/* Direct WhatsApp Ordering */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-[#00A550] hover:bg-[#008f44] text-white text-sm sm:text-base font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 text-center"
              >
                <Phone className="w-5 h-5" />
                <span>Pedir directo por WhatsApp (+507 6778-8375)</span>
              </a>

              <p className="text-xs text-stone-500 text-center">
                Entregas rápidas en Ciudad de Panamá, Panamá Oeste y envíos al interior del país.
              </p>
            </div>

            {/* Benefits section */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="pt-2">
                <h2 className="text-base sm:text-lg font-bold text-black uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00A550]" />
                  <span>Beneficios Principales</span>
                </h2>
                <ul className="space-y-2.5 text-sm sm:text-base text-stone-800">
                  {product.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#00A550] shrink-0 mt-2" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-2">
                  Ingredientes y Componentes
                </h3>
                <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
                  {product.ingredients.join(', ')}.
                </p>
              </div>
            )}

            {/* Usage */}
            {product.usage && (
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-2">
                  Modo de Uso y Preparación
                </h3>
                <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
                  {product.usage}
                </p>
              </div>
            )}

            {/* Precautions */}
            {product.precautions && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-950 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Precauciones y Almacenamiento: </span>
                  <span>{product.precautions}</span>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Related Products strip */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl sm:text-2xl font-extrabold text-black">
                Otros productos en {product.categoryLabel}
              </h3>
              <Link
                to="/productos"
                className="text-xs sm:text-sm font-bold text-[#00795F] hover:underline"
              >
                Ver todos los productos →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/producto/${item.slug}`}
                  className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 hover:border-[#00795F] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="aspect-square w-full bg-white rounded-xl p-4 flex items-center justify-center mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black group-hover:text-[#00795F] transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{item.shortDescription}</p>
                    <p className="text-base font-extrabold text-black mt-2 tabular-nums">
                      {item.priceFormatted}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
