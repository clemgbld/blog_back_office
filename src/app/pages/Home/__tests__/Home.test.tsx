import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../../../../core/store";
import { inMemoryArticlesService } from "../../../../core/articles/infrastructure/in-memory-services/InMemoryArticlesService";
import {
  fakeArticle1,
  fakeArticle2,
} from "../../../articles/fixtures/articles";
import Home from "../Home";

describe("Home", () => {
  it("should sucessfully fecth articles", () => {
    const store = createStore({
      services: {
        articlesService: inMemoryArticlesService([fakeArticle1, fakeArticle2]),
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
});
