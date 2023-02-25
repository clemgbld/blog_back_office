import { NotificationInfos } from "../entities/notification";

export type EmailNotificationService = {
  notifySubscribers: (notificationInfos: NotificationInfos) => Promise<void>;
};
