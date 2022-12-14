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

    expect(
      chooseAppMode({
        expectedMode: "production",
        matchingValue: true,
        nonMatchingValue: false,
      })
    ).toBe(false);

    expect(
      chooseAppMode({
        currentMode: "inMemory error",
        expectedMode: "inMemory isNotLoggedIn",
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

    expect(
      chooseAppMode({
        currentMode: "inMemory error",
        expectedMode: "inMemory error isNotLoggedIn",
        matchingValue: true,
        nonMatchingValue: false,
      })
    ).toBe(true);
  });

  it("should be false when there is not the two matching string", () => {
    expect(
      chooseAppMode({
        currentMode: "inMemory",
        expectedMode: "inMemory error",
        matchingValue: true,
        nonMatchingValue: false,
      })
    ).toBe(false);
  });
});
