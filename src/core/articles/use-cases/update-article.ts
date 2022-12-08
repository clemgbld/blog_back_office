import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Article, ArticleWithoutTimeToRead } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory-services/In-memory-articles-service";
import { selectToken } from "../../auth/selectors/selectors";

export const updateArticle = createAsyncThunk<
  Article,
  ArticleWithoutTimeToRead,
  {
    state: RootState;
    extra: { services: { articlesService: InMemoryArticlesService } };
  }
>(
  "articles/updateArticle",
  async (
    updatedArticle,
    {
      getState,
      extra: {
        services: { articlesService },
      },
    }
  ) =>
    await articlesService.updateArticle(updatedArticle, selectToken(getState()))
);
