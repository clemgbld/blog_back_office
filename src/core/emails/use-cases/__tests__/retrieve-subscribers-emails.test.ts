import { createStore } from "../../../store";

describe("retrieve subscribers emails", () => {
  it("should have an empty subscribers emails list initially", () => {
    const store = createStore({});
    expect(store.getState().emails.emails).toEqual([]);
    expect(store.getState().emails.areEmailsRetrieved).toBe(false);
    expect(store.getState().emails.status).toBe("idle");
  });
});
