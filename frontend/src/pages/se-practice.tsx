import { Table } from "@mui/material";
import { styled } from "goober";
import { Article } from "../types";
import { useEffect, useState } from "react";

const API_URI = process.env.REACT_APP_API_URL;

const SEPractice = () => {
  const [data, setData] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`${API_URI}/fetch`)
      .then((res) => res.json())
      .then((data) => {
        let filteredData = data.filter((obj: any) => {
          return obj.status === "Accepted";
        })
        setData(filteredData);
        console.log(filteredData);
      });
  }, []);

  return (
    <div>
      <h2>Select SE Practice to get evidence for the claimed benefits</h2>
    </div>
  );
};

export default SEPractice;
