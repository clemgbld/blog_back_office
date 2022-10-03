export interface Article {
  id: string;
  title: string;
  date: number;
  content: Record<string, string | Record<string, string>[]>[];
}
