import { Email } from "../entities/email";

export type SubscriptionService = {
  getAllEmails: () => Promise<Email[]>;
};
