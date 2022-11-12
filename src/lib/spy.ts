export function spy(func: any) {
  function isSpy(...args: any[]) {
    allArgs.push(args);
    return func.apply(this, args);
  }

  const allArgs = [];

  isSpy.args = () => allArgs;

  return isSpy;
}
