import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import { login } from '../actions/auth'

const Login = (props) => {
  const form = useRef()
  const checkBtn = useRef()

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

    setLoading(true)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push('/profile')
          window.location.reload()
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  if (isLoggedIn) {
    return <Redirect to='/profile' />
  }

  return (
    <div>
      <div>
        <Form onSubmit={handleLogin} ref={form}>
          <div className='form-group'>
            <label htmlFor='email'>E-mail</label>
            <Input
              type='text'
              className='form-control'
              name='email'
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <Input
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
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
}

export default Login
