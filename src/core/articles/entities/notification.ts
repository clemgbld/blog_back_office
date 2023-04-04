import { Article } from "./article";

export type NotificationInfos = Omit<
  Article,
  "hide" | "content" | "lightMode" | "date"
> & {
  img?: string;
};
