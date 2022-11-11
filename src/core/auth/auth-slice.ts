import { createSlice } from "@reduxjs/toolkit";
import { login } from "./use-cases/login";
import { STATUS } from "../utils/status-constants";

type InitialState = {
  token: string | null;
  isLoggedIn: boolean;
  status: string;
  error?: string;
};

const initialState: InitialState = {
  token: null,
  isLoggedIn: false,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      });
  },
});
