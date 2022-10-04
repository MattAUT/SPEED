import React from "react";
import { Article } from "../types";

type Props = {
    data: Article[];
  };


  const ArticleTable = ({ data }: Props) => {
    return (
      
      <>
        {data.map((article) => (
          
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
          // onClick={(event) => handleEditClick(event, data)}
        >
          Approve
        </button>
        <button type="button" 
        // onClick={() => handleDeleteClick(data.id)}
        >
          Reject
        </button>
      </td>
    </tr> 
    <>
</>
{/* Sorting the articles by date */}
    <button type="button" 
        onClick={() => data.sort((a, b) => (a.year > b.year) ? 1 : -1)} 
        >
          Order By Date
        </button>
          </>

        ))}
      </>
    );
  };

export default ArticleTable;



