import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createStore } from "../../../../core/store";
import { selectIsLoggedIn } from "../../../../core/auth/selectors/selectors";
import { spy } from "../../../../lib/spy";
import { buildInMemoryServices } from "../../../../core/infastructure/all-services/all-services-in-memory";
import { inMemoryAuthService } from "../../../../core/auth/infrastructure/in-memory-services/in-memory-auth-service";
import ProtectedRoute from "../../../routing/ProtectedRoute/ProtectedRoute";
import Auth from "../Auth";
import Home from "../../Home/Home";

describe("Auth page", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/auth");
  });

  it("should authenticate the user and navigate to the home page", async () => {
    const inMemoryAuth = inMemoryAuthService({});

    const spyLogin = spy(inMemoryAuth.login);

    const inMemoryAuthWithAuthWithSpyLogin = () => ({
      login: spyLogin,
    });

    const store = createStore({
      services: buildInMemoryServices({
        authService: { inMemoryAuthService: inMemoryAuthWithAuthWithSpyLogin },
      }),
    });

    const isLoggedIn = selectIsLoggedIn(store.getState());

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="auth"
              element={
                <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/">
                  <Auth />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isAllowed={true} redirectPath="/auth">
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

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
});
