import { articleBuilder } from "../../../use-cases/builder/article-builder";
import { searchSelector } from "../select-searched-aticles";

describe("search algorithm", () => {
  it("should find nothing when there is no match", () => {
    expect(searchSelector("", [])).toEqual([]);
  });

  it("should begin the search at 3 chars", () => {
    expect(searchSelector("", [articleBuilder({})])).toEqual([
      articleBuilder({}),
    ]);

    expect(
      searchSelector("7 min read", [
        articleBuilder({}),
        articleBuilder({ timeToRead: "7 min read" }),
      ])
    ).toEqual([articleBuilder({ timeToRead: "7 min read" })]);
    expect(
      searchSelector("7 ", [
        articleBuilder({}),
        articleBuilder({ timeToRead: "7 min read" }),
      ])
    ).toEqual([
      articleBuilder({}),
      articleBuilder({ timeToRead: "7 min read" }),
    ]);
  });

  it("should search in the title", () => {
    expect(
      searchSelector("article 1", [
        articleBuilder({}),
        articleBuilder({ title: "" }),
      ])
    ).toEqual([articleBuilder({})]);
  });

  it("should search in the description", () => {
    expect(
      searchSelector("description", [
        articleBuilder({}),
        articleBuilder({ summary: "description" }),
      ])
    ).toEqual([articleBuilder({ summary: "description" })]);
  });

  it("search in content", () => {
    expect(
      searchSelector("line of text", [
        articleBuilder({}),
        articleBuilder({ content: [] }),
      ])
    ).toEqual([articleBuilder({})]);
  });

  it("should be able to ignore css properties and text field in content", () => {
    expect(
      searchSelector("text", [
        articleBuilder({}),
        articleBuilder({ content: [{ text: "" }, {}] }),
      ])
    ).toEqual([articleBuilder({})]);

    expect(
      searchSelector("bold", [
        articleBuilder({}),
        articleBuilder({ content: [{ text: "", bold: true }] }),
      ])
    ).toEqual([]);
  });

  it("should ignore case", () => {
    expect(
      searchSelector("descriptiOn", [
        articleBuilder({}),
        articleBuilder({ summary: "Description" }),
      ])
    ).toEqual([articleBuilder({ summary: "Description" })]);
  });

  it("should ignore white space in the search value", () => {
    expect(
      searchSelector(" description", [
        articleBuilder({}),
        articleBuilder({ summary: "description" }),
      ])
    ).toEqual([articleBuilder({ summary: "description" })]);
  });
});
