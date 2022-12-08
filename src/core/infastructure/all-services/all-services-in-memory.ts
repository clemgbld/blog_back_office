import {
  createStorageService,
  inMemoryStorage,
  StorageService,
} from "../storage-service";
import { inMemoryArticlesService } from "../../articles/infrastructure/in-memory-services/in-memory-articles-service";
import { inMemoryAuthService } from "../../auth/infrastructure/in-memory-services/in-memory-auth-service";
import { createClock, Clock } from "../create-clock";
import { Article } from "../../articles/entities/article";

type BuildInMemoryServices = {
  storageService?: StorageService;
  articlesService?: {
    articles: Article[];
    error?: { statusCode: number; message: string; status: string };
  };
  authService?: {
    error?: { statusCode: number; message: string; status: string };
    inMemoryAuthService: typeof inMemoryAuthService;
  };
  clockService?: Clock;
};

export const buildInMemoryServices = ({
  storageService = createStorageService(inMemoryStorage()),
  articlesService = { articles: [], error: undefined },
  clockService = createClock.createNull(),
  authService = { error: undefined, inMemoryAuthService },
}: BuildInMemoryServices) => ({
  articlesService: inMemoryArticlesService(
    articlesService.articles,
    articlesService.error
  ),
  authService: authService.inMemoryAuthService({ error: authService.error }),
  storageService,
  clockService,
});
