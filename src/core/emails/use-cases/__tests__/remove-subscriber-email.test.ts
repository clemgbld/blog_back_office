import { createStore } from "../../../store";
import { STATUS } from "../../../utils/status-constants";
import { removeSubscriberEmail } from "../remove-subscriber-email";
import { selectAllEmails } from "../../selectors/selectors";
import { selectEmailsStatus } from "../../selectors/selectors";
import { buildInMemorySubscriptionService } from "../../../../infrastructure/emails/in-memory-services/in-memory-subscription-service";
import { spy } from "../../../../lib/spy";
import { buildInMemoryServices } from "../../../../infrastructure/common/all-services/all-services-in-memory";
import { selectEmailsError } from "../../selectors/selectors";

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
  auth: {
    token: "fake-token",
    isLoggedIn: true,
    status: STATUS.SUCCESS,
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

  it("should pass the token to removeSubscriber in subscription service", async () => {
    const removeSubscriberEmailSpy = spy(
      buildInMemorySubscriptionService({}).removeSubscriberEmail
    );

    const store = createStore({
      services: buildInMemoryServices({
        subscriptionService: {
          removeSubscriberEmailSpy,
        },
      }),
      preloadedState,
    });

    await store.dispatch(removeSubscriberEmail(articleToRemoveId));

    expect(removeSubscriberEmailSpy.args()).toEqual([["1", "fake-token"]]);
  });

  it("should inform the user when the remove operation is loading", () => {
    const store = createStore({
      preloadedState,
    });

    store.dispatch(removeSubscriberEmail(articleToRemoveId));

    expect(selectEmailsStatus(store.getState())).toEqual(STATUS.PENDING);
  });

  it("should not perform the remove operation when another operation is already excuting", async () => {
    const removeSubscriberEmailSpy = spy(
      buildInMemorySubscriptionService({}).removeSubscriberEmail
    );

    const store = createStore({
      services: buildInMemoryServices({
        subscriptionService: {
          removeSubscriberEmailSpy,
        },
      }),
      preloadedState: {
        ...preloadedState,
        emails: {
          ...preloadedState.emails,
          status: STATUS.PENDING,
        },
      },
    });

    await store.dispatch(removeSubscriberEmail(articleToRemoveId));

    expect(removeSubscriberEmailSpy.hasBeenCalled()).toBe(false);
  });

  it("should inform the user when the remove operation failed", async () => {
    const error = {
      statusCode: 404,
      message: "Something when wrong.",
      status: "fail",
    };
    const store = createStore({
      preloadedState,
      services: buildInMemoryServices({
        subscriptionService: {
          error,
        },
      }),
    });

    await store.dispatch(removeSubscriberEmail(articleToRemoveId));
    expect(selectEmailsStatus(store.getState())).toBe(STATUS.REJECTED);
    expect(selectEmailsError(store.getState())).toEqual(error.message);
  });
});
