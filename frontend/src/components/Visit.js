import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import VisitDataService from '../services/visit'
import { refreshApp } from '../store/actions/refresh'

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
    <>
      {console.log(state)}
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
          style={{ backgroundColor: 'red', border: 0, color: '#fff' }}
        >
          X
        </button>
        {(isAdmin || isSpec) ? (
          <button onClick={() => changeVisitStatus(state.id, state.status)}>
            Zmien status
          </button>
        ) : null}
        <button onClick={() => navigate('/visits')}>Wroc do listy wizyt</button>
      </div>
    </>
  )
}

export default Visit
