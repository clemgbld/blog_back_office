import { Email } from "../entities/email";

export type SubscriptionService = {
  getAllEmails: (token: string) => Promise<Email[]>;
};
