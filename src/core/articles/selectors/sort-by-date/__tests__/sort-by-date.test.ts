import { articleBuilder } from "../../../use-cases/builder/article-builder";
import { sortByDate } from "../sort-by-date";

describe("sort by date", () => {
  const articles = [
    articleBuilder({}),
    articleBuilder({ date: 1 }),
    articleBuilder({ date: 2 }),
  ];
  it("should sort by date in desc order", () => {
    expect(sortByDate(true, articles)).toEqual([
      articleBuilder({}),
      articleBuilder({ date: 2 }),
      articleBuilder({ date: 1 }),
    ]);
  });

  it("should sort by date in asc order", () => {
    expect(sortByDate(false, articles)).toEqual([
      articleBuilder({ date: 1 }),
      articleBuilder({ date: 2 }),
      articleBuilder({}),
    ]);
  });
});
