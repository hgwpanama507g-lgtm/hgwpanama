import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "¿Cómo puedo realizar un pedido en Panamá?",
      answer: "Puedes seleccionar los productos que deseas en nuestro catálogo y agregarlos a 'Mi Pedido', o hacer clic directamente en 'Pedir por WhatsApp' en cualquier producto o ficha técnica. Se generará un mensaje automático con tu pedido para que coordinemos la forma de entrega y pago al +507 6778-8375."
    },
    {
      question: "¿Cuáles son los métodos de pago disponibles?",
      answer: "Aceptamos pagos mediante Yappy (Banco General), transferencias bancarias ACH y pago en efectivo contraentrega en áreas seleccionadas de Ciudad de Panamá y Panamá Oeste."
    },
    {
      question: "¿Realizan entregas al interior del país?",
      answer: "Sí, coordinamos envíos a todas las provincias de Panamá (Chiriquí, Colón, Veraguas, Herrera, Los Santos, Coclé, Bocas del Toro, Darién) a través de servicios de encomienda confiables como Uno Express, Fletes Chavale o Ferguson."
    },
    {
      question: "¿Estos productos son medicamentos?",
      answer: "No. Los productos HGW son suplementos nutricionales, alimentos funcionales e insumos de higiene y bienestar físico. No son medicamentos y no están formulados para diagnosticar, mitigar, tratar, curar ni prevenir enfermedades. Ante cualquier duda o condición médica preexistente, se aconseja consultar con su médico."
    },
    {
      question: "¿Cómo puedo afiliarme como socio distribuidor para obtener descuentos de hasta un 52%?",
      answer: "Puedes afiliarte a través de nuestro patrocinio autorizado en Panamá (código Yamilka507). Elige el paquete de activación que mejor se ajuste a tus metas (Pre-Junior de 50 BV, Junior de 100 BV, Senior de 300 BV o Master de 600 BV). Con el plan Master compras a precio preferencial con hasta un 52% de beneficio en recompras, permitiéndote márgenes del 60% en ventas directas. Puedes completar el Pre-registro en la sección 'Oportunidad de Negocio' o escribirnos al WhatsApp."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00795F] uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-[#00A550]" />
            <span>Dudas Comunes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm text-stone-700 mt-2 font-normal">
            Todo lo que necesitas saber sobre entregas, pagos y membresías en Panamá.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-300 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-extrabold text-base text-black hover:text-[#00795F] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#00795F]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[17px] text-stone-800 leading-relaxed border-t border-stone-100 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

