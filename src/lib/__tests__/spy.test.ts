import { spy } from "../spy";

describe("spy", () => {
  it("should be able to capture the arguments with wich the spied function has been called", () => {
    const sum = (num1: number, num2: number) => num1 + num2;

    const sumSpy = spy(sum);

    expect(sumSpy(1, 2)).toBe(3);
    expect(sumSpy.args()).toEqual([[1, 2]]);
  });
});
