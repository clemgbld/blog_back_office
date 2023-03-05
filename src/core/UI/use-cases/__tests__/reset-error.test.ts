import { createStore } from "../../../store";
import { STATUS } from "../../../utils/status-constants";
import { resetEmailsError } from "../../../emails/emails-slice";
import { selectEmailsError } from "../../../emails/selectors/selectors";

describe("reset the error message", () => {
  it("should reset the error message", () => {
    const store = createStore({
      preloadedState: {
        emails: {
          emails: {},
          areEmailsRetrieved: true,
          status: STATUS.REJECTED,
          error: "Something went wrong",
        },
      },
    });

    store.dispatch(resetEmailsError());

    expect(selectEmailsError(store.getState())).toBeUndefined();
  });
});
