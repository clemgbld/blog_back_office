import { NotificationInfos } from "../entities/notification";

export type EmailNotificationService = {
  notifySubscribers: (
    notificationInfos: NotificationInfos,
    token: string
  ) => Promise<void>;
};
