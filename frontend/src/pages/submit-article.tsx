import { styled } from "goober";
import React from "react";
import SubmissionForm from "../components/submission-form";
import SubmissionFile from "../components/submission-file";

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
`;

const SubmitArticle = () => {
  return (
    <Container>
      <div>
        <h2>Submit Article</h2>

        <SubmissionForm />
      </div>
      <div>
        <h2>Upload Article</h2>
        <SubmissionFile />
      </div>
    </Container>
  );
};

export default SubmitArticle;
