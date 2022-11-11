import {
  createStorageService,
  inMemoryStorage,
  StorageService,
} from "../storage-service";
import { inMemoryArticlesService } from "../../articles/infrastructure/in-memory-services/InMemoryArticlesService";
import { inMemoryAuthService } from "../../auth/infrastructure/in-memory-services/in-memory-auth-service";
import { createClock, Clock } from "../create-clock";
import { Article } from "../../articles/entities/article";

type BuildInMemoryServices = {
  storageService?: StorageService;
  articlesService?: {
    articles: Article[];
    error?: { status: number; message: string };
  };
  authService?: { error?: { status: number; message: string } };
  clockService?: Clock;
};

export const buildInMemoryServices = ({
  storageService = createStorageService(inMemoryStorage()),
  articlesService = { articles: [], error: undefined },
  clockService = createClock.createNull(),
  authService = { error: undefined },
}: BuildInMemoryServices) => ({
  articlesService: inMemoryArticlesService(
    articlesService.articles,
    articlesService.error
  ),
  authService: inMemoryAuthService(authService),
  storageService,
  clockService,
});
