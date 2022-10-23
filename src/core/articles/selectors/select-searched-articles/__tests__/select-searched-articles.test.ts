import { articleBuilder } from "../../../use-cases/builder/article-builder";
import { searchSelector } from "../select-searched-aticles";

describe("search algorithm", () => {
  it("should find nothing when there is no match", () => {
    expect(searchSelector({ articles: [], searchTerms: "" })).toEqual([]);
  });

  it("should begin the search at 3 chars", () => {
    expect(
      searchSelector({ articles: [articleBuilder()], searchTerms: "" })
    ).toEqual([articleBuilder()]);

    expect(
      searchSelector({
        articles: [
          articleBuilder(),
          articleBuilder({ timeToRead: "7 min read" }),
        ],
        searchTerms: "7 min read",
      })
    ).toEqual([articleBuilder({ timeToRead: "7 min read" })]);
    expect(
      searchSelector({
        articles: [
          articleBuilder(),
          articleBuilder({ timeToRead: "7 min read" }),
        ],
        searchTerms: "7 ",
      })
    ).toEqual([articleBuilder(), articleBuilder({ timeToRead: "7 min read" })]);
  });

  it("should search in the title", () => {
    expect(
      searchSelector({
        articles: [articleBuilder(), articleBuilder({ title: "" })],
        searchTerms: "article 1",
      })
    ).toEqual([articleBuilder()]);
  });

  it("should search in the description", () => {
    expect(
      searchSelector({
        articles: [
          articleBuilder(),
          articleBuilder({ summary: "description" }),
        ],
        searchTerms: "description",
      })
    ).toEqual([articleBuilder({ summary: "description" })]);
  });

  it("search in content", () => {
    expect(
      searchSelector({
        articles: [articleBuilder(), articleBuilder({ content: [] })],
        searchTerms: "line of text",
      })
    ).toEqual([articleBuilder()]);
  });

  it("should be able to ignore css properties and text field in content", () => {
    expect(
      searchSelector({
        articles: [
          articleBuilder(),
          articleBuilder({ content: [{ text: "" }, {}] }),
        ],
        searchTerms: "text",
      })
    ).toEqual([articleBuilder()]);

    expect(
      searchSelector({
        articles: [
          articleBuilder(),
          articleBuilder({ content: [{ text: "", bold: true }] }),
        ],
        searchTerms: "bold",
      })
    ).toEqual([]);
  });

  it("should ignore case", () => {
    expect(
      searchSelector({
        articles: [
          articleBuilder(),
          articleBuilder({ summary: "Description" }),
        ],
        searchTerms: "descriptiOn",
      })
    ).toEqual([articleBuilder({ summary: "Description" })]);
  });

  it("should ignore white space in the search value", () => {
    expect(
      searchSelector({
        articles: [
          articleBuilder(),
          articleBuilder({ summary: "description" }),
        ],
        searchTerms: " description",
      })
    ).toEqual([articleBuilder({ summary: "description" })]);
  });
});
