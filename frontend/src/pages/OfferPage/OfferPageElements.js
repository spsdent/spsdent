import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export const OfferPageContainer = styled.div`
  width: 75%;
  height: 70vh;
  margin-top: 3em;
  font-size: 24px;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
    /* margin-left: 4em;
    margin-top: 5em; */
  }
  @media screen and (max-width: 960px) {
    font-size: 13px;
    width: 85%;
  }
  @media screen and (max-width: 768px) {
    text-align: center;
    margin: 3em auto;
  }
`;
export const OfferPageTitle = styled(motion.h1)`
  font-family: "bebas neue";
  font-size: 4em;
  letter-spacing: 0.1em;
  line-height: 1em;
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};

  @media screen and (max-width: 1500px) {
    font-size: 3em;
  }
`;
export const OfferPageContent = styled(motion.div)`
  width: 100%;
  height: 70%;
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1em;
  @media (orientation: portrait) {
    flex-direction: row;
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: row;
    height: 100%;
  }
`;
export const OfferPageButtonRow = styled(motion.div)`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
  gap: 1em;
  @media (orientation: portrait) {
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
  }
`;
export const OfferButtonContainer = styled(motion.div)`
  width: 9em;
  height: 8em;
  white-space: wrap;
  border-radius: 1em;
  outline: none;
  border: none;
  background-color: #333;
  color: #fff;
  font-family: "bebas neue";
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1700px) {
    width: 8em;
    height: 7em;
  }
`;
export const OfferButtonImg = styled.img`
  width: 2.5em;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const OfferButtonText = styled.p`
  text-align: center;
  font-size: 0.9em;
  padding: 0.2em;
  letter-spacing: 1px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const LinkButton = styled(Link)`
  text-decoration: none;
`;
