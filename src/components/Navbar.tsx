import React, { useState, useEffect, useMemo, useRef, useDeferredValue } from 'react';
import { Menu, X, Search, ArrowRight, FileText, Package, ExternalLink } from 'lucide-react';
import { Link, useRouter } from '../router';
import { PRODUCTS } from '../data/products';
import { HGW_DOCUMENTS } from '../data/documents';

const NAV_ITEMS = [
  { label: 'INICIO', hash: 'inicio' },
  { label: 'PRODUCTOS', hash: 'productos' },
  { label: 'SOBRE NOSOTROS', hash: 'sobre-nosotros' },
  { label: 'OPORTUNIDAD', hash: 'oportunidad' },
  { label: 'CONTACTO', hash: 'contacto' },
];

const QUICK_ROUTES = [
  { label: 'Catálogo Completo de Productos', href: '/productos' },
  { label: 'Pastas Dentales Sin Flúor', href: '/pastas-dentales' },
  { label: 'Membresías Oficiales HGW', href: '/membresias' },
  { label: 'Oportunidad de Negocio', href: '/oportunidad-de-negocio' },
  { label: 'Pre-registro y Video Tutorial', href: '/preregistro' },
  { label: 'Documentos PDF y Catálogos', href: '/documentos' },
  { label: 'Ingredientes e Información', href: '/informacion' },
  { label: 'Directorio de Oficinas LATAM', href: '/oficinas' },
  { label: 'Envíos y Devoluciones', href: '/envios-y-devoluciones' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [activeHash, setActiveHash] = useState('inicio');
  const { currentPath, navigate } = useRouter();

  const normalizedPath = (currentPath.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/').toLowerCase();
  const isHomePage = normalizedPath === '/' || normalizedPath === '/inicio';

  // Track active section while scrolling on the home page (rAF throttled to prevent mobile reflow lag)
  useEffect(() => {
    if (!isHomePage) return;

    let rafId: number | null = null;
    const updateActiveHash = () => {
      rafId = null;
      const scrollY = window.scrollY + 130;
      let current = 'inicio';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.hash);
        if (el && el.offsetTop <= scrollY) {
          current = item.hash;
        }
      }
      setActiveHash((prev) => (prev === current ? prev : current));
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateActiveHash);
    };

    updateActiveHash();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Gentle focus after modal mounts so mobile virtual keyboard opens smoothly without locking
  useEffect(() => {
    if (!searchOpen) return;
    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveHash(hash);
    navigate(`/#${hash}`);
  };

  const searchResults = useMemo(() => {
    const q = deferredSearchQuery.trim().toLowerCase();
    if (!q) {
      return {
        products: PRODUCTS.filter((p) => p.featured).slice(0, 6),
        documents: HGW_DOCUMENTS.slice(0, 3),
        routes: QUICK_ROUTES.slice(0, 4),
      };
    }

    return {
      products: PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.ingredients?.some((ing) => ing.toLowerCase().includes(q))
      ).slice(0, 8),
      documents: HGW_DOCUMENTS.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      ).slice(0, 4),
      routes: QUICK_ROUTES.filter((r) => r.label.toLowerCase().includes(q)),
    };
  }, [deferredSearchQuery]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#4472C4] text-white shadow-md border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
            
            {/* Left: Official Logo */}
            <a
              href="/#inicio"
              onClick={(e) => handleAnchorClick(e, 'inicio')}
              className="flex items-center shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xl"
              aria-label="HGW Panamá - Ir al inicio"
            >
              <div className="bg-white/98 px-2.5 py-1 rounded-xl shadow-xs group-hover:scale-102 transition-transform">
                <img
                  src="https://media.academiahgw.online/wp-content/uploads/2026/11/LOGO-HGW-PANAMA-DISTRIBUIDOR-INDEPENDIENTE.png"
                  alt="HGW Panamá - Distribuidor Independiente"
                  className="h-9 sm:h-11 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png";
                  }}
                />
              </div>
            </a>

            {/* Center: 5 Single-Line Navigation Links */}
            <nav
              aria-label="Navegación principal"
              className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-xs xl:text-sm font-bold tracking-wide"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = isHomePage && activeHash === item.hash;
                return (
                  <a
                    key={item.hash}
                    href={`/#${item.hash}`}
                    onClick={(e) => handleAnchorClick(e, item.hash)}
                    className={`whitespace-nowrap shrink-0 py-1.5 relative transition-all duration-200 ${
                      isActive
                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white'
                        : 'text-white/90 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-white/80 after:transition-all after:duration-200'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right: Search Icon Button + Mobile Hamburger */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Buscar productos y secciones"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                title="Buscar productos, membresías o documentos"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile / Tablet Hamburger Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white text-slate-900 border-t border-slate-200 shadow-2xl animate-fade-in max-h-[82vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = isHomePage && activeHash === item.hash;
                return (
                  <a
                    key={item.hash}
                    href={`/#${item.hash}`}
                    onClick={(e) => handleAnchorClick(e, item.hash)}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-[#EEF3FB] text-[#4472C4]'
                        : 'text-slate-800 hover:bg-slate-50 hover:text-[#4472C4]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className="pt-3 mt-3 border-t border-slate-200">
                <span className="px-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                  Acceso Directo al Sitio
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {QUICK_ROUTES.map((route) => (
                    <Link
                      key={route.href}
                      to={route.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#EEF3FB] hover:text-[#4472C4] transition-colors flex items-center justify-between"
                    >
                      <span>{route.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#4472C4]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Search Modal (GPU-light & mobile-keyboard safe) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 flex items-start justify-center pt-14 sm:pt-24 px-3 sm:px-4 overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-label="Buscador HGW Panamá"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Header */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchInputRef.current?.blur();
              }}
              className="p-3.5 sm:p-5 bg-[#4472C4] text-white flex items-center gap-2.5 sm:gap-3"
            >
              <Search className="w-5 h-5 shrink-0 text-white/90" />
              <input
                ref={searchInputRef}
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                autoCorrect="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos, membresías o guías..."
                className="flex-1 min-w-0 bg-transparent text-white placeholder:text-white/75 text-base font-medium focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold shrink-0 cursor-pointer"
                >
                  Limpiar
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Cerrar buscador"
                className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Search Results Body */}
            <div className="p-4 sm:p-6 max-h-[64dvh] overflow-y-auto overscroll-contain space-y-6">
              {/* Matching Products */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    {searchQuery ? 'Productos encontrados' : 'Productos destacados'}
                  </span>
                  <Link
                    to="/productos"
                    onClick={() => setSearchOpen(false)}
                    className="text-xs font-bold text-[#4472C4] hover:underline flex items-center gap-1"
                  >
                    <span>Ver todos ({PRODUCTS.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                {searchResults.products.length === 0 ? (
                  <p className="text-sm text-slate-500 py-2">
                    No se encontraron productos para &ldquo;{searchQuery}&rdquo;.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {searchResults.products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/producto/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-200 hover:border-[#4472C4] hover:bg-[#EEF3FB]/60 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#4472C4] truncate">
                            {product.name}
                          </div>
                          <div className="text-xs font-extrabold text-[#4472C4] tabular-nums">
                            {product.priceFormatted}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Matching Documents */}
              {searchResults.documents.length > 0 && (
                <div>
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2.5">
                    Catálogos y Documentos PDF
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.documents.map((doc) => (
                      <Link
                        key={doc.id}
                        to={`/documentos/${doc.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200 hover:border-[#4472C4] hover:bg-[#EEF3FB]/60 transition-all text-xs font-semibold text-slate-800"
                      >
                        <span className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-[#4472C4] shrink-0" />
                          <span className="truncate">{doc.title}</span>
                        </span>
                        <span className="text-[11px] font-bold text-[#4472C4] shrink-0">{doc.size}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Pages */}
              {searchResults.routes.length > 0 && (
                <div>
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2.5">
                    Secciones y Páginas
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {searchResults.routes.map((r) => (
                      <Link
                        key={r.href}
                        to={r.href}
                        onClick={() => setSearchOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-[#4472C4] text-slate-800 hover:text-white text-xs font-bold transition-colors"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>{r.label}</span>
                      </Link>
                    ))}
                    <a
                      href="https://www.healthgreenworld.com/?userName=Yamilka507"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EEF3FB] hover:bg-[#4472C4] text-[#4472C4] hover:text-white text-xs font-bold transition-colors"
                    >
                      <span>Portal Oficial HGW</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
