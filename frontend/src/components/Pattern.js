import styled from "styled-components";
import { motion } from "framer-motion";
export const Pattern = styled(motion.img)`
  width: 550px;
  height: 250px;
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  z-index: -2;
`;