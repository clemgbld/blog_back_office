export type Credentials = {
  token: string;
};

export type User = {
  email: string;
  password: string;
};

export type AuthCredentials = {
  token: string;
  expirationDate: number;
};

export type CredentialsFromStorage = {
  token: string;
};
