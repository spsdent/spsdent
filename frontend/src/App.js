import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import BoardUser from './components/BoardUser'
import boardSpec from './components/BoardSpec'
import BoardAdmin from './components/BoardAdmin'

import { logout } from './actions/auth'
import { clearMessage } from './actions/message'

import { history } from './helpers/history'
import BoardSpec from './components/BoardSpec'

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
      setShowSpecBoard(currentUser.roles.includes('ROLE_MODERATOR'))
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
    }
  }, [currentUser])

  const logOut = () => {
    dispatch(logout())
  }

  return (
    <Router history={history}>
      <div>
        <nav>
          <Link to={'/'}>SPS Dent</Link>
          <div>
            <li>
              <Link to={'/home'}>Home</Link>
            </li>

            {showSpecBoard && (
              <li>
                <Link to={'/mod'}>Spec Board</Link>
              </li>
            )}

            {showAdminBoard && (
              <li>
                <Link to={'/admin'}>Admin Board</Link>
              </li>
            )}

            {currentUser && (
              <li>
                <Link to={'/user'}>User</Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div>
              <li>
                <Link to={'/profile'}>{currentUser.username}</Link>
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
                <Link to={'/login'}>Login</Link>
              </li>

              <li>
                <Link to={'/register'}>Sign Up</Link>
              </li>
            </div>
          )}
        </nav>

        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/user' component={BoardUser} />
            <Route path='/mod' component={BoardSpec} />
            <Route path='/admin' component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
