import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClockContext } from "../../../context/ClockContext";
import { createStore } from "../../../../core/store";
import { selectIsLoggedIn } from "../../../../core/auth/selectors/selectors";
import { spy } from "../../../../lib/spy";
import { buildInMemoryServices } from "../../../../infrastructure/common/all-services/all-services-in-memory";
import { inMemoryAuthService } from "../../../../infrastructure/auth/in-memory-services/in-memory-auth-service";
import { createClock } from "../../../../infrastructure/common/create-clock";
import ProtectedRoute from "../../../routing/ProtectedRoute/ProtectedRoute";
import Auth from "../Auth";
import Home from "../../Home/Home";

describe("Auth page", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/auth");
  });

  type renderSutProps = {
    inMemoryAuthService: typeof inMemoryAuthService;
    error?: { message: string; statusCode: number; status: string };
    isHomeNavigationAllowed: boolean;
  };

  const renderSut = ({
    inMemoryAuthService,
    error,
    isHomeNavigationAllowed,
  }: renderSutProps) => {
    const store = createStore({
      services: buildInMemoryServices({
        authService: { inMemoryAuthService, error },
      }),
    });

    const isLoggedIn = selectIsLoggedIn(store.getState());

    const clock = createClock.createNull();

    render(
      <Provider store={store}>
        <ClockContext.Provider value={clock}>
          <BrowserRouter>
            <Routes>
              <Route
                path="auth"
                element={
                  <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/">
                    <>
                      <div id="modal"></div>
                      <Auth />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    isAllowed={isHomeNavigationAllowed}
                    redirectPath="/auth"
                  >
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ClockContext.Provider>
      </Provider>
    );
  };

  it("should authenticate the user and navigate to the home page", async () => {
    const inMemoryAuth = inMemoryAuthService({});

    const spyLogin = spy(inMemoryAuth.login);

    const inMemoryAuthWithAuthWithSpyLogin = () => ({
      login: spyLogin,
    });

    renderSut({
      inMemoryAuthService: inMemoryAuthWithAuthWithSpyLogin,
      isHomeNavigationAllowed: true,
    });

    const emailInput: HTMLInputElement = screen.getByLabelText("Email");
    const passwordInput: HTMLInputElement = screen.getByLabelText("Password");
    const submitButton: HTMLButtonElement = screen.getByRole("button");

    userEvent.type(emailInput, "user@example.com");
    userEvent.type(passwordInput, "password");
    userEvent.click(submitButton);

    expect(emailInput.type).toBe("email");
    expect(emailInput.required).toBe(true);
    expect(passwordInput.type).toBe("password");
    expect(passwordInput.required).toBe(true);

    await waitFor(() => {
      expect(spyLogin.args()).toEqual([
        [{ email: "user@example.com", password: "password" }],
      ]);
    });

    await waitFor(() => {
      expect(screen.getByTestId("home")).toBeInTheDocument();
    });
  });

  it("should alert the user by displaying a notification when there in an auth error", async () => {
    renderSut({
      inMemoryAuthService,
      error: {
        statusCode: 401,
        message: "Something went wrong",
        status: "fail",
      },
      isHomeNavigationAllowed: false,
    });

    const emailInput: HTMLInputElement = screen.getByLabelText("Email");
    const passwordInput: HTMLInputElement = screen.getByLabelText("Password");
    const submitButton: HTMLButtonElement = screen.getByRole("button");

    userEvent.type(emailInput, "user@example.com");
    userEvent.type(passwordInput, "password");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});
