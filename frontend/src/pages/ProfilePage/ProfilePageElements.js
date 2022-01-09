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

// export const EmptyListHeading = styled(Title)`
//   font-size: 2.5rem;
//   text-decoration: underline;
//   color: salmon;
// `

export const DashboardContainer = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.7);
  height: fit-content;
  padding: 2em 3em;
  border-radius: 15px;
`;
export const VitalInfoContainer = styled.div`
  display: flex;
  margin-bottom: 1em;
`;
export const VitalInfoSocket = styled.div`
  padding: 0.4em 0 0.1em 0;
`;
export const VitalInfoText = styled.p`
  font-family: "poppins";
  font-size: ${(props) => (props.primary ? ".7em" : ".9em")};
  color: ${(props) => (props.primary ? "rgba(51,51,51,.5)" : "#333")};
  line-height: 1.2em;
  margin-bottom: ${(props) => (props.password ? "1em" : "0")};
`;
export const VitalInfoEdit = styled(Field)`
  width: 60%;
  border: none;
  font-family: "poppins";
  background-color: rgba(51, 51, 51, 0.1);
  border-radius: 5px;
  padding: 0.4em;
  margin-bottom: ${(props) => (props.password ? "2.5em" : "0")};
  font-size: 0.7em;
  color: rgba(51, 51, 51, 0.7);
  outline: none;

  &:focus {
    color: #333;
    background-color: rgba(51, 51, 51, 0.2);
  }
`;
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  flex-grow: 1;
  padding-top: 1em;
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
export const PasswordChangeContainer = styled.div`
  /* background-color: cadetblue; */
  display: flex;
  flex-direction: column;
  align-items: center;c
  justify-content: flex-start;
  gap: 0.6em;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1em;
  margin: 0 2em 0 0;
  width: 15em;
  height: 13em;
`;

export const DashboardVisitContainer = styled.div`
  display: flex;
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
  width: 60%;
  margin-top: 1em;
  cursor: pointer;
  &:active {
    background-color: #01d4bf;
  }
`;
