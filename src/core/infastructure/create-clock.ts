import FakeTimers from "@sinonjs/fake-timers";

const withClock = ({
  date,
  wait,
  advanceNullAsync = async (miliseconds: number) => {
    throw new Error("this method should not be use on real clock");
  },
  cancelClock,
}: {
  date: DateConstructor;
  wait: (callback: () => Promise<any>, arg1?: number) => any;
  advanceNullAsync?: (milliseconds: number) => Promise<any>;
  cancelClock: any;
}) => {
  let cancel: any;
  return {
    now: () => date.now(),
    waitAsync: async (miliseconds: number) =>
      await new Promise((resolve) => {
        const timoutId: number = wait(
          async () => resolve("end of the timer"),
          miliseconds
        );
        cancel = () => {
          cancelClock(timoutId);
          resolve("timer cancled");
        };
      }),
    advanceNullAsync,
    cancel: () => {
      cancel();
    },
  };
};

const time = ({ now }: { now: number }) => {
  const fake = FakeTimers.createClock(now);

  return {
    date: fake.Date,

    advanceNullAsync: async (milliseconds: number) =>
      fake.tickAsync(milliseconds),
    wait: async (fn: () => Promise<unknown>, arg1 = 0) => {
      return fake.setTimeout(fn, arg1);
    },
    cancelClock: fake.clearTimeout,
  };
};

export const createClock = {
  create: () =>
    withClock({ date: Date, wait: setTimeout, cancelClock: clearTimeout }),
  createNull: ({ now }: { now: number } = { now: 0 }) =>
    withClock(time({ now })),
};

export type Clock = ReturnType<typeof withClock>;
