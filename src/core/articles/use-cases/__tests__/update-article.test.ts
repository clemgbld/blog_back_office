import { sutBuilder } from "../test-helper/sut-builder";
import { articleBuilder, contentBuilder } from "../builder/article-builder";
import { STATUS } from "../../../utils/status-constants";

describe("Update Article", () => {
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

  const updatedArticle = articleBuilder({
    title: "article updated",
    content: [
      contentBuilder({ children: [{ text: "A first line of text updated." }] }),
      contentBuilder({
        children: [{ text: "A second line of text updated." }],
      }),
    ],
  });

  it("should should update an already existing article", async () => {
    const { updateArticleAsync } = sutBuilder({ preloadedState }).build();

    const { expectedArticles, status } = await updateArticleAsync(
      updatedArticle
    );

    expect(status).toBe("success");
    expect(expectedArticles).toEqual([
      { ...updatedArticle, timeToRead: "7 min read" },
    ]);
  });

  it("should inform the user that the updating operation is loading", () => {
    const { updateArticle } = sutBuilder({ preloadedState }).build();

    const { status } = updateArticle(updatedArticle);

    expect(status).toBe("pending");
  });

  it("should be able to inform the user when an error occur in the updating operation", async () => {
    const { updateArticleAsync } = sutBuilder({
      preloadedState,
      error: {
        statusCode: 400,
        message: "Something went wrong",
        status: "fail",
      },
    }).build();

    const { expectedErrorMsg } = await updateArticleAsync(updatedArticle);

    expect(expectedErrorMsg).toBe("Something went wrong");
  });

  it("should not call the delete operation when one is already loading", async () => {
    const preloadedState = {
      articles: {
        isArticlesRetrieved: true,
        status: STATUS.PENDING,
        data: {
          ids: ["1"],
          entities: {
            1: articleBuilder(),
          },
        },
      },
    };

    const { updateArticleAsync, updateArticleSpy } = sutBuilder({
      preloadedState,
    }).build();

    await updateArticleAsync(updatedArticle);

    expect(updateArticleSpy.hasBeenCalled()).toBe(false);
  });
});
