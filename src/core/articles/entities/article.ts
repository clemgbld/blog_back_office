import { Descendant } from "slate";

export interface Article {
  id: string;
  summary?: string;
  topic?: string;
  title: string;
  date: number;
  content: Descendant[];
}
