export const builder =
  <T extends {}>(defaultObj: T) =>
  <U extends {}>(overide: U) => ({
    ...defaultObj,
    ...overide,
  });
