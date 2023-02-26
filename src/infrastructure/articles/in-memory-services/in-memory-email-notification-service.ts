import { NotificationInfos } from "../../../core/articles/entities/notification";
import { EmailNotificationService } from "../../../core/articles/port/email-notification-service";

export const buildInMemoryEmailNotificationService = (error?: {
  status: string;
  statusCode: number;
  message: string;
}): EmailNotificationService => ({
  notifySubscribers: async (
    notificationInfos: NotificationInfos,
    token: string
  ) => {
    return !error ? Promise.resolve() : Promise.reject(error);
  },
});
