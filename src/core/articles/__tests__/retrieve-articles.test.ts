import { createStore } from "../../store";

describe("Retrieve articles", () => {
  it("should have no articles initially", () => {
    const store = createStore();
    const articles = store.getState().articles.data;
    const status = store.getState().articles.status;
    expect(status).toBe("idle");
    expect(articles).toEqual([]);
  });
});
