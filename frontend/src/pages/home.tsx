import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPencil, faClipboard, faFlask } from '@fortawesome/free-solid-svg-icons';
import { styled } from "goober";
import React, { Component } from "react";
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

class Home extends Component {
  render() {
    return (
      <HomeContainer>
        <Link to="./SubmitArticle" style={{textDecoration: "none", color: 'white'}}>
          <LinkBox>
            <FontAwesomeIcon icon={faPencil} size="3x" style={{marginBottom: '5%'}} />
            Submit
          </LinkBox>
        </Link>
        
        <Link to="./ModerationQueue" style={{textDecoration: "none", color: 'white'}}>
          <LinkBox>
            <FontAwesomeIcon icon={faClipboard} size="3x" style={{marginBottom: '5%'}} />
            Moderation
          </LinkBox>
        </Link>
        
        <Link to="./AnalystQueue" style={{textDecoration: "none", color: 'white'}}>
          <LinkBox>
            <FontAwesomeIcon icon={faFlask} size="3x" style={{marginBottom: '5%'}} />
            Review
          </LinkBox>
        </Link>
        
        <Link to="./SEPractice" style={{textDecoration: "none", color: 'white'}}>
          <LinkBox>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="3x" style={{marginBottom: '5%'}} />
            Search
          </LinkBox>
        </Link>

      </HomeContainer>
    );
  }
}
export default Home;
