import React from "react";
import {
  NavItem,
  StyledLink,
} from "../components/pieces/SideBar/SideBarElements";

const AdminNav = ({ setIsOpenHandler }) => (
  <>
    <NavItem>
      <StyledLink mobile onClick={setIsOpenHandler} to="/grafik">
        Grafik
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
    <NavItem>
      <StyledLink mobile onClick={setIsOpenHandler} to="/panel-zarzadzania">
        Panel zarzadzania
      </StyledLink>
    </NavItem>
  </>
);

export default AdminNav;
