import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter, Navigate } from './router';
import { Navbar } from './components/Navbar';
import { NoticeBanner } from './components/NoticeBanner';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Memberships } from './components/Memberships';
import { AboutHGW } from './components/AboutHGW';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { ShippingAndReturnsSection } from './components/ShippingAndReturnsSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BusinessOpportunityPage } from './pages/BusinessOpportunityPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { PreRegistrationPage } from './pages/PreRegistrationPage';
import { OfficesDirectoryPage } from './pages/OfficesDirectoryPage';
import { InformationPage } from './pages/InformationPage';
import { ToothpastesLandingPage } from './pages/ToothpastesLandingPage';
import { PRODUCTS } from './data/products';
import { HGW_DOCUMENTS } from './data/documents';
import { findProductBySlug } from './data/seoMetadata';

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
    const cleanPath = (currentPath.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/').toLowerCase();

    // 1. Dedicated Product Detail Page (/producto/:slug or /productos/:slug)
    if (cleanPath.startsWith('/producto/') || cleanPath.startsWith('/productos/')) {
      const slug = cleanPath.replace(/^\/productos?\//, '');
      return <ProductDetailPage slug={slug} />;
    }

    // 2. Full Catalog Page (/productos)
    if (cleanPath === '/productos' || cleanPath === '/catalogo') {
      return (
        <div>
          <Catalog isHomeView={false} />
        </div>
      );
    }

    // 3. Memberships Page (/membresias or /membresías)
    if (cleanPath === '/membresias' || cleanPath === '/membresías') {
      return (
        <div>
          <Memberships />
          <AboutHGW />
        </div>
      );
    }

    // 4. Dedicated Business Opportunity Page (/oportunidad-de-negocio)
    if (cleanPath === '/oportunidad-de-negocio' || cleanPath === '/oportunidad') {
      return <BusinessOpportunityPage />;
    }

    // 5. Dedicated Pre-Registration Page (/preregistro or /pre-registro)
    if (cleanPath === '/preregistro' || cleanPath === '/pre-registro') {
      return <PreRegistrationPage />;
    }

    // 6. PDF Documents Library or Individual Document Detail Page
    if (cleanPath === '/documentos' || cleanPath === '/documentos-pdf') {
      return <DocumentsPage />;
    }
    if (cleanPath.startsWith('/documentos/')) {
      const docId = cleanPath.replace('/documentos/', '');
      return <DocumentDetailPage id={docId} />;
    }

    // 7. Offices Directory Page (/oficinas or /directorio-oficinas)
    if (cleanPath === '/oficinas' || cleanPath === '/directorio-oficinas') {
      return <OfficesDirectoryPage />;
    }

    // 8. Information Page on Arándanos, Turmalina, Café, Reishi
    if (['/informacion', '/propiedades', '/beneficios', '/ingredientes'].includes(cleanPath)) {
      return <InformationPage />;
    }

    // 8.1. Toothpastes Landing Page (/pastas-dentales or /pastas)
    if (['/pastas-dentales', '/pastas'].includes(cleanPath)) {
      return <ToothpastesLandingPage />;
    }

    // 9. Contact Page (/contacto)
    if (cleanPath === '/contacto') {
      return (
        <div>
          <ContactSection />
          <FAQ />
        </div>
      );
    }

    // 9.1. Shipping and Returns Page (/envios-y-devoluciones or /envios)
    if (cleanPath === '/envios-y-devoluciones' || cleanPath === '/envios') {
      return (
        <div className="py-12 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ShippingAndReturnsSection />
          </div>
        </div>
      );
    }

    // 10. Direct product fallback if route matches a product slug directly (e.g. /blueberry-coffee-hgw)
    const directSlug = cleanPath.replace(/^\//, '');
    if (findProductBySlug(directSlug)) {
      return <ProductDetailPage slug={directSlug} />;
    }

    // 11. Handle common WordPress legacy paths (redirect to Home)
    const legacyPaths = ['/wp-content', '/wp-admin', '/category/', '/tag/', '/author/', '/?p=', '/feed/'];
    if (legacyPaths.some(p => currentPath.toLowerCase().includes(p))) {
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
    if (cleanPath === '/' || cleanPath === '/inicio') {
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

    // Wildcard path="*" fallback redirecting to products catalog
    return <Navigate to="/productos" replace />;
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
