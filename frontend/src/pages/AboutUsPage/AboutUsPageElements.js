import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

export const AboutUsContainer = styled.div`
  /* background-color: #444; */
  width: 80%;
  height: 75vh;
  margin-top: 2.2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 13px;
  }
`;
export const PickContainer = styled.div`
  /* background-color: cadetblue; */
  width: 30%;
  height: 100%;
  font-size: 24px;

  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 20px;
  }
  @media screen and (max-width: 960px) {
    font-size: 16px;
  }
`;
export const AboutUsContent = styled(motion.div)`
  /* background-color: yellowgreen; */
  width: 50%;
  height: 100%;
  padding: 0 20px;
  transition: 0.5s ease;
`;
export const Title = styled(motion.h1)`
  font-size: 5em;
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
export const ContentImage = styled.img`
  width: 15em;
  height: 15em;
  /* border: 1px solid rgb(51, 51, 51); */
  box-shadow: 0px 0px 8px;
  margin-top: 1em;
`;
export const ContentText = styled.p`
  font-family: "montserrat", "Poppins";
  font-weight: 500;
  font-size: 0.9em;
  color: #333;
  line-height: 1.4em;
  padding-right: 5px;
`;
export const FogAboutUs = styled.div`
  background-color: #eee;
  width: 80%;
  height: 14vh;
  position: fixed;
  bottom: 0;
  right: 0;
`;
export const DoctorName = styled.h2`
  font-size: 1.5em;
  margin: 0.5em 0;
  font-family: "montserrat", "Poppins";
  color: rgba(51, 51, 51);
`;
export const LineAboutUs = styled.div`
  width: 15em;
  border: 1px solid rgb(51, 51, 51);
  margin: ${(props) => (props.primary ? "0.5em auto" : "0.5em 0")};
`;
export const CabinetImage = styled.img`
  width: 90%;
  align-self: ${(props) => (props.primary ? "flex-start" : "flex-end")};
  margin: 1.8em 0;
  box-shadow: 0px 0px 8px;
  /* border: 1px solid rgb(51, 51, 51); */
`;
export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4em;
`;
