export interface Article {
  id: string;
  summary?: string;
  topic?: string;
  title: string;
  date: number;
  content: Record<string, string | Record<string, string>[]>[];
}
