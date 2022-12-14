import debounce from "lodash.debounce";

export const debounceHandler = (fn: any, delay = 3000) => debounce(fn, delay);
