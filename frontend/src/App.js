import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import BoardUser from './components/BoardUser'
import BoardSpec from './components/BoardSpec'
import BoardAdmin from './components/BoardAdmin'

import { logout } from './store/actions/auth'
import { clearMessage } from './store/actions/message'

import { history } from './helpers/history'

const App = () => {
  const [showSpecBoard, setShowSpecBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)

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
    }
  }, [currentUser])

  const logOut = () => {
    dispatch(logout())
  }

  return (
    <BrowserRouter history={history}>
      <div>
        <nav>
          <Link to='/'>SPS Dent</Link>
          <div>
            <li>
              <Link to='/home'>Home</Link>
            </li>

            {showSpecBoard && (
              <li>
                <Link to='/spec'>Spec Board</Link>
              </li>
            )}

            {showAdminBoard && (
              <li>
                <Link to='/admin'>Admin Board</Link>
              </li>
            )}

            {currentUser && (
              <li>
                <Link to='/user'>User</Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div>
              <li>
                <Link to='/profile'>{currentUser.username}</Link>
              </li>
              <li>
                <a href='/login' onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to='/login'>Login</Link>
              </li>

              <li>
                <Link to='/register'>Sign Up</Link>
              </li>
            </div>
          )}
        </nav>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='login' element={<Login />} />
            <Route exact path='register' element={<Register />} />
            <Route exact path='profile' element={<Profile />} />
            <Route path='user' element={<BoardUser />} />
            <Route path='spec' element={<BoardSpec />} />
            <Route path='admin' element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
