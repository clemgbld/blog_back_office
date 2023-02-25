import {
  createStorageService,
  inMemoryStorage,
  StorageService,
} from "../storage-service";
import { inMemoryArticlesService } from "../../articles/in-memory-services/in-memory-articles-service";
import { inMemoryAuthService } from "../../auth/in-memory-services/in-memory-auth-service";
import { createClock, Clock } from "../create-clock";
import { Article } from "../../../core/articles/entities/article";
import { buildInMemoryEmailNotificationService } from "../../articles/in-memory-services/in-memory-email-notification-service";

type BuildInMemoryServices = {
  emailNotificationService?: ReturnType<
    typeof buildInMemoryEmailNotificationService
  >;
  storageService?: StorageService;
  articlesService?: {
    articles: Article[];
    error?: { statusCode: number; message: string; status: string };
    buildInMemoryArticlesService?: typeof inMemoryArticlesService;
  };
  authService?: {
    error?: { statusCode: number; message: string; status: string };
    inMemoryAuthService: typeof inMemoryAuthService;
  };
  clockService?: Clock;
};

export const buildInMemoryServices = ({
  emailNotificationService = buildInMemoryEmailNotificationService(),
  storageService = createStorageService(inMemoryStorage()),
  articlesService = {
    articles: [],
    error: undefined,
    buildInMemoryArticlesService: inMemoryArticlesService,
  },
  clockService = createClock.createNull(),
  authService = { error: undefined, inMemoryAuthService },
}: BuildInMemoryServices) => ({
  emailNotificationService: emailNotificationService
    ? emailNotificationService
    : buildInMemoryEmailNotificationService(),
  articlesService: articlesService.buildInMemoryArticlesService
    ? articlesService.buildInMemoryArticlesService(
        articlesService.articles,
        articlesService.error
      )
    : inMemoryArticlesService(articlesService.articles, articlesService.error),
  authService: authService.inMemoryAuthService({ error: authService.error }),
  storageService,
  clockService,
});
