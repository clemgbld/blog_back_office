import { compose } from "@reduxjs/toolkit";

export const removeDuplicate = <T>(array: T[]) => [...new Set(array)];

export const removeUndefined = <T>(arr: T[]) => arr.filter((el) => el);

export const removeUndefinedAndDuplicate: <T, R>(arr: T[]) => R[] = compose(
  removeDuplicate,
  removeUndefined
);
