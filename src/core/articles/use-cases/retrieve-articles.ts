import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Article } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory-services/in-memory-articles-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";

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
  ) => articlesService.getArticles(selectToken(getState())),
  {
    condition: (_, { getState }) => {
      const { articles } = getState();
      if (articles.status === STATUS.PENDING || articles.isArticlesRetrieved) {
        return false;
      }
    },
  }
);
