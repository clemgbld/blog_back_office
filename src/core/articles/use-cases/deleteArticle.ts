import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { ArticlesService } from "../port/aticles-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";

export const deleteArticle = createAsyncThunk<
  string,
  string,
  {
    state: RootState;
    extra: { services: { articlesService: ArticlesService } };
  }
>(
  "articles/deleteArticle",
  async (
    id,
    {
      getState,
      extra: {
        services: { articlesService },
      },
    }
  ) => {
    await articlesService.deleteArticle(id, selectToken(getState()));

    return id;
  },
  {
    condition: (id, { getState }) => {
      const { articles } = getState();
      if (articles.status === STATUS.PENDING) {
        return false;
      }
    },
  }
);
