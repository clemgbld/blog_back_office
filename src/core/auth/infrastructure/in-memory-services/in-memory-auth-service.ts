const FAKE_TOKEN = "fake-token";
const FAKE_EXPIRATION_DATE = 7776000000;

export const inMemoryAuthService = () => ({
  login: async () =>
    Promise.resolve({
      token: FAKE_TOKEN,
      expirationDate: FAKE_EXPIRATION_DATE,
    }),
});

export type InMemoryAuthService = ReturnType<typeof inMemoryAuthService>;
