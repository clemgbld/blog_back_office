import { Article } from "../../entities/article";
import { restService } from "../../../infastructure/rest-service/rest-service";
import {
  BLOG_BASE_URL,
  METHOD,
} from "../../../infastructure/rest-service/constants";
import { ARTICLES_ENDPOINT } from "./constants";

export const buildArticlesService = () => ({
  getArticles: async (token: string): Promise<Article[]> => {
    const { data } = await restService({
      url: `${BLOG_BASE_URL}${ARTICLES_ENDPOINT}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  deleteArticle: async (id: string, token: string): Promise<string> => {
    await restService({
      method: METHOD.DELETE,
      url: `${BLOG_BASE_URL}${ARTICLES_ENDPOINT}/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  },
});
