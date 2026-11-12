import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { Link, useRouter } from '../router';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath } = useRouter();

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Productos', href: '/productos' },
    { label: 'Membresías', href: '/membresias' },
    { label: 'Oportunidad de Negocio', href: '/oportunidad-de-negocio' },
    { label: 'Pre-Registro', href: '/preregistro' },
    { label: 'Documentos PDF', href: '/documentos' },
    { label: 'Contacto', href: '/contacto' },
  ];

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
                // Fallback to secondary logo if network hiccup
                (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png";
              }}
            />
          </Link>

          {/* Zone 2: Concise single-line navigation links with increased font size & pure dark text */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-bold text-black">
            {navLinks.map((link) => {
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
          </nav>

          {/* Zone 3: Direct WhatsApp Phone & Order Cart Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* WhatsApp direct callout */}
            <a
              href={getAffiliationWhatsAppUrl()}
              onClick={(e) => {
                if (typeof window !== 'undefined') {
                  e.currentTarget.href = getAffiliationWhatsAppUrl(window.location.href);
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#00A550] hover:bg-[#008f44] rounded-xl shadow-xs transition-all whitespace-nowrap active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+507 6778-8375</span>
            </a>

            {/* Cart trigger button */}
            <button
              onClick={onOpenCart}
              aria-label="Abrir pedido"
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#00795F] hover:bg-[#004d3c] rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Mi Pedido</span>
              {cartCount > 0 && (
                <span className="bg-[#00A550] text-white text-xs font-black px-2 py-0.5 rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:text-[#00795F] rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
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
            <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col gap-2">
              <a
                href={getAffiliationWhatsAppUrl()}
                onClick={(e) => {
                  if (typeof window !== 'undefined') {
                    e.currentTarget.href = getAffiliationWhatsAppUrl(window.location.href);
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#00A550] hover:bg-[#008f44] rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Distribuidor (+507 6778-8375)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
