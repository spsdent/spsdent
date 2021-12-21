import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../helpers/history";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import {
  SideBarContainer,
  SideNav,
  NavWrap,
  NavItem,
  StyledLink,
  NavSocials,
  SocialLink,
  NavTriangle,
} from "./SideBarElements";
import AdminNav from "../../../navigation/AdminNav";
import UserNav from "../../../navigation/UserNav";
import SpecNav from "../../../navigation/SpecNav";
import TopBar from "../TopBar";

import { logout } from "../../../store/actions/auth";
import { clearMessage } from "../../../store/actions/message";

const NonAuth = () => {
  const [showSpecBoard, setShowSpecBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   history.listen((location) => {
  //     dispatch(clearMessage()) // clear message when changing location
  //   })
  // }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      setShowSpecBoard(currentUser.roles.includes("ROLE_SPEC"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowUserBoard(currentUser.roles.includes("ROLE_USER"));
    }
  }, [currentUser]);

  // const logOut = () => {
  //   dispatch(logout())
  // }
  return (
    <SideBarContainer>
      <NavTriangle />
      <SideNav>
        <NavWrap>
          {currentUser && (
            <>
              {showSpecBoard && <SpecNav />}
              {showAdminBoard && <AdminNav />}
              {showUserBoard && <UserNav />}
              <hr
                style={{
                  width: "100%",
                  backgroundColor: "#333",
                  border: "none",
                  height: "1px",
                }}
              />
            </>
          )}
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
