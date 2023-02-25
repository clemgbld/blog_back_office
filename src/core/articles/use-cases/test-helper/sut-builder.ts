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
import { inMemoryArticlesService } from "../../../../infrastructure/articles/in-memory-services/in-memory-articles-service";
import { spy } from "../../../../lib/spy";

export const sutBuilder = ({
  existingArticles = [],
  error,
  preloadedState = {},
}: {
  existingArticles?: Article[];
  error?: { statusCode: number; message: string; status: string };
  preloadedState?: PreloadedState<RootState>;
}) => ({
  build: () => {
    const preloadedStateWithToken = {
      ...preloadedState,
      auth: {
        token: "fake-token",
        isLoggedIn: true,
        status: "success",
      },
    };

    const articlesServices = inMemoryArticlesService(existingArticles, error);

    const getArticlesSpy = spy(articlesServices.getArticles);
    const postArticleSpy = spy(articlesServices.postArticle);
    const updateArticleSpy = spy(articlesServices.updateArticle);
    const deleteArticleSpy = spy(articlesServices.deleteArticle);

    const buildInMemoryArticlesService = (
      articles: Article[],
      error?: { statusCode: number; message: string; status: string }
    ) => ({
      getArticles: getArticlesSpy,
      postArticle: postArticleSpy,
      updateArticle: updateArticleSpy,
      deleteArticle: deleteArticleSpy,
    });

    const store = createStore({
      services: buildInMemoryServices({
        articlesService: {
          articles: existingArticles,
          error,
          buildInMemoryArticlesService,
        },
      }),
      preloadedState: preloadedStateWithToken,
    });

    return {
      isArticlesRetrieved: store.getState().articles.isArticlesRetrieved,
      status: articlesStatus(store),
      expectedArticles: allArticles(store),
      expectedErrorMsg: articlesError(store),
      getArticlesSpy,
      postArticleSpy,
      updateArticleSpy,
      deleteArticleSpy,
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
