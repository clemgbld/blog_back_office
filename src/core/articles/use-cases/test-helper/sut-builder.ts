import { PreloadedState } from "@reduxjs/toolkit";
import { createStore, RootState } from "../../../store";
import {
  allArticles,
  articlesStatus,
  articlesError,
} from "../../selectors/selectors";
import { inMemoryArticlesService } from "../../infrastructure/in-memory/InMemoryArticlesService";
import { postArticle, ArticleWithoutId } from "../post-article";
import { retrieveArticles } from "../retrieve-articles";
import { updateArticle } from "../update-article";
import { deleteArticle } from "../deleteArticle";
import { deleteArticles } from "../deleteArticles";
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
      postArticle: (articleToPost: ArticleWithoutId, id?: number) => {
        store.dispatch(postArticle({ articleToPost, id }));
        return {
          status: articlesStatus(store),
        };
      },
      postArticleAsync: async (
        articleToPost: ArticleWithoutId,
        id?: number
      ) => {
        await store.dispatch(postArticle({ articleToPost, id }));
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

      deleteArticles: (ids: string[]) => {
        store.dispatch(deleteArticles(ids));

        return {
          status: articlesStatus(store),
        };
      },

      deleteArticlesAsync: async (ids: string[]) => {
        await store.dispatch(deleteArticles(ids));

        return {
          status: articlesStatus(store),
          expectedArticles: allArticles(store),
          expectedErrorMsg: articlesError(store),
        };
      },
    };
  },
});
