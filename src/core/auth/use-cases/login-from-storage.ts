import { createAsyncThunk } from "@reduxjs/toolkit";
import { StorageService } from "../../../infrastructure/common/storage-service";
import { CredentialsFromStorage } from "../entities/auth";
import { Clock } from "../../../infrastructure/common/create-clock";

export const loginFromStorage = createAsyncThunk<
  CredentialsFromStorage,
  void,
  {
    extra: {
      services: {
        storageService: StorageService;
        clockService: Clock;
      };
    };
  }
>(
  "auth/login-from-storage",
  async (
    _,
    {
      extra: {
        services: { storageService, clockService },
      },
    }
  ) => {
    const token = storageService.getItem("blog-admin-token");
    const expirationDate = +storageService.getItem(
      "blog-admin-token-expiration-time"
    );

    if (clockService.now() >= expirationDate) return { token: "" };

    return { token: token || "" };
  }
);
