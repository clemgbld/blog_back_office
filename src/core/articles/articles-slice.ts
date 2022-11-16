import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { retrieveArticles } from "./use-cases/retrieve-articles";
import { postArticle } from "./use-cases/post-article";
import { updateArticle } from "./use-cases/update-article";
import { deleteArticle } from "./use-cases/deleteArticle";
import { Article } from "./entities/article";
import { STATUS } from "../utils/status-constants";

export const articlesAdapter = createEntityAdapter<Article>();

export type InitialState = {
  isArticlesRetrieved: boolean;
  status: string;
  data: EntityState<Article>;
  error?: string;
};

export const initialState: InitialState = {
  isArticlesRetrieved: false,
  status: "idle",
  data: articlesAdapter.getInitialState(),
  error: undefined,
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveArticles.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.isArticlesRetrieved = true;
        articlesAdapter.setAll(state.data, action.payload);
      })
      .addCase(retrieveArticles.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(retrieveArticles.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      })
      .addCase(postArticle.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        articlesAdapter.addOne(state.data, action.payload);
      })
      .addCase(postArticle.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(postArticle.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        articlesAdapter.setOne(state.data, action.payload);
      })
      .addCase(updateArticle.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        articlesAdapter.removeOne(state.data, action.payload);
      })
      .addCase(deleteArticle.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      });
  },
});

export const { resetError, resetState } = articlesSlice.actions;
