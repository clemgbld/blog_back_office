import {
  allArticlesFormatted,
  allTopics,
  selectArticlesWithHideStatus,
  selectArticlesBasedOnTopic,
} from "../selectors";
import { articleBuilder } from "../../use-cases/builder/article-builder";

const articles = [articleBuilder({})];

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
      articleBuilder({}),
    ];

    expect(allTopics(articlesWithUndefined)).toEqual([
      "Functional-Programing",
      "OOP",
    ]);
  });

  describe("select articles based on the current topic", () => {
    it("should select all articles when there is the topic all articles", () => {
      expect(
        selectArticlesBasedOnTopic(
          ["all articles"],
          [articleBuilder({ topic: "react" })]
        )
      ).toEqual([articleBuilder({ topic: "react" })]);
    });

    it("should select articles based on topic", () => {
      expect(
        selectArticlesBasedOnTopic(
          ["react"],
          [articleBuilder({ topic: "react" }), articleBuilder({})]
        )
      ).toEqual([articleBuilder({ topic: "react" })]);
    });

    it("should select articles based on topics", () => {
      expect(
        selectArticlesBasedOnTopic(
          ["react", "vue"],
          [
            articleBuilder({ topic: "react" }),
            articleBuilder({ topic: "vue" }),
            articleBuilder({}),
          ]
        )
      ).toEqual([
        articleBuilder({ topic: "react" }),
        articleBuilder({ topic: "vue" }),
      ]);
    });
  });
});

describe("select articles based on hide status", () => {
  it("should be the same articles for all articles", () => {
    expect(
      selectArticlesWithHideStatus("all articles", [articleBuilder({})])
    ).toEqual([articleBuilder({})]);
  });

  it("should be only hidden articles for hidden articles", () => {
    expect(
      selectArticlesWithHideStatus("hidden", [
        articleBuilder({}),
        articleBuilder({ hide: true }),
      ])
    ).toEqual([articleBuilder({ hide: true })]);
  });

  it("should be only publish articles for publish articles", () => {
    expect(
      selectArticlesWithHideStatus("publish", [
        articleBuilder({}),
        articleBuilder({ hide: false }),
        articleBuilder({ hide: true }),
      ])
    ).toEqual([articleBuilder({}), articleBuilder({ hide: false })]);
  });
});
