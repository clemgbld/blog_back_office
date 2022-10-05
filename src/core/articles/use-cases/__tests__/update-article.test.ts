import { sutBuilder } from "../test-helper/sut-builder";
import { articleBuilder, contentBuilder } from "../builder/articleBuilder";

describe("Update Article", () => {
  const preloadedState = {
    articles: {
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
    expect(expectedArticles).toEqual([updatedArticle]);
  });

  it("should inform the user that the updating operation is loading", () => {
    const { updateArticle } = sutBuilder({ preloadedState }).build();

    const { status } = updateArticle(updatedArticle);

    expect(status).toBe("pending");
  });

  it("should be able to inform the user when an error occur in the updating operation", async () => {
    const { updateArticleAsync } = sutBuilder({
      preloadedState,
      error: { status: 400, message: "Something went wrong" },
    }).build();

    const { expectedErrorMsg } = await updateArticleAsync(updatedArticle);

    expect(expectedErrorMsg).toBe("Something went wrong");
  });
});
