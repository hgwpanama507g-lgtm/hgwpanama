import React, { useState } from 'react';
import { FileText, Download, Eye, ShieldCheck, ArrowLeft, ArrowRight, Share2, Sparkles, Check } from 'lucide-react';
import { HGW_DOCUMENTS } from '../data/documents';
import { Link } from '../router';

interface DocumentDetailPageProps {
  id: string;
}

export const DocumentDetailPage: React.FC<DocumentDetailPageProps> = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const doc = HGW_DOCUMENTS.find((d) => d.slug === id || d.id === id || d.url.includes(id));

  // Related documents from the same category
  const relatedDocs = doc
    ? HGW_DOCUMENTS.filter((d) => d.category === doc.category && d.id !== doc.id).slice(0, 3)
    : [];

  const viewerRef = React.useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToViewer = () => {
    viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!doc) {
    return (
      <div className="py-20 text-center bg-stone-50">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <FileText className="w-16 h-16 text-stone-400 mx-auto" />
          <h2 className="text-2xl font-black text-black">Documento no encontrado</h2>
          <p className="text-sm text-stone-600">
            El documento PDF que buscas no existe o ha sido trasladado.
          </p>
          <Link
            to="/documentos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00795F] text-white font-bold text-xs rounded-xl shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Regresar a la Biblioteca PDF</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/inicio" className="hover:text-[#00795F] transition-colors">
            Inicio
          </Link>
          <span className="text-stone-400">/</span>
          <Link to="/documentos" className="hover:text-[#00795F] transition-colors">
            Biblioteca PDF
          </Link>
          <span className="text-stone-400">/</span>
          <span className="text-[#00795F]">{doc.categoryLabel}</span>
          <span className="text-stone-400">/</span>
          <span className="text-black font-bold truncate max-w-xs">{doc.title}</span>
        </nav>

        {/* Header Back Button */}
        <div className="mb-6">
          <Link
            to="/documentos"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#00795F] bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a todos los documentos</span>
          </Link>
        </div>

        {/* Main Document Card Header */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-[#00795F] text-xs font-black rounded-lg uppercase tracking-wider">
                  {doc.categoryLabel}
                </span>
                <span className="text-xs font-mono font-bold text-stone-600 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                  Archivo PDF · {doc.size}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
                {doc.title}
              </h1>

              <p className="text-[18px] text-stone-700 leading-relaxed font-normal">
                {doc.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-[#00795F] font-bold pt-1">
                <ShieldCheck className="w-4 h-4 text-[#00A550]" />
                <span>Documento oficial verificado de Health Green World (HGW)</span>
              </div>
            </div>

            {/* Actions: View & Download */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={scrollToViewer}
                className="px-6 py-3.5 bg-[#00795F] hover:bg-[#004d3c] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 text-center uppercase"
              >
                <Eye className="w-4 h-4" />
                <span>VER PDF</span>
              </button>

              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-stone-900 hover:bg-black text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 text-center uppercase"
              >
                <Download className="w-4 h-4" />
                <span>DESCARGAR PDF</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="px-6 py-2.5 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-[#00795F]" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? '¡Enlace copiado!' : 'Compartir Enlace'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* In-Page Document Cover Section */}
        <div className="mb-14">
          <h2 className="text-xl font-extrabold text-black mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00795F]" />
            <span>Portada del Documento</span>
          </h2>
          <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 flex justify-center">
            {doc.coverImageUrl ? (
              <div className="w-full max-w-lg aspect-video overflow-hidden rounded-xl shadow-lg">
                <img 
                   src={doc.coverImageUrl} 
                   alt={`Portada de ${doc.title}`} 
                   className="w-full h-full object-cover"
                 />
               </div>
            ) : (
               <div className="text-center py-8">
                 <FileText className="w-12 h-12 text-stone-300 mx-auto" />
               </div>
            )}
          </div>
        </div>

        {/* In-Page Interactive PDF Viewer Section */}
        <div ref={viewerRef} className="mb-14 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-extrabold text-black flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#00795F]" />
              <span>LECTURA COMPLETA DEL DOCUMENTO (PDF)</span>
            </h2>
          </div>

          <div className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-300 shadow-2xl flex flex-col items-center justify-center min-h-[600px] sm:min-h-[800px] relative p-1 sm:p-2">
            <iframe
              src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(doc.url)}`}
              title={doc.title}
              className="w-full h-full min-h-[600px] sm:min-h-[800px] border-0"
              allowFullScreen
            />
          </div>
        </div>

        {/* Related Documents Section */}
        {relatedDocs.length > 0 && (
          <div className="pt-8 border-t border-stone-200">
            <h2 className="text-xl font-extrabold text-black mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00A550]" />
              <span>Documentos Relacionados en {doc.categoryLabel}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedDocs.map((related) => {
                const relatedUrl = `/documentos/${related.slug}`;
                return (
                  <div
                    key={related.id}
                    className="bg-stone-50 rounded-2xl p-5 border border-stone-200 hover:border-[#00795F] hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#00795F] uppercase bg-white px-2 py-0.5 rounded-md border border-stone-200 inline-block mb-2">
                        PDF ({related.size})
                      </span>
                      <h3 className="text-sm font-extrabold text-black group-hover:text-[#00795F] transition-colors leading-snug line-clamp-2 mb-2">
                        <Link to={relatedUrl} title={related.title}>
                          {related.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {related.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between">
                      <Link
                        to={relatedUrl}
                        className="text-xs font-bold text-[#00795F] hover:underline flex items-center gap-1"
                      >
                        <span>Ver documento</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <a
                        href={related.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-stone-700 hover:text-black flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
