import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { login } from '../store/actions/auth'

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()


    dispatch(login(email, password))
      .then(() => {
        props.history.push('/profile')
        window.location.reload()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  if (isLoggedIn) {
    return <Navigate to='/profile' />
  }

  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label htmlFor='email'>E-mail</label>
            <input
              type='text'
              className='form-control'
              name='email'
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div>
            <button>
              {loading && <span></span>}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div>
              <div>{message}</div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
