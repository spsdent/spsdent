import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  width: 85%;
  display: flex;
  flex-direction: column;
  font-size: 27px;
  @media screen and (max-width: 1700px) {
    font-size: 24px;
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
    font-size: 14.5px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
  padding-left: 1em;
  height: 3em;
  padding: 1em;
`;
export const ButtonContainer = styled.div`
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
export const CircleButton = styled.button`
  border-radius: 50%;
  border: none;
  outline: none;
  width: 2em;
  height: 2em;
  background-color: #333;
  transition: 0.2s ease;
  cursor: pointer;
`;
export const ButtonText = styled.p`
  font-family: "poppins";
  font-size: 0.6em;
`;
export const ContentContainer = styled(motion.div)`
  height: fit-content;
  width: 100%;
  height: 100%;
  display: flex;
`;