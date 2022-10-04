export const builder =
  (defaultObj: any) =>
  (overide: any = {}) => ({
    ...defaultObj,
    ...overide,
  });
