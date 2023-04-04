import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { Article } from "../entities/article";
import { EmailNotificationService } from "../port/email-notification-service";
import { selectToken } from "../../auth/selectors/selectors";
import { selectFirstImg } from "../selectors/select-first-img/select-first-img";

export const notifySubscribers = createAsyncThunk<
  void,
  Article,
  {
    state: RootState;
    extra: {
      services: {
        emailNotificationService: EmailNotificationService;
      };
    };
  }
>(
  "articles/notify-subscribers",
  async (
    article,
    {
      getState,
      extra: {
        services: { emailNotificationService },
      },
    }
  ) => {
    await emailNotificationService.notifySubscribers(
      {
        id: article.id,
        summary: article.summary,
        topic: article.topic,
        title: article.title,
        timeToRead: article.timeToRead,
        img: selectFirstImg(article.content).src,
      },
      selectToken(getState())
    );
  }
);
