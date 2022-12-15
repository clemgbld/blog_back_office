type AnyFunction = (...args: any) => any;

export function spy(func: AnyFunction): any {
  let hasBeenCalled = false;

  function isSpy(this: any, ...args: any[]) {
    hasBeenCalled = true;
    allArgs.push(args);
    return func.apply(this, args);
  }

  const allArgs: any[] = [];

  isSpy.args = () => allArgs;

  isSpy.hasBeenCalled = () => hasBeenCalled;

  return isSpy;
}
