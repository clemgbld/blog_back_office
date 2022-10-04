import { articlesAdapter } from "../articles-slice";
import { RootState } from "../../store";

const articlesSelectors = articlesAdapter.getSelectors<RootState>(
  (state) => state.articles.data
);

export const allArticles = (state: any) =>
  articlesSelectors.selectAll(state.getState());

export const articlesStatus = (state: any) => state.getState().articles.status;

export const articlesError = (state:any) => state.getState().articles.error