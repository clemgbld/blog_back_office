import { validateTopic } from "../validateTopic";

describe("validate the we don't pass all articles to topic when we create an article", () => {
  it("should be valid when the topic is not all articles", () => {
    expect(validateTopic("React")).toBe(true);
  });

  it("should not be valid when the topic is all articles", () => {
    expect(validateTopic("all articles")).toBe(false);
  });

  it("should not be valid when the topic is all articles with Uppercase", () => {
    expect(validateTopic("all Articles")).toBe(false);
  });

  it("should not be valid when the topic is all articles with white spaces", () => {
    expect(validateTopic(" all articles ")).toBe(false);
  });
});
