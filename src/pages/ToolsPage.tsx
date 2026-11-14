import React, { useState, useEffect, useMemo } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Save,
  Briefcase,
  Package,
  MessageSquareWarning,
  Video,
  FileDown,
  Search,
  ShieldAlert,
  Truck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Send
} from 'lucide-react';
import { HGW_DOCUMENTS } from '../data/documents';
import { MEMBERSHIP_PLANS } from '../data/products';
import {
  DISCLAIMER_MEDICO,
  POLITICA_ENVIOS_RESUMEN,
  DistributorProfile,
  EMPTY_DISTRIBUTOR_PROFILE,
  applyDistributorVariables,
  BUSINESS_SCRIPTS,
  PRODUCT_SALES_SCRIPTS,
  PRODUCTS_WELLNESS_GUIDE,
  OBJECTION_SCRIPTS
} from '../data/herramientasData';

const PROFILE_STORAGE_KEY = 'hgw_herramientas_distributor_profile_v1';

type ActiveTab = 'negocio' | 'productos' | 'objeciones' | 'reuniones' | 'descargas';

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export const ToolsPage: React.FC = () => {
  const [profile, setProfile] = useState<DistributorProfile>(() => {
    try {
      const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...EMPTY_DISTRIBUTOR_PROFILE, ...parsed };
      }
    } catch {
      // Ignore storage read errors
    }
    return EMPTY_DISTRIBUTOR_PROFILE;
  });

  const [profileOpen, setProfileOpen] = useState(true);
  const [saveFeedback, setSaveFeedback] = useState<'saved' | 'reset' | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('negocio');

  // Product guide filters
  const [productSearch, setProductSearch] = useState('');
  const [productCategory, setProductCategory] = useState('all');

  // Downloads filters
  const [docSearch, setDocSearch] = useState('');
  const [docCategory, setDocCategory] = useState('all');

  // Virtual meetings generator
  const [meetingTitle, setMeetingTitle] = useState('Presentación de Negocio y Productos HGW Panamá');
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('7:30 p.m. (Hora de Panamá)');

  // Enforce <meta name="robots" content="noindex, nofollow"> while this page is active
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const existed = Boolean(metaRobots);
    const previousContent = metaRobots?.getAttribute('content') || '';

    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (!metaRobots) return;
      if (existed) {
        metaRobots.setAttribute('content', previousContent);
      } else {
        metaRobots.remove();
      }
    };
  }, []);

  const persistProfile = (next: DistributorProfile) => {
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage write errors
    }
  };

  const handleProfileChange = (field: keyof DistributorProfile, value: string) => {
    const next = { ...profile, [field]: value };
    setProfile(next);
    persistProfile(next);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    persistProfile(profile);
    setSaveFeedback('saved');
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  const handleResetProfile = () => {
    setProfile(EMPTY_DISTRIBUTOR_PROFILE);
    try {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch {
      // Ignore storage remove errors
    }
    setSaveFeedback('reset');
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  const handleCopy = async (id: string, text: string) => {
    const success = await copyTextToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2200);
    }
  };

  const productCategories = useMemo(() => {
    const unique = Array.from(new Set(PRODUCTS_WELLNESS_GUIDE.map((p) => p.categoryLabel)));
    return ['all', ...unique];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_WELLNESS_GUIDE.filter((item) => {
      if (productCategory !== 'all' && item.categoryLabel !== productCategory) return false;
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchPurpose = item.purpose.toLowerCase().includes(q);
        const matchBenefits = item.benefits.some((b) => b.toLowerCase().includes(q));
        if (!matchName && !matchPurpose && !matchBenefits) return false;
      }
      return true;
    });
  }, [productCategory, productSearch]);

  const filteredDocs = useMemo(() => {
    return HGW_DOCUMENTS.filter((doc) => {
      if (docCategory !== 'all' && doc.category !== docCategory) return false;
      if (docSearch.trim()) {
        const q = docSearch.toLowerCase().trim();
        if (
          !doc.title.toLowerCase().includes(q) &&
          !doc.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [docCategory, docSearch]);

  const effectiveMeetingLink =
    meetingLink.trim() || profile.link_zoom.trim() || '[Link de la reunión]';
  const effectiveMeetingDate = meetingDate.trim() || '[Fecha de la reunión]';
  const effectiveMeetingTime = meetingTime.trim() || '[Hora de la reunión]';

  const meetingInvitations = useMemo(() => {
    const baseData = {
      titulo: meetingTitle.trim() || 'Presentación HGW Panamá',
      link: effectiveMeetingLink,
      fecha: effectiveMeetingDate,
      hora: effectiveMeetingTime
    };

    return [
      {
        id: 'meet-general',
        title: 'Invitación Oficial Completa (WhatsApp / Grupos)',
        context: 'Ideal para enviar a prospectos interesados o difundir en listas de difusión.',
        text: applyDistributorVariables(
          `🌿 *INVITACIÓN ESPECIAL: ${baseData.titulo}*

Hola, te saluda {{nombre}}. Quiero invitarte a nuestra próxima sesión virtual donde conocerás los productos de apoyo al bienestar de HGW y cómo funciona el proyecto en Panamá.

📅 *Fecha:* ${baseData.fecha}
⏰ *Hora:* ${baseData.hora}
🔗 *Enlace de acceso:* ${baseData.link}

💡 Conéctate 5 minutos antes para asegurar tu espacio.
Si necesitas ayuda para entrar, escríbeme a mi WhatsApp: {{whatsapp}}`,
          profile
        )
      },
      {
        id: 'meet-cercana',
        title: 'Invitación Directa 1 a 1 (Amigos / Conocidos)',
        context: 'Tono conversacional para contactos de confianza.',
        text: applyDistributorVariables(
          `¡Hola! Te saluda {{nombre}} 😊
Hoy tenemos una reunión virtual corta sobre *${baseData.titulo}* y me encantaría que te conectes para que escuches la información de primera mano.

🗓️ Fecha: ${baseData.fecha}
🕒 Hora: ${baseData.hora}
💻 Entra aquí: ${baseData.link}

Avísame si te puedes conectar para estar pendiente de ti por aquí ({{whatsapp}}).`,
          profile
        )
      },
      {
        id: 'meet-recordatorio',
        title: 'Recordatorio 15 Minutos Antes',
        context: 'Para confirmar asistencia poco antes de iniciar la sala.',
        text: applyDistributorVariables(
          `⏳ *¡Ya casi comenzamos!*
En pocos minutos inicia la sesión: *${baseData.titulo}* (${baseData.fecha} · ${baseData.hora}).

Ingresa directo desde este enlace:
${baseData.link}

Nos vemos adentro. Cualquier consulta te atiendo por aquí: {{nombre}} ({{whatsapp}}).`,
          profile
        )
      }
    ];
  }, [meetingTitle, effectiveMeetingLink, effectiveMeetingDate, effectiveMeetingTime, profile]);

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Private Header */}
        <div className="bg-gradient-to-br from-[#004d3c] via-[#00795F] to-[#00A550] text-white rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-xs font-black uppercase tracking-wider text-emerald-100">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sección Privada · Uso Interno del Equipo</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Centro de Entrenamiento y Herramientas HGW
            </h1>
            <p className="text-sm sm:text-base text-emerald-50 font-normal leading-relaxed">
              Configura tus datos una sola vez: todos los guiones, objeciones e invitaciones de reunión se personalizan automáticamente para que los copies y envíes por WhatsApp.
            </p>
          </div>
        </div>

        {/* Editable Distributor Profile Card */}
        <section className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-stone-100/80 border-b border-stone-200 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-black text-black">
                Datos del Distribuidor (se guardan en este navegador)
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Variables activas en guiones:{' '}
                <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-[11px] font-bold">{'{{nombre}}'}</code>{' '}
                <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-[11px] font-bold">{'{{whatsapp}}'}</code>{' '}
                <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-[11px] font-bold">{'{{correo}}'}</code>{' '}
                <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-[11px] font-bold">{'{{link_registro}}'}</code>{' '}
                <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-[11px] font-bold">{'{{link_video}}'}</code>{' '}
                <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-[11px] font-bold">{'{{link_grupo}}'}</code>{' '}
                <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-[11px] font-bold">{'{{link_zoom}}'}</code>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="px-3 py-2 text-xs font-bold text-[#00795F] bg-white border border-stone-300 rounded-xl hover:bg-stone-50 flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>{profileOpen ? 'Ocultar' : 'Editar datos'}</span>
              {profileOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {profileOpen && (
            <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Nombre del distribuidor
                  </label>
                  <input
                    type="text"
                    value={profile.nombre}
                    onChange={(e) => handleProfileChange('nombre', e.target.value)}
                    placeholder="Ej. María González"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={profile.whatsapp}
                    onChange={(e) => handleProfileChange('whatsapp', e.target.value)}
                    placeholder="Ej. +507 6000-0000"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={profile.correo}
                    onChange={(e) => handleProfileChange('correo', e.target.value)}
                    placeholder="Ej. tunombre@gmail.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Link de registro oficial
                  </label>
                  <input
                    type="url"
                    value={profile.link_registro}
                    onChange={(e) => handleProfileChange('link_registro', e.target.value)}
                    placeholder="https://www.healthgreenworld.com/?userName=..."
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Link de video principal ({"{{link_video}}"})
                  </label>
                  <input
                    type="url"
                    value={profile.link_video}
                    onChange={(e) => handleProfileChange('link_video', e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Grupo o canal de WhatsApp
                  </label>
                  <input
                    type="url"
                    value={profile.link_grupo}
                    onChange={(e) => handleProfileChange('link_grupo', e.target.value)}
                    placeholder="https://chat.whatsapp.com/..."
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Canal / enlace de YouTube
                  </label>
                  <input
                    type="url"
                    value={profile.youtube}
                    onChange={(e) => handleProfileChange('youtube', e.target.value)}
                    placeholder="https://www.youtube.com/@..."
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Link de Zoom ({"{{link_zoom}}"})
                  </label>
                  <input
                    type="url"
                    value={profile.link_zoom}
                    onChange={(e) => handleProfileChange('link_zoom', e.target.value)}
                    placeholder="https://us02web.zoom.us/j/..."
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  URLs de videos adicionales de apoyo (opcional, uno por línea)
                </label>
                <textarea
                  rows={2}
                  value={profile.urls_videos}
                  onChange={(e) => handleProfileChange('urls_videos', e.target.value)}
                  placeholder="Guarda aquí enlaces extra de testimonios, tutorial de registro o presentaciones..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#00795F] hover:bg-[#004d3c] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar datos</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetProfile}
                    className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restablecer datos</span>
                  </button>
                </div>

                {saveFeedback === 'saved' && (
                  <span className="text-xs font-bold text-[#00795F] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                    ✓ Datos guardados en este navegador
                  </span>
                )}
                {saveFeedback === 'reset' && (
                  <span className="text-xs font-bold text-stone-700 bg-stone-100 border border-stone-300 px-3 py-1.5 rounded-xl">
                    Datos restablecidos
                  </span>
                )}
              </div>
            </form>
          )}
        </section>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'negocio' as ActiveTab, label: '1. Negocio (Invitación y Cierre)', icon: Briefcase },
            { id: 'productos' as ActiveTab, label: '2. Productos, Membresías y Envíos', icon: Package },
            { id: 'objeciones' as ActiveTab, label: '3. Objeciones Frecuentes', icon: MessageSquareWarning },
            { id: 'reuniones' as ActiveTab, label: '4. Reuniones Virtuales', icon: Video },
            { id: 'descargas' as ActiveTab, label: '5. Descargas PDF', icon: FileDown }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#00795F] text-white shadow-md'
                    : 'bg-white text-stone-800 border border-stone-300 hover:border-[#00795F] hover:text-[#00795F]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: NEGOCIO */}
        {activeTab === 'negocio' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {BUSINESS_SCRIPTS.map((script) => {
                const resolvedText = applyDistributorVariables(script.text, profile);
                const isCopied = copiedId === script.id;
                return (
                  <article
                    key={script.id}
                    className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-50 text-[#00795F] text-[11px] font-black uppercase tracking-wider border border-emerald-200 mb-1.5">
                            {script.category}
                          </span>
                          <h3 className="text-lg font-black text-black leading-snug">
                            {script.title}
                          </h3>
                          <p className="text-xs text-stone-500 mt-0.5">{script.context}</p>
                        </div>
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-2xl p-4 leading-relaxed">
                        {resolvedText}
                      </pre>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => handleCopy(script.id, resolvedText)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-[#00A550] text-white'
                            : 'bg-[#00795F] hover:bg-[#004d3c] text-white'
                        }`}
                      >
                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTOS, MEMBRESÍAS, TESTIMONIOS, PAGOS, ENVÍOS Y GUÍA POR PRODUCTO */}
        {activeTab === 'productos' && (
          <div className="space-y-8">
            {/* Compliance + Shipping Banners */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-stone-800 space-y-1">
                  <strong className="text-black block">Regla de comunicación responsable:</strong>
                  <p>
                    Habla siempre de <strong>apoyo al bienestar</strong> y nutrición diaria. Nunca prometas curas ni tratamientos de enfermedades. Incluye siempre la nota:{' '}
                    <strong className="text-black">“{DISCLAIMER_MEDICO}”</strong>
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-stone-800 space-y-1">
                  <strong className="text-black block">Condiciones de envíos y devoluciones:</strong>
                  <p>{POLITICA_ENVIOS_RESUMEN}</p>
                </div>
              </div>
            </div>

            {/* Membership Packages Quick Reference */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-black">
                  Resumen de Paquetes de Membresía HGW Panamá
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  La cantidad de productos y los costos en dólares pueden variar porque cada socio escoge los productos de su preferencia.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MEMBERSHIP_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-black text-lg">{plan.name}</span>
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-[#00795F] text-xs font-black rounded-lg border border-emerald-200">
                        {plan.bv}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-[#00795F] tabular-nums">
                      {plan.priceEstimate}
                    </div>
                    <div className="text-xs font-bold text-stone-700">
                      {plan.productCount} · {plan.discountSummary}
                    </div>
                    <ul className="pt-2 border-t border-stone-100 space-y-1 text-xs text-stone-700">
                      {plan.benefits.map((b, idx) => (
                        <li key={idx}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Scripts for product sales, testimonials, payment methods, shipping */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                Guiones de Venta, Testimonios, Pagos y Envíos
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {PRODUCT_SALES_SCRIPTS.map((script) => {
                  const resolvedText = applyDistributorVariables(script.text, profile);
                  const isCopied = copiedId === script.id;
                  return (
                    <article
                      key={script.id}
                      className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-3">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-50 text-[#00795F] text-[11px] font-black uppercase tracking-wider border border-emerald-200 mb-1.5">
                            {script.category}
                          </span>
                          <h3 className="text-lg font-black text-black leading-snug">
                            {script.title}
                          </h3>
                          <p className="text-xs text-stone-500 mt-0.5">{script.context}</p>
                        </div>
                        <pre className="whitespace-pre-wrap font-sans text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-2xl p-4 leading-relaxed">
                          {resolvedText}
                        </pre>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={() => handleCopy(script.id, resolvedText)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isCopied
                              ? 'bg-[#00A550] text-white'
                              : 'bg-[#00795F] hover:bg-[#004d3c] text-white'
                          }`}
                        >
                          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Full Product Guide ("para qué sirve cada producto y beneficios") */}
            <section className="space-y-5 pt-4 border-t border-stone-200">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-black">
                    Guía Rápida por Producto: Para qué sirve y beneficios
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    {PRODUCTS_WELLNESS_GUIDE.length} productos del catálogo explicados con lenguaje de apoyo al bienestar. {DISCLAIMER_MEDICO}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Buscar producto o beneficio..."
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                    />
                  </div>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="px-3 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  >
                    {productCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'Todas las categorías' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((item) => {
                  const shareText = applyDistributorVariables(
                    `*${item.name}* (${item.presentation} · ${item.priceFormatted})

📌 *¿Para qué sirve?*
${item.purpose}

✅ *Beneficios de apoyo al bienestar:*
${item.benefits.map((b) => `• ${b}`).join('\n')}

🚚 ${POLITICA_ENVIOS_RESUMEN}
ℹ️ _${DISCLAIMER_MEDICO}_

📲 Pedidos y asesoría con {{nombre}}: {{whatsapp}}`,
                    profile
                  );
                  const copyKey = `prod-guide-${item.id}`;
                  const isCopied = copiedId === copyKey;

                  return (
                    <article
                      key={item.id}
                      className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-stone-100 text-stone-700 text-[11px] font-bold">
                            {item.categoryLabel}
                          </span>
                          <span className="text-sm font-black text-[#00795F] tabular-nums">
                            {item.priceFormatted}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-base font-black text-black leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-xs text-stone-500 font-medium">{item.presentation}</p>
                        </div>
                        <div className="text-xs sm:text-sm text-stone-800 bg-stone-50 rounded-xl p-3 border border-stone-100">
                          <strong className="text-black block mb-0.5">Para qué sirve:</strong>
                          <p>{item.purpose}</p>
                        </div>
                        <ul className="space-y-1 text-xs text-stone-700">
                          {item.benefits.map((b, i) => (
                            <li key={i}>• {b}</li>
                          ))}
                        </ul>
                        <p className="text-[11px] text-stone-500 italic pt-1">
                          {DISCLAIMER_MEDICO}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleCopy(copyKey, shareText)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isCopied
                              ? 'bg-[#00A550] text-white'
                              : 'bg-[#00795F] hover:bg-[#004d3c] text-white'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* TAB 3: OBJECIONES FRECUENTES */}
        {activeTab === 'objeciones' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {OBJECTION_SCRIPTS.map((script) => {
              const resolvedText = applyDistributorVariables(script.text, profile);
              const isCopied = copiedId === script.id;
              return (
                <article
                  key={script.id}
                  className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-black uppercase tracking-wider border border-amber-200 mb-1.5">
                        {script.category}
                      </span>
                      <h3 className="text-lg font-black text-black leading-snug">
                        {script.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">{script.context}</p>
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-2xl p-4 leading-relaxed">
                      {resolvedText}
                    </pre>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => handleCopy(script.id, resolvedText)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-[#00A550] text-white'
                          : 'bg-[#00795F] hover:bg-[#004d3c] text-white'
                      }`}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* TAB 4: INVITACIONES A REUNIONES VIRTUALES */}
        {activeTab === 'reuniones' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-black">
                  Generador de Invitaciones para Reuniones Virtuales
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  Completa el link, la fecha y la hora para generar al instante mensajes listos para copiar y enviar por WhatsApp. Si dejas el link vacío, se usará automáticamente tu Link de Zoom guardado.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Tema de la reunión
                  </label>
                  <input
                    type="text"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    placeholder="Presentación de Negocio HGW"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Link de la reunión
                  </label>
                  <input
                    type="url"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder={profile.link_zoom || 'https://us02web.zoom.us/j/...'}
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Fecha
                  </label>
                  <input
                    type="text"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    placeholder="Ej. Hoy / Martes 18 de noviembre"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Hora
                  </label>
                  <input
                    type="text"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    placeholder="Ej. 7:30 p.m. (Panamá)"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {meetingInvitations.map((inv) => {
                const isCopied = copiedId === inv.id;
                const waShareUrl = `https://wa.me/?text=${encodeURIComponent(inv.text)}`;
                return (
                  <article
                    key={inv.id}
                    className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-base font-black text-black leading-snug">
                          {inv.title}
                        </h3>
                        <p className="text-xs text-stone-500 mt-0.5">{inv.context}</p>
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-2xl p-4 leading-relaxed">
                        {inv.text}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100">
                      <a
                        href={waShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5 text-[#00A550]" />
                        <span>Abrir WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCopy(inv.id, inv.text)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-[#00A550] text-white'
                            : 'bg-[#00795F] hover:bg-[#004d3c] text-white'
                        }`}
                      >
                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: DESCARGAS DE DOCUMENTOS PDF */}
        {activeTab === 'descargas' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-black">
                  Documentos PDF Oficiales Disponibles ({HGW_DOCUMENTS.length})
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  Descarga catálogos, listas de precios y fichas técnicas existentes en el sitio para compartir con tu equipo o clientes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={docSearch}
                    onChange={(e) => setDocSearch(e.target.value)}
                    placeholder="Buscar documento PDF..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                  />
                </div>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  className="px-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#00795F]/30 focus:border-[#00795F]"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="cafes-bebidas">Cafés y Bebidas</option>
                  <option value="nutricion">Nutrición y Suplementos</option>
                  <option value="cuidado-personal">Cuidado Personal</option>
                  <option value="turmalina">Turmalina</option>
                  <option value="planes">Catálogos y Precios</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDocs.map((doc) => {
                const copyKey = `doc-link-${doc.id}`;
                const isCopied = copiedId === copyKey;
                return (
                  <article
                    key={doc.id}
                    className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-[#00795F] text-[11px] font-bold border border-emerald-200">
                          {doc.categoryLabel}
                        </span>
                        <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                          PDF · {doc.size}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-black leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(copyKey, doc.url)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-[#00A550] text-white'
                            : 'bg-stone-100 hover:bg-stone-200 text-black'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Enlace copiado' : 'Copiar enlace'}</span>
                      </button>

                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="py-2.5 px-3 bg-[#00795F] hover:bg-[#004d3c] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Descargar</span>
                        <ExternalLink className="w-3 h-3 opacity-75" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
