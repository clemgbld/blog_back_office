import { createAsyncThunk } from "@reduxjs/toolkit";
import { InMemoryAuthService } from "../infrastructure/in-memory-services/in-memory-auth-service";
import { StorageService } from "../../infastructure/storage-service";
import { Clock } from "../../infastructure/create-clock";
import { Credentials, User } from "../entities/auth";

export const login = createAsyncThunk<
  Credentials,
  User,
  {
    extra: {
      services: {
        authService: InMemoryAuthService;
        storageService: StorageService;
        clockService: Clock;
      };
    };
  }
>(
  "auth/login",
  async (
    userInfos,
    {
      extra: {
        services: { authService, storageService, clockService },
      },
    }
  ) => {
    const { token, expirationDate } = await authService.login(userInfos);
    storageService.stockItem("blog-admin-token", token);
    storageService.stockItem(
      "blog-admin-token-expiration-time",
      `${expirationDate + clockService.now()}`
    );
    return { token };
  }
);
