import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Article, ArticleWithoutTimeToRead } from "../entities/article";
import { ArticlesService } from "../port/aticles-service";
import { EmailNotificationService } from "../port/email-notification-service";
import { selectToken } from "../../auth/selectors/selectors";
import { STATUS } from "../../utils/status-constants";
import { selectFirstImg } from "../selectors/select-first-img/select-first-img";
import { formatDateDDMMYYYY } from "../../utils/date/format-date";

export const updateArticle = createAsyncThunk<
  Article,
  ArticleWithoutTimeToRead,
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
  "articles/updateArticle",
  async (
    updatedArticle,
    {
      getState,
      extra: {
        services: { articlesService, emailNotificationService },
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
      emailNotificationService.notifySubscribers(
        {
          id: newArticle.id,
          summary: newArticle.summary,
          topic: newArticle.topic,
          title: newArticle.title,
          img: selectFirstImg(newArticle.content).src,
          date: formatDateDDMMYYYY(new Date(newArticle.date)),
          timeToRead: newArticle.timeToRead,
        },
        selectToken(getState())
      );
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
