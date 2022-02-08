import styled from "styled-components";
import { motion } from "framer-motion";

export const TextContainer = styled(motion.div)`
  width: 80%;
  @media (orientation: portrait) and (max-width: 768px) {
    width: 100%;
  }
`;
export const Title = styled.h2`
  font-size: 3em;
  color: #333;
  letter-spacing: 0.04em;
  line-height: 1em;

  @media (orientation: portrait) and (max-width: 768px) {
    white-space: nowrap;
    text-align: center;
    font-size: 3.5em;
  }
`;
export const Text = styled(motion.p)`
  font-size: 0.8em;
  font-family: "poppins";
  font-weight: 300;
  color: #333;
  @media (orientation: portrait) and (max-width: 768px) {
    text-align: center;
    font-size: 1em;
  }
`;

export const DefaultPageColumn = styled(motion.div)`
  width: ${(props) => (props.primary ? "45%" : "55%")};
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.primary ? "flex-start" : "center")};
  gap: 2em;
  @media (orientation: portrait) and (max-width: 768px) {
    justify-content: ${(props) => (props.primary ? "flex-start" : "center")};
    width: 80%;
    margin-top: ${(props) => (props.primary ? "0" : "4em")};
  }
`;
export const PhotoContainer = styled(motion.img)`
  width: 25em;
`;
