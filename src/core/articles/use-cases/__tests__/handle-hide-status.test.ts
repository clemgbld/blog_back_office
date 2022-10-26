import { handleHideStatus } from "../handle-hide-status";

describe("Handle hide status", () => {
  it("should set status to the current status", () => {
    expect(handleHideStatus("hidden", "all articles")).toBe("hidden");
  });

  it("should set status to all articles when the new status is the same than the current status", () => {
    expect(handleHideStatus("hidden", "hidden")).toBe("all articles");
  });
});
