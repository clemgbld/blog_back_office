import { createStore } from "../../store";
import { fetchArticles } from "../actions/fecthArticles";

describe("Retrieve articles", () => {
  it("should have no articles initially", () => {
    const store = createStore();
    const articles = store.getState().articles.data;
    const status = store.getState().articles.status;
    expect(status).toBe("idle");
    expect(articles).toEqual({ entities: {}, ids: [] });
  });

  it("retrieves articles", async () => {
    const element1: Record<string, string | Record<string, string>[]> = {
      type: "paragraph",
      children: [{ text: "A first line of text." }],
    };
    const element2: Record<string, string | Record<string, string>[]> = {
      type: "paragraph",
      children: [{ text: "A second line of text." }],
    };

    const article = {
      id: "1",
      title: "article 1",
      date: 166480348787489,
      content: [element1, element2],
    };

    const articles = [article];

    const retrieveArticles = async () =>
      store.dispatch(fetchArticles(articles));

    const store = createStore();

    await retrieveArticles();

    const actualArticles = store.getState().articles.data;
    const status = store.getState().articles.status;

    expect(actualArticles).toEqual({
      ids: ["1"],
      entities: {
        1: {
          id: "1",
          title: "article 1",
          date: 166480348787489,
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
      },
    });
    expect(status).toBe("success");
  });
});
