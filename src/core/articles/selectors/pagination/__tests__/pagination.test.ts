import { articleBuilder } from "../../../use-cases/builder/article-builder";
import { calcNumPages, selectArticlesOnPage } from "../pagination";

describe("calaculate the numbers of articles pages", () => {
  it("should be 1 page when there is less or the same articles than the desired number per pages", () => {
    expect(calcNumPages(2, [articleBuilder()])).toEqual([1]);
  });

  it("should be 2 pages when there is enough articles to make two pages", () => {
    expect(
      calcNumPages(2, [
        articleBuilder(),
        articleBuilder(),
        articleBuilder(),
        articleBuilder(),
      ])
    ).toEqual([1, 2]);
  });
});

describe("select articles on a given page", () => {
  it("should select the select the second page", () => {
    expect(
      selectArticlesOnPage(2, 1, [
        articleBuilder({ id: 1 }),
        articleBuilder({ id: 2 }),
      ])
    ).toEqual([articleBuilder({ id: 2 })]);
  });

  it("should select the articles of the first page", () => {
    expect(selectArticlesOnPage(1, 5, [articleBuilder({ id: 1 })])).toEqual([
      articleBuilder({ id: 1 }),
    ]);
  });

  it("should select the articles of the second page", () => {
    expect(
      selectArticlesOnPage(2, 1, [
        articleBuilder({ id: 1 }),
        articleBuilder({ id: 2 }),
      ])
    ).toEqual([articleBuilder({ id: 2 })]);
  });

  it("should select the articles of the third page", () => {
    expect(
      selectArticlesOnPage(3, 1, [
        articleBuilder({ id: 1 }),
        articleBuilder({ id: 2 }),
        articleBuilder({ id: 3 }),
        articleBuilder({ id: 4 }),
      ])
    ).toEqual([articleBuilder({ id: 3 })]);
  });

  it("should pass the acceptance test", () => {
    expect(
      selectArticlesOnPage(1, 2, [
        articleBuilder({ id: 1 }),
        articleBuilder({ id: 2 }),
        articleBuilder({ id: 3 }),
        articleBuilder({ id: 4 }),
      ])
    ).toEqual([articleBuilder({ id: 1 }), articleBuilder({ id: 2 })]);
  });
});
