import React, { useState, useMemo } from 'react';
import { FileText, Search, Download, Eye, ExternalLink, Filter, ShieldCheck, Sparkles, X, Phone } from 'lucide-react';
import { HGW_DOCUMENTS, DocumentItem } from '../data/documents';
import { Link } from '../router';

export const DocumentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

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
            <div className="md:col-span-8 relative">
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
                  className="bg-white rounded-3xl border border-stone-200 hover:border-[#00795F] hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group"
                >
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

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                      {doc.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 grid grid-cols-2 gap-2">
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
              );
            })}
          </div>
        )}

      </div>

      {/* PDF Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-300">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-6 h-6 text-emerald-400" />
                <div>
                  <h3 className="text-base font-extrabold line-clamp-1">{previewDoc.title}</h3>
                  <p className="text-xs text-stone-400">{previewDoc.categoryLabel} · PDF ({previewDoc.size})</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
                aria-label="Cerrar vista previa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Embedded or Iframe view */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-stone-50">
              <div className="bg-white p-6 rounded-2xl border border-stone-300 space-y-3">
                <h4 className="text-sm font-bold text-black uppercase tracking-wider">Descripción del Documento</h4>
                <p className="text-sm text-stone-800 leading-relaxed">{previewDoc.description}</p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#00795F] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#00A550]" />
                  <span>Documento oficial verificado de Health Green World</span>
                </div>
              </div>

              {/* Embedded PDF iframe viewer */}
              <div className="w-full aspect-4/3 bg-stone-900 rounded-2xl overflow-hidden border border-stone-300 relative">
                <iframe
                  src={`${previewDoc.url}#view=FitH`}
                  title={previewDoc.title}
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-white border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">¿Necesitas asesoría sobre este documento? Contáctanos.</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-black text-xs font-bold rounded-xl"
                >
                  Cerrar
                </button>
                <a
                  href={previewDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#00795F] hover:bg-[#004d3c] text-white text-xs font-black rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Archivo PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
