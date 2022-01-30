import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  width: 80%;
  height: 75vh;
  margin-top: 1em;
  font-size: 22px;
  margin-left: 0.3rem;
  font-family: "Poppins";
  // background-color: cadetblue;
  @media screen and (max-width: 1500px) {
    font-size: 18px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 14px;
  }
  @media screen and (max-width: 960px) {
    font-size: 10px;
  }
`;
export const VisitTitle = styled(motion.h1)`
  color: ${(props) => (props.primary ? "#01D4BF" : "#333")};
  font-family: "bebas neue";
  font-size: 4.5em;
  letter-spacing: 0.02em;
  z-index: 98;
`;
export const VisitContainer = styled(motion.div)`
  background-color: #fbfbfb;
  border-radius: 15px;
  padding: 1em 2em;
  width: 70%;
  margin: 0 auto;
  z-index: 99;
`;
export const VisitTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5em;
`;
export const VisitText = styled.p`
  margin: 0.2em 0;
  font-size: 0.8em;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const ButtonVisit = styled(motion.button)`
  margin: 2em 1em 1em 1em;
  padding: 1em 3em;
  outline: none;
  border: none;
  background-color: ${(props) => (props.primary ? "#01D4BF" : "#333")};
  color: #fff;
  font-family: "bebas neue";
  font-size: 0.8em;
  letter-spacing: 0.02em;
  white-space: nowrap;
  cursor: pointer;
`;
export const ModalShadow = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(3, 3, 3, 0.5);
  z-index: 999;

`;
export const ModalContainer = styled(motion.div)`
  position: relative;
  left: 0;
  right: 0;
  top: 25%;
  width: 50%;
  height: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;
export const ModalText = styled.h1`
  margin-bottom: 1em;
  font-size: 1.5em;
`;
export const ModalButtonsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
`;
export const ModalButton = styled.div`
  background-color: ${(props) => (props.primary ? "transparent" : "#01d4bf")};
  border: ${(props) =>
    props.primary ? "2px solid #333" : "2px solid transparent"};
  padding: 0.75em 2.5em;
  cursor: pointer;
`;

// export const EmptyListHeading = styled(Title)`
//   font-size: 2.5rem;
//   text-decoration: underline;
//   color: salmon;
// `
