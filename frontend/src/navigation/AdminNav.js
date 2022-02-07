import React from 'react'
import {
  NavItem,
  StyledLink,
} from '../components/pieces/SideBar/SideBarElements'

const AdminNav = () => (
  <>
    {/* <NavItem>
      <StyledLink to='/add-visit'>Zarezerwuj</StyledLink>
    </NavItem> */}
    <NavItem>
      <StyledLink to='/grafik'>Grafik</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/wizyty'>Aktualne wizyty</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/archiwum-wizyt'>Historia wizyt</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/profil'>Ustawienia</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/panel-zarzadzania'>Panel zarzadzania</StyledLink>
    </NavItem>
  </>
)

export default AdminNav
