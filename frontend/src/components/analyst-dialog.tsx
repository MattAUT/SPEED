import {
  Button,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "goober";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArticleTypeMap } from "../types";

const API_URI = process.env.REACT_APP_API_URL;

export enum AnalystAction {
  APPROVE = "approve",
  REJECT = "reject",
}

const StyledButton = styled(Button)`
  width: 100px;
`;

const StyledPaper = styled(Paper)`
  width: 50vw;
  height: 50vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  spacing: ;
`;

const FormContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;

  & > * {
    margin: 10px !important;
  }
`;

type Props = {
  open: boolean;
  _id: string;
  type: string;
  action: AnalystAction;
  removeArticleFromView: (_id: string) => void;
  handleClose: () => void;
};

const AnalystDialog = ({
  open,
  _id,
  type,
  action,
  handleClose,
  removeArticleFromView,
}: Props) => {
  const [typeDisplayText, setTypeDisplayText] = useState("nil");

  type FormValues = {
    type: string;
  };

  const { register } = useForm<FormValues>();

  const rejectArticle = () => {
    fetch(`${API_URI}/add/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    });

    removeArticleFromView(_id);
    handleClose();
  };

  const approveArticle = () => {
    fetch(`${API_URI}/add/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    });

    fetch(`${API_URI}/add/type`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    });

    removeArticleFromView(_id);
    handleClose();
  };

  return (
    <Modal
      open={open}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        textAlign: "center",
        transform: "translate(-50%, -50%)",
      }}
    >
      <StyledPaper>
        <FormContainer>
          <h2>Select SE Practice to get evidence for the claimed benefits</h2>
          <Select
            defaultValue="nil"
            {...register("type")}
            onChange={(event) => setTypeDisplayText(event.target.value)}
          >
            <MenuItem value={"nil"}>Please pick an SE Practice</MenuItem>
            <MenuItem value={"mob"}>Mob Programming</MenuItem>
            <MenuItem value={"tdd"}>Test Driven Development</MenuItem>
          </Select>
        </FormContainer>
        {typeDisplayText !== "nil" && (
          <Typography
            sx={{ marginBottom: 4 }}
          >{`Are you sure you want to ${action} this article and set type to ${
            ArticleTypeMap[typeDisplayText as keyof typeof ArticleTypeMap]
          }?`}</Typography>
        )}
        <StyledButton
          variant="contained"
          sx={{ marginBottom: 2 }}
          disabled={typeDisplayText === "nil"}
          onClick={
            action === AnalystAction.APPROVE ? approveArticle : rejectArticle
          }
        >
          Continue
        </StyledButton>
        <StyledButton variant="contained" onClick={handleClose}>
          Back
        </StyledButton>
      </StyledPaper>
    </Modal>
  );
};

export default AnalystDialog;
