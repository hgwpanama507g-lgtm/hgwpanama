import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Phone, Mail, CheckCircle2, Globe, Building2 } from 'lucide-react';
import { CERTIFICATIONS } from '../data/products';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

export const DIRECT_SALES_ASSOCIATIONS = [
  {
    name: "Asociación Panameña de Venta Directa (APVD)",
    country: "Panamá",
    description: "Organismo que agrupa y regula a las empresas y distribuidores éticos de venta directa en la República de Panamá.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Asociacion-Panamena-de-Venta-directa.webp"
  },
  {
    name: "Asociación Colombiana de Venta Directa (ACOVEDI)",
    country: "Colombia",
    description: "Garantiza el cumplimiento de normativas de transparencia y protección al consumidor en el modelo asociativo.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Asociacion-Colombiana-de-venta-directa.webp"
  },
  {
    name: "Asociación Ecuatoriana de Venta Directa (AEVD)",
    country: "Ecuador",
    description: "Respaldo ético institucional en el mercado andino.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Asociacion-Ecuatoriana-de-Venta-Directa.webp"
  },
  {
    name: "Asociación Boliviana de Venta Directa",
    country: "Bolivia",
    description: "Promoción de buenas prácticas comerciales y empresariales en la región.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Asociacion-Boliviana-de-Venta-Directa.webp"
  },
  {
    name: "Asociación Guatemalteca de Venta Directa",
    country: "Guatemala",
    description: "Compromiso con la excelencia y el desarrollo de emprendedores independientes.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Asocicion-Guatemalteca-de-Venta-Directa.webp"
  },
  {
    name: "Federación Mundial de Asociaciones de Venta Directa (WFDSA)",
    country: "Global",
    description: "Afiliación corporativa internacional que rige los estándares éticos globales de la industria.",
    imageUrl: "https://media.academiahgw.online/wp-content/uploads/2026/11/Asociacion-de-empresa-de-venta-diecta.webp"
  }
];

