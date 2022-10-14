import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { styled } from "goober";
import { Select, MenuItem } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

type ContainerProps = {
  $background: string;
};

const Container = styled<ContainerProps>("div")`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  background-color: ${({ $background }) => $background};
  padding-left: 1.25%;
`;

const LinksContainer = styled("div")`
  display: flex;
`;

const StyledNavLink = styled(NavLink as any)`
  text-decoration: none;
  color: #fff;
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

type UserType = {
  user: string;
}

type Props = {
  changeUser: (usertype: string) => void;
};

const NavigationBar = ({changeUser}: Props) => {
  const {
    palette: { primary },
  } = useTheme();

  const location = useLocation();

  const { register, watch } = useForm<UserType>();

  const watchUser = watch("user");

  useEffect(() => {
    changeUser(watchUser);
  }, [changeUser, watchUser])

  return (
    <Container $background={primary.dark}>
      <h1>SPEED</h1>
      <LinksContainer>
        {(
          location.pathname !== '/' ? 
          <StyledNavLink to="/">Home</StyledNavLink> : 
          <Select defaultValue="user" {...register("user")}>
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"moderator"}>Moderator</MenuItem>
            <MenuItem value={"analyst"}>Analyst</MenuItem>
          </Select>
        )}
      
      </LinksContainer>
    </Container>
  );
};

export default NavigationBar;
