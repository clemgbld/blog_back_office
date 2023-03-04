import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Email } from "../entities/email";
import { SubscriptionService } from "../port/subscription-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";

export const retrieveSubscribersEmails = createAsyncThunk<
  Email[],
  void,
  {
    state: RootState;
    extra: { services: { subscriptionService: SubscriptionService } };
  }
>(
  "emails/retrieveSubscribersEmails",
  async (
    _,
    {
      getState,
      extra: {
        services: { subscriptionService },
      },
    }
  ) => subscriptionService.getAllEmails(selectToken(getState())),
  {
    condition: (_, { getState }) => {
      const { emails } = getState();
      if (emails.status === STATUS.PENDING || emails.areEmailsRetrieved)
        return false;
    },
  }
);
