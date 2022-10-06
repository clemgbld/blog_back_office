import { sutBuilder } from "../test-helper/sut-builder";
import { articleBuilder } from "../builder/articleBuilder";

describe("Delete Articles", () => {
  const preloadedState = {
    articles: {
      status: "idle",
      data: {
        ids: ["1", "2", "3"],
        entities: {
          1: articleBuilder(),
          2: articleBuilder({ id: "2" }),
          3: articleBuilder({ id: "3" }),
        },
      },
    },
  };

  it("should delete multiple articles", async () => {
    const { deleteArticlesAsync } = sutBuilder({ preloadedState }).build();

    const { expectedArticles, status } = await deleteArticlesAsync([
      "1",
      "2",
      "3",
    ]);

    expect(expectedArticles).toEqual([]);
    expect(status).toBe("success");
  });

  it("should informs the user when the delete operation is loading", () => {
    const { deleteArticles } = sutBuilder({ preloadedState }).build();

    const { status } = deleteArticles(["1", "2", "3"]);

    expect(status).toBe("pending");
  });

  it("should inform the user when the deleting operation failed", async () => {
    const { deleteArticlesAsync } = sutBuilder({
      preloadedState,
      error: { status: 400, message: "Something went wrong" },
    }).build();

    const { expectedErrorMsg, status } = await deleteArticlesAsync([
      "1",
      "2",
      "3",
    ]);

    expect(expectedErrorMsg).toBe("Something went wrong");
    expect(status).toBe("rejected");
  });
});
