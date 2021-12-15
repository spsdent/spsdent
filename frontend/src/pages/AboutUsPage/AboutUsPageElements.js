import styled from "styled-components";
import { motion} from "framer-motion";

export const Title = styled(motion.h1)`
  font-size: 5em;
  letter-spacing: 5px;
  color: #333;
  line-height: 1em;
  white-space: nowrap;
  /* background-color: red; */
  @media screen and (max-width: 768px) {
    margin-top: ${props => props.primary ? "-2em" : "0"};
    text-align: center;
    font-size: 2.5em;
  }
`;
export const Content = styled(motion.div)`
  /* background-color: gray; */
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;
export const ContentImage = styled.img`
  width: 15em;
  height: 15em;
  /* border: 1px solid rgb(51, 51, 51); */
  box-shadow: 0px 0px 8px;
  margin-top: 1em;
  @media screen and (max-width: 768px) {
    margin: .5em auto;

  }
`;
export const ContentText = styled.p`
  font-family: "montserrat", "Poppins";
  font-weight: 500;
  font-size: 0.9em;
  color: #333;
  line-height: 1.4em;
  padding-right: 5px;
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
  @media screen and (max-width: 768px) {
    margin: 1.5em auto;
  }
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

export const AboutUsContainer = styled.div`
  /* background-color: #444; */
  width: 80%;
  height: 75vh;
  margin-top: 2.2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  @media screen and (max-width: 1500px) {
    font-size: 16px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 14px;
  }
  @media screen and (max-width: 960px) {
    font-size: 11px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  @media screen and (max-width: 768px) {
    
  }
  `;
export const PickButton = styled(motion.button)`
position: fixed;
top: ${(props) => (props.primary ? "30%" : "60%")};
left: 25%;
display: flex;
justify-content: flex-start;
align-items: flex-end;
width: 7em;
height: 5em;
font-size: 1.5em;
background-color: #666;
border-radius: 10px;
font-family: "bebas neue";
color: white;
cursor: pointer;
padding-left: .5em;
background-image: ${(props) =>
  props.primary ? "url('aboutUsButton.png');" : "url('aboutUsButton1.png');"}
background-size: cover;
border-style: none;
@media screen and (max-width: 768px) {
  position: absolute;
  top: 5em;
  left: ${props => props.primary ? "25%" : "60%"};
}
@media screen and (max-width: 600px) {
  left: ${props => props.primary ? "20%" : "55%"};
  width: 5em;
  height: 3em;
}
`;
export const AboutUsContent = styled(motion.div)`
  /* background-color: yellowgreen; */
  width: 50%;
  height: 100%;
  padding: 0 20px;
  transition: 0.5s ease;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin-top: 25em;
  }
`;
