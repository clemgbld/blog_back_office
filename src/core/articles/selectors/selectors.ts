import { createSelector } from "@reduxjs/toolkit";
import { articlesAdapter } from "../articles-slice";
import { RootState, Store } from "../../store";
import { formatDateDDMMYYYY } from "../../utils/date/format-date";
import { removeUndefinedAndDuplicate } from "../../utils/helper";
import { curry } from "ramda";
import { Article } from "../entities/article";

export type FormattedArticle = {
  id: string;
  summary?: string;
  topic?: string | null;
  title: string;
  date: string;
  hide?: boolean;
  content: any;
  lightMode: boolean;
  timeToRead: string;
};

export const articlesSelectors = articlesAdapter.getSelectors<RootState>(
  (state) => state.articles.data
);

export const allArticles = (store: Store) =>
  articlesSelectors.selectAll(store.getState());

export const articlesStatus = (store: Store) =>
  store.getState().articles.status;

export const articlesError = (store: Store) => store.getState().articles.error;

export const allArticlesFormatted = createSelector(
  (articles: Article[]) => articles,
  (articles: Article[]): FormattedArticle[] =>
    articles.map((article: Article) => ({
      ...article,
      date: formatDateDDMMYYYY(new Date(article.date)),
    }))
);

export const allTopics = createSelector(
  (articles: ReturnType<typeof allArticles>) =>
    articles.map(({ topic }) => topic),
  (allTopics: (string | null | undefined)[]) =>
    removeUndefinedAndDuplicate(allTopics)
);

export const selectArticlesBasedOnTopic = curry(
  (currentTopics: string[], articles: Article[]): Article[] =>
    currentTopics.includes("all articles")
      ? articles
      : articles.filter(({ topic }) => topic && currentTopics.includes(topic))
);

export const selectArticlesWithHideStatus = curry(
  (status: string, articles: Article[]): Article[] => {
    if (status === "all articles") return articles;

    return status === "hidden"
      ? articles.filter(({ hide }) => hide)
      : articles.filter(({ hide }) => !hide);
  }
);
