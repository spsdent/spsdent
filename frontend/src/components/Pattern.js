import styled from "styled-components";
import { motion } from "framer-motion";
export const Pattern = styled(motion.img)`
  width: 21em;
  height: 10em;
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  z-index: -1;
  /* @media screen and (max-width: 1600px) {
    width: 450px;
    height: 200px;
  }
  @media screen and (max-width: 1400px) {
    width: 350px;
    height: 150px;
  }
  @media screen and (max-width: 1280px) {
    width: 250px;
    height: 100px;
  }
  @media screen and (max-width: 960px) {
    width: 200px;
    height: 50px;
  } */
`;
