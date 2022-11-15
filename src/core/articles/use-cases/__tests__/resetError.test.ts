import { createStore } from "../../../store";
import { resetError } from "../../articles-slice";

describe("reset error", () => {
  it("should reset the articles error", () => {
    const preloadedState = {
      articles: {
        isArticlesRetrieved: true,
        status: "rejected",
        error: "Something went wrong",
        data: {
          ids: [],
          entities: {},
        },
      },
    };

    const store = createStore({ preloadedState });

    store.dispatch(resetError());

    expect(store.getState().articles.error).toBe(undefined);
  });
});
