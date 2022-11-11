import { createStore } from "../../../store";
import {
  inMemoryStorage,
  createStorageService,
} from "../../../infastructure/storage-service";
import { selectToken, selectIsLoggedIn } from "../../selectors/selectors";
import { buildInMemoryServices } from "../../../infastructure/all-services/all-services-in-memory";
import { loginFromStorage } from "../login-from-storage";

describe("login from storage", () => {
  it("should automaticaly log the user on app initialization when he already has a valid token in the storage", async () => {
    const existingStorage: Record<string, string> = {
      "blog-admin-token": "fake-token",
      "blog-admin-token-expiration-time": "1668171813577",
    };

    const storageService = createStorageService(
      inMemoryStorage(existingStorage)
    );

    const store = createStore({
      services: buildInMemoryServices({ storageService }),
    });

    await store.dispatch(loginFromStorage());

    expect(selectToken(store.getState())).toBe("fake-token");
    expect(selectIsLoggedIn(store.getState())).toBe(true);
  });
});
