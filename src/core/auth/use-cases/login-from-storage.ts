import { createAsyncThunk } from "@reduxjs/toolkit";
import { StorageService } from "../../infastructure/storage-service";
import { CredentialsFromStorage } from "../entities/auth";

export const loginFromStorage = createAsyncThunk<
  CredentialsFromStorage,
  void,
  {
    extra: {
      services: {
        storageService: StorageService;
      };
    };
  }
>(
  "auth/login-from-storage",
  async (
    _,
    {
      extra: {
        services: { storageService },
      },
    }
  ) => {
    const token = storageService.getItem("blog-admin-token");

    return { token };
  }
);
