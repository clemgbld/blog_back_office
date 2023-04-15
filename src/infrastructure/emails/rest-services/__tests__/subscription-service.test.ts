import { rest, RestRequest } from "msw";
import { setupServer } from "msw/node";
import { BLOG_BASE_URL } from "../../../common/rest-service/constants";
import { SUBSCRIPTION_ENDPOINT } from "../../../common/subscription/constants";
import { buildRestSubscriptionService } from "../subscription-service";

let request: RestRequest;

const FAKE_ID = "FAKE_ID";

const TOKEN = "FAKE_TOKEN";

const fakeSubscriberEmail = {
  id: "1",
  email: "exemple@example.com",
};

const server = setupServer(
  rest.get(`${BLOG_BASE_URL}${SUBSCRIPTION_ENDPOINT}`, (req, res, ctx) => {
    request = req;

    return res(
      ctx.json({
        status: "success",
        statusCode: 200,
        data: [fakeSubscriberEmail],
      })
    );
  }),
  rest.delete(
    `${BLOG_BASE_URL}${SUBSCRIPTION_ENDPOINT}/delete/${FAKE_ID}`,
    (req, res, ctx) => {
      request = req;
      return res(ctx.status(204));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("subscription service", () => {
  it("should get all articles and pass the token in the call", async () => {
    const subscriptionService = buildRestSubscriptionService();
    const emails = await subscriptionService.getAllEmails(TOKEN);
    expect(emails).toEqual([fakeSubscriberEmail]);
    expect(request.headers.get("authorization")).toEqual("Bearer FAKE_TOKEN");
  });

  it("should delete the expected subscriber email and pass the token in the call", async () => {
    const subscriptionService = buildRestSubscriptionService();
    await subscriptionService.removeSubscriberEmail(FAKE_ID, TOKEN);
    expect(request.method).toBe("DELETE");
    expect(request.headers.get("authorization")).toEqual("Bearer FAKE_TOKEN");
  });
});
