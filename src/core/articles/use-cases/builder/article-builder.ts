import { builder } from "../../../utils/builder";

const defaultContent: any = {
  type: "paragraph",
  children: [{ text: "A first line of text." }],
};

export const contentBuilder = builder(defaultContent);

const defaultArticle = {
  id: "1",
  lightMode: true,
  timeToRead: "2 min read",
  title: "article 1",
  date: 166480348787489,
  content: [
    contentBuilder({}),
    contentBuilder({ children: [{ text: "A second line of text." }] }),
  ],
};

export const articleBuilder = builder(defaultArticle);
