import knowledgeBaseData from '../data/knowledge-base.json';

export interface KnowledgeArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  source: string;
  updatedAt: string;
  readTime?: string;
  videoUrl?: string;
  content: string;
}

const cleanMarkdown = (text: string): string => {
  if (!text) return '';
  return text.replace(/#+\s*/g, '').replace(/\*+/g, '');
};

const sanitizeArticle = (art: KnowledgeArticle): KnowledgeArticle => ({
  ...art,
  title: cleanMarkdown(art.title),
  summary: cleanMarkdown(art.summary),
  content: cleanMarkdown(art.content),
  tags: art.tags.map(cleanMarkdown),
});

export const knowledgeService = {
  getAllArticles: (): KnowledgeArticle[] => {
    return (knowledgeBaseData as KnowledgeArticle[]).map(sanitizeArticle);
  },

  getArticleById: (id: string): KnowledgeArticle | undefined => {
    const found = (knowledgeBaseData as KnowledgeArticle[]).find(art => art.id === id);
    return found ? sanitizeArticle(found) : undefined;
  },

  getCategories: (): string[] => {
    const categories = new Set<string>();
    (knowledgeBaseData as KnowledgeArticle[]).forEach(art => categories.add(art.category));
    return Array.from(categories);
  },

  getRelatedArticles: (currentId: string, category: string, limit = 3): KnowledgeArticle[] => {
    const all = (knowledgeBaseData as KnowledgeArticle[]).map(sanitizeArticle);
    return all
      .filter(art => art.id !== currentId && art.category === category)
      .slice(0, limit);
  }
};
