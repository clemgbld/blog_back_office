import { Email } from "../../../core/emails/entities/email";
import { SubscriptionService } from "../../../core/emails/port/subscription-service";

export const buildInMemorySubscriptionService = ({
  emails = [],
}: {
  emails?: Email[];
}): SubscriptionService => ({
  getAllEmails: (token: string) => Promise.resolve(emails),
});
