import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article,ArticleWithoutId } from "../entities/article";


import { InMemoryArticlesService } from "../infrastructure/in-memory-services/InMemoryArticlesService";



export const postArticle = createAsyncThunk<
  Article,
  ArticleWithoutId ,
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
    return await articlesService.postArticle(articleToPost);
  }
);
