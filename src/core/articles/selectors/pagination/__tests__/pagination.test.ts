import { articleBuilder } from "../../../use-cases/builder/article-builder";
import {
  calcNumPages,
  selectArticlesOnPage,
  shycronisePaginationWithOtherFilters,
} from "../pagination";

describe("calaculate the numbers of articles pages", () => {
  it("should be 1 page when there is less or the same articles than the desired number per pages", () => {
    expect(calcNumPages(2, [articleBuilder({ date: "" })])).toEqual([1]);
  });

  it("should be 2 pages when there is enough articles to make two pages", () => {
    expect(
      calcNumPages(2, [
        articleBuilder({ date: "" }),
        articleBuilder({ date: "" }),
        articleBuilder({ date: "" }),
        articleBuilder({ date: "" }),
      ])
    ).toEqual([1, 2]);
  });
});

describe("select articles on a given page", () => {
  it("should select the select the second page", () => {
    expect(
      selectArticlesOnPage(2, 1, [
        articleBuilder({ id: 1, date: "" }),
        articleBuilder({ id: 2, date: "" }),
      ])
    ).toEqual([articleBuilder({ id: 2, date: "" })]);
  });

  it("should select the articles of the first page", () => {
    expect(
      selectArticlesOnPage(1, 5, [articleBuilder({ id: 1, date: "" })])
    ).toEqual([articleBuilder({ id: 1, date: "" })]);
  });

  it("should select the articles of the second page", () => {
    expect(
      selectArticlesOnPage(2, 1, [
        articleBuilder({ id: 1, date: "" }),
        articleBuilder({ id: 2, date: "" }),
      ])
    ).toEqual([articleBuilder({ id: 2, date: "" })]);
  });

  it("should select the articles of the third page", () => {
    expect(
      selectArticlesOnPage(3, 1, [
        articleBuilder({ id: 1, date: "" }),
        articleBuilder({ id: 2, date: "" }),
        articleBuilder({ id: 3, date: "" }),
        articleBuilder({ id: 4, date: "" }),
      ])
    ).toEqual([articleBuilder({ id: 3, date: "" })]);
  });

  it("should pass the acceptance tests", () => {
    expect(
      selectArticlesOnPage(1, 10, [
        articleBuilder({ id: 1, date: "" }),
        articleBuilder({ id: 2, date: "" }),
        articleBuilder({ id: 3, date: "" }),
        articleBuilder({ id: 4, date: "" }),
        articleBuilder({ id: 5, date: "" }),
        articleBuilder({ id: 6, date: "" }),
        articleBuilder({ id: 7, date: "" }),
        articleBuilder({ id: 8, date: "" }),
        articleBuilder({ id: 9, date: "" }),
        articleBuilder({ id: 10, date: "" }),
        articleBuilder({ id: 11, date: "" }),
      ])
    ).toEqual([
      articleBuilder({ id: 1, date: "" }),
      articleBuilder({ id: 2, date: "" }),
      articleBuilder({ id: 3, date: "" }),
      articleBuilder({ id: 4, date: "" }),
      articleBuilder({ id: 5, date: "" }),
      articleBuilder({ id: 6, date: "" }),
      articleBuilder({ id: 7, date: "" }),
      articleBuilder({ id: 8, date: "" }),
      articleBuilder({ id: 9, date: "" }),
      articleBuilder({ id: 10, date: "" }),
    ]);

    expect(
      selectArticlesOnPage(2, 10, [
        articleBuilder({ id: 1, date: "" }),
        articleBuilder({ id: 2, date: "" }),
        articleBuilder({ id: 3, date: "" }),
        articleBuilder({ id: 4, date: "" }),
        articleBuilder({ id: 5, date: "" }),
        articleBuilder({ id: 6, date: "" }),
        articleBuilder({ id: 7, date: "" }),
        articleBuilder({ id: 8, date: "" }),
        articleBuilder({ id: 9, date: "" }),
        articleBuilder({ id: 10, date: "" }),
        articleBuilder({ id: 11, date: "" }),
      ])
    ).toEqual([articleBuilder({ id: 11, date: "" })]);

    expect(
      selectArticlesOnPage(2, 10, [
        articleBuilder({ id: 1, date: "" }),
        articleBuilder({ id: 2, date: "" }),
        articleBuilder({ id: 3, date: "" }),
        articleBuilder({ id: 4, date: "" }),
        articleBuilder({ id: 5, date: "" }),
        articleBuilder({ id: 6, date: "" }),
        articleBuilder({ id: 7, date: "" }),
        articleBuilder({ id: 8, date: "" }),
        articleBuilder({ id: 9, date: "" }),
        articleBuilder({ id: 10, date: "" }),
        articleBuilder({ id: 11, date: "" }),
        articleBuilder({ id: 12, date: "" }),
        articleBuilder({ id: 13, date: "" }),
        articleBuilder({ id: 14, date: "" }),
        articleBuilder({ id: 15, date: "" }),
      ])
    ).toEqual([
      articleBuilder({ id: 11, date: "" }),
      articleBuilder({ id: 12, date: "" }),
      articleBuilder({ id: 13, date: "" }),
      articleBuilder({ id: 14, date: "" }),
      articleBuilder({ id: 15, date: "" }),
    ]);

    expect(
      selectArticlesOnPage(2, 5, [
        articleBuilder({ id: 1, date: "" }),
        articleBuilder({ id: 2, date: "" }),
        articleBuilder({ id: 3, date: "" }),
        articleBuilder({ id: 4, date: "" }),
        articleBuilder({ id: 5, date: "" }),
        articleBuilder({ id: 6, date: "" }),
        articleBuilder({ id: 7, date: "" }),
        articleBuilder({ id: 8, date: "" }),
        articleBuilder({ id: 9, date: "" }),
        articleBuilder({ id: 10, date: "" }),
        articleBuilder({ id: 11, date: "" }),
        articleBuilder({ id: 12, date: "" }),
        articleBuilder({ id: 13, date: "" }),
        articleBuilder({ id: 14, date: "" }),
        articleBuilder({ id: 15, date: "" }),
      ])
    ).toEqual([
      articleBuilder({ id: 6, date: "" }),
      articleBuilder({ id: 7, date: "" }),
      articleBuilder({ id: 8, date: "" }),
      articleBuilder({ id: 9, date: "" }),
      articleBuilder({ id: 10, date: "" }),
    ]);

    expect(
      selectArticlesOnPage(3, 5, [
        articleBuilder({ id: 1, date: "" }),
        articleBuilder({ id: 2, date: "" }),
        articleBuilder({ id: 3, date: "" }),
        articleBuilder({ id: 4, date: "" }),
        articleBuilder({ id: 5, date: "" }),
        articleBuilder({ id: 6, date: "" }),
        articleBuilder({ id: 7, date: "" }),
        articleBuilder({ id: 8, date: "" }),
        articleBuilder({ id: 9, date: "" }),
        articleBuilder({ id: 10, date: "" }),
        articleBuilder({ id: 11, date: "" }),
        articleBuilder({ id: 12, date: "" }),
        articleBuilder({ id: 13, date: "" }),
        articleBuilder({ id: 14, date: "" }),
        articleBuilder({ id: 15, date: "" }),
      ])
    ).toEqual([
      articleBuilder({ id: 11, date: "" }),
      articleBuilder({ id: 12, date: "" }),
      articleBuilder({ id: 13, date: "" }),
      articleBuilder({ id: 14, date: "" }),
      articleBuilder({ id: 15, date: "" }),
    ]);
  });
});

describe("shycronise pagination with other filter", () => {
  it("should stay at the same page when there is articles in it", () => {
    expect(
      shycronisePaginationWithOtherFilters(
        [
          articleBuilder({ id: 1, date: "" }),
          articleBuilder({ id: 2, date: "" }),
          articleBuilder({ id: 3, date: "" }),
          articleBuilder({ id: 4, date: "" }),
        ],
        3
      )
    ).toBe(3);
  });

  it("should go to the previous page when there is no articles in the current page", () => {
    expect(shycronisePaginationWithOtherFilters([], 3)).toBe(2);
  });

  it("stay at the same page when the current page is one", () => {
    expect(shycronisePaginationWithOtherFilters([], 1)).toBe(1);
  });
});
