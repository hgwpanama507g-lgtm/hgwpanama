import React from 'react';
import { PRODUCTS } from '../data/products';
import { Link } from '../router';
import { ShieldCheck, Truck, Clock, CreditCard, Check, Sparkles, MessageCircle, ArrowRight, Package } from 'lucide-react';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

export const ToothpastesLandingPage: React.FC = () => {
  // Filter only toothpastes (category 'cuidado-bucal')
  const toothpastes = PRODUCTS.filter(p => p.category === 'cuidado-bucal');

  const defaultWhatsappUrl = getAffiliationWhatsAppUrl(typeof window !== 'undefined' ? window.location.href : undefined);

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-[#00795F] rounded-full text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> 100% Sin Flúor ni Triclosán
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Pastas Dentales HGW <span className="text-[#00795F]">Cuidado Bucal Avanzado</span>
          </h1>
          <p className="text-lg text-stone-600 font-medium">
            Descubre nuestra línea de dentífricos formulados con tecnología de probióticos, nanoturmalina e ingredientes de la medicina tradicional china. Cuidado natural y eficaz para toda la familia en Panamá.
          </p>
        </div>

        {/* Service Policy Banner / Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-stone-200">
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
                Entre <strong className="text-stone-900">24 a 48 horas</strong> (sin contar fines de semana ni días feriados).
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
                Entregas a todo Panamá por <strong className="text-stone-900">Servientrega</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h2 className="text-2xl font-black text-stone-900">Catálogo de Pastas Dentales Disponibles</h2>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{toothpastes.length} Variedades</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {toothpastes.map((product) => {
              const productWhatsapp = getAffiliationWhatsAppUrl(
                typeof window !== 'undefined' ? `${window.location.origin}/producto/${product.slug}` : undefined
              );

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all group"
                >
                  <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center">
                    {/* Product Image */}
                    <div className="w-44 h-44 sm:w-52 sm:h-52 bg-stone-100 rounded-2xl p-4 shrink-0 flex items-center justify-center overflow-hidden border border-stone-100 relative group-hover:border-[#00795F]/40 transition-colors">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                        Sin Flúor ni Triclosán
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-3 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        {product.code && (
                          <span className="text-xs font-bold bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-md">
                            Cód: {product.code}
                          </span>
                        )}
                        <span className="text-xs font-bold bg-emerald-50 text-[#00795F] px-2.5 py-0.5 rounded-md">
                          {product.netContent || '120 gr'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                        <Link to={`/producto/${product.slug}`} className="hover:text-[#00795F] transition-colors">
                          {product.name}
                        </Link>
                      </h3>

                      <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                        {product.shortDescription}
                      </p>

                      <div className="flex items-baseline justify-center sm:justify-start gap-3 pt-2">
                        <span className="text-3xl font-black text-[#00795F]">{product.priceFormatted}</span>
                        <span className="text-xs font-bold text-stone-400 uppercase">Precio oficial</span>
                      </div>
                    </div>
                  </div>

                  {/* Advantages list snippet */}
                  <div className="px-6 sm:px-8 py-4 bg-stone-50 border-t border-stone-100 space-y-2">
                    <h4 className="text-xs font-extrabold text-stone-500 uppercase tracking-wider">Ventajas Principales:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.advantages?.slice(0, 4).map((adv, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-medium text-stone-700">
                          <Check className="w-4 h-4 text-[#00795F] shrink-0 mt-0.5" />
                          <span>{adv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="p-6 sm:p-8 bg-white border-t border-stone-100 flex flex-col sm:flex-row items-center gap-4">
                    <Link
                      to={`/producto/${product.slug}`}
                      className="w-full sm:w-auto px-5 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm rounded-2xl text-center transition-colors"
                    >
                      Ver Ficha Completa
                    </Link>

                    <a
                      href={productWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 py-3.5 px-6 bg-[#00795F] hover:bg-[#004d3c] text-white font-black text-base rounded-2xl shadow-lg shadow-[#00795F]/20 flex items-center justify-center gap-2.5 transition-all active:scale-95 uppercase tracking-wider"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Pedir por WhatsApp (Yappy)</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Order / Shipping Box */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Proceso de Compra y Envío</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">¿Cómo comprar tus Pastas Dentales HGW en Panamá?</h2>
            <p className="text-emerald-100 font-medium text-base">
              Garantizamos una experiencia de compra rápida, segura y transparente directo a la puerta de tu hogar u oficina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A550] text-white font-black flex items-center justify-center text-lg shadow-md">1</div>
              <h3 className="text-lg font-bold">1. Elige tu pasta y contáctanos</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                Haz clic en "Pedir por WhatsApp" en el producto que prefieras para enviarnos tu solicitud directamente.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A550] text-white font-black flex items-center justify-center text-lg shadow-md">2</div>
              <h3 className="text-lg font-bold">2. Paga seguro por Yappy</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                Realiza el pago del producto y el costo de envío (hasta $9.00 según distancia) a través de Yappy (Banco General).
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A550] text-white font-black flex items-center justify-center text-lg shadow-md">3</div>
              <h3 className="text-lg font-bold">3. Recibe con Servientrega</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                Enviamos tu pedido a domicilio a todo Panamá mediante Servientrega en un plazo de 24 a 48 horas (días hábiles).
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-emerald-200 font-medium">
              ¿Tienes dudas sobre tu zona de entrega o costo exacto de envío? Escríbenos sin compromiso.
            </p>
            <a
              href={defaultWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-8 bg-[#00A550] hover:bg-[#008f44] text-white font-extrabold rounded-xl shadow-lg flex items-center gap-2 transition-all uppercase tracking-wider text-sm"
            >
              <span>Consultar por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
