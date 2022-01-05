import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import VisitDataService from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import { PageWrapper } from '../../components/PageWrapper'

import { Container, Title } from './VisitPageElements'

const styles = {
  buttonStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    cursor: 'pointer',
    padding: '.5rem 0',
    width: '300px',
    margin: '0 auto',
  },
}

const VisitPage = () => {
  let { state } = useLocation()
  let navigate = useNavigate()
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const isAdmin = currentUser.roles.includes('ROLE_ADMIN')
  const isSpec = currentUser.roles.includes('ROLE_SPEC')

  const deleteVisit = (item) => {
    VisitDataService.remove(item.id)
      .then((response) => {
        console.log('Usunieto wizyte pomyslnie!')
        dispatch(refreshApp())
        navigate('/visits')
      })
      .catch((e) => console.log(e))
  }

  const changeVisitStatus = (id, status) => {
    let data = {
      status: !status,
    }
    VisitDataService.update(id, data)
      .then((response) => {
        console.log('Zaktualizowano pomyslnie')
        dispatch(refreshApp())
        navigate('/archive')
      })
      .catch((e) => console.log(e))
  }
  return (
    <PageWrapper>
      <Container>
        <Title>Wizyta</Title>
        <div
          style={{
            backgroundColor: '#fff',
            width: '100%',
            padding: '2rem',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: ' column',
            gap: '10px',
          }}
        >
          <p>Usluga: {state.usluga}</p>
          <p>Specjalista: {state.specjalista}</p>
          <p>Data: {state.data}</p>
          <p>Godzina: {state.godzina}</p>
          <p>Telefon: {state.telefon}</p>
          <p>Imie: {state.imie}</p>
          <p>Nazwisko: {state.nazwisko}</p>
          <p>Miasto: {state.miasto}</p>
          <p>Ulica: {state.ulica}</p>
          <p>Kod-pocztowy: {state.kodPocztowy}</p>
          <p>Status: {state.status === false ? 'W trakcie' : 'Zrealizowna'}</p>
          <button
            onClick={() => deleteVisit(state)}
            style={{
              backgroundColor: 'transparent',
              border: '2px solid white',
              color: '#fff',
              padding: '5px',
              marginRight: '5px',
              cursor: 'pointer',
            }}
          >
            X
          </button>
          {isAdmin || isSpec ? (
            <button
              onClick={() => changeVisitStatus(state.id, state.status)}
              style={{
                backgroundColor: 'transparent',
                border: '2px solid white',
                color: '#fff',
                padding: '5px',
                marginRight: '5px',
                cursor: 'pointer',
              }}
            >
              Zmien status
            </button>
          ) : null}
          <button
            onClick={() => navigate('/visits')}
            style={styles.buttonStyle}
          >
            Wroc do listy wizyt
          </button>
        </div>
      </Container>
    </PageWrapper>
  )
}

export default VisitPage
