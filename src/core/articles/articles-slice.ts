import {
  createSlice,
  createEntityAdapter,
  EntityState,
  AnyAction,
} from "@reduxjs/toolkit";
import { retrieveArticles } from "./use-cases/retrieve-articles";
import { postArticle } from "./use-cases/post-article";
import { updateArticle } from "./use-cases/update-article";
import { deleteArticle } from "./use-cases/deleteArticle";
import { Article } from "./entities/article";
import { STATUS } from "../utils/status-constants";
import {
  PendingAction,
  FulfilledAction,
  RejectedAction,
  AsyncThunkStatus,
} from "../utils/rtk/types";

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

const isStatusAction =
  <T extends AnyAction>(status: AsyncThunkStatus) =>
  (action: T) =>
    [
      updateArticle[status].type,
      retrieveArticles[status].type,
      deleteArticle[status].type,
      postArticle[status].type,
    ].includes(action.type);

const isPendingAction = isStatusAction<PendingAction>("pending");

const isFulfilledAction = isStatusAction<FulfilledAction>("fulfilled");

const isRejectedAction = isStatusAction<RejectedAction>("rejected");

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

      .addMatcher(isPendingAction, (state) => {
        state.status = STATUS.PENDING;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.status = STATUS.SUCCESS;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      });
  },
});

export const { resetError } = articlesSlice.actions;
