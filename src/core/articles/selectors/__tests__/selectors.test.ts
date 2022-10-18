import {
  allArticlesFormatted,
  allTopics,
  visibleArticles,
  hiddenArticles,
} from "../selectors";
import { articleBuilder } from "../../use-cases/builder/articleBuilder";

const articles = [articleBuilder()];

describe("normalize all articles", () => {
  it("shoudld normalize the articles by transforming the time stamp in date string", () => {
    expect(allArticlesFormatted(articles)).toEqual([
      {
        id: "1",
        title: "article 1",
        date: "20/07/7245",
        lightMode: true,
        timeToRead: "2 min read",
        content: [
          {
            type: "paragraph",
            children: [{ text: "A first line of text." }],
          },
          {
            type: "paragraph",
            children: [{ text: "A second line of text." }],
          },
        ],
      },
    ]);
  });
});

describe("topics", () => {
  it("should get a list of the topic of all articles", () => {
    const articles = [
      articleBuilder({ topic: "Functional-Programing" }),
      articleBuilder({ topic: "OOP" }),
    ];
    expect(allTopics(articles)).toEqual(["Functional-Programing", "OOP"]);
  });

  it("should remove all duplicate topics", () => {
    const articlesWithDuplicateTopic = [
      articleBuilder({ topic: "Functional-Programing" }),
      articleBuilder({ topic: "OOP" }),
      articleBuilder({ topic: "OOP" }),
    ];

    expect(allTopics(articlesWithDuplicateTopic)).toEqual([
      "Functional-Programing",
      "OOP",
    ]);
  });

  it("should remove undefined from the topic list", () => {
    const articlesWithUndefined = [
      articleBuilder({ topic: "Functional-Programing" }),
      articleBuilder({ topic: "OOP" }),
      articleBuilder(),
    ];

    expect(allTopics(articlesWithUndefined)).toEqual([
      "Functional-Programing",
      "OOP",
    ]);
  });
});

describe("Filter out hidden articles", () => {
  it("should be able to select visible articles", () => {
    const articles = [articleBuilder({ hide: true }), articleBuilder()];

    expect(visibleArticles(articles)).toEqual(articles);
  });

  it("should filter out hidden articles", () => {
    const articles = [articleBuilder({ hide: false })];

    expect(visibleArticles(articles)).toEqual([]);
  });
});

describe("Filter out visible articles", () => {
  it("should be able to select hidden articles", () => {
    const articles = [articleBuilder({ hide: false })];

    expect(hiddenArticles(articles)).toEqual(articles);
  });

  it("should filter out visible articles", () => {
    const articles = [articleBuilder({ hide: true }), articleBuilder()];

    expect(hiddenArticles(articles)).toEqual([]);
  });
});
