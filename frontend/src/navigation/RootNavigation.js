import React from 'react'
import { useSelector } from 'react-redux'
import { history } from '../helpers/history'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import NonAuth from '../components/pieces/SideBar'
import TopBar from '../components/pieces/TopBar'

// pages
import HomePage from '../pages/HomePage/'
import AboutUsPage from '../pages/AboutUsPage/'

import OfferPage from '../pages/OfferPage/'
import Rtg from '../pages/OfferPage/subpages/Rtg'
import Endodoncja from '../pages/OfferPage/subpages/Endodoncja'
import Dds from '../pages/OfferPage/subpages/Dds'
import Pip from '../pages/OfferPage/subpages/Pip'
import Pcyfrowa from '../pages/OfferPage/subpages/Pcyfrowa'
import Implanty from '../pages/OfferPage/subpages/Implanty'
import Ortodoncja from '../pages/OfferPage/subpages/Ortodoncja'
import Diagnostyka from '../pages/OfferPage/subpages/Diagnostyka'
import Znieczulenie from '../pages/OfferPage/subpages/Znieczulenie'
import Zachowawcza from '../pages/OfferPage/subpages/Zachowawcza'

import PriceListPage from '../pages/PriceListPage/'
import ContactPage from '../pages/ContactPage/'
import ArchiveVisitsPage from '../pages/ArchiveVisitsPage'
import ControlPanelPage from '../pages/ControlPanelPage'
import TimesheetPage from '../pages/TimesheetPage'
import VisitsPage from '../pages/VisitsPage'
import ProfilePage from '../pages/ProfilePage'
import PwdChangePage from '../pages/PwdChangePage'
import VisitPage from '../pages/VisitPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AddVisitPage from '../pages/AddVisitPage'

import PriceListSubPage from '../pages/PriceListPage/PriceListSubPage'

function PrivateRoute({ children }) {
  const { user: currentUser } = useSelector((state) => state.auth)
  return currentUser === null ? <Navigate to='/logowanie' /> : children
}

function AdminPrivateRoute({ children }) {
  const { user: currentUser } = useSelector((state) => state.auth)
  return !currentUser.roles.includes('ROLE_ADMIN') ? (
    <Navigate to='/zarezerwuj' />
  ) : (
    children
  )
}

function DoctorPrivateRoute({ children }) {
  const { user: currentUser } = useSelector((state) => state.auth)
  return !currentUser.roles.includes('ROLE_SPEC') ? (
    <Navigate to='/zarezerwuj' />
  ) : (
    children
  )
}

const RootNavigation = () => {
  return (
    <BrowserRouter history={history}>
      <>
        <TopBar />
        <NonAuth />
        <>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/o-nas' element={<AboutUsPage />} />
            <Route exact path='/oferta' element={<OfferPage />} />
            <Route path='/cennik' element={<PriceListPage />}>
              <Route path=':grupa' element={<PriceListSubPage />} />
            </Route>
            <Route
              path='/grafik'
              element={
                <PrivateRoute>
                  <TimesheetPage />
                </PrivateRoute>
              }
            />

            <Route exact path='/kontakt' element={<ContactPage />} />
            <Route exact path='/zarezerwuj' element={<AddVisitPage />} />
            <Route exact path='/zresetuj-haslo' element={<PwdChangePage />} />

            <Route exact path='/logowanie' element={<LoginPage />} />
            <Route exact path='/rejestracja' element={<RegisterPage />} />
            <Route exact path='/oferta/rtg-3d' element={<Rtg />} />
            <Route exact path='oferta/endodoncja' element={<Endodoncja />} />
            <Route exact path='oferta/dds' element={<Dds />} />
            <Route exact path='oferta/pip' element={<Pip />} />
            <Route exact path='oferta/pcyfrowa' element={<Pcyfrowa />} />
            <Route exact path='oferta/implanty' element={<Implanty />} />
            <Route exact path='oferta/ortodoncja' element={<Ortodoncja />} />
            <Route exact path='oferta/diagnostyka' element={<Diagnostyka />} />
            <Route exact path='oferta/znieczulenie' element={<Znieczulenie />} />
            <Route exact path='oferta/zachowawcza' element={<Zachowawcza />} />
            <Route
              exact
              path='/profil'
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path='/wizyty'
              element={
                <PrivateRoute>
                  <VisitsPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/archiwum-wizyt'
              element={
                <PrivateRoute>
                  <ArchiveVisitsPage />
                </PrivateRoute>
              }
            />
            <Route
              path='wizyty/:id'
              element={
                <PrivateRoute>
                  <VisitPage />
                </PrivateRoute>
              }
            />
            <Route
              path='archiwum-wizyt/:id'
              element={
                <PrivateRoute>
                  <VisitPage />
                </PrivateRoute>
              }
            />
            <Route
              path='panel-zarzadzania'
              element={
                <PrivateRoute>
                  <AdminPrivateRoute>
                    <ControlPanelPage />
                  </AdminPrivateRoute>
                </PrivateRoute>
              }
            />
          </Routes>
        </>
      </>
    </BrowserRouter>
  )
}

export default RootNavigation
