import styled from "styled-components";
import { motion } from "framer-motion";
import { CgArrowsVAlt } from "react-icons/cg";
import { keyframes } from "styled-components";

const scrollAnimation = keyframes`
0% {transform: translateY(30%); opacity: 1;}
50% {transform: translateY(-50%); opacity: .6;}
100% {transform: translateY(30%); opacity: 1;}
`;
export const Title = styled(motion.h1)`
  font-size: 4.5em;
  letter-spacing: 0.05em;
  color: #333;
  position: fixed;
  z-index: 3;
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
    display: ${(props) => (props.primary ? "flex" : "none")};
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
`;
export const RectangleContainer = styled.div``;
export const Rectangle = styled(motion.div)`
  border: 0.6em solid #01d4bf;
  width: 8em;
  height: 15em;
  position: fixed;
  border-radius: 0.5em;
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
  align-self: flex-end;
`;
