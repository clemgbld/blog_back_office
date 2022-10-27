import { Article } from "../../entities/article";

export const countArticlesInTopic = (
  selectedTopic: string,
  articles: Article[]
) =>
  selectedTopic === "all articles"
    ? articles.length
    : articles.filter(({ topic }) => selectedTopic === topic).length;

export const countArticlesByHideStatus = (
  status: string,
  articles: Article[]
) => {
  if (status === "all articles") return articles.length;

  return status === "hidden"
    ? articles.filter(({ hide }) => hide).length
    : articles.filter(({ hide }) => !hide).length;
};
