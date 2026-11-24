import React from 'react';
import { Phone, Mail, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from '../router';

interface FooterProps {
  isHomePage?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isHomePage = false }) => {
  if (isHomePage) {
    return (
      <footer className="w-full bg-[#4472C4] text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-white/15">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm leading-relaxed font-medium text-white">
            Este es un sitio web no oficial de Health Green World (HGW). El contenido presentado en este blog es operado y mantenido por un socio independiente de HGW Latinoamérica. Toda la información y opiniones expresadas son de responsabilidad exclusiva del autor y no reflejan necesariamente las políticas o directrices oficiales de HGW. Para información oficial, visite el sitio web de la empresa.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-3">
            <Link to="/" className="inline-flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl">
              <img
                src="https://media.academiahgw.online/wp-content/uploads/2026/11/LOGO-HGW-PANAMA-DISTRIBUIDOR-INDEPENDIENTE.png"
                alt="HGW Panamá - Distribuidor Independiente"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://media.academiahgw.online/wp-content/uploads/2026/11/hgw_logo.png';
                }}
              />
            </Link>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm pt-1">
              Distribuidores Independientes autorizados de Health Green World en Panamá. Bienestar holístico mediante productos formulados con extractos ancestrales de arándano, turmalina, ganoderma y fitonutrientes.
            </p>
            <div className="pt-1 flex items-center gap-2 text-blue-300 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Distribuidores Independientes Autorizados</span>
            </div>
          </div>

          {/* Quick Links with friendly URLs */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegación del Sitio
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-blue-300 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:text-blue-300 transition-colors">
                  Catálogo de Productos
                </Link>
              </li>
              <li>
                <Link to="/base-de-conocimiento" className="hover:text-amber-300 text-amber-300 font-bold transition-colors flex items-center gap-1.5">
                  <span>Base de Conocimiento y Guías</span>
                </Link>
              </li>
              <li>
                <Link to="/pastas-dentales" className="hover:text-blue-300 transition-colors">
                  Pastas Dentales (Sin Flúor)
                </Link>
              </li>
              <li>
                <Link to="/membresias" className="hover:text-blue-300 transition-colors">
                  Membresías de Activación
                </Link>
              </li>
              <li>
                <Link to="/oportunidad-de-negocio" className="hover:text-blue-300 transition-colors">
                  Oportunidad de Negocio
                </Link>
              </li>
              <li>
                <Link to="/preregistro" className="hover:text-blue-300 transition-colors font-bold text-blue-300">
                  Pre-registro y Video Tutorial
                </Link>
              </li>
              <li>
                <Link to="/oficinas" className="hover:text-blue-300 transition-colors">
                  Directorio Oficinas LATAM
                </Link>
              </li>
              <li>
                <Link to="/documentos" className="hover:text-blue-300 transition-colors">
                  Documentos PDF
                </Link>
              </li>
              <li>
                <Link to="/informacion" className="hover:text-blue-300 transition-colors">
                  Ingredientes e Información
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-blue-300 transition-colors">
                  Contacto y Envíos
                </Link>
              </li>
              <li>
                <Link to="/envios-y-devoluciones" className="hover:text-blue-300 transition-colors">
                  Envíos y Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact info */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Oficinas Principales y Envíos Panamá
            </h3>
            <div className="space-y-2 text-slate-300 text-xs sm:text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Avenida Porras, Plaza Royal Blue, Local No. 6, San Francisco, Ciudad de Panamá.
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  Oficina Principal: <strong className="text-white font-bold">+507 392-8415</strong> (Atención Corporativa)
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  WhatsApp Distribuidor: <strong className="text-white font-bold">+507 6778-8375</strong>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  Email: <strong className="text-white font-bold select-all">hgwpanama507g@gmail.com</strong>
                </span>
              </p>
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700/80 text-[11px] text-slate-300 leading-snug">
                <strong className="text-blue-300 font-bold block mb-0.5">
                  Soporte a Socios Registrados:
                </strong>
                Si ya es socio activo de HGW, debe comunicarse directamente con su <em>patrocinador</em> o con el teléfono corporativo <strong>+507 392-8415</strong>. El WhatsApp de este sitio corresponde a distribuidores independientes.
              </div>
              <p className="pt-1 text-xs text-slate-400 leading-relaxed">
                Horario: Lun - Vie 9:00 am a 6:00 pm | Sáb 9:00 am a 1:00 pm. Envíos por Servientrega a todo Panamá.
              </p>
              <div className="pt-2">
                <a
                  href="https://www.healthgreenworld.com/?userName=Yamilka507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-blue-200 transition-colors font-bold"
                >
                  <span>Portal Oficial Health Green World (Yamilka507)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Independent Distributor Notice & Medical Disclaimer */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 leading-relaxed space-y-3">
          <p className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 text-slate-300">
            <strong className="text-white">Aviso Legal y de Independencia:</strong> Este sitio web es de carácter informativo y comercial, operado de manera autónoma por Distribuidores Independientes autorizados de Health Green World (HGW) en Panamá. No constituye la página web corporativa oficial ni la sede principal de Health Green World Inc. Las marcas registradas, logotipos y nombres comerciales mostrados pertenecen a sus respectivos propietarios y se utilizan únicamente con fines ilustrativos e informativos.
          </p>

          <p>
            <strong className="text-slate-300">Descargo de Responsabilidad Nutricional y de Salud:</strong> Los productos presentados en este sitio corresponden a alimentos funcionales, infusiones, suplementos nutricionales y artículos de cuidado personal. No son medicamentos y no han sido formulados para diagnosticar, mitigar, tratar, curar ni prevenir ninguna enfermedad o padecimiento. Consulte siempre a su médico o especialista de confianza ante cualquier inquietud de salud o antes de iniciar el consumo de cualquier suplemento si se encuentra en estado de embarazo, lactancia o bajo medicación médica.
          </p>
        </div>
      </div>

      {/* (16) Full-width Blue Footer Copyright Strip strictly matching PDF Page 13 */}
      <div className="w-full bg-[#4472C4] text-white py-4 px-4 text-center border-t border-white/15">
        <p className="text-xs sm:text-sm font-bold tracking-wide">
          © Copyright {new Date().getFullYear()} · HGW Panamá · Distribuidores Independientes Autorizados
        </p>
      </div>
    </footer>
  );
};
