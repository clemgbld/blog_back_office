import { createStore } from "../../../store";
import { selectAllEmails } from "../../selectors/selectors";
import { buildInMemoryServices } from "../../../../infrastructure/common/all-services/all-services-in-memory";
import { retrieveSubscribersEmails } from "../retrieve-subscribers-emails";
import { spy } from "../../../../lib/spy";
import { buildInMemorySubscriptionService } from "../../../../infrastructure/emails/in-memory-services/in-memory-subscription-service";
import { STATUS } from "../../../utils/status-constants";
import { selectEmailsStatus } from "../../selectors/selectors";
import { selectEmailsError } from "../../selectors/selectors";

describe("retrieve subscribers emails", () => {
  it("should have an empty subscribers emails list initially", () => {
    const store = createStore({});
    expect(selectAllEmails(store.getState())).toEqual([]);
    expect(store.getState().emails.areEmailsRetrieved).toBe(false);
    expect(selectEmailsStatus(store.getState())).toBe("idle");
  });

  it("should retrieves subscribers emails", async () => {
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
      preloadedState: {
        auth: {
          token: "fake-token",
          isLoggedIn: true,
          status: STATUS.SUCCESS,
        },
      },
    });

    await store.dispatch(retrieveSubscribersEmails());

    expect(selectAllEmails(store.getState())).toEqual([
      { id: "1", email: "foo@example.com" },
      { id: "2", email: "bar@example.com" },
    ]);

    expect(store.getState().emails.areEmailsRetrieved).toBe(true);
    expect(selectEmailsStatus(store.getState())).toEqual(STATUS.SUCCESS);
  });

  it("should pass the auth token to the subcription service", async () => {
    const getAllEmailsSpy = spy(
      buildInMemorySubscriptionService({}).getAllEmails
    );
    const store = createStore({
      services: buildInMemoryServices({
        subscriptionService: {
          getAllEmailsSpy,
        },
      }),
      preloadedState: {
        auth: {
          token: "fake-token",
          isLoggedIn: true,
          status: STATUS.SUCCESS,
        },
      },
    });

    await store.dispatch(retrieveSubscribersEmails());

    expect(getAllEmailsSpy.args()).toEqual([["fake-token"]]);
  });

  it("should have pending status while the retrieving operation is processing", () => {
    const store = createStore({
      services: buildInMemoryServices({}),
      preloadedState: {
        auth: {
          token: "fake-token",
          isLoggedIn: true,
          status: STATUS.SUCCESS,
        },
      },
    });

    store.dispatch(retrieveSubscribersEmails());
    expect(selectEmailsStatus(store.getState())).toBe(STATUS.PENDING);
  });

  it("should not try to retireving subscribers emails when there is already a retrieving operation that is pending", async () => {
    const getAllEmailsSpy = spy(
      buildInMemorySubscriptionService({}).getAllEmails
    );
    const store = createStore({
      services: buildInMemoryServices({
        subscriptionService: {
          getAllEmailsSpy,
        },
      }),
      preloadedState: {
        emails: {
          emails: {},
          status: STATUS.PENDING,
          areEmailsRetrieved: false,
        },
        auth: {
          token: "fake-token",
          isLoggedIn: true,
          status: STATUS.SUCCESS,
        },
      },
    });

    await store.dispatch(retrieveSubscribersEmails());

    expect(getAllEmailsSpy.hasBeenCalled()).toBe(false);
  });

  it("should not try to retireving subscribers emails when they has been already retrieved", async () => {
    const getAllEmailsSpy = spy(
      buildInMemorySubscriptionService({}).getAllEmails
    );
    const store = createStore({
      services: buildInMemoryServices({
        subscriptionService: {
          getAllEmailsSpy,
        },
      }),
      preloadedState: {
        emails: {
          emails: {},
          status: STATUS.SUCCESS,
          areEmailsRetrieved: true,
        },
        auth: {
          token: "fake-token",
          isLoggedIn: true,
          status: STATUS.SUCCESS,
        },
      },
    });

    await store.dispatch(retrieveSubscribersEmails());

    expect(getAllEmailsSpy.hasBeenCalled()).toBe(false);
  });

  it("should notify the user when the retrieving operation failed", async () => {
    const error = {
      statusCode: 404,
      message: "Something when wrong.",
      status: "fail",
    };
    const store = createStore({
      services: buildInMemoryServices({
        subscriptionService: {
          error,
        },
      }),
      preloadedState: {
        auth: {
          token: "fake-token",
          isLoggedIn: true,
          status: STATUS.SUCCESS,
        },
      },
    });

    await store.dispatch(retrieveSubscribersEmails());
    expect(selectEmailsStatus(store.getState())).toBe(STATUS.REJECTED);
    expect(selectEmailsError(store.getState())).toEqual(error.message);
  });
});
