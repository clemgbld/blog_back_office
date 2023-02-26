import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { articlesSlice } from "./articles/articles-slice";
import { authSlice } from "./auth/auth-slice";
import { uiSlice } from "./UI/ui-slice";
import { emailsSlice } from "./emails/emails-slice";

import { buildInMemoryServices } from "../infrastructure/common/all-services/all-services-in-memory";

const rootReducer = combineReducers({
  [articlesSlice.name]: articlesSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
  [emailsSlice.name]: emailsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = ({
  services = buildInMemoryServices({}),

  preloadedState = {},
}) =>
  configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            services,
          },
        },
      }),
  });

export type Store = ReturnType<typeof createStore>;
