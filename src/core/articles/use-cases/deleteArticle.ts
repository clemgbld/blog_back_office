import { createAsyncThunk } from "@reduxjs/toolkit";
import { InMemoryArticlesService } from "../infrastructure/in-memory-services/InMemoryArticlesService";

export const deleteArticle = createAsyncThunk<
  string,
  string,
  { extra: { services: { articlesService: InMemoryArticlesService } } }
>(
  "articles/deleteArticle",
  async (
    id,
    {
      extra: {
        services: { articlesService },
      },
    }
  ) => {
    await articlesService.deleteArticle(id);

    return id;
  }
);
