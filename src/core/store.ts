import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { articlesSlice } from "./articles/articles-slice";
import { authSlice } from "./auth/auth-slice";
import { uiSlice } from "./UI/ui-slice";
import { inMemoryArticlesService } from "./articles/infrastructure/in-memory-services/InMemoryArticlesService";

const rootReducer = combineReducers({
  [articlesSlice.name]: articlesSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = ({
  services = {
    articlesService: inMemoryArticlesService([]),
  },

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
