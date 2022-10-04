import { Article } from "../../entities/article";

export interface InMemoryArticlesService {
  getArticles: () => Promise<Article[]>;
}

export const inMemoryArticlesService = (articles: Article[],error?:{status:number; message:string}) => ({
  getArticles: () => {

    if(error){
      throw new Error(error.message)
    }

    return Promise.resolve(articles)
  },
});
