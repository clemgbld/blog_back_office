import { curry } from "ramda";
import { allArticlesFormatted } from "../selectors";
import { FormattedArticle } from "../selectors";

export const calcNumPages = (
  articlesPerPages: number,
  articles: FormattedArticle[]
) =>
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
    articles.slice(
      numOfArticlesPerPages * (selectedPage - 1),
      numOfArticlesPerPages * selectedPage
    )
);

export const shycronisePaginationWithOtherFilters = curry(
  (articles: ReturnType<typeof allArticlesFormatted>, currentPage: number) => {
    if (articles.length !== 0) return currentPage;
    return currentPage === 1 ? currentPage : currentPage - 1;
  }
);
