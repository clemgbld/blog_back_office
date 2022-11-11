import { createAsyncThunk } from "@reduxjs/toolkit";
import { StorageService } from "../../infastructure/storage-service";

export const logout = createAsyncThunk<
  void,
  void,
  {
    extra: {
      services: {
        storageService: StorageService;
      };
    };
  }
>(
  "auth/logout",
  async (
    _,
    {
      extra: {
        services: { storageService },
      },
    }
  ) => {
    storageService.removeItem("blog-admin-token");
    storageService.removeItem("blog-admin-token-expiration-time");
  }
);
