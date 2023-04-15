import { NotificationInfos } from "../../../core/articles/entities/notification";
import { EmailNotificationService } from "../../../core/articles/port/email-notification-service";
import { BLOG_BASE_URL, METHOD } from "../../common/rest-service/constants";
import { restService } from "../../common/rest-service/rest-service";
import { catchAsync } from "../../common/error/catch-async";
import { NOTIFY_ENDPOINT } from "./constants";
import { SUBSCRIPTION_ENDPOINT } from "../../common/subscription/constants";

export const buildRestEmailNotificationService =
  (): EmailNotificationService => ({
    notifySubscribers: catchAsync(
      async (notificationInfos: NotificationInfos, token: string) => {
        await restService({
          method: METHOD.POST,
          url: `${BLOG_BASE_URL}${SUBSCRIPTION_ENDPOINT}${NOTIFY_ENDPOINT}`,
          headers: { Authorization: `Bearer ${token}` },
          body: notificationInfos,
        });
      }
    ),
  });
