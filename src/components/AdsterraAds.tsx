import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

export type AdsterraBannerFormat =
  | '160x300'
  | '160x600'
  | '300x250'
  | '320x50'
  | '468x60'
  | '728x90';

interface BannerConfig {
  key: string;
  format: 'iframe';
  height: number;
  width: number;
  params: Record<string, unknown>;
  src: string;
}

export const ADSTERRA_BANNERS: Record<AdsterraBannerFormat, BannerConfig> = {
  '160x300': {
    key: '3ece647a112b6c3a6c7c696bc5cc5d6f',
    format: 'iframe',
    height: 300,
    width: 160,
    params: {},
    src: 'https://bicea.org/22/3ece647a112b6c3a6c7c696bc5cc5d6f',
  },
  '160x600': {
    key: '6a710674a167b336c3ee622af45f35e1',
    format: 'iframe',
    height: 600,
    width: 160,
    params: {},
    src: 'https://bicea.org/22/6a710674a167b336c3ee622af45f35e1',
  },
  '300x250': {
    key: 'dca759915d4594a7a4c27717ac2a2f4b',
    format: 'iframe',
    height: 250,
    width: 300,
    params: {},
    src: 'https://bicea.org/22/dca759915d4594a7a4c27717ac2a2f4b',
  },
  '320x50': {
    key: '5a40c2a78b9c0c6f107fb4f754b1b517',
    format: 'iframe',
    height: 50,
    width: 320,
    params: {},
    src: 'https://bicea.org/22/5a40c2a78b9c0c6f107fb4f754b1b517',
  },
  '468x60': {
    key: 'ca032e01fe9244d999ff8ed787cb9e3c',
    format: 'iframe',
    height: 60,
    width: 468,
    params: {},
    src: 'https://bicea.org/22/ca032e01fe9244d999ff8ed787cb9e3c',
  },
  '728x90': {
    key: '640b6d053013510ffa22029e50c09bc3',
    format: 'iframe',
    height: 90,
    width: 728,
    params: {},
    src: 'https://bicea.org/22/640b6d053013510ffa22029e50c09bc3',
  },
};

export const ADSTERRA_NATIVE_BANNER = {
  src: 'https://bicea.org/21/6fb241525ccde02bdfe7f35287de8838',
  containerId: 'container-6fb241525ccde02bdfe7f35287de8838',
} as const;

export const ADSTERRA_POPUNDER_SRC =
  'https://afders.org/1/9914fddda5b80b57d97dcd32463e6533';

export const ADSTERRA_SOCIAL_BAR_SRC =
  'https://bicea.org/14/222cdd26ba0f68d13b4caea09a53e5b6';

export const ADSTERRA_SMARTLINK_URL =
  'https://arwf.org/4/8a8832199d28d6896a5ae444a0c422c6';

const SENSITIVE_ROUTE_PREFIXES = [
  '/contacto',
  '/preregistro',
  '/pre-registro',
  '/oportunidad-de-negocio',
  '/oportunidad',
  '/envios-y-devoluciones',
  '/envios',
  '/herramientas',
  '/admin',
];

export function isSensitiveAdRoute(pathname: string): boolean {
  const clean = (pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/').toLowerCase();
  return SENSITIVE_ROUTE_PREFIXES.some(
    (prefix) => clean === prefix || clean.startsWith(`${prefix}/`)
  );
}

// Serialize banner loads so global window.atOptions is never overwritten concurrently
let bannerLoadQueue: Promise<void> = Promise.resolve();

function enqueueBannerLoad(task: () => Promise<void>): Promise<void> {
  const next = bannerLoadQueue.then(task, task);
  bannerLoadQueue = next.catch(() => undefined);
  return next;
}

interface AdsterraBannerProps {
  format: AdsterraBannerFormat;
  className?: string;
}

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({ format, className = '' }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const config = ADSTERRA_BANNERS[format];
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    if (shouldLoad) return;
    const target = wrapperRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const el = containerRef.current;
    if (!el) return;

    const currentConfig = ADSTERRA_BANNERS[format];
    let cancelled = false;
    el.innerHTML = '';

    enqueueBannerLoad(
      () =>
        new Promise<void>((resolve) => {
          if (cancelled || !containerRef.current) {
            resolve();
            return;
          }

          let settled = false;
          const finish = () => {
            if (!settled) {
              settled = true;
              resolve();
            }
          };

          const safetyTimer = window.setTimeout(finish, 4000);

          try {
            window.atOptions = {
              key: currentConfig.key,
              format: currentConfig.format,
              height: currentConfig.height,
              width: currentConfig.width,
              params: { ...currentConfig.params },
            };

            const script = document.createElement('script');
            script.src = currentConfig.src;
            script.async = true;
            script.setAttribute('data-adsterra-banner', format);
            script.onload = () => {
              window.clearTimeout(safetyTimer);
              finish();
            };
            script.onerror = () => {
              window.clearTimeout(safetyTimer);
              finish();
            };

            containerRef.current.appendChild(script);
          } catch {
            window.clearTimeout(safetyTimer);
            finish();
          }
        })
    );

    return () => {
      cancelled = true;
      if (el) {
        el.innerHTML = '';
      }
    };
  }, [format, shouldLoad]);

  return (
    <div
      ref={wrapperRef}
      className={`flex flex-col items-center justify-center max-w-full overflow-hidden ${className}`}
      aria-label="Espacio publicitario"
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-1 select-none">
        Publicidad
      </span>
      <div
        ref={containerRef}
        style={{ minHeight: `${config.height}px`, width: `${config.width}px`, maxWidth: '100%' }}
        className="flex items-center justify-center overflow-hidden"
      />
    </div>
  );
};

