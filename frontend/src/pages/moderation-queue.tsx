import { Article } from "../types";
import { useEffect, useState } from "react";
import ArticleTable from "../components/article-table";

const API_URI = process.env.REACT_APP_API_URL;

const ModerationQueue = () => {
  const [data, setData] = useState<Article[]>([]);

  const fetchData = () => {
    fetch(`${API_URI}/fetch`)
      .then((res) => res.json())
      .then((data) => {
        setData(
          data.filter((obj: any) => {
            return obj.status === "Submitted";
          })
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <h1>Moderator View</h1>
      <ArticleTable data={data} userType="MODERATOR" />
    </div>
  );
};

export default ModerationQueue;
