import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import UserData from '../../services/user'
import AuthData from '../../services/auth'
import { logout } from '../../store/actions/auth'

import { Container, Title, TitleContainer } from './PwdChangePageElements'

const styles = {
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputStyle: {
    width: '250px',
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
  buttonStyle: {
    width: '250px',
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    cursor: 'pointer',
  },
}

const PwdChangePage = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({ email: '', password: '' })
  const [msg, setMsg] = useState('')

  const onInputHandle = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const onPwdUpdate = () => {
    AuthData.passwordChange(userData)
      .then((response) => {
        dispatch(logout())
        setUserData({ email: '', password: '' })
        setMsg('Haslo zostalo zmienione pomyslnie!')
        return <Navigate to='/login' />
      })
      .catch((e) => setMsg('Wystapil blad podczas zmiany hasla', e))
  }

  return (
    <PageWrapper>
      <Container>
        <TitleContainer>
          <Title>Zmien</Title>
          <Title primary>haslo</Title>
        </TitleContainer>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <input
            type='text'
            name='email'
            onChange={onInputHandle}
            placeholder='E-mail'
            style={styles.inputStyle}
          />
          <input
            type='password'
            name='password'
            onChange={onInputHandle}
            placeholder='Nowe haslo'
            style={styles.inputStyle}
          />
          <button style={styles.buttonStyle} onClick={onPwdUpdate}>
            Zmien haslo
          </button>
        </div>
        <span>{msg}</span>
      </Container>
    </PageWrapper>
  )
}

export default PwdChangePage
