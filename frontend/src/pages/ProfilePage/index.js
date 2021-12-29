import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'

import { Container, Title, TitleContainer } from './ProfilePageElements'

const ProfilePage = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  if (!currentUser) {
    return <Navigate to='/login' />
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
