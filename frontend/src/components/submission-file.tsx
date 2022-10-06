import { Button, MenuItem, Select } from "@mui/material";
import { styled } from "goober";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const API_URI = process.env.REACT_APP_API_URL;

const Cite = require('citation-js');

const FormContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;

  & > * {
    margin: 10px !important;
  }
`;

const ErrorText = styled("p")`
  color: #de2222;
`;

const SuccessText = styled("p")`
  color: #22ae22;
`;

type FormValues = {
    type: string,
    citation: string
};

type CitationObject = {
  title: string;
  authors: string;
  year: string;
  source: string;
  doi: string;
  type: string;
};

const SubmissionFile = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [fileContent, setFileContent] = useState<string>("")

  const handleFile = (e: any) => {
    const content = e.target.result;
    setFileContent(content);
  }

  const handleChangeFile = (file: any) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }

  const onSubmit = (data: FormValues) => {
    const currentErrors: string[] = [];
    setSuccess(false);

    data.citation = fileContent;

    if (data.citation === "") {
      currentErrors.push("Must add citation");
    }
    
    if (data.type === "") {
      currentErrors.push("Must select type");
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    let citationData = Cite.input(fileContent);

    let submission: CitationObject = {title: "", authors: "", year: "", source: "", doi: "", type: ""};

    submission.title = citationData[0].title;
    //JSON structures for authors and year differ slightly if the article is from a conference
    if(citationData[0].type === "paper-conference"){
      let authors: string = "";
      for(var author in citationData[0].author) {
        authors += (citationData[0].author[author].literal + ",")
      }
      authors = authors.substring(0, authors.length - 1);
      submission.authors = authors;

      submission.year = citationData[0]["event-date"]["date-parts"][0][0];
    } else {
      let authors: string = "";
      for(author in citationData[0].author) {
        authors += (citationData[0].author[author].given + " " + citationData[0].author[author].family + ",")
      }
      authors = authors.substring(0, authors.length - 1);
      submission.authors = authors;
      submission.year = citationData[0]["issued"]["date-parts"][0][0];
    }
    submission.source = citationData[0]["container-title"];
    submission.doi = citationData[0].DOI;
    submission.type = data.type;

    fetch(`${API_URI}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submission }),
    });
    
    setErrors([]);
    setSuccess(true);
    reset({ citation: "", type: ""});
  };

  return (
    <FormContainer>
      <Select defaultValue="tdd" {...register("type")}>
        <MenuItem value={"mob"}>Mob Programming</MenuItem>
        <MenuItem value={"tdd"}>Test Driven Development</MenuItem>
      </Select>
      <Button variant="contained" component="label">
        Upload File
        <input hidden accept=".bib,.ris" type="file" {...register("citation")} onChange={e => (e.target.files ? handleChangeFile(e.target.files[0]) : null)} />
      </Button>
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
      {errors.length > 0 &&
        errors.map((error) => <ErrorText key={error}>{error}</ErrorText>)}
      {success && <SuccessText>Submitted Successfully!</SuccessText>}
    </FormContainer>
  );
};

export default SubmissionFile;
