import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

import { PRODUCTS } from './data/products';
import { HGW_DOCUMENTS } from './data/documents';

export const getPageTitle = (pathname: string): string => {
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  if (cleanPath === '/') {
    return 'Inicio';
  }
  if (cleanPath === '/productos' || cleanPath === '/catalogo') {
    return 'Catálogo de Productos';
  }
  if (cleanPath === '/membresias' || cleanPath === '/membresías') {
    return 'Planes de Membresía';
  }
  if (cleanPath === '/oportunidad-de-negocio' || cleanPath === '/oportunidad') {
    return 'Oportunidad de Negocio';
  }
  if (cleanPath === '/preregistro' || cleanPath === '/pre-registro') {
    return 'Pre-registro';
  }
  if (cleanPath === '/documentos' || cleanPath === '/documentos-pdf') {
    return 'Documentos y Catálogos Oficiales';
  }
  if (cleanPath === '/contacto') {
    return 'Contacto y Oficinas';
  }
  if (cleanPath === '/oficinas' || cleanPath === '/directorio-oficinas') {
    return 'Directorio de Oficinas LATAM';
  }

  // Check product paths: /producto/:slug or direct /:slug
  const productSlug = cleanPath.startsWith('/producto/')
    ? cleanPath.replace('/producto/', '')
    : cleanPath.startsWith('/productos/')
    ? cleanPath.replace('/productos/', '')
    : cleanPath.replace(/^\//, '');

  const product = PRODUCTS.find((p) => p.slug === productSlug || p.id === productSlug);
  if (product) {
    return product.name;
  }

  // Check document paths: /documentos/:slug
  if (cleanPath.startsWith('/documentos/')) {
    const docSlug = cleanPath.replace('/documentos/', '');
    const foundDoc = HGW_DOCUMENTS.find((d) => d.slug === docSlug || d.id === docSlug || d.url.includes(docSlug));
    if (foundDoc) {
      return foundDoc.title;
    }
  }

  // Fallback for valid Home paths
  if (cleanPath === '/' || cleanPath === '/inicio') {
    return 'Inicio';
  }

  return 'Página no encontrada';
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialPath = () => {
    const path = window.location.pathname;
    if (path === '/inicio') {
      window.history.replaceState(null, '', '/');
      return '/';
    }
    return path || '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser tab title dynamically in Yoast SEO format: Título de la página – Separador – Título del sitio
  useEffect(() => {
    const pageTitle = getPageTitle(currentPath);
    document.title = `${pageTitle} – HGW Panamá`;
  }, [currentPath]);

  const navigate = (to: string) => {
    if (to === currentPath) return;
    window.history.pushState(null, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, className, children, onClick, ...rest }) => {
  const { navigate, currentPath } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
      e.preventDefault();
      navigate(to);
    }
  };

  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      data-active={isActive ? 'true' : 'false'}
      {...rest}
    >
      {children}
    </a>
  );
};
