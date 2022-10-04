import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory/retrieveInMemoryArticles";

export const fetchArticles = createAsyncThunk<
  Article[],
  void,
  { extra: { deps: { articlesService: InMemoryArticlesService } } }
>(
  "articles/fetchArticles",
  async (
    _,
    {
      extra: {
        deps: { articlesService },
      },
    }
  ) => articlesService.getArticles()
);
