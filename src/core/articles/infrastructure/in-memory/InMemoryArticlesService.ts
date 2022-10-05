import { Article } from "../../entities/article";

export interface InMemoryArticlesService {
  getArticles: () => Promise<Article[]>;
  postArticle: (article: Article) => Promise<Article>;
}

export const inMemoryArticlesService = (
  articles: Article[],
  error?: { status: number; message: string }
) => ({
  getArticles: async () => {
    if (error) {
      throw new Error(error.message);
    }

    return Promise.resolve(articles);
  },
  postArticle: async (article: Article) => Promise.resolve(article),
});
