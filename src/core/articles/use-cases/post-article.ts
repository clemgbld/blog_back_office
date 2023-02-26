import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../..";
import { Article, ArticleWithoutId } from "../entities/article";
import { ArticlesService } from "../port/aticles-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";
import { notifySubscribers } from "./notify-subscribers";

export const postArticle = createAsyncThunk<
  Article,
  ArticleWithoutId,
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
  "articles/postArticle",
  async (
    articleToPost,
    {
      getState,
      dispatch,
      rejectWithValue,
      extra: {
        services: { articlesService },
      },
    }
  ) => {
    const { notify: _, ...newArticle }: ArticleWithoutId = articleToPost;
    const postedArticle = await articlesService.postArticle(
      newArticle,
      selectToken(getState())
    );
    if (articleToPost.notify) {
      return dispatch(notifySubscribers(postedArticle))
        .unwrap()
        .then(() => postedArticle);
    }
    return postedArticle;
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
