import { PRODUCTS, Product } from '../data/products';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export interface ProductFiche {
  descripcionDetallada?: string;
  modoDeUso?: string;
  ingredientes?: string[];
  presentacion?: string;
  advertencias?: string[];
  preguntasFrecuentes?: Array<{ pregunta: string; respuesta: string }>;
  fuente?: string;
}

export interface ProductRelated {
  productosRelacionados?: string[];
}

export interface FirestoreProduct {
  id: string;
  code?: string;
  slug: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  categoryLabel: string;
  tags: string[];
  precio: number;
  moneda: string;
  imagenes: string[];
  enlaceCompra?: string;
  ficha?: ProductFiche;
  relacionados?: ProductRelated;
  destacado: boolean;
  estado: 'publicado' | 'oculto' | 'agotado';
  orden: number;
  fechaActualizacion: string;
  bv?: number;
  inStock?: boolean;
}

const cleanMarkdown = (text: string): string => {
  if (!text) return '';
  return text.replace(/#+\s*/g, '').replace(/\*+/g, '');
};

// Convert Google Drive view links to direct view/uc links if needed
export const sanitizeImageUrl = (url: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  // Check Google Drive format: https://drive.google.com/file/d/FILE_ID/view
  const driveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }
  return cleanMarkdown(trimmed);
};

export const sanitizeProduct = (p: any): FirestoreProduct => {
  const imagesRaw = p.imagenes || (p.image ? [p.image] : ['https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp']);
  const images = (Array.isArray(imagesRaw) ? imagesRaw : [imagesRaw]).map(sanitizeImageUrl).filter(Boolean);

  return {
    id: p.id || `prod-${Date.now()}`,
    code: p.code || '',
    slug: p.slug || p.id || 'producto',
    nombre: cleanMarkdown(p.nombre || p.name || ''),
    descripcion: cleanMarkdown(p.descripcion || p.shortDescription || p.description || ''),
    categoria: p.categoria || p.category || 'general',
    categoryLabel: p.categoryLabel || 'Productos HGW',
    tags: (p.tags || p.benefits || []).map(cleanMarkdown),
    precio: typeof p.precio === 'number' ? p.precio : (typeof p.price === 'number' ? p.price : 0),
    moneda: p.moneda || 'USD',
    imagenes: images.length > 0 ? images : ['https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp'],
    enlaceCompra: p.enlaceCompra || 'https://www.healthgreenworld.com/?userName=Yamilka507',
    ficha: {
      descripcionDetallada: cleanMarkdown(p.ficha?.descripcionDetallada || p.description || ''),
      modoDeUso: cleanMarkdown(p.ficha?.modoDeUso || p.usage || ''),
      ingredientes: (p.ficha?.ingredientes || p.ingredients || []).map(cleanMarkdown),
      presentacion: cleanMarkdown(p.ficha?.presentacion || p.presentation || p.netContent || ''),
      advertencias: (p.ficha?.advertencias || (p.precautions ? [p.precautions] : [])).map(cleanMarkdown),
      preguntasFrecuentes: p.ficha?.preguntasFrecuentes || [],
      fuente: p.ficha?.fuente || 'Catálogo Oficial HGW 2026',
    },
    relacionados: {
      productosRelacionados: p.relacionados?.productosRelacionados || [],
    },
    destacado: Boolean(p.destacado || p.featured),
    estado: p.estado || (p.inStock === false ? 'agotado' : 'publicado'),
    orden: typeof p.orden === 'number' ? p.orden : 99,
    fechaActualizacion: p.fechaActualizacion || new Date().toISOString().split('T')[0],
    bv: p.bv || 0,
    inStock: p.estado ? p.estado !== 'agotado' : (p.inStock ?? true),
  };
};

