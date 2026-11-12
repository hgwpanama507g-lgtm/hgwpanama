import React from 'react';
import { Link } from '../router';
import { Sparkles, ShieldCheck, Check, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const InformationPage: React.FC = () => {
  // Find related products for each section
  const blueberryProducts = PRODUCTS.filter(p => p.category === 'cafes-bebidas' && (p.name.toLowerCase().includes('blueberry') || p.name.toLowerCase().includes('arándano') || p.name.toLowerCase().includes('vino') || p.name.toLowerCase().includes('choco blue') || p.name.toLowerCase().includes('berry juice')) || p.category === 'candies-snacks' && p.name.toLowerCase().includes('blueberry'));
  const turmalinaProducts = PRODUCTS.filter(p => p.category === 'turmalina');
  const coffeeProducts = PRODUCTS.filter(p => p.category === 'cafes-bebidas' && p.name.toLowerCase().includes('café') || p.name.toLowerCase().includes('coffee'));
  const reishiProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes('ganoderma') || p.name.toLowerCase().includes('gano'));

  return (
    <div className="py-8 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#00795F] transition-colors font-bold">Inicio</Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-black">Propiedades e Ingredientes Funcionales</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-[#00795F] rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-emerald-100">
            <BookOpen className="w-4 h-4" /> Fuente Oficial Catálogo HGW
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight mb-6">
            Guía de Ingredientes y Bienestar HGW
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-medium leading-relaxed">
            Información detallada basada en el catálogo oficial sobre los pilares naturales de nuestros productos funcionales: Arándanos Azules, Turmalina Bioenergética, Café y Reishi (Ganoderma).
          </p>
        </div>

        {/* Quick Navigation / Subsections Index */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <a href="#arandanos" className="p-6 bg-stone-50 hover:bg-emerald-50 rounded-3xl border border-stone-200 hover:border-[#00795F] transition-all text-center group">
            <span className="text-2xl mb-2 block">🫐</span>
            <span className="font-black text-stone-900 group-hover:text-[#00795F] block text-sm">Arándanos Azules</span>
          </a>
          <a href="#turmalina" className="p-6 bg-stone-50 hover:bg-emerald-50 rounded-3xl border border-stone-200 hover:border-[#00795F] transition-all text-center group">
            <span className="text-2xl mb-2 block">💎</span>
            <span className="font-black text-stone-900 group-hover:text-[#00795F] block text-sm">Turmalina</span>
          </a>
          <a href="#cafe" className="p-6 bg-stone-50 hover:bg-emerald-50 rounded-3xl border border-stone-200 hover:border-[#00795F] transition-all text-center group">
            <span className="text-2xl mb-2 block">☕</span>
            <span className="font-black text-stone-900 group-hover:text-[#00795F] block text-sm">Café Funcional</span>
          </a>
          <a href="#reishi" className="p-6 bg-stone-50 hover:bg-emerald-50 rounded-3xl border border-stone-200 hover:border-[#00795F] transition-all text-center group">
            <span className="text-2xl mb-2 block">🍄</span>
            <span className="font-black text-stone-900 group-hover:text-[#00795F] block text-sm">Reishi (Ganoderma)</span>
          </a>
        </div>

        {/* Subsections Content */}
        <div className="space-y-24">

          {/* 1. ARÁNDANOS AZULES */}
          <section id="arandanos" className="scroll-mt-24 bg-stone-50 rounded-[3rem] p-8 sm:p-12 border border-stone-200 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-3xl font-black shadow-inner">
                  🫐
                </div>
                <div>
                  <span className="text-xs font-black text-[#00795F] uppercase tracking-widest block mb-1">Superalimento Silvestre</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Arándanos Azules (Vaccinium corymbosum L.)</h2>
                </div>
                <p className="text-stone-700 text-base leading-relaxed font-medium">
                  El arándano azul es reconocido mundialmente por su concentración excepcional de antocianinas, polifenoles y compuestos bioactivos con una capacidad antioxidante hasta 50 veces superior a la vitamina E. Su biodisponibilidad permite una rápida absorción a nivel celular.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Protección avanzada de la agudeza visual y la salud ocular.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Poderoso escudo contra el estrés oxidativo y envejecimiento prematuro.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Soporte integral para la función cardiovascular y la memoria.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
                <h3 className="text-lg font-black text-black mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00795F]" /> Productos con Arándanos Azules HGW
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {blueberryProducts.slice(0, 4).map(prod => (
                    <Link to={`/producto/${prod.slug}`} key={prod.id} className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-2xl border border-stone-100 hover:border-[#00795F] transition-all flex items-center gap-4 group">
                      <img src={prod.image} alt={prod.name} className="w-14 h-14 object-contain shrink-0" />
                      <div>
                        <h4 className="font-bold text-stone-900 group-hover:text-[#00795F] text-sm line-clamp-1">{prod.name}</h4>
                        <span className="text-xs font-black text-[#00795F]">{prod.priceFormatted}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/productos" className="inline-flex items-center gap-2 text-xs font-black text-[#00795F] hover:underline uppercase tracking-wider">
                    Ver todos los productos de la categoría <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 2. TURMALINA */}
          <section id="turmalina" className="scroll-mt-24 bg-stone-50 rounded-[3rem] p-8 sm:p-12 border border-stone-200 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center text-3xl font-black shadow-inner">
                  💎
                </div>
                <div>
                  <span className="text-xs font-black text-[#00795F] uppercase tracking-widest block mb-1">Bioenergía Mineral</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Turmalina y Bienestar Físico</h2>
                </div>
                <p className="text-stone-700 text-base leading-relaxed font-medium">
                  La turmalina es un mineral natural con propiedades piroeléctricas y piezoeléctricas comprobadas. Al entrar en contacto con el calor corporal, emite aniones (iones negativos) y rayos infrarrojos lejanos que interactúan positivamente con el campo bioenergético humano.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Emisión constante de aniones que neutralizan la fatiga diaria.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Estímulo de la microcirculación local en cuello, muñecas y cuerpo.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Escudo protector frente a la contaminación electromagnética ambiental.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
                <h3 className="text-lg font-black text-black mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00795F]" /> Joyería y Accesorios de Turmalina HGW
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {turmalinaProducts.map(prod => (
                    <Link to={`/producto/${prod.slug}`} key={prod.id} className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-2xl border border-stone-100 hover:border-[#00795F] transition-all flex items-center gap-4 group">
                      <img src={prod.image} alt={prod.name} className="w-14 h-14 object-contain shrink-0" />
                      <div>
                        <h4 className="font-bold text-stone-900 group-hover:text-[#00795F] text-sm line-clamp-1">{prod.name}</h4>
                        <span className="text-xs font-black text-[#00795F]">{prod.priceFormatted}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. CAFÉ */}
          <section id="cafe" className="scroll-mt-24 bg-stone-50 rounded-[3rem] p-8 sm:p-12 border border-stone-200 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl font-black shadow-inner">
                  ☕
                </div>
                <div>
                  <span className="text-xs font-black text-[#00795F] uppercase tracking-widest block mb-1">Bebidas Funcionales</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Café con Extractos Botánicos</h2>
                </div>
                <p className="text-stone-700 text-base leading-relaxed font-medium">
                  Nuestra línea de cafés solubles combina granos seleccionados con extractos puros de hongos milenarios (Cordyceps, Reishi), arándanos, ashwagandha y trébol rojo. El resultado es una bebida aromática que aporta energía sin sobreestimulación ni acidez estomacal.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Energía sostenible y claridad mental durante toda la jornada.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Enriquecido con adaptógenos que modulan la respuesta al estrés.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Práctico formato en sobres individuales (sachets) solubles instantáneos.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
                <h3 className="text-lg font-black text-black mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00795F]" /> Variedades de Café HGW
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coffeeProducts.slice(0, 4).map(prod => (
                    <Link to={`/producto/${prod.slug}`} key={prod.id} className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-2xl border border-stone-100 hover:border-[#00795F] transition-all flex items-center gap-4 group">
                      <img src={prod.image} alt={prod.name} className="w-14 h-14 object-contain shrink-0" />
                      <div>
                        <h4 className="font-bold text-stone-900 group-hover:text-[#00795F] text-sm line-clamp-1">{prod.name}</h4>
                        <span className="text-xs font-black text-[#00795F]">{prod.priceFormatted}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/productos" className="inline-flex items-center gap-2 text-xs font-black text-[#00795F] hover:underline uppercase tracking-wider">
                    Ver catálogo completo de cafés <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 4. REISHI */}
          <section id="reishi" className="scroll-mt-24 bg-stone-50 rounded-[3rem] p-8 sm:p-12 border border-stone-200 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center text-3xl font-black shadow-inner">
                  🍄
                </div>
                <div>
                  <span className="text-xs font-black text-[#00795F] uppercase tracking-widest block mb-1">Hongo Milenario</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Reishi (Ganoderma lucidum)</h2>
                </div>
                <p className="text-stone-700 text-base leading-relaxed font-medium">
                  Conocido en la tradición oriental como el "hongo de la inmortalidad", el Ganoderma lucidum destaca por sus abundantes polisacáridos y triterpenos. Es uno de los adaptógenos más estudiados por su capacidad para modular el sistema inmune y promover la longevidad saludable.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Modulador natural de las defensas y la respuesta inmunitaria.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Potente acción antioxidante frente al estrés celular oxidativo.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00795F] shrink-0 mt-0.5" />
                    <span className="text-stone-800 font-bold text-sm">Apoyo integral para el descanso nocturno y el equilibrio nervioso.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
                <h3 className="text-lg font-black text-black mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00795F]" /> Productos con Ganoderma / Reishi HGW
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reishiProducts.map(prod => (
                    <Link to={`/producto/${prod.slug}`} key={prod.id} className="p-4 bg-stone-50 hover:bg-emerald-50 rounded-2xl border border-stone-100 hover:border-[#00795F] transition-all flex items-center gap-4 group">
                      <img src={prod.image} alt={prod.name} className="w-14 h-14 object-contain shrink-0" />
                      <div>
                        <h4 className="font-bold text-stone-900 group-hover:text-[#00795F] text-sm line-clamp-1">{prod.name}</h4>
                        <span className="text-xs font-black text-[#00795F]">{prod.priceFormatted}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Mandatory Health Disclaimer Box */}
        <div className="mt-20 p-8 sm:p-10 bg-amber-50 border-l-8 border-amber-500 rounded-3xl shadow-md">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-black text-amber-900 mb-2">Aviso Legal y de Salud</h3>
              <p className="text-amber-900 font-bold text-base sm:text-lg leading-relaxed">
                &ldquo;La información presentada es de carácter informativo y no sustituye el consejo de un profesional de la salud.&rdquo;
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
