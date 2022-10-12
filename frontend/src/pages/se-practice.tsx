import SortableArticles from "../components/sortable-article-table";
import { Select, MenuItem } from "@mui/material";
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

const SEPractice = () => {
  
  type FormValues = { 
    type: string;
  };

  const { register, watch } = useForm<FormValues>();
  const watchType = watch("type", "mob");

  return (
    <Container>
      <h2>Select SE Practice to get evidence for the claimed benefits</h2>
      <FormContainer>
      <Select defaultValue="mob" {...register("type")}>
        <MenuItem value={"mob"}>Mob Programming</MenuItem>
        <MenuItem value={"tdd"}>Test Driven Development</MenuItem>
      </Select>
      <br />
      </FormContainer>
      <SortableArticles practice={watchType} />
    </Container>
  );
};

export default SEPractice;