export const productosService = {
  getLocalProducts: (): FirestoreProduct[] => {
    return PRODUCTS.map(sanitizeProduct);
  },

  async getAllProducts(includeHidden = false): Promise<FirestoreProduct[]> {
    try {
      const q = collection(db, 'productos');
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        const local = productosService.getLocalProducts();
        return includeHidden ? local : local.filter(p => p.estado !== 'oculto');
      }
      const prods = snapshot.docs.map(docSnap => sanitizeProduct({ id: docSnap.id, ...docSnap.data() }));
      prods.sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99));
      return includeHidden ? prods : prods.filter(p => p.estado !== 'oculto');
    } catch (err) {
      console.warn("Firestore offline or unavailable, falling back to local products:", err);
      const local = productosService.getLocalProducts();
      return includeHidden ? local : local.filter(p => p.estado !== 'oculto');
    }
  },

  async getProductBySlugOrId(identifier: string, includeHidden = false): Promise<FirestoreProduct | undefined> {
    const prods = await productosService.getAllProducts(includeHidden);
    const cleanId = identifier.trim().toLowerCase();
    return prods.find(
      p => (p.slug && p.slug.toLowerCase() === cleanId) || p.id.toLowerCase() === cleanId
    );
  },

  async seedProducts(): Promise<number> {
    const local = productosService.getLocalProducts();
    let addedCount = 0;
    for (const p of local) {
      const docRef = doc(db, 'productos', p.id);
      const docSnap = await getDoc(docRef);
      const payload = {
        id: p.id,
        code: p.code || '',
        slug: p.slug,
        nombre: p.nombre,
        descripcion: p.descripcion,
        categoria: p.categoria,
        categoryLabel: p.categoryLabel,
        tags: p.tags,
        precio: p.precio,
        moneda: p.moneda,
        imagenes: p.imagenes,
        enlaceCompra: p.enlaceCompra || 'https://www.healthgreenworld.com/?userName=Yamilka507',
        ficha: p.ficha,
        relacionados: p.relacionados,
        destacado: Boolean(p.destacado),
        estado: p.estado || 'publicado',
        orden: p.orden || 99,
        fechaActualizacion: p.fechaActualizacion,
        bv: p.bv || 0,
      };
      if (!docSnap.exists()) {
        await setDoc(docRef, payload);
        addedCount++;
      }
    }
    return addedCount;
  },

  async createProduct(data: Omit<FirestoreProduct, 'id'> & { id?: string }): Promise<string> {
    const id = data.id || `prod-${Date.now()}`;
    const docRef = doc(db, 'productos', id);
    const payload = {
      id,
      code: data.code || '',
      slug: data.slug || id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      categoria: data.categoria,
      categoryLabel: data.categoryLabel || 'Productos HGW',
      tags: data.tags || [],
      precio: Number(data.precio) || 0,
      moneda: data.moneda || 'USD',
      imagenes: (data.imagenes || []).map(sanitizeImageUrl),
      enlaceCompra: data.enlaceCompra || 'https://www.healthgreenworld.com/?userName=Yamilka507',
      ficha: data.ficha || {},
      relacionados: data.relacionados || {},
      destacado: Boolean(data.destacado),
      estado: data.estado || 'publicado',
      orden: Number(data.orden) || 99,
      fechaActualizacion: new Date().toISOString().split('T')[0],
      bv: Number(data.bv) || 0,
    };
    await setDoc(docRef, payload);
    return id;
  },

  async updateProduct(id: string, data: Partial<FirestoreProduct>): Promise<void> {
    const docRef = doc(db, 'productos', id);
    const payload: any = {};
    if (data.code !== undefined) payload.code = data.code;
    if (data.slug !== undefined) payload.slug = data.slug;
    if (data.nombre !== undefined) payload.nombre = data.nombre;
    if (data.descripcion !== undefined) payload.descripcion = data.descripcion;
    if (data.categoria !== undefined) payload.categoria = data.categoria;
    if (data.categoryLabel !== undefined) payload.categoryLabel = data.categoryLabel;
    if (data.tags !== undefined) payload.tags = data.tags;
    if (data.precio !== undefined) payload.precio = Number(data.precio);
    if (data.moneda !== undefined) payload.moneda = data.moneda;
    if (data.imagenes !== undefined) payload.imagenes = data.imagenes.map(sanitizeImageUrl);
    if (data.enlaceCompra !== undefined) payload.enlaceCompra = data.enlaceCompra;
    if (data.ficha !== undefined) payload.ficha = data.ficha;
    if (data.relacionados !== undefined) payload.relacionados = data.relacionados;
    if (data.destacado !== undefined) payload.destacado = Boolean(data.destacado);
    if (data.estado !== undefined) payload.estado = data.estado;
    if (data.orden !== undefined) payload.orden = Number(data.orden);
    if (data.bv !== undefined) payload.bv = Number(data.bv);
    payload.fechaActualizacion = new Date().toISOString().split('T')[0];

    await updateDoc(docRef, payload);
  },

  async deleteProduct(id: string): Promise<void> {
    const docRef = doc(db, 'productos', id);
    await deleteDoc(docRef);
  }
};
