import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'

import { Container, Title, TitleContainer } from './ProfilePageElements'
import UserData from '../../services/user'
import AuthData from '../../services/auth'
import { logout } from '../../store/actions/auth'

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
    backgroundColor: 'transparent',
    border: '2px solid #333',
    cursor: 'pointer',
    padding: '.5rem 0',
  },
}

const ProfilePage = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    imie: '',
    nazwisko: '',
    telefon: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
    email: '',
  })
  const [userPwdData, setUserPwdData] = useState({ email: '', password: '' })
  const [isEditing, setIsEditing] = useState(false)

  if (!currentUser) {
    return <Navigate to='/login' />
  }

  // const onUserDelete = () => {
  //   UserData.deleteUser(currentUser.id).then((response) => (
  //     <Navigate to='/login' />
  //   ))
  // }

  // const onUserUpdate = () => {

  // }

  const onInputHandle = (e) => {
    const { name, value } = e.target
    setUserPwdData({ ...userPwdData, [name]: value })
    setUserData({ ...userData, [name]: value })
  }

  const onPwdUpdate = () => {
    AuthData.passwordChange(userPwdData).then((response) => {
      dispatch(logout())
      return <Navigate to='/login' />
    })
  }

  return (
    <PageWrapper>
      <Container>
        <TitleContainer>
          <Title>Panel</Title>
          <Title primary>Pacjenta</Title>
        </TitleContainer>
        <div
          style={{
            backgroundColor: '#fff',
            width: '100%',
            padding: '2rem',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: ' column',
            gap: '30px',
            margin: '30px 0',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '50%',
              display: 'grid',
              gridTemplateColumns: '80% 20%',
            }}
          >
            {console.log('xxxx', currentUser)}
            <div>
              <p>
                <strong>Imie:</strong> {currentUser.imie}
              </p>
              {isEditing && (
                <input
                  type='text'
                  name='imie'
                  onChange={onInputHandle}
                  placeholder='Imie'
                  style={styles.inputStyle}
                />
              )}
              <p>
                <strong>Nazwisko:</strong> {currentUser.nazwisko}
              </p>
              {isEditing && (
                <input
                  type='text'
                  name='nazwisko'
                  onChange={onInputHandle}
                  placeholder='Nazwisko'
                  style={styles.inputStyle}
                />
              )}
              <p>
                <strong>Telefon:</strong> {currentUser.telefon}
              </p>
              {isEditing && (
                <input
                  type='text'
                  name='telefon'
                  onChange={onInputHandle}
                  placeholder='Telefon'
                  style={styles.inputStyle}
                />
              )}
              <p>
                <strong>Miasto:</strong> {currentUser.miasto}
              </p>
              {isEditing && (
                <input
                  type='text'
                  name='miasto'
                  onChange={onInputHandle}
                  placeholder='Miasto'
                  style={styles.inputStyle}
                />
              )}
              <p>
                <strong>Ulica:</strong> {currentUser.ulica}
              </p>
              {isEditing && (
                <input
                  type='text'
                  name='ulica'
                  onChange={onInputHandle}
                  placeholder='Ulica'
                  style={styles.inputStyle}
                />
              )}
              <p>
                <strong>Kod-pocztowy:</strong> {currentUser.kodPocztowy}
              </p>
              {isEditing && (
                <input
                  type='text'
                  name='kodPocztowy'
                  onChange={onInputHandle}
                  placeholder='Kod-pocztowy'
                  style={styles.inputStyle}
                />
              )}
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              {isEditing && (
                <input
                  type='text'
                  name='email'
                  onChange={onInputHandle}
                  placeholder='E-mail'
                  style={styles.inputStyle}
                />
              )}
              {isEditing && (
                <div
                  style={{
                    width: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <p>Zmien haslo</p>
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
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '5px',
              }}
            >
              <button
                style={styles.buttonStyle}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Zakoncz edycje' : 'Edytuj profil'}
              </button>
              <button style={styles.buttonStyle}>Usun konto</button>
            </div>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                marginRight: '10px',
              }}
            >
              <p>Najblizsza wizyta</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Usluga
              </span>
              <p>Badanie lekarsko-stomatologiczne</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Specjalista
              </span>
              <p>Leno Paleno</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Data
              </span>
              <p>21.21.21</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Godzina
              </span>
              <p>15</p>
              <p style={{ marginTop: '30px' }}>Przejdz do wizyty</p>
            </div>
            <div
              style={{
                width: '100%',
                marginLeft: '10px',
              }}
            >
              <p>Ostatnia wizyta</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Usluga
              </span>
              <p>Badanie lekarsko-stomatologiczne</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Specjalista
              </span>
              <p>Leno Paleno</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Data
              </span>
              <p>21.21.21</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Godzina
              </span>
              <p>15</p>
              <p style={{ marginTop: '30px' }}>Przejdz do wizyty</p>
            </div>
          </div>
        </div>
      </Container>
    </PageWrapper>
  )
}

export default ProfilePage
