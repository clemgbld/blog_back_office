/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createStore } from "../../../../core/store";
import { Provider } from "react-redux";
import ArticleCard from "../ArticleCard";
import { fakeArticle1, fakeArticle2 } from "../../fixtures/articles";
import {
  createClock,
  Clock,
} from "../../../../core/infastructure/create-clock";
import { buildInMemoryServices } from "../../../../core/infastructure/all-services/all-services-in-memory";
import { ClockContext } from "../../../context/ClockContext";

describe("ArticleCard", () => {
  type ArticleCardProps = {
    title: string;
    content: any;
    timeToRead: string;
    summary?: string;
    topic?: string;
    lightMode: boolean;
  };

  let clock: Clock;

  beforeEach(() => {
    clock = createClock.createNull();
  });

  const renderArticleCard = (
    props: ArticleCardProps,
    error: { status: number; message: string } = undefined
  ) => {
    const store = createStore({
      services: buildInMemoryServices({
        articlesService: { articles: [], error },
      }),
    });

    const { container } = render(
      <Provider store={store}>
        <ClockContext.Provider value={clock}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div id="modal"></div>
                    <ArticleCard {...props} id={"1"} date={"17/09/2022"} />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </ClockContext.Provider>
      </Provider>
    );

    return { container };
  };

  it("should not display any topic or summary when there no topic or summary", () => {
    const { title, timeToRead, content } = fakeArticle1;

    const { container } = renderArticleCard({
      title,
      timeToRead,
      content,
      lightMode: true,
    });

    expect(container.children[1].children[1].children.length).toBe(2);
    expect(container.children[1].children[1].children[1].children.length).toBe(
      2
    );
  });

  describe("article modal preview", () => {
    const openModal = () => userEvent.click(screen.getByRole("contentinfo"));

    const closeModalWithClickOn = (dataTestId: string) =>
      userEvent.click(screen.getByTestId(dataTestId));

    const setUpDarkModeModal = () => {
      const { title, timeToRead, content, topic, summary } = fakeArticle2;

      renderArticleCard({
        title,
        timeToRead,
        content,
        topic,
        summary,
        lightMode: false,
      });
    };

    it("should render the content of the article in the modal", () => {
      const { title, timeToRead, content, topic, summary } = fakeArticle1;

      renderArticleCard({
        title,
        timeToRead,
        content,
        topic,
        summary,
        lightMode: true,
      });

      openModal();

      expect(
        screen.getAllByText(
          "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application."
        )[0]
      ).toBeInTheDocument();
    });

    it("should be able to close the modal", () => {
      setUpDarkModeModal();

      openModal();
      closeModalWithClickOn("close-modal");

      expect(screen.queryByText("fake text")).not.toBeInTheDocument();
    });

    it("should be able to close the modal by clicking on the overlay", () => {
      setUpDarkModeModal();
      openModal();
      closeModalWithClickOn("modal-overlay");

      expect(screen.queryByText("fake text")).not.toBeInTheDocument();
    });

    it("should be able to close the modal my hitting the Escape key", () => {
      setUpDarkModeModal();
      openModal();
      userEvent.keyboard("[Escape]");

      expect(screen.queryByText("fake text")).not.toBeInTheDocument();
    });

    it("should not close the modal when the user hit another key than the escape key", () => {
      setUpDarkModeModal();
      openModal();
      userEvent.keyboard("foo");

      expect(screen.getByText("fake text")).toBeInTheDocument();
    });

    it("should not close the modal when the user click on the modal content and not the overlay", () => {
      setUpDarkModeModal();
      openModal();
      closeModalWithClickOn("modal");
      expect(screen.getByText("fake text")).toBeInTheDocument();
    });
  });
});
