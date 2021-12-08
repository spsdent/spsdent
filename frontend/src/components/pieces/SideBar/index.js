import React from "react";
import { FaInstagram } from "react-icons/fa";
import {FiFacebook, FiTwitter} from 'react-icons/fi'
import {
  SideBarContainer,
  SideNav,
  NavWrap,
  NavItem,
  StyledLink,
  NavSocials,
  SocialLink,
  NavTriangle
} from "./SideBarElements";
const NonAuth = () => {
  return (
    <SideBarContainer>
      <NavTriangle/>
      <SideNav>
        <NavWrap>
          <NavItem>
            <StyledLink to="/">Strona Główna</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/about-us">O nas</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/offer">Oferta</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/price-list">Cennik</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/contact">Kontakt</StyledLink>
          </NavItem>
        </NavWrap>
      </SideNav>
      <NavSocials>
            <SocialLink
              href="//www.facebook.com"
              target="_blank"
              aria-label="facebook"
            >
              <FiFacebook />
            </SocialLink>
            <SocialLink
              href="//www.instagram.com"
              target="_blank"
              aria-label="instagram"
            >
              <FaInstagram />
            </SocialLink>
            <SocialLink
              href="//www.twitter.com"
              target="_blank"
              aria-label="twitter"
            >
              <FiTwitter />
            </SocialLink>
          </NavSocials>
    </SideBarContainer>
  );
};

export default NonAuth;
