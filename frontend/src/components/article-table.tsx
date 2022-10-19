import MuiButton from "@mui/material/Button";
import { styled } from "goober";
import React, { useState, useEffect } from "react";
import { Article, ArticleTypeMap } from "../types";
import ModeratorDialog, { Action } from "./moderator-dialog";
import AnalystDialog, { AnalystAction } from "./analyst-dialog";

type Props = {
  data: Article[];
  userType: "MODERATOR" | "ANALYST";
};

const Button = styled(MuiButton)`
  width: 150px;
`;

const ArticleTable = ({ data, userType }: Props) => {
  const [sortedTable, setSortedTable] = useState(data);
  const [ascOrDesc, setAscOrDesc] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(Action.APPROVE);
  const [dialogAnalystAction, setDialogAnalystAction] = useState(AnalystAction.APPROVE);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    setSortedTable(data.filter((article) => article.status === "Submitted"));
  }, [data]);

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

  const removeArticleFromView = (_id: string) => {
    setSortedTable(sortedTable.filter((article) => article._id !== _id));
  };

  const handleApprove = (_id: string) => {
    setDialogAction(Action.APPROVE);
    setSelectedId(_id);
    setDialogOpen(true);
  };

  const handleAnalystApprove = (_id: string) => {
    setDialogAnalystAction(AnalystAction.APPROVE);
    setSelectedId(_id);
    setDialogOpen(true);
  };

  const handleAnalystReject = (_id: string) => {
    setDialogAnalystAction(AnalystAction.REJECT);
    setSelectedId(_id);
    setDialogOpen(true);
  };

  const handleReject = (_id: string) => {
    setDialogAction(Action.REJECT);
    setSelectedId(_id);
    setDialogOpen(true);
  };

  return (
    <>
      <ModeratorDialog
        open={dialogOpen}
        _id={selectedId}
        action={dialogAction}
        removeArticleFromView={removeArticleFromView}
        handleClose={() => setDialogOpen(false)}
      />
      <AnalystDialog
        open={dialogOpen}
        _id={selectedId}
        action={dialogAnalystAction}
        removeArticleFromView={removeArticleFromView}
        handleClose={() => setDialogOpen(false)}
      />
      <Button variant="contained" onClick={() => sortByDate()}>
        Order By Date
      </Button>
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
          {sortedTable.map((article) => (
            <>
              <tr>
                <td>{article.title}</td>
                <td>{ArticleTypeMap[article.type]}</td>
                <td>{article.authors.join(", ")}</td>
                <td>{article.source}</td>
                <td>{article.year}</td>
                <td>{article.doi}</td>

                <td>
                  {userType === "MODERATOR" ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => handleApprove(article._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleReject(article._id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}

                  {userType === "ANALYST" ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => handleAnalystApprove(article._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleAnalystReject(article._id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ArticleTable;
