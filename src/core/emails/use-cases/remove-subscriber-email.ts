import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { SubscriptionService } from "../port/subscription-service";

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
    await subscriptionService.removeSubscriberEmail(id);
    return id;
  }
);
