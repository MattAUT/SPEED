export type ArticleType = "nil" | "mob" | "tdd";
export const ArticleTypeMap = {
  nil: "NIL",
  mob: "Mob Programming",
  tdd: "Test Driven Development",
};
export type SubmissionStatus =
  | "Submitted"
  | "Pending"
  | "Approved"
  | "Rejected";
export type RecommendedPractice = "x" | "y" | "n";

export type Article = {
  _id: string;
  title: string;
  type: ArticleType;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  status: SubmissionStatus;
  recommends: RecommendedPractice;
};
