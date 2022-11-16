import { createStore } from "../../../store";
import { resetError } from "../../auth-slice";

describe("reset error", () => {
  it("should reset error message", () => {
    const preloadedState = {
      auth: {
        token: null,
        isLoggedIn: false,
        status: "rejected",
        error: "Something went wrong",
      },
    };

    const store = createStore({ preloadedState });

    store.dispatch(resetError());

    expect(store.getState().auth.error).toBe(undefined);
  });
});
