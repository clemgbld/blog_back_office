import { sutBuilder } from "../test-helper/sut-builder";
import { articleBuilder } from "../builder/article-builder";

describe("Delete Article", () => {
  const preloadedState = {
    articles: {
      isArticlesRetrieved: true,
      status: "idle",
      data: {
        ids: ["1"],
        entities: {
          1: articleBuilder(),
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
      error: { status: 400, message: "Something went wrong" },
    }).build();

    const { expectedErrorMsg, status } = await deleteArticleAsync("1");

    expect(status).toBe("rejected");

    expect(expectedErrorMsg).toBe("Something went wrong");
  });

  it("should put status the status in the erroMessage when the status is 401", async () => {
    const { deleteArticleAsync } = sutBuilder({
      preloadedState,
      error: { status: 401, message: "Something went wrong" },
    }).build();

    const { expectedErrorMsg, status } = await deleteArticleAsync("1");

    expect(status).toBe("rejected");

    expect(expectedErrorMsg).toBe("401:Something went wrong");
  });
});
