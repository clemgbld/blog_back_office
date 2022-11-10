export const inMemoryAuthService = () => ({
  login: async () => Promise.resolve({ token: "fake-token" }),
});

export type InMemoryAuthService = ReturnType<typeof inMemoryAuthService>;
