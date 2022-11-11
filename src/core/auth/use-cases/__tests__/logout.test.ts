import { createStore } from "../../../store";
import { logout } from "../logout";
import { selectIsLoggedIn, selectToken } from "../../selectors/selectors";
import { buildInMemoryServices } from "../../../infastructure/all-services/all-services-in-memory";
import {
  createStorageService,
  inMemoryStorage,
} from "../../../infastructure/storage-service";

describe("logout", () => {
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
  it("should logout the user", async () => {
    const existingStorage: Record<string, string> = {
      "blog-admin-token": "fake-token",
      "blog-admin-token-expiration-time": "1668171813577",
    };

    const storageService = createStorageService(
      inMemoryStorage(existingStorage)
    );

    const store = createStore({
      preloadedState,
      services: buildInMemoryServices({ storageService }),
    });

    await store.dispatch(logout());
    expect(selectToken(store.getState())).toBe(null);
    expect(selectIsLoggedIn(store.getState())).toBe(false);
    expect(storageService.getItem("blog-admin-token")).toBe(undefined);
    expect(storageService.getItem("blog-admin-token-expiration-time")).toBe(
      undefined
    );
  });
});
