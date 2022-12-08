import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { InMemoryArticlesService } from "../infrastructure/in-memory-services/In-memory-articles-service";
import { selectToken } from "../../auth/selectors/selectors";

export const deleteArticle = createAsyncThunk<
  string,
  string,
  {
    state: RootState;
    extra: { services: { articlesService: InMemoryArticlesService } };
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
  }
);
