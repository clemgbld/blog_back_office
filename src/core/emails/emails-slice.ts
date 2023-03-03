import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { Email } from "./entities/email";
import { retrieveSubscribersEmails } from "./use-cases/retrieve-subscribers-emails";

export const emailsAdapter = createEntityAdapter<Email>();

type InitialState = {
  emails: EntityState<Email>;
  areEmailsRetrieved: boolean;
  status: string;
};

const initialState: InitialState = {
  emails: emailsAdapter.getInitialState(),
  areEmailsRetrieved: false,
  status: "idle",
};

export const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(retrieveSubscribersEmails.fulfilled, (state, action) => {
      state.areEmailsRetrieved = true;
      emailsAdapter.setAll(state.emails, action.payload);
    });
  },
});
