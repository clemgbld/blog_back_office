import { PreloadedState } from "@reduxjs/toolkit";
import { createStore, RootState } from "../../../store";
import {
  allArticles,
  articlesStatus,
  articlesError,
} from "../../selectors/selectors";
import { buildInMemoryServices } from "../../../infastructure/all-services/all-services-in-memory";
import { postArticle } from "../post-article";
import { retrieveArticles } from "../retrieve-articles";
import { updateArticle } from "../update-article";
import { deleteArticle } from "../deleteArticle";
import { toggleHideStatus } from "../toogle-hide-status";
import { Article, ArticleWithoutId } from "../../entities/article";

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
    const store = createStore({
      services: buildInMemoryServices({
        articlesService: { articles: existingArticles, error },
      }),
      preloadedState,
    });

    return {
      isArticlesRetrieved: store.getState().articles.isArticlesRetrieved,
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
          isArticlesRetrieved: store.getState().articles.isArticlesRetrieved,
          status: articlesStatus(store),
          expectedArticles: allArticles(store),
          expectedErrorMsg: articlesError(store),
        };
      },
      postArticle: (articleToPost: ArticleWithoutId) => {
        store.dispatch(postArticle(articleToPost));
        return {
          status: articlesStatus(store),
        };
      },
      postArticleAsync: async (articleToPost: ArticleWithoutId) => {
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

      deleteArticle: (id: string) => {
        store.dispatch(deleteArticle(id));

        return {
          status: articlesStatus(store),
        };
      },

      deleteArticleAsync: async (id: string) => {
        await store.dispatch(deleteArticle(id));

        return {
          status: articlesStatus(store),
          expectedArticles: allArticles(store),
          expectedErrorMsg: articlesError(store),
        };
      },
      toggleHideStatusAsync: async (id: string) => {
        await store.dispatch(toggleHideStatus(id));
        return {
          expectedArticles: allArticles(store),
        };
      },
    };
  },
});
