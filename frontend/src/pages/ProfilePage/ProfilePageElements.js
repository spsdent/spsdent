import styled from "styled-components";
import { motion } from "framer-motion";

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
  gap: .7em;
  margin-bottom: .5em;
`;

export const Title = styled(motion.h1)`
  font-size: 4em;
  letter-spacing: .06em;
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
  line-height: 1em;
  white-space: nowrap;
`;

// export const EmptyListHeading = styled(Title)`
//   font-size: 2.5rem;
//   text-decoration: underline;
//   color: salmon;
// `

export const DashboardContainer = styled.div`
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
padding-bottom: .25em;
`;
export const VitalInfoText = styled.p`
font-family: 'poppins';
font-size: ${props => props.primary ? ".7em" : ".9em"};
color: ${props => props.primary ? "rgba(51,51,51,.5)" : "#333"};
line-height: 1.2em;
`;
export const VitalInfoEdit = styled.input``;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  flex-grow: 1;
  padding-top: 1em;
`;
export const ButtonDashboard = styled(motion.button)`
outline: none;
border: none;
background-color: #333;
color: #fff;
font-family: 'bebas neue';
padding: .4em 0;
font-size: .8em;
border-radius: 8px;
letter-spacing: 0.05em;
min-width: 9em;
`;
export const PasswordChangeContainer = styled.div``;

export const DashboardVisitContainer = styled.div`
display: flex;
`;

export const DashboardVisit = styled.div`
  flex-grow: 1;
`;

export const DashboardVisitTitle = styled.h2`
font-size: 1em;
font-family: 'poppins';
color: #333;
margin-bottom: .6em;
`;

export const DashboardVisitText = styled.p`
font-family: 'poppins';
color: ${props => props.primary ? "rgba(51,51,51,.5)" : "rgba(51,51,51,.7)"};
text-transform: ${props => props.primary ? "uppercase" : "none"};
font-size: ${props => props.primary ? ".6em": ".8em"};
line-height: 1.3em;
margin-bottom: ${props => props.primary ? "0" : ".6em"};
`;

export const DashboardVisitButton = styled(motion.button)`
outline: none;
border: 2px solid #333;
color: #333;
font-family: 'poppins';
padding: .4em 0;
font-size: .7em;
border-radius: 8px;
letter-spacing: 0.05em;
min-width: 11em;
background-color: rgba(0,0,0,.0);
margin-top: .2em;
`