import { articleBuilder, contentBuilder } from "../builder/articleBuilder";
import { sutBuilder } from "../test-helper/sut-builder";

describe("Post Article", () => {
  const articleToPost = articleBuilder({
    id: "2",
    title: "new article",
    date: 166480348787490,
    content: [contentBuilder({ children: [{ text: "new article posted." }] })],
  });

  it("should post an article an add it to the list of articles", async () => {
    const { postArticleAsync } = sutBuilder([]).build();

    const { status, expectedArticles } = await postArticleAsync(articleToPost);

    expect(status).toBe("success");
    expect(expectedArticles).toEqual([
      {
        id: "2",
        title: "new article",
        date: 166480348787490,
        content: [
          {
            type: "paragraph",
            children: [{ text: "new article posted." }],
          },
        ],
      },
    ]);
  });

  it("should informs the user that the posting opertaion is loading", () => {
    const { postArticle } = sutBuilder([]).build();

    const { status } = postArticle(articleToPost);

    expect(status).toBe("pending");
  });
});
