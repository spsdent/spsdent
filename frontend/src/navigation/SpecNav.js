import React from 'react'
import {
  NavItem,
  StyledLink,
} from '../components/pieces/SideBar/SideBarElements'

const SpecNav = () => (
  <>
    <NavItem>
      <StyledLink to='/timesheet'>Grafik</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/archive'>Historia wizyt</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='add-visit'>Zarezerwuj</StyledLink>
    </NavItem>
    <NavItem>
      <StyledLink to='/settings'>Ustawienia</StyledLink>
    </NavItem>
  </>
)

export default SpecNav
