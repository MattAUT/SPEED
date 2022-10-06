import React, { useEffect, useState } from "react";
import { Article } from "../types";

type Props = {
  data: Article[];
};

const ArticleTable = ({ data }: Props) => {
  const [sortedTable, setSortedTable] = useState(data);

  useEffect(() => {
    setSortedTable(data);
  }, [data]);

  const sortByDate = () => {
    setSortedTable(data.sort((a, b) => a.year - b.year))
  }

  const removeRow = (id: string) =>{
    setSortedTable(data.filter((article) => article._id !== id))
  }

  // const approveRow = () =>{
  //   setSortedTable(data.filter(()))
  // }

  return (
    <>
      {sortedTable.map((article) => (

        <>
          <tr>
            <td>{article.title}</td>
            <td>{article.type}</td>
            <td>{article.authors.join(", ")}</td>
            <td>{article.source}</td>
            <td>{article.year}</td>
            <td>{article.doi}</td>
            <td>
              <button
                type="button"
              // onClick={() => (approveRow)}
              >
                Approve
              </button>
              <button type="button"
              onClick={() => (removeRow(article._id))}
              >
                Reject
              </button>
            </td>
          </tr>
          <>

          </>
        </>

      ))}
      <button type="button"
        onClick={sortByDate}
      >
        Order By Date
      </button>
    </>
  );
};

export default ArticleTable;

