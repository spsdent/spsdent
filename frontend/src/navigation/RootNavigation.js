import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../helpers/history'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'

import Login from '../components/Login'
import Register from '../components/Register'
import AddVisit from '../components/AddVisit'
import VisitsList from '../components/VisitsList'
import Visit from '../components/Visit'
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
import AddVisitPage from '../pages/AddVisitPage/'
import ArchiveVisitsPage from '../pages/ArchiveVisitsPage'
import ControlPanelPage from '../pages/ControlPanelPage'
// import DoctorTimesheetPage from '../pages/DoctorTimesheetPage'
import DoctorTimesheetPage from '../pages/DoctorTimesheetPage/timesheet-pacjent'
import DoctorTimesheet from '../pages/DoctorTimesheetPage'
import VisitsPage from '../pages/VisitsPage'
import ProfilePage from '../pages/ProfilePage'
import PwdChangePage from '../pages/PwdChangePage'

import { logout } from '../store/actions/auth'
import { clearMessage } from '../store/actions/message'
import PriceListSubPage from '../pages/PriceListPage/PriceListSubPage'

function PrivateRoute({ children }) {
  const { user: currentUser } = useSelector((state) => state.auth)
  return currentUser === null ? <Navigate to='/login' /> : children
}

function AdminPrivateRoute({ children }) {
  const { user: currentUser } = useSelector((state) => state.auth)
  return !currentUser.roles.includes('ROLE_ADMIN') ? (
    <Navigate to='/add-visit' />
  ) : (
    children
  )
}

function DoctorPrivateRoute({ children }) {
  const { user: currentUser } = useSelector((state) => state.auth)
  return !currentUser.roles.includes('ROLE_SPEC') ? (
    <Navigate to='/add-visit' />
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
            <Route exact path='/about-us' element={<AboutUsPage />} />
            <Route exact path='/offer' element={<OfferPage />} />
            <Route path='/price-list' element={<PriceListPage />}>
              <Route path=':group' element={<PriceListSubPage />} />
            </Route>
            <Route
              exact
              path='/timesheet'
              element={
                <PrivateRoute>
                  <DoctorPrivateRoute>
                    <DoctorTimesheet />
                  </DoctorPrivateRoute>
                </PrivateRoute>
              }
            />

            <Route exact path='/contact' element={<ContactPage />} />
            <Route exact path='/add-visit' element={<AddVisit />} />
            <Route exact path='/password-change' element={<PwdChangePage />} />

            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/offer/rtg-3d' element={<Rtg />} />
            <Route exact path='offer/endodoncja' element={<Endodoncja />} />
            <Route exact path='offer/dds' element={<Dds />} />
            <Route exact path='offer/pip' element={<Pip />} />
            <Route exact path='offer/pcyfrowa' element={<Pcyfrowa />} />
            <Route exact path='offer/implanty' element={<Implanty />} />
            <Route exact path='offer/ortodoncja' element={<Ortodoncja />} />
            <Route exact path='offer/diagnostyka' element={<Diagnostyka />} />
            <Route exact path='offer/znieczulenie' element={<Znieczulenie />} />
            <Route exact path='offer/zachowawcza' element={<Zachowawcza />} />
            <Route
              exact
              path='/settings'
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path='/visits'
              element={
                <PrivateRoute>
                  <VisitsPage />
                </PrivateRoute>
              }
            />
            <Route
              path='visits/:id'
              element={
                <PrivateRoute>
                  <Visit />
                </PrivateRoute>
              }
            />
            <Route
              path='archive'
              element={
                <PrivateRoute>
                  <ArchiveVisitsPage />
                </PrivateRoute>
              }
            />
            <Route
              path='control-panel'
              element={
                <PrivateRoute>
                  <AdminPrivateRoute>
                    <ControlPanelPage />
                  </AdminPrivateRoute>
                </PrivateRoute>
              }
            />
            <Route
              path='doctor-timesheet'
              element={
                <PrivateRoute>
                  <DoctorPrivateRoute>
                    <DoctorTimesheetPage />
                  </DoctorPrivateRoute>
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
