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
} from './VisitPageElements'
import { Pattern } from '../../components/Pattern'
import useFetchAllUsers from '../../hooks/useFetchAllUsers'

const VisitPage = () => {
  let { state } = useLocation()
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { user: currentUser } = useSelector((state) => state.auth)
  const isAdmin = currentUser.roles.includes('ROLE_ADMIN')
  const isSpec = currentUser.roles.includes('ROLE_SPEC')
  const [isOpen, setIsOpen] = useState(false)
  const [actionType, setActionType] = useState('')
  const location = useLocation()
  const backRoute = location.pathname.split('/')[1]
  const allUsers = useFetchAllUsers()
  const visitSpecialist = allUsers.filter(
    (user) => user._id === state.specjalista
  )[0]

  const onHandleAction = () => {
    if (actionType === 'usun') {
      VisitDataService.remove(state.id)
        .then((response) => {
          setIsOpen(false)
          dispatch(refreshApp())
          navigate('/visits')
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
          navigate('/archive')
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
                Specjalista:{' '}
                {`${visitSpecialist.imie} ${visitSpecialist.nazwisko}`}
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
                  onClick={() => navigate(`/${backRoute}`)}
                >
                  {state.status === false
                    ? 'Wróć do aktualnych wizyt'
                    : 'Wróć do archiwum wizyt'}
                </ButtonVisit>
              </ButtonContainer>
            </VisitContainer>
            {isOpen && (
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  backgroundColor: 'rgba(3,3,3,.5)',
                  zIndex: '999',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '50%',
                    height: '50%',
                    backgroundColor: '#fff',
                    left: '0',
                    right: '0',
                    top: '25%',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <h2 style={{ marginBottom: '20px' }}>
                    {actionType === 'usun'
                      ? 'Na pewno chcesz usunąć wizytę?'
                      : actionType === 'archiwizuj'
                      ? 'Na pewno chcesz zarchiwizowac wizytę?'
                      : null}
                  </h2>
                  <div
                    style={{
                      position: 'relative',
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: 'transparent',
                        border: '2px solid #333',
                        padding: '.75em 50px',
                        marginRight: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      Nie
                    </button>
                    <button
                      style={{
                        backgroundColor: '#01d4bf',
                        border: '2px solid transparent',
                        padding: '.75em 50px',
                        marginLeft: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={onHandleAction}
                    >
                      Tak
                    </button>
                  </div>
                </div>
              </div>
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
