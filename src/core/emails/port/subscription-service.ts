import { Email } from "../entities/email";

export type SubscriptionService = {
  getAllEmails: (token: string) => Promise<Email[]>;
  removeSubscriberEmail: (id: string, token: string) => Promise<void>;
};
