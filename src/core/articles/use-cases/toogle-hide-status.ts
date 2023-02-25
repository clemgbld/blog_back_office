import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../..";
import { updateArticle } from "./update-article";

export const toggleHideStatus = createAsyncThunk<
  any,
  string,
  { state: any; dispatch: AppDispatch }
>(
  "articles/toggleHideStatus",
  async (id, thunkApi) =>
    await thunkApi.dispatch(
      updateArticle({
        ...thunkApi.getState().articles.data.entities[id],
        notify: false,
        hide:
          thunkApi.getState().articles.data.entities[id].hide !== undefined
            ? !thunkApi.getState().articles.data.entities[id].hide
            : true,
      })
    )
);
