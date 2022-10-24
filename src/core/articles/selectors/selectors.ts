import { createSelector } from "@reduxjs/toolkit";
import { articlesAdapter } from "../articles-slice";
import { RootState, Store } from "../../store";
import { formatDateDDMMYYYY } from "../../utils/date/format-date";
import { removeUndefinedAndDuplicate } from "../../utils/helper";
import { curry } from "ramda";
import { Article } from "../entities/article";

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

export const selectArticlesBasedOnTopic = curry(
  (currentTopic: string, articles: Article[]) =>
    currentTopic === "all articles"
      ? articles
      : articles.filter(({ topic }) => topic === currentTopic)
);

const isHidden = (hide: boolean) => hide === false;

export const selectArticlesWithHideStatus = curry(
  (status: string, articles: Article[]) => {
    if (status === "all articles") return articles;

    return status === "hidden"
      ? articles.filter(({ hide }) => isHidden(hide))
      : articles.filter(({ hide }) => !isHidden(hide));
  }
);
