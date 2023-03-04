import { RootState } from "../../..";
import { emailsAdapter } from "../emails-slice";

const emailsSelectors = emailsAdapter.getSelectors<RootState>(
  (state) => state.emails.emails
);

export const selectAllEmails = (state: RootState) =>
  emailsSelectors.selectAll(state);

export const selectEmailsStatus = (state: RootState) => state.emails.status;
