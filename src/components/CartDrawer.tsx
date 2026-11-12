import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, MapPin, User, MessageSquare } from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('Panamá Centro');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://hgwpanama.com';
    let message = `¡Hola! Estaba visitando tu tienda online (${currentUrl}) y deseo coordinar la compra y entrega del siguiente pedido:\n\n`;
    
    items.forEach((item) => {
      const itemTotal = (item.product.price * item.quantity).toFixed(2);
      message += `▫️ *${item.quantity}x* ${item.product.name} — $${itemTotal} USD\n`;
    });

    message += `\n*TOTAL ESTIMADO:* $${subtotal.toFixed(2)} USD\n\n`;

    if (customerName.trim()) {
      message += `👤 *Cliente:* ${customerName.trim()}\n`;
    }
    message += `📍 *Ubicación / Ciudad:* ${location}\n`;
    if (deliveryNotes.trim()) {
      message += `📝 *Dirección / Detalle:* ${deliveryNotes.trim()}\n`;
    }

    message += `\n¿Tienen disponibilidad para coordinar entrega o envío en Panamá? Muchas gracias.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/50767788375?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#00795F]" />
              <h2 className="text-base font-bold text-stone-900">
                Tu Pedido de Productos
              </h2>
              <span className="text-xs bg-[#00795F]/10 text-[#00795F] font-bold px-2 py-0.5 rounded-full tabular-nums">
                {items.length} {items.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors"
              aria-label="Cerrar pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-800">Tu pedido está vacío</h3>
                <p className="text-xs text-stone-500 mt-1.5 max-w-xs leading-relaxed">
                  Explora nuestro catálogo de cafés funcionales, candies, turmalina y pastas dentales para armar tu cotización.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 text-xs font-semibold text-white bg-[#00795F] hover:bg-[#004d3c] rounded-xl transition-all"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-xl bg-white p-1 border border-stone-200/60 shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp";
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {item.product.priceFormatted} c/u
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-stone-200 rounded-lg bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-stone-500 hover:text-stone-800 transition-colors"
                            aria-label="Disminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-stone-500 hover:text-stone-800 transition-colors"
                            aria-label="Aumentar"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Subtotal & Delete */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-[#00795F] tabular-nums">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear cart trigger */}
                <div className="text-right pt-1">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] font-medium text-stone-400 hover:text-rose-600 transition-colors"
                  >
                    Vaciar todo el pedido
                  </button>
                </div>

                {/* Quick Delivery Info Form for WhatsApp */}
                <div className="mt-5 pt-4 border-t border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00795F]" />
                    <span>Datos para Entrega en Panamá</span>
                  </h4>

                  <div className="space-y-2">
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Tu Nombre completo"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#00795F]"
                      />
                    </div>

                    <div>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#00795F]"
                      >
                        <option value="Panamá Centro">Panamá Centro / San Francisco / Bella Vista</option>
                        <option value="San Miguelito">San Miguelito</option>
                        <option value="Panamá Oeste">Panamá Oeste (La Chorrera / Arraiján)</option>
                        <option value="Colón">Colón</option>
                        <option value="Chiriquí (David)">Chiriquí (David / Boquete)</option>
                        <option value="Veraguas (Santiago)">Veraguas (Santiago)</option>
                        <option value="Herrera (Chitré)">Herrera (Chitré)</option>
                        <option value="Los Santos">Los Santos (Las Tablas)</option>
                        <option value="Coclé (Penonomé)">Coclé (Penonomé / Aguadulce)</option>
                        <option value="Bocas del Toro">Bocas del Toro</option>
                        <option value="Interior / Otro">Otro sector del interior</option>
                      </select>
                    </div>

                    <div className="relative">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                      <textarea
                        rows={2}
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="Punto de referencia o notas de entrega (opcional)"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#00795F] resize-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Footer Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/90 space-y-3">
              <div className="flex items-baseline justify-between text-stone-900">
                <span className="text-xs text-stone-500 font-medium">Subtotal Estimado:</span>
                <span className="text-xl font-black text-[#00795F] tabular-nums">
                  ${subtotal.toFixed(2)} USD
                </span>
              </div>

              <p className="text-[11px] text-stone-500 leading-tight">
                Al presionar el botón se abrirá WhatsApp con el resumen de tus productos para coordinar pago y entrega con el Distribuidor Independiente autorizado.
              </p>

              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 px-4 bg-[#00A550] hover:bg-[#008f44] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#00A550]/20 active:scale-95 transition-all text-center"
              >
                <span>Enviar Pedido a WhatsApp (+507 6778-8375)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-stone-400 text-center leading-tight">
                ¿Ya eres socio registrado de HGW? Gestiona tus órdenes internas con tu patrocinador o a oficinas principales (+507 392-8415).
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
