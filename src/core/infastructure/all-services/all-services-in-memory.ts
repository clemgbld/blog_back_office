import {
  createStorageService,
  inMemoryStorage,
  StorageService,
} from "../storage-service";
import { inMemoryArticlesService } from "../../articles/infrastructure/in-memory-services/InMemoryArticlesService";
import { inMemoryAuthService } from "../../auth/infrastructure/in-memory-services/in-memory-auth-service";
import { Article } from "../../articles/entities/article";

type BuildInMemoryServices = {
  storageService?: StorageService;
  articlesService?: {
    articles: Article[];
    error?: { status: number; message: string };
  };
};

export const buildInMemoryServices = ({
  storageService = createStorageService(inMemoryStorage()),
  articlesService = { articles: [], error: undefined },
}: BuildInMemoryServices) => ({
  articlesService: inMemoryArticlesService(
    articlesService.articles,
    articlesService.error
  ),
  authService: inMemoryAuthService(),
  storageService,
});
