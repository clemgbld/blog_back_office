import { curry } from "ramda";
import { Article } from "../../entities/article";
import { allArticlesFormatted } from "../selectors";

export const calcNumPages = (articlesPerPages: number, articles: Article[]) =>
  Array.from(
    { length: Math.ceil(articles.length / articlesPerPages) },
    (_, i) => i + 1
  );

export const selectArticlesOnPage = curry(
  (
    selectedPage: number,
    numOfArticlesPerPages: number,
    articles: ReturnType<typeof allArticlesFormatted>
  ) =>
    articles.slice(selectedPage - 1, selectedPage - 1 + numOfArticlesPerPages)
);
