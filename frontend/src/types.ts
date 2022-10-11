export type ArticleType = "nil" | "mob" | "tdd";

export type Article = {
  _id: string;
  title: string;
  type: ArticleType;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  status: string;
};
