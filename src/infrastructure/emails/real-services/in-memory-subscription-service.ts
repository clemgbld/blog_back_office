import { Email } from "../../../core/emails/entities/email";
import { SubscriptionService } from "../../../core/emails/port/subscription-service";
import { ServerBlogError } from "../../common/error/server-blog-error";

export const buildInMemorySubscriptionService = ({
  emails = [],
  error,
}: {
  emails?: Email[];
  error?: ServerBlogError;
}): SubscriptionService => ({
  getAllEmails: (token: string) =>
    error ? Promise.reject(error.message) : Promise.resolve(emails),
});
