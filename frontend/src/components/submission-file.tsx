import { Button } from "@mui/material";
import { styled } from "goober";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleFile = (e: any) => {
    const content = e.target.result;
    setFileContent(content);
    e.target.value = null;
  }

  const handleChangeFile = (file: any) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }

  const onSubmit = (data: FormValues) => {
    const currentErrors: string[] = [];
    setSuccess(false);

    data.title = fileContent;

    if (data.title === "") {
      currentErrors.push("Must upload reference file");
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    let citationData = Cite.input(fileContent);

    data.title = citationData[0].title;
    //JSON structures for authors and year differ slightly if the article is from a conference
    let authors: string = "";
    let author;

    if(citationData[0].author[0].given) {
      for(author in citationData[0].author) {
        authors += (citationData[0].author[author].given + " " + citationData[0].author[author].family + ",")
      }
      authors = authors.substring(0, authors.length - 1);
      data.authors = authors;
    } else {
      for(author in citationData[0].author) {
        authors += (citationData[0].author[author].literal + ",")
      }
      authors = authors.substring(0, authors.length - 1);
      data.authors = authors;
    }

    if(citationData[0]["event-date"]) {
      data.year = citationData[0]["event-date"]["date-parts"][0][0];
    } else if(citationData[0]["issued"]) {
      data.year = citationData[0]["issued"]["date-parts"][0][0];
    } else {
      data.year = citationData[0]["year"];
    }

    data.source = citationData[0]["container-title"];
    data.doi = citationData[0].DOI;
    if(data.doi.includes("https://doi.org/")){
      data.doi = data.doi.replace("https://doi.org/", "");
    }

    data.type = "nil";

    fetch(`${API_URI}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    })
      .then((response) => {
        if (response.status === 403){
          currentErrors.push("Article already exists!");
          setSuccess(false);
          reset({ title: "", authors: "", year: "", source: "", doi: "" });
          setErrors(currentErrors);
        } else if (response.status === 201){
          setSuccess(true);
          setErrors([]);
          alert("Successfully submitted \"" + data.title + "\"!");
          reset({ title: "", authors: "", year: "", source: "", doi: "" });
          navigate("../");
        }
      });
    
  };

  return (
    <FormContainer>
      {
      //<Select defaultValue="tdd" {...register("type")}>
        //<MenuItem value={"mob"}>Mob Programming</MenuItem>
        //<MenuItem value={"tdd"}>Test Driven Development</MenuItem>
      //</Select>
      }
      <Button variant="contained" component="label">
        Upload File
        <input hidden accept=".bib,.ris" type="file" {...register("title")} onChange={e => (e.target.files ? handleChangeFile(e.target.files[0]) : null)} />
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
