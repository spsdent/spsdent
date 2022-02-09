import React from "react";
import {
  NavItem,
  StyledLink,
} from "../components/pieces/SideBar/SideBarElements";

const UserNav = ({ setIsOpenHandler }) => (
  <>
    <NavItem>
      <StyledLink mobile onClick={setIsOpenHandler} to="/zarezerwuj">
        Zarezerwuj
      </StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink mobile onClick={setIsOpenHandler} to="/wizyty">
        Aktualne wizyty
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

export default UserNav;
