import { createStorageService } from "../storage-service";
import { createClock } from "../create-clock";
import { buildRestArticlesService } from "../../../infrastructure/articles/rest-services/articles-service";
import { buildAuthService } from "../../auth/infrastructure/real-services/auth-service";
import { buildInMemoryServices } from "./all-services-in-memory";

export const buildServices = (): ReturnType<typeof buildInMemoryServices> => ({
  storageService: createStorageService(localStorage),
  clockService: createClock.create(),
  authService: buildAuthService(),
  articlesService: buildRestArticlesService(),
});
