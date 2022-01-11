import React from 'react'
import {
  NavItem,
  StyledLink,
} from '../components/pieces/SideBar/SideBarElements'

const AdminNav = () => (
  <>
    <NavItem>
      <StyledLink to='/add-visit'>Zarezerwuj</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/timesheet'>Grafik</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/visits'>Aktualne wizyty</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/archive'>Historia wizyt</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/settings'>Ustawienia</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/control-panel'>Panel zarzadzania</StyledLink>
    </NavItem>
  </>
)

export default AdminNav
