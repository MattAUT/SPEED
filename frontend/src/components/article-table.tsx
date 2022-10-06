import React, { useState } from "react";
import { Article } from "../types";

type Props = {
  data: Article[];
};

const ArticleTable = ({ data }: Props) => {
  const [sortedTable, setSortedTable] = useState(data);
  const [ascOrDesc, setAscOrDesc] = useState(false);

  const sortByDate = () => {
    if(ascOrDesc) {
      setSortedTable(data.sort((a, b) => b.year - a.year))
      setAscOrDesc(false)
    } else {
      setSortedTable(data.sort((a, b) => a.year - b.year))
      setAscOrDesc(true);
    }
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

