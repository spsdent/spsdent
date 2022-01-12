import styled from "styled-components";
import { motion } from "framer-motion";

export const Title = styled.h1`
  font-size: 4em;
  letter-spacing: 0.06em;
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
  line-height: 1.1em;
`;
export const OurStaffContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: cadetblue;
`;
export const TitleContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const CardsContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: #666;
  position: relative;
`;
export const Card = styled(motion.div)`
  position: absolute;
  top: 10%;
  left: 0;
  background-color: #fff;
  width: 15em;
  height: 20em;
  border: 3px solid #333;
  border-radius: 0.6em;
  box-shadow: 1px 1px 15px;
`;
export const CardPicture = styled.div`
  width: 10em;
  height: 10em;
  /* border: 3px solid #01d4bf; */
  box-shadow: 1px 1px 5px;
  border-radius: 0.5em;
  margin: 1.5em auto 0 auto;
  background-image: url("./doctor2.png");
  background-size: cover;
`;
export const CardText = styled.p`
  font-size: ${(props) => (props.primary ? ".8em" : ".6em")};
  color: #333;
  text-align: center;
  font-family: "poppins";
  font-weight: 400;
  padding: 0.3em 0.5em;
  -webkit-touch-callout: none; 
  -webkit-user-select: none; 
  -khtml-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none;
`;
