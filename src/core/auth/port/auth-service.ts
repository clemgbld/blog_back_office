import { User, AuthCredentials } from "../entities/auth";

export type AuthService = {
  login: (user: User) => Promise<AuthCredentials>;
};
