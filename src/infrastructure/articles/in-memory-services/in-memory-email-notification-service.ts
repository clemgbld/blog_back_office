import { NotificationInfos } from "../../../core/articles/entities/notification";
import { EmailNotificationService } from "../../../core/articles/port/email-notification-service";

export const buildInMemoryEmailNotificationService =
  (): EmailNotificationService => ({
    notifySubscribers: async (
      notificationInfos: NotificationInfos,
      token: string
    ) => Promise.resolve(),
  });
