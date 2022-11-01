/* eslint-disable testing-library/await-async-utils */
import { createClock } from "../create-clock";

describe("clock", () => {
  it("provides current timestamp", () => {
    const clock = createClock.create();
    expect(clock.now()).toBeLessThanOrEqual(Date.now());
  });

  it("should waits N milisecconds", async () => {
    const clock = createClock.create();
    const startTime = clock.now();
    const expectedTime = 10;
    await clock.waitAsync(expectedTime);
    const elapsedTime = clock.now() - startTime;
    expect(expectedTime).toBeLessThanOrEqual(elapsedTime + 1);
  });

  it("fails fast when we use advanceNullAsync in production mode", async () => {
    const clock = createClock.create();

    await expect(
      async () => await clock.advanceNullAsync(0)
    ).rejects.toThrowError("this method should not be use on real clock");
  });

  describe("nullability", () => {
    it("default now to zero seconds", () => {
      const clock = createClock.createNull();
      expect(clock.now()).toBe(0);
    });

    it("should be configurable for now", () => {
      const clock = createClock.createNull({ now: 42 });
      expect(clock.now()).toBe(42);
    });

    it("can advance the clock", async () => {
      const clock = createClock.createNull();
      await clock.advanceNullAsync(10);
      expect(clock.now()).toBe(10);
    });

    it("can wait", async () => {
      const clock = createClock.createNull();
      let wait: number | string = "waiting";
      clock.waitAsync(10).then(() => {
        wait = clock.now();
      });
      expect(wait).toBe("waiting");
      await clock.advanceNullAsync(20);
      expect(wait).toBe(10);
    });
  });
});
