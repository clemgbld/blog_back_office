import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "../entities/article";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (articles: Article[]) => articles
);
