import styled from "styled-components";
import { motion } from "framer-motion";

export const Title = styled(motion.h1)`
  font-size: 4.5em;
  letter-spacing: 0.05em;
  color: #333;
  position: fixed;
  z-index: 3;
`;
export const CabinetColumn = styled(motion.div)`
  width: ${(props) => (props.primary ? "57%" : "43%")};
  height: ${(props) => (props.primary ? "fit-content" : "100%")};
  /* background-color: ${(props) => (props.primary ? "cadetblue" : "#656")}; */
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.primary ? "flex-start" : "center")};
  align-items: ${(props) => (props.primary ? "flex-start" : "center")};
`;
export const PhotoCabinet = styled(motion.div)`
  background-image: ${(props) => props.src};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 31em;
  z-index: 2;
  border-left: 1em solid #01d4bf;
  text-align: center;
`;
export const RectangleContainer = styled.div``;
export const Rectangle = styled(motion.div)`
  border: 0.6em solid #01d4bf;
  width: 8em;
  height: 15em;
  position: fixed;
`;
