import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../../../../core/store";
import { inMemoryArticlesService } from "../../../../core/articles/infrastructure/in-memory-services/InMemoryArticlesService";
import {
  fakeArticle1,
  fakeArticle2,
} from "../../../articles/fixtures/articles";
import Home from "../Home";
import { Article } from "../../../../core/articles/entities/article";

describe("Home", () => {
  const renderHome = (articles: Article[]) => {
    const store = createStore({
      services: {
        articlesService: inMemoryArticlesService(articles),
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  };

  it("should sucessfully fecth articles", async () => {
    renderHome([fakeArticle1, fakeArticle2]);

    await screen.findByText(
      "React Performance: How to avoid redundant re-renders"
    );

    expect(
      screen.getByText(
        "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("7 min read")).toBeInTheDocument();

    expect(screen.getByText("17/10/2022")).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();

    const imgEl: any = screen.getByAltText("caption 1");

    expect(imgEl.src).toBe(
      "https://isamatov.com/images/react-avoid-redundant-renders/React%20Performance-%20How%20to%20avoid%20redundant%20re-renders.png"
    );
  });

  it("should display a loding indicator while the article fetching operation is loading", async () => {
    renderHome([fakeArticle1, fakeArticle2]);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await screen.findByText(
      "React Performance: How to avoid redundant re-renders"
    );
  });
});
