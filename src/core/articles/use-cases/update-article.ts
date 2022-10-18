import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article, ArticleWithoutTimeToRead } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory-services/InMemoryArticlesService";

export const updateArticle = createAsyncThunk<
  Article,
  ArticleWithoutTimeToRead,
  { extra: { services: { articlesService: InMemoryArticlesService } } }
>(
  "articles/updateArticle",
  async (
    updatedArticle,
    {
      extra: {
        services: { articlesService },
      },
    }
  ) => await articlesService.updateArticle(updatedArticle)
);
