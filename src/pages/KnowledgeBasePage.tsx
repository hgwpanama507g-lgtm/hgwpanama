import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Tag, Calendar, ArrowRight, ExternalLink, Filter, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { knowledgeService, KnowledgeArticle } from '../services/knowledgeService';
import { Link, useRouter } from '../router';
import { ScrollReveal } from '../components/ScrollReveal';

export const KnowledgeBasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  const articles = useMemo(() => knowledgeService.getAllArticles(), []);
  const categories = useMemo(() => ['Todas', ...knowledgeService.getCategories()], [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesCategory = selectedCategory === 'Todas' || art.category === selectedCategory;
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term ||
        art.title.toLowerCase().includes(term) ||
        art.summary.toLowerCase().includes(term) ||
        art.content.toLowerCase().includes(term) ||
        art.tags.some(tag => tag.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [articles, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-stone-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4472C4]/10 text-[#4472C4] text-xs font-extrabold mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Centro de Información Oficial</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
              Base de Conocimiento HGW
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
              Explora manuales oficiales, beneficios de productos, ingredientes naturales, plan de compensación y guías respaldadas por catálogos y normativas HGW.
            </p>
          </div>
        </ScrollReveal>

        {/* Article Detail Modal / View if selected */}
        {selectedArticle ? (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-10 mb-12 animate-fade-in">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-xs font-bold text-[#4472C4] hover:underline mb-6 inline-flex items-center gap-1.5"
            >
              ← Volver a la lista de artículos
            </button>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-stone-500 mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#4472C4]">
                {selectedArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Actualizado: {selectedArticle.updatedAt}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Fuente: {selectedArticle.source}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-black mb-4">
              {selectedArticle.title}
            </h2>

            <p className="text-base text-stone-700 font-medium italic mb-8 p-4 bg-stone-50 border-l-4 border-[#4472C4] rounded-r-2xl">
              {selectedArticle.summary}
            </p>

            <div className="prose prose-stone max-w-none text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {selectedArticle.content}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-500 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {selectedArticle.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-stone-100 rounded-lg text-xs font-medium text-stone-700">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-stone-200">
              <h3 className="font-extrabold text-sm text-black mb-4">Artículos Relacionados</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {knowledgeService
                  .getRelatedArticles(selectedArticle.id, selectedArticle.category, 3)
                  .map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        setSelectedArticle(rel);
                        window.scrollTo({ top: 200, behavior: 'smooth' });
                      }}
                      className="p-4 bg-stone-50 hover:bg-blue-50/50 rounded-2xl border border-stone-200 cursor-pointer transition-colors"
                    >
                      <span className="text-[10px] font-bold text-[#4472C4] block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="font-extrabold text-xs text-stone-900 line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Search & Filters */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm mb-8 space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar por título, ingrediente, beneficio o etiqueta (ej. ganoderma, arándanos, bonos)..."
                  className="w-full pl-12 pr-4 py-3 text-sm bg-stone-50 border border-stone-300 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#4472C4]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <Filter className="w-4 h-4 text-stone-500 shrink-0 ml-1 mr-1" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#4472C4] text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm">
                <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-extrabold text-stone-800 text-base mb-1">No se encontraron artículos</h3>
                <p className="text-xs text-stone-500">
                  Intenta con otros términos de búsqueda o selecciona otra categoría.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(art => (
                  <div
                    key={art.id}
                    onClick={() => {
                      setSelectedArticle(art);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md hover:border-[#4472C4] transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#4472C4] text-[11px] font-extrabold">
                          {art.category}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {art.updatedAt}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-black group-hover:text-[#4472C4] transition-colors mb-2.5 line-clamp-2">
                        {art.title}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1 max-w-[70%] overflow-hidden">
                        {art.tags.slice(0, 2).map(t => (
                          <span key={t} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#4472C4] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Leer <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
