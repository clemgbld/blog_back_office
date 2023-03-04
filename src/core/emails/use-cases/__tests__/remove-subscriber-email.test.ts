import { createStore } from "../../../store";
import { STATUS } from "../../../utils/status-constants";
import { removeSubscriberEmail } from "../remove-subscriber-email";
import { selectAllEmails } from "../../selectors/selectors";
import { selectEmailsStatus } from "../../selectors/selectors";

const preloadedState = {
  emails: {
    areEmailsRetrieved: true,
    status: "idle",
    emails: {
      ids: ["1"],
      entities: {
        1: { id: "1", email: "foo@example.com" },
      },
    },
  },
};

const articleToRemoveId = "1";

describe("remove subscriber email", () => {
  it("should remove the expected subscriber email", async () => {
    const store = createStore({
      preloadedState,
    });

    await store.dispatch(removeSubscriberEmail(articleToRemoveId));

    expect(selectAllEmails(store.getState())).toEqual([]);
    expect(selectEmailsStatus(store.getState())).toEqual(STATUS.SUCCESS);
  });

  it("should pass the token to removeSubscriber in subscription service", () => {});
});
