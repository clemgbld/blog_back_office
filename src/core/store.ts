import { configureStore } from "@reduxjs/toolkit";
import { articlesSlice } from "./articles/articles-slice";

export const createStore = () =>
  configureStore({
    reducer: {
      articles: articlesSlice.reducer,
    },
  });
