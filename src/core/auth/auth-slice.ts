import { createSlice } from "@reduxjs/toolkit";
import { login } from "./use-cases/login";
import { logout } from "./use-cases/logout";
import { loginFromStorage } from "./use-cases/login-from-storage";
import { STATUS } from "../utils/status-constants";

type InitialState = {
  token: string | null;
  isLoggedIn: boolean;
  status: string;
  error?: string;
};

export const initialState: InitialState = {
  token: null,
  isLoggedIn: false,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = !!action.payload.token;
        state.status = STATUS.SUCCESS;
      })
      .addCase(login.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = STATUS.REJECTED;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(loginFromStorage.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = !!action.payload.token;
      });
  },
});

export const { resetError } = authSlice.actions;
