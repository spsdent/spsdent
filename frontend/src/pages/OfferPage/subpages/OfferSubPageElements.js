import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14.5px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const SubPageContainer = styled(motion.div)`
  width: 75%;
  /* background-color: #aaa; */
  margin-top: 7em;
  height: fit-content;
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
`;
export const HeaderImage = styled(motion.div)`
  /* background-color: cadetblue; */
  position: fixed;
  left: 7em;
  top: 1em;
  width: 90%;
  height: 7.9em;
  z-index: 1;
  background-image: ${(props) => (props.image ? props.image : null)};
  background-size: cover;
  @media screen and (max-width: 768px) {
    left: 0%;
  }
`;
export const PageTitle = styled.h1`
  font-size: 4em;
  letter-spacing: 0.1em;
  color: #333;
`;
export const PageText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #333;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const PageTextColumn = styled.ul`
  width: 45%;
  font-family: "montserrat";
  font-size: 0.8em;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
export const ComeBackButton = styled(Link)`
  text-decoration: none;
  display: block;
  margin: 2em auto;
  border-style: none;
  outline: none;
  background-color: #333;
  color: #fff;
  font-family: "bebas neue";
  letter-spacing: 0.1em;
  font-size: 1em;
  padding: 0.5em;
  transition: 0.2s ease;
  &:hover {
    background-color: #01d4bf;
  }
`;

export const List = styled.ul`
  list-style: disc;
  padding: 1em;
`;
export const ListText = styled.li`
  padding-bottom: 0.1em;
`;
