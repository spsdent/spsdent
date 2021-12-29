import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'

import { Container, Title, TitleContainer } from './ProfilePageElements'
import UserData from '../../services/user'
import AuthData from '../../services/auth'
import { logout } from '../../store/actions/auth'

const ProfilePage = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({ email: '', password: '' })

  if (!currentUser) {
    return <Navigate to='/login' />
  }

  // const onUserDelete = () => {
  //   UserData.deleteUser(currentUser.id).then((response) => (
  //     <Navigate to='/login' />
  //   ))
  // }

  // const onInputHandle = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value })
  // }

  // const onPwdUpdate = () => {
  //   AuthData.passwordChange(userData).then((response) => {
  //     dispatch(logout())
  //     return <Navigate to='/login' />
  //   })
  // }

  return (
    <PageWrapper>
      {console.log('currentuser', currentUser.id)}
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
              width: '70%',
              height: '50%',
              display: 'flex',
            }}
          >
            <div>
              <p>
                <strong>Imie:</strong> {currentUser.imie}
              </p>
              <p>
                <strong>Nazwisko:</strong> {currentUser.nazwisko}
              </p>
              <p>
                <strong>Telefon:</strong> {currentUser.telefon}
              </p>
              <p>
                <strong>Miasto:</strong> {currentUser.miasto}
              </p>
              <p>
                <strong>Ulica:</strong> {currentUser.ulica}
              </p>
              <p>
                <strong>Kod-pocztowy:</strong> {currentUser.kodPocztowy}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '5px',
              }}
            >
              <button>Edytuj profil</button>
              <button>Usun konto</button>
            </div>
            {/* <div>
              <input
                type='text'
                name='email'
                onChange={onInputHandle}
                placeholder='E-mail'
              />
              <input
                type='password'
                name='password'
                onChange={onInputHandle}
                placeholder='Nowe haslo'
              />
              <button onClick={onPwdUpdate}>Zmien haslo</button>
            </div> */}
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
