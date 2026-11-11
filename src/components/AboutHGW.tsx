import React from 'react';
import { Award, ShieldCheck, HeartHandshake, CheckCircle2, Phone, Mail } from 'lucide-react';
import { CERTIFICATIONS } from '../data/products';

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
          <p className="text-base sm:text-lg text-stone-800 mt-3 leading-relaxed font-normal">
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
              <p className="text-sm text-stone-700 mt-2.5 leading-relaxed font-normal">
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
              <p className="text-sm text-stone-700 mt-2.5 leading-relaxed font-normal">
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
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
                Como distribuidores independientes de HGW en Panamá, nuestro compromiso es brindarte orientación honesta sobre los beneficios de cada formulación, disponibilidad inmediata para entrega en provincias y acompañarte si deseas afiliarte para consumo familiar o generar ingresos propios.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://wa.me/50767788375?text=Hola%20Yamilka%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos%20HGW."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-stone-800 hover:text-[#00795F] bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#00A550] shrink-0" />
                  <span>WhatsApp: <strong className="text-black font-extrabold">+507 6778-8375</strong></span>
                </a>
                <div className="flex items-center gap-3 text-sm text-stone-800 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
                  <Mail className="w-5 h-5 text-[#00A550] shrink-0" />
                  <span>Email: <strong className="text-black font-extrabold">hgwpanama507g@gmail.com</strong></span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-black text-black">
              Certificaciones y Estándares de Calidad
            </h3>
            <p className="text-sm text-stone-700 mt-1.5 font-normal">
              Cada producto cumple con estrictas regulaciones internacionales de inocuidad y buenas prácticas.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col items-center text-center justify-between hover:border-[#00795F] transition-colors"
              >
                <div className="w-full aspect-4/3 flex items-center justify-center p-2 mb-2 bg-white rounded-xl border border-stone-100">
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

      </div>
    </section>
  );
};

