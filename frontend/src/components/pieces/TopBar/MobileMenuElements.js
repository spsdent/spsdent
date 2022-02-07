import styled, { css } from "styled-components";
import { Link as LinkButton } from "react-router-dom";
import {motion} from "framer-motion";
import { NavLink as StyledNavLink } from "react-router-dom";

export const MobileMenuContainer = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.95);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  @media screen and (max-width: 400px) {
    font-size: 10px;
  }
`;
export const MobileMenuWrap = styled(motion.div)`
  /* background-color: #645; */
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const NavItem = styled.li`
  position: relative;
  padding: 0.15em 0;
  list-style: none;
  font-size: 2em;
`;
export const StyledLink = styled(StyledNavLink)`
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  color: rgba(51, 51, 51, 0.75);
  display: block;
  transition: 0.2s ease-out;
  white-space: nowrap;
  &:hover {
    color: black;
  }
`;
export const ButtonsContainer = styled.div`
  /* background-color: #645; */
  z-index: 10000000;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding-top: 1em;
`;
export const ButtonNav = styled.div`
  height: 4em;
  width: 15em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
  background-color: ${(props) => (props.primary ? "#01D4BF" : "#333")};
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
  font-size: 1.5em;
  letter-spacing: 0.04em;
  color: #fff;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
`;
export const SocialLink = styled.a`
  color: rgba(51, 51, 51, 0.75);
  text-decoration: none;
  margin: 0 0.4em;
  z-index: 10000;
  cursor: pointer;
`;
export const NavSocials = styled.div`
  position: absolute;
  bottom: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  font-size: 1.5em;
  z-index: 10000;
`;
