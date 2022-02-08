import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5em;
  height: 3em;
  padding: 1em 1em 1em 6em;
  position: fixed;
  z-index: 100;
  @media screen and (max-width: 768px) {
    padding-left: 0;
    justify-content: center;
    width: 100%;
  }
`;
export const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
  padding: 0.3em 0.6em;
  border-radius: 15px;
  transition: 0.2s ease;
  &:hover {
    background-color: #fdfdfd;
  }
`;
export const CircleButton = styled.div`
  border-radius: 50%;
  border: none;
  outline: none;
  width: 2em;
  height: 2em;
  background-color: #333;
  transition: 0.2s ease;
  cursor: pointer;
  font-size: .45em;
`;
export const ButtonText = styled.p`
  font-family: "poppins";
  font-size: 0.6em;
  white-space: nowrap;
`;
export const ContentContainer = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: ${(props) => (props.primary ? "#333" : "#eee")};
  z-index: 1;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
  `;
