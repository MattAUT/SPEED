import React, { useState, useEffect } from "react";
import { Article } from "../types";

type Props = {
  data: Article[];
  type: string;
};

const ArticleTable = ({ data }: Props, { type }: Props) => {
  const [sortedTable, setSortedTable] = useState(data);
  const [ascOrDesc, setAscOrDesc] = useState(false);

  console.log(type);

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

  useEffect(() => {
    setSortedTable(data);
  }, [data]);

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
            
            {(type === "m" ?
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
            :
            null
            )}

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
