import { rest, RestRequest } from "msw";
import { setupServer } from "msw/node";
import { fakeArticle1, fakeArticle2 } from "../../../../../fixtures/articles";
import { buildArticlesService } from "../articles-service";

let request: RestRequest;

const token = "FAKE_TOKEN";

const FAKE_ID = "FAKE_ID";

const server = setupServer(
  rest.get(
    "https://backend-blog-peni.onrender.com/api/v1/articles",
    (req, res, ctx) => {
      request = req;

      return res(
        ctx.json({
          status: "success",
          results: 2,
          data: [fakeArticle1, fakeArticle2],
        })
      );
    }
  ),
  rest.delete(
    "https://backend-blog-peni.onrender.com/api/v1/articles/FAKE_ID",
    (req, res, ctx) => {
      request = req;
      return res(
        ctx.status(204),
        ctx.json({
          status: "success",

          data: null,
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
  describe("get articles", () => {
    it("should get all articles and pass the token in the call", async () => {
      const articlesService = buildArticlesService();
      const articles = await articlesService.getArticles(token);
      expect(articles).toEqual([fakeArticle1, fakeArticle2]);
      expect(request.headers.get("authorization")).toEqual("Bearer FAKE_TOKEN");
    });

    it("should throw the correct error when the get operation fails", async () => {
      server.use(
        rest.get(
          "https://backend-blog-peni.onrender.com/api/v1/articles",
          (req, res, ctx) => {
            return res(
              ctx.status(400),
              ctx.json({
                status: "fail",
                message: "Something went wrong!",
                statusCode: 400,
              })
            );
          }
        )
      );

      const articlesService = buildArticlesService();
      await expect(
        async () => await articlesService.getArticles(token)
      ).rejects.toThrowError("Something went wrong!");
    });
  });

  describe("delete articles", () => {
    it("should delete an article and pass the token in the call", async () => {
      const articlesService = buildArticlesService();
      const id = await articlesService.deleteArticle(FAKE_ID, token);
      expect(request.method).toBe("DELETE");
      expect(request.headers.get("authorization")).toEqual("Bearer FAKE_TOKEN");
      expect(id).toBe(FAKE_ID);
    });

    it("should throw an error when the delete operation fails", async () => {
      server.use(
        rest.delete(
          "https://backend-blog-peni.onrender.com/api/v1/articles/FAKE_ID",
          (req, res, ctx) => {
            request = req;
            return res(
              ctx.status(401),
              ctx.json({
                status: "fail",
                statusCode: 401,

                message: "You are not logged in!",
              })
            );
          }
        )
      );

      const articlesService = buildArticlesService();
      await expect(async () =>
        articlesService.deleteArticle(FAKE_ID, token)
      ).rejects.toThrowError("You are not logged in!");
    });
  });
});
