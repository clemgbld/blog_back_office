import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { buildInMemoryServices } from "./core/infastructure/all-services/all-services-in-memory";
import {
  createStorageService,
  inMemoryStorage,
} from "./core/infastructure/storage-service";
import { inMemoryAuthService } from "./core/auth/infrastructure/in-memory-services/in-memory-auth-service";
import { createClock } from "./core/infastructure/create-clock";
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

console.log(process.env.REACT_APP_ARG);

const storageService = createStorageService(inMemoryStorage(existingStorage));

const store = createStore({
  services: buildInMemoryServices({
    articlesService: { articles: [fakeArticle1, fakeArticle2], error },
    authService: { error: error, inMemoryAuthService },
    storageService,
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
