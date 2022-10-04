import { Article } from "../types";
import { useEffect, useState } from "react";
import ArticleTable from "../components/article-table";

const API_URI = process.env.REACT_APP_API_URL;

const ModerationQueue = () => {
    const [data, setData] = useState<Article[]>([]);

    useEffect(() => {
        fetch(`${API_URI}/fetch`)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            console.log(data);
          });
      }, []);

    return (
    <div className="app-container">
      {/* <form onSubmit={}>  for accepting or rejecting articles*/} 
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Authors</th>
              <th>Source</th>
              <th>Year</th>
              <th>DOI</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
                  <ArticleTable
                    data={data}
                  />
          </tbody>
        </table>
      {/* </form> */}
      </div>
    );
}
 
export default ModerationQueue;  