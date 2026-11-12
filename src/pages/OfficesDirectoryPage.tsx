import React from 'react';
import { MapPin, Phone, Clock, Globe, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from '../router';

interface Office {
  country: string;
  city: string;
  name: string;
  address: string;
  phone?: string;
  hours?: string;
  isMain?: boolean;
}

const OFFICES: Office[] = [
  {
    country: "Panamá",
    city: "Ciudad de Panamá",
    name: "Sede Principal Panamá",
    address: "Avenida Porras, Plaza Royal Blue, Local No. 6, Corregimiento de San Francisco, Provincia de Panamá.",
    phone: "+507 392-8415",
    hours: "Lun - Vie: 09:00 am a 06:00 pm | Sáb: 09:00 am a 01:00 pm",
    isMain: true
  },
  {
    country: "Perú",
    city: "Lima",
    name: "Sede Corporativa Perú",
    address: "Av. Arequipa 4446, Miraflores, Lima.",
    phone: "+51 1 200 9330",
    hours: "Lun - Vie: 09:00 am a 06:00 pm | Sáb: 09:00 am a 01:00 pm",
    isMain: true
  },
  {
    country: "Perú",
    city: "Arequipa",
    name: "Sucursal Arequipa",
    address: "Urb. León XIII Mz. H Lt. 05, Cayma.",
    hours: "Lun - Sáb: Horario comercial"
  },
  {
    country: "Colombia",
    city: "Bogotá",
    name: "Sede Principal Colombia",
    address: "Calle 119 #14 - 42, Local 1, Barrio Santa Bárbara Central, Bogotá.",
    phone: "+57 601 744 3400",
    isMain: true
  },
  {
    country: "México",
    city: "CDMX",
    name: "Sede Principal México",
    address: "Av. Insurgentes Sur No. 1216, Int. 408 y 409, Col. Del Valle Centro, Alcaldía Benito Juárez, CP 03100.",
    isMain: true
  },
  {
    country: "Bolivia",
    city: "La Paz",
    name: "Sede Principal Bolivia",
    address: "Calle 23, Eduardo Diez de Medina N.° 105, Edificio Torre Titanium, Oficina 101, Calacoto.",
    isMain: true
  },
  {
    country: "Bolivia",
    city: "Santa Cruz",
    name: "Sucursal Santa Cruz",
    address: "Av. Irala N.° 615 (a dos cuadras y media de la Av. Cañoto).",
  },
  {
    country: "Ecuador",
    city: "Quito",
    name: "Centro Logístico Ecuador",
    address: "Atención y distribución mediante plataforma oficial Healthy Green World Ecuador S.A.",
    isMain: true
  },
  {
    country: "Chile",
    city: "Santiago",
    name: "Centro de Operaciones Chile",
    address: "Región Metropolitana, Santiago (Gestión mediante red de distribución oficial).",
    isMain: true
  }
];

export const OfficesDirectoryPage: React.FC = () => {
  // Group offices by country
  const countries = Array.from(new Set(OFFICES.map(o => o.country)));

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-[#00795F] font-bold text-sm mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
          
          <div className="flex flex-col items-center text-center">
            <img 
              src="https://media.academiahgw.online/wp-content/uploads/2026/11/LOGO-HGW-PANAMA-DISTRIBUIDOR-INDEPENDIENTE.png" 
              alt="HGW Logo" 
              className="h-16 sm:h-20 w-auto mb-8 object-contain"
            />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-[#00795F] text-xs font-black uppercase tracking-widest mb-4 border border-emerald-100">
              <Globe className="w-4 h-4" />
              <span>Presencia Internacional</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight max-w-4xl">
              DIRECTORIO COMPLETO DE OFICINAS <span className="text-[#00795F]">HGW LATINOAMÉRICA</span>
            </h1>
            <p className="mt-6 text-stone-600 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
              Encuentra la ubicación oficial y centros de atención corporativa de Health Green World en los países donde operamos formalmente.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {countries.map((country) => (
          <div key={country} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-black">{country}</h2>
              <div className="h-px bg-stone-300 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {OFFICES.filter(o => o.country === country).map((office, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-xl group ${
                    office.isMain 
                      ? 'border-[#00795F]/30 shadow-md ring-1 ring-[#00795F]/5' 
                      : 'border-stone-200 shadow-sm hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-[#00795F] group-hover:scale-110 transition-transform duration-300 border border-stone-100">
                      <MapPin className="w-6 h-6" />
                    </div>
                    {office.isMain && (
                      <span className="px-3 py-1 bg-[#00795F] text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-sm">
                        Sede Principal
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-black mb-2 leading-snug group-hover:text-[#00795F] transition-colors">
                    {office.name}
                  </h3>
                  <p className="text-stone-500 font-bold text-sm mb-6 uppercase tracking-wide">
                    {office.city}
                  </p>

                  <div className="space-y-4 border-t border-stone-100 pt-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#00A550] shrink-0 mt-0.5" />
                      <p className="text-stone-700 text-sm font-medium leading-relaxed">
                        {office.address}
                      </p>
                    </div>

                    {office.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#00A550] shrink-0" />
                        <p className="text-stone-700 text-sm font-bold tabular-nums">
                          {office.phone}
                        </p>
                      </div>
                    )}

                    {office.hours && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#00A550] shrink-0 mt-0.5" />
                        <p className="text-stone-600 text-xs font-medium italic">
                          {office.hours}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center gap-2 text-[#00795F] font-black text-xs uppercase tracking-widest bg-emerald-50 w-fit px-4 py-2 rounded-xl border border-emerald-100/50">
                      <ShieldCheck className="w-4 h-4" />
                      Oficina Oficial
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Global Footer Banner */}
        <div className="bg-stone-900 rounded-[3rem] p-10 sm:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00795F]/30 to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              ¿Listo para expandir tu negocio HGW internacionalmente?
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto font-medium">
              Forma parte de la familia Green World y lleva bienestar a toda Latinoamérica con nuestro sistema de compensación global.
            </p>
            <div className="pt-4">
              <Link 
                to="/preregistro" 
                className="inline-flex items-center gap-2 px-10 py-5 bg-[#00795F] hover:bg-[#00A550] text-white font-black text-lg rounded-2xl shadow-xl transition-all active:scale-95"
              >
                REGÍSTRATE AHORA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
