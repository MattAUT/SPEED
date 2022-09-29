export type ArticleType = "TDD" | "Mob Programming";

export type Article = {
  title: String;
  type: ArticleType;
  authors: String[];
  source: String;
  year: String;
  doi: String;
};
