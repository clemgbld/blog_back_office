import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchArticles } from "./actions/fecthArticles";
import { Article } from "./entities/article";

const articlesAdapter = createEntityAdapter<Article>();

const initialState = {
  status: "idle",
  data: articlesAdapter.getInitialState(),
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = "success";
      articlesAdapter.setAll(state.data, action.payload);
    });
  },
});
