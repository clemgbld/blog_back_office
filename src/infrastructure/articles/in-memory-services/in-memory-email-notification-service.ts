import { NotificationInfos } from "../../../core/articles/entities/notification";

export const buildInMemoryEmailNotificationService = () => ({
  notifySubscribers: async (notificationInfos: NotificationInfos) =>
    Promise.resolve(),
});
