import React, { useState, useMemo } from 'react';
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
  HeartPulse,
  ShieldCheck,
  Home,
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
import { Link } from '../router';
import { ScrollReveal } from '../components/ScrollReveal';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

export const KnowledgeBasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const articles = useMemo(() => knowledgeService.getAllArticles(), []);
  const rawCategories = useMemo(() => knowledgeService.getCategories(), [articles]);
  const categories = useMemo(() => ['Todas', ...rawCategories], [rawCategories]);

  // Category Icon & Color Configuration
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case '¿Qué es HGW y Fundadores?':
        return {
          icon: Building2,
          color: 'text-blue-600',
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100/90 text-blue-800',
          accent: '#2563EB',
        };
      case 'Afiliación y Tutoriales':
        return {
          icon: Video,
          color: 'text-purple-600',
          bg: 'bg-purple-50 border-purple-200',
          badge: 'bg-purple-100/90 text-purple-800',
          accent: '#9333EA',
        };
      case 'Plan de Negocio y Membresías':
        return {
          icon: TrendingUp,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50 border-emerald-200',
          badge: 'bg-emerald-100/90 text-emerald-800',
          accent: '#059669',
        };
      case 'Productos y Salud Natural':
        return {
          icon: Coffee,
          color: 'text-amber-600',
          bg: 'bg-amber-50 border-amber-200',
          badge: 'bg-amber-100/90 text-amber-800',
          accent: '#D97706',
        };
      case 'Oficinas y Contacto':
        return {
          icon: ShieldCheck,
          color: 'text-cyan-600',
          bg: 'bg-cyan-50 border-cyan-200',
          badge: 'bg-cyan-100/90 text-cyan-800',
          accent: '#0891B2',
        };
      default:
        return {
          icon: Layers,
          color: 'text-[#4472C4]',
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100/90 text-blue-800',
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
    const url = `${window.location.origin}/base-de-conocimiento#${article.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleShareWhatsApp = (article: KnowledgeArticle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const text = `Te comparto esta guía oficial de HGW Panamá:\n*${article.title}*\n${article.summary}\n\nLéela aquí: ${window.location.origin}/base-de-conocimiento`;
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
    <div className="min-h-screen bg-stone-50 py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner Header */}
        <ScrollReveal>
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4472C4]/10 text-[#4472C4] text-xs font-black uppercase tracking-wider mb-3.5 border border-[#4472C4]/20">
                <BookOpen className="w-4 h-4 text-[#4472C4]" />
                <span>Base de Conocimiento & Centro de Guías Oficiales</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Aprende Todo Sobre HGW
              </h1>

              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                Descubre qué es HGW, la historia de Green World Group, el liderazgo de la Dra. Deming Li,
                tutoriales en video de registro paso a paso, el Plan Mutuo (50/50) y fichas de productos naturales.
              </p>

              {/* Metrics Bar */}
              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-slate-700">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <FileText className="w-3.5 h-3.5 text-[#4472C4]" />
                  {articles.length} Artículos y Guías
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <Video className="w-3.5 h-3.5 text-purple-600" />
                  Videos Tutoriales Incluidos
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Catálogo Oficial 2026
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Article Detail View Modal / Active Screen */}
        {selectedArticle ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 mb-12 animate-fade-in">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setFeedback(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-[#EEF3FB] text-[#4472C4] font-bold text-xs transition-colors cursor-pointer"
              >
                ← Volver a la base de conocimiento
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(selectedArticle)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  title="Copiar enlace directo"
                >
                  {copiedId === selectedArticle.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar enlace</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleShareWhatsApp(selectedArticle)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00A550]/10 hover:bg-[#00A550]/20 text-[#00A550] text-xs font-bold border border-[#00A550]/20 transition-colors cursor-pointer"
                  title="Compartir en WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  title="Imprimir artículo"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
              </div>
            </div>

            {/* Badges & Source */}
            {(() => {
              const cfg = getCategoryConfig(selectedArticle.category);
              const CatIcon = cfg.icon;
              return (
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${cfg.badge}`}>
                    <CatIcon className="w-3.5 h-3.5" />
                    {selectedArticle.category}
                  </span>
                  {selectedArticle.readTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Lectura: {selectedArticle.readTime}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Actualizado: {selectedArticle.updatedAt}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    Fuente: {selectedArticle.source}
                  </span>
                </div>
              );
            })()}

            {/* Article Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              {selectedArticle.title}
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
                      <p className="text-[11px] text-slate-400">Reproducción guiada paso a paso</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-white/10 rounded-lg font-bold">YouTube HD</span>
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
              <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                {selectedArticle.summary}
              </p>
            </div>

            {/* Content Body */}
            <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {selectedArticle.content}
            </div>

            {/* Quick Action Box for Registration / Contact if applicable */}
            {(selectedArticle.category === 'Afiliación y Tutoriales' ||
              selectedArticle.category === 'Plan de Negocio y Membresías') && (
              <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 via-white to-blue-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    ¿Deseas activar tu código de socio o realizar consultas?
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Comunícate por WhatsApp con la distribuidora autorizada Yamilka Batista (+507 6778-8375).
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://www.healthgreenworld.com/?userName=Yamilka507"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>Registro Oficial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={getAffiliationWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#00A550] hover:bg-[#008f44] text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Temas relacionados:
              </span>
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => {
                    setSelectedArticle(null);
                    setSearchTerm(tag);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-[#EEF3FB] hover:text-[#4472C4] rounded-lg text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Feedback Box */}
            <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <HelpCircle className="w-4 h-4 text-[#4472C4]" />
                <span>¿Te resultó útil esta información?</span>
              </div>

              {feedback ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Gracias por tus comentarios!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFeedback('yes')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sí, me ayudó</span>
                  </button>
                  <button
                    onClick={() => setFeedback('no')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                  >
                    <ThumbsDown className="w-3.5 h-3.5 text-rose-500" />
                    <span>No del todo</span>
                  </button>
                </div>
              )}
            </div>

            {/* Related Articles */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#4472C4]" />
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
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
                          setSelectedArticle(rel);
                          setFeedback(null);
                          window.scrollTo({ top: 160, behavior: 'smooth' });
                        }}
                        className="p-4 bg-slate-50 hover:bg-[#EEF3FB]/70 rounded-2xl border border-slate-200 hover:border-[#4472C4] cursor-pointer transition-all flex flex-col justify-between group shadow-2xs"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <RelIcon className={`w-3.5 h-3.5 ${relCfg.color}`} />
                            <span className="text-[10px] font-bold text-slate-500 truncate">
                              {rel.category}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-[#4472C4] transition-colors line-clamp-2">
                            {rel.title}
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold text-[#4472C4] flex items-center gap-1 mt-3 group-hover:translate-x-1 transition-transform">
                          Ver guía <ChevronRight className="w-3 h-3" />
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
                <span className="text-xs font-bold text-slate-800">
                  Categoría: <strong className="text-[#4472C4]">{selectedCategory}</strong>
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
                <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                  <Search className="w-4 h-4 text-[#4472C4]" />
                  <span>Buscador en Tiempo Real</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar tema, producto o bono..."
                    className="w-full pl-9 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4472C4] transition-colors"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Vertical List */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                    <Filter className="w-4 h-4 text-[#4472C4]" />
                    <span>Categorías</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
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
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-white' : cfg.color
                            }`}
                          />
                          <span className="truncate">{cat}</span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-black shrink-0 ${
                            isSelected
                              ? 'bg-white/25 text-white'
                              : 'bg-slate-200/80 text-slate-700'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Tags Cloud in Sidebar */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Temas Populares</span>
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
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-[#EEF3FB] hover:text-[#4472C4] border border-slate-200 text-slate-700 rounded-xl text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        <Icon className="w-3 h-3 text-[#4472C4]" />
                        <span>{tag.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Support Card in Sidebar */}
              <div className="bg-gradient-to-br from-[#EEF3FB] to-blue-50/70 p-5 rounded-3xl border border-[#4472C4]/20 space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900">
                  <Phone className="w-4 h-4 text-[#00A550]" />
                  <span>¿Necesitas Asesoría?</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
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
            <main className="lg:col-span-8 xl:col-span-9 space-y-6">
              
              {/* Category Status & Active Filter Header */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Mostrando:
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-slate-900">
                      {selectedCategory}
                    </h2>
                  </div>
                  {searchTerm && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Filtro de búsqueda: &ldquo;<strong className="text-[#4472C4]">{searchTerm}</strong>&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-700">
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
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-extrabold text-slate-800 text-base mb-1">
                    No se encontraron artículos para esta selección
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
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
                          setSelectedArticle(art);
                          window.scrollTo({ top: 160, behavior: 'smooth' });
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
                                <Icon className="w-3.5 h-3.5" />
                                <span>{art.category}</span>
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
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
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
                                className="p-1 rounded-lg text-slate-400 hover:text-[#00A550] hover:bg-emerald-50 transition-colors"
                                title="Compartir en WhatsApp"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Article Title */}
                          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#4472C4] transition-colors mb-2 line-clamp-2 leading-snug">
                            {art.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 font-normal">
                            {art.summary}
                          </p>
                        </div>

                        {/* Footer: Tags and Read CTA */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5 max-w-[65%] overflow-hidden">
                            {art.readTime && (
                              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {art.readTime}
                              </span>
                            )}
                            {art.tags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium truncate"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>

                          <span className="text-xs font-bold text-[#4472C4] flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
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
