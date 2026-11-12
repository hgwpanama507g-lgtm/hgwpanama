import React, { useState, useMemo } from 'react';
import { FileText, Search, Download, Eye, ExternalLink, Filter, ShieldCheck, Sparkles, X, Phone } from 'lucide-react';
import { HGW_DOCUMENTS, DocumentItem } from '../data/documents';
import { Link } from '../router';

export const DocumentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos los Documentos' },
    { id: 'cafes-bebidas', label: 'Cafés y Bebidas' },
    { id: 'nutricion', label: 'Nutrición y Suplementos' },
    { id: 'cuidado-personal', label: 'Cuidado Personal y Belleza' },
    { id: 'turmalina', label: 'Turmalina y Bienestar' },
  ];

  const filteredDocs = useMemo(() => {
    return HGW_DOCUMENTS.filter((doc) => {
      if (selectedCategory !== 'all' && doc.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesDesc = doc.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 mb-6">
          <Link to="/inicio" className="hover:text-[#00795F]">Inicio</Link>
          <span>/</span>
          <span className="text-black font-bold">Documentos PDF Oficiales</span>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-[#004d3c] via-[#00795F] to-[#00A550] text-white rounded-3xl p-8 sm:p-14 shadow-xl mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-black uppercase tracking-wider text-emerald-200 mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>Biblioteca Técnica HGW Panamá</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Documentos, Fichas Técnicas y Manuales en PDF
            </h1>
            <p className="text-base sm:text-lg text-emerald-100 leading-relaxed font-normal">
              Consulta, previsualiza y descarga las fichas técnicas oficiales de nuestros productos, guías de nutrición, manuales de turmalina y planes de compensación corporativos.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-stone-50 p-4 sm:p-6 rounded-3xl border border-stone-300 mb-10 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search */}
            <div className="md:col-span-8 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre de documento, producto o ingrediente (cordyceps, colágeno, pasta dental...)"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-stone-300 rounded-xl text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F] font-medium"
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

            {/* Counter */}
            <div className="md:col-span-4 flex items-center justify-end text-sm text-stone-700 font-semibold px-2">
              Mostrando <span className="text-black font-extrabold mx-1">{filteredDocs.length}</span> documentos
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-stone-200">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = HGW_DOCUMENTS.filter(d => cat.id === 'all' || d.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap shrink-0 transition-all ${
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

        {/* Documents Grid */}
        {filteredDocs.length === 0 ? (
          <div className="text-center py-16 px-4 bg-stone-50 rounded-3xl border border-dashed border-stone-300">
            <Filter className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-extrabold text-black">No se encontraron documentos</h3>
            <p className="text-sm text-stone-600 mt-1 max-w-sm mx-auto">
              No hay archivos PDF que coincidan con &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-5 py-2.5 text-xs font-bold text-[#00795F] bg-white border border-[#00795F]/40 rounded-xl hover:bg-stone-50"
            >
              Ver todos los documentos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => {
              const docDetailPageUrl = `/documentos/${doc.slug}`;
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl border border-stone-200 hover:border-[#00795F] hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {/* Document Cover Image */}
                  <Link to={docDetailPageUrl} className="block aspect-video overflow-hidden bg-stone-100 relative">
                    {doc.coverImageUrl ? (
                      <img 
                        src={doc.coverImageUrl} 
                        alt={`Portada de ${doc.title}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-stone-400">
                        <FileText className="w-12 h-12" />
                      </div>
                    )}
                  </Link>
                  
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-emerald-50 text-[#00795F] text-xs font-bold rounded-lg border border-emerald-200">
                          {doc.categoryLabel}
                        </span>
                        <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                          PDF ({doc.size})
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-black group-hover:text-[#00795F] transition-colors leading-snug mb-2">
                        <Link to={docDetailPageUrl} title={doc.title}>
                          {doc.title}
                        </Link>
                      </h3>

                      <p className="text-[17px] text-stone-700 leading-relaxed font-normal mb-4">
                        {doc.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-2">
                      <Link
                        to={docDetailPageUrl}
                        className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-black text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center"
                      >
                        <Eye className="w-4 h-4 text-[#00795F]" />
                        <span>Ver Ficha</span>
                      </Link>

                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-[#00795F] hover:bg-[#004d3c] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Download className="w-4 h-4" />
                        <span>Descargar</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>



    </div>
  );
};
