import { articleBuilder } from "../../../use-cases/builder/article-builder";
import {
  countArticlesInTopic,
  countArticlesByHideStatus,
} from "../count-selector";

describe("count number of articles in a topic", () => {
  const articles = [articleBuilder({}), articleBuilder({ topic: "react" })];
  it("should count all articles", () => {
    expect(countArticlesInTopic("all articles", articles)).toBe(2);
  });

  it("should only count articles in a specfic topic", () => {
    expect(countArticlesInTopic("react", articles)).toBe(1);
  });
});

describe("count number of articles for a given hide status", () => {
  const articles = [
    articleBuilder({}),
    articleBuilder({ hide: false }),
    articleBuilder({ hide: true }),
  ];

  it("should count all articles", () => {
    expect(countArticlesByHideStatus("all articles", articles)).toBe(3);
  });

  it("should count only hidden articles", () => {
    expect(countArticlesByHideStatus("hidden", articles)).toBe(1);
  });

  it("should count only published articles", () => {
    expect(countArticlesByHideStatus("published", articles)).toBe(2);
  });
});
