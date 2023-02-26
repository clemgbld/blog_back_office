import {
  createSlice,
  createEntityAdapter,
  EntityState,
  AsyncThunk,
  AnyAction,
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

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;

type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return [
    updateArticle.pending.type,
    retrieveArticles.pending.type,
    deleteArticle.pending.type,
    postArticle.pending.type,
  ].includes(action.type);
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return [
    updateArticle.fulfilled.type,
    retrieveArticles.fulfilled.type,
    deleteArticle.fulfilled.type,
    postArticle.fulfilled.type,
  ].includes(action.type);
}

function isRejectedAction(action: any) {
  return [
    updateArticle.rejected.type,
    retrieveArticles.rejected.type,
    deleteArticle.rejected.type,
    postArticle.rejected.type,
  ].includes(action.type);
}

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveArticles.fulfilled, (state, action) => {
        state.isArticlesRetrieved = true;
        articlesAdapter.setAll(state.data, action.payload);
      })

      .addCase(postArticle.fulfilled, (state, action) => {
        articlesAdapter.addOne(state.data, action.payload);
      })

      .addCase(updateArticle.fulfilled, (state, action) => {
        articlesAdapter.setOne(state.data, action.payload);
      })

      .addCase(deleteArticle.fulfilled, (state, action) => {
        articlesAdapter.removeOne(state.data, action.payload);
      })

      .addMatcher(isPendingAction, (state, action) => {
        state.status = STATUS.PENDING;
      })
      .addMatcher(isFulfilledAction, (state, action) => {
        state.status = STATUS.SUCCESS;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      });
  },
});

export const { resetError } = articlesSlice.actions;
