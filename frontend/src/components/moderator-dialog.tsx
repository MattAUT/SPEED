import { Button, Modal, Paper, Typography } from "@mui/material";
import { styled } from "goober";

const API_URI = process.env.REACT_APP_API_URL;

export enum Action {
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

type Props = {
  open: boolean;
  _id: string;
  action: Action;
  removeArticleFromView: (_id: string) => void;
  handleClose: () => void;
};

const ModeratorDialog = ({
  open,
  _id,
  action,
  handleClose,
  removeArticleFromView,
}: Props) => {
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
    fetch(`${API_URI}/add/pending`, {
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
        <Typography
          sx={{ marginBottom: 4 }}
        >{`Are you sure you want to ${action} this article?`}</Typography>
        <StyledButton
          variant="contained"
          sx={{ marginBottom: 2 }}
          onClick={action === Action.APPROVE ? approveArticle : rejectArticle}
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

export default ModeratorDialog;
