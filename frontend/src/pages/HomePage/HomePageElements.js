import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  width: 75%;
  height: 75vh;
  margin-top: 2.6em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  @media screen and (max-width: 1600px) {
    font-size: 16px;
  }
  @media screen and (max-width: 1400px) {
    font-size: 14px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 12px;
  }
  @media screen and (max-width: 960px) {
    font-size: 10px;
  }
  @media (orientation: portrait) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;
export const TextContainer = styled.div`
  width: 50%;
  height: fit-content;
  @media screen and (orientation: portrait) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const HeaderWelcome = styled(motion.h2)`
  font-size: ${(props) => (props.primary ? "1.6em" : "4em")};
  letter-spacing: 0.07em;
  color: #333;
  line-height: 0.85em;
`;
export const StyledSpan = styled.span`
  color: ${(props) => (props.primary ? "#333" : "#01d4bf")};
`;
export const HeaderText = styled(motion.p)`
  font-family: "montserrat", "Poppins";
  font-weight: 300;
  width: 85%;
  font-size: 0.9em;
  margin: 1em 0 1.5em 0;
  line-height: 1.3em;
`;
export const ButtonContainer = styled(motion.div)`
  display: flex;
  width: fit-content;
  align-items: center;
  width: 11.5em;
  height: 2.6em;
`;
export const ButtonSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 24%;
  height: 100%;
  background-color: #333;
  transition: 0.3s ease;
  ${ButtonContainer}:hover & {
    background-color: #01d4bf;
    transform: translateX(25%);
  }
`;
export const AddVisitButton = styled(motion.button)`
  background-color: #01d4bf;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 76%;
  height: 100%;
  font-size: 0.9em;
  letter-spacing: 0.06em;
  transition: 0.3s ease;
  font-family: "bebas neue", "poppins", "sans-serif";
  ${ButtonContainer}:hover & {
    background-color: #333;
  }
`;
export const HeaderPhotoContainer = styled.div`
  width: 50%;
  height: 100%;
`;
export const PhotoHeader = styled(motion.img)`
  border: none;
  border-radius: 15px;
  width: ${(props) => (props.primary ? "14em" : "19em")};
  position: absolute;
  top: ${(props) => (props.primary ? "45%" : "21%")};
  right: ${(props) => (props.primary ? "15%" : "20%")};
  @media screen and (orientation: portrait) {
    display: none;
  }
`;