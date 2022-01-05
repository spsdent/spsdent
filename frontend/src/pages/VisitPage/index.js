import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import VisitDataService from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import { PageWrapper } from '../../components/PageWrapper'
import {Container, VisitContainer, VisitTitleContainer, VisitTitle,  VisitText, ButtonContainer, ButtonVisit} from './VisitPageElements';
import { Pattern } from "../../components/Pattern";

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
        <VisitTitle primary initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0}}
        transition={{ delay: .1}}>Szczegóły</VisitTitle>
        <VisitTitle initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0}}
        transition={{ delay: .3}} >Rezerwacji</VisitTitle>
        </VisitTitleContainer>
          <VisitContainer initial={{ opacity: 0, scale: .4 }}
        animate={{ opacity: 1, scale: 1}}
        transition={{duration: .5}}>
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
          <ButtonContainer>
          <ButtonVisit
          whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            onClick={() => deleteVisit(state)}
      
          >
            Usuń wizytę
          </ButtonVisit>
          {isAdmin || isSpec ? (
            <ButtonVisit primary
            whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onClick={() => changeVisitStatus(state.id, state.status)}
            >
              Archiwizuj wizytę
            </ButtonVisit>
          ) : null}
          <ButtonVisit
          whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/visits')}
          >
            Wróć do listy wizyt
          </ButtonVisit>
          </ButtonContainer>
        </VisitContainer>
      </Container>
      
          <Pattern
        src="/pattern.png"
        top="50%"
        left="18%"
        initial={{ opacity: 0, x: 200}}
        animate={{ opacity: 1, x: 0}}
        transition={{ duration: 1.5 }}
      />
          <Pattern
        src="/pattern.png"
        top="35%"
        left="65%"
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0}}
        transition={{ duration: 1.5 }}
      />
    </PageWrapper>
  )
}

export default VisitPage
