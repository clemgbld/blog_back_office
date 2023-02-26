import { createSlice } from "@reduxjs/toolkit";
import { login } from "./use-cases/login";
import { logout } from "./use-cases/logout";
import { loginFromStorage } from "./use-cases/login-from-storage";
import { STATUS } from "../utils/status-constants";
import { FulfilledAction } from "../utils/rtk/types";

type InitialState = {
  token: string;
  isLoggedIn: boolean;
  status: string;
  error?: string;
};

export const initialState: InitialState = {
  token: "",
  isLoggedIn: false,
  status: "idle",
};

const isLogginActionSucess = (action: FulfilledAction): boolean =>
  [login.fulfilled.type, loginFromStorage.fulfilled.type].includes(action.type);

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
      .addCase(login.fulfilled, (state) => {
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
        state.token = "";
        state.isLoggedIn = false;
      })
      .addMatcher(isLogginActionSucess, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = !!action.payload.token;
      });
  },
});

export const { resetError } = authSlice.actions;
