import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Article, ArticleWithoutId } from "../entities/article";
import { ArticlesService } from "../port/aticles-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";

export const postArticle = createAsyncThunk<
  Article,
  ArticleWithoutId,
  {
    state: RootState;
    extra: { services: { articlesService: ArticlesService } };
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
    condition: (_, { getState }) => {
      const { articles } = getState();

      if (articles.status === STATUS.PENDING) {
        return false;
      }
    },
  }
);
