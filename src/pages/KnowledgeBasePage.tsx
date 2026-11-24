import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Tag,
  Calendar,
  ArrowRight,
  ExternalLink,
  Filter,
  Sparkles,
  FileText,
  CheckCircle2,
  Building2,
  TrendingUp,
  Coffee,
  ShieldCheck,
  Layers,
  Copy,
  Check,
  Share2,
  Printer,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Clock,
  Info,
  ChevronRight,
  HelpCircle,
  Play,
  Video,
  X,
  Phone,
  Package,
  ShoppingBag,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { knowledgeService, KnowledgeArticle } from '../services/knowledgeService';
import { productosService, FirestoreProduct } from '../services/productosService';
import { ScrollReveal } from '../components/ScrollReveal';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';
import { useRouter } from '../router';
import { AFFILIATION_CONFIG } from '../config/affiliation';

interface KnowledgeBasePageProps {
  articleIdentifier?: string;
  productIdentifier?: string;
}

export const KnowledgeBasePage: React.FC<KnowledgeBasePageProps> = ({ articleIdentifier, productIdentifier }) => {
  const { navigate, currentPath } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [typeFilter, setTypeFilter] = useState<'todo' | 'articulos' | 'productos'>('todo');
  
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todas']);
  
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<FirestoreProduct | null>(null);
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      knowledgeService.getAllArticles(false),
      productosService.getAllProducts(false)
    ]).then(([fetchedArticles, fetchedProducts]) => {
      if (!isMounted) return;
      setArticles(fetchedArticles);
      setProducts(fetchedProducts);

      const articleCats = fetchedArticles.map(a => a.category);
      const productCats = fetchedProducts.map(p => p.categoryLabel || p.categoria);
      const cats = Array.from(new Set([...articleCats, ...productCats]));
      setCategories(['Todas', ...cats]);

      if (articleIdentifier) {
        const found = fetchedArticles.find(
          art => (art.slug && art.slug.toLowerCase() === articleIdentifier.toLowerCase()) || art.id.toLowerCase() === articleIdentifier.toLowerCase()
        );
        setSelectedArticle(found || null);
        setSelectedProduct(null);
      } else if (productIdentifier) {
        const foundProd = fetchedProducts.find(
          p => (p.slug && p.slug.toLowerCase() === productIdentifier.toLowerCase()) || p.id.toLowerCase() === productIdentifier.toLowerCase()
        );
        setSelectedProduct(foundProd || null);
        setSelectedArticle(null);
      } else {
        setSelectedArticle(null);
        setSelectedProduct(null);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Error loading knowledge base & products:", err);
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [articleIdentifier, productIdentifier, currentPath]);

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case '¿Qué es HGW y Fundadores?':
      case 'membresias':
      case 'Membresías Oficiales':
        return {
          icon: Building2,
          color: 'text-blue-600',
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100/90 text-black font-bold',
          accent: '#2563EB',
        };
      case 'Afiliación y Tutoriales':
      case 'cafes-bebidas':
      case 'Cafés y Bebidas':
        return {
          icon: Coffee,
          color: 'text-amber-600',
          bg: 'bg-amber-50 border-amber-200',
          badge: 'bg-amber-100/90 text-black font-bold',
          accent: '#D97706',
        };
      case 'Plan de Negocio y Membresías':
      case 'candies-snacks':
      case 'Caramelos y Dulces':
        return {
          icon: TrendingUp,
          color: 'text-purple-600',
          bg: 'bg-purple-50 border-purple-200',
          badge: 'bg-purple-100/90 text-black font-bold',
          accent: '#9333EA',
        };
      case 'Productos y Salud Natural':
      case 'cuidado-bucal':
      case 'Cuidado Bucal':
      case 'turmalina':
      case 'Turmalina':
        return {
          icon: ShieldCheck,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50 border-emerald-200',
          badge: 'bg-emerald-100/90 text-black font-bold',
          accent: '#059669',
        };
      default:
        return {
          icon: Layers,
          color: 'text-[#4472C4]',
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100/90 text-black font-bold',
          accent: '#4472C4',
        };
    }
  };

  const filteredArticles = useMemo(() => {
    if (typeFilter === 'productos') return [];
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'Todas' || art.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        art.title.toLowerCase().includes(term) ||
        art.summary.toLowerCase().includes(term) ||
        art.content.toLowerCase().includes(term) ||
        art.tags.some((tag) => tag.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [articles, searchTerm, selectedCategory, typeFilter]);

  const filteredProducts = useMemo(() => {
    if (typeFilter === 'articulos') return [];
    return products.filter((prod) => {
      const matchesCategory =
        selectedCategory === 'Todas' || prod.categoryLabel === selectedCategory || prod.categoria === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesIngredients = prod.ficha?.ingredientes?.some(ing => ing.toLowerCase().includes(term));
      const matchesFaqs = prod.ficha?.preguntasFrecuentes?.some(faq => faq.pregunta.toLowerCase().includes(term) || faq.respuesta.toLowerCase().includes(term));
      const matchesSearch =
        !term ||
        prod.nombre.toLowerCase().includes(term) ||
        prod.descripcion.toLowerCase().includes(term) ||
        prod.tags.some((tag) => tag.toLowerCase().includes(term)) ||
        matchesIngredients ||
        matchesFaqs;
      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory, typeFilter]);

  const handleCopyLink = (url: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleShareWhatsApp = (title: string, summary: string, url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const text = `Te comparto esta guía de HGW Panamá:\n*${title}*\n${summary}\n\nLéela aquí: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const quickTags = [
    { label: 'Video Tutorial', icon: Video },
    { label: 'Dra. Deming Li', icon: Building2 },
    { label: 'Ganancia Mutua', icon: TrendingUp },
    { label: 'Membresía', icon: Package },
    { label: 'Ganoderma', icon: Coffee },
    { label: 'Arándano', icon: Sparkles },
    { label: 'Turmalina', icon: ShieldCheck },
    { label: 'Pasta Dental', icon: CheckCircle2 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#4472C4] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-black">Cargando base de conocimiento y productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 sm:py-14 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner Header */}
        {!selectedArticle && !selectedProduct && (
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4472C4]/10 text-black text-xs font-black uppercase tracking-wider mb-3.5 border border-[#4472C4]/20">
                  <BookOpen className="w-4 h-4 text-[#4472C4]" />
                  <span className="text-black">Base de Conocimiento & Fichas de Productos</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
                  Aprende Todo Sobre HGW
                </h1>

                <p className="text-sm sm:text-base text-black mt-3 leading-relaxed font-medium">
                  Explora guías oficiales, videotutoriales, fichas técnicas de productos, ingredientes y el plan de compensación de HGW Panamá.
                </p>

                {/* Metrics Bar */}
                <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-black">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs text-black">
                    <FileText className="w-3.5 h-3.5 text-[#4472C4]" />
                    <span className="text-black">{articles.length} Artículos</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs text-black">
                    <Package className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-black">{products.length} Fichas de Productos</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs text-black">
                    <Video className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-black">Videos Tutoriales</span>
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Independence Disclaimer Banner */}
        <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 mb-8 text-black text-xs leading-relaxed flex items-start gap-3 shadow-2xs">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-extrabold text-black block mb-0.5">Aviso de Independencia:</strong>
            {AFFILIATION_CONFIG.independenceDisclaimer}
          </div>
        </div>

        {/* 1. ARTICLE DETAIL VIEW */}
        {selectedArticle ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 mb-12 animate-fade-in text-black">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <button
                onClick={() => navigate('/base-de-conocimiento')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-[#EEF3FB] text-black hover:text-[#4472C4] font-black text-xs transition-colors cursor-pointer"
              >
                ← Volver a la base de conocimiento
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(`${window.location.origin}/base-de-conocimiento/${selectedArticle.slug}`, selectedArticle.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-black text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                >
                  {copiedId === selectedArticle.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-black font-bold">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-black" />
                      <span className="text-black">Copiar enlace</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleShareWhatsApp(selectedArticle.title, selectedArticle.summary, `${window.location.origin}/base-de-conocimiento/${selectedArticle.slug}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00A550]/15 hover:bg-[#00A550]/25 text-black text-xs font-bold border border-[#00A550]/30 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#00A550]" />
                  <span className="text-black font-bold">WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Badges */}
            {(() => {
              const cfg = getCategoryConfig(selectedArticle.category);
              const CatIcon = cfg.icon;
              return (
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-black mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${cfg.badge}`}>
                    <CatIcon className="w-3.5 h-3.5 text-black" />
                    <span className="text-black">{selectedArticle.category}</span>
                  </span>
                  {selectedArticle.readTime && (
                    <span className="inline-flex items-center gap-1 text-black font-medium">
                      <Clock className="w-3.5 h-3.5 text-black" />
                      Lectura: {selectedArticle.readTime}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-black font-medium">
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    Actualizado: {selectedArticle.updatedAt}
                  </span>
                  <span className="inline-flex items-center gap-1 text-black font-medium">
                    <FileText className="w-3.5 h-3.5 text-black" />
                    Fuente: {selectedArticle.source}
                  </span>
                </div>
              );
            })()}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-4">
              {selectedArticle.title}
            </h2>

            {selectedArticle.videoUrl && (
              <div className="mb-8 rounded-3xl overflow-hidden border border-slate-300 shadow-xl bg-black">
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">Video Tutorial Oficial</h4>
                      <p className="text-[11px] text-slate-300">Reproducción guiada paso a paso</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-white/10 rounded-lg font-bold text-white">YouTube HD</span>
                </div>
                <div className="aspect-video w-full bg-black relative">
                  <iframe
                    src={selectedArticle.videoUrl}
                    title={selectedArticle.title}
                    className="w-full h-full absolute inset-0 border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#EEF3FB] to-blue-50/40 border-l-4 border-[#4472C4] rounded-r-2xl mb-8 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#4472C4] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-black font-bold leading-relaxed">
                {selectedArticle.summary}
              </p>
            </div>

            <div className="max-w-none text-black text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-medium">
              {selectedArticle.content}
            </div>

            {/* Related Products Section in Article */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-sm sm:text-base text-black uppercase tracking-wider">
                  Productos Relacionados a esta Guía
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.slice(0, 3).map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => navigate(`/base-de-conocimiento/producto/${prod.slug}`)}
                    className="p-4 bg-slate-50 hover:bg-emerald-50/40 rounded-2xl border border-slate-200 hover:border-emerald-400 cursor-pointer transition-all flex items-center gap-4 group"
                  >
                    <img src={prod.imagenes[0]} alt={prod.nombre} className="w-16 h-16 object-contain rounded-xl bg-white p-1 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-emerald-700 block truncate">{prod.categoryLabel}</span>
                      <h4 className="font-extrabold text-xs text-black group-hover:text-emerald-700 transition-colors truncate">{prod.nombre}</h4>
                      <p className="text-xs font-black text-[#4472C4] mt-1">${prod.precio.toFixed(2)} USD</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-black mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-black" /> Temas:
              </span>
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => {
                    navigate('/base-de-conocimiento');
                    setSearchTerm(tag);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-[#EEF3FB] text-black rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : selectedProduct ? (
          /* 2. PRODUCT KNOWLEDGE FICHE DETAIL VIEW */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 mb-12 animate-fade-in text-black">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <button
                onClick={() => navigate('/base-de-conocimiento')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-[#EEF3FB] text-black hover:text-[#4472C4] font-black text-xs transition-colors cursor-pointer"
              >
                ← Volver a la base de conocimiento
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(`${window.location.origin}/base-de-conocimiento/producto/${selectedProduct.slug}`, selectedProduct.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-black text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                >
                  {copiedId === selectedProduct.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-black font-bold">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-black" />
                      <span className="text-black">Copiar enlace</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleShareWhatsApp(selectedProduct.nombre, selectedProduct.descripcion, `${window.location.origin}/base-de-conocimiento/producto/${selectedProduct.slug}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00A550]/15 hover:bg-[#00A550]/25 text-black text-xs font-bold border border-[#00A550]/30 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#00A550]" />
                  <span className="text-black font-bold">WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Product Header & Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
              <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col items-center justify-center">
                <div className="aspect-square w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={selectedProduct.imagenes[0]}
                    alt={selectedProduct.nombre}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp';
                    }}
                  />
                </div>
                {selectedProduct.imagenes.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2">
                    {selectedProduct.imagenes.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-14 h-14 object-contain rounded-xl bg-white border border-slate-200 p-1 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
                    Ficha de Producto · {selectedProduct.categoryLabel}
                  </span>
                  {selectedProduct.estado === 'agotado' ? (
                    <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase">
                      Agotado
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black uppercase">
                      Disponible
                    </span>
                  )}
                  {selectedProduct.code && (
                    <span className="text-xs font-bold text-slate-500">Cód. {selectedProduct.code}</span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black">
                  {selectedProduct.nombre}
                </h1>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[#4472C4]">
                    ${selectedProduct.precio.toFixed(2)} <span className="text-sm font-bold text-black">USD</span>
                  </span>
                  {selectedProduct.bv && (
                    <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-black">
                      {selectedProduct.bv.toFixed(2)} BV
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base text-black font-medium leading-relaxed">
                  {selectedProduct.descripcion}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={selectedProduct.enlaceCompra || AFFILIATION_CONFIG.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all ${
                      selectedProduct.estado === 'agotado'
                        ? 'bg-slate-300 text-slate-600 cursor-not-allowed pointer-events-none'
                        : 'bg-[#4472C4] hover:bg-[#33599E] text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{selectedProduct.estado === 'agotado' ? 'Producto Agotado' : 'Comprar en Tienda Oficial'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Hola, me interesa el producto *${selectedProduct.nombre}* (${selectedProduct.precio.toFixed(2)} USD) visto en la base de conocimiento de HGW Panamá.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl bg-[#00A550] hover:bg-[#008f44] text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar por WhatsApp</span>
                  </a>

                  <button
                    onClick={() => navigate(`/producto/${selectedProduct.slug}`)}
                    className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-black font-black text-xs sm:text-sm flex items-center gap-2 transition-all"
                  >
                    <span>Ver en Tienda</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Fiche Sections (Ingredients, Usage, Presentation, Precautions, FAQs) */}
            <div className="space-y-6 pt-6 border-t border-slate-200">
              {selectedProduct.ficha?.descripcionDetallada && (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
                  <h3 className="font-black text-sm text-black uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#4472C4]" /> Descripción Detallada
                  </h3>
                  <p className="text-sm text-black font-medium leading-relaxed whitespace-pre-line">
                    {selectedProduct.ficha.descripcionDetallada}
                  </p>
                </div>
              )}

              {selectedProduct.ficha?.ingredientes && selectedProduct.ficha.ingredientes.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                  <h3 className="font-black text-sm text-black uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Ingredientes y Componentes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.ficha.ingredientes.map((ing, i) => (
                      <div key={i} className="bg-white p-3 rounded-2xl border border-slate-200 text-xs font-bold text-black flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#4472C4]"></span>
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.ficha?.modoDeUso && (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
                  <h3 className="font-black text-sm text-black uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Modo de Uso
                  </h3>
                  <p className="text-sm text-black font-medium leading-relaxed">
                    {selectedProduct.ficha.modoDeUso}
                  </p>
                </div>
              )}

              {selectedProduct.ficha?.presentacion && (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
                  <h3 className="font-black text-sm text-black uppercase tracking-wider flex items-center gap-2">
                    <Package className="w-4 h-4 text-purple-600" /> Presentación y Contenido
                  </h3>
                  <p className="text-sm text-black font-medium leading-relaxed">
                    {selectedProduct.ficha.presentacion}
                  </p>
                </div>
              )}

              {selectedProduct.ficha?.advertencias && selectedProduct.ficha.advertencias.length > 0 && (
                <div className="bg-amber-50 p-6 rounded-3xl border border-amber-300 space-y-2">
                  <h3 className="font-black text-sm text-amber-900 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700" /> Advertencias y Precauciones
                  </h3>
                  <ul className="space-y-1 text-xs text-black font-medium">
                    {selectedProduct.ficha.advertencias.map((adv, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs */}
              {selectedProduct.ficha?.preguntasFrecuentes && selectedProduct.ficha.preguntasFrecuentes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-black text-sm text-black uppercase tracking-wider flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#4472C4]" /> Preguntas Frecuentes del Producto
                  </h3>
                  <div className="space-y-3">
                    {selectedProduct.ficha.preguntasFrecuentes.map((faq, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                        <h4 className="font-extrabold text-xs text-black">{faq.pregunta}</h4>
                        <p className="text-xs text-black font-medium">{faq.respuesta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Products */}
              {selectedProduct.relacionados?.productosRelacionados && selectedProduct.relacionados.productosRelacionados.length > 0 && (
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="font-black text-sm text-black uppercase tracking-wider mb-4">Productos Relacionados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {products
                      .filter(p => selectedProduct.relacionados?.productosRelacionados?.includes(p.id))
                      .map(p => (
                        <div
                          key={p.id}
                          onClick={() => navigate(`/base-de-conocimiento/producto/${p.slug}`)}
                          className="p-4 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200 cursor-pointer flex items-center gap-3"
                        >
                          <img src={p.imagenes[0]} alt={p.nombre} className="w-12 h-12 object-contain bg-white p-1 rounded-xl" />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-xs text-black truncate">{p.nombre}</h4>
                            <p className="text-xs font-black text-[#4472C4]">${p.precio.toFixed(2)} USD</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 3. MAIN KNOWLEDGE BASE BROWSING VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden col-span-1 flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#4472C4]" />
                <span className="text-xs font-bold text-black">
                  Filtros y Categorías
                </span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="px-3 py-1.5 bg-[#4472C4] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                {mobileFilterOpen ? 'Ocultar Filtros' : 'Mostrar Filtros'}
              </button>
            </div>

            {/* LEFT SIDEBAR */}
            <aside
              className={`lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-24 ${
                mobileFilterOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              {/* Search Widget */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-xs text-black uppercase tracking-wider">
                  <Search className="w-4 h-4 text-[#4472C4]" />
                  <span className="text-black">Buscador Unificado</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar artículo, producto, ingrediente..."
                    className="w-full pl-9 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-black font-medium placeholder:text-neutral-500 focus:outline-none focus:border-[#4472C4]"
                  />
                  <Search className="w-4 h-4 text-black absolute left-3 top-3" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2.5 top-2.5 text-black hover:text-[#4472C4] p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Type Filter Selector (Todo, Artículos, Productos) */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="font-extrabold text-xs text-black uppercase tracking-wider">
                  Tipo de Contenido
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTypeFilter('todo')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center ${
                      typeFilter === 'todo' ? 'bg-[#4472C4] text-white' : 'bg-slate-100 hover:bg-slate-200 text-black'
                    }`}
                  >
                    Todo
                  </button>
                  <button
                    onClick={() => setTypeFilter('articulos')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center ${
                      typeFilter === 'articulos' ? 'bg-[#4472C4] text-white' : 'bg-slate-100 hover:bg-slate-200 text-black'
                    }`}
                  >
                    Artículos
                  </button>
                  <button
                    onClick={() => setTypeFilter('productos')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center ${
                      typeFilter === 'productos' ? 'bg-[#4472C4] text-white' : 'bg-slate-100 hover:bg-slate-200 text-black'
                    }`}
                  >
                    Productos
                  </button>
                </div>
              </div>

              {/* Category Filter Vertical List */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-extrabold text-xs text-black uppercase tracking-wider">
                    <Filter className="w-4 h-4 text-[#4472C4]" />
                    <span className="text-black">Categorías</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'bg-[#4472C4] text-white shadow-md'
                            : 'bg-slate-50 hover:bg-slate-100 text-black'
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Tags */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-xs text-black uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-black">Temas Populares</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickTags.map((tag) => {
                    const Icon = tag.icon;
                    return (
                      <button
                        key={tag.label}
                        onClick={() => {
                          setSearchTerm(tag.label);
                          setMobileFilterOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-[#EEF3FB] border border-slate-200 text-black rounded-xl text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        <Icon className="w-3 h-3 text-[#4472C4]" />
                        <span>{tag.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* RIGHT CONTENT AREA: COMBINED ARTICLES & PRODUCTS GRID */}
            <main className="lg:col-span-8 xl:col-span-9 space-y-6 text-black">
              
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-black uppercase tracking-wider">
                      Mostrando:
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-black">
                      {selectedCategory} ({typeFilter.toUpperCase()})
                    </h2>
                  </div>
                  {searchTerm && (
                    <p className="text-xs text-black mt-0.5 font-medium">
                      Búsqueda: &ldquo;<strong className="text-black font-black">{searchTerm}</strong>&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-black">
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-black font-bold">
                    {filteredArticles.length + filteredProducts.length} resultados encontrados
                  </span>
                  {(selectedCategory !== 'Todas' || searchTerm || typeFilter !== 'todo') && (
                    <button
                      onClick={() => {
                        setSelectedCategory('Todas');
                        setSearchTerm('');
                        setTypeFilter('todo');
                      }}
                      className="text-xs font-bold text-[#4472C4] hover:underline cursor-pointer"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              {filteredArticles.length === 0 && filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                  <BookOpen className="w-12 h-12 text-black/40 mx-auto mb-3" />
                  <h3 className="font-black text-black text-base mb-1">
                    No se encontraron resultados
                  </h3>
                  <p className="text-xs text-black font-medium max-w-sm mx-auto mb-4">
                    Intenta buscando con otra palabra clave, ingrediente o categoría.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('Todas');
                      setSearchTerm('');
                      setTypeFilter('todo');
                    }}
                    className="px-4 py-2 bg-[#4472C4] hover:bg-[#33599E] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Ver todo
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Render Products */}
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => navigate(`/base-de-conocimiento/producto/${prod.slug}`)}
                      className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900">
                            <Package className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Producto · {prod.categoryLabel}</span>
                          </span>
                          <span className="text-xs font-black text-[#4472C4]">
                            ${prod.precio.toFixed(2)} USD
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <img
                            src={prod.imagenes[0]}
                            alt={prod.nombre}
                            className="w-20 h-20 object-contain rounded-2xl bg-slate-50 p-2 shrink-0 border border-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h3 className="font-extrabold text-base text-black group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                              {prod.nombre}
                            </h3>
                            <p className="text-xs text-black line-clamp-2 mt-1 font-normal">
                              {prod.descripcion}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500">
                          {prod.ficha?.ingredientes?.length ? `${prod.ficha.ingredientes.length} ingredientes` : 'Ficha oficial'}
                        </span>
                        <span className="text-xs font-black text-black group-hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Ver ficha</span> <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Render Articles */}
                  {filteredArticles.map((art) => {
                    const cfg = getCategoryConfig(art.category);
                    const Icon = cfg.icon;

                    return (
                      <div
                        key={art.id}
                        onClick={() => navigate(`/base-de-conocimiento/${art.slug}`)}
                        className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#4472C4] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                      >
                        <div
                          className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: cfg.accent }}
                        />

                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black ${cfg.badge}`}>
                              <Icon className="w-3.5 h-3.5 text-black" />
                              <span className="text-black">Artículo · {art.category}</span>
                            </span>

                            {art.videoUrl && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-red-100 text-red-700 border border-red-200">
                                <Play className="w-3 h-3 fill-current" />
                                <span>Video</span>
                              </span>
                            )}
                          </div>

                          <h3 className="font-extrabold text-base text-black group-hover:text-[#4472C4] transition-colors mb-2 line-clamp-2 leading-snug">
                            {art.title}
                          </h3>

                          <p className="text-xs text-black line-clamp-3 leading-relaxed mb-4 font-normal">
                            {art.summary}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-black flex items-center gap-1">
                            <Clock className="w-3 h-3 text-black" />
                            {art.readTime || '3 min'}
                          </span>

                          <span className="text-xs font-black text-black group-hover:text-[#4472C4] flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                            <span>Leer guía</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        )}

      </div>
    </div>
  );
};
