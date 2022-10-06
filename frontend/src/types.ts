export type ArticleType = "TDD" | "Mob Programming";

export type Article = {
  _id: string;
  title: string;
  type: ArticleType;
  authors: string[];
  source: string;
  year: number;
  doi: string;
};
