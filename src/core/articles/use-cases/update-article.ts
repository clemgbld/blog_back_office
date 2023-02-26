import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../..";
import { Article, ArticleWithoutTimeToRead } from "../entities/article";
import { ArticlesService } from "../port/aticles-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";
import { notifySubscribers } from "./notify-subscribers";

export const updateArticle = createAsyncThunk<
  Article,
  ArticleWithoutTimeToRead,
  {
    state: RootState;
    dispatch: AppDispatch;
    extra: {
      services: {
        articlesService: ArticlesService;
      };
    };
  }
>(
  "articles/updateArticle",
  async (
    updatedArticle,
    {
      getState,
      dispatch,
      extra: {
        services: { articlesService },
      },
    }
  ) => {
    const { notify: _, ...articleToUpdate }: ArticleWithoutTimeToRead =
      updatedArticle;
    const newArticle = await articlesService.updateArticle(
      articleToUpdate,
      selectToken(getState())
    );

    if (updatedArticle.notify) {
      return dispatch(notifySubscribers(newArticle))
        .unwrap()
        .then(() => newArticle);
    }

    return newArticle;
  },
  {
    condition: (_, { getState }) => {
      const { articles } = getState();

      if (articles.status === STATUS.PENDING) {
        return false;
      }
    },
  }
);
