import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export const PriceListPageContainer = styled(motion.div)`
  width: 75%;
  height: 70vh;
  /* background-color: #aaa; */
  margin-top: 3em;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media screen and (max-width: 960px) {
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
export const PriceListTitle = styled(motion.h1)`
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
  font-size: ${(props) => (props.primary ? "2.5em" : "3.5em")};
  line-height: 1em;
  letter-spacing: 0.05em;
  z-index: 1;
  width: 100%;
`;
export const PriceListTable = styled(motion.div)`
  margin-top: 1.5em;
  color: #333;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  height: fit-content;
  font-family: "montserrat";
  /* box-shadow: 0px 1px 10px 1px rgba(51, 51, 51, 0.2); */
`;
export const PriceTableRow = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: space-around;
  background-color: ${(props) => (props.primary ? "#333" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  width: 100%;
  font-size: ${(props) => (props.primary ? "1em" : ".8em")};
  border-left: 2px solid rgba(51, 51, 51, 0.2);
  border-right: 2px solid rgba(51, 51, 51, 0.2);
  border-bottom: 2px solid rgba(51, 51, 51, 0.2);
  padding: 1.2em 0;
  transition: 0.1s linear;
  z-index: ${(props) => (props.primary ? "2" : "1")};
  &:hover {
    background-color: ${(props) => (props.primary ? "#333" : "#f6f6f6")};
  }
`;
export const PriceTableContent = styled.div`
  display: flex;
  justify-content: ${(props) => (props.price ? "center" : "flex-start")};
  width: ${(props) => (props.price ? "25%" : "55%")};
`;
export const PriceListMobileMenuLinkWrap = styled(motion.li)`
  list-style: none;
  padding: 0.5em 0;
  width: 30%;
`;
export const PriceListMobileMenuContainer = styled(motion.ul)`
  display: none;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;
export const PriceListMobileMenuLink = styled(NavLink)`
  font-size: 1em;
  padding: 1em;
  border-radius: 10px;
  background-color: #333;
  color: #fff;
  list-style: none;
  text-decoration: none;
  font-family: "poppins";
  font-weight: 100;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    background-color: #01d4bf !important;
    color: #fff !important;
  }
  @media (orientation: portrait) and (max-width: 550px) {
    font-size: 0.7em;
  }
  @media (orientation: portrait) and (max-width: 350px) {
    font-size: 0.55em;
  } ;
`;
