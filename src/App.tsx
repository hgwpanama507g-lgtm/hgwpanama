import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './router';
import { Navbar } from './components/Navbar';
import { NoticeBanner } from './components/NoticeBanner';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Memberships } from './components/Memberships';
import { AboutHGW } from './components/AboutHGW';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BusinessOpportunityPage } from './pages/BusinessOpportunityPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { PreRegistrationPage } from './pages/PreRegistrationPage';
import { OfficesDirectoryPage } from './pages/OfficesDirectoryPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PRODUCTS } from './data/products';
import { HGW_DOCUMENTS } from './data/documents';

function AppContent() {
  const { currentPath } = useRouter();

  // Web Protection: Prevent right-click, copy, cut, and common devtools shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+V, Ctrl+U (view source), Ctrl+Shift+I (inspect), Ctrl+S, Ctrl+P, Ctrl+X
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'v', 'u', 's', 'p', 'x'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }

      // Prevent F12 and Ctrl+Shift+I/J/C
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
    };
  }, []);

  // Determine current view from route
  const renderRouteView = () => {
    // 1. Dedicated Product Detail Page (/producto/:slug or /productos/:slug)
    if (currentPath.startsWith('/producto/') || currentPath.startsWith('/productos/')) {
      const slug = currentPath.replace(/^\/productos?\//, '').split('?')[0].split('#')[0];
      return <ProductDetailPage slug={slug} />;
    }

    // 2. Full Catalog Page (/productos)
    if (currentPath === '/productos' || currentPath === '/catalogo') {
      return (
        <div>
          <Catalog isHomeView={false} />
        </div>
      );
    }

    // 3. Memberships Page (/membresias or /membresías)
    if (currentPath === '/membresias' || currentPath === '/membresías') {
      return (
        <div>
          <Memberships />
          <AboutHGW />
        </div>
      );
    }

    // 4. Dedicated Business Opportunity Page (/oportunidad-de-negocio)
    if (currentPath === '/oportunidad-de-negocio' || currentPath === '/oportunidad') {
      return <BusinessOpportunityPage />;
    }

    // 5. Dedicated Pre-Registration Page (/preregistro or /pre-registro)
    if (currentPath === '/preregistro' || currentPath === '/pre-registro') {
      return <PreRegistrationPage />;
    }

    // 6. PDF Documents Library or Individual Document Detail Page
    if (currentPath === '/documentos' || currentPath === '/documentos-pdf') {
      return <DocumentsPage />;
    }
    if (currentPath.startsWith('/documentos/')) {
      const docId = currentPath.replace('/documentos/', '').split('?')[0].split('#')[0];
      return <DocumentDetailPage id={docId} />;
    }

    // 7. Offices Directory Page (/oficinas or /directorio-oficinas)
    if (currentPath === '/oficinas' || currentPath === '/directorio-oficinas') {
      return <OfficesDirectoryPage />;
    }

    // 8. Contact Page (/contacto)
    if (currentPath === '/contacto') {
      return (
        <div>
          <ContactSection />
          <FAQ />
        </div>
      );
    }

    // 9. Direct product fallback if route matches a product slug directly (e.g. /blueberry-coffee-hgw)
    const directSlug = currentPath.replace(/^\//, '').split('?')[0].split('#')[0];
    if (PRODUCTS.some((p) => p.slug === directSlug || p.id === directSlug)) {
      return <ProductDetailPage slug={directSlug} />;
    }

    // 10. Handle common WordPress legacy paths (redirect to Home)
    const legacyPaths = ['/wp-content', '/wp-admin', '/category/', '/tag/', '/author/', '/?p=', '/feed/'];
    if (legacyPaths.some(p => currentPath.includes(p))) {
      return (
        <div>
          <Hero />
          <Catalog isHomeView={true} />
          <Memberships />
          <AboutHGW />
          <FAQ />
          <ContactSection />
        </div>
      );
    }

    // Default / Home View (/ or /inicio)
    if (currentPath === '/' || currentPath === '/inicio') {
      return (
        <div>
          <Hero />
          <Catalog isHomeView={true} />
          <Memberships />
          <AboutHGW />
          <FAQ />
          <ContactSection />
        </div>
      );
    }

    // Explicit 404 for all other unknown routes
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans antialiased selection:bg-[#00795F] selection:text-white">
      {/* 1. Mandatory Independent Distributor Disclaimer Banner */}
      <NoticeBanner />

      {/* 2. Top Bar Navigation with Official Logo and Links */}
      <Navbar />

      {/* 3. Main Route Content */}
      <main className="flex-1">
        {renderRouteView()}
      </main>

      {/* 4. Footer with Legal, Health Disclaimers & Official Links */}
      <Footer />

      {/* 5. Floating WhatsApp Button for Quick Mobile Chat */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
