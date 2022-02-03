import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const TitleContainer = styled.div`
  /* background-color: cadetblue; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding-bottom: 1.5em;
`;
export const LoginButton = styled.button`
  width: 8em;
  height: 3em;
  outline: none;
  border: none;
  font-family: "bebas neue", "poppins";
  font-size: 0.8em;
  /* letter-spacing: .05em; */
  color: #fff;
  background-color: #01d4bf;
  transition: 0.2s ease;
  margin-bottom: 1em;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
  &:active {
    transform: scale(1.1);
  }
`;
export const AddVisitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
  position: absolute;
  top: 6em;

`;
export const LoginContainer = styled(motion.div)`
  width: 26em;
  height: ${props => props.register ? "fit-content" : "23em"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 47px -36px rgba(51, 51, 51, .5);
  padding: 2em 0;
  font-size: 24px;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media screen and (max-width: 960px) {
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 3.5em;
  /* background-color: gray; */
`;
export const TextContainer = styled.div`
  display: flex;
  gap: 0.2em;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #01d4bf;
`;
