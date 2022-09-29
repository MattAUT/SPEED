import Table from "../components/evidence-table";
import { Article } from "../types";
import { useEffect, useState } from "react";

const API_URI = process.env.REACT_APP_API_URL;

const SEPractice = () => {
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
    <div>
      <h2>Select SE Practice to get evidence for the claimed benefits</h2>
      <Table data={data} />
    </div>
  );
};

export default SEPractice;
