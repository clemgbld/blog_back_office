import { createSlice,createEntityAdapter,EntityState } from "@reduxjs/toolkit";


type Email = {
  id:string,
  email:string
}

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
});
