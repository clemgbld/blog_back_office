import { articlesAdapter } from "../articles-slice";
import { RootState,Store } from "../../store";

const articlesSelectors = articlesAdapter.getSelectors<RootState>(
  (state) => state.articles.data
);

export const allArticles = (store: Store) =>
  articlesSelectors.selectAll(store.getState());

export const articlesStatus = (store: Store) => store.getState().articles.status;

export const articlesError = (store:Store) => store.getState().articles.error