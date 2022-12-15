import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Article, ArticleWithoutId } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory-services/in-memory-articles-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";

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
  ) =>
    await articlesService.postArticle(articleToPost, selectToken(getState())),
  {
    condition: (articleToPost, { getState }) => {
      const { articles } = getState();
      if (articles.status === STATUS.PENDING) {
        return false;
      }
    },
  }
);
