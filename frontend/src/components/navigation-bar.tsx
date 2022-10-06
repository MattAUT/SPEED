import { useTheme } from "@mui/material/styles";
import { styled } from "goober";
import { NavLink } from "react-router-dom";

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

const NavigationBar = () => {
  const {
    palette: { primary },
  } = useTheme();

  return (
    <Container $background={primary.dark}>
      <h1>SPEED</h1>
      <LinksContainer>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/SEPractice">Select the Practice</StyledNavLink>
        <StyledNavLink to="/SubmitArticle">Submit an Article</StyledNavLink>
        <StyledNavLink to="/ModerationQueue">Review Articles</StyledNavLink>
      </LinksContainer>
    </Container>
  );
};

export default NavigationBar;
