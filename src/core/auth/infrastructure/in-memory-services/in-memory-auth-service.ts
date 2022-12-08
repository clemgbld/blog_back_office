import { User } from "../../entities/auth";

const FAKE_TOKEN = "fake-token";
const FAKE_EXPIRATION_DATE = 7776000000;

type Error = {
  statusCode: number;
  message: string;
  status: string;
};

export const inMemoryAuthService = ({ error }: { error?: Error }) => ({
  login: async (_: User) =>
    error
      ? Promise.reject(error)
      : Promise.resolve({
          token: FAKE_TOKEN,
          expirationDate: FAKE_EXPIRATION_DATE,
        }),
});

export type InMemoryAuthService = ReturnType<typeof inMemoryAuthService>;
