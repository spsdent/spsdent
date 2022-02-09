import styled from "styled-components";
import { NavLink as StyledNavLink } from "react-router-dom";

export const SideBarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 8.5em;
  height: 100vh;
  background-color: #fff;
  max-width: 220px;
  margin-top: 4.1em;
  font-size: 24px;
  z-index: 999;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14.5px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const NavTriangle = styled.div`
  position: fixed;
  top: 0;
  left: 7.5em;
  width: 0;
  height: 0;
  border-top: 4.5em solid transparent;
  border-bottom: 4.5em solid transparent;
  border-left: 4.5em solid #fff;
  transform-origin: center;
  transform: rotate(225deg);
  z-index: 999999;
`;
export const SideNav = styled.nav`
  position: relative;
  margin: 0 20%;
  text-align: left;
  top: 40%;
  transform: translateY(-50%);
`;
export const NavWrap = styled.ul`
  list-style: none;
`;
export const NavItem = styled.li`
  position: relative;
  padding: 0.15em 0;
  list-style: none;
`;
export const StyledLink = styled(StyledNavLink)`
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  color: rgba(51, 51, 51, 0.75);
  display: block;
  transition: 0.2s ease-out;
  font-size: ${(props) => (props.primary ? ".6em" : ".7em")};
  &:hover {
    color: black;
  }

  @media (orientation: portrait) and (max-width: 768px) {
    font-size: ${(props) => (props.mobile ? "2em" : ".7em")};
  }
`;
export const SocialLink = styled.a`
  color: rgba(51, 51, 51, 0.75);
  text-decoration: none;
  margin: 0 0.4em;
  z-index: 10000;
  cursor: pointer;
`;
export const NavSocials = styled.div`
  position: fixed;
  width: 10.6em;
  bottom: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  font-size: 0.8em;
  z-index: 10000;
`;
