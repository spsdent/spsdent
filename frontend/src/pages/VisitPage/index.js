import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import VisitDataService from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import { PageWrapper } from '../../components/PageWrapper'

import {Container, VisitContainer, VisitTitleContainer, VisitTitle,  VisitText } from './VisitPageElements'


const VisitPage = () => {
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
        navigate('/archive')
      })
      .catch((e) => console.log(e))
  }
  return (
    <PageWrapper>
      <Container>
      <VisitTitleContainer>
        <VisitTitle primary>Szczegóły</VisitTitle>
        <VisitTitle>Rezerwacji</VisitTitle>
        </VisitTitleContainer>
          <VisitContainer>
          < VisitText>Usługa: {state.usluga}</ VisitText>
          < VisitText>Specjalista: {state.specjalista}</ VisitText>
          < VisitText>Data: {state.data}</ VisitText>
          < VisitText>Godzina: {state.godzina}</ VisitText>
          < VisitText>Telefon: {state.telefon}</ VisitText>
          < VisitText>Imię: {state.imie}</ VisitText>
          < VisitText>Nazwisko: {state.nazwisko}</ VisitText>
          < VisitText>Miasto: {state.miasto}</ VisitText>
          < VisitText>Ulica: {state.ulica}</ VisitText>
          < VisitText>Kod pocztowy: {state.kodPocztowy}</ VisitText>
          < VisitText>Status: {state.status === false ? 'W trakcie' : 'Zrealizowna'}</ VisitText>
          <button
            onClick={() => deleteVisit(state)}
      
          >
            Usuń wizytę
          </button>
          {isAdmin || isSpec ? (
            <button
              onClick={() => changeVisitStatus(state.id, state.status)}
            >
              Archiwizuj wizytę
            </button>
          ) : null}
          <button
            onClick={() => navigate('/visits')}
          >
            Wróć do listy wizyt
          </button>
        </VisitContainer>
      </Container>
    </PageWrapper>
  )
}

export default VisitPage
