import React, { useState, useEffect } from "react";

import ServiceData from "../../../services/service";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../../../navigation/AdminNav";
import UserNav from "../../../navigation/UserNav";
import SpecNav from "../../../navigation/SpecNav";
import { logout } from "../../../store/actions/auth";
import { history } from "../../../helpers/history";
import { clearMessage } from "../../../store/actions/message";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import {
  MobileMenuContainer,
  MobileMenuWrap,
  StyledLink,
  NavItem,
  ButtonLink,
  ButtonNav,
  ButtonsContainer,
  SocialLink,
  NavSocials
} from "./MobileMenuElements";
import { useDispatch, useSelector } from "react-redux";
const MobileMenu = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showSpecBoard, setShowSpecBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  let location = useLocation();
  let navigate = useNavigate();
  let currentLocation = location.pathname.split("/")[1];

  useEffect(() => {
    retrieveServices();
  }, []);

  const retrieveServices = () => {
    ServiceData.getAll().then((response) => setServiceData(response.data));
  };

  useEffect(() => {
    if (currentUser) {
      setShowSpecBoard(currentUser.roles.includes("ROLE_SPEC"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowUserBoard(currentUser.roles.includes("ROLE_USER"));
    }
  }, [currentUser]);

  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");
  const [isOpen, setIsOpen] = useState(false);
  const setIsOpenHandler = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <MobileMenuContainer>
      <MobileMenuWrap>
        <NavItem mobile>
          <StyledLink to="/">Strona Główna</StyledLink>
        </NavItem>
        <NavItem mobile>
          <StyledLink to="/about-us">O nas</StyledLink>
        </NavItem>
        <NavItem mobile>
          <StyledLink to="/offer">Oferta</StyledLink>
        </NavItem>
        <NavItem mobile onClick={() => navigate("/price-list/Wizyta")}>
          <StyledLink to="/price-list">Cennik</StyledLink>
        </NavItem>
       
        <ButtonsContainer>
        <ButtonNav primary>
          <ButtonLink
            to={isAdmin ? "/timesheet" : "/add-visit"}
            onClick={() => dispatch(clearMessage())}
          >
            Umów się na wizytę
          </ButtonLink>
        </ButtonNav>
        {currentUser ? (
          <ButtonNav>
            <ButtonLink
              to="/login"
              onClick={() => {
                logOut();
                dispatch(clearMessage());
              }}
            >
              Wyloguj się
            </ButtonLink>
          </ButtonNav>
        ) : (
          <ButtonNav>
            <ButtonLink to="/login" onClick={() => dispatch(clearMessage())}>
              Zaloguj się
            </ButtonLink>
          </ButtonNav>
        )}
      </ButtonsContainer>
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
      </MobileMenuWrap>
    </MobileMenuContainer>
  );
};

export default MobileMenu;
