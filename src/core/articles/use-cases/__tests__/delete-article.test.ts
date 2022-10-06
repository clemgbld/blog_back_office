import { sutBuilder } from "../test-helper/sut-builder";
import { articleBuilder } from "../builder/articleBuilder";

describe("Delete Article", () => {
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

  it("should delete an article", async () => {
    const { deleteArticleAsync } = sutBuilder({ preloadedState }).build();

    const { expectedArticles } = await deleteArticleAsync("1");

    expect(expectedArticles).toEqual([]);
  });
});
