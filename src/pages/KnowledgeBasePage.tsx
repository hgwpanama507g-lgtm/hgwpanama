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
} from 'lucide-react';
import { knowledgeService, KnowledgeArticle } from '../services/knowledgeService';
import { ScrollReveal } from '../components/ScrollReveal';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';
import { useRouter } from '../router';

// Helper to remove any markdown #, *** or ** characters from content or strings
const cleanMarkdown = (text: string): string => {
  if (!text) return '';
  return text.replace(/#+\s*/g, '').replace(/\*+/g, '');
};

interface KnowledgeBasePageProps {
  articleIdentifier?: string;
}

export const KnowledgeBasePage: React.FC<KnowledgeBasePageProps> = ({ articleIdentifier }) => {
  const { navigate, currentPath } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const articles = useMemo(() => {
    return knowledgeService.getAllArticles().map((art) => ({
      ...art,
      content: cleanMarkdown(art.content),
      summary: cleanMarkdown(art.summary),
      title: cleanMarkdown(art.title),
    }));
  }, []);

  // Determine active article based on prop or route identifier
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(() => {
    if (articleIdentifier) {
      return knowledgeService.getArticleBySlugOrId(articleIdentifier) || null;
    }
    return null;
  });

  useEffect(() => {
    if (articleIdentifier) {
      const art = knowledgeService.getArticleBySlugOrId(articleIdentifier);
      if (art) {
        setSelectedArticle(art);
        setFeedback(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setSelectedArticle(null);
      setFeedback(null);
    }
  }, [articleIdentifier, currentPath]);

  const rawCategories = useMemo(() => knowledgeService.getCategories(), []);
  const categories = useMemo(() => ['Todas', ...rawCategories], [rawCategories]);

  // Category Icon & Color Configuration
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case '¿Qué es HGW y Fundadores?':
        return {
          icon: Building2,
          color: 'text-blue-600',
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100/90 text-black font-bold',
          accent: '#2563EB',
        };
      case 'Afiliación y Tutoriales':
        return {
          icon: Video,
          color: 'text-purple-600',
          bg: 'bg-purple-50 border-purple-200',
          badge: 'bg-purple-100/90 text-black font-bold',
          accent: '#9333EA',
        };
      case 'Plan de Negocio y Membresías':
        return {
          icon: TrendingUp,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50 border-emerald-200',
          badge: 'bg-emerald-100/90 text-black font-bold',
          accent: '#059669',
        };
      case 'Productos y Salud Natural':
        return {
          icon: Coffee,
          color: 'text-amber-600',
          bg: 'bg-amber-50 border-amber-200',
          badge: 'bg-amber-100/90 text-black font-bold',
          accent: '#D97706',
        };
      case 'Oficinas y Contacto':
        return {
          icon: ShieldCheck,
          color: 'text-cyan-600',
          bg: 'bg-cyan-50 border-cyan-200',
          badge: 'bg-cyan-100/90 text-black font-bold',
          accent: '#0891B2',
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
  }, [articles, searchTerm, selectedCategory]);

  const handleCopyLink = (article: KnowledgeArticle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}/base-de-conocimiento/${article.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleShareWhatsApp = (article: KnowledgeArticle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}/base-de-conocimiento/${article.slug}`;
    const text = `Te comparto esta guía oficial de HGW Panamá:\n*${article.title}*\n${article.summary}\n\nLéela aquí: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const quickTags = [
    { label: 'Video Tutorial', icon: Video },
    { label: 'Dra. Deming Li', icon: Building2 },
    { label: 'Ganancia Mutua', icon: TrendingUp },
    { label: 'Master 52%', icon: TrendingUp },
    { label: 'Ganoderma', icon: Coffee },
    { label: 'Arándano', icon: Sparkles },
    { label: 'Turmalina', icon: ShieldCheck },
    { label: 'Servientrega', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-8 sm:py-14 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner Header */}
        <ScrollReveal>
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4472C4]/10 text-black text-xs font-black uppercase tracking-wider mb-3.5 border border-[#4472C4]/20">
                <BookOpen className="w-4 h-4 text-[#4472C4]" />
                <span className="text-black">Base de Conocimiento & Centro de Guías Oficiales</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
                Aprende Todo Sobre HGW
              </h1>

              <p className="text-sm sm:text-base text-black mt-3 leading-relaxed font-medium">
                Descubre qué es HGW, la historia de Green World Group, el liderazgo de la Dra. Deming Li,
                tutoriales en video de registro paso a paso, el Plan Mutuo (50/50) y fichas de productos naturales.
              </p>

              {/* Metrics Bar */}
              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-black">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs text-black">
                  <FileText className="w-3.5 h-3.5 text-[#4472C4]" />
                  <span className="text-black">{articles.length} Artículos y Guías</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs text-black">
                  <Video className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-black">Videos Tutoriales Incluidos</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs text-black">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-black">Catálogo Oficial 2026</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Article Detail View Modal / Active Screen */}
        {selectedArticle ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 mb-12 animate-fade-in text-black">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <button
                onClick={() => {
                  navigate('/base-de-conocimiento');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-[#EEF3FB] text-black hover:text-[#4472C4] font-black text-xs transition-colors cursor-pointer"
              >
                ← Volver a la base de conocimiento
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(selectedArticle)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-black text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  title="Copiar enlace directo"
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
                  onClick={() => handleShareWhatsApp(selectedArticle)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00A550]/15 hover:bg-[#00A550]/25 text-black text-xs font-bold border border-[#00A550]/30 transition-colors cursor-pointer"
                  title="Compartir en WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#00A550]" />
                  <span className="text-black font-bold">WhatsApp</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-black text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  title="Imprimir artículo"
                >
                  <Printer className="w-3.5 h-3.5 text-black" />
                  <span className="text-black">Imprimir</span>
                </button>
              </div>
            </div>

            {/* Badges & Source */}
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

            {/* Article Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-4">
              {cleanMarkdown(selectedArticle.title)}
            </h2>

            {/* Embedded Video Tutorial (if article contains videoUrl) */}
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

            {/* Summary Box */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#EEF3FB] to-blue-50/40 border-l-4 border-[#4472C4] rounded-r-2xl mb-8 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#4472C4] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-black font-bold leading-relaxed">
                {cleanMarkdown(selectedArticle.summary)}
              </p>
            </div>

            {/* Content Body */}
            <div className="max-w-none text-black text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-medium">
              {cleanMarkdown(selectedArticle.content)}
            </div>

            {/* Quick Action Box for Registration / Contact if applicable */}
            {(selectedArticle.category === 'Afiliación y Tutoriales' ||
              selectedArticle.category === 'Plan de Negocio y Membresías') && (
              <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 via-white to-blue-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div>
                  <h4 className="font-black text-base text-black">
                    ¿Deseas activar tu código de socio o realizar consultas?
                  </h4>
                  <p className="text-xs text-black mt-1 font-medium">
                    Comunícate por WhatsApp con la distribuidora autorizada Yamilka Batista (+507 6778-8375).
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://www.healthgreenworld.com/?userName=Yamilka507"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-black text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>Registro Oficial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={getAffiliationWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#00A550] hover:bg-[#008f44] text-white font-black text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* Tags without # symbol */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-black mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-black" /> Temas relacionados:
              </span>
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => {
                    navigate('/base-de-conocimiento');
                    setSearchTerm(tag);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-[#EEF3FB] text-black hover:text-[#4472C4] rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Feedback Box */}
            <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-black">
                <HelpCircle className="w-4 h-4 text-[#4472C4]" />
                <span className="text-black">¿Te resultó útil esta información?</span>
              </div>

              {feedback ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-black bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-black">¡Gracias por tus comentarios!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFeedback('yes')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-black text-xs font-bold border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-black">Sí, me ayudó</span>
                  </button>
                  <button
                    onClick={() => setFeedback('no')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-black text-xs font-bold border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                  >
                    <ThumbsDown className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-black">No del todo</span>
                  </button>
                </div>
              )}
            </div>

            {/* Related Articles */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#4472C4]" />
                <h3 className="font-black text-sm text-black uppercase tracking-wider">
                  Artículos Relacionados en esta Categoría
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {knowledgeService
                  .getRelatedArticles(selectedArticle.id, selectedArticle.category, 3)
                  .map((rel) => {
                    const relCfg = getCategoryConfig(rel.category);
                    const RelIcon = relCfg.icon;
                    return (
                      <div
                        key={rel.id}
                        onClick={() => {
                          navigate(`/base-de-conocimiento/${rel.slug}`);
                        }}
                        className="p-4 bg-slate-50 hover:bg-[#EEF3FB]/70 rounded-2xl border border-slate-200 hover:border-[#4472C4] cursor-pointer transition-all flex flex-col justify-between group shadow-2xs"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <RelIcon className={`w-3.5 h-3.5 ${relCfg.color}`} />
                            <span className="text-[10px] font-bold text-black truncate">
                              {rel.category}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-xs text-black group-hover:text-[#4472C4] transition-colors line-clamp-2">
                            {cleanMarkdown(rel.title)}
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold text-black group-hover:text-[#4472C4] flex items-center gap-1 mt-3 group-hover:translate-x-1 transition-transform">
                          <span>Ver guía</span> <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          /* Main 2-Column Layout: Left Sidebar Filter + Right Content Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden col-span-1 flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#4472C4]" />
                <span className="text-xs font-bold text-black">
                  Categoría: <strong className="text-black underline">{selectedCategory}</strong>
                </span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="px-3 py-1.5 bg-[#4472C4] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                {mobileFilterOpen ? 'Ocultar Filtros' : 'Cambiar Categoría'}
              </button>
            </div>

            {/* LEFT SIDEBAR: FILTROS POR CATEGORÍA Y BUSCADOR */}
            <aside
              className={`lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-24 ${
                mobileFilterOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              {/* Search Widget */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-xs text-black uppercase tracking-wider">
                  <Search className="w-4 h-4 text-[#4472C4]" />
                  <span className="text-black">Buscador en Tiempo Real</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar tema, producto o bono..."
                    className="w-full pl-9 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-black font-medium placeholder:text-neutral-500 focus:outline-none focus:border-[#4472C4] transition-colors"
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

              {/* Category Filter Vertical List */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-extrabold text-xs text-black uppercase tracking-wider">
                    <Filter className="w-4 h-4 text-[#4472C4]" />
                    <span className="text-black">Categorías</span>
                  </div>
                  <span className="text-[11px] font-bold text-black">
                    {articles.length} temas
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {categories.map((cat) => {
                    const cfg = getCategoryConfig(cat);
                    const Icon = cfg.icon;
                    const count =
                      cat === 'Todas'
                        ? articles.length
                        : articles.filter((a) => a.category === cat).length;
                    const isSelected = selectedCategory === cat;

                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'bg-[#4472C4] text-white shadow-md shadow-[#4472C4]/20'
                            : 'bg-slate-50 hover:bg-slate-100 text-black'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-white' : cfg.color
                            }`}
                          />
                          <span className={`truncate ${isSelected ? 'text-white' : 'text-black'}`}>
                            {cat}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-black shrink-0 ${
                            isSelected
                              ? 'bg-white/25 text-white'
                              : 'bg-slate-200 text-black'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Tags Cloud in Sidebar without # */}
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
                        <span className="text-black">{tag.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Support Card in Sidebar */}
              <div className="bg-gradient-to-br from-[#EEF3FB] to-blue-50/70 p-5 rounded-3xl border border-[#4472C4]/20 space-y-3">
                <div className="flex items-center gap-2 font-black text-xs text-black">
                  <Phone className="w-4 h-4 text-[#00A550]" />
                  <span className="text-black">¿Necesitas Asesoría?</span>
                </div>
                <p className="text-[11px] text-black font-medium leading-relaxed">
                  ¿Tienes una consulta específica sobre productos o afiliación? Chatea directamente con Yamilka Batista.
                </p>
                <a
                  href={getAffiliationWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#00A550] hover:bg-[#008f44] text-white text-xs font-black rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contactar por WhatsApp</span>
                </a>
              </div>
            </aside>

            {/* RIGHT CONTENT AREA: LIST OF ARTICLES */}
            <main className="lg:col-span-8 xl:col-span-9 space-y-6 text-black">
              
              {/* Category Status & Active Filter Header */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-black uppercase tracking-wider">
                      Mostrando:
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-black">
                      {selectedCategory}
                    </h2>
                  </div>
                  {searchTerm && (
                    <p className="text-xs text-black mt-0.5 font-medium">
                      Filtro de búsqueda: &ldquo;<strong className="text-black font-black">{searchTerm}</strong>&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-black">
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-black font-bold">
                    {filteredArticles.length} {filteredArticles.length === 1 ? 'guía' : 'guías encontradas'}
                  </span>
                  {(selectedCategory !== 'Todas' || searchTerm) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('Todas');
                        setSearchTerm('');
                      }}
                      className="text-xs font-bold text-[#4472C4] hover:underline cursor-pointer"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                  <BookOpen className="w-12 h-12 text-black/40 mx-auto mb-3" />
                  <h3 className="font-black text-black text-base mb-1">
                    No se encontraron artículos para esta selección
                  </h3>
                  <p className="text-xs text-black font-medium max-w-sm mx-auto mb-4">
                    Intenta buscando con palabras clave como &ldquo;video&rdquo;, &ldquo;afiliación&rdquo;, &ldquo;ganoderma&rdquo; o selecciona otra categoría.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('Todas');
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 bg-[#4472C4] hover:bg-[#33599E] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Ver todas las categorías
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((art) => {
                    const cfg = getCategoryConfig(art.category);
                    const Icon = cfg.icon;

                    return (
                      <div
                        key={art.id}
                        onClick={() => {
                          navigate(`/base-de-conocimiento/${art.slug}`);
                        }}
                        className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#4472C4] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                      >
                        {/* Top accent line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: cfg.accent }}
                        />

                        <div>
                          {/* Badges: Category + Video Badge (if applicable) + Quick Share Icons */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black ${cfg.badge}`}
                              >
                                <Icon className="w-3.5 h-3.5 text-black" />
                                <span className="text-black">{art.category}</span>
                              </span>

                              {art.videoUrl && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-red-100 text-red-700 border border-red-200">
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>Video Tutorial</span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={(e) => handleCopyLink(art, e)}
                                className="p-1 rounded-lg text-black hover:text-[#4472C4] hover:bg-slate-100 transition-colors"
                                title="Copiar enlace"
                              >
                                {copiedId === art.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={(e) => handleShareWhatsApp(art, e)}
                                className="p-1 rounded-lg text-black hover:text-[#00A550] hover:bg-emerald-50 transition-colors"
                                title="Compartir en WhatsApp"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Article Title */}
                          <h3 className="font-extrabold text-base text-black group-hover:text-[#4472C4] transition-colors mb-2 line-clamp-2 leading-snug">
                            {cleanMarkdown(art.title)}
                          </h3>

                          {/* Summary */}
                          <p className="text-xs text-black line-clamp-3 leading-relaxed mb-4 font-normal">
                            {cleanMarkdown(art.summary)}
                          </p>
                        </div>

                        {/* Footer: Tags and Read CTA without # symbol */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5 max-w-[65%] overflow-hidden">
                            {art.readTime && (
                              <span className="text-[10px] font-bold text-black flex items-center gap-1">
                                <Clock className="w-3 h-3 text-black" />
                                {art.readTime}
                              </span>
                            )}
                            {art.tags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] bg-slate-100 text-black px-2 py-0.5 rounded-md font-bold truncate border border-slate-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

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
