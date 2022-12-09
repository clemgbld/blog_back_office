import {
  rest,
  RestRequest,
  ResponseComposition,
  DefaultBodyType,
  RestContext,
} from "msw";
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

type SimulateError = {
  url: string;
  message: string;
  status: number;
  method: string;
};

const simulateError = ({ url, message, status, method }: SimulateError) => {
  server.use(
    rest[method](
      url,
      (
        req: RestRequest,
        res: ResponseComposition<DefaultBodyType>,
        ctx: RestContext
      ) => {
        return res(
          ctx.status(status),
          ctx.json({
            status: "fail",
            message,
            statusCode: status,
          })
        );
      }
    )
  );
};

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
      simulateError({
        url: "https://backend-blog-peni.onrender.com/api/v1/articles",
        status: 400,
        message: "Something went wrong!",
        method: "get",
      });

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
      simulateError({
        url: "https://backend-blog-peni.onrender.com/api/v1/articles/FAKE_ID",
        status: 401,
        message: "You are not logged in!",
        method: "delete",
      });

      const articlesService = buildArticlesService();
      await expect(async () =>
        articlesService.deleteArticle(FAKE_ID, token)
      ).rejects.toThrowError("You are not logged in!");
    });
  });
});
