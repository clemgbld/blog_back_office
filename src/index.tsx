import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Store } from "./core/store";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { buildInMemoryServices } from "./infrastructure/common/all-services/all-services-in-memory";
import { buildServices } from "./infrastructure/common/all-services/all-services";
import {
  createStorageService,
  inMemoryStorage,
} from "./infrastructure/common/storage-service";
import { inMemoryAuthService } from "./infrastructure/auth/in-memory-services/in-memory-auth-service";
import { createClock } from "./infrastructure/common/create-clock";
import { createStore } from "./core/store";
import { ClockContext } from "./app/context/ClockContext";
import { fakeArticle1, fakeArticle2 } from "./fixtures/articles";
import { loginFromStorage } from "./core/auth/use-cases/login-from-storage";
import { chooseAppMode } from "./helper/choose-app-mode";

const error = chooseAppMode({
  expectedMode: "inMemory error",
  currentMode: process.env.REACT_APP_ARG,
  matchingValue: {
    status: 404,
    message: "Something went wrong",
  },
  nonMatchingValue: undefined,
});

const existingStorage: Record<string, string> = chooseAppMode({
  expectedMode: "inMemory isNotLoggedIn",
  currentMode: process.env.REACT_APP_ARG,
  matchingValue: {},
  nonMatchingValue: {
    "blog-admin-token": "fake-token",
    "blog-admin-token-expiration-time": "1668171813577",
  },
});

const storageService = createStorageService(inMemoryStorage(existingStorage));

const store: Store = chooseAppMode({
  expectedMode: "inMemory",
  currentMode: process.env.REACT_APP_ARG,
  matchingValue: createStore({
    services: buildInMemoryServices({
      articlesService: { articles: [fakeArticle1, fakeArticle2], error },
      authService: { error: error, inMemoryAuthService },
      subscriptionService: {
        existingEmails: [
          { id: "1", email: "foo@example.com" },
          { id: "2", email: "bar@example.com" },
        ],
      },
      storageService,
    }),
  }),
  nonMatchingValue: createStore({
    services: buildServices(),
  }),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

store.dispatch(loginFromStorage()).then(() => {
  root.render(
    <Provider store={store}>
      <ClockContext.Provider value={createClock.create()}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ClockContext.Provider>
    </Provider>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
