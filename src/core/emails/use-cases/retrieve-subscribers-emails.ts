import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Email } from "../entities/email";
import { SubscriptionService } from "../port/subscription-service";

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
      extra: {
        services: { subscriptionService },
      },
    }
  ) => subscriptionService.getAllEmails()
);
