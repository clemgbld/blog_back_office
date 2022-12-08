import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Article, ArticleWithoutId } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory-services/In-memory-articles-service";
import { selectToken } from "../../auth/selectors/selectors";

export const postArticle = createAsyncThunk<
  Article,
  ArticleWithoutId,
  {
    state: RootState;
    extra: { services: { articlesService: InMemoryArticlesService } };
  }
>(
  "articles/postArticle",
  async (
    articleToPost,
    {
      getState,
      extra: {
        services: { articlesService },
      },
    }
  ) => await articlesService.postArticle(articleToPost, selectToken(getState()))
);
