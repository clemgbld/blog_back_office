import { createAsyncThunk } from "@reduxjs/toolkit";
import { InMemoryArticlesService } from "../infrastructure/in-memory-services/InMemoryArticlesService";

export const deleteArticles = createAsyncThunk<
  string[],
  string[],
  { extra: { services: { articlesService: InMemoryArticlesService } } }
>(
  "articles/deleteArticles",
  async (
    ids,
    {
      extra: {
        services: { articlesService },
      },
    }
  ) => {
    await articlesService.deleteArticles(ids);

    return ids;
  }
);
