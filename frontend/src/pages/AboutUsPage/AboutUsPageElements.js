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
// export const Content = styled(motion.div)`
//   /* background-color: gray; */
//   display: flex;
//   flex-direction: column;
//   @media screen and (max-width: 768px) {
//     text-align: center;
//   }
// `;
// export const ContentImage = styled.img`
//   width: 15em;
//   height: 15em;
//   /* border: 1px solid rgb(51, 51, 51); */
//   box-shadow: 0px 0px 8px;
//   margin-top: 1em;
//   @media screen and (max-width: 768px) {
//     margin: .5em auto;

//   }

// export const CabinetImage = styled.img`
//   width: 90%;
//   align-self: ${(props) => (props.primary ? "flex-start" : "flex-end")};
//   margin: 1.8em 0;
//   box-shadow: 0px 0px 8px;
//   /* border: 1px solid rgb(51, 51, 51); */
// `;
// export const Gallery = styled(motion.div)`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 4em;
// `;

// export const AboutUsContainer = styled.div`
//   /* background-color: #444; */
//   width: 80%;
//   height: 75vh;
//   margin-top: 2.2em;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   font-size: 20px;
//   @media screen and (max-width: 1500px) {
//     font-size: 16px;
//   }
//   @media screen and (max-width: 1280px) {
//     font-size: 14px;
//   }
//   @media screen and (max-width: 960px) {
//     font-size: 11px;
//   }
//   @media screen and (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }
// `;
// export const PickContainer = styled.div`
//   /* background-color: cadetblue; */

//   width: 30%;
//   height: 100%;
//   font-size: 24px;

//   @media screen and (max-width: 1500px) {
//     font-size: 20px;
//   }
//   @media screen and (max-width: 1280px) {
//     font-size: 20px;
//   }
//   @media screen and (max-width: 960px) {
//     font-size: 16px;
//   }
//   @media screen and (max-width: 768px) {

//   }
//   `;
// export const PickButton = styled(motion.button)`
// position: fixed;
// top: ${(props) => (props.primary ? "30%" : "60%")};
// left: 25%;
// display: flex;
// justify-content: flex-start;
// align-items: flex-end;
// width: 7em;
// height: 5em;
// font-size: 1.5em;
// background-color: #666;
// border-radius: 10px;
// font-family: "bebas neue";
// color: white;
// cursor: pointer;
// padding-left: .5em;
// background-image: ${(props) =>
//   props.primary ? "url('aboutUsButton.png');" : "url('aboutUsButton1.png');"}
// background-size: cover;
// border-style: none;
// @media screen and (max-width: 768px) {
//   position: absolute;
//   top: 5em;
//   left: ${props => props.primary ? "25%" : "60%"};
// }
// @media screen and (max-width: 600px) {
//   left: ${props => props.primary ? "20%" : "55%"};
//   width: 5em;
//   height: 3em;
// }
// `;
// export const AboutUsContent = styled(motion.div)`
//   /* background-color: yellowgreen; */
//   width: 50%;
//   height: 100%;
//   padding: 0 20px;
//   transition: 0.5s ease;
//   @media screen and (max-width: 768px) {
//     width: 90%;
//     margin-top: 25em;
//   }
// `;
