import { chooseAppMode } from "../choose-app-mode";

describe("helper that dertermine the initial mode of the application", () => {
  it("should be false when the app is not in the expected mode", () => {
    expect(
      chooseAppMode({
        currentMode: "inMemory",
        expectedMode: "production",
        matchingValue: true,
        nonMatchingValue: false,
      })
    ).toBe(false);
  });

  it("should be true when the app is in the expected mode", () => {
    expect(
      chooseAppMode({
        currentMode: "inMemory",
        expectedMode: "inMemory",
        matchingValue: true,
        nonMatchingValue: false,
      })
    ).toBe(true);
  });
});
