import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter, Navigate } from './router';
import { Navbar } from './components/Navbar';
import { NoticeBanner } from './components/NoticeBanner';
import { LandingPage } from './components/LandingPage';
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
import { ToolsPage } from './pages/ToolsPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { PRODUCTS } from './data/products';
import { HGW_DOCUMENTS } from './data/documents';
import { findProductBySlug } from './data/seoMetadata';
import {
  AdsterraBanner,
  AdsterraResponsiveBanner,
  AdsterraDesktopSidebarBanner,
  AdsterraNativeBanner,
  AdsterraSmartlinkCard,
  AdsterraGlobalScripts
} from './components/AdsterraAds';

function AppContent() {
  const { currentPath } = useRouter();

  // Web Protection: Prevent right-click, copy, cut, and common devtools shortcuts (except inside private /herramientas)
  useEffect(() => {
    const isPrivateToolsRoute = () =>
      (window.location.pathname.replace(/\/+$/, '') || '/').toLowerCase() === '/herramientas';

    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (isPrivateToolsRoute() || isEditableTarget(e.target)) return;
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPrivateToolsRoute() || isEditableTarget(e.target)) return;

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
      if (isPrivateToolsRoute() || isEditableTarget(e.target)) return;
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
          <AdsterraResponsiveBanner key="catalog-top-banner" className="bg-white border-b border-stone-100" />
          <div className="2xl:flex 2xl:items-start 2xl:justify-center 2xl:gap-6 2xl:px-6 bg-white">
            <div className="flex-1 min-w-0">
              <Catalog isHomeView={false} />
            </div>
            <AdsterraDesktopSidebarBanner format="160x600" className="pt-12 pr-2" />
          </div>
          <AdsterraSmartlinkCard className="bg-white" />
        </div>
      );
    }

    // 3. Memberships Page (/membresias or /membresías)
    if (cleanPath === '/membresias' || cleanPath === '/membresías') {
      return (
        <div>
          <Memberships />
          <div className="bg-white py-6 border-b border-stone-100 px-2 sm:px-6">
            <AdsterraBanner format="300x250" />
          </div>
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
      return (
        <div>
          <AdsterraResponsiveBanner key="docs-top-banner" className="bg-white border-b border-stone-100" />
          <DocumentsPage />
          <AdsterraSmartlinkCard className="bg-white" />
        </div>
      );
    }
    if (cleanPath.startsWith('/documentos/')) {
      const docId = cleanPath.replace('/documentos/', '');
      return (
        <div>
          <DocumentDetailPage id={docId} />
          <AdsterraNativeBanner key={`native-${cleanPath}`} />
        </div>
      );
    }

    // 7. Offices Directory Page (/oficinas or /directorio-oficinas)
    if (cleanPath === '/oficinas' || cleanPath === '/directorio-oficinas') {
      return (
        <div>
          <OfficesDirectoryPage />
          <div className="bg-stone-50 pb-10 px-2 sm:px-6">
            <AdsterraBanner format="300x250" />
          </div>
        </div>
      );
    }

    // 8. Information Page on Arándanos, Turmalina, Café, Reishi
    if (['/informacion', '/propiedades', '/beneficios', '/ingredientes'].includes(cleanPath)) {
      return (
        <div className="bg-white">
          <div className="2xl:flex 2xl:items-start 2xl:justify-center 2xl:gap-6 2xl:px-6">
            <div className="flex-1 min-w-0">
              <InformationPage />
            </div>
            <AdsterraDesktopSidebarBanner format="160x300" className="pt-16 pr-2" />
          </div>
          <AdsterraNativeBanner key={`native-${cleanPath}`} />
        </div>
      );
    }

    // 8.1. Toothpastes Landing Page (/pastas-dentales or /pastas)
    if (['/pastas-dentales', '/pastas'].includes(cleanPath)) {
      return (
        <div>
          <ToothpastesLandingPage />
          <AdsterraNativeBanner key={`native-${cleanPath}`} />
        </div>
      );
    }

    // 9. Contact Page (/contacto)
    if (cleanPath === '/contacto') {
      return (
        <div>
          <ContactSection showExtendedNotices={true} />
          <FAQ />
        </div>
      );
    }

    // 9.2. Shipping and Returns Page (/envios-y-devoluciones or /envios)
    if (cleanPath === '/envios-y-devoluciones' || cleanPath === '/envios') {
      return (
        <div className="py-12 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ShippingAndReturnsSection />
          </div>
        </div>
      );
    }

    // 9.2. Private Training Section (/herramientas - not linked in navigation or sitemap)
    if (cleanPath === '/herramientas') {
      return <ToolsPage />;
    }

    // 9.3. Admin Panel (/admin)
    if (cleanPath === '/admin') {
      return <AdminPanelPage />;
    }

    // 9.4. Knowledge Base (/base-de-conocimiento)
    if (cleanPath === '/base-de-conocimiento' || cleanPath === '/base-conocimiento' || cleanPath === '/conocimiento') {
      return <KnowledgeBasePage />;
    }
    if (cleanPath.startsWith('/base-de-conocimiento/') || cleanPath.startsWith('/base-conocimiento/')) {
      const articleSlug = cleanPath.replace(/^\/base-(?:de-)?conocimiento\//, '').split('?')[0].split('#')[0];
      return <KnowledgeBasePage articleIdentifier={articleSlug} />;
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
          <LandingPage />
          <ContactSection />
          <AdsterraNativeBanner key="legacy-home-native" />
        </div>
      );
    }

    // Default / Home View (/ or /inicio)
    if (cleanPath === '/' || cleanPath === '/inicio') {
      return (
        <div>
          <LandingPage />
          <ContactSection />
          <AdsterraNativeBanner key="home-native" />
        </div>
      );
    }

    // Wildcard path="*" fallback redirecting to products catalog
    return <Navigate to="/productos" replace />;
  };

  const legacyHomePaths = ['/wp-content', '/wp-admin', '/category/', '/tag/', '/author/', '/?p=', '/feed/'];
  const normalizedRoute = (currentPath.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/').toLowerCase();
  const isHomeRoute =
    normalizedRoute === '/' ||
    normalizedRoute === '/inicio' ||
    legacyHomePaths.some((p) => currentPath.toLowerCase().includes(p));
  const directProductSlug = normalizedRoute.replace(/^\//, '');
  const isIndividualProductRoute =
    normalizedRoute.startsWith('/producto/') ||
    normalizedRoute.startsWith('/productos/') ||
    Boolean(findProductBySlug(directProductSlug));
  const isLandingWithoutNotices =
    isHomeRoute ||
    normalizedRoute === '/pastas-dentales' ||
    normalizedRoute === '/pastas' ||
    isIndividualProductRoute;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-[#4472C4] selection:text-white">
      {/* 1. Fixed Blue Top Bar Navigation (Section 1) */}
      <Navbar />

      {/* 2. Main Route Content with top spacing for fixed header */}
      <main className="flex-1 pt-16 sm:pt-20">
        {!isLandingWithoutNotices && <NoticeBanner />}
        {renderRouteView()}
      </main>

      {/* 3. Footer with Legal, Health Disclaimers & Blue Copyright Strip (Section 16) */}
      <Footer isHomePage={isLandingWithoutNotices} />

      {/* 4. Floating WhatsApp Button for Quick Mobile Chat */}
      <FloatingWhatsApp />

      {/* 5. Global Adsterra Popunder & Social Bar (once globally, excluding sensitive routes) */}
      <AdsterraGlobalScripts currentPath={currentPath} />
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
