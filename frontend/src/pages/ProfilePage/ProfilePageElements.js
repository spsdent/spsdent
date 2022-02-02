import styled from "styled-components";
import { motion } from "framer-motion";
import { Formik, Field, Form } from "formik";

export const Container = styled.div`
  width: 70%;
  height: 75vh;
  margin-top: 2.5em;
  font-size: 23px;
  font-family: "Poppins";
  @media screen and (max-width: 1600px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1400px) {
    font-size: 15px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 14px;
  }
  @media screen and (max-width: 960px) {
    font-size: 13px;
  }
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

export const TitleContainer = styled.div`
  font-family: "bebas neue";
  display: flex;
  align-items: center;
  gap: 0.7em;
  margin-bottom: 0.5em;
`;

export const Title = styled(motion.h1)`
  font-size: 4em;
  letter-spacing: 0.06em;
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
  line-height: 1em;
  white-space: nowrap;
`;

export const DashboardContainer = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.7);
  height: fit-content;
  padding: 2em 3em;
  border-radius: 15px;
  
`;
export const VitalInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;
  transition: 1s ease;
  justify-content: space-around;
  gap: 1em;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const VitalInfoSocket = styled(motion.div)`
  padding: 0.4em 0 0.1em 0;
  /* background-color: red; */
`;
export const VitalInfoText = styled.p`
  font-family: "poppins";
  font-size: ${(props) => (props.primary ? ".6em" : ".75em")};
  color: ${(props) => (props.primary ? "rgba(51,51,51,.5)" : "#333")};
  line-height: 1.2em;
  margin-bottom: ${(props) => (props.password ? "1em" : "0")};
`;
export const VitalInfoEditContainer = styled(motion.div)`
  width: 8em;
  border: none;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;
export const VitalInfoEdit = styled(Field)`
  width: 12em;
  height: ${(props) => (props.password ? "2em" : "100%")};
  padding: 0.4em;
  background-color: rgba(51, 51, 51, 0.1);
  border-radius: 5px;
  /* margin-bottom: ${(props) => (props.primary ? "2.5em" : "0")}; */
  font-family: "poppins";
  font-size: 0.6em;
  color: rgba(51, 51, 51, 0.7);
  outline: none;
  border: none;
  &:focus {
    color: #333;
    background-color: rgba(51, 51, 51, 0.2);
  }
`;
export const VitalInfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding-right: 1em;
  
  @media screen and (max-width: 968px) {
    flex-direction: column;
  }
  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }
`;
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  padding: 1em;
  cursor: pointer;
`;
export const ButtonDashboard = styled(motion.button)`
  outline: none;
  border: none;
  background-color: #333;
  color: #fff;
  font-family: "bebas neue";
  padding: 0.4em 0;
  font-size: 0.8em;
  border-radius: 8px;
  letter-spacing: 0.05em;
  width: 9em;
  cursor: pointer;

  &:active {
    background-color: #01d4bf;
  }
`;
export const PasswordChangeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6em;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1em;
  width: 10em;
  height: 13em;
  margin: 0 auto;
`;

export const DashboardVisitContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 968px) {
    flex-direction: column;
  }
`;

export const DashboardVisit = styled.div`
  flex-grow: 1;
`;

export const DashboardVisitTitle = styled.h2`
  font-size: 1em;
  font-family: "poppins";
  color: #333;
  margin-bottom: 0.6em;
`;

export const DashboardVisitText = styled.p`
  font-family: "poppins";
  color: ${(props) =>
    props.primary ? "rgba(51,51,51,.5)" : "rgba(51,51,51,.7)"};
  text-transform: ${(props) => (props.primary ? "uppercase" : "none")};
  font-size: ${(props) => (props.primary ? ".6em" : ".8em")};
  line-height: 1.3em;
  margin-bottom: ${(props) => (props.primary ? "0" : ".6em")};
`;

export const DashboardVisitButton = styled(motion.button)`
  outline: none;
  border: 2px solid #333;
  color: #333;
  font-family: "poppins";
  padding: 0.4em 0;
  font-size: 0.7em;
  border-radius: 8px;
  letter-spacing: 0.05em;
  min-width: 11em;
  background-color: rgba(0, 0, 0, 0);
  margin-top: 0.2em;
  cursor: pointer;
`;
export const ButtonVitalInfo = styled(motion.button)`
  outline: none;
  border: none;
  background-color: #333;
  color: #fff;
  font-family: "bebas neue";
  padding: 0.4em 0;
  font-size: 0.8em;
  border-radius: 8px;
  letter-spacing: 0.05em;
  width: 8em;
  margin-top: 1em;
  white-space: nowrap;
  cursor: pointer;
  &:active {
    background-color: #01d4bf;
  }
`;
