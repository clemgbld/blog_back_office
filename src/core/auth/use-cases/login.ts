import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../..";
import { AuthService } from "../port/auth-service";
import { StorageService } from "../../../infrastructure/common/storage-service";
import { Clock } from "../../../infrastructure/common/create-clock";
import { Credentials, User } from "../entities/auth";
import { STATUS } from "../../utils/status-constants";

export const login = createAsyncThunk<
  Credentials,
  User,
  {
    state: RootState;
    extra: {
      services: {
        authService: AuthService;
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
