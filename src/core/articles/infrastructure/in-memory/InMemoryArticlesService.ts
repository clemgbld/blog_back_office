import { Article } from "../../entities/article";

export interface InMemoryArticlesService {
  getArticles: () => Promise<Article[]>;
  postArticle: (article: Article) => Promise<Article>;
  updateArticle: (article: Article) => Promise<Article>;
}

const throwError = (error: { status: number; message: string }) => {
  throw new Error(error.message);
};

export const inMemoryArticlesService = (
  articles: Article[],
  error?: { status: number; message: string }
): InMemoryArticlesService => ({
  getArticles: async () =>
    error ? throwError(error) : Promise.resolve(articles),

  postArticle: async (article: Article) =>
    error ? throwError(error) : Promise.resolve(article),
  updateArticle: async (article: Article) =>
    error ? throwError(error) : Promise.resolve(article),
});
