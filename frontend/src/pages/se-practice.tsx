import SortableArticles from "../components/sortable-article-table";
import React, { useState } from "react";
import { Select, MenuItem, Slider } from "@mui/material";
import { styled } from "goober";
import { useForm } from "react-hook-form";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
  align-items: center;
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

  function valuetext(value: number) {
    return `${value}`;
  }

const SEPractice = () => {
  
  type FormValues = { 
    type: string;
    years: number[];
  };

  let practices = new Map<string, string>([
    ["tdd", "Test-Driven Development"],
    ["mob", "Mob Programming"]
  ]);
  
  const [value, setValue] = useState<number[]>([1900, new Date().getFullYear()]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const { register, watch } = useForm<FormValues>();
  const watchType = watch("type");

  return (
    <Container>
      <FormContainer>
      <h2>Select SE Practice to get evidence for the claimed benefits</h2>
      <Select defaultValue=" " {...register("type")}>
        <MenuItem value={" "}>Please pick an SE Practice</MenuItem>
        <MenuItem value={"mob"}>Mob Programming</MenuItem>
        <MenuItem value={"tdd"}>Test Driven Development</MenuItem>
      </Select>      
      <h2>Select year range to search</h2>
      <Slider
        getAriaLabel={() => ''}
        min={1900}
        max={new Date().getFullYear()}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <br />
      </FormContainer>
      <SortableArticles practice={watchType} label={practices.get(watchType)!} years={value} />
    </Container>
  );
};

export default SEPractice;
