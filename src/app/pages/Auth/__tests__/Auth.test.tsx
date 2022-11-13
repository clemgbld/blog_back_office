import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "../../../../core/store";
import { spy } from "../../../../lib/spy";
import { buildInMemoryServices } from "../../../../core/infastructure/all-services/all-services-in-memory";
import {
  inMemoryAuthService,
  InMemoryAuthService,
} from "../../../../core/auth/infrastructure/in-memory-services/in-memory-auth-service";
import Auth from "../Auth";

describe("Auth page", () => {
  it("should authenticate the user and navigate to the home page", () => {
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
  });
});
