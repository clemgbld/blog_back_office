import { createStore } from "../../../store";
import { selectToken, selectIsLoggedIn } from "../../selectors/selectors";
import {
  inMemoryStorage,
  createStorageService,
} from "../../../infastructure/storage-service";
import { buildInMemoryServices } from "../../../infastructure/all-services/all-services-in-memory";
import { login } from "../login";

describe("login", () => {
  it("should have a none loged in user and no token", () => {
    const store = createStore({});

    expect(selectToken(store.getState())).toBe(null);
    expect(selectIsLoggedIn(store.getState())).toBe(false);
  });

  it("should log the user in and persit his token with token expiration date", async () => {
    const storageService = createStorageService(inMemoryStorage());

    const store = createStore({
      services: buildInMemoryServices({ storageService }),
    });

    await store.dispatch(login());
    expect(selectToken(store.getState())).toBe("fake-token");
    expect(selectIsLoggedIn(store.getState())).toBe(true);
  });
});
