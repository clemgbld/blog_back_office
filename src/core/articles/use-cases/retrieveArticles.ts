import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory/InMemoryArticlesService";

export const retrieveArticles = createAsyncThunk<
  Article[],
  void,
  { extra: { services: { articlesService: InMemoryArticlesService } } }
>(
  "articles/fetchArticles",
  async (
    _,
    {
      extra: {
        services: { articlesService },
      },
    }
  ) => articlesService.getArticles()
);
