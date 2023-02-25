import {
  Article,
  ArticleWithoutId,
} from "../../../core/articles/entities/article";
import { ArticleWithoutTimeToRead } from "../../../core/articles/entities/article";
import { restService } from "../../../core/infastructure/rest-service/rest-service";
import {
  BLOG_BASE_URL,
  METHOD,
} from "../../../core/infastructure/rest-service/constants";
import { ARTICLES_ENDPOINT, DELETE_ENDPOINT } from "./constants";
import { catchAsync } from "../../../core/error/catch-async";
import { ArticlesService } from "../../../core/articles/port/aticles-service";

export const buildRestArticlesService = (): ArticlesService => ({
  getArticles: catchAsync(async (token: string): Promise<Article[]> => {
    const { data } = await restService({
      url: `${BLOG_BASE_URL}${ARTICLES_ENDPOINT}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }),

  deleteArticle: catchAsync(
    async (id: string, token: string): Promise<string> => {
      await restService({
        method: METHOD.DELETE,
        url: `${BLOG_BASE_URL}${ARTICLES_ENDPOINT}${DELETE_ENDPOINT}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    }
  ),
  updateArticle: catchAsync(
    async (
      article: ArticleWithoutTimeToRead,
      token: string
    ): Promise<Article> => {
      const res = await restService({
        method: METHOD.PATCH,
        url: `${BLOG_BASE_URL}${ARTICLES_ENDPOINT}`,
        headers: { Authorization: `Bearer ${token}` },
        body: article,
      });

      return res.data;
    }
  ),
  postArticle: catchAsync(
    async (article: ArticleWithoutId, token: string): Promise<Article> => {
      const res = await restService({
        method: METHOD.POST,
        url: `${BLOG_BASE_URL}${ARTICLES_ENDPOINT}`,
        headers: { Authorization: `Bearer ${token}` },
        body: article,
      });

      return res.data;
    }
  ),
});
