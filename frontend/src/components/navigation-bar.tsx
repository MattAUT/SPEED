import { useTheme } from "@mui/material/styles";
import { styled } from "goober";
import { NavLink, useLocation } from "react-router-dom";

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

  const location = useLocation();


  return (
    <Container $background={primary.dark}>
      <h1>SPEED</h1>
      <LinksContainer>
        {(location.pathname !== '/' ? <StyledNavLink to="/">Home</StyledNavLink> : null)}
      </LinksContainer>
    </Container>
  );
};

export default NavigationBar;
