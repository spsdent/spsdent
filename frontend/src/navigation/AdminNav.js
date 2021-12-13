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
      <StyledLink to='/admin'>Grafik</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/visits'>Aktualne wizyty</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/archive-visits'>Historia wizyt</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/profile'>Ustawienia</StyledLink>
    </NavItem>
  </>
)

export default AdminNav
