import React from "react";
import {
  NavItem,
  StyledLink,
} from "../components/pieces/SideBar/SideBarElements";

const SpecNav = ({ setIsOpenHandler }) => (
  <>
    <NavItem>
      <StyledLink mobile onClick={setIsOpenHandler} to="/grafik">
        Grafik
      </StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink mobile onClick={setIsOpenHandler} to="/archiwum-wizyt">
        Historia wizyt
      </StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink mobile onClick={setIsOpenHandler} to="/profil">
        Profil użytkownika
      </StyledLink>
    </NavItem>
  </>
);

export default SpecNav;
