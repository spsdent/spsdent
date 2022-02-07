import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import {
  Nav,
  NavBarContainer,
  NavLogoContainer,
  NavLogo,
  NavImage,
  NavInfoContainer,
  InfoContainer,
  InfoText,
  ButtonLink,
  MobileIcon,
  ButtonNav,
  ButtonsContainer,
} from "./TopBarElements";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/auth";
import { history } from "../../../helpers/history";
import { clearMessage } from "../../../store/actions/message";

const TopBar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
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
    <>
      <Nav>
        <NavBarContainer>
          <NavLogoContainer>
            <NavLogo to="/">
              <NavImage src="../logo.png" alt="spsdentLogo" />
            </NavLogo>
          </NavLogoContainer>
          <MobileIcon onClick={setIsOpenHandler}>
            <FaBars />
          </MobileIcon>
          <NavInfoContainer>
            <InfoContainer>
              <BsTelephone />
              <InfoText>607 677 888</InfoText>
            </InfoContainer>
            <InfoContainer>
              <HiOutlineLocationMarker />
              <InfoText>ul.Filaretów 27, lok.4 20-609 Lublin</InfoText>
            </InfoContainer>
          </NavInfoContainer>
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
                <ButtonLink
                  to="/login"
                  onClick={() => dispatch(clearMessage())}
                >
                  Zaloguj się
                </ButtonLink>
              </ButtonNav>
            )}
          </ButtonsContainer>
        </NavBarContainer>
      </Nav>
    </>
  );
};

export default TopBar;
