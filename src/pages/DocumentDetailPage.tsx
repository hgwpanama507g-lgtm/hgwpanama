import React, { useState, useEffect, useRef } from 'react';
import { FileText, Download, Eye, ExternalLink, ShieldCheck, ArrowLeft, ArrowRight, Share2, Sparkles, Check, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { HGW_DOCUMENTS, DocumentItem } from '../data/documents';
import { Link, useRouter } from '../router';

// Import pdfjs from pdfjs-dist
import * as pdfjsLib from 'pdfjs-dist';
// Set worker source to cdn version matching installed version 3.11.174
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface DocumentDetailPageProps {
  id: string;
}

export const DocumentDetailPage: React.FC<DocumentDetailPageProps> = ({ id }) => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);

  const doc = HGW_DOCUMENTS.find((d) => d.slug === id || d.id === id || d.url.includes(id));

  // PDF.js Viewer States
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Related documents from the same category
  const relatedDocs = doc
    ? HGW_DOCUMENTS.filter((d) => d.category === doc.category && d.id !== doc.id).slice(0, 3)
    : [];

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Load PDF with PDF.js
  useEffect(() => {
    if (!doc) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    // Using fetch to get blob and then loading with PDF.js
    const loadPdf = async () => {
      try {
        const response = await fetch(doc.url);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const loadingTask = pdfjsLib.getDocument(url);
        const loadedPdf = await loadingTask.promise;
        if (!isMounted) return;
        setPdfDoc(loadedPdf);
        setNumPages(loadedPdf.numPages);
        setPageNum(1);
        setLoading(false);
      } catch (err: any) {
        if (!isMounted) return;
        console.error('Error loading PDF:', err);
        setError('No se pudo cargar el archivo PDF en el visor interactivo. Por favor, intente descargarlo directamente.');
        setLoading(false);
      }
    };
    loadPdf();

    return () => {
      isMounted = false;
    };
  }, [doc]);

  // Render current page to canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isMounted = true;
    pdfDoc.getPage(pageNum).then((page: any) => {
      if (!isMounted || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      page.render(renderContext);
    });

    return () => {
      isMounted = false;
    };
  }, [pdfDoc, pageNum, scale]);

  const handlePrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleNextPage = () => {
    if (pageNum < numPages) setPageNum(pageNum + 1);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(2.5, prev + 0.25));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.6, prev - 0.25));
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

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                {doc.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-[#00795F] font-bold pt-1">
                <ShieldCheck className="w-4 h-4 text-[#00A550]" />
                <span>Documento oficial verificado de Health Green World (HGW)</span>
              </div>
            </div>

            {/* Actions: Download & Share */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#00795F] hover:bg-[#004d3c] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF ({doc.size})</span>
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

        {/* In-Page Interactive PDF Viewer Section (PDF.js Canvas) */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-extrabold text-black flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#00795F]" />
              <span>Visor PDF Integrado en la Página</span>
            </h2>

            {/* Viewer Toolbar Controls */}
            {numPages > 0 && (
              <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-300 shadow-2xs">
                <button
                  onClick={handlePrevPage}
                  disabled={pageNum <= 1}
                  className="p-2 bg-white hover:bg-stone-50 disabled:opacity-40 text-black rounded-xl font-bold text-xs flex items-center gap-1 shadow-2xs transition-all"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <span className="text-xs font-extrabold text-black px-2 tabular-nums">
                  {pageNum} de {numPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={pageNum >= numPages}
                  className="p-2 bg-white hover:bg-stone-50 disabled:opacity-40 text-black rounded-xl font-bold text-xs flex items-center gap-1 shadow-2xs transition-all"
                  aria-label="Página siguiente"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-stone-300 mx-1" />

                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-white hover:bg-stone-50 text-black rounded-xl shadow-2xs transition-all"
                  title="Reducir zoom"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-white hover:bg-stone-50 text-black rounded-xl shadow-2xs transition-all"
                  title="Ampliar zoom"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-300 shadow-2xl flex flex-col items-center justify-center min-h-[500px] relative p-4 sm:p-8">
            {loading && (
              <div className="flex flex-col items-center gap-3 text-white py-20">
                <Loader2 className="w-10 h-10 animate-spin text-[#00A550]" />
                <p className="text-sm font-bold">Cargando documento PDF interactivo...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-16 px-4 space-y-4 max-w-md mx-auto">
                <p className="text-amber-200 text-sm font-semibold">{error}</p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#00A550] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Archivo</span>
                </a>
              </div>
            )}

            <div className="w-full overflow-auto flex justify-center py-2">
              <canvas ref={canvasRef} className="max-w-full shadow-2xl rounded-lg bg-white" />
            </div>
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
                        {related.title}
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
