import { spy } from "../spy";

describe("spy", () => {
  const sumAsync = async (num1: number, num2: number) =>
    Promise.resolve(num1 + num2);
  it("should be able to capture the arguments with wich the spied function has been called", async () => {
    const sumAsyncSpy = spy(sumAsync);
    expect(await sumAsyncSpy(1, 2)).toBe(3);
    expect(sumAsyncSpy.args()).toEqual([[1, 2]]);
  });

  it("should not have been called", () => {
    const sumAsyncSpy = spy(sumAsync);

    expect(sumAsyncSpy.hasBeenCalled()).toBe(false);
  });

  it("should have been called", async () => {
    const sumAsyncSpy = spy(sumAsync);
    expect(await sumAsyncSpy(1, 2)).toBe(3);
    expect(sumAsyncSpy.hasBeenCalled()).toBe(true);
  });
});
