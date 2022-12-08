import { Article } from "../../entities/article";

export const buildArticlesService = () => ({
  getArticles: async (token: string): Promise<Article[]> => {
    const reponse = await fetch(
      "https://backend-blog-peni.onrender.com/api/v1/articles",
      {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
    const data = await reponse.json();
    return data.data;
  },
});
