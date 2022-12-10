import { createStore } from "../../../store";
import {
  inMemoryStorage,
  createStorageService,
} from "../../../infastructure/storage-service";
import { createClock } from "../../../infastructure/create-clock";
import { selectToken, selectIsLoggedIn } from "../../selectors/selectors";
import { buildInMemoryServices } from "../../../infastructure/all-services/all-services-in-memory";
import { loginFromStorage } from "../login-from-storage";

describe("login from storage", () => {
  const setupStore = (
    clockService = createClock.createNull(),
    existingStorage: Record<string, string> = {
      "blog-admin-token": "fake-token",
      "blog-admin-token-expiration-time": "1668171813577",
    }
  ) => {
    const storageService = createStorageService(
      inMemoryStorage(existingStorage)
    );

    const store = createStore({
      services: buildInMemoryServices({ storageService, clockService }),
    });

    return store;
  };

  it("should automaticaly log the user on app initialization when he already has a valid token in the storage", async () => {
    const store = setupStore();

    await store.dispatch(loginFromStorage());

    expect(selectToken(store.getState())).toBe("fake-token");
    expect(selectIsLoggedIn(store.getState())).toBe(true);
  });

  it("should not automaticaly log the user when his token pass its expiration date", async () => {
    const clockService = createClock.createNull({ now: 1668171813578 });

    const store = setupStore(clockService);

    await store.dispatch(loginFromStorage());

    expect(selectToken(store.getState())).toBe("");
    expect(selectIsLoggedIn(store.getState())).toBe(false);
  });

  it("should not automaticaly log the user when his token expiration date is equal to the current timestamp", async () => {
    const clockService = createClock.createNull({ now: 1668171813577 });

    const store = setupStore(clockService);

    await store.dispatch(loginFromStorage());

    expect(selectToken(store.getState())).toBe("");
    expect(selectIsLoggedIn(store.getState())).toBe(false);
  });

  it("should not automaticaly log the user when there is no stored token", async () => {
    const clockService = createClock.createNull();

    const store = setupStore(clockService, {});

    await store.dispatch(loginFromStorage());

    expect(selectToken(store.getState())).toBe("");
    expect(selectIsLoggedIn(store.getState())).toBe(false);
  });
});
