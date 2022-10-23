import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../../..";

import { updateArticle } from "./update-article";

export const toggleHideStatus = createAsyncThunk<
  any,
  string,
  { state: RootState; dispatch: AppDispatch }
>(
  "articles/toggleHideStatus",
  async (id, thunkApi) =>
    await thunkApi.dispatch(
      updateArticle({
        ...thunkApi.getState().articles.data.entities[id],
        hide:
          thunkApi.getState().articles.data.entities[id].hide !== undefined
            ? !thunkApi.getState().articles.data.entities[id].hide
            : true,
      })
    )
);
