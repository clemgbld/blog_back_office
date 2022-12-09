import { Article } from "../../entities/article";

export const buildArticlesService = () => ({
  getArticles: async (token: string): Promise<Article[]> => {
    try {
      const reponse = await fetch(
        "https://backend-blog-peni.onrender.com/api/v1/articles",
        {
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      );

      const data = await reponse.json();

      if (data.status === "fail") {
        throw new Error(data.message);
      }

      return data.data;
    } catch ({ message }) {
      throw new Error(message);
    }
  },
});
