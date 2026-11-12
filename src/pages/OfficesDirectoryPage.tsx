import React from 'react';
import { MapPin, Phone, Clock, Globe, ShieldCheck, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from '../router';

interface Office {
  country: string;
  city: string;
  name: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  hours?: string;
  isMain?: boolean;
}

const OFFICES: Office[] = [
  // --- PANAMÁ ---
  {
    country: "Panamá",
    city: "Ciudad de Panamá",
    name: "Sede Principal Panamá",
    address: "Avenida Porras, Plaza Royal Blue, Local No. 6, Corregimiento de San Francisco, Provincia de Panamá.",
    phone: "+507 392-8415",
    whatsapp: "+507 392-8415",
    hours: "Lun - Vie: 09:00 am a 06:00 pm | Sáb: 09:00 am a 01:00 pm | Dom: Cerrado",
    isMain: true
  },
  // --- PERÚ ---
  {
    country: "Perú",
    city: "Lima",
    name: "Sede Corporativa Lima",
    address: "Av. Arequipa 4446, Miraflores, Lima.",
    whatsapp: "+51 967 678 797",
    hours: "Lun - Vie: 09:00 am a 6:00 pm | Sáb: 09:00 am a 1:00 pm",
    isMain: true
  },
  {
    country: "Perú",
    city: "Arequipa",
    name: "Oficina Arequipa",
    address: "Urb. León XIII Mz. H Lt. 05.",
    whatsapp: "+51 913 622 247",
    hours: "Lun - Vie: 09:00 am a 6:00 pm (Refrigerio 1-2 pm) | Sáb: 09:00 am a 1:00 pm"
  },
  {
    country: "Perú",
    city: "Huancayo",
    name: "Oficina Huancayo",
    address: "Jr. Cusco N. 155 Huancayo.",
    whatsapp: "+51 913 661 118",
    hours: "Lun - Vie: 10:00 am a 7:00 pm (Refrigerio 1-2 pm) | Sáb: 09:00 am a 1:00 pm"
  },
  {
    country: "Perú",
    city: "Jaén",
    name: "Oficina Jaén",
    address: "Ca. Pardo Miguel N.369 - Jaén Cajamarca.",
    whatsapp: "+51 952 400 705",
    hours: "Lun - Vie: 09:00 am a 6:00 pm (Refrigerio 1-2 pm) | Sáb: 09:00 am a 1:00 pm"
  },
  {
    country: "Perú",
    city: "Tacna",
    name: "Oficina Tacna",
    address: "Av. Pinto N° K-14 (1265), Alto de Alianza.",
    whatsapp: "+51 956 383 885",
    hours: "Lun - Vie: 10:00 am a 7:00 pm (Refrigerio 1-2 pm) | Sáb: 09:00 am a 1:00 pm"
  },
  // --- BOLIVIA ---
  {
    country: "Bolivia",
    city: "La Paz",
    name: "Sede Principal La Paz",
    address: "Calle 23, Eduardo Diez de Medina No. 105, Ed. Torre TITANIUM. Oficina 101. Calacoto.",
    whatsapp: "+591 60130676",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb y Dom: Cerrado",
    isMain: true
  },
  {
    country: "Bolivia",
    city: "Cochabamba",
    name: "Oficina Cochabamba",
    address: "Calle 25 de mayo entre Mayor Rocha y Ecuador #0375. Piso 2 Of. 4.",
    whatsapp: "+591 72055536",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 09:00 am a 12:00 pm | Dom: Cerrado"
  },
  {
    country: "Bolivia",
    city: "El Alto",
    name: "Oficina El Alto",
    address: "Calle 1 esquina Avenida Franco Valle, galería la Caja 3er. piso.",
    whatsapp: "+591 71231091",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 09:00 am a 12:00 pm | Dom: Cerrado"
  },
  {
    country: "Bolivia",
    city: "Ivirgarzama",
    name: "Oficina Ivirgarzama",
    address: "Calle Ecología y Av. Mortenson, Frente a la Plaza Principal, Barrio Central.",
    whatsapp: "+591 73980259",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 09:00 am a 12:00 pm | Dom: Cerrado"
  },
  {
    country: "Bolivia",
    city: "Oruro",
    name: "Oficina Oruro",
    address: "Av. Brasil #100 Zona Central entre Calle Bolivar y Sucre.",
    whatsapp: "+591 72055538",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 09:00 am a 12:00 pm | Dom: Cerrado"
  },
  {
    country: "Bolivia",
    city: "Potosí",
    name: "Oficina Potosí",
    address: "Mega Mall piso 2, Calle Chayanta.",
    whatsapp: "+591 68212255",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 09:00 am a 12:00 pm | Dom: Cerrado"
  },
  {
    country: "Bolivia",
    city: "Quillacollo",
    name: "Oficina Quillacollo",
    address: "Av. Waldo Ballivián, entre 20 de Diciembre y Luis Uría, Primer piso.",
    whatsapp: "+591 73460119",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 09:00 am a 12:00 pm | Dom: Cerrado"
  },
  {
    country: "Bolivia",
    city: "Santa Cruz",
    name: "Oficina Santa Cruz",
    address: "Av. Irala N.615 (A dos cuadras y media de la Av. Cañoto).",
    whatsapp: "+591 72030346",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 09:00 am a 12:00 pm | Dom: Cerrado"
  },
  {
    country: "Bolivia",
    city: "Sucre",
    name: "Oficina Sucre",
    address: "Av. Hernando Siles, #713 Centro Comercial \"Roacaf\". Piso 2, Oficina 18 y 19.",
    whatsapp: "+591 64321961",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 09:00 am a 12:00 pm | Dom: Cerrado"
  },
  // --- COLOMBIA ---
  {
    country: "Colombia",
    city: "Bogotá Norte",
    name: "Sede Bogotá Norte",
    address: "Calle 119 #14 - 42 Barrio Santa Bárbara Central.",
    whatsapp: "+57 321 221 8855",
    phone: "+57 601 744 3400",
    hours: "Lun - Vie: 09:00 am a 18:00 pm | Sáb: 09:00 am a 13:00 pm | Dom: Cerrado",
    isMain: true
  },
  {
    country: "Colombia",
    city: "Bogotá Sur",
    name: "Oficina Bogotá Sur",
    address: "C.C. Outlet Factory. Avenida de las Américas No. 62-84, Locales 1-26 y 1-27.",
    whatsapp: "+57 321 221 8854",
    hours: "Lun - Vie: 09:00 am a 18:00 pm | Sáb: 09:00 am a 13:00 pm | Dom: Cerrado"
  },
  {
    country: "Colombia",
    city: "Cali",
    name: "Oficina Cali",
    address: "Av. 8 Norte 17-26 Barrio Granada.",
    whatsapp: "+57 321 221 8855",
    phone: "+57 314 291 2647",
    hours: "Lun - Vie: 09:00 am a 18:00 pm | Sáb: 09:00 am a 13:00 pm | Dom: Cerrado"
  },
  {
    country: "Colombia",
    city: "Medellín",
    name: "Oficina Medellín",
    address: "Carrera 43 - 25 A 233 Lomas de San Julián.",
    whatsapp: "+57 321 221 8855",
    phone: "+57 311 434 2391",
    hours: "Lun - Vie: 09:00 am a 18:00 pm | Sáb: 09:00 am a 13:00 pm | Dom: Cerrado"
  },
  {
    country: "Colombia",
    city: "Yopal",
    name: "Oficina Yopal",
    address: "Calle 21 #19a - 29 Barrio Gabán.",
    whatsapp: "+57 321 221 8855",
    phone: "+57 314 291 6428",
    hours: "Lun - Vie: 09:00 am a 18:00 pm | Sáb: 09:00 am a 13:00 pm | Dom: Cerrado"
  },
  // --- ECUADOR ---
  {
    country: "Ecuador",
    city: "Quito",
    name: "Sede Principal Quito",
    address: "Av. 6 de diciembre N25-96 y Pasaje Batallas.",
    whatsapp: "+593 098 589 1669",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 10:00 am a 14:00 pm | Dom: Cerrado",
    isMain: true
  },
  {
    country: "Ecuador",
    city: "Guayaquil",
    name: "Oficina Guayaquil",
    address: "Luis Urdaneta 1100 entre Av. Quito y Av Machala.",
    whatsapp: "+593 980609976",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 10:00 am a 14:00 pm | Dom: Cerrado"
  },
  {
    country: "Ecuador",
    city: "Machala",
    name: "Oficina Machala",
    address: "Rocafuerte entre Napoleón Mera y 23 de abril.",
    whatsapp: "+593 992382749",
    hours: "Lun - Vie: 09:00 am a 13:00 pm, 14:00 pm a 17:00 pm | Sáb: 10:00 am a 14:00 pm | Dom: Cerrado"
  },
  {
    country: "Ecuador",
    city: "Quevedo",
    name: "Oficina Quevedo",
    address: "Calle Bolívar y décima tercera, edificio Ahuíng.",
    whatsapp: "+593 997557856",
    hours: "Lun - Vie: 09:00 am a 13:00 pm, 14:00 pm a 17:00 pm | Sáb: 10:00 am a 14:00 pm | Dom: Cerrado"
  },
  // --- MÉXICO ---
  {
    country: "México",
    city: "CDMX",
    name: "Sede Corporativa CDMX",
    address: "Av. Insurgentes Sur Ext. 1216, Int. 408 y 409, Col del Valle Centro, C.P. 03100.",
    whatsapp: "+52 55 50646959",
    hours: "Lun - Vie: 09:00 am a 18:00 pm | Sáb: 09:00 am a 12:00 pm | Dom: Cerrado",
    isMain: true
  },
  // --- ESPAÑA ---
  {
    country: "España",
    city: "Barcelona",
    name: "Sede Corporativa Barcelona",
    address: "Calle Joan Guell 144, BJ 1, Barcelona, 08028.",
    whatsapp: "+34 623 46 50 13",
    phone: "+34 622 51 98 51",
    hours: "Lun - Vie: 09:30 am a 19:00 pm | Sáb: 10:00 am a 14:00 pm | Dom: Cerrado",
    isMain: true
  },
  // --- CHILE ---
  {
    country: "Chile",
    city: "Santiago",
    name: "Sede Principal Santiago",
    address: "Andrés Bello #2325 L1 Providencia RM.",
    whatsapp: "+56 9 4028 7186",
    phone: "+56 9 4028 7193",
    hours: "Lun - Jue: 09:00 - 13:00, 14:00 - 19:00 | Vie: 09:00 - 13:00, 14:00 - 18:00 | Sáb: 09:00 - 13:00 | Dom: Cerrado",
    isMain: true
  },
  // --- GUATEMALA ---
  {
    country: "Guatemala",
    city: "Guatemala",
    name: "Sede Principal Guatemala",
    address: "Calzada Raul Aguilar Batres 34-52 Colonia las Charcas, Local I-17 Planta alta, C.C. Galerías del Sur, Zona 11.",
    phone: "+502 4847 9068",
    hours: "Lun - Dom: 09:00 am a 18:00 pm",
    isMain: true
  },
  // --- PARAGUAY ---
  {
    country: "Paraguay",
    city: "Asunción",
    name: "Sede Principal Paraguay",
    address: "Av. España 2124 c/ Zanotti Cavazzonni.",
    whatsapp: "+595 974 923077",
    hours: "Lun - Vie: 09:00 am a 18:00 pm | Sáb: 08:30 am a 12:00 pm | Dom: Cerrado",
    isMain: true
  },
  // --- REPÚBLICA DOMINICANA ---
  {
    country: "República Dominicana",
    city: "Santo Domingo",
    name: "Sede Principal RD",
    address: "Av. 27 de Febrero No. 251, casi esquina Abraham Lincoln, Ensanche Naco.",
    phone: "+1 (809) 855-7167",
    whatsapp: "+57 321 221 8855",
    hours: "Lun - Vie: 09:00 am a 18:00 pm | Sáb: 09:00 am a 13:00 pm | Dom: Cerrado",
    isMain: true
  },
  // --- EL SALVADOR ---
  {
    country: "El Salvador",
    city: "San Salvador",
    name: "Sede Principal El Salvador",
    address: "Calle Padres Aguilar #2, Local No. 3 entre 85 y 87 Av. Sur, Colonia Escalón.",
    phone: "+503 2556 8699",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 09:00 am a 13:00 pm | Dom: Cerrado",
    isMain: true
  },
  // --- COSTA RICA ---
  {
    country: "Costa Rica",
    city: "San José",
    name: "Sede Principal Costa Rica",
    address: "San José El Carmen, Avenida 5 Calle 1.",
    phone: "+506 7185 5885",
    hours: "Lun - Vie: 09:00 am a 17:30 pm | Sáb: 10:00 am a 14:00 pm | Dom: Cerrado",
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
              <span>Presencia Global</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight max-w-4xl">
              DIRECTORIO COMPLETO DE OFICINAS <span className="text-[#00795F]">HGW LATINOAMÉRICA Y ESPAÑA</span>
            </h1>
            <p className="mt-6 text-stone-600 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
              Explora nuestra red oficial de centros corporativos y logísticos. Contamos con {OFFICES.length} ubicaciones activas para brindarte el mejor soporte.
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
              <span className="text-stone-400 font-bold text-sm bg-stone-100 px-3 py-1 rounded-lg border border-stone-200 uppercase tracking-widest">
                {OFFICES.filter(o => o.country === country).length} {OFFICES.filter(o => o.country === country).length === 1 ? 'ubicación' : 'ubicaciones'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {OFFICES.filter(o => o.country === country).map((office, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-xl group flex flex-col justify-between ${
                    office.isMain 
                      ? 'border-[#00795F]/30 shadow-md ring-1 ring-[#00795F]/5' 
                      : 'border-stone-200 shadow-sm hover:border-stone-300'
                  }`}
                >
                  <div>
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

                      {office.whatsapp && (
                        <div className="flex items-center gap-3">
                          <MessageCircle className="w-5 h-5 text-[#00A550] shrink-0" />
                          <p className="text-stone-700 text-sm font-bold tabular-nums">
                            WhatsApp: {office.whatsapp}
                          </p>
                        </div>
                      )}

                      {office.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-[#00A550] shrink-0" />
                          <p className="text-stone-700 text-sm font-bold tabular-nums">
                            Tel: {office.phone}
                          </p>
                        </div>
                      )}

                      {office.hours && (
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#00A550] shrink-0 mt-0.5" />
                          <p className="text-stone-600 text-xs font-medium italic leading-relaxed">
                            {office.hours}
                          </p>
                        </div>
                      )}
                    </div>
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
              Forma parte de la familia Green World y lleva bienestar a todo el mundo con nuestro sistema de compensación global.
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
