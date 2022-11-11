import { createStore } from "../../../store";
import { selectToken, selectIsLoggedIn } from "../../selectors/selectors";
import {
  inMemoryStorage,
  createStorageService,
} from "../../../infastructure/storage-service";
import { createClock } from "../../../infastructure/create-clock";
import { buildInMemoryServices } from "../../../infastructure/all-services/all-services-in-memory";
import { login } from "../login";

const FAKE_TOKEN = "fake-token";
const FAKE_EXPIRATION_DATE = 7776000000;
const CURRENT_TIMESTAMP = 1668171813577;

const fakeUserInfos = {
  email: "user@hotmail.fr",
  password: "password",
};

describe("login", () => {
  it("should have a none loged in user and no token", () => {
    const store = createStore({});

    expect(selectToken(store.getState())).toBe(null);
    expect(selectIsLoggedIn(store.getState())).toBe(false);
  });

  it("should log the user in and persit his token with token expiration date", async () => {
    const storageService = createStorageService(inMemoryStorage());
    const clockService = createClock.createNull({ now: CURRENT_TIMESTAMP });

    const store = createStore({
      services: buildInMemoryServices({ storageService, clockService }),
    });

    await store.dispatch(login(fakeUserInfos));

    expect(selectToken(store.getState())).toBe(FAKE_TOKEN);
    expect(selectIsLoggedIn(store.getState())).toBe(true);
    expect(storageService.getItem("blog-admin-token")).toBe(FAKE_TOKEN);
    expect(+storageService.getItem("blog-admin-token-expiration-time")).toBe(
      FAKE_EXPIRATION_DATE + CURRENT_TIMESTAMP
    );
  });
});
