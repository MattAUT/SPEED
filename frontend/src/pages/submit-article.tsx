import { styled } from "goober";
import React from "react";
import SubmissionForm from "../components/submission-form";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const SubmitArticle = () => {
  return (
    <Container>
      <h2>Submit Article</h2>

      <SubmissionForm />
    </Container>
  );
};

export default SubmitArticle;
