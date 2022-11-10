import { createSlice } from "@reduxjs/toolkit";
import { login } from "./use-cases/login";

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
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
    });
  },
});
