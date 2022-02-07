import React from 'react'
import {
  NavItem,
  StyledLink,
} from '../components/pieces/SideBar/SideBarElements'

const UserNav = () => (
  <>
    <NavItem>
      <StyledLink to='/zarezerwuj'>Zarezerwuj</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/wizyty'>Aktualne wizyty</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/archiwum-wizyt'>Historia wizyt</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/profil'>Profil użytkownika</StyledLink>
    </NavItem>
  </>
)

export default UserNav
