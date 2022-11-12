export type Credentials = {
  token: string;
};

export type User = {
  email: string;
  password: string;
};

export type CredentialsFromStorage = {
  token: string | null;
};
