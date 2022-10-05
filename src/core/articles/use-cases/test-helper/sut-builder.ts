import { PreloadedState } from "@reduxjs/toolkit";
import { createStore, RootState } from "../../../store";
import {
  allArticles,
  articlesStatus,
  articlesError,
} from "../../selectors/selectors";
import { inMemoryArticlesService } from "../../infrastructure/in-memory/InMemoryArticlesService";
import { postArticle } from "../post-article";
import { retrieveArticles } from "../retrieve-articles";
import { updateArticle } from "../update-article";
import { Article } from "../../entities/article";

export const sutBuilder = ({
  existingArticles = [],
  error,
  preloadedState,
}: {
  existingArticles?: Article[];
  error?: { status: number; message: string };
  preloadedState?: PreloadedState<RootState>;
}) => ({
  build: () => {
    const store = createStore(
      {
        articlesService: inMemoryArticlesService(existingArticles, error),
      },
      preloadedState
    );

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

      updateArticle: (updatedArticle: Article) => {
        store.dispatch(updateArticle(updatedArticle));
        return {
          status: articlesStatus(store),
        };
      },

      updateArticleAsync: async (updatedArticle: Article) => {
        await store.dispatch(updateArticle(updatedArticle));
        return {
          status: articlesStatus(store),
          expectedArticles: allArticles(store),
          expectedErrorMsg: articlesError(store),
        };
      },
    };
  },
});
