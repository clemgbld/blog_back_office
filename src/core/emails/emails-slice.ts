import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  emails: string[];
  areEmailsRetrieved: boolean;
  status: string;
};

const initialState: InitialState = {
  emails: [],
  areEmailsRetrieved: false,
  status: "idle",
};

export const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
});
