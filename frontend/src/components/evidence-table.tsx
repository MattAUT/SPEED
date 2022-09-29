import { Article } from "../types";

type Props = {
  data: Article[];
};

const Table = ({ data }: Props) => {
  return (
    <>
      {data.map((article) => (
        <>
          <p>{article.title}</p>
          <p>{article.type}</p>
          <p>{article.authors.join(", ")}</p>
          <p>{article.source}</p>
          <p>{article.year}</p>
          <p>{article.doi}</p>
          <br />
        </>
      ))}
    </>
  );
};

export default Table;
