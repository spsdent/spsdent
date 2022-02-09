import React, { useState, useEffect } from "react";
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
  NavSocials,
} from "./MobileMenuElements";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "../../../navigation/AdminNav";
import UserNav from "../../../navigation/UserNav";
import SpecNav from "../../../navigation/SpecNav";
import ServiceData from "../../../services/service";

const MobileMenu = ({ setIsOpenHandler }, ref) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  let navigate = useNavigate();

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
  const [showSpecBoard, setShowSpecBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  let location = useLocation();
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

  return (
    <MobileMenuContainer
      ref={ref}
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 0.5 }}
    >
      <MobileMenuWrap
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <NavItem>
          <StyledLink onClick={setIsOpenHandler} to="/">
            Strona Główna
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink onClick={setIsOpenHandler} to="/o-nas">
            O nas
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink onClick={setIsOpenHandler} to="/oferta">
            Oferta
          </StyledLink>
        </NavItem>
        <NavItem onClick={() => navigate("/cennik/wizyta")}>
          <StyledLink onClick={setIsOpenHandler} to="/cennik">
            Cennik
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink onClick={setIsOpenHandler} to="/kontakt">
            Kontakt
          </StyledLink>
        </NavItem>
        {currentUser && (
          <>
            {showSpecBoard && <SpecNav />}
            {showAdminBoard && <AdminNav />}
            {showUserBoard && <UserNav />}
          </>
        )}
        <ButtonsContainer>
          <ButtonNav primary onClick={setIsOpenHandler}>
            <ButtonLink
              to={isAdmin ? "/grafik" : "/zarezerwuj"}
              onClick={() => dispatch(clearMessage())}
            >
              Umów się na wizytę
            </ButtonLink>
          </ButtonNav>
          {currentUser ? (
            <ButtonNav onClick={setIsOpenHandler}>
              <ButtonLink
                to="/logowanie"
                onClick={() => {
                  logOut();
                  dispatch(clearMessage());
                }}
              >
                Wyloguj się
              </ButtonLink>
            </ButtonNav>
          ) : (
            <ButtonNav onClick={setIsOpenHandler}>
              <ButtonLink
                to="/logowanie"
                onClick={() => dispatch(clearMessage())}
              >
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
