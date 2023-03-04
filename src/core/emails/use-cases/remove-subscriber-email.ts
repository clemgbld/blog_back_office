import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { SubscriptionService } from "../port/subscription-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";

export const removeSubscriberEmail = createAsyncThunk<
  string,
  string,
  {
    state: RootState;
    extra: { services: { subscriptionService: SubscriptionService } };
  }
>(
  "emails/removeSubscriberEmail",
  async (
    id,
    {
      getState,
      extra: {
        services: { subscriptionService },
      },
    }
  ) => {
    await subscriptionService.removeSubscriberEmail(
      id,
      selectToken(getState())
    );
    return id;
  },
  {
    condition: (_, { getState }) => {
      const { emails } = getState();
      if (emails.status === STATUS.PENDING) return false;
    },
  }
);
