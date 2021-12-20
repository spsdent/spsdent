import React from 'react'
import {
  NavItem,
  StyledLink,
} from "../components/pieces/SideBar/SideBarElements";

const SpecNav = () => (
  <>
    <NavItem>
      <StyledLink to='/doctor-timesheet'>Grafik</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/archive-visits'>Historia wizyt</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='add-visit'>Zarezerwuj</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/profile'>Ustawienia</StyledLink>
    </NavItem>
  </>
)

export default SpecNav
