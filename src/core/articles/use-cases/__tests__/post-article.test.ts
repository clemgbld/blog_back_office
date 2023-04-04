import { contentBuilder } from "../builder/article-builder";
import { sutBuilder } from "../test-helper/sut-builder";
import { STATUS } from "../../../utils/status-constants";

describe("Post Article", () => {
  const articleToPost = {
    title: "new article",
    notify: false,
    lightMode: true,
    content: [contentBuilder({ children: [{ text: "new article posted." }] })],
  };

  const articleToPostWithImage = {
    title: "new article",
    summary: "summary",
    topic: "topic",
    notify: true,
    lightMode: true,
    content: [
      contentBuilder({
        children: [{ text: "new article posted." }],
      }),
      { type: "img", url: "url" },
    ],
  };

  it("should post an article an add it to the list of articles", async () => {
    const { postArticleAsync, notifiySubscribersSpy } = sutBuilder({}).build();

    const { status, expectedArticles } = await postArticleAsync(articleToPost);

    expect(status).toBe("success");
    expect(expectedArticles).toEqual([
      {
        id: "546",
        title: "new article",
        date: 123456,
        lightMode: true,

        timeToRead: "7 min read",
        content: [
          {
            type: "paragraph",
            children: [{ text: "new article posted." }],
          },
        ],
      },
    ]);
    expect(notifiySubscribersSpy.hasBeenCalled()).toBeFalsy();
  });

  it("should send an notification email with the correct new article infos", async () => {
    const { postArticleAsync, notifiySubscribersSpy } = sutBuilder({}).build();

    await postArticleAsync(articleToPostWithImage);
    expect(notifiySubscribersSpy.hasBeenCalled()).toBeTruthy();

    expect(notifiySubscribersSpy.args()).toEqual([
      [
        {
          id: "546",
          summary: "summary",
          topic: "topic",
          title: "new article",
          timeToRead: "7 min read",
          img: "url",
        },
        "fake-token",
      ],
    ]);
  });

  it("should informs the user that the posting opertaion is loading", () => {
    const { postArticle } = sutBuilder({}).build();

    const { status } = postArticle(articleToPost);

    expect(status).toBe("pending");
  });

  it("should informs the user when the posting operation failed", async () => {
    const { postArticleAsync } = sutBuilder({
      error: {
        statusCode: 400,
        message: "something went wrong",
        status: "fail",
      },
    }).build();

    const { status, expectedErrorMsg } = await postArticleAsync(articleToPost);

    expect(status).toBe("rejected");

    expect(expectedErrorMsg).toBe("something went wrong");
  });

  it("should informs the user when notification subscribtion goes wrong", async () => {
    const { postArticleAsync } = sutBuilder({
      errorNotification: {
        statusCode: 400,
        message: "notification went wrong",
        status: "fail",
      },
    }).build();
    const { status, expectedErrorMsg } = await postArticleAsync(
      articleToPostWithImage
    );

    expect(status).toBe("rejected");

    expect(expectedErrorMsg).toBe("notification went wrong");
  });

  it("should not excute a post article operation when one operation is already loading", async () => {
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

    const { postArticleAsync, postArticleSpy } = sutBuilder({
      preloadedState,
    }).build();

    await postArticleAsync(articleToPost);

    expect(postArticleSpy.hasBeenCalled()).toBe(false);
  });
});
