import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { articlesSlice } from "./articles/articles-slice";
import { InMemoryArticlesService } from "./articles/infrastructure/in-memory/InMemoryArticlesService";

const rootReducer = combineReducers({
  [articlesSlice.name]: articlesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (services: {
  articlesService: InMemoryArticlesService;
}) =>
  configureStore({
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
