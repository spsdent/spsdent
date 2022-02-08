import styled from "styled-components";
import { motion } from "framer-motion";
import { CgArrowsVAlt } from "react-icons/cg";
import { keyframes } from "styled-components";

const scrollAnimation = keyframes`
0% {transform: translateY(30%); opacity: 1;}
50% {transform: translateY(-50%); opacity: .6;}
100% {transform: translateY(30%); opacity: 1;}
`;

export const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 32px;
  @media screen and (max-width: 2000px) {
    font-size: 27px;
  }
  @media screen and (max-width: 1700px) {
    font-size: 24px;
  }
  @media screen and (max-width: 1600px) {
    font-size: 22px;
  }
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1400px) {
    font-size: 18px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 20em;
  }

`
export const Title = styled(motion.h1)`
  font-size: 4.5em;
  letter-spacing: 0.05em;
  color: #333;
  position: fixed;
  z-index: 3;

  @media screen and (max-width: 768px) {
    position: absolute;
  }
`;
export const CabinetColumn = styled(motion.div)`
  width: ${(props) => (props.primary ? "60%" : "40%")};
  height: ${(props) => (props.primary ? "fit-content" : "100%")};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.primary ? "flex-start" : "center")};
  align-items: ${(props) => (props.primary ? "flex-start" : "center")};
  padding: ${(props) => (props.primary ? "3em 2em" : "0")};
  
  gap: 3em;


  @media screen and (max-width: 768px) {
    width: ${props => props.primary ? "auto" : "40%"};
    margin-top: ${(props) => (props.primary ? "10em" : "0")};
  }
`;
export const PhotoCabinet = styled(motion.div)`
  background-image: ${(props) => props.src};
  background-size: cover;
  background-position: center;
  width: 25em;
  height: 25em;
  border: ${(props) =>
    props.primary ? ".6em solid #01d4bf" : ".6em solid #333"};
  align-self: ${(props) => (props.primary ? "flex-start" : "flex-end")};
  border-radius: 0.5em;
  z-index: 20;
`;
export const RectangleContainer = styled.div``;
export const Rectangle = styled(motion.div)`
  border: 0.6em solid #01d4bf;
  width: 8em;
  height: 15em;
  position: fixed;
  border-radius: 0.5em;
  @media screen and (max-width: 768px) {
    position: absolute;
  }
`;
export const Scroll = styled(CgArrowsVAlt)`
  color: #333;
  font-size: 2em;
  animation: ${scrollAnimation} 2s ease infinite;
`;
export const ScrollContainer = styled(motion.div)`
  bottom: 2em;
  position: fixed;
  z-index: 20;

`;
