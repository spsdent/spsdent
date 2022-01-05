import styled from "styled-components";
import { motion } from "framer-motion";

export const VisitsPageContainer = styled.div`
  width: 80%;
  height: 75vh;
  margin-top: 2.6em;
  font-size: 24px;
  @media screen and (max-width: 1500px) {
    font-size: 18px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14px;
  }
`;
export const VisitsPageTitleContainer = styled.div`
  display: flex;
  margin: 1.5em;
`;
export const VisitsPageTitle = styled(motion.h1)`
  font-size: 4em;
  letter-spacing: 0.05em;
  margin-left: 0.25em;
  color: ${(props) => (props.primary ? "#01D4BF" : "#333")};
`;
export const VisitsContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const Headers = styled(motion.div)`
  height: fit-content;
  padding: .5em 0;
  width: 96%;
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  align-items: center;
`;
export const Header = styled(motion.div)`
  width: ${(props) => (props.primary ? "35%" : "15%")};
  display: flex;
  align-items: center;
`;
export const HeaderText = styled.p`
  font-size: 0.8em;
  font-family: "poppins";
  color: #333;
  text-transform: uppercase;
`;
export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 0.35em solid transparent;
  border-right: 0.35em solid transparent;
  border-top: 0.35em solid #333;
  margin-left: 0.3em;
`;
export const VisitsListContainer = styled(motion.div)`
  height: fit-content;
  width: 105%;
  
`;
export const Visit = styled(motion.div)`
  width: 100%;
  align-self: flex-start;
  height: 5em;
  border-radius: 15px;
  background-color: rgba(255,255,255,.7);
  margin-bottom: 1em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: .7em;
  cursor: pointer;

`;
export const VisitContent = styled.p`
  font-family: "poppins";
  font-size: 0.8em;
  color: rgba(117,117,117);
  width: ${(props) => (props.primary ? "30%" : "12%")};
`;
export const VisitDelete = styled.div`
margin-right: 1em;
color: rgba(117,117,117);
`