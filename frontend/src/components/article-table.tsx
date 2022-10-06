import React, { useState } from "react";
import { Article } from "../types";

type Props = {
  data: Article[];
};

const ArticleTable = ({ data }: Props) => {
  const [sortedTable, setSortedTable] = useState(data);
  const [ascOrDesc, setAscOrDesc] = useState(false);

  const sortByDate = () => {
    const newData: Article[] = JSON.parse(JSON.stringify(sortedTable));
    if (ascOrDesc) {
      newData.sort((a, b) => b.year - a.year);
      setSortedTable(newData);
      setAscOrDesc(false);
    } else {
      newData.sort((a, b) => a.year - b.year);
      setSortedTable(data);
      setAscOrDesc(true);
    }
  };

  const removeRow = (id: string) => {
    setSortedTable(sortedTable.filter((article) => article._id !== id));
  };

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
              <button type="button" onClick={() => removeRow(article._id)}>
                Reject
              </button>
            </td>
          </tr>
          <></>
        </>
      ))}
      <button type="button" onClick={() => sortByDate()}>
        Order By Date
      </button>
    </>
  );
};

export default ArticleTable;
