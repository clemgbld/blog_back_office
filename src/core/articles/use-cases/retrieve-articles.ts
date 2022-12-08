import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Article } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory-services/in-memory-articles-service";
import { selectToken } from "../../auth/selectors/selectors";

export const retrieveArticles = createAsyncThunk<
  Article[],
  void,
  {
    state: RootState;
    extra: { services: { articlesService: InMemoryArticlesService } };
  }
>(
  "articles/fetchArticles",
  async (
    _,
    {
      getState,
      extra: {
        services: { articlesService },
      },
    }
  ) => articlesService.getArticles(selectToken(getState()))
);
