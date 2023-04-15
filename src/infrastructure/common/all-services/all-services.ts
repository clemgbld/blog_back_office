import { createStorageService } from "../storage-service";
import { createClock } from "../create-clock";
import { buildRestArticlesService } from "../../articles/rest-services/articles-service";
import { buildRestAuthService } from "../../auth/rest-services/rest-auth-service";
import { buildInMemoryServices } from "./all-services-in-memory";
import { buildRestEmailNotificationService } from "../../articles/rest-services/email-notification-service";
import { buildRestSubscriptionService } from "../../emails/rest-services/subscription-service";

export const buildServices = (): ReturnType<typeof buildInMemoryServices> => ({
  storageService: createStorageService(localStorage),
  clockService: createClock.create(),
  authService: buildRestAuthService(),
  articlesService: buildRestArticlesService(),
  emailNotificationService: buildRestEmailNotificationService(),
  subscriptionService: buildRestSubscriptionService(),
});
