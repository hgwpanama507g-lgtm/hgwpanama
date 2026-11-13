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
import { getSeoMetadata } from './data/seoMetadata';

export const getPageTitle = (pathname: string): string => {
  return getSeoMetadata(pathname).title.replace(/ – HGW Panamá$/, '');
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

  // Update browser tab title and Open Graph social share metadata dynamically across all devices and crawlers
  useEffect(() => {
    const seo = getSeoMetadata(currentPath);
    document.title = seo.title;

    const updateMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let el = document.querySelector(`meta[${attr}="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', seo.description, true);
    updateMeta('og:title', seo.title);
    updateMeta('og:description', seo.description);
    updateMeta('og:url', seo.url);
    updateMeta('og:image', seo.image);
    updateMeta('og:type', seo.type);
    updateMeta('og:site_name', seo.siteName);
    updateMeta('twitter:card', 'summary_large_image', true);
    updateMeta('twitter:title', seo.title, true);
    updateMeta('twitter:description', seo.description, true);
    updateMeta('twitter:image', seo.image, true);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.url);
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
