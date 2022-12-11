import { rest, RestRequest } from "msw";
import { setupServer } from "msw/node";
import { BLOG_BASE_URL } from "../../../../infastructure/rest-service/constants";
import { buildAuthService } from "../auth-service";

let request: RestRequest;

const token = "FAKE_TOKEN";
const expirationDate = 12345467;

const user = {
  email: "example@example.com",
  password: "password",
};

const server = setupServer(
  rest.post(`${BLOG_BASE_URL}/users/login`, (req, res, ctx) => {
    request = req;
    return res(
      ctx.json({
        status: "success",
        data: {
          token,
          expirationDate,
        },
      })
    );
  })
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

describe("auth service", () => {
  describe("login", () => {
    it("should post the email and password of the user and retrieve a token and an expiration date", async () => {
      const authService = buildAuthService();
      const credentials = await authService.login(user);
      expect(await request.json()).toEqual(user);
      expect(credentials).toEqual({ token, expirationDate });
    });
  });
});
