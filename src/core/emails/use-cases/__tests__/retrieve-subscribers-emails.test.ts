import { createStore } from "../../../store";
import { selectAllEmails } from "../selectors/selectors";

describe("retrieve subscribers emails", () => {
  it("should have an empty subscribers emails list initially", () => {
    const store = createStore({});
    expect(selectAllEmails(store.getState())).toEqual([]);
    expect(store.getState().emails.areEmailsRetrieved).toBe(false);
    expect(store.getState().emails.status).toBe("idle");
  });
});
