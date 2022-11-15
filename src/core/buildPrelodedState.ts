import { PreloadedState } from "@reduxjs/toolkit";
import { RootState } from "..";
import { initialState as articlesInitialState } from "./articles/articles-slice";
import { initialState as authInitialState } from "./auth/auth-slice";
import { initialState as uiInitialState } from "./UI/ui-slice";

export const buildPrelodedState = ({
  articles = articlesInitialState,
  ui = uiInitialState,
  auth = authInitialState,
}: PreloadedState<RootState>): PreloadedState<RootState> => ({
  articles,
  ui,
  auth,
});
