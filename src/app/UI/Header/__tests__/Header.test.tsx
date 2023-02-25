import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  createStorageService,
  inMemoryStorage,
} from "../../../../infrastructure/common/storage-service";
import { buildInMemoryServices } from "../../../../infrastructure/common/all-services/all-services-in-memory";
import { createStore } from "../../../../core/store";
import Header from "../Header";
import Auth from "../../../pages/Auth/Auth";

beforeEach(() => {
  window.history.pushState({}, "", "/");
});

const setup = () => {
  const existingStorage: Record<string, string> = {
    "blog-admin-token": "fake-token",
    "blog-admin-token-expiration-time": "1668171813577",
  };

  const storageService = createStorageService(inMemoryStorage(existingStorage));

  render(
    <Provider
      store={createStore({
        services: buildInMemoryServices({
          storageService,
        }),
      })}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Header>
                <div>Home</div>
              </Header>
            }
          />

          <Route
            path="create"
            element={
              <Header>
                <div>Create</div>
              </Header>
            }
          />
          <Route path="auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );

  return { storageService };
};

describe("Header", () => {
  it("should be in light mode initially", () => {
    window.history.pushState({}, "", "/create");
    setup();

    expect(screen.getByTestId("light-mode")).toBeInTheDocument();
  });

  it("should be able to switch to dark mode", () => {
    window.history.pushState({}, "", "/create");
    setup();

    const lightModeTriger = screen.getByTestId("light-mode");

    userEvent.click(lightModeTriger);

    expect(screen.queryByTestId("light-mode")).not.toBeInTheDocument();
    expect(screen.getByTestId("dark-mode")).toBeInTheDocument();
  });

  it("should be able to swith to light mode and then reswitch to dark mode", () => {
    window.history.pushState({}, "", "/create");
    setup();

    const lightModeTriger = screen.getByTestId("light-mode");

    userEvent.click(lightModeTriger);

    const darkModeTriger = screen.getByTestId("dark-mode");

    userEvent.click(darkModeTriger);

    expect(screen.queryByTestId("dark-mode")).not.toBeInTheDocument();
    expect(screen.getByTestId("light-mode")).toBeInTheDocument();
  });

  it("should no render theme mode switch", () => {
    setup();

    expect(screen.queryByTestId("dark-mode")).not.toBeInTheDocument();
    expect(screen.queryByTestId("light-mode")).not.toBeInTheDocument();
  });

  it("should redirect the user to the home page when he click on the logo", () => {
    window.history.pushState({}, "", "/create");
    setup();
    const img = screen.getByRole("complementary");
    userEvent.click(img);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should not render the search bar when the app is not in the home page", () => {
    window.history.pushState({}, "", "/create");
    setup();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should go to the create page when we click on the link", () => {
    setup();
    userEvent.click(screen.getByText("Create an article"));
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("should not render the link in another page than the home", () => {
    window.history.pushState({}, "", "/create");
    setup();
    expect(screen.queryByText("Create an article")).not.toBeInTheDocument();
  });

  it("should be a able to logout the user", async () => {
    const { storageService } = setup();
    userEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("auth")).toBeInTheDocument();
    });

    expect(storageService.getItem("blog-admin-token")).toBe(undefined);
    expect(storageService.getItem("blog-admin-token-expiration-time")).toBe(
      undefined
    );
  });
});
