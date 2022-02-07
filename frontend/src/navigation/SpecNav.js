import React from 'react'
import {
  NavItem,
  StyledLink,
} from '../components/pieces/SideBar/SideBarElements'

const SpecNav = () => (
  <>
    <NavItem>
      <StyledLink to='/grafik'>Grafik</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/archiwum-wizyt'>Historia wizyt</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/profil'>Profil użytkownika</StyledLink>
    </NavItem>
  </>
)

export default SpecNav
