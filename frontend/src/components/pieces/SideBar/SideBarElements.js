import styled from "styled-components";
import { NavLink as StyledNavLink } from "react-router-dom";

export const SideBarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 14%;
  height: 100vh;
  background-color: #fff;
  font-size: 18px;
  max-width: 220px;
  margin-top: 100px;
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
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
  padding: 10px 0;
`;
export const StyledLink = styled(StyledNavLink)`
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  color: rgba(51, 51, 51, 0.75);
  display: block;
  transition: 0.2s ease-out;

  &:hover {
    color: black;
  }
`;
export const SocialLink = styled.a`
  color: rgba(51, 51, 51, 0.75);
  text-decoration: none;
  margin: 0 5px;
  z-index: 10000;
  cursor: pointer;
`;
export const NavSocials = styled.div`
  position: fixed;
  width: 14%;
  bottom: 15px;
  display: flex;
  justify-content: space-around;
  padding: 0 50px;
  font-size: 18px;
  max-width: 220px;
  z-index: 10000;
`;
export const NavTriangle = styled.div`
  position: fixed;
  top: 2px;
  left: 12.2%;
  width: 0;
  height: 0;
  border-top: 140px solid transparent;
  border-bottom: 140px solid transparent;
  border-left: 140px solid #fff;
  transform-origin: center;
  transform: rotate(225deg);
  z-index: 999999;

  @media screen and (min-width: 1570px) {
    left: 198px;
  }
  @media screen and (max-width: 1280px) {
      left: 10%;
  }
`;