interface AdsterraResponsiveBannerProps {
  className?: string;
  variant?: 'leaderboard' | 'in-content';
}

export const AdsterraResponsiveBanner: React.FC<AdsterraResponsiveBannerProps> = ({
  className = '',
  variant = 'leaderboard',
}) => {
  const [format, setFormat] = useState<AdsterraBannerFormat | null>(null);

  useEffect(() => {
    const pickFormat = () => {
      const width = window.innerWidth;
      if (variant === 'in-content') {
        setFormat(width >= 780 ? '728x90' : '300x250');
        return;
      }
      if (width >= 780) {
        setFormat('728x90');
      } else if (width >= 500) {
        setFormat('468x60');
      } else {
        setFormat('320x50');
      }
    };

    pickFormat();
    window.addEventListener('resize', pickFormat);
    return () => window.removeEventListener('resize', pickFormat);
  }, [variant]);

  if (!format) {
    return (
      <div className={`w-full flex justify-center py-4 ${className}`}>
        <div
          className={
            variant === 'in-content'
              ? 'min-h-[250px] md:min-h-[90px]'
              : 'min-h-[50px] md:min-h-[90px]'
          }
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div className={`w-full flex justify-center px-2 sm:px-4 py-4 ${className}`}>
      <AdsterraBanner format={format} />
    </div>
  );
};

interface AdsterraDesktopSidebarBannerProps {
  format: '160x600' | '160x300';
  className?: string;
}

export const AdsterraDesktopSidebarBanner: React.FC<AdsterraDesktopSidebarBannerProps> = ({
  format,
  className = '',
}) => {
  const [isWideDesktop, setIsWideDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const update = () => setIsWideDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!isWideDesktop) return null;

  return (
    <aside
      className={`hidden xl:block w-[160px] shrink-0 sticky top-28 self-start ${className}`}
      aria-label="Anuncio lateral"
    >
      <AdsterraBanner format={format} />
    </aside>
  );
};

interface AdsterraNativeBannerProps {
  className?: string;
}

export const AdsterraNativeBanner: React.FC<AdsterraNativeBannerProps> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scriptAnchorRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    if (shouldLoad) return;
    const target = sectionRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '450px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const anchor = scriptAnchorRef.current;
    if (!anchor) return;

    const loadNative = () => {
      // Ensure no duplicate Native Banner script tag exists in the document
      document
        .querySelectorAll('script[data-adsterra-id="native-banner"]')
        .forEach((existing) => existing.remove());

      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('async', 'async');
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-adsterra-id', 'native-banner');
      script.src = ADSTERRA_NATIVE_BANNER.src;
      script.onerror = () => undefined;

      anchor.appendChild(script);
    };

    const timer = window.setTimeout(loadNative, 300);

    return () => {
      window.clearTimeout(timer);
      document
        .querySelectorAll('script[data-adsterra-id="native-banner"]')
        .forEach((existing) => existing.remove());
      const container = document.getElementById(ADSTERRA_NATIVE_BANNER.containerId);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [shouldLoad]);

  return (
    <section
      ref={sectionRef}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${className}`}
      aria-label="Contenido recomendado"
    >
      <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-4 sm:p-5">
        <span className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3 text-center select-none">
          Publicidad Recomendada
        </span>
        <div ref={scriptAnchorRef} />
        <div
          id={ADSTERRA_NATIVE_BANNER.containerId}
          className="min-h-[220px] sm:min-h-[180px] w-full overflow-hidden"
        />
      </div>
    </section>
  );
};

interface AdsterraSmartlinkCardProps {
  className?: string;
}

export const AdsterraSmartlinkCard: React.FC<AdsterraSmartlinkCardProps> = ({ className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ${className}`}>
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
            Enlace Patrocinado
          </span>
          <p className="text-sm font-bold text-stone-800">
            Descubre ofertas y recomendaciones externas seleccionadas para ti
          </p>
        </div>
        <a
          href={ADSTERRA_SMARTLINK_URL}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="px-5 py-2.5 bg-white hover:bg-stone-100 border border-stone-300 text-stone-900 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Ver Oferta Patrocinada</span>
          <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
        </a>
      </div>
    </div>
  );
};

interface AdsterraGlobalScriptsProps {
  currentPath: string;
}

export const AdsterraGlobalScripts: React.FC<AdsterraGlobalScriptsProps> = ({ currentPath }) => {
  const isSensitive = isSensitiveAdRoute(currentPath);

  useEffect(() => {
    if (isSensitive) {
      document
        .querySelectorAll('script[data-adsterra-id="social-bar"]')
        .forEach((existing) => existing.remove());
      return;
    }

    // Defer Social Bar slightly after initial paint; omit Popunder so mobile buttons & keyboard are never hijacked
    const timer = window.setTimeout(() => {
      if (!document.querySelector('script[data-adsterra-id="social-bar"]')) {
        const socialBarScript = document.createElement('script');
        socialBarScript.async = true;
        socialBarScript.setAttribute('data-cfasync', 'false');
        socialBarScript.setAttribute('data-adsterra-id', 'social-bar');
        socialBarScript.src = ADSTERRA_SOCIAL_BAR_SRC;
        socialBarScript.onerror = () => undefined;
        document.body.appendChild(socialBarScript);
      }
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [isSensitive]);

  return null;
};
