import {
  rest,
  RestRequest,
  ResponseComposition,
  DefaultBodyType,
  RestContext,
} from "msw";
import { setupServer } from "msw/node";
import { fakeArticle1, fakeArticle2 } from "../../../../fixtures/articles";
import { buildRestArticlesService } from "../articles-service";
import { BLOG_BASE_URL } from "../../../common/rest-service/constants";
import { ARTICLES_ENDPOINT, DELETE_ENDPOINT } from "../constants";

let request: RestRequest;

const token = "FAKE_TOKEN";

const FAKE_ID = "FAKE_ID";

const server = setupServer(
  rest.get(`${BLOG_BASE_URL}${ARTICLES_ENDPOINT}`, (req, res, ctx) => {
    request = req;

    return res(
      ctx.json({
        status: "success",
        results: 2,
        data: [fakeArticle1, fakeArticle2],
      })
    );
  }),
  rest.delete(
    `${BLOG_BASE_URL}${ARTICLES_ENDPOINT}${DELETE_ENDPOINT}/${FAKE_ID}`,
    (req, res, ctx) => {
      request = req;
      return res(ctx.status(204));
    }
  ),
  rest.patch(`${BLOG_BASE_URL}${ARTICLES_ENDPOINT}`, (req, res, ctx) => {
    request = req;

    return res(
      ctx.json({
        status: "success",
        data: fakeArticle1,
      })
    );
  }),
  rest.post(`${BLOG_BASE_URL}${ARTICLES_ENDPOINT}`, (req, res, ctx) => {
    request = req;

    return res(
      ctx.json({
        status: "success",
        data: fakeArticle1,
      })
    );
  })
);

type SimulateError = {
  url: string;
  message: string;
  status: number;
  method: "get" | "post" | "patch" | "delete" | "put";
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
      const articlesService = buildRestArticlesService();
      const articles = await articlesService.getArticles(token);
      expect(articles).toEqual([fakeArticle1, fakeArticle2]);
      expect(request.headers.get("authorization")).toEqual("Bearer FAKE_TOKEN");
    });

    it("should throw the correct error when the get operation fails", async () => {
      simulateError({
        url: `${BLOG_BASE_URL}${ARTICLES_ENDPOINT}`,
        status: 400,
        message: "Something went wrong!",
        method: "get",
      });

      const articlesService = buildRestArticlesService();
      await expect(
        async () => await articlesService.getArticles(token)
      ).rejects.toThrowError("Something went wrong!");
    });
  });

  describe("delete articles", () => {
    it("should delete an article and pass the token in the call", async () => {
      const articlesService = buildRestArticlesService();
      const id = await articlesService.deleteArticle(FAKE_ID, token);
      expect(request.method).toBe("DELETE");
      expect(request.headers.get("authorization")).toEqual("Bearer FAKE_TOKEN");
      expect(id).toBe(FAKE_ID);
    });

    it("should throw an error when the delete operation fails", async () => {
      simulateError({
        url: `${BLOG_BASE_URL}${ARTICLES_ENDPOINT}${DELETE_ENDPOINT}/${FAKE_ID}`,
        status: 401,
        message: "You are not logged in!",
        method: "delete",
      });

      const articlesService = buildRestArticlesService();
      await expect(async () =>
        articlesService.deleteArticle(FAKE_ID, token)
      ).rejects.toThrowError("You are not logged in!");
    });
  });

  describe("update article", () => {
    it("should update the article and pass the token in the call", async () => {
      const articleWithoutTimeToRead = { ...fakeArticle1 };
      delete articleWithoutTimeToRead.timeToRead;

      const articlesService = buildRestArticlesService();
      const updatedArticle = await articlesService.updateArticle(
        articleWithoutTimeToRead,
        token
      );
      expect(updatedArticle).toEqual(fakeArticle1);

      expect(await request.json()).toEqual(articleWithoutTimeToRead);
      expect(request.headers.get("authorization")).toEqual("Bearer FAKE_TOKEN");
      expect(request.headers.get("content-type")).toEqual("application/json");
      expect(request.headers.get("accept")).toEqual("application/json");
    });
  });

  describe("post article", () => {
    it("should post the articles and pass the token in the call", async () => {
      const articleToPost = { ...fakeArticle1 };
      delete articleToPost.timeToRead;
      delete articleToPost.id;
      delete articleToPost.date;
      const articlesService = buildRestArticlesService();
      const articlePosted = await articlesService.postArticle(
        articleToPost,
        token
      );

      expect(articlePosted).toEqual(fakeArticle1);
      expect(await request.json()).toEqual(articleToPost);
      expect(request.method).toBe("POST");
      expect(request.headers.get("authorization")).toEqual("Bearer FAKE_TOKEN");
    });
  });
});
