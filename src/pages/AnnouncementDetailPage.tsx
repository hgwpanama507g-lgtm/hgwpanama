import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Megaphone,
  Phone,
  Share2,
  ShoppingBag,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { Link, Navigate } from '../router';
import {
  ANNOUNCEMENTS,
  ANNOUNCEMENT_DISTRIBUTOR,
  findAnnouncementBySlug,
} from '../data/announcements';

interface AnnouncementDetailPageProps {
  slug: string;
}

export const AnnouncementDetailPage: React.FC<AnnouncementDetailPageProps> = ({ slug }) => {
  const [copied, setCopied] = useState(false);
  const item = findAnnouncementBySlug(slug);

  if (!item) {
    return <Navigate to="/anuncios" replace />;
  }

  const individualPath = `/anuncios/${item.slug}`;
  const fullUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${individualPath}`
      : `https://www.hgwpanama.com${individualPath}`;

  const whatsappUrl = `https://wa.me/${ANNOUNCEMENT_DISTRIBUTOR.whatsappNumber}?text=${encodeURIComponent(
    `${item.whatsappPrefill}\n(${fullUrl})`
  )}`;

  const otherAnnouncements = ANNOUNCEMENTS.filter((a) => a.id !== item.id);

  const handleCopyUrl = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).catch(() => undefined);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="py-8 sm:py-14 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#00795F] transition-colors">
            Inicio
          </Link>
          <span className="text-stone-400">/</span>
          <Link to="/anuncios" className="hover:text-[#00795F] transition-colors">
            Anuncios
          </Link>
          <span className="text-stone-400">/</span>
          <span className="text-black font-bold truncate">{item.title}</span>
        </nav>

        {/* Top Bar: Back + Share Individual URL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <Link
            to="/anuncios"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#00795F] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2.5 rounded-xl transition-all self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Todos los Anuncios</span>
          </Link>

          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#00A550]" />
                <span className="text-[#00795F]">Enlace copiado</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#00795F]" />
                <span>Copiar enlace individual</span>
              </>
            )}
          </button>
        </div>

        {/* Main Announcement Article */}
        <article className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Media Column */}
            <div className="lg:col-span-5 bg-stone-900 flex flex-col justify-between">
              <div className="relative flex-1 flex items-center justify-center bg-stone-950 p-3 sm:p-4 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  title={item.imageTitle}
                  className="w-full h-auto max-h-[580px] object-contain rounded-xl"
                />
              </div>
              <div className="bg-gradient-to-r from-[#00795F] to-[#005a46] px-5 py-4 border-t border-white/15">
                <p className="text-white font-black text-lg sm:text-xl tracking-tight text-center leading-snug">
                  {item.imageTitle}
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00795F] text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#00A550]" />
                    <span>{item.badge}</span>
                  </span>
                  <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
                    {individualPath}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-black leading-tight tracking-tight">
                  {item.title}
                </h1>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#00795F] leading-snug">
                  {item.headline}
                </h2>

                <div className="space-y-3 text-[17px] text-stone-800 leading-relaxed font-normal">
                  {item.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-emerald-50/90 via-stone-50 to-white rounded-2xl border border-[#00795F]/25 p-5 sm:p-6 space-y-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[#00795F]">
                    {item.ctaTitle}
                  </p>
                  <p className="text-sm text-stone-700 mt-1 leading-relaxed">
                    {item.ctaSubtitle}
                  </p>
                </div>

                {/* Distributor Details: Nombre, WhatsApp, Link de registro */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white rounded-xl border border-stone-200 p-3 flex items-start gap-2.5">
                    <UserCheck className="w-4 h-4 text-[#00795F] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                        Nombre
                      </span>
                      <strong className="text-black font-black block truncate">
                        {ANNOUNCEMENT_DISTRIBUTOR.name}
                      </strong>
                      <span className="text-[11px] font-mono text-[#00795F] font-bold">
                        {ANNOUNCEMENT_DISTRIBUTOR.sponsorCode}
                      </span>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-emerald-50/70 rounded-xl border border-stone-200 hover:border-[#00A550] p-3 flex items-start gap-2.5 transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-[#00A550] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                        WhatsApp
                      </span>
                      <strong className="text-black group-hover:text-[#00795F] font-black block tabular-nums">
                        {ANNOUNCEMENT_DISTRIBUTOR.whatsappDisplay}
                      </strong>
                      <span className="text-[11px] text-[#00795F] font-bold">
                        Compras y afiliaciones
                      </span>
                    </div>
                  </a>

                  <a
                    href={ANNOUNCEMENT_DISTRIBUTOR.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-emerald-50/70 rounded-xl border border-stone-200 hover:border-[#00795F] p-3 flex items-start gap-2.5 transition-colors group"
                  >
                    <ExternalLink className="w-4 h-4 text-[#00795F] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                        Link de registro
                      </span>
                      <strong className="text-[#00795F] group-hover:underline font-black block text-xs break-all">
                        healthgreenworld.com/?userName={ANNOUNCEMENT_DISTRIBUTOR.sponsorCode}
                      </strong>
                    </div>
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[210px] inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#00A550] hover:bg-[#008f44] text-white font-black text-sm rounded-xl shadow-md shadow-[#00A550]/20 transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Comprar o Afiliarme por WhatsApp</span>
                  </a>

                  <a
                    href={ANNOUNCEMENT_DISTRIBUTOR.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#00795F] hover:bg-[#004d3c] text-white font-black text-sm rounded-xl shadow-md shadow-[#00795F]/20 transition-all active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Registrarme en Línea</span>
                  </a>

                  {item.productSlug && (
                    <Link
                      to={`/producto/${item.productSlug}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-sm rounded-xl transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#00795F]" />
                      <span>{item.productButtonLabel || 'Ver producto'}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Other Announcements */}
        {otherAnnouncements.length > 0 && (
          <section className="mt-14 pt-10 border-t border-stone-200">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#00795F]" />
                <h2 className="text-xl sm:text-2xl font-black text-black">
                  Otros Anuncios HGW Panamá
                </h2>
              </div>
              <Link
                to="/anuncios"
                className="text-sm font-black text-[#00795F] hover:underline flex items-center gap-1"
              >
                <span>Ver todos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherAnnouncements.map((other) => (
                <Link
                  key={other.id}
                  to={`/anuncios/${other.slug}`}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-[#00795F] hover:shadow-md transition-all overflow-hidden flex flex-col sm:flex-row group"
                >
                  <div className="sm:w-40 bg-stone-950 flex items-center justify-center p-2 shrink-0">
                    <img
                      src={other.imageUrl}
                      alt={other.imageAlt}
                      className="w-full h-40 sm:h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#00795F]">
                        {other.badge}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-black group-hover:text-[#00795F] transition-colors mt-1 leading-snug">
                        {other.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {other.headline}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#00795F] mt-2">
                      <span>Abrir anuncio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
