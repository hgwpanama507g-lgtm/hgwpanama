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

export const knowledgeService = {
  getAllArticles: (): KnowledgeArticle[] => {
    return knowledgeBaseData as KnowledgeArticle[];
  },

  getArticleById: (id: string): KnowledgeArticle | undefined => {
    return (knowledgeBaseData as KnowledgeArticle[]).find(art => art.id === id);
  },

  getCategories: (): string[] => {
    const categories = new Set<string>();
    (knowledgeBaseData as KnowledgeArticle[]).forEach(art => categories.add(art.category));
    return Array.from(categories);
  },

  getRelatedArticles: (currentId: string, category: string, limit = 3): KnowledgeArticle[] => {
    const all = knowledgeBaseData as KnowledgeArticle[];
    return all
      .filter(art => art.id !== currentId && art.category === category)
      .slice(0, limit);
  }
};
