import localArticlesData from '../data/knowledge-base.json';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  source: string;
  updatedAt: string;
  readTime?: string;
  videoUrl?: string;
  content: string;
  destacado?: boolean;
  publicado?: boolean;
}

const cleanMarkdown = (text: string): string => {
  if (!text) return '';
  return text.replace(/#+\s*/g, '').replace(/\*+/g, '');
};

const sanitizeArticle = (art: any): KnowledgeArticle => ({
  id: art.id,
  slug: art.slug || art.id,
  title: cleanMarkdown(art.titulo || art.title || ''),
  summary: cleanMarkdown(art.resumen || art.summary || ''),
  content: cleanMarkdown(art.contenido || art.content || ''),
  category: art.categoria || art.category || 'General',
  tags: (art.tags || []).map(cleanMarkdown),
  source: art.source || art.fuente || 'HGW Panamá',
  updatedAt: art.fechaActualizacion || art.updatedAt || new Date().toISOString().split('T')[0],
  readTime: art.readTime || '3 min',
  videoUrl: art.videoUrl || '',
  destacado: Boolean(art.destacado),
  publicado: art.publicado !== undefined ? Boolean(art.publicado) : true,
});

export const knowledgeService = {
  getLocalArticles: (): KnowledgeArticle[] => {
    return (localArticlesData as any[]).map(sanitizeArticle);
  },

  getArticleBySlugOrIdSync: (identifier: string): KnowledgeArticle | undefined => {
    const local = knowledgeService.getLocalArticles();
    const cleanId = identifier.trim().toLowerCase();
    return local.find(
      art => (art.slug && art.slug.toLowerCase() === cleanId) || art.id.toLowerCase() === cleanId
    );
  },

  async getAllArticles(includeDrafts = false): Promise<KnowledgeArticle[]> {
    try {
      const q = collection(db, 'articulos');
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        const local = knowledgeService.getLocalArticles();
        return includeDrafts ? local : local.filter(a => a.publicado !== false);
      }
      const articles = snapshot.docs.map(docSnap => sanitizeArticle({ id: docSnap.id, ...docSnap.data() }));
      // Sort featured first
      articles.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
      return includeDrafts ? articles : articles.filter(a => a.publicado !== false);
    } catch (error) {
      console.warn("Firestore offline or unavailable, falling back to local knowledge base:", error);
      const local = knowledgeService.getLocalArticles();
      return includeDrafts ? local : local.filter(a => a.publicado !== false);
    }
  },

  async getArticleBySlugOrId(identifier: string, includeDrafts = false): Promise<KnowledgeArticle | undefined> {
    const articles = await knowledgeService.getAllArticles(includeDrafts);
    const cleanId = identifier.trim().toLowerCase();
    return articles.find(
      art => (art.slug && art.slug.toLowerCase() === cleanId) || art.id.toLowerCase() === cleanId
    );
  },

  async getCategories(): Promise<string[]> {
    const articles = await knowledgeService.getAllArticles(false);
    const categories = new Set<string>();
    articles.forEach(art => categories.add(art.category));
    return Array.from(categories);
  },

  async getRelatedArticles(currentId: string, category: string, limit = 3): Promise<KnowledgeArticle[]> {
    const articles = await knowledgeService.getAllArticles(false);
    return articles
      .filter(art => art.id !== currentId && art.category === category)
      .slice(0, limit);
  },

  async seedArticles(): Promise<number> {
    const local = knowledgeService.getLocalArticles();
    let addedCount = 0;
    for (const art of local) {
      const docRef = doc(db, 'articulos', art.id);
      const docSnap = await getDoc(docRef);
      const payload = {
        id: art.id,
        slug: art.slug,
        titulo: art.title,
        resumen: art.summary,
        contenido: art.content,
        categoria: art.category,
        tags: art.tags,
        source: art.source,
        destacado: art.id === 'hgw-00' || Boolean(art.destacado),
        publicado: true,
        fechaActualizacion: art.updatedAt,
        readTime: art.readTime || '3 min',
        videoUrl: art.videoUrl || '',
      };
      if (!docSnap.exists()) {
        await setDoc(docRef, payload);
        addedCount++;
      }
    }
    return addedCount;
  },

  async createArticle(data: Omit<KnowledgeArticle, 'id'> & { id?: string }): Promise<string> {
    const id = data.id || `art-${Date.now()}`;
    const docRef = doc(db, 'articulos', id);
    const payload = {
      id,
      slug: data.slug || id,
      titulo: data.title,
      resumen: data.summary,
      contenido: data.content,
      categoria: data.category,
      tags: data.tags || [],
      source: data.source || 'HGW Panamá',
      destacado: Boolean(data.destacado),
      publicado: data.publicado !== undefined ? Boolean(data.publicado) : true,
      fechaActualizacion: data.updatedAt || new Date().toISOString().split('T')[0],
      readTime: data.readTime || '3 min',
      videoUrl: data.videoUrl || '',
    };
    await setDoc(docRef, payload);
    return id;
  },

  async updateArticle(id: string, data: Partial<KnowledgeArticle>): Promise<void> {
    const docRef = doc(db, 'articulos', id);
    const payload: any = {};
    if (data.title !== undefined) payload.titulo = data.title;
    if (data.summary !== undefined) payload.resumen = data.summary;
    if (data.content !== undefined) payload.contenido = data.content;
    if (data.category !== undefined) payload.categoria = data.category;
    if (data.tags !== undefined) payload.tags = data.tags;
    if (data.source !== undefined) payload.source = data.source;
    if (data.destacado !== undefined) payload.destacado = data.destacado;
    if (data.publicado !== undefined) payload.publicado = data.publicado;
    if (data.readTime !== undefined) payload.readTime = data.readTime;
    if (data.videoUrl !== undefined) payload.videoUrl = data.videoUrl;
    payload.fechaActualizacion = new Date().toISOString().split('T')[0];

    await updateDoc(docRef, payload);
  },

  async deleteArticle(id: string): Promise<void> {
    const docRef = doc(db, 'articulos', id);
    await deleteDoc(docRef);
  }
};
