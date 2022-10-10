import { Article, ArticleWithoutId } from "../../entities/article";

const FAKE_ID = "546";

export interface InMemoryArticlesService {
  getArticles: () => Promise<Article[]>;
  postArticle: (article: ArticleWithoutId) => Promise<Article>;
  updateArticle: (article: Article) => Promise<Article>;
  deleteArticle: (id: string) => Promise<string>;
  deleteArticles: (ids: string[]) => Promise<string[]>;
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

  postArticle: async (article: ArticleWithoutId): Promise<Article> =>
    error ? throwError(error) : Promise.resolve({ id: FAKE_ID, ...article }),
  updateArticle: async (article: Article) =>
    error ? throwError(error) : Promise.resolve(article),
  deleteArticle: async (id: string) =>
    error ? throwError(error) : Promise.resolve(id),
  deleteArticles: async (ids: string[]) =>
    error ? throwError(error) : Promise.resolve(ids),
});
