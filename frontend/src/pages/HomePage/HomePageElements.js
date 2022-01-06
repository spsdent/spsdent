import styled, { css } from "styled-components";
import { motion } from "framer-motion";
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10vh;
  width: 85%;
  height: 67vh;
  /* overflow: hidden; */
  /* background-color: #444444; */

  /* @media (orientation: portrait) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  } */
`;
export const TextContainer = styled(motion.div)`
  /* transform: translate(10%, 10%); */
  width: 50%;
  height: fit-content;
  margin-left: 2em;
  /* margin-top: 4em; */
  /* background-color: #777; */
  @media screen and (max-width: 1570px) {
    margin-top: 2em;

  }
  @media screen and (max-width: 1280px) {

  }
  @media screen and (max-width: 960px) {

  }
  @media screen and (max-width: 768px) {
    margin: 4em auto;
    text-align: center;
    position: absolute;
    margin: 4em 0;
    top: 10%;
    left: 25%;
    transform: translate(-50%, -50%);
  }
  @media (orientation: portrait) {
    text-align: center;
    position: absolute;
    margin: 4em 0;
    top: 10%;
    left: 30%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 768px) and (orientation: portrait) {
    text-align: center;
    position: absolute;
    margin: 4em 0;
    top: 10%;
    left: 25%;
    transform: translate(-50%, -50%);
  }
`;
export const HeaderWelcome = styled.h1`
  font-size: 80px;
  letter-spacing: 5px;
  color: #333;
  width: 100%;
  @media screen and (max-width: 1570px) {
    font-size: 64px;
    letter-spacing: 3px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 48px;
    letter-spacing: 2px;
  }
  @media screen and (max-width: 960px) {
    font-size: 32px;
    letter-spacing: 1px;
  }
  /* @media (orientation: portrait) {
    margin-top: 35vh;
  } */
`;
export const HeaderText = styled.p`
  font-family: "montserrat","Poppins";
  font-weight: 300;
  margin-bottom: 15px;
  width: 70%;
  font-size: 18px;
  color: #333;
  line-height: 1.3em;
  /* background-color: #444; */
  @media screen and (max-width: 1570px) {
    font-size: 16px;
    margin-bottom: 10px 0;
    line-height: 0.9rem;
  }
  @media screen and (max-width: 1280px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 960px) {
    font-size: 12px;
    line-height: 0.7rem;
  }
  @media screen and (max-width: 768px) {
    margin: 1em auto;   
  }
  @media (orientation: portrait) {
    margin: 30px auto;
    text-align: center;
    width: 100%;
  }
`;
export const ButtonContainer = styled.button`
  display: flex;
  width: 255px;
  height: 64px;
  border-style: none;
  cursor: pointer;
  @media screen and (max-width: 1570px) {
    height: 55px;
    width: 217px;
  }
  @media screen and (max-width: 1280px) {
    height: 50px;
    width: 200px;
  }
  @media screen and (max-width: 960px) {
    height: 45px;
    width: 180px;
  }
  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }
  @media (orientation: portrait) {
    margin: 40px auto;
  }
`;
export const AddVisitButton = styled.button`
  /* display: flex; */
  width: 190px;
  height: 100%;
  border: none;
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  font-family: "bebas neue";
  letter-spacing: 1px;
  background-color: #01d4bf;
  transition: 0.3s ease;
  cursor: pointer;
  border-radius: 0 10px 10px 0;
  ${ButtonContainer}:hover & {
    background-color: #333;
  }
  @media screen and (max-width: 1570px) {
    font-size: 18px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14px;
  }
`;
export const ButtonSpan = styled.span`
  width: 65px;
  height: 100%;
  background-color: #333;
  color: #fff;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease;
  border-radius: 10px 0 0 10px;
  ${ButtonContainer}:hover & {
    background-color: #01d4bf;
    transform: translateX(25%);
  }
  @media screen and (max-width: 1570px) {
    font-size: 28px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 26px;
  }
  @media screen and (max-width: 960px) {
    font-size: 24px;
  }
`;
export const HeaderPhotoContainer = styled.div`
  height: 100%;
  flex-basis: 45%;
  transform: translateX(5%);
  /* background-color: #444444; */
  margin-right: 20px;
`;
export const PhotoHeader = styled(motion.img)`
  border: none;
  height: ${(props) => (props.primary ? "477px" : "600px")};
  width: ${(props) => (props.primary ? "343px" : "431px")};
  border-radius: 15px;
  /* max-height: ${(props) => (props.primary ? "54vh" : "64vh")}; */
  /* transform: ${(props) =>
    props.primary ? "translate(45%, -92%)" : "translateY(0%)"}; */
  position: absolute;
  top: ${(props) => (props.primary ? "35%" : "0")};
  left: ${(props) => (props.primary ? "25%" : "0")};
  @media screen and (max-width: 1570px) {
    height: 553px;
    width: 398px;
  }
  @media screen and (max-width: 1280px) {
    height: 497px;
    width: 358px;
  }
  @media screen and (max-width: 960px) {
    height: 448px;
    width: 323px;
  }
  @media screen and (max-height: 840px) {
    height: 404px;
    width: 291px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media (orientation: portrait) {
    display: none;
  }

  ${(props) =>
    props.primary &&
    css`
      display: block;
      @media screen and (max-width: 1570px) {
        height: 434px;
        width: 312px;
      }
      @media screen and (max-width: 1280px) {
        height: 378px;
        width: 272px;
      }
      @media screen and (max-width: 960px) {
        height: 319px;
        width: 230px;
      }
      @media screen and (max-height: 840px) {
        height: 280px;
        width: 202px;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
      @media (orientation: portrait) {
        display: none;
      }
    `}
`;
export const StyledSpan = styled.span`
  color: ${(props) => (props.primary ? "#333" : "#01d4bf")};
  letter-spacing: 17px;
  font-size: 120px;
  line-height: 1px;

  @media screen and (max-width: 1570px) {
    font-size: 100px;
    letter-spacing: 12px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 80px;
    letter-spacing: 8px;
  }
  @media screen and (max-width: 960px) {
    font-size: 60px;
    letter-spacing: 6px;
    line-height: 42px;
  }
`;
