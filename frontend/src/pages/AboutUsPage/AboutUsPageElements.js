import styled from "styled-components";
import {motion, AnimatePresence} from 'framer-motion';
export const AboutUsContainer = styled.div`
  /* background-color: #444; */
  width: 80%;
  height: 75vh;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PickContainer = styled.div`
  /* background-color: cadetblue; */
  width: 30%;
  height: 100%;
`;
export const AboutUsContent = styled(motion.div)`
  /* background-color: yellowgreen; */
  width: 50%;
  height: 100%;
  padding: 0 20px;
  transition: 0.5s ease;
`;
export const Title = styled(motion.h1)`
  font-size: 120px;
  letter-spacing: 5px;
  color: #333;
  line-height: 85%;
  white-space: nowrap;
`;
export const Content = styled(motion.div)`
  /* background-color: gray; */
  display: flex;
  flex-direction: column;
`;
export const ContentImage = styled.img``;
export const ContentText = styled.p`
  font-family: "montserrat", "Poppins";
  font-weight: 500;
  font-size: 20px;
  color: #333;
`;
export const FogAboutUs = styled.div`
  background-color: #eee;
  width: 80%;
  height: 14vh;
  position: fixed;
  bottom: 0;
  right: 0;
`;
