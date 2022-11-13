import { spy } from "../spy";

describe("spy", () => {
  it("should be able to capture the arguments with wich the spied function has been called", async () => {
    const sumAsync = async (num1: number, num2: number) =>
      Promise.resolve(num1 + num2);
    const sumAsyncSpy = spy(sumAsync);
    expect(await sumAsyncSpy(1, 2)).toBe(3);
    expect(sumAsyncSpy.args()).toEqual([[1, 2]]);
  });
});
