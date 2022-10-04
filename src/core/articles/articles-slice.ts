import { createSlice, createEntityAdapter,EntityState } from "@reduxjs/toolkit";
import { fetchArticles } from "./use-cases/fecthArticles";
import { Article } from "./entities/article";

export const articlesAdapter = createEntityAdapter<Article>();

type InitialState = {
  status:string;
  data:  EntityState<Article>;
  error?:string
}

const initialState:InitialState = {
  status: "idle",
  data: articlesAdapter.getInitialState(),
  error:undefined
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "success";
        articlesAdapter.setAll(state.data, action.payload);
      })
      .addCase(fetchArticles.pending, (state) => {
        state.status = "pending";
      }).addCase(fetchArticles.rejected,(state,action)=>{
        state.status = "rejected";
        state.error = action.error.message
      })
  },
});
