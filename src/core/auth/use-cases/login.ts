import { createAsyncThunk } from "@reduxjs/toolkit";
import { InMemoryAuthService } from "../infrastructure/in-memory-services/in-memory-auth-service";

type Credentials = {
  token: string;
};

export const login = createAsyncThunk<
  Credentials,
  void,
  { extra: { services: { authService: InMemoryAuthService } } }
>(
  "auth/login",
  async (
    _,
    {
      extra: {
        services: { authService },
      },
    }
  ) => authService.login()
);
