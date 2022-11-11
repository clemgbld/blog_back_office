import { createStore } from "../../../store";

describe("logout", () => {
  it.skip("should logout the user", () => {
    const preloadedState = {
      articles: {
        isArticlesRetrieved: true,
        status: "success",
        data: {
          ids: [],
          entities: {},
        },
      },
      auth: {
        status: "success",
        isLoggedIn: true,
        token: "fake-token",
      },
      ui: {
        isEditorInLightMode: true,
        searchTerms: "",
      },
    };

    const store = createStore({ preloadedState });
  });
});
