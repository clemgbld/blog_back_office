import { is401Error } from "../is401Error";

describe("parse error message and check for 4O1 error", () => {
  it("should be false when it is not a 4O1 error", () => {
    expect(is401Error("Something went wrong")).toBe(false);
  });

  it("should be true when it is a 4O1 error", () => {
    expect(is401Error("401:Something went wrong")).toBe(true);
  });
});