export const AboutHGW: React.FC = () => {
  return (
    <section id="sobre-hgw" className="py-12 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00795F] uppercase tracking-wider mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A550]" />
            <span>Trayectoria, Respaldo y Liderazgo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Sobre Health Green World (HGW)
          </h2>
          <p className="text-[18px] text-stone-800 mt-3 leading-relaxed font-normal">
            HGW forma parte de la corporación multinacional Green World Group, fundada por científicos pioneros en medicina tradicional china y biotecnología moderna aplicada a la nutrición y el cuidado personal.
          </p>
        </div>

        {/* Corporate Leadership Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Dra. Deming Lee */}
          <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-2xs">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white shadow-sm shrink-0 border border-stone-200">
              <img
                src="https://media.academiahgw.online/wp-content/uploads/2026/11/RA-DEMING-LEE.png"
                alt="Dra. Deming Lee - Presidenta Green World Group"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png";
                }}
              />
            </div>
            <div>
              <span className="text-xs font-bold text-[#00795F] uppercase tracking-wider">Fundadora & Presidenta</span>
              <h3 className="text-xl font-black text-black mt-0.5">Dra. Deming Lee</h3>
              <p className="text-[17px] text-stone-700 mt-2.5 leading-relaxed font-normal">
                Doctora con amplia trayectoria en investigación biológica y medicina alternativa. Fundó Green World Group con la visión de llevar los principios herbolarios más puros a familias de los cinco continentes.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#00795F] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#00A550]" />
                <span>Green World Group Internacional</span>
              </div>
            </div>
          </div>

          {/* Peter Lee */}
          <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-2xs">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white shadow-sm shrink-0 border border-stone-200">
              <img
                src="https://media.academiahgw.online/wp-content/uploads/2026/11/PETER-LEE.png"
                alt="Peter Lee - Presidente HGW"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png";
                }}
              />
            </div>
            <div>
              <span className="text-xs font-bold text-[#00795F] uppercase tracking-wider">Presidente Corporativo</span>
              <h3 className="text-xl font-black text-black mt-0.5">Peter Lee</h3>
              <p className="text-[17px] text-stone-700 mt-2.5 leading-relaxed font-normal">
                Líder empresarial enfocado en la expansión global, transformación digital del modelo de venta directa y el diseño de sistemas de compensación sostenibles para emprendedores independientes.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#00795F] font-bold">
                <Award className="w-4 h-4 text-[#00A550]" />
                <span>Expansión América Latina & Panamá</span>
              </div>
            </div>
          </div>

        </div>

        {/* Local Independent Distributor Profile */}
        <div className="bg-gradient-to-br from-[#00795F]/10 via-emerald-50/50 to-stone-50 rounded-3xl p-6 sm:p-10 border border-[#00795F]/20 mb-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white mb-4">
                <img
                  src="https://media.academiahgw.online/wp-content/uploads/2026/11/Foto-de-Perfil-Yamilka-Batista-Emprendedora-HGW-2-1024x1024.jpeg"
                  alt="Yamilka Batista - Distribuidora Independiente Autorizada HGW Panamá"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/Foto-de-Perfil-Yamilka-Batista-Emprendedora-HGW-1-1024x1024.jpeg";
                  }}
                />
              </div>
              <h3 className="text-xl font-black text-black">Yamilka Batista</h3>
              <p className="text-xs font-bold text-[#00795F]">Emprendedora & Distribuidora Independiente</p>
              <p className="text-xs text-stone-600 mt-1">Código de Patrocinio: <span className="font-mono font-bold text-black bg-white px-2 py-0.5 rounded-md border border-stone-200">Yamilka507</span></p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00795F]/10 rounded-full text-xs font-bold text-[#00795F]">
                <HeartHandshake className="w-4 h-4" />
                <span>Tu Enlace Directo en Panamá</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-black">
                Atención cercana, entrega confiable y asesoría personalizada
              </h3>
              <p className="text-[17px] sm:text-[18px] text-stone-800 leading-relaxed font-normal">
                Como distribuidores independientes de HGW en Panamá, nuestro compromiso es brindarte orientación honesta sobre los beneficios de cada formulación, disponibilidad inmediata para entrega en provincias y acompañarte si deseas afiliarte para consumo familiar o generar ingresos propios.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={getAffiliationWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-stone-800 hover:text-[#00795F] bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#00A550] shrink-0" />
                  <div>
                    <span className="text-xs text-stone-500 block">WhatsApp Distribuidor Independiente</span>
                    <strong className="text-black font-extrabold text-sm sm:text-base">+507 6778-8375</strong>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-sm text-stone-800 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
                  <Mail className="w-5 h-5 text-[#00A550] shrink-0" />
                  <div>
                    <span className="text-xs text-stone-500 block">Correo para Pre-registro</span>
                    <strong className="text-black font-extrabold text-sm sm:text-base select-all">hgwpanama507g@gmail.com</strong>
                  </div>
                </div>
              </div>

              {/* Explicit Notice: Distributor WhatsApp vs Corporate Assistance */}
              <div className="p-3.5 bg-white/90 border border-amber-200 rounded-2xl text-xs space-y-1.5 shadow-2xs">
                <p className="text-stone-800 leading-relaxed">
                  <strong className="text-amber-900 font-extrabold">Aclaración de Atención al Cliente:</strong> El número de WhatsApp publicado corresponde exclusivamente a la atención de un <strong>distribuidor independiente</strong> para consultas comerciales, pedidos y nuevos afiliados. <em>No es una línea oficial de la empresa HGW.</em>
                </p>
                <p className="text-stone-700 leading-relaxed font-medium">
                  📌 <strong>¿Ya eres socio registrado de HGW?</strong> Si ya estás registrado como socio, por favor comunícate directamente con tu <strong>patrocinador</strong> o con el teléfono de las oficinas principales en Panamá: <strong className="text-black">+507 392-8415</strong> para recibir asistencia en tus pedidos internos o consultas de código.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 1. SECTION: CERTIFICACIONES DE CALIDAD */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#00795F] rounded-full text-xs font-bold uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Garantía Sanitaria y de Pureza</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-black">
              Certificaciones Internacionales
            </h3>
            <p className="text-sm text-stone-700 mt-1.5 font-normal">
              Cumplimiento riguroso de normativas globales en inocuidad alimentaria, buenas prácticas de manufactura y gestión de calidad.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col items-center text-center justify-between hover:border-[#00795F] transition-colors shadow-2xs"
              >
                <div className="w-full aspect-4/3 flex items-center justify-center p-2 mb-3 bg-white rounded-xl border border-stone-100">
                  <img
                    src={cert.imageUrl}
                    alt={cert.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png";
                    }}
                  />
                </div>
                <h4 className="text-xs font-bold text-black leading-tight mt-1">{cert.name}</h4>
                <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. SECTION: ASOCIACIONES DE VENTAS DIRECTAS EN FORMATO GRID (MISMO ESTILO VISUAL DE PRODUCTOS) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00795F]/10 text-[#00795F] rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Ética y Transparencia Asociativa</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black tracking-tight">
              Asociaciones de Venta Directa
            </h3>
            <p className="text-[17px] sm:text-[18px] text-stone-700 mt-2 font-normal leading-relaxed">
              HGW y sus distribuidores independientes operan bajo los más altos estándares éticos, respaldados por las cámaras y asociaciones de venta directa en Latinoamérica y el mundo.
            </p>
          </div>

          {/* Grid structured exactly like the product cards section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIRECT_SALES_ASSOCIATIONS.map((assoc, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl border border-stone-200 hover:border-[#00795F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative isolate"
              >
                {/* Top Image Container with subtle hover zoom */}
                <div className="relative aspect-16/10 w-full bg-stone-50 p-6 flex items-center justify-center overflow-hidden border-b border-stone-100 block isolate">
                  <img
                    src={assoc.imageUrl}
                    alt={assoc.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transform group-hover:scale-108 transition-transform duration-300 ease-out drop-shadow-xs"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png";
                    }}
                  />

                  {/* Country Flag / Jurisdiction Badge */}
                  <span className="absolute top-3 left-3 bg-[#00795F] text-white text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
                    <Globe className="w-3 h-3 text-[#00A550]" />
                    <span>{assoc.country}</span>
                  </span>

                  {/* Certified Member Badge */}
                  <span className="absolute top-3 right-3 bg-white/95 text-stone-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs border border-stone-200">
                    Gremio Oficial
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#00795F] uppercase tracking-wider mb-1.5">
                      Venta Directa Responsable
                    </div>

                    <h4 className="text-base sm:text-lg font-extrabold text-black group-hover:text-[#00795F] transition-colors leading-snug line-clamp-2">
                      {assoc.name}
                    </h4>

                    <p className="text-[17px] text-stone-700 mt-2.5 leading-relaxed font-normal">
                      {assoc.description}
                    </p>
                  </div>

                  {/* Card Footer Bar */}
                  <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[#00795F] font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#00A550]" />
                      <span>Estándar Ético Vigente</span>
                    </span>
                    <span className="text-stone-500 font-semibold text-[11px]">
                      {assoc.country === 'Global' ? 'Alcance Mundial' : `Sede ${assoc.country}`}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
