import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../../helpers/history'
import { FaInstagram } from 'react-icons/fa'
import { FiFacebook, FiTwitter } from 'react-icons/fi'
import {
  SideBarContainer,
  SideNav,
  NavWrap,
  NavItem,
  StyledLink,
  NavSocials,
  SocialLink,
  NavTriangle,
} from './SideBarElements'
import AdminNav from '../../../navigation/AdminNav'
import UserNav from '../../../navigation/UserNav'
import SpecNav from '../../../navigation/SpecNav'
// import TopBar from '../TopBar'
import { motion } from 'framer-motion'

// import { logout } from '../../../store/actions/auth'
// import { clearMessage } from '../../../store/actions/message'

import ServiceData from '../../../services/service'
import { refreshApp } from '../../../store/actions/refresh'

import {
  useLocation,
  NavLink as StyledNavLink,
  useNavigate,
} from 'react-router-dom'
import styled from 'styled-components'

export const NavItemSub = styled.li`
  position: relative;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: #01d4bf;
  }
  &:selection {
    color: #01d4bf;
  }
`
export const StyledLinkSub = styled(StyledNavLink)`
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  color: rgba(51, 51, 51, 0.75);
  display: block;
  transition: 0.2s ease-out;
  font-size: 14px;

  &:hover {
    color: #01d4bf;
  }
`

const NonAuth = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [showSpecBoard, setShowSpecBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [showUserBoard, setShowUserBoard] = useState(false)
  const [serviceData, setServiceData] = useState([])
  let location = useLocation()
  let navigate = useNavigate()
  let currentLocation = location.pathname.split('/')[1]

  useEffect(() => {
    retrieveServices()
  }, [])

  const retrieveServices = () => {
    ServiceData.getAll().then((response) => setServiceData(response.data))
  }

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   history.listen((location) => {
  //     dispatch(clearMessage()) // clear message when changing location
  //   })
  // }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      setShowSpecBoard(currentUser.roles.includes('ROLE_SPEC'))
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
      setShowUserBoard(currentUser.roles.includes('ROLE_USER'))
    }
  }, [currentUser])

  // const logOut = () => {
  //   dispatch(logout())
  // }
  return (
    <SideBarContainer>
      <NavTriangle />
      <SideNav>
        <NavWrap>
          {currentUser && (
            <>
              {showSpecBoard && <SpecNav />}
              {showAdminBoard && <AdminNav />}
              {showUserBoard && <UserNav />}
              <hr
                style={{
                  width: '100%',
                  backgroundColor: '#333',
                  border: 'none',
                  height: '1px',
                }}
              />
            </>
          )}
          <NavItem>
            <StyledLink to='/'>Strona Główna</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to='/about-us'>O nas</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to='/offer'>Oferta</StyledLink>
          </NavItem>
          <NavItem
            onClick={() => navigate('/price-list/stomatologia-zachowawcza')}
          >
            <StyledLink to='/price-list'>Cennik</StyledLink>
          </NavItem>
          {currentLocation === 'price-list' && (
            <>
              {serviceData.map(
                (service, i) =>
                  service.uslugi.length > 0 && (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <StyledLinkSub
                        to={`/price-list/${service.grupa.split(' ').join('-')}`}
                      >
                        {service.grupa.split(' ').length > 2
                          ? `${service.grupa.split(' ')[0][0]}${
                              service.grupa.split(' ')[1][0]
                            }${service.grupa.split(' ')[2][0]}`
                          : service.grupa}
                      </StyledLinkSub>
                    </motion.li>
                  )
              )}
            </>
          )}
          <NavItem>
            <StyledLink to='/contact'>Kontakt</StyledLink>
          </NavItem>
        </NavWrap>
      </SideNav>
      <NavSocials>
        <SocialLink
          href='//www.facebook.com'
          target='_blank'
          aria-label='facebook'
        >
          <FiFacebook />
        </SocialLink>
        <SocialLink
          href='//www.instagram.com'
          target='_blank'
          aria-label='instagram'
        >
          <FaInstagram />
        </SocialLink>
        <SocialLink
          href='//www.twitter.com'
          target='_blank'
          aria-label='twitter'
        >
          <FiTwitter />
        </SocialLink>
      </NavSocials>
    </SideBarContainer>
  )
}

export default NonAuth
