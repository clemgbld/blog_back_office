export const nullStorage = (store: Record<string, any> = {}) => ({
  setItem: (key: string, value: any) => (store[key] = value),
  getItem: (key: string) => store[key],
  removeItem: (key: string) => delete store[key],
  clear: () => (store = {}),
});

export const createStorageService = (
  storage: Storage | ReturnType<typeof nullStorage>
) => ({
  stockItem: (key: string, value: string) => storage.setItem(key, value),

  getItem: (key: string) => storage.getItem(key),

  removeItem: (key: string) => storage.removeItem(key),
  clear: () => storage.clear(),
});
