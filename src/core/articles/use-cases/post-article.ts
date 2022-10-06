import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "../entities/article";
import { InMemoryArticlesService } from "../infrastructure/in-memory/InMemoryArticlesService";

export interface ArticleWithoutId {
  summary?: string;
  topic?: string;
  title: string;
  date: number;
  content: Record<string, string | Record<string, string>[]>[];
}

export const postArticle = createAsyncThunk<
  Article,
  { articleToPost: ArticleWithoutId; id?: number },
  { extra: { services: { articlesService: InMemoryArticlesService } } }
>(
  "articles/postArticle",
  async (
    { articleToPost, id = Date.now() },
    {
      extra: {
        services: { articlesService },
      },
    }
  ) => {
    await articlesService.postArticle(articleToPost);
    return { id: `${id}`, ...articleToPost };
  }
);
