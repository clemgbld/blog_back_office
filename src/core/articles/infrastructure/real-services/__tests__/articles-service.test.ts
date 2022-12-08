import { rest } from "msw";
import { setupServer } from "msw/node";
import { fakeArticle1, fakeArticle2 } from "../../../../../fixtures/articles";

const server = setupServer(
  rest.get(
    "https://backend-blog-peni.onrender.com/api/v1/articles",
    (req, res, ctx) => {
      return res(
        ctx.json({
          status: "success",
          results: 2,
          data: [fakeArticle1, fakeArticle2],
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

describe("articles service", () => {
  it("should get all articles and pass the token in the call", async () => {});
});
