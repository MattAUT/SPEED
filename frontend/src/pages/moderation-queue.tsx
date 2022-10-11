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
            setData(data.filter((obj: any) => {
              return obj.status === "Submitted";
            }));
            console.log(data);
          });
      }, []);

    return (
    <div className="app-container">
      <h1>Moderator View</h1>
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
                    type={"m"}
                  />
          </tbody>
        </table>
      </div>
    );
}
 
export default ModerationQueue;  