import { createStore, Store } from "../../../store";

import { updateSearchTerms } from "../update-search-terms";

describe("update search terms", () => {
  let store: Store;
  beforeEach(() => {
    store = createStore({});
  });

  it("should have a search terms empty", () => {
    expect(store.getState().ui.searchTerms).toBe("");
  });

  it("should update search terms", () => {
    store.dispatch(updateSearchTerms("React"));

    expect(store.getState().ui.searchTerms).toBe("React");
  });
});
