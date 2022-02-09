import styled, { css } from "styled-components";
import { Link as LinkLogo } from "react-router-dom";
import { Link as LinkButton } from "react-router-dom";

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: hidden;
  background-color: #fff;
  font-size: 24px;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14.5px;
  }
`;
export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4.2em;
  width: 100%;
`;
export const NavLogoContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;
export const NavLogo = styled(LinkLogo)`
  position: absolute;
  top: 2.1em;
  left: 4.25em;
  transform: translate(-50%, -50%);
  width: 2em;
  height: 2em;
  cursor: pointer;
`;
export const NavImage = styled.img`
  cursor: pointer;
  width: 2.1em;
  height: 2.1em;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -40%);
    cursor: pointer;
    color: #333;
    z-index: 1000;
    height: 28px;
    width: 40px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;
export const NavInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3em;
  flex-grow: 2;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  font-size: 0.8em;
  color: rgba(51, 51, 51, 0.75);
  font-family: "poppins";
`;
export const InfoText = styled.p`
  white-space: nowrap;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 1em;
`;
export const ButtonNav = styled.div`
  height: 2.2em;
  width: ${(props) => (props.primary ? "8.2em" : "6.2em")};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
  background-color: ${(props) => (props.primary ? "#01D4BF" : "#333")};
  @media screen and (max-width: 768px) {
    display: none;
  }
  &:hover {
    background-color: #01d4bf;
  }
  &:active {
    transform: scale(1.1);
  }
  ${(props) =>
    props.primary &&
    css`
      &:hover {
        background-color: #333;
      }
    `}
`;
export const ButtonLink = styled(LinkButton)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  letter-spacing: 0.04em;
  color: #fff;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
`;
export const BurgerIcon = styled.div`
  width: 30px;
  height: 4px;
  background-color: ${(props) =>
    props.isOpen === true ? "transparent" : "#333"};
  border-radius: 5px;
  transition: all 0.5s ease-in-out;

  transform: translate(
    ${(props) => (props.isOpen === true ? "-50px, 10px" : "0px, 10px")}
  );
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 30px;
    height: 4px;
    background-color: #333;
    border-radius: 5px;
    transition: all 0.5s ease-in-out;
  }
  &:before {
    transform: translate(
        ${(props) => (props.isOpen === true ? "50px, 0px" : "0px, -10px")}
      )
      rotate(${(props) => (props.isOpen === true ? "-45deg" : "0deg")});
  }
  &:after {
    transform: translate(
        ${(props) => (props.isOpen === true ? "50px, 0px" : "0px, 10px")}
      )
      rotate(${(props) => (props.isOpen === true ? "45deg" : "0deg")});
  }
`;
