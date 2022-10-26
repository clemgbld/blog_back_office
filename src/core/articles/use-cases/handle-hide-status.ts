import { curry } from "ramda";

export const handleHideStatus = curry((newStatus: string, status: string) =>
  newStatus === status ? "all articles" : newStatus
);
