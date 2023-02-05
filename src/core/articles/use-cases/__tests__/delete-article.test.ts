import { sutBuilder } from "../test-helper/sut-builder";
import { articleBuilder } from "../builder/article-builder";
import { STATUS } from "../../../utils/status-constants";

describe("Delete Article", () => {
  const preloadedState = {
    articles: {
      isArticlesRetrieved: true,
      status: "idle",
      data: {
        ids: ["1"],
        entities: {
          1: articleBuilder({}),
        },
      },
    },
  };

  it("should delete an article", async () => {
    const { deleteArticleAsync } = sutBuilder({ preloadedState }).build();

    const { expectedArticles, status } = await deleteArticleAsync("1");

    expect(expectedArticles).toEqual([]);
    expect(status).toBe("success");
  });

  it("should informs the user when the delete operation is loading", () => {
    const { deleteArticle } = sutBuilder({ preloadedState }).build();

    const { status } = deleteArticle("1");

    expect(status).toBe("pending");
  });

  it("should informs the user when the delete operation failed", async () => {
    const { deleteArticleAsync } = sutBuilder({
      preloadedState,
      error: {
        statusCode: 400,
        message: "Something went wrong",
        status: "fail",
      },
    }).build();

    const { expectedErrorMsg, status } = await deleteArticleAsync("1");

    expect(status).toBe("rejected");

    expect(expectedErrorMsg).toBe("Something went wrong");
  });

  it("should not start a delete operation when one is already loading", async () => {
    const preloadedState = {
      articles: {
        isArticlesRetrieved: true,
        status: STATUS.PENDING,
        data: {
          ids: [],
          entities: {},
        },
      },
    };
    const { deleteArticleAsync, deleteArticleSpy } = sutBuilder({
      preloadedState,
    }).build();

    await deleteArticleAsync("1");

    expect(deleteArticleSpy.hasBeenCalled()).toBe(false);
  });
});
