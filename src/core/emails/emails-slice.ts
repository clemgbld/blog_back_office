import {
  createSlice,
  createEntityAdapter,
  EntityState,
  AnyAction,
} from "@reduxjs/toolkit";
import { STATUS } from "../utils/status-constants";
import { Email } from "./entities/email";
import { removeSubscriberEmail } from "./use-cases/remove-subscriber-email";
import { retrieveSubscribersEmails } from "./use-cases/retrieve-subscribers-emails";
import {
  PendingAction,
  FulfilledAction,
  RejectedAction,
  AsyncThunkStatus,
} from "../utils/rtk/types";

export const emailsAdapter = createEntityAdapter<Email>();

type InitialState = {
  emails: EntityState<Email>;
  areEmailsRetrieved: boolean;
  status: string;
  error?: string;
};

const initialState: InitialState = {
  emails: emailsAdapter.getInitialState(),
  areEmailsRetrieved: false,
  status: "idle",
};

const isStatusAction =
  <T extends AnyAction>(status: AsyncThunkStatus) =>
  (action: T) =>
    [
      retrieveSubscribersEmails[status].type,
      removeSubscriberEmail[status].type,
    ].includes(action.type);

const isPendingAction = isStatusAction<PendingAction>("pending");

const isFulfilledAction = isStatusAction<FulfilledAction>("fulfilled");

const isRejectedAction = isStatusAction<RejectedAction>("rejected");

export const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    resetEmailsError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveSubscribersEmails.fulfilled, (state, action) => {
        state.areEmailsRetrieved = true;
        emailsAdapter.setAll(state.emails, action.payload);
      })
      .addCase(removeSubscriberEmail.fulfilled, (state, action) => {
        emailsAdapter.removeOne(state.emails, action.payload);
      })

      .addMatcher(isPendingAction, (state) => {
        state.status = STATUS.PENDING;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.status = STATUS.SUCCESS;
      });
  },
});

export const { resetEmailsError } = emailsSlice.actions;
