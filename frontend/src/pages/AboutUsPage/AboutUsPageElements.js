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
  /* background-color: #343; */
  height: fit-content;
  width: 100%;
  height: 100%;
  display: flex;
`;
export const Title = styled(motion.h1)`
  font-size: ${(props) => (props.primary ? "2em" : "3.5em")};
  letter-spacing: 0.05em;
  color: ${(props) => (props.color ? "#fff" : "#333")};
  line-height: 0.9em;
  padding-top: ${(props) => (props.primary ? "0" : ".2em")};
  padding-bottom: ${(props) => (props.primary ? ".2em" : "0")};
  white-space: nowrap;
  font-family: ${(props) => (props.primary ? "poppins" : "bebas neue")};
`;
export const TextContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.primary ? "20em" : "15em")};
  height: ${(props) => (props.primary ? "11em" : "9em")};
  background-color: ${(props) => (props.primary ? "#333" : "#01d4bf")};
  border-radius: ${(props) => (props.primary ? ".6em" : ".4em")};
  position: absolute;
  top: ${(props) => (props.primary ? "22em" : "7em")};
  left: ${(props) => (props.primary ? "17em" : "45em")};
  z-index: 2;
  padding: 1em;
`;
export const TextWrap = styled(motion.div)`
  position: fixed;
  top: 36.5em;
  right: 10em;
  width: 30em;
  font-family: "poppins";
  font-size: 0.7em;
z-index: 2;
`;
export const Text = styled(motion.p)`
  font-size: 0.7em;
  font-family: "poppins";
  font-weight: 100;
  color: ${(props) => (props.primary ? "#333" : "#fff")};
  line-height: 1.15em;
`;
export const PictureContainer = styled(motion.div)`
  background-image: url("./aboutus.jpg");
  background-size: cover;
  background-position: bottom;
  width: 75%;
  height: 35%;
  position: absolute;
  top: calc(40% + 4.2em);
  left: calc(44% + 8.5em);
  transform: translate(-50%, -50%);
  border-radius: 15px;
  z-index: 1;
`;
