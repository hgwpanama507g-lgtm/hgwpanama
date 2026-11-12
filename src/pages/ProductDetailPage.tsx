import React from 'react';
import { PRODUCTS } from '../data/products';
import { Link } from '../router';
import { ArrowLeft, AlertTriangle, Check, Sparkles } from 'lucide-react';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <Link to="/catalogo" className="text-[#00795F] font-bold">Volver al catálogo</Link>
      </div>
    );
  }

  const [activeTab, setActiveTab] = React.useState<'description' | 'details' | 'usage'>('description');
  const whatsappUrl = getAffiliationWhatsAppUrl(product.name);

  return (
    <div className="py-6 sm:py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* WooCommerce Style Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#00795F] transition-colors font-bold">Inicio</Link>
          <span className="text-stone-300">/</span>
          <Link to="/productos" className="hover:text-[#00795F] transition-colors font-bold">{product.categoryLabel}</Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-black truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-6">
            <div className="bg-stone-50 rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-xs aspect-square flex items-center justify-center p-8 sm:p-12 group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-md" 
              />
            </div>
          </div>

          {/* Right Column: Product Summary */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-2">
              <span className="text-xs font-black text-[#00795F] uppercase tracking-[0.2em]">{product.categoryLabel}</span>
            </div>
            <h1 className="text-[35px] font-black text-black mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6 border-b border-stone-100 pb-6">
              <p className="text-3xl font-black text-[#00795F] tabular-nums">
                {product.priceFormatted}
              </p>
              {product.inStock ? (
                <span className="px-3 py-1 bg-emerald-100 text-[#00795F] text-[11px] font-black rounded-full uppercase tracking-wider">
                  En Stock
                </span>
              ) : (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[11px] font-black rounded-full uppercase tracking-wider">
                  Consultar Disponibilidad
                </span>
              )}
            </div>

            <p className="text-stone-700 text-[18px] leading-relaxed mb-8 font-medium">
              {product.shortDescription}
            </p>

            <div className="space-y-4 mb-10">
              {product.presentation && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-stone-400 uppercase w-28 shrink-0">Presentación:</span>
                  <span className="text-stone-800 font-bold text-[17px]">{product.presentation}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-stone-400 uppercase w-28 shrink-0">Categoría:</span>
                <Link to="/productos" className="text-[#00795F] font-black hover:underline text-[17px]">{product.categoryLabel}</Link>
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-8 border-t border-stone-100 mt-auto">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 mb-8 rounded-r-2xl shadow-sm">
                <div className="flex items-center text-amber-900 font-black mb-1 text-[17px]">
                  <AlertTriangle className="mr-2 w-5 h-5 shrink-0" /> Aviso de Pedido
                </div>
                <p className="text-[17px] text-amber-800 leading-relaxed font-medium">
                  Por favor, consulte y confirme la disponibilidad del producto vía WhatsApp antes de realizar su pedido oficial.
                </p>
              </div>

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-5 px-8 bg-[#00795F] hover:bg-[#004d3c] text-white font-black text-xl rounded-2xl shadow-xl shadow-[#00795F]/20 flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-wider"
              >
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* WooCommerce Style Tabs Section */}
        <div className="border-t border-stone-200 pt-12">
          <div className="flex flex-wrap gap-8 border-b border-stone-200 mb-10">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${
                activeTab === 'description' ? 'text-black border-b-2 border-[#00795F]' : 'text-stone-400 hover:text-black'
              }`}
            >
              Descripción
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${
                activeTab === 'details' ? 'text-black border-b-2 border-[#00795F]' : 'text-stone-400 hover:text-black'
              }`}
            >
              Ingredientes
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${
                activeTab === 'usage' ? 'text-black border-b-2 border-[#00795F]' : 'text-stone-400 hover:text-black'
              }`}
            >
              Modo de Uso
            </button>
          </div>

          <div className="max-w-4xl min-h-[300px]">
            {activeTab === 'description' && (
              <div className="animate-fade-in space-y-8">
                <div>
                  <h2 className="text-[30px] font-black text-black mb-6">Beneficios Principales</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 bg-stone-50 rounded-2xl border border-stone-100 hover:border-[#00A550]/30 transition-colors">
                        <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-[#00A550]" />
                        </div>
                        <p className="text-[17px] text-stone-800 leading-relaxed font-bold">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="animate-fade-in space-y-10">
                <div>
                  <h2 className="text-[30px] font-black text-black mb-6">Ficha de Ingredientes</h2>
                  <div className="flex flex-wrap gap-3">
                    {product.ingredients?.map((ing, i) => (
                      <div key={i} className="px-6 py-4 bg-emerald-50 text-[#00795F] font-black text-base rounded-2xl border border-emerald-100 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-[#00A550]" />
                        {ing}
                      </div>
                    )) || <p className="text-stone-500 italic">Información técnica disponible en el catálogo PDF.</p>}
                  </div>
                </div>
                {product.precautions && (
                  <div className="pt-6 border-t border-stone-100">
                    <h3 className="text-[22px] font-black text-black mb-4">Precauciones</h3>
                    <p className="text-[17px] text-stone-600 leading-relaxed italic bg-stone-50 p-6 rounded-3xl border border-dashed border-stone-200">
                      {product.precautions}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-[30px] font-black text-black mb-6">¿Cómo utilizar este producto?</h2>
                <div className="bg-[#00795F] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-700">
                    <Check className="w-64 h-64" />
                  </div>
                  <p className="text-[20px] leading-relaxed font-black relative z-10">
                    {product.usage || "Consulte la ficha técnica oficial para instrucciones detalladas o contacte a un distribuidor autorizado."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technical PDF Link */}
        <div className="mt-24 p-10 sm:p-16 bg-stone-900 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00795F]/20 to-transparent pointer-events-none" />
          <div className="text-center md:text-left relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3 text-white tracking-tight">Ficha Técnica Completa</h2>
            <p className="text-stone-400 text-[18px] font-medium">Acceda a la biblioteca técnica oficial para descargar el PDF detallado.</p>
          </div>
          <Link 
            to="/documentos" 
            className="px-12 py-5 bg-[#00795F] hover:bg-[#00A550] text-white font-black text-lg rounded-2xl shadow-lg transition-all active:scale-95 whitespace-nowrap relative z-10"
          >
            IR A DOCUMENTOS PDF
          </Link>
        </div>

      </div>
    </div>
  );
};
