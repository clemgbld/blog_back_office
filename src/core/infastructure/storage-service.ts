export const nullStorage = (store: Record<string, any> = {}) => ({
  setItem: (key: string, value: any) => (store[key] = value),
  getItem: (key: string) => store[key],
  removeItem: (key: string) => delete store[key],
  clear: () => (store = {}),
});

const memo = {};

export const createStorageService = (
  storage: Storage | ReturnType<typeof nullStorage>
) => ({
  stockItem: (key: string, value: string) => storage.setItem(key, value),

  getItem: (key: string) => {
    if (memo[key]) return memo[key];
    memo[key] = storage.getItem(key);
    return memo[key];
  },

  removeItem: (key: string) => {
    if (memo[key]) memo[key] = undefined;
    storage.removeItem(key);
  },

  clear: () => storage.clear(),
});
