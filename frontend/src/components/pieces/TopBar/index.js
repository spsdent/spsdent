import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavBarContainer,
  NavLogo,
  NavImage,
  BarPhone,
  BarIcon,
  BarAdress,
  BarText,
  NavButtons,
  ButtonLink,
  MobileIcon,
  NavInfo,
  ButtonNav,
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

  return (
    <>
      <Nav>
        <NavBarContainer>
          <NavLogo to="/">
            <NavImage src="../logo.png" alt="spsdentLogo" />
          </NavLogo>

          <MobileIcon>
            <FaBars />
          </MobileIcon>

          <NavInfo>
            <BarPhone>
              <BarIcon src="../phoneIcon.png" alt="phone" />
              <BarText>607 677 888</BarText>
            </BarPhone>

            <BarAdress>
              <BarIcon src="../markerIcon.png" alt="marker" />
              <BarText>ul.Filaretów 27, lok.4 20-609 Lublin</BarText>
            </BarAdress>
          </NavInfo>

          <NavButtons>
            <ButtonNav primary>
              <ButtonLink to="/add-visit">Umów się na wizytę</ButtonLink>
            </ButtonNav>
            {currentUser ? (
              <ButtonNav>
                <ButtonLink to="/login" onClick={logOut}>
                  Wyloguj się
                </ButtonLink>
              </ButtonNav>
            ) : (
              <ButtonNav>
                <ButtonLink to="/login">Zaloguj się</ButtonLink>
              </ButtonNav>
            )}
          </NavButtons>
        </NavBarContainer>
      </Nav>
    </>
  );
};

export default TopBar;
