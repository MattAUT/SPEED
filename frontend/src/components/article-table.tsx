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
  const [moderatorDialogOpen, setModeratorDialogOpen] = useState(false);
  const [analystDialogOpen, setAnalystDialogOpen] = useState(false);
  const [dialogActionModerator, setDialogActionModerator] = useState(
    Action.APPROVE
  );
  const [dialogAnalystAction, setDialogAnalystAction] = useState(
    AnalystAction.APPROVE
  );
  const [selectedType, setSelectedType] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    setSortedTable(
      data.filter(
        (article) =>
          article.status ===
          (userType !== "MODERATOR" && userType !== "ANALYST"
            ? "Approved"
            : userType === "MODERATOR"
            ? "Submitted"
            : "Pending")
      )
    );
  }, [data, userType]);

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

  const handleModeratorApprove = (_id: string) => {
    setDialogActionModerator(Action.APPROVE);
    setSelectedId(_id);
    setModeratorDialogOpen(true);
  };

  const handleAnalystApprove = (_id: string, type: string) => {
    setDialogAnalystAction(AnalystAction.APPROVE);
    setSelectedId(_id);
    setSelectedType(type);
    setAnalystDialogOpen(true);
  };

  const handleAnalystReject = (_id: string) => {
    setDialogAnalystAction(AnalystAction.REJECT);
    setSelectedId(_id);
    setModeratorDialogOpen(true);
  };

  const handleModeratorReject = (_id: string) => {
    setDialogActionModerator(Action.REJECT);
    setSelectedId(_id);
    setAnalystDialogOpen(true);
  };

  return (
    <>
      <ModeratorDialog
        open={moderatorDialogOpen}
        _id={selectedId}
        action={dialogActionModerator}
        removeArticleFromView={removeArticleFromView}
        handleClose={() => setModeratorDialogOpen(false)}
      />
      <AnalystDialog
        open={analystDialogOpen}
        _id={selectedId}
        type={selectedType}
        action={dialogAnalystAction}
        removeArticleFromView={removeArticleFromView}
        handleClose={() => setAnalystDialogOpen(false)}
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
                        onClick={() => handleModeratorApprove(article._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleModeratorReject(article._id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}

                  {userType === "ANALYST" ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleAnalystApprove(article._id, article.type)
                        }
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
