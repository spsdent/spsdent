import React from 'react'
import {
  NavItem,
  StyledLink,
} from "../components/pieces/SideBar/SideBarElements";

const UserNav = () => (
  <>
    <NavItem>
      <StyledLink to='/add-visit'>Zarezerwuj</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/visits'>Aktualne wizyty</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/archive'>Historia wizyt</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/user'>Panel pacjenta</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/profile'>Ustawienia</StyledLink>
    </NavItem>
  </>
)

export default UserNav
