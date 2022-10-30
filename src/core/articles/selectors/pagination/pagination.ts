import { curry } from "ramda";
import { Article } from "../../entities/article";

export const calcNumPages = (articlesPerPages: number, articles: Article[]) =>
  Math.ceil(articles.length / articlesPerPages);

export const selectArticlesOnPage = curry(
  (selectedPage: number, numOfArticlesPerPages: number, articles: Article[]) =>
    articles.slice(selectedPage - 1, selectedPage - 1 + numOfArticlesPerPages)
);
