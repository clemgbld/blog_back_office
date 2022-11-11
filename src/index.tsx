import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { buildInMemoryServices } from "./core/infastructure/all-services/all-services-in-memory";
import { createClock } from "./core/infastructure/create-clock";
import { createStore } from "./core/store";
import { ClockContext } from "./app/context/ClockContext";
import { fakeArticle1, fakeArticle2 } from "./app/articles/fixtures/articles";

const error =
  process.env.REACT_APP_ARG === "error"
    ? {
        status: 404,
        message: "Something went wrong",
      }
    : undefined;

const store = createStore({
  services: buildInMemoryServices({
    articlesService: { articles: [fakeArticle1, fakeArticle2], error },
  }),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ClockContext.Provider value={createClock.create()}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ClockContext.Provider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
