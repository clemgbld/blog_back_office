import { createStore } from "../../../store";
import { selectToken, selectIsLoggedIn } from "../../selectors/selectors";

describe("login", () => {
  it("should have a none loged in user and no token", () => {
    const store = createStore({});

    expect(selectToken(store.getState())).toBe(null);
    expect(selectIsLoggedIn(store.getState())).toBe(false);
  });

  it.todo(
    "should log the user in and persit his token with token expiration date"
  );
});
