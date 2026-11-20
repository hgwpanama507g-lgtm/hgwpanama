import React from 'react';
import {
  Megaphone,
  Phone,
  UserCheck,
  ExternalLink,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Link } from '../router';
import {
  ANNOUNCEMENTS,
  ANNOUNCEMENT_DISTRIBUTOR,
  type AnnouncementItem,
} from '../data/announcements';

interface AnnouncementsSectionProps {
  isHomeView?: boolean;
}

const buildWhatsAppHref = (prefill: string) =>
  `https://wa.me/${ANNOUNCEMENT_DISTRIBUTOR.whatsappNumber}?text=${encodeURIComponent(prefill)}`;

const AnnouncementCard: React.FC<{ item: AnnouncementItem }> = ({ item }) => {
  const whatsappUrl = buildWhatsAppHref(item.whatsappPrefill);

  return (
    <article className="bg-white rounded-3xl border border-stone-200/90 shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Media Column with Persuasive Image Title (25-30 chars) */}
        <div className="lg:col-span-5 bg-stone-900 flex flex-col justify-between">
          <div className="relative flex-1 flex items-center justify-center bg-stone-950 p-2 sm:p-3 overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.imageAlt}
              title={item.imageTitle}
              className="w-full h-auto max-h-[540px] object-contain rounded-xl"
            />
          </div>
          <div className="bg-gradient-to-r from-[#00795F] to-[#005a46] px-5 py-4 border-t border-white/15">
            <p className="text-white font-black text-lg sm:text-xl tracking-tight text-center leading-snug">
              {item.imageTitle}
            </p>
          </div>
        </div>

        {/* Narrative + CTA Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00795F] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#00A550]" />
                <span>{item.badge}</span>
              </span>
              {item.dateLabel && (
                <span className="text-xs font-semibold text-stone-500">
                  {item.dateLabel}
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-black leading-tight tracking-tight">
              {item.headline}
            </h3>

            <div className="space-y-3 text-[17px] text-stone-800 leading-relaxed font-normal">
              {item.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Call To Action: Contact for Purchases or Affiliations */}
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
  );
};

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  isHomeView = false,
}) => {
  return (
    <section
      id="anuncios"
      className={`py-12 sm:py-20 bg-stone-50 border-b border-stone-200 ${
        !isHomeView ? 'min-h-screen' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isHomeView && (
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 mb-8">
            <Link to="/" className="hover:text-[#00795F] transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-black font-bold">Anuncios</span>
          </nav>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00795F] uppercase tracking-wider mb-2">
              <Megaphone className="w-4 h-4 text-[#00A550]" />
              <span>Novedades y Promociones HGW Panamá</span>
            </div>
            {isHomeView ? (
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                Anuncios Destacados
              </h2>
            ) : (
              <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
                Anuncios y Promociones
              </h1>
            )}
            <p className="text-[17px] text-stone-700 mt-2 max-w-2xl leading-relaxed">
              Mantente al día con nuestros lanzamientos, productos recomendados y oportunidades de afiliación directa en Panamá.
            </p>
          </div>

          {isHomeView && (
            <Link
              to="/anuncios"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-emerald-50 text-[#00795F] border border-[#00795F]/30 font-extrabold text-sm rounded-xl shadow-xs transition-all self-start md:self-auto whitespace-nowrap"
            >
              <span>Ver sección de Anuncios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Announcements Feed */}
        <div className="space-y-8">
          {ANNOUNCEMENTS.map((item) => (
            <AnnouncementCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
