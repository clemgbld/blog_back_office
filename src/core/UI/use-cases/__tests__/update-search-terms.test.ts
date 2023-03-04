import { createStore, Store } from "../../../store";
import { SEARCH_TERMS_STATE } from "../../ui-slice";

import { updateSearchTerms } from "../update-search-terms";

describe("update search terms", () => {
  let store: Store;
  beforeEach(() => {
    store = createStore({});
  });

  it("should have a search terms empty", () => {
    expect(store.getState().ui.searchTerms).toBe("");
    expect(store.getState().ui.emailsSearchTerms).toBe("");
  });

  it("should articles update search terms", () => {
    store.dispatch(
      updateSearchTerms({
        type: SEARCH_TERMS_STATE.ARTICLES,
        searchTerms: "React",
      })
    );

    expect(store.getState().ui.searchTerms).toBe("React");
  });

  it("should update emails search terms", () => {
    store.dispatch(
      updateSearchTerms({
        type: SEARCH_TERMS_STATE.EMAILS,
        searchTerms: "foo@example.com",
      })
    );
    expect(store.getState().ui.emailsSearchTerms).toBe("foo@example.com");
  });
});
