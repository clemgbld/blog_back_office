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
import { Email } from "../../../core/emails/entities/email";
import { buildInMemorySubscriptionService } from "../../emails/real-services/in-memory-subscription-service";
import { ServerBlogError } from "../error/server-blog-error";

type BuildInMemoryServices = {
  emailNotificationService?: ReturnType<
    typeof buildInMemoryEmailNotificationService
  >;
  storageService?: StorageService;
  articlesService?: {
    articles: Article[];
    error?: ServerBlogError;
    buildInMemoryArticlesService?: typeof inMemoryArticlesService;
  };
  subscriptionService?: {
    existingEmails?: Email[];
    getAllEmailsSpy?: () => Promise<Email[]>;
    error?: ServerBlogError;
  };

  authService?: {
    error?: ServerBlogError;
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
  subscriptionService = {
    existingEmails: [],
    error: undefined,
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
  subscriptionService: {
    ...buildInMemorySubscriptionService({
      emails: subscriptionService.existingEmails,
      error: subscriptionService.error,
    }),
    ...(subscriptionService.getAllEmailsSpy && {
      getAllEmails: subscriptionService.getAllEmailsSpy,
    }),
  },
});
