import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "../../../../core/store";
import { spy } from "../../../../lib/spy";
import { buildInMemoryServices } from "../../../../core/infastructure/all-services/all-services-in-memory";
import { inMemoryAuthService } from "../../../../core/auth/infrastructure/in-memory-services/in-memory-auth-service";
import Auth from "../Auth";

describe("Auth page", () => {
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

    render(
      <Provider store={store}>
        <Auth />
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
  });
});
