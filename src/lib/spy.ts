type AnyFunction = (...args: any) => any;

export function spy(func: AnyFunction) {
  function isSpy(...args: any[]) {
    allArgs.push(args);
    return func.apply(this, args);
  }

  const allArgs = [];

  isSpy.args = () => allArgs;

  return isSpy;
}
