import { createStore } from "../../../store";
import {
  allArticles,
  articlesStatus,
  articlesError,
} from "../../selectors/selectors";
import { inMemoryArticlesService } from "../../infrastructure/in-memory/InMemoryArticlesService";
import { postArticle } from "../postArticle";
import { retrieveArticles } from "../retrieveArticles";
import { Article } from "../../entities/article";

export const sutBuilder = (
  existingArticles: Article[] = [],
  error?: { status: number; message: string }
) => ({
  build: () => {
    const store = createStore({
      articlesService: inMemoryArticlesService(existingArticles, error),
    });


    return {
      status: articlesStatus(store),
      expectedArticles: allArticles(store),
      expectedErrorMsg: articlesError(store),
      retrieveArticles: () => {
        store.dispatch(retrieveArticles());
        return {
          status: articlesStatus(store),
        };
      },
      retrieveArticlesAsync: async () => {
        await store.dispatch(retrieveArticles());
        return {
          status: articlesStatus(store),
          expectedArticles: allArticles(store),
          expectedErrorMsg: articlesError(store),
        };
      },
      postArticle: (articleToPost: Article) => {
        store.dispatch(postArticle(articleToPost));
        return {
          status: articlesStatus(store),
        };
      },
      postArticleAsync: async (articleToPost: Article) => {
        await store.dispatch(postArticle(articleToPost));
        return {
          status: articlesStatus(store),
          expectedArticles: allArticles(store),
          expectedErrorMsg: articlesError(store),
        };
      },
    };
  },
});
