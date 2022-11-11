import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../..";

export const selectToken = createSelector(
  (state: RootState) => state.auth.token,
  (token) => token
);

export const selectIsLoggedIn = createSelector(
  (state: RootState) => state.auth.isLoggedIn,
  (isLoggedIn) => isLoggedIn
);

export const selectAuthStatus = createSelector(
  (state: RootState) => state.auth.status,
  (status) => status
);
