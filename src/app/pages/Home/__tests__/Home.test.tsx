import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClockContext } from "../../../context/ClockContext";
import { createStore } from "../../../../core/store";
import { buildInMemoryServices } from "../../../../core/infastructure/all-services/all-services-in-memory";
import { fakeArticle1, fakeArticle2 } from "../../../../fixtures/articles";
import Home from "../Home";
import Header from "../../../UI/Header/Header";
import { Article } from "../../../../core/articles/entities/article";
import userEvent from "@testing-library/user-event";
import {
  createClock,
  Clock,
} from "../../../../core/infastructure/create-clock";

let clock: Clock;

beforeEach(() => {
  clock = createClock.createNull();
});

describe("Home", () => {
  const renderHome = (
    articles: Article[],
    preloadedState: any = undefined,
    pages: number | undefined = undefined,
    error:
      | { statusCode: number; message: string; status: string }
      | undefined = undefined
  ) => {
    const store = createStore({
      preloadedState,
      services: buildInMemoryServices({ articlesService: { articles, error } }),
    });

    render(
      <Provider store={store}>
        <ClockContext.Provider value={clock}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div id="modal"></div>
                    <Header>
                      <Home articlesPerPages={pages} />
                    </Header>
                  </>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </ClockContext.Provider>
      </Provider>
    );

    return { store };
  };

  const fetchArticles = async () =>
    await screen.findByText(
      "React Performance: How to avoid redundant re-renders"
    );

  it("should display a fallback text when there is no articles", async () => {
    renderHome([]);

    const fallbackText = await screen.findByText("No article yet...");

    expect(fallbackText).toBeInTheDocument();
  });

  describe("get articles", () => {
    it("should sucessfully fecth articles", async () => {
      renderHome([fakeArticle1, fakeArticle2]);

      await fetchArticles();

      expect(
        screen.getByText(
          "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("7 min read")).toBeInTheDocument();

      expect(screen.getByText("17/10/2022")).toBeInTheDocument();

      expect(screen.getByText("React 1")).toBeInTheDocument();

      const imgEl: any = screen.getAllByAltText("")[0];

      expect(imgEl.src).toBe(
        "https://isamatov.com/images/react-avoid-redundant-renders/React%20Performance-%20How%20to%20avoid%20redundant%20re-renders.png"
      );
      expect(screen.queryByText("No article yet...")).not.toBeInTheDocument();
    });

    it("should display a loding indicator while the article fetching operation is loading", async () => {
      renderHome([fakeArticle1, fakeArticle2]);

      expect(screen.getByRole("progressbar")).toBeInTheDocument();

      await fetchArticles();
    });
  });

  const openModal = (action: string) => async () => {
    renderHome([fakeArticle1, fakeArticle2]);

    await fetchArticles();

    const button = screen.getAllByText(action)[0];

    userEvent.click(button);
  };
  describe("article actions", () => {
    describe("delete articles", () => {
      const openDeleteModal = openModal("Delete");

      it("should be able to delete an article", async () => {
        await openDeleteModal();
        expect(
          screen.getByText("Are you sure you want to delete this article ?")
        ).toBeInTheDocument();
        userEvent.click(screen.getByText("validate"));

        await waitFor(() =>
          expect(screen.queryByText("React")).not.toBeInTheDocument()
        );

        expect(screen.queryByText("validate")).not.toBeInTheDocument();
      });

      it("should be able close the modal properly", async () => {
        await openDeleteModal();
        userEvent.click(screen.getByText("cancel"));

        expect(screen.queryByText("cancel")).not.toBeInTheDocument();
        expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
      });
    });
  });

  const openToggleStatusModal = openModal("Hide");

  describe("toggle hide status", () => {
    it("should have 2 buttons Hide", async () => {
      renderHome([fakeArticle1, fakeArticle2]);
      await fetchArticles();
      expect(screen.getAllByText("Hide").length).toBe(2);
    });

    it("should toggle the status to false and display a notification", async () => {
      await openToggleStatusModal();
      userEvent.click(screen.getByText("validate"));

      await waitFor(() => {
        expect(screen.getAllByText("Publish").length).toBe(1);
      });

      expect(screen.getAllByText("Hide").length).toBe(1);
    });
  });

  describe("search functionality", () => {
    it("should filter in only the first article", async () => {
      renderHome([fakeArticle1, fakeArticle2]);

      await fetchArticles();

      userEvent.type(screen.getByRole("textbox"), "React");

      expect(screen.getAllByTestId("article").length).toBe(1);
    });
  });

  describe("hide and publised filter", () => {
    it("should display all tags", async () => {
      renderHome([fakeArticle1, fakeArticle2]);

      await fetchArticles();

      expect(screen.getAllByText("all articles 2").length).toBe(2);
      expect(screen.getByText("published 2")).toBeInTheDocument();
    });

    it("should be able to filter by hidden status", async () => {
      renderHome([fakeArticle1, { ...fakeArticle2, hide: true }]);

      await fetchArticles();

      userEvent.click(screen.getByText("hidden 1"));

      expect(screen.queryAllByTestId("article").length).toBe(1);
    });
  });
  describe("topics filter", () => {
    it("should be able to filter the articles by topics", async () => {
      renderHome([fakeArticle1, fakeArticle2]);

      await fetchArticles();
      userEvent.click(screen.getByText("React 1"));

      expect(screen.queryAllByTestId("article").length).toBe(1);
      expect(screen.getByText("Craftmanship 1")).toBeInTheDocument();
    });

    it("should be able to select multiple topics", async () => {
      renderHome([fakeArticle1, fakeArticle2]);

      await fetchArticles();
      userEvent.click(screen.getByText("React 1"));

      userEvent.click(screen.getAllByText("all articles 2")[0]);

      expect(screen.queryAllByTestId("article").length).toBe(2);
    });
  });

  describe("sort by date", () => {
    it("should sort the articles by ASC", async () => {
      renderHome([fakeArticle1, fakeArticle2]);

      await fetchArticles();

      userEvent.click(screen.getByText("ASC"));
      const firstArticle = screen.getAllByTestId("title")[0];
      expect(firstArticle.textContent).toBe(
        "Reclaiming Responsibility From Best Practices in Software Development"
      );
    });

    it("should sort the articles by DESC", async () => {
      renderHome([fakeArticle1, fakeArticle2]);

      await fetchArticles();

      userEvent.click(screen.getByText("ASC"));
      userEvent.click(screen.getByText("DESC"));
      const firstArticle = screen.getAllByTestId("title")[0];
      expect(firstArticle.textContent).toBe(
        "React Performance: How to avoid redundant re-renders"
      );
    });
  });

  describe("pagination feature", () => {
    it("should be able to go to the next page", async () => {
      renderHome([fakeArticle1, fakeArticle2], undefined, 1);

      await fetchArticles();

      userEvent.click(screen.getByText("2"));

      expect(screen.getAllByTestId("article").length).toBe(1);
    });

    it("should be able to adapt the number of pages withe other filter", async () => {
      renderHome([fakeArticle1, fakeArticle2], undefined, 1);

      await fetchArticles();

      userEvent.click(screen.getByText("React 1"));

      expect(screen.queryByText("2")).not.toBeInTheDocument();
    });

    it("should not paginate articles when there is only only one page", async () => {
      renderHome([fakeArticle1, fakeArticle2]);

      await fetchArticles();

      expect(screen.queryByText("1")).not.toBeInTheDocument();
    });

    it("should automaticly go to the previous page when there is no article due to the other filter", async () => {
      renderHome([fakeArticle1, fakeArticle2], undefined, 1);

      await fetchArticles();

      userEvent.click(screen.getByText("2"));
      userEvent.click(screen.getByText("React 1"));

      expect(screen.getAllByTestId("article").length).toBe(1);
    });
  });

  describe("home page error handling", () => {
    it("should display a notification when articles fething goes wrong", async () => {
      const { store } = renderHome([fakeArticle1, fakeArticle2], undefined, 1, {
        statusCode: 404,
        message: "Something went wrong",
        status: "fail",
      });
      await waitFor(() => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      });

      clock.advanceNullAsync(5000);

      await waitFor(() => {
        expect(
          screen.queryByText("Something went wrong")
        ).not.toBeInTheDocument();
      });

      expect(store.getState().articles.error).toBeUndefined();
    });

    it("should be able to close the notification before that the timer finish", async () => {
      renderHome([fakeArticle1, fakeArticle2], undefined, 1, {
        statusCode: 404,
        message: "Something went wrong",
        status: "fail",
      });

      const closeModalEl = await screen.findByTestId("close notification");

      userEvent.click(closeModalEl);

      await waitFor(() => {
        expect(closeModalEl).not.toBeInTheDocument();
      });
    });
  });
});
