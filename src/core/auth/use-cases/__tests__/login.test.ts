import { createStore } from "../../../store";
import { selectToken, selectIsLoggedIn } from "../../selectors/selectors";
import { inMemoryArticlesService } from "../../../articles/infrastructure/in-memory-services/InMemoryArticlesService";
import { inMemoryAuthService } from "../../infrastructure/in-memory-services/in-memory-auth-service";
import { login } from "../login";

describe("login", () => {
  it("should have a none loged in user and no token", () => {
    const store = createStore({});

    expect(selectToken(store.getState())).toBe(null);
    expect(selectIsLoggedIn(store.getState())).toBe(false);
  });

  it("should log the user in and persit his token with token expiration date", async () => {
    const store = createStore({
      services: {
        articlesService: inMemoryArticlesService([]),
        authService: inMemoryAuthService(),
      },
    });

    await store.dispatch(login());
    expect(selectToken(store.getState())).toBe("fake-token");
    expect(selectIsLoggedIn(store.getState())).toBe(true);
  });
});
