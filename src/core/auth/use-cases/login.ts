import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { InMemoryAuthService } from "../infrastructure/in-memory-services/in-memory-auth-service";
import { StorageService } from "../../infastructure/storage-service";
import { Clock } from "../../infastructure/create-clock";
import { Credentials, User } from "../entities/auth";
import { STATUS } from "../../utils/status-constants";

export const login = createAsyncThunk<
  Credentials,
  User,
  {
    state: RootState;
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
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (auth.status === STATUS.PENDING) {
        return false;
      }
    },
  }
);
