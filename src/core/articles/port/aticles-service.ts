import {
  Article,
  ArticleWithoutId,
  ArticleWithoutTimeToRead,
} from "../entities/article";

export type ArticlesService = {
  getArticles: (token: string) => Promise<Article[]>;
  postArticle: (article: ArticleWithoutId, token: string) => Promise<Article>;
  updateArticle: (
    article: ArticleWithoutTimeToRead,
    token: string
  ) => Promise<Article>;
  deleteArticle: (id: string, token: string) => Promise<string>;
};
