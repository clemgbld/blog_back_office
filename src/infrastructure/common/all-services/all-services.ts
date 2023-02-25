import { createStorageService } from "../storage-service";
import { createClock } from "../create-clock";
import { buildRestArticlesService } from "../../articles/rest-services/articles-service";
import { buildRestAuthService } from "../../auth/rest-services/rest-auth-service";
import { buildInMemoryServices } from "./all-services-in-memory";
import { buildInMemoryEmailNotificationService } from "../../articles/in-memory-services/in-memory-email-notification-service";

export const buildServices = (): ReturnType<typeof buildInMemoryServices> => ({
  storageService: createStorageService(localStorage),
  clockService: createClock.create(),
  authService: buildRestAuthService(),
  articlesService: buildRestArticlesService(),
  emailNotificationService: buildInMemoryEmailNotificationService(),
});
