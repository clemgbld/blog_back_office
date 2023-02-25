import { NotificationInfos } from "../../../core/articles/entities/notification";

export const buildInMemoryEmailNotificationService = () => ({
  notifySubscribers: (notificationInfos: NotificationInfos) =>
    Promise.resolve(),
});
