import { User } from "../../../core/auth/entities/auth";
import { AuthService } from "../../../core/auth/port/auth-service";

const FAKE_TOKEN = "fake-token";
const FAKE_EXPIRATION_DATE = 7776000000;

type Error = {
  statusCode: number;
  message: string;
  status: string;
};

export const inMemoryAuthService = ({
  error,
}: {
  error?: Error;
}): AuthService => ({
  login: async (user: User) =>
    error
      ? Promise.reject(error)
      : Promise.resolve({
          token: FAKE_TOKEN,
          expirationDate: FAKE_EXPIRATION_DATE,
        }),
});
