import { createSelector } from "@reduxjs/toolkit";
import { articlesAdapter } from "../articles-slice";
import { RootState, Store } from "../../store";
import { formatDateDDMMYYYY } from "../../utils/date/format-date";
import { removeUndefinedAndDuplicate } from "../../utils/helper";

export const articlesSelectors = articlesAdapter.getSelectors<RootState>(
  (state) => state.articles.data
);

export const allArticles = (store: Store) =>
  articlesSelectors.selectAll(store.getState());

export const articlesStatus = (store: Store) =>
  store.getState().articles.status;

export const articlesError = (store: Store) => store.getState().articles.error;

export const allArticlesFormatted = createSelector(
  (articles: ReturnType<typeof allArticles>) => articles,
  (articles: ReturnType<typeof allArticles>) =>
    articles.map((article) => ({
      ...article,
      date: formatDateDDMMYYYY(new Date(article.date)),
    }))
);

export const allTopics = createSelector<any[], string[]>(
  (articles: ReturnType<typeof allArticles>) =>
    articles.map(({ topic }) => topic),
  (allTopics: string[]) => removeUndefinedAndDuplicate(allTopics)
);

const isVisible = (hide: boolean) => hide !== false;

export const visibleArticles = createSelector(
  (articles: ReturnType<typeof allArticles>) => articles,
  (articles: ReturnType<typeof allArticles>) =>
    articles.filter(({ hide }) => isVisible(hide))
);

export const hiddenArticles = createSelector(
  (articles: ReturnType<typeof allArticles>) => articles,
  (articles: ReturnType<typeof allArticles>) =>
    articles.filter(({ hide }) => !isVisible(hide))
);
