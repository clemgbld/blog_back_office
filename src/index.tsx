import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { inMemoryArticlesService } from "./core/articles/infrastructure/in-memory-services/InMemoryArticlesService";
import { createStore } from "./core/store";

import { fakeArticle1, fakeArticle2 } from "./app/articles/fixtures/articles";

const store = createStore({
  services: {
    articlesService: inMemoryArticlesService([fakeArticle1, fakeArticle2]),
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
