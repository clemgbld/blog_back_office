import { sutBuilder } from "../test-helper/sut-builder";
import { articleBuilder } from "../builder/article-builder";

describe("Toggle hide status", () => {
  it("should toggle hide status to false", async () => {
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

    const { toggleHideStatusAsync } = sutBuilder({ preloadedState }).build();

    const { expectedArticles } = await toggleHideStatusAsync("1");

    expect(expectedArticles).toEqual([
      articleBuilder({ hide: true, timeToRead: "7 min read" }),
    ]);
  });

  it("should toggle hide status to true", async () => {
    const preloadedState = {
      articles: {
        isArticlesRetrieved: true,
        status: "idle",
        data: {
          ids: ["1"],
          entities: {
            1: articleBuilder({ hide: false }),
          },
        },
      },
    };

    const { toggleHideStatusAsync } = sutBuilder({ preloadedState }).build();

    const { expectedArticles } = await toggleHideStatusAsync("1");

    expect(expectedArticles).toEqual([
      articleBuilder({ hide: true, timeToRead: "7 min read" }),
    ]);
  });
});
