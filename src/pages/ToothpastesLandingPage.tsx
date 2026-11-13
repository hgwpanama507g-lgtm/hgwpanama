import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Link } from '../router';
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  CreditCard, 
  Check, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  Package, 
  Calculator, 
  Plus, 
  Minus, 
  BadgePercent, 
  Phone, 
  Mail, 
  MapPin, 
  UserCheck, 
  ExternalLink,
  Award,
  Zap,
  PlayCircle,
  AlertCircle
} from 'lucide-react';
import { DISTRIBUTOR_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const ToothpastesLandingPage: React.FC = () => {
  // Only the 3 toothpastes arriving/available in Panama (pasta green excluded per user request)
  const availableToothpastes = PRODUCTS.filter(
    p => p.category === 'cuidado-bucal' && p.id !== 'pasta-herbal-china' && p.slug !== 'green-world-herbs-toothpaste'
  );

  // Simulator quantities state
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'pasta-probioticos': 8,
    'pasta-turmalina-blanca': 5,
    'pasta-turmalina-negra': 5,
  });

  // Simulator updates
  const handleQtyChange = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Preset combinations for 50 BV
  const applyPreset = (preset: 'turmalina' | 'probioticos' | 'mixto') => {
    if (preset === 'turmalina') {
      // 17 Turmalina x 3 BV = 51 BV (9 blanca + 8 negra)
      setQuantities({
        'pasta-probioticos': 0,
        'pasta-turmalina-blanca': 9,
        'pasta-turmalina-negra': 8,
      });
    } else if (preset === 'probioticos') {
      // 20 Probioticos x 2.5 BV = 50 BV
      setQuantities({
        'pasta-probioticos': 20,
        'pasta-turmalina-blanca': 0,
        'pasta-turmalina-negra': 0,
      });
    } else {
      // Mixto: 8 probioticos (20 BV) + 5 blanca (15 BV) + 5 negra (15 BV) = 50 BV (18 pastas)
      setQuantities({
        'pasta-probioticos': 8,
        'pasta-turmalina-blanca': 5,
        'pasta-turmalina-negra': 5,
      });
    }
  };

  // Calculations for Simulator
  const qtyProbiotics = quantities['pasta-probioticos'] || 0;
  const qtyBlanca = quantities['pasta-turmalina-blanca'] || 0;
  const qtyNegra = quantities['pasta-turmalina-negra'] || 0;

  const totalPastas = qtyProbiotics + qtyBlanca + qtyNegra;
  const totalBv = (qtyProbiotics * 2.5) + (qtyBlanca * 3.0) + (qtyNegra * 3.0);
  const isUnlocked = totalBv >= 50;
  const bvGoal = 50.0;
  const bvProgress = Math.min(100, Math.round((totalBv / bvGoal) * 100));
  const bvMissing = Math.max(0, bvGoal - totalBv);

  const regularPriceTotal = totalPastas * 8.00;
  // If unlocked, $5.00 each, otherwise $8.00
  const discountedPriceTotal = totalPastas * (isUnlocked ? 5.00 : 8.00);
  const totalSavings = isUnlocked ? (totalPastas * 3.00) : 0;
  const shippingCost = totalPastas > 0 ? 9.00 : 0; // Hasta $9.00 según distancia
  const grandTotal = discountedPriceTotal + shippingCost;

  // Specific WhatsApp generator for individual products (Client vs Partner)
  const getProductWhatsappUrl = (productName: string, productSlug: string, mode: 'cliente' | 'socio') => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.hgwpanama.com';
    const pageUrl = `${origin}/producto/${productSlug}`;

    let msg = '';
    if (mode === 'cliente') {
      msg = `¡Hola Yamilka! Me interesa comprar como CLIENTE la pasta dental *${productName}* a precio regular de $8.00 USD. ¿Tienen disponibilidad inmediata para envío por Servientrega y pago por Yappy? (${pageUrl}) Mi nombre es:`;
    } else {
      msg = `¡Hola Yamilka! Me interesa comprar la pasta dental *${productName}* como SOCIO con el 30% de descuento (a $5.00 USD c/u acumulando 50 BV) y afiliarme a HGW Panamá. (${pageUrl}) Mi nombre es:`;
    }
    return `https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  // WhatsApp generator for the Simulator Custom Quote
  const getSimulatorWhatsappUrl = () => {
    let msg = `¡Hola Yamilka! Utilicé el simulador de pastas dentales en tu web y deseo cotizar este pedido:\n\n`;
    if (qtyProbiotics > 0) msg += `• ${qtyProbiotics}x Probiotics Toothpaste (2.50 BV c/u)\n`;
    if (qtyBlanca > 0) msg += `• ${qtyBlanca}x Tourmaline Toothpaste Blanca (3.00 BV c/u)\n`;
    if (qtyNegra > 0) msg += `• ${qtyNegra}x Tourmaline Toothpaste Negra (3.00 BV c/u)\n\n`;
    msg += `📦 *Total Pastas:* ${totalPastas} unidades\n`;
    msg += `⭐ *Puntos BV:* ${totalBv.toFixed(2)} BV\n`;
    if (isUnlocked) {
      msg += `🎉 *Aplica 30% Descuento (50 BV alcanzados):* $5.00 USD c/u\n`;
      msg += `💰 *Subtotal Pastas:* $${discountedPriceTotal.toFixed(2)} USD (Ahorro: $${totalSavings.toFixed(2)} USD)\n`;
    } else {
      msg += `💵 *Subtotal:* $${regularPriceTotal.toFixed(2)} USD (Faltaron ${bvMissing.toFixed(2)} BV para activar los $5.00 c/u)\n`;
    }
    msg += `🚚 *Envío Servientrega:* Hasta $9.00 USD según distancia\n`;
    msg += `💳 *Método de Pago:* Yappy (Banco General)\n\n`;
    msg += `Quisiera coordinar la compra y entrega a domicilio. Mi nombre es:`;
    return `https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-[#00795F] rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-4 h-4" /> 100% Sin Flúor ni Triclosán
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight">
            Pastas Dentales HGW <br className="hidden sm:inline" />
            <span className="text-[#00795F]">Cuidado Bucal Avanzado en Panamá</span>
          </h1>
          <p className="text-base sm:text-xl text-stone-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Formuladas con tecnología de probióticos bioactivos, nanoturmalina e ingredientes milenarios de la medicina tradicional china. Limpieza profunda, blanqueamiento natural y protección bucal para toda la familia.
          </p>

          {/* Promo Pill 50 BV banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 bg-gradient-to-r from-emerald-600 to-[#00795F] text-white rounded-2xl shadow-lg text-sm sm:text-base font-bold">
            <BadgePercent className="w-5 h-5 text-emerald-200" />
            <span>¡Super Promo 50 BV! Compra tus pastas a solo <strong>$5.00 USD c/u</strong> (30% de descuento) acumulando 50 BV</span>
            <a 
              href="#simulador" 
              className="ml-2 inline-flex items-center gap-1 bg-white text-[#00795F] px-3 py-1 rounded-xl text-xs font-black uppercase hover:bg-emerald-50 transition-colors shadow-xs"
            >
              Simular Pedido <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Highlights / Service Policies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-stone-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-[#00795F] rounded-2xl shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Costo de Envío</h3>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Hasta <strong className="text-stone-900">$9.00 USD</strong> según distancia (Cobertura a todo Panamá).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-[#00795F] rounded-2xl shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Tiempo de Entrega</h3>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Entre <strong className="text-stone-900">24 a 48 horas</strong> (sin contar fines de semana ni feriados).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-[#00795F] rounded-2xl shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Método de Pago</h3>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Pagos seguros y rápidos por <strong className="text-[#00795F]">Yappy</strong> (Banco General).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-[#00795F] rounded-2xl shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Envíos a Domicilio</h3>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Entregas a domicilio en todo el país por <strong className="text-stone-900">Servientrega</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-4 gap-2">
            <div>
              <span className="text-xs font-black text-[#00795F] uppercase tracking-wider block">Catálogo Oficial Panamá</span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Pastas Dentales Disponibles</h2>
            </div>
            <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full uppercase">
              {availableToothpastes.length} Variedades en Inventario
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {availableToothpastes.map((product) => {
              const bvValue = product.bv || (product.id === 'pasta-probioticos' ? 2.5 : 3.0);
              const clientWhatsapp = getProductWhatsappUrl(product.name, product.slug, 'cliente');
              const partnerWhatsapp = getProductWhatsappUrl(product.name, product.slug, 'socio');

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all group"
                >
                  <div>
                    {/* Top image & badges */}
                    <div className="relative bg-stone-50 p-6 flex items-center justify-center border-b border-stone-100 overflow-hidden">
                      <div className="w-48 h-48 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* BV Badge */}
                      <span className="absolute top-4 right-4 bg-stone-900 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                        ⭐ {bvValue.toFixed(2)} BV
                      </span>

                      {/* Fluoride-free badge */}
                      <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                        Sin Flúor ni Triclosán
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                        {product.code && <span>Cód: {product.code}</span>}
                        <span>Contenido: {product.netContent || '120 gr'}</span>
                      </div>

                      <h3 className="text-xl font-black text-stone-900 leading-snug">
                        <Link to={`/producto/${product.slug}`} className="hover:text-[#00795F] transition-colors">
                          {product.name}
                        </Link>
                      </h3>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Pricing block */}
                      <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-1.5">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-bold text-stone-500 uppercase">Precio Cliente:</span>
                          <span className="text-2xl font-black text-stone-900">$8.00 USD</span>
                        </div>
                        <div className="flex items-baseline justify-between pt-1 border-t border-emerald-200/60">
                          <span className="text-xs font-black text-[#00795F] uppercase flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" /> Precio Socio (50 BV):
                          </span>
                          <span className="text-xl font-black text-[#00795F]">$5.00 USD</span>
                        </div>
                        <p className="text-[11px] text-emerald-800 font-medium text-right">
                          Ahorras 30% ($3.00 c/u) con 50 BV
                        </p>
                      </div>

                      {/* Detailed Benefits directly from official Catalog */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#00795F]" /> Beneficios del Catálogo Oficial:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-stone-700">
                          {product.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#00795F] shrink-0 mt-0.5" />
                              <span className="leading-snug">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Action Buttons (Cliente vs Socio) */}
                  <div className="p-6 pt-0 space-y-2.5">
                    <a
                      href={clientWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-stone-900 hover:bg-black text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Comprar como Cliente ($8.00)</span>
                    </a>

                    <a
                      href={partnerWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-[#00795F] hover:bg-[#004d3c] text-white text-xs sm:text-sm font-black rounded-xl shadow-md shadow-[#00795F]/20 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Comprar como Socio ($5.00 c/u)</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TRAINING VIDEOS SECTION */}
        <div id="videos-capacitacion" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-black uppercase tracking-wider">
              <PlayCircle className="w-4 h-4" /> Videos de Capacitación
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Aprende sobre Nuestras Pastas Dentales
            </h2>
            <p className="text-stone-600 text-sm font-medium">
              Conoce a través de estas capacitaciones los beneficios de la nanoturmalina, ingredientes botánicos y el cuidado bucal avanzado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Video Pasta Blanca */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg flex flex-col justify-between">
              <div>
                <div className="aspect-video w-full bg-black relative">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/ktx3RJ54zgI"
                    title="Capacitación Pasta Dental de Turmalina Versión Blanca HGW"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00795F] bg-emerald-50 px-2 py-0.5 rounded-md">
                    Capacitación Oficial
                  </span>
                  <h3 className="text-base font-black text-stone-900 leading-snug">
                    Pasta Dental de Turmalina – Versión Blanca
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Descubre cómo los péptidos de soja, el xilitol, la menta y la turmalina combaten patógenos orales y eliminan el mal aliento.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a
                  href="https://youtu.be/ktx3RJ54zgI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver en YouTube</span>
                </a>
              </div>
            </div>

            {/* 2. Video Pasta Negra */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg flex flex-col justify-between">
              <div>
                <div className="aspect-video w-full bg-black relative">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/mmWFwGHLdfM"
                    title="Capacitación Pasta Dental de Turmalina Versión Negra HGW"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md">
                    Capacitación Oficial
                  </span>
                  <h3 className="text-base font-black text-stone-900 leading-snug">
                    Pasta Dental de Turmalina – Versión Negra
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Conoce el poder blanqueador suave sin abrasivos agresivos, acción antibacteriana con madreselva y protección de encías.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a
                  href="https://youtu.be/mmWFwGHLdfM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver en YouTube</span>
                </a>
              </div>
            </div>

            {/* 3. Pasta con Probioticos */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#00795F] flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                    Video en Preparación
                  </span>
                  <h3 className="text-lg font-black text-stone-900 mt-2 leading-snug">
                    Pasta Dental con Probióticos
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    El video de capacitación técnica para la pasta con probióticos se encuentra en edición. Mientras tanto, puedes consultar la ficha técnica oficial o solicitarnos información por WhatsApp.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
                <Link
                  to="/documentos/hgw-probiotics-toothpaste"
                  className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl text-center transition-colors"
                >
                  Ver Ficha Técnica PDF
                </Link>
                <a
                  href={`https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola Yamilka! Me gustaría recibir información detallada sobre la Pasta Dental con Probióticos HGW. Mi nombre es:')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-[#00795F] hover:bg-[#005a46] text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SIMULATOR SECTION (50 BV = 30% Descuento / $5.00 c/u) */}
        <div id="simulador" className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border-2 border-emerald-200 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-amber-700" /> Simulador Interactivo de Descuento
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Calcula tus Pastas para alcanzar 50 BV y obtener el 30% de Descuento
            </h2>
            <p className="text-stone-600 font-medium text-sm sm:text-base leading-relaxed">
              En HGW Panamá, si acumulas <strong>50 BV en productos de libre elección</strong>, desbloqueas tu Membresía Pre-Junior y obtienes un <strong>30% de descuento directo</strong>: ¡cada pasta dental te queda en solo <strong>$5.00 USD</strong> (en vez de $8.00)! Elige tus cantidades abajo:
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-black text-stone-500 uppercase tracking-wider block">
              Combinaciones Rápidas Recomendadas (Alcanzan 50 BV):
            </span>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => applyPreset('mixto')}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#00795F] border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>✨ Pack Mixto (18 pastas: 8 Probioticos + 5 Blanca + 5 Negra = 50 BV)</span>
              </button>
              <button
                onClick={() => applyPreset('turmalina')}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>⚫ 17 Pastas Turmalina (51 BV = $85.00)</span>
              </button>
              <button
                onClick={() => applyPreset('probioticos')}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>🌿 20 Pastas Probióticos (50 BV = $100.00)</span>
              </button>
            </div>
          </div>

          {/* Interactive Pickers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* 1. Probioticos */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta-dental-con-probioticos-HGW.jpg" 
                  alt="Probiotics Toothpaste" 
                  className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-stone-200 shrink-0"
                />
                <div>
                  <h4 className="font-black text-stone-900 text-sm leading-tight">Probiotics Toothpaste</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black bg-emerald-100 text-[#00795F] px-2 py-0.5 rounded">
                      2.50 BV c/u
                    </span>
                    <span className="text-xs font-bold text-stone-500">$8 / $5 USD</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => handleQtyChange('pasta-probioticos', -1)}
                  className="w-9 h-9 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center transition-colors active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="text-xl font-black text-stone-900">{qtyProbiotics}</span>
                  <span className="text-[10px] text-stone-400 block font-bold uppercase">unidades</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleQtyChange('pasta-probioticos', 1)}
                  className="w-9 h-9 rounded-lg bg-[#00795F] hover:bg-[#005a46] text-white font-bold flex items-center justify-center transition-colors active:scale-95 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-stone-500 flex justify-between font-semibold pt-1 border-t border-stone-200">
                <span>Puntos acumulados:</span>
                <strong className="text-stone-900">{(qtyProbiotics * 2.5).toFixed(2)} BV</strong>
              </div>
            </div>

            {/* 2. Turmalina Blanca */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta-dental-con-turmalina-blanca.jpg" 
                  alt="Turmalina Blanca" 
                  className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-stone-200 shrink-0"
                />
                <div>
                  <h4 className="font-black text-stone-900 text-sm leading-tight">Tourmaline Blanca</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black bg-emerald-100 text-[#00795F] px-2 py-0.5 rounded">
                      3.00 BV c/u
                    </span>
                    <span className="text-xs font-bold text-stone-500">$8 / $5 USD</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => handleQtyChange('pasta-turmalina-blanca', -1)}
                  className="w-9 h-9 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center transition-colors active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="text-xl font-black text-stone-900">{qtyBlanca}</span>
                  <span className="text-[10px] text-stone-400 block font-bold uppercase">unidades</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleQtyChange('pasta-turmalina-blanca', 1)}
                  className="w-9 h-9 rounded-lg bg-[#00795F] hover:bg-[#005a46] text-white font-bold flex items-center justify-center transition-colors active:scale-95 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-stone-500 flex justify-between font-semibold pt-1 border-t border-stone-200">
                <span>Puntos acumulados:</span>
                <strong className="text-stone-900">{(qtyBlanca * 3.0).toFixed(2)} BV</strong>
              </div>
            </div>

            {/* 3. Turmalina Negra */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://media.academiahgw.online/wp-content/uploads/2026/11/Pasta_dental_con_turmalina_negra-removebg-preview.png" 
                  alt="Turmalina Negra" 
                  className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-stone-200 shrink-0"
                />
                <div>
                  <h4 className="font-black text-stone-900 text-sm leading-tight">Tourmaline Negra</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black bg-emerald-100 text-[#00795F] px-2 py-0.5 rounded">
                      3.00 BV c/u
                    </span>
                    <span className="text-xs font-bold text-stone-500">$8 / $5 USD</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => handleQtyChange('pasta-turmalina-negra', -1)}
                  className="w-9 h-9 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center transition-colors active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="text-xl font-black text-stone-900">{qtyNegra}</span>
                  <span className="text-[10px] text-stone-400 block font-bold uppercase">unidades</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleQtyChange('pasta-turmalina-negra', 1)}
                  className="w-9 h-9 rounded-lg bg-[#00795F] hover:bg-[#005a46] text-white font-bold flex items-center justify-center transition-colors active:scale-95 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-stone-500 flex justify-between font-semibold pt-1 border-t border-stone-200">
                <span>Puntos acumulados:</span>
                <strong className="text-stone-900">{(qtyNegra * 3.0).toFixed(2)} BV</strong>
              </div>
            </div>
          </div>

          {/* Progress Bar towards 50 BV */}
          <div className="p-6 bg-stone-100/80 rounded-2xl space-y-3 border border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-black uppercase text-stone-700 tracking-wider">
                Progreso hacia los 50 BV de Activación con 30% Descuento:
              </span>
              <span className="text-sm font-black text-stone-900">
                {totalBv.toFixed(2)} / 50.00 BV ({bvProgress}%)
              </span>
            </div>

            <div className="w-full bg-stone-300 h-4 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isUnlocked ? 'bg-gradient-to-r from-emerald-500 to-[#00A550]' : 'bg-[#00795F]'
                }`}
                style={{ width: `${bvProgress}%` }}
              />
            </div>

            {isUnlocked ? (
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm sm:text-base bg-emerald-100 p-3 rounded-xl border border-emerald-300">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>¡Felicidades! Alcanzaste {totalBv.toFixed(2)} BV. Calificas al 30% de Descuento: cada pasta te queda en <strong>$5.00 USD</strong>.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-stone-600 font-semibold text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Te faltan <strong>{bvMissing.toFixed(2)} BV</strong> para activar el precio mayorista de $5.00 USD por pasta.</span>
              </div>
            )}
          </div>

          {/* Results Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
            <div className="space-y-4">
              <h3 className="text-lg font-black text-emerald-300 uppercase tracking-wider">
                Resumen de tu Selección
              </h3>

              <div className="space-y-2 text-sm text-emerald-100 font-medium">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Total de Pastas Dentales:</span>
                  <strong className="text-white font-bold">{totalPastas} unidades</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Puntos BV Acumulados:</span>
                  <strong className="text-emerald-300 font-black">{totalBv.toFixed(2)} BV</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Precio Público Regular ($8.00 c/u):</span>
                  <span className="text-stone-300 line-through">${regularPriceTotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Precio con Descuento ({isUnlocked ? '$5.00 c/u' : '$8.00 c/u'}):</span>
                  <strong className="text-emerald-400 text-lg font-black">${discountedPriceTotal.toFixed(2)} USD</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Costo de Envío (Servientrega):</span>
                  <span className="text-emerald-200">Hasta $9.00 USD según distancia</span>
                </div>
              </div>

              {isUnlocked && (
                <div className="p-3.5 bg-[#00A550]/20 rounded-xl border border-[#00A550]/40 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-300">¡Tu Ahorro Inmediato!</span>
                  <span className="text-xl font-black text-white">${totalSavings.toFixed(2)} USD</span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between space-y-6 md:border-l md:border-white/15 md:pl-6">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400 block">Total Estimado del Pedido</span>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  ${grandTotal.toFixed(2)} <span className="text-base text-emerald-200 font-normal">USD (+ envío según zona)</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  Entrega de 24 a 48 horas hábiles a todo Panamá por <strong>Servientrega</strong>. Pago seguro por <strong>Yappy (Banco General)</strong>.
                </p>
              </div>

              <a
                href={getSimulatorWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#00A550] hover:bg-[#008f44] text-white font-black text-base rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all active:scale-95 uppercase tracking-wider text-center"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Pedir esta Cotización por WhatsApp (Yappy)</span>
              </a>
            </div>
          </div>
        </div>

        {/* How to Order / Shipping Policy Detail */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-lg space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-black text-[#00795F] uppercase tracking-widest">Información de Entrega y Pago</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Envíos a Todo Panamá</h2>
            <p className="text-stone-600 text-sm sm:text-base font-medium">
              Realizamos envíos a domicilio en las 10 provincias y comarcas con la empresa líder de logística.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00795F] font-black flex items-center justify-center">1</div>
              <h3 className="font-extrabold text-stone-900 text-base">Costos Transparentes</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                El costo de envío es de <strong>hasta $9.00 USD según la distancia</strong> de tu localidad en Panamá.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00795F] font-black flex items-center justify-center">2</div>
              <h3 className="font-extrabold text-stone-900 text-base">Tiempos de Entrega</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Entrega estimada entre <strong>24 a 48 horas hábiles</strong> (sin contar fines de semana ni días feriados).
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00795F] font-black flex items-center justify-center">3</div>
              <h3 className="font-extrabold text-stone-900 text-base">Pagos por Yappy</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Paga de forma instantánea y confiable con <strong>Yappy (Banco General)</strong> al coordinar tu pedido.
              </p>
            </div>
          </div>
        </div>

        {/* ORAL HEALTH DISCLAIMER */}
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
          <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-black uppercase tracking-wider block text-amber-950 text-xs sm:text-sm">
              Aviso Importante sobre Salud Bucal y Nuestros Productos:
            </strong>
            <p>
              Las pastas dentales HGW son productos cosméticos e higiénicos formulados para el cuidado bucal diario con extractos botánicos, minerales y probióticos bioactivos. No constituyen medicamentos ni sustituyen los tratamientos médicos u odontológicos profesionales, ni pretenden diagnosticar, tratar, curar o prevenir por sí solas afecciones periodontales graves. Recomendamos realizar visitas periódicas a su odontólogo de confianza para el cuidado integral de su salud bucodental.
            </p>
          </div>
        </div>

        {/* AUTHOR / DISTRIBUTOR PROFILE SECTION (Yamilka Batista) */}
        <div className="bg-gradient-to-br from-emerald-900 via-[#004d3c] to-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A550]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Photo & Identity Column */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-[#00A550] via-emerald-400 to-white shadow-2xl">
                <img
                  src="https://media.academiahgw.online/wp-content/uploads/2026/11/Foto-de-Perfil-Yamilka-Batista-Emprendedora-HGW-2-1024x1024.jpeg"
                  alt="Yamilka Batista - Distribuidora Independiente Autorizada HGW Panamá"
                  className="w-full h-full object-cover rounded-full bg-stone-800"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/Foto-de-Perfil-Yamilka-Batista-Emprendedora-HGW-1-1024x1024.jpeg";
                  }}
                />
                <span className="absolute bottom-2 right-2 bg-[#00A550] text-white p-2 rounded-full shadow-lg border-2 border-emerald-950">
                  <UserCheck className="w-5 h-5" />
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">Yamilka Batista</h3>
                <p className="text-emerald-300 font-bold text-sm">Distribuidora Independiente Autorizada HGW Panamá</p>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-emerald-200 border border-white/15">
                  <span>Código de Patrocinio:</span>
                  <strong className="text-white font-black">Yamilka507</strong>
                </div>
              </div>
            </div>

            {/* Pitch Elevator & Contact Info Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-extrabold text-emerald-300 border border-white/10 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Tu Asesora y Enlace Directo
              </div>

              {/* Elevator Pitch (without prices, without costs, without shipping logistics) */}
              <div className="space-y-3">
                <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  Ayudando a las familias a sonreír con productos más sanos, puros y naturales.
                </h4>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-normal">
                  «¡Hola! Soy Yamilka Batista. Mi pasión y propósito es ayudarte a ti y a tu familia a cuidar la sonrisa de la manera más saludable y consciente posible. Muchas personas no conocen la cantidad de químicos agresivos presentes en los dentífricos convencionales; por eso, me dedico a orientarte y facilitarte alternativas verdaderamente beneficiosas: pastas dentales innovadoras, <strong>100% libres de flúor y libres de triclosán</strong>, enriquecidas con probióticos bioactivos y nanoturmalina. Mi compromiso es brindarte una atención cercana, honesta y personalizada para que protejas tus encías, mantengas un aliento fresco duradero y disfrutes de una salud bucal plena todos los días.»
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${DISTRIBUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola Yamilka! Vi tu perfil en la landing de pastas dentales HGW Panamá y deseo consultarte. Mi nombre es:')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl transition-all group flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
                  </div>
                  <strong className="text-white text-base font-black group-hover:text-emerald-300 transition-colors">
                    +507 6778-8375
                  </strong>
                  <span className="text-[11px] text-emerald-200">Chat directo inmediato</span>
                </a>

                {/* Email */}
                <div className="p-4 bg-white/10 border border-white/15 rounded-2xl flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Correo</span>
                  </div>
                  <strong className="text-white text-xs sm:text-sm font-bold truncate select-all">
                    hgwpanama507g@gmail.com
                  </strong>
                  <span className="text-[11px] text-emerald-200">Atención y consultas</span>
                </div>

                {/* Location */}
                <div className="p-4 bg-white/10 border border-white/15 rounded-2xl flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Ubicación</span>
                  </div>
                  <strong className="text-white text-sm font-black">
                    Ciudad de Panamá
                  </strong>
                  <span className="text-[11px] text-emerald-200">Envíos a todo Panamá</span>
                </div>
              </div>

              {/* Action Link to Official Affiliate Registration */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://www.healthgreenworld.com/?userName=Yamilka507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-emerald-50 text-stone-900 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg uppercase tracking-wider"
                >
                  <span>Afiliarse en Portal Oficial HGW</span>
                  <ExternalLink className="w-4 h-4 text-[#00795F]" />
                </a>

                <span className="text-xs text-emerald-300 font-medium text-center sm:text-left">
                  Patrocinador oficial autorizado: <strong>Yamilka507</strong>
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
