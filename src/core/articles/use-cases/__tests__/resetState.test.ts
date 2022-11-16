import { createStore } from "../../../store";
import { articleBuilder } from "../builder/article-builder";
import { resetState } from "../../articles-slice";

describe("reset state", () => {
  it("should reset the current state to the initial state", () => {
    const preloadedState = {
      articles: {
        isArticlesRetrieved: true,
        status: "idle",
        data: {
          ids: ["1"],
          entities: {
            1: articleBuilder(),
          },
        },
      },
    };

    const store = createStore({ preloadedState });

    store.dispatch(resetState());

    expect(store.getState().articles).toEqual({
      isArticlesRetrieved: false,
      status: "idle",
      data: {
        ids: [],
        entities: {},
      },
    });
  });
});
