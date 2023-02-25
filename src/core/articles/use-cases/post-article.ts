import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Article, ArticleWithoutId } from "../entities/article";
import { ArticlesService } from "../port/aticles-service";
import { EmailNotificationService } from "../port/email-notification-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";
import { formatDateDDMMYYYY } from "../../utils/date/format-date";
import { selectFirstImg } from "../selectors/select-first-img/select-first-img";

export const postArticle = createAsyncThunk<
  Article,
  ArticleWithoutId,
  {
    state: RootState;
    extra: {
      services: {
        articlesService: ArticlesService;
        emailNotificationService: EmailNotificationService;
      };
    };
  }
>(
  "articles/postArticle",
  async (
    articleToPost,
    {
      getState,
      extra: {
        services: { articlesService, emailNotificationService },
      },
    }
  ) => {
    const { notify: _, ...newArticle }: ArticleWithoutId = articleToPost;
    const postedArticle = await articlesService.postArticle(
      newArticle,
      selectToken(getState())
    );
    if (articleToPost.notify) {
      await emailNotificationService.notifySubscribers(
        {
          id: postedArticle.id,
          summary: postedArticle.summary,
          topic: postedArticle.topic,
          title: postedArticle.title,
          timeToRead: postedArticle.timeToRead,
          date: formatDateDDMMYYYY(new Date(postedArticle.date)),
          img: selectFirstImg(postedArticle.content).src,
        },
        selectToken(getState())
      );
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
