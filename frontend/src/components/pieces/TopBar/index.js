import React from "react";
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
  ButtonNav
  
} from "./TopBarElements";
const TopBar = () => {
  return (
    <>
      <Nav>
        <NavBarContainer>

          <NavLogo to="/">
            <NavImage src="logo.png" alt="spsdentLogo" />
          </NavLogo>

          <MobileIcon>
            <FaBars />
          </MobileIcon>

          <NavInfo>
            <BarPhone>
              <BarIcon src="phoneIcon.png" alt="phone" />
              <BarText>123 456 789</BarText>
            </BarPhone>

            <BarAdress>
              <BarIcon src="markerIcon.png" alt="marker" />
              <BarText>ul.Filaretów 27, lok.4 20-609 Lublin</BarText>
            </BarAdress>
          </NavInfo>

          <NavButtons>
            <ButtonNav primary>
            <ButtonLink to="/add-visit">Umów się na wizytę</ButtonLink>
            </ButtonNav>
            <ButtonNav>
            <ButtonLink to="/login">Zaloguj się</ButtonLink>
            </ButtonNav>
          </NavButtons>

        </NavBarContainer>
      </Nav>
    </>
  );
};

export default TopBar;
