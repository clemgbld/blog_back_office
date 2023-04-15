import { rest, RestRequest } from "msw";
import { setupServer } from "msw/node";
import { BLOG_BASE_URL } from "../../../common/rest-service/constants";
import { buildRestEmailNotificationService } from "../email-notification-service";
import { NOTIFY_ENDPOINT } from "../constants";
import { SUBSCRIPTION_ENDPOINT } from "../../../common/subscription/constants";

let request: RestRequest;

const server = setupServer(
  rest.post(
    `${BLOG_BASE_URL}${SUBSCRIPTION_ENDPOINT}${NOTIFY_ENDPOINT}`,
    (req, res, ctx) => {
      request = req;
      return res(
        ctx.json({
          status: "success",
        })
      );
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

describe("notify all subscribers", () => {
  it("should notify subscribers that a new article has been published and pass the token in the call", async () => {
    const notificationInfos = {
      id: "546",
      summary: "summary",
      topic: "topic",
      title: "new article",
      timeToRead: "7 min read",
      img: "url",
    };

    const token = "FAKE_TOKEN";

    const emailNotificationService = buildRestEmailNotificationService();

    await emailNotificationService.notifySubscribers(notificationInfos, token);
    expect(await request.json()).toEqual(notificationInfos);
    expect(request.method).toBe("POST");
    expect(request.headers.get("authorization")).toEqual("Bearer FAKE_TOKEN");
  });
});
