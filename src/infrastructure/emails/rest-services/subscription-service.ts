import { SubscriptionService } from "../../../core/emails/port/subscription-service";
import { catchAsync } from "../../common/error/catch-async";
import { restService } from "../../common/rest-service/rest-service";
import { BLOG_BASE_URL, METHOD } from "../../common/rest-service/constants";
import { SUBSCRIPTION_ENDPOINT } from "../../common/subscription/constants";
import { DELETE_ENDPOINT } from "./constants";

export const buildRestSubscriptionService = (): SubscriptionService => ({
  getAllEmails: catchAsync(async (token: string) => {
    const res = await restService({
      url: `${BLOG_BASE_URL}${SUBSCRIPTION_ENDPOINT}`,
      method: METHOD.GET,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }),
  removeSubscriberEmail: catchAsync(async (id: string, token: string) =>
    restService({
      url: `${BLOG_BASE_URL}${SUBSCRIPTION_ENDPOINT}${DELETE_ENDPOINT}/${id}`,
      method: METHOD.DELETE,
      headers: { Authorization: `Bearer ${token}` },
    })
  ),
});
