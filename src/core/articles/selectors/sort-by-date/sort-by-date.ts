import { Article } from "../../entities/article";
import { curry } from "ramda";

export const sortByDate = curry(
  (isDesc: boolean, articles: Article[]): Article[] =>
    articles
      .slice()
      .sort((a, b) => (isDesc ? b.date - a.date : a.date - b.date))
);
