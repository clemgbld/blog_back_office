import { createAsyncThunk } from "@reduxjs/toolkit";
import { InMemoryAuthService } from "../infrastructure/in-memory-services/in-memory-auth-service";
import { StorageService } from "../../infastructure/storage-service";
import { Clock } from "../../infastructure/create-clock";
type Credentials = {
  token: string;
};

export const login = createAsyncThunk<
  Credentials,
  void,
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
    _,
    {
      extra: {
        services: { authService, storageService, clockService },
      },
    }
  ) => {
    const { token, expirationDate } = await authService.login();
    storageService.stockItem("blog-admin-token", token);
    storageService.stockItem(
      "blog-admin-token-expiration-time",
      `${expirationDate + clockService.now()}`
    );
    return { token };
  }
);
