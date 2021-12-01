import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../helpers/history'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import Profile from '../components/Profile'
import BoardUser from '../components/BoardUser'
import BoardSpec from '../components/BoardSpec'
import BoardAdmin from '../components/BoardAdmin'
import AdminNav from './AdminNav'
import UserNav from './UserNav'
import SpecNav from './SpecNav'
import NonAuth from './NonAuth'

import { logout } from '../store/actions/auth'
import { clearMessage } from '../store/actions/message'

const RootNavigation = () => {
  const [showSpecBoard, setShowSpecBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [showUserBoard, setShowUserBoard] = useState(false)

  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()) // clear message when changing location
    })
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      setShowSpecBoard(currentUser.roles.includes('ROLE_SPEC'))
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
      setShowUserBoard(currentUser.roles.includes('ROLE_USER'))
    }
  }, [currentUser])

  const logOut = () => {
    dispatch(logout())
  }

  return (
    <BrowserRouter history={history}>
      <>
        <nav>
          {currentUser ? (
            <li>
              <a href='/login' onClick={logOut}>
                Wyloguj
              </a>
            </li>
          ) : (
            <li>
              <Link to='/login'>Zaloguj</Link>
            </li>
          )}
          {showSpecBoard && <SpecNav />}
          {showAdminBoard && <AdminNav />}
          {showUserBoard && <UserNav />}
          <NonAuth />
        </nav>
        <>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='login' element={<Login />} />
            <Route exact path='register' element={<Register />} />
            <Route exact path='profile' element={<Profile />} />
            <Route path='user' element={<BoardUser />} />
            <Route path='spec' element={<BoardSpec />} />
            <Route path='admin' element={<BoardAdmin />} />
          </Routes>
        </>
      </>
    </BrowserRouter>
  )
}

export default RootNavigation
