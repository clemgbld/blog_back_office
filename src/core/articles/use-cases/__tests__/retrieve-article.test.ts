import { articleBuilder } from "../builder/article-builder";
import { sutBuilder } from "../test-helper/sut-builder";

describe("Retrieve articles", () => {
  it("should have no articles initially", () => {
    const { status, expectedArticles, isArticlesRetrieved } = sutBuilder(
      {}
    ).build();

    expect(status).toBe("idle");
    expect(isArticlesRetrieved).toBe(false);
    expect(expectedArticles).toEqual([]);
  });

  it("informs the user when the the articles are loading", async () => {
    const { retrieveArticles } = sutBuilder({
      existingArticles: [articleBuilder()],
    }).build();

    const { status } = retrieveArticles();

    expect(status).toBe("pending");
  });

  it("retrieves articles", async () => {
    const { retrieveArticlesAsync } = sutBuilder({
      existingArticles: [articleBuilder()],
    }).build();

    const { status, expectedArticles, isArticlesRetrieved } =
      await retrieveArticlesAsync();

    expect(expectedArticles).toEqual([
      {
        id: "1",
        title: "article 1",
        date: 166480348787489,
        lightMode: true,
        timeToRead: "2 min read",
        content: [
          {
            type: "paragraph",
            children: [{ text: "A first line of text." }],
          },
          {
            type: "paragraph",
            children: [{ text: "A second line of text." }],
          },
        ],
      },
    ]);

    expect(status).toBe("success");
    expect(isArticlesRetrieved).toBe(true);
  });

  it("should infors the user when the articles retrieving failed", async () => {
    const { retrieveArticlesAsync } = sutBuilder({
      existingArticles: [],
      error: {
        statusCode: 400,
        message: "something went wrong",
        status: "fail",
      },
    }).build();

    const { expectedErrorMsg, status } = await retrieveArticlesAsync();

    expect(status).toBe("rejected");

    expect(expectedErrorMsg).toBe("something went wrong");
  });
});
