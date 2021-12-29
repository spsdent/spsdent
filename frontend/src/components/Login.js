import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { PageWrapper } from './PageWrapper'
import { login } from '../store/actions/auth'
import { Link } from 'react-router-dom'

const styles = {
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
  buttonStyle: {
    backgroundColor: 'none',
    border: '2px solid #333',
    height: '3em',
    width: '200px',
    margin: '10px 0',
    cursor: 'pointer',
  },
}

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
        props.history.push('/add-visit')
        window.location.reload()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  if (isLoggedIn) {
    return <Navigate to='/add-visit' />
  }

  return (
    <PageWrapper>
      <div>
        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label htmlFor='email'>E-mail</label>
            <input
              type='text'
              name='email'
              value={email}
              onChange={onChangeEmail}
              style={styles.inputStyle}
              placeholder='Imie'
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={password}
              onChange={onChangePassword}
              style={styles.inputStyle}
              placeholder='Password'
            />
          </div>

          <div>
            <button style={styles.buttonStyle}>
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
        <div style={{ display: 'flex', color: '#333' }}>
          <p style={{ marginRight: '5px' }}>Zapomniales hasla?</p>
          <Link
            style={{ textDecoration: 'none', color: '#333' }}
            to='/password-change'
          >
            Zresetuj haslo!
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Login
