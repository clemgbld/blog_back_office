import { createStore } from "../../store";
import { fetchArticles } from "../use-cases/fecthArticles";
import { allArticles, articlesStatus,articlesError } from "../selectors/selectors";
import { inMemoryArticlesService } from "../infrastructure/in-memory/retrieveInMemoryArticles";
import { articleBuilder } from "../use-cases/builder/articleBuilder";

describe("Retrieve articles", () => {
  it("should have no articles initially", () => {
    const store = createStore({
      articlesService: inMemoryArticlesService([]),
    });
    const articles = allArticles(store);
    const status = articlesStatus(store);
    expect(status).toBe("idle");
    expect(articles).toEqual([]);
  });

  it("informs the user when the the articles are loading", () => {
    const articles = [articleBuilder()];

    const store = createStore({
      articlesService: inMemoryArticlesService(articles),
    });

    store.dispatch(fetchArticles());

    const status = articlesStatus(store);

    expect(status).toBe("pending");
  });

  it("retrieves articles", async () => {
    const articles = [articleBuilder()];

    const store = createStore({
      articlesService: inMemoryArticlesService(articles),
    });

    await store.dispatch(fetchArticles());

    const actualArticles = allArticles(store);
    const status = articlesStatus(store);

    expect(actualArticles).toEqual([
      {
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
    ]);
    expect(status).toBe("success");
  });

  it('should infors the user when the articles retrieving failed', async () => {
    const store = createStore({
      articlesService: inMemoryArticlesService([],{status:400,message:'something went wrong'}),
    });

    await store.dispatch(fetchArticles());

    const error = articlesError(store)
    const status = articlesStatus(store);

    expect(status).toBe('rejected')
    
    expect(error).toBe('something went wrong')
  });
});
