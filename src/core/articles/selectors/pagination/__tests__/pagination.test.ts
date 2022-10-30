import { articleBuilder } from "../../../use-cases/builder/article-builder";
import { calcNumPages } from "../pagination";

describe("", () => {
  it("should be 1 page when there is less or the same articles than the desired number per pages", () => {
    expect(calcNumPages(2,[]));
  });
});
