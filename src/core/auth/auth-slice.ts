import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  token: string | null;
  isLoggedIn: boolean;
};

const initialState: InitialState = {
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
