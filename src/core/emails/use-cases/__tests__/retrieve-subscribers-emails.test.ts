import { createStore } from "../../../store";
import { selectAllEmails } from "../selectors/selectors";
import { buildInMemoryServices } from "../../../../infrastructure/common/all-services/all-services-in-memory";
import { retrieveSubscribersEmails } from "../retrieve-subscribers-emails";

describe("retrieve subscribers emails", () => {
  it("should have an empty subscribers emails list initially", () => {
    const store = createStore({});
    expect(selectAllEmails(store.getState())).toEqual([]);
    expect(store.getState().emails.areEmailsRetrieved).toBe(false);
    expect(store.getState().emails.status).toBe("idle");
  });

  it("should retrieves subscribers emails and give the auth token to the subscription service", async () => {
    const existingEmails = [
      { id: "1", email: "foo@example.com" },
      { id: "2", email: "bar@example.com" },
    ];

    const store = createStore({
      services: buildInMemoryServices({
        subscriptionService: {
          existingEmails,
        },
      }),
    });

    await store.dispatch(retrieveSubscribersEmails());

    expect(selectAllEmails(store.getState())).toEqual([
      { id: "1", email: "foo@example.com" },
      { id: "2", email: "bar@example.com" },
    ]);
    expect(store.getState().emails.areEmailsRetrieved).toBe(true);
  });
});
