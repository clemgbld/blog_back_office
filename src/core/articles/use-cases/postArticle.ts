import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory/InMemoryArticlesService";

export const postArticle = createAsyncThunk<
  Article,
  Article,
  { extra: { services: { articlesService: InMemoryArticlesService } } }
>(
  "articles/postArticle",
  async (
    articleToPost,
    {
      extra: {
        services: { articlesService },
      },
    }
  ) => {
    await articlesService.postArticle(articleToPost);
    return articleToPost;
  }
);
