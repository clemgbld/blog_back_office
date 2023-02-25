import {
  Article,
  ArticleWithoutId,
  ArticleWithoutTimeToRead,
} from "../../../core/articles/entities/article";
import { ArticlesService } from "../../../core/articles/port/aticles-service";

const FAKE_ID = "546";

const FAKE_TIME_TO_READ = "7 min read";

const FAKE_DATE = 123456;

const throwError = (error: {
  statusCode: number;
  message: string;
  status: string;
}) => {
  throw new Error(error.message);
};

export const inMemoryArticlesService = (
  articles: Article[],
  error?: { statusCode: number; message: string; status: string }
): ArticlesService => ({
  getArticles: async (token: string) =>
    error ? throwError(error) : Promise.resolve(articles),

  postArticle: async (
    article: ArticleWithoutId,
    token: string
  ): Promise<Article> =>
    error
      ? throwError(error)
      : Promise.resolve({
          timeToRead: FAKE_TIME_TO_READ,
          date: FAKE_DATE,
          id: FAKE_ID,
          ...article,
        }),
  updateArticle: async (article: ArticleWithoutTimeToRead, token: string) =>
    error
      ? throwError(error)
      : Promise.resolve({ ...article, timeToRead: FAKE_TIME_TO_READ }),
  deleteArticle: async (id: string, token: string) =>
    error ? throwError(error) : Promise.resolve(id),
});
