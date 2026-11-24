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
} from 'lucide-react';
import { knowledgeService, KnowledgeArticle } from '../services/knowledgeService';
import { Link, useRouter } from '../router';
import { ScrollReveal } from '../components/ScrollReveal';

export const KnowledgeBasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  const articles = useMemo(() => knowledgeService.getAllArticles(), []);
  const rawCategories = useMemo(() => knowledgeService.getCategories(), [articles]);
  const categories = useMemo(() => ['Todas', ...rawCategories], [rawCategories]);

  // Category Icon & Color Mapping
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'Institucional':
        return {
          icon: Building2,
          color: 'text-blue-600',
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100/80 text-blue-800',
        };
      case 'Negocio y Afiliación':
        return {
          icon: TrendingUp,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50 border-emerald-200',
          badge: 'bg-emerald-100/80 text-emerald-800',
        };
      case 'Productos - Alimentos y Bebidas':
        return {
          icon: Coffee,
          color: 'text-amber-600',
          bg: 'bg-amber-50 border-amber-200',
          badge: 'bg-amber-100/80 text-amber-800',
        };
      case 'Productos - Suplementos':
        return {
          icon: Sparkles,
          color: 'text-purple-600',
          bg: 'bg-purple-50 border-purple-200',
          badge: 'bg-purple-100/80 text-purple-800',
        };
      case 'Productos - Cuidado Personal':
        return {
          icon: HeartPulse,
          color: 'text-rose-600',
          bg: 'bg-rose-50 border-rose-200',
          badge: 'bg-rose-100/80 text-rose-800',
        };
      case 'Productos - Accesorios y Turmalina':
        return {
          icon: ShieldCheck,
          color: 'text-cyan-600',
          bg: 'bg-cyan-50 border-cyan-200',
          badge: 'bg-cyan-100/80 text-cyan-800',
        };
      case 'Productos - Equipos y Hogar':
        return {
          icon: Home,
          color: 'text-orange-600',
          bg: 'bg-orange-50 border-orange-200',
          badge: 'bg-orange-100/80 text-orange-800',
        };
      default:
        return {
          icon: Layers,
          color: 'text-[#4472C4]',
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100/80 text-blue-800',
        };
    }
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'Todas' || art.category === selectedCategory;
      const term = searchTerm.toLowerCase();
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
    { label: 'Ganoderma', icon: Coffee },
    { label: 'Arándanos', icon: Sparkles },
    { label: 'Spirulina', icon: Sparkles },
    { label: 'Plan de Compensación', icon: TrendingUp },
    { label: 'Turmalina', icon: ShieldCheck },
    { label: 'Smilife', icon: HeartPulse },
    { label: 'Panamá', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Visual Badges & Icons */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4472C4]/10 text-[#4472C4] text-xs font-black mb-4 shadow-2xs border border-[#4472C4]/20 animate-fade-in">
              <BookOpen className="w-4 h-4 text-[#4472C4]" />
              <span>CENTRO DE CONOCIMIENTO Y GUÍAS HGW</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Base de Conocimiento Oficial
            </h1>

            <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed font-normal">
              Información oficial verificada sobre productos, ingredientes naturales, dosis recomendadas,
              planes de membresía (Prejunior, Junior, Senior y Master) y respuestas a consultas frecuentes.
            </p>

            {/* Quick Metrics Counter Strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <FileText className="w-4 h-4 text-[#4472C4]" />
                {articles.length} Artículos Guía
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Catálogo 2026 Verificado
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <Clock className="w-4 h-4 text-amber-600" />
                Actualizado este mes
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Article Detail View if an article is active */}
        {selectedArticle ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 mb-12 animate-fade-in">
            {/* Top Navigation & Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setFeedback(null);
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#EEF3FB] text-[#4472C4] font-bold text-xs transition-colors cursor-pointer"
              >
                ← Volver al buscador y listado
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(selectedArticle)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  title="Copiar enlace directo a este artículo"
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
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#00A550]/10 hover:bg-[#00A550]/20 text-[#00A550] text-xs font-bold border border-[#00A550]/20 transition-colors cursor-pointer"
                  title="Compartir por WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  title="Imprimir artículo"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
              </div>
            </div>

            {/* Category and Meta Badges */}
            {(() => {
              const cfg = getCategoryConfig(selectedArticle.category);
              const CatIcon = cfg.icon;
              return (
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${cfg.badge}`}>
                    <CatIcon className="w-3.5 h-3.5" />
                    {selectedArticle.category}
                  </span>
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

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              {selectedArticle.title}
            </h2>

            {/* Summary Highlight Box */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#EEF3FB] to-blue-50/40 border-l-4 border-[#4472C4] rounded-r-2xl mb-8 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#4472C4] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                {selectedArticle.summary}
              </p>
            </div>

            {/* Structured Content Body */}
            <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {selectedArticle.content}
            </div>

            {/* Tags Strip */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Temas y Etiquetas:
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

            {/* Interactive Feedback Box */}
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

            {/* Related Articles with Category Icons */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#4472C4]" />
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                  Guías y Artículos Relacionados
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
                          window.scrollTo({ top: 180, behavior: 'smooth' });
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
          <>
            {/* Search, Interactive Quick Tags and Categories */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm mb-8 space-y-5">
              {/* Main Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar en la base de conocimiento (ej. ganoderma, arándanos, master 52%, turmalina, spirulina)..."
                  className="w-full pl-12 pr-10 py-3 text-sm bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4472C4]/20 focus:border-[#4472C4] transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 top-3 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded-lg"
                  >
                    Borrar
                  </button>
                )}
              </div>

              {/* Popular Search Chips with Icons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
                <span className="text-slate-400 font-bold flex items-center gap-1 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Sugerencias:
                </span>
                {quickTags.map((tag) => {
                  const Icon = tag.icon;
                  return (
                    <button
                      key={tag.label}
                      onClick={() => setSearchTerm(tag.label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-[#EEF3FB] hover:text-[#4472C4] text-slate-700 rounded-full font-semibold transition-colors shrink-0 cursor-pointer"
                    >
                      <Icon className="w-3 h-3 text-[#4472C4]" />
                      <span>{tag.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Category Buttons with Custom Icons & Badges */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {categories.map((cat) => {
                    const cfg = getCategoryConfig(cat);
                    const CatIcon = cfg.icon;
                    const count =
                      cat === 'Todas'
                        ? articles.length
                        : articles.filter((a) => a.category === cat).length;
                    const isSelected = selectedCategory === cat;

                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#4472C4] text-white shadow-sm ring-2 ring-[#4472C4]/30'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <CatIcon className={`w-4 h-4 ${isSelected ? 'text-white' : cfg.color}`} />
                        <span>{cat}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Articles List / Grid with Interactive Cards */}
            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-extrabold text-slate-800 text-base mb-1">
                  No se encontraron resultados para &ldquo;{searchTerm}&rdquo;
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Prueba buscando por términos generales como café, membresía, turmalina, arándano o limpia los filtros.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todas');
                  }}
                  className="px-4 py-2 bg-[#4472C4] hover:bg-[#33599E] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => {
                  const cfg = getCategoryConfig(art.category);
                  const Icon = cfg.icon;

                  return (
                    <div
                      key={art.id}
                      onClick={() => {
                        setSelectedArticle(art);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }}
                      className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#4472C4] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                    >
                      {/* Top colored accent line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#4472C4] opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div>
                        {/* Header Badge & Action Icons */}
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black ${cfg.badge}`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{art.category}</span>
                          </span>

                          <div className="flex items-center gap-1">
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

                        {/* Title */}
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
                        <div className="flex flex-wrap gap-1 max-w-[65%] overflow-hidden">
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
          </>
        )}
      </div>
    </div>
  );
};
