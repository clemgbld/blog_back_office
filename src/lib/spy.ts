type AnyFunction = (...args: any) => any;

export function spy(func: AnyFunction): any {
  function isSpy(this: any, ...args: any[]) {
    allArgs.push(args);
    return func.apply(this, args);
  }

  const allArgs: any[] = [];

  isSpy.args = () => allArgs;

  return isSpy;
}
