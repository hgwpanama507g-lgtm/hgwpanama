import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useRouter } from '../router';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [docsDropdownOpen, setDocsDropdownOpen] = useState(false);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  const docsDropdownRef = useRef<HTMLDivElement>(null);
  const { currentPath } = useRouter();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setContactDropdownOpen(false);
      }
      if (docsDropdownRef.current && !docsDropdownRef.current.contains(event.target as Node)) {
        setDocsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productsLinks = [
    { label: 'Catálogo de Productos', href: '/productos' },
    { label: 'Membresías', href: '/membresias' },
  ];

  const mainLinks = [
    { label: 'Pastas Dentales', href: '/pastas-dentales' },
    { label: 'Oportunidad de Negocio', href: '/oportunidad-de-negocio' },
    { label: 'Pre-registro', href: '/preregistro' },
  ];

  const docsLinks = [
    { label: 'Todos los Documentos PDF', href: '/documentos' },
    { label: 'Materias Primas e Ingredientes', href: '/informacion' },
  ];

  const contactLinks = [
    { label: 'Contacto y Envíos', href: '/contacto' },
    { label: 'Oficinas HGW LATAM', href: '/oficinas' },
  ];

  const isProductsActive =
    currentPath === '/productos' ||
    currentPath === '/catalogo' ||
    currentPath.startsWith('/producto/') ||
    currentPath === '/membresias' ||
    currentPath === '/membresías';

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-stone-300 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20 sm:h-22">
          
          {/* Zone 1: Official Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="https://media.academiahgw.online/wp-content/uploads/2026/11/LOGO-HGW-PANAMA-DISTRIBUIDOR-INDEPENDIENTE.png"
              alt="HGW Panamá - Distribuidor Independiente"
              className="h-12 sm:h-14 w-auto object-contain group-hover:scale-102 transition-transform"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png";
              }}
            />
          </Link>

          {/* Zone 2: Navigation links with Productos, Documentos & Contact Submenus */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-bold text-black">
            <Link
              to="/"
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                currentPath === '/'
                  ? 'text-[#00795F] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#00795F]'
                  : 'text-stone-900 hover:text-[#00795F]'
              }`}
            >
              Inicio
            </Link>

            {/* Productos Submenu (includes Membresías) */}
            <div className="relative" ref={productsDropdownRef}>
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer outline-none ${
                  isProductsActive
                    ? 'text-[#00795F]'
                    : 'text-stone-900 hover:text-[#00795F]'
                }`}
              >
                <span>Productos</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-stone-200 rounded-2xl shadow-xl py-3 animate-fade-in slide-in-top">
                  {productsLinks.map((sublink) => (
                    <Link
                      key={sublink.href}
                      to={sublink.href}
                      onClick={() => setProductsDropdownOpen(false)}
                      className={`block px-5 py-2.5 text-sm transition-colors ${
                        currentPath === sublink.href
                          ? 'bg-emerald-50 text-[#00795F]'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-[#00795F]'
                      }`}
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {mainLinks.map((link) => {
              const isActive = currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#00795F] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#00795F]'
                      : 'text-stone-900 hover:text-[#00795F]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Documentos PDF Submenu */}
            <div className="relative" ref={docsDropdownRef}>
              <button
                onClick={() => setDocsDropdownOpen(!docsDropdownOpen)}
                className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer outline-none ${
                  docsLinks.some(l => currentPath === l.href)
                    ? 'text-[#00795F]'
                    : 'text-stone-900 hover:text-[#00795F]'
                }`}
              >
                <span>Documentos PDF</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${docsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {docsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-stone-200 rounded-2xl shadow-xl py-3 animate-fade-in slide-in-top">
                  {docsLinks.map((sublink) => (
                    <Link
                      key={sublink.href}
                      to={sublink.href}
                      onClick={() => setDocsDropdownOpen(false)}
                      className={`block px-5 py-2.5 text-sm transition-colors ${
                        currentPath === sublink.href
                          ? 'bg-emerald-50 text-[#00795F]'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-[#00795F]'
                      }`}
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Submenu */}
            <div className="relative" ref={contactDropdownRef}>
              <button
                onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer outline-none ${
                  contactLinks.some(l => currentPath === l.href)
                    ? 'text-[#00795F]'
                    : 'text-stone-900 hover:text-[#00795F]'
                }`}
              >
                <span>Contacto</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${contactDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {contactDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl py-3 animate-fade-in slide-in-top">
                  {contactLinks.map((sublink) => (
                    <Link
                      key={sublink.href}
                      to={sublink.href}
                      onClick={() => setContactDropdownOpen(false)}
                      className={`block px-5 py-2.5 text-sm transition-colors ${
                        currentPath === sublink.href
                          ? 'bg-emerald-50 text-[#00795F]'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-[#00795F]'
                      }`}
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:text-[#00795F] rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fade-in overflow-y-auto max-h-[85vh]">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 text-base font-bold rounded-xl transition-colors ${
                currentPath === '/' ? 'bg-emerald-50 text-[#00795F]' : 'text-stone-900 hover:text-[#00795F]'
              }`}
            >
              Inicio
            </Link>

            {/* Mobile Productos Submenu (with Membresías) */}
            <div>
              <button
                type="button"
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                aria-expanded={mobileProductsOpen}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-base font-bold rounded-xl transition-colors ${
                  isProductsActive ? 'bg-emerald-50 text-[#00795F]' : 'text-stone-900 hover:text-[#00795F]'
                }`}
              >
                <span>Productos</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileProductsOpen && (
                <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-emerald-200 ml-3">
                  {productsLinks.map((sublink) => {
                    const isActive = currentPath === sublink.href;
                    return (
                      <Link
                        key={sublink.href}
                        to={sublink.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileProductsOpen(false);
                        }}
                        className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors block ${
                          isActive ? 'bg-emerald-50 text-[#00795F]' : 'text-stone-700 hover:text-[#00795F]'
                        }`}
                      >
                        {sublink.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {mainLinks.map((link) => {
              const isActive = currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-base font-bold rounded-xl transition-colors ${
                    isActive ? 'bg-emerald-50 text-[#00795F]' : 'text-stone-900 hover:text-[#00795F]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Mobile Documents Group */}
            <div className="mt-2 pt-2 border-t border-stone-100">
              <span className="px-3 text-[11px] font-black text-stone-400 uppercase tracking-widest block mb-2">Documentos PDF</span>
              {docsLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 text-base font-bold rounded-xl transition-colors block ${
                      isActive ? 'bg-emerald-50 text-[#00795F]' : 'text-stone-900 hover:text-[#00795F]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Contact Group */}
            <div className="mt-2 pt-2 border-t border-stone-100">
              <span className="px-3 text-[11px] font-black text-stone-400 uppercase tracking-widest block mb-2">Contacto</span>
              {contactLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 text-base font-bold rounded-xl transition-colors block ${
                      isActive ? 'bg-emerald-50 text-[#00795F]' : 'text-stone-900 hover:text-[#00795F]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
