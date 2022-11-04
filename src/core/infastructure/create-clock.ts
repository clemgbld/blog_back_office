import FakeTimers from "@sinonjs/fake-timers";

const withClock = ({
  date,
  wait,
  advanceNullAsync = async (miliseconds: number) => {
    throw new Error("this method should not be use on real clock");
  },
}: {
  date: DateConstructor;
  wait: (callback: () => Promise<unknown>, arg1?: number) => void;
  advanceNullAsync?: (milliseconds: number) => Promise<number>;
}) => {
  return {
    now: () => date.now(),
    waitAsync: async (miliseconds: number) =>
      await new Promise((resolve) =>
        wait(async () => resolve("end of the timer"), miliseconds)
      ),
    advanceNullAsync,
  };
};

const time = ({ now }: { now: number }) => {
  const fake = FakeTimers.createClock(now);

  return {
    date: fake.Date,

    advanceNullAsync: async (milliseconds: number) =>
      fake.tickAsync(milliseconds),
    wait: async (fn: () => Promise<unknown>, arg1 = 0) => {
      fake.setTimeout(fn, arg1);
    },
  };
};

export const createClock = {
  create: () => withClock({ date: Date, wait: setTimeout }),
  createNull: ({ now }: { now: number } = { now: 0 }) =>
    withClock(time({ now })),
};

export type Clock = ReturnType<typeof withClock>;
