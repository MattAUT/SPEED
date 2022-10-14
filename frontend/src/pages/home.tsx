import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPencil, faClipboard, faFlask } from '@fortawesome/free-solid-svg-icons';
import { styled } from "goober";
import React from "react";
import { Link } from "react-router-dom";

const HomeContainer = styled("div")`
  display: flex;

  flex-direction: row;
  justify-content: center;
  align-content: center;
  min-width: 100%;
  min-height: 100%;
  padding-top: 10%;

  & > * {
    margin: 10px !important;
  }
`;

const LinkBox = styled("div")`
  display: flex;
  border-radius: 25px;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 2.125vw;
  text-decoration: strong;
  min-width: 15vw;
  min-height: 15vw;
  background-color: #2b2b2b;
`;



type Props = {
  user: string;
};

const Home = (user: Props) => {

    const submitBox = 
      <Link to="./SubmitArticle" style={{textDecoration: "none", color: 'white'}}>
          <LinkBox>
            <FontAwesomeIcon icon={faPencil} size="3x" style={{marginBottom: '5%'}} />
            Submit
          </LinkBox>
        </Link>

    const modBox = 
        <Link to="./ModerationQueue" style={{textDecoration: "none", color: 'white'}}>
          <LinkBox>
            <FontAwesomeIcon icon={faClipboard} size="3x" style={{marginBottom: '5%'}} />
            Moderation
          </LinkBox>
        </Link>

    const anaBox = 
        <Link to="./AnalystQueue" style={{textDecoration: "none", color: 'white'}}>
          <LinkBox>
            <FontAwesomeIcon icon={faFlask} size="3x" style={{marginBottom: '5%'}} />
            Review
          </LinkBox>
        </Link>

    const searchBox = 
        <Link to="./SEPractice" style={{textDecoration: "none", color: 'white'}}>
          <LinkBox>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="3x" style={{marginBottom: '5%'}} />
            Search
          </LinkBox>
        </Link>

    return (
      <HomeContainer>
        {submitBox}
        {(user.user === "moderator" || user.user === "analyst" ? modBox : null)}
        {(user.user === "analyst" ? anaBox : null)}
        {searchBox}
      </HomeContainer>
    );
  }

export default Home;
