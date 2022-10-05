import { Button, MenuItem, Select, TextField } from "@mui/material";
import { styled } from "goober";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const API_URI = process.env.REACT_APP_API_URL;

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

const SubmissionForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const onSubmit = (data: FormValues) => {
    const currentErrors: string[] = [];
    setSuccess(false);

    if (data.title === "") {
      currentErrors.push("Title cannot be empty");
    }

    if (data.authors === "") {
      currentErrors.push("Authors cannot be empty");
    }

    if (data.year === "") {
      currentErrors.push("Year cannot be empty");
    }

    if (data.source === "") {
      currentErrors.push("Source cannot be empty");
    }

    if (data.doi === "") {
      currentErrors.push("DOI cannot be empty");
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    fetch(`${API_URI}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    setErrors([]);
    setSuccess(true);
    reset({ title: "", authors: "", year: "", source: "", doi: "" });
  };

  return (
    <FormContainer>
      <Select defaultValue="tdd" {...register("type")}>
        <MenuItem value={"mob"}>Mob Programming</MenuItem>
        <MenuItem value={"tdd"}>Test Driven Development</MenuItem>
      </Select>
      <TextField label="Title" {...register("title")} />
      <TextField
        label="Authors"
        helperText="Seperate with commas (i.e Name,Another Name,A Third Name)"
        {...register("authors")}
      />
      <TextField label="Year" {...register("year")} />
      <TextField label="Source" {...register("source")} />
      <TextField label="DOI" {...register("doi")} />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
      {errors.length > 0 &&
        errors.map((error) => <ErrorText key={error}>{error}</ErrorText>)}
      {success && <SuccessText>Submitted Successfully!</SuccessText>}
    </FormContainer>
  );
};

export default SubmissionForm;
