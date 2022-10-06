export type ArticleType = "TDD" | "Mob Programming";

export type Article = {
  title: string;
  type: ArticleType;
  authors: string[];
  source: string;
  year: number;
  doi: string;
};
