import styled from "styled-components";
import { motion } from "framer-motion";
export const OfferPageContainer = styled.div`
  width: 75%;
  height: 70vh;
  /* background-color: #aaa; */
  margin-top: 3em;
  font-size: 24px;
  /* overflow: hidden; */
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
    margin-left: 4em;
    margin-top: 5em;
  }
  @media screen and (max-width: 960px) {
    font-size: 13px;
    margin-left: 6em;
    margin-top: 7em;
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
  /* background-color: cadetblue; */
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media screen and (max-width: 1280px) {
    /* height: 50%; */
  }

  @media (orientation: portrait) {
    flex-direction: row;
    height: 100%;
  }
`;
export const OfferPageButtonRow = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
  /* background-color: ${(props) => (props.primary ? "#444" : "#666")}; */

  @media (orientation: portrait) {
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
  @media screen and (max-width: 1500px) {
    width: 7em;
    height: 6em;
  }
  @media screen and (max-width: 1280px) {
    /* width: 6em;
    height: 5em; */
  }
  @media screen and (max-width: 960px) {
    width: 6em;
    height: 5em;
  }
  @media (orientation: portrait) {
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
  font-size: 1em;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
