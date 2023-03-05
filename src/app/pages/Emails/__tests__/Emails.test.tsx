import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClockContext } from "../../../context/ClockContext";
import { createStore } from "../../../../core/store";
import { buildInMemoryServices } from "../../../../infrastructure/common/all-services/all-services-in-memory";
import { Email } from "../../../../core/emails/entities/email";
import Emails from "../Emails";
import {
  createClock,
  Clock,
} from "../../../../infrastructure/common/create-clock";
import { ServerBlogError } from "../../../../infrastructure/common/error/server-blog-error";
import Header from "../../../UI/Header/Header";

let clock: Clock;

beforeEach(() => {
  window.history.pushState({}, "", "/emails");
  clock = createClock.createNull();
});

const existingEmails = [
  { id: "1", email: "foo@example.com" },
  { id: "2", email: "bar@example.com" },
];

const renderEmails = (
  {
    existingEmails,
    preloadedState,
    error,
  }: {
    existingEmails: Email[];
    preloadedState?: any;
    error?: ServerBlogError;
  } = {
    existingEmails: [],
    preloadedState: undefined,
    error: undefined,
  }
) => {
  const store = createStore({
    preloadedState,
    services: buildInMemoryServices({
      subscriptionService: { existingEmails, error },
    }),
  });

  render(
    <Provider store={store}>
      <ClockContext.Provider value={clock}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/emails"
              element={
                <>
                  <div id="modal"></div>
                  <Header>
                    <Emails />
                  </Header>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </ClockContext.Provider>
    </Provider>
  );
};

const fetchEmails = async () => await screen.findByText("foo@example.com");

describe("Emails", () => {
  describe("get emails", () => {
    it("should display a fallback text when there is no articles", async () => {
      renderEmails();
      const fallbackText = await screen.findByText("No emails...");

      expect(fallbackText).toBeInTheDocument();
    });

    it("should sucessfully fetch emails", async () => {
      renderEmails({ existingEmails });

      const email = await fetchEmails();

      expect(email).toBeInTheDocument();
    });
  });
});
