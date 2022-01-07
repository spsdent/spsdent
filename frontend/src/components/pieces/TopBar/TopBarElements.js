import styled, { css } from "styled-components";
import { Link as LinkLogo } from "react-router-dom";
import { Link as LinkButton } from "react-router-dom";

export const Nav = styled.nav`
  background-color: #fff;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;
export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
`;

export const NavLogo = styled(LinkLogo)`
  position: absolute;
  top: 50px;
  left: 7%;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 1000;

  @media screen and (min-width: 1570px) {
    left: 110px;
    transform: translate(-50%, -50%);
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    transform: translate(-50%, 40%);
    font-size: 2rem;
    color: #000;
    z-index: 1000;
  }
`;

export const NavImage = styled.img`
  cursor: pointer;
`;

export const NavInfo = styled.ul`
  display: flex;
  justify-content: center;
  flex-grow: 9;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-bottom: 0;
  letter-spacing: 1.5px;
  transform: translateX(5%);
  @media screen and (max-width: 1280px) {
    transform: translateX(10%);
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const BarIcon = styled.img`
  height: 31px;
  white-space: nowrap;
  transition: 0.2s ease-out;
  
  @media screen and (max-width: 1280px) {
    height: 21px;
  }
  @media screen and (max-width: 960px) {
    height: 18px;
  }
`;
export const BarPhone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BarAdress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;

  @media screen and (max-width: 1280px) {
    margin-left: 10px;
  }
`;

export const BarText = styled.p`
  font-size: 18px;
  font-family: 'poppins';
  color: rgba(51, 51, 51, 0.75);
  margin-left: 5px;
  transition: 0.2s ease-out;
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14px;
  }
`;
export const NavButtons = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 20px;
  flex-grow: 1;
  transform: translateX(15%);
  @media screen and (max-width: 960px) {
    margin-right: 0px;
  }
`;

export const ButtonLink = styled(LinkButton)`
  white-space: nowrap;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ButtonNav = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 20px;
  height: 50px;
  transition: 0.3s ease;
  background-color: ${(props) => (props.primary ? "#01D4BF" : "#333")};
  width: ${(props) => (props.primary ? "200px" : "150px")};

  @media screen and (max-width: 1280px) {
    width: ${(props) => (props.primary ? "175px" : "125px")};
  }
  @media screen and (max-width: 960px) {
    width: ${(props) => (props.primary ? "125px" : "75px")};
    margin-right: 15px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  &:hover {
    background-color: #01d4bf;
  }
  ${(props) =>
    props.primary &&
    css`
      &:hover {
        background-color: #333;
      }
    `}
`;
