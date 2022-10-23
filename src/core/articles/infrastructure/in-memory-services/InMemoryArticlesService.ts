import {
  Article,
  ArticleWithoutId,
  ArticleWithoutTimeToRead,
} from "../../entities/article";

const FAKE_ID = "546";

const FAKE_TIME_TO_READ = "7 min read";

export interface InMemoryArticlesService {
  getArticles: () => Promise<Article[]>;
  postArticle: (article: ArticleWithoutId) => Promise<Article>;
  updateArticle: (article: ArticleWithoutTimeToRead) => Promise<Article>;
  deleteArticle: (id: string) => Promise<string>;
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
    error
      ? throwError(error)
      : Promise.resolve({
          timeToRead: FAKE_TIME_TO_READ,
          id: FAKE_ID,
          ...article,
        }),
  updateArticle: async (article: Article) =>
    error
      ? throwError(error)
      : Promise.resolve({ ...article, timeToRead: FAKE_TIME_TO_READ }),
  deleteArticle: async (id: string) =>
    error ? throwError(error) : Promise.resolve(id),
});
