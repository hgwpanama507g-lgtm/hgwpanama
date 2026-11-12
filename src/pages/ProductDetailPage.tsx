import React from 'react';
import { PRODUCTS } from '../data/products';
import { Link } from '../router';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { getAffiliationWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailPageProps {
  slug: string;
  onAddToCart: (product: any, quantity?: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onAddToCart }) => {
  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <Link to="/catalogo" className="text-[#00795F] font-bold">Volver al catálogo</Link>
      </div>
    );
  }

  const whatsappUrl = getAffiliationWhatsAppUrl(product.name);

  return (
    <div className="py-12 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/catalogo" className="flex items-center text-[#00795F] font-bold mb-6">
          <ArrowLeft className="mr-2" /> Volver al catálogo
        </Link>
        <div className="grid md:grid-cols-2 gap-10">
          <img src={product.image} alt={product.name} className="rounded-2xl shadow-lg" />
          <div>
            <h1 className="text-3xl font-black mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-[#00795F] mb-4">{product.priceFormatted}</p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <div className="flex items-center text-amber-800 font-bold mb-2">
                <AlertTriangle className="mr-2" /> Aviso importante
              </div>
              <p className="text-sm text-amber-700">Por favor, consulte y confirme la disponibilidad del producto a través de WhatsApp antes de realizar su pedido.</p>
            </div>
            <p className="text-stone-700 mb-6">{product.shortDescription}</p>
            <h3 className="font-bold mb-2">Beneficios:</h3>
            <ul className="list-disc pl-5 mb-6 text-stone-600">
              {product.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <a href={whatsappUrl} className="block w-full text-center bg-[#00795F] text-white font-bold py-3 rounded-xl">
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
