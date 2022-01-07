import styled from "styled-components";
import { motion } from "framer-motion";

export const ContactContainer = styled.div`
  width: 80%;
  height: 75vh;
  margin-top: 2.6em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 22px;
  /* overflow: hidden; */
  @media screen and (max-width: 1500px) {
    font-size: 18px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 13px;
  }
`;
export const ContactForm = styled(motion.form)`
  /* background-color: cadetblue; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 45%;
  max-width: 500px;
  margin-left: 5em;

  @media screen and (max-width: 1500px) {
    max-width: 300px;
  }
`;
export const ContactInfo = styled(motion.div)`
  /* transform: translate(3em, -5em); */
  /* background-color: yellowgreen; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: fit-content;
  width: 15em;
  margin: 0 0 5em 5em;
`;
export const ContactInfoTitle = styled.h2`
  font-family: "bebas neue";
  font-size: 0.9em;
  color: rgba(51, 51, 51, 0.75);
  letter-spacing: 0.1em;
`;
export const ContactText = styled.p`
  font-family: "montserrat";
  font-size: ${(props) => (props.primary ? ".7em" : ".8em")};
  color: #333;
  letter-spacing: 0.1em;
  margin-bottom: ${(props) => (props.primary ? "0;" : "1.5em;")};
  padding: ${(props) => (props.primary ? "0;" : "0.2em 0;")};
`;
export const ContactInput = styled.input`
  width: 100%;
  height: 3em;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid #333;
  padding-left: 1em;
  margin-top: 2em;
  font-family: 'poppins';
  &:focus {
    box-shadow: 0px 0px 3px 0.1px #333;
    outline: none;
    &::-webkit-input-placeholder {
      color: rgba(1, 212, 191, 0.75);
    }
  }
  &[type="text"] {
    color: #333;
  }
  &::-webkit-input-placeholder {
    color: rgba(51, 51, 51, 0.75);
  }
  @media screen and (max-width: 1500px) {
    margin-top: 1em;
  }
`;
export const ContactMessage = styled.textarea`
  width: 100%;
  height: 10em;
  resize: none;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid #333;
  padding: 1em;
  margin-top: 2em;
  &[type="text"] {
    color: #333;
    font-family: "poppins";
  }
  &:focus {
    box-shadow: 0px 0px 3px 0.1px #333;
    outline: none;
    &::-webkit-input-placeholder {
      color: rgba(1, 212, 191, 0.75);
    }
  }
  &::-webkit-input-placeholder {
    color: rgba(51, 51, 51, 0.75);
    font-family: "montserrat";
  }
  @media screen and (max-width: 1500px) {
    margin-top: 1em;
  }
`;
export const ButtonContact = styled.button`
  font-family: "bebas neue";
  font-size: 18px;
  letter-spacing: 0.1em;
  line-height: 50px;
  align-self: flex-end;
  background-color: #01d4bf;
  border: none;
  color: #fff;
  width: 150px;
  height: 50px;
  margin-top: 2em;
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
  @media screen and (max-width: 1500px) {
    margin-top: 1em;
    width: 100px;
    height: 50px;
    margin-bottom: 1em;
  }
`;
export const ContactTitle = styled.h2`
  font-size: 5em;
  font-family: "bebas neue";
  color: #333;
  margin-bottom: -0.2em;
  @media screen and (max-width: 1500px) {
    font-size: 3em;
  }
`;
