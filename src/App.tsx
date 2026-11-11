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
import { CartDrawer, CartItem } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BusinessOpportunityPage } from './pages/BusinessOpportunityPage';
import { Product } from './data/products';

function AppContent() {
  const { currentPath } = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hgw_panama_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hgw_panama_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Determine current view from route
  const renderRouteView = () => {
    // 1. Dedicated Product Detail Page (/producto/:slug)
    if (currentPath.startsWith('/producto/')) {
      const slug = currentPath.replace('/producto/', '').split('?')[0].split('#')[0];
      return <ProductDetailPage slug={slug} onAddToCart={handleAddToCart} />;
    }

    // 2. Full Catalog Page (/productos)
    if (currentPath === '/productos') {
      return (
        <div>
          <Catalog onAddToCart={(product) => handleAddToCart(product, 1)} isHomeView={false} />
        </div>
      );
    }

    // 3. Memberships Page (/membresias)
    if (currentPath === '/membresias') {
      return (
        <div>
          <Memberships />
          <AboutHGW />
        </div>
      );
    }

    // 4. Dedicated Business Opportunity & Preregistration Page (/oportunidad-de-negocio)
    if (currentPath === '/oportunidad-de-negocio') {
      return <BusinessOpportunityPage />;
    }

    // 5. Contact Page (/contacto)
    if (currentPath === '/contacto') {
      return (
        <div>
          <ContactSection />
          <FAQ />
        </div>
      );
    }

    // Default / Home View (/ or /inicio)
    return (
      <div>
        <Hero />
        <Catalog onAddToCart={(product) => handleAddToCart(product, 1)} isHomeView={true} />
        <Memberships />
        <AboutHGW />
        <FAQ />
        <ContactSection />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans antialiased selection:bg-[#00795F] selection:text-white">
      {/* 1. Mandatory Independent Distributor Disclaimer Banner */}
      <NoticeBanner />

      {/* 2. Top Bar Navigation with Official Logo and Links */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 3. Main Route Content */}
      <main className="flex-1">
        {renderRouteView()}
      </main>

      {/* 4. Footer with Legal, Health Disclaimers & Official Links */}
      <Footer />

      {/* 5. Slide-Over Cart & Order Builder Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 6. Floating WhatsApp Button for Quick Mobile Chat */}
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
