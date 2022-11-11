import { createStore } from "../../../store";
import {
  selectToken,
  selectIsLoggedIn,
  selectAuthStatus,
} from "../../selectors/selectors";
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

const error = {
  status: 401,
  message: "Email or password incorrect.",
};

describe("login", () => {
  it("should have a none loged in user and no token", () => {
    const store = createStore({});

    expect(selectToken(store.getState())).toBe(null);
    expect(selectIsLoggedIn(store.getState())).toBe(false);
    expect(selectAuthStatus(store.getState())).toBe("idle");
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
    expect(selectAuthStatus(store.getState())).toBe("success");
  });

  it("should have a pending status while the login operation is proccessing", () => {
    const store = createStore({});
    store.dispatch(login(fakeUserInfos));
    expect(selectAuthStatus(store.getState())).toBe("pending");
  });

  it("should alert the user when therer is an login error", async () => {
    const store = createStore({
      services: buildInMemoryServices({ authService: { error } }),
    });
    await store.dispatch(login(fakeUserInfos));

    expect(selectAuthStatus(store.getState())).toBe("rejected");
    expect(store.getState().auth.error).toBe(error.message);
  });
});
