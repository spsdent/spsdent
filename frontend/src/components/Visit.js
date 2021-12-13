import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import VisitDataService from '../services/visit'
import { refreshApp } from '../store/actions/refresh'
import { PageWrapper } from './PageWrapper'

const Visit = () => {
  let { state } = useLocation()
  let navigate = useNavigate()
  const { refresh: isRefresh } = useSelector((state) => state)
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
        navigate('/archive-visits')
      })
      .catch((e) => console.log(e))
  }
  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Wizyta</h1>
        <div
          style={{
            width: '250px',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            marginBottom: '10px',
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
          <p>Status: {state.status === false ? 'W trakcie' : 'Odbyta'}</p>
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
            <button onClick={() => changeVisitStatus(state.id, state.status)} style={{
              backgroundColor: 'transparent',
              border: '2px solid white',
              color: '#fff',
              padding: '5px',
              marginRight: '5px',
              cursor: 'pointer',
            }}>
              Zmien status
            </button>
          ) : null}
          <button onClick={() => navigate('/visits')} style={{
                    backgroundColor: 'white',
                    color: '#333',
                    padding: '5px',
                    marginRight: '5px',
                    cursor: 'pointer',
                    border: 'none'
                  }}>
            Wroc do listy wizyt
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Visit
