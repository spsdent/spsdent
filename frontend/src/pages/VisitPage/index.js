import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import VisitDataService from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import { PageWrapper } from '../../components/PageWrapper'
import {
  Container,
  VisitContainer,
  VisitTitleContainer,
  VisitTitle,
  VisitText,
  ButtonContainer,
  ButtonVisit,
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from './VisitPageElements'
import { Pattern } from '../../components/Pattern'
import useFetchAllUsers from '../../hooks/useFetchAllUsers'

const VisitPage = () => {
  
  let {
    state: { item: state, bRoute },
  } = useLocation()
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { user: currentUser } = useSelector((state) => state.auth)
  const isAdmin = currentUser.roles.includes('ROLE_ADMIN')
  const isSpec = currentUser.roles.includes('ROLE_SPEC')
  const [actionType, setActionType] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const backRoute = location.pathname.split('/')[1]
  const allUsers = useFetchAllUsers()


  // funkcja odpowiedzialna za wykonanie odpowiedniej akcji w zaleznosci od kliknietego przycisku
  const onHandleAction = () => {
    if (actionType === 'usun') {
      VisitDataService.remove(state.id)
        .then((response) => {
          setIsOpen(false)
          dispatch(refreshApp())
          navigate('/wizyty')
        })
        .catch((e) => console.log(e))
    } else {
      let data = {
        status: !state.status,
      }
      VisitDataService.update(state.id, data)
        .then((response) => {
          setIsOpen(false)
          dispatch(refreshApp())
          navigate('/archiwum-wizyt')
        })
        .catch((e) => console.log(e))
    }
  }

  return (
    <PageWrapper>
      <Container>
        {allUsers.length > 0 && (
          <>
            <VisitTitleContainer>
              <VisitTitle
                primary
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Szczegóły
              </VisitTitle>
              <VisitTitle
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Rezerwacji
              </VisitTitle>
            </VisitTitleContainer>
            <VisitContainer
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <VisitText>Usługa: {state.usluga}</VisitText>
              <VisitText>
                Specjalista:
                {`${state.specjalista.imie} ${state.specjalista.nazwisko}`}
              </VisitText>
              <VisitText>Data: {state.data}</VisitText>
              <VisitText>Godzina: {state.godzina}</VisitText>
              <VisitText>Telefon: {state.telefon}</VisitText>
              <VisitText>Imię: {state.imie}</VisitText>
              <VisitText>Nazwisko: {state.nazwisko}</VisitText>
              <VisitText>Miasto: {state.miasto}</VisitText>
              <VisitText>Ulica: {state.ulica}</VisitText>
              <VisitText>Kod pocztowy: {state.kodPocztowy}</VisitText>
              <VisitText>
                Status: {state.status === false ? 'W trakcie' : 'Zrealizowna'}
              </VisitText>
              <ButtonContainer>
                <ButtonVisit
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsOpen(true)
                    setActionType('usun')
                  }}
                  primary={!isAdmin && !isSpec && true}
                >
                  Usuń wizytę
                </ButtonVisit>
                {isAdmin || isSpec ? (
                  <ButtonVisit
                    primary={(isAdmin || isSpec) && true}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsOpen(true)
                      setActionType('archiwizuj')
                    }}
                  >
                    {state.status === false
                      ? 'Archiwizuj wizytę'
                      : 'Uaktualnij wizyte'}
                  </ButtonVisit>
                ) : null}
                <ButtonVisit
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/${bRoute ? bRoute : backRoute}`)}
                >
                  {bRoute
                    ? bRoute === 'grafik'
                      ? 'Wróć do grafiku'
                      : 'Wróć do ustawień konta'
                    : state.status === false
                    ? 'Wróć do aktualnych wizyt'
                    : 'Wróć do archiwum wizyt'}
                </ButtonVisit>
              </ButtonContainer>
            </VisitContainer>
            {isOpen && (
              <ModalShadow>
                <ModalContainer>
                  <ModalText>
                    {actionType === 'usun'
                      ? 'Na pewno chcesz usunąć wizytę?'
                      : actionType === 'archiwizuj'
                      ? 'Na pewno chcesz zarchiwizowac wizytę?'
                      : null}
                  </ModalText>
                  <ModalButtonsContainer>
                    <ModalButton primary onClick={() => setIsOpen(false)}>
                      Nie
                    </ModalButton>
                    <ModalButton onClick={onHandleAction}>Tak</ModalButton>
                  </ModalButtonsContainer>
                </ModalContainer>
              </ModalShadow>
            )}
          </>
        )}
      </Container>

      <Pattern
        src='/pattern.png'
        top='50%'
        left='18%'
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      />
      <Pattern
        src='/pattern.png'
        top='35%'
        left='65%'
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      />
    </PageWrapper>
  )
}

export default VisitPage
