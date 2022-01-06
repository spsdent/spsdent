import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { Formik, Form } from 'formik'
import { Pattern } from '../../components/Pattern'
import { useNavigate } from 'react-router'

import {
  Container,
  Title,
  TitleContainer,
  DashboardContainer,
  VitalInfoContainer,
  VitalInfoText,
  VitalInfoEdit,
  VitalInfoSocket,
  ButtonDashboard,
  PasswordChangeContainer,
  ButtonsContainer,
  ButtonVitalInfo,
  DashboardVisitContainer,
  DashboardVisit,
  DashboardVisitTitle,
  DashboardVisitText,
  DashboardVisitButton,
} from './ProfilePageElements'
import AuthData from '../../services/auth'
import { logout } from '../../store/actions/auth'
import UserData from '../../services/user'

const ProfilePage = () => {
  const [initialValues, setInitialValues] = useState({
    imie: '',
    nazwisko: '',
    kodPocztowy: '',
    telefon: '',
    miasto: '',
    email: '',
    ulica: '',
  })
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [userPwdData, setUserPwdData] = useState({ email: '', password: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPwd, setIsChangingPwd] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
    const { imie, nazwisko, kodPocztowy, email, ulica, miasto, telefon } =
      currentUser
    setInitialValues({
      imie,
      nazwisko,
      kodPocztowy,
      email,
      ulica,
      miasto,
      telefon,
    })
  }, [])

  const onInputHandle = (e) => {
    const { name, value } = e.target
    setUserPwdData({ ...userPwdData, [name]: value })
  }

  const onPwdUpdate = () => {
    AuthData.passwordChange(userPwdData).then((response) => {
      dispatch(logout())
      navigate('/login')
    })
  }

  const isUser = currentUser.roles[currentUser.roles.length - 1] === 'ROLE_USER'
  const isDoctor =
    currentUser.roles[currentUser.roles.length - 1] === 'ROLE_SPEC'

  const deleteAccount = () => {
    setIsDelete(false)
    UserData.deleteUser(currentUser.id)
      .then((response) => {
        dispatch(logout())
        navigate('/login')
      })
      .catch((e) => console.log('Blad podczas usuwania konta'))
  }

  return (
    <PageWrapper>
      <Container>
        <TitleContainer>
          <Title
            transition={{ type: 'spring', bounce: 0.5, duration: 1.2 }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
          >
            Panel
          </Title>
          <Title
            primary
            transition={{ type: 'spring', bounce: 0.5, duration: 1.7 }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
          >
            Pacjenta
          </Title>
        </TitleContainer>
        <DashboardContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <VitalInfoContainer>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log(values)
              }}
            >
              {({
                errors,
                touched,
                values,
                setValues,
                handleChange,
                handleBlur,
              }) => (
                <>
                  <Form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '40%',
                    }}
                  >
                    <VitalInfoSocket>
                      <VitalInfoText primary>Imię:</VitalInfoText>
                      <VitalInfoText>{currentUser.imie}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type='text'
                        name='imie'
                        placeholder='Imie'
                        value={values.imie}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Nazwisko:</VitalInfoText>
                      <VitalInfoText>{currentUser.nazwisko}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type='text'
                        name='nazwisko'
                        placeholder='Nazwisko'
                        value={values.nazwisko}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Telefon:</VitalInfoText>
                      <VitalInfoText>{currentUser.telefon}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type='text'
                        name='telefon'
                        placeholder='Telefon'
                        value={values.telefon}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Miasto:</VitalInfoText>
                      <VitalInfoText>{currentUser.miasto}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type='text'
                        name='miasto'
                        placeholder='Miasto'
                        value={values.miasto}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    )}
                  </Form>
                  <Form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '40%',
                    }}
                  >
                    <VitalInfoSocket>
                      <VitalInfoText primary>Ulica:</VitalInfoText>
                      <VitalInfoText>{currentUser.ulica}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type='text'
                        name='ulica'
                        placeholder='Ulica'
                        value={values.ulica}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Kod pocztowy:</VitalInfoText>
                      <VitalInfoText>{currentUser.kodPocztowy}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type='text'
                        name='kodPocztowy'
                        placeholder='Kod-pocztowy'
                        value={values.kodPocztowy}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Email:</VitalInfoText>
                      <VitalInfoText>{currentUser.email}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type='text'
                        name='email'
                        placeholder='E-mail'
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    )}
                    {isEditing && (
                      <ButtonVitalInfo>Zapisz zmiany</ButtonVitalInfo>
                    )}
                  </Form>
                </>
              )}
            </Formik>
            {isChangingPwd && (
              <>
                <PasswordChangeContainer>
                  <VitalInfoText password>Zmiana hasła</VitalInfoText>
                  <VitalInfoEdit
                    type='text'
                    name='email'
                    placeholder='E-mail'
                    onChange={onInputHandle}
                  />
                  <VitalInfoEdit
                    password
                    type='password'
                    name='password'
                    placeholder='Nowe haslo'
                    onChange={onInputHandle}
                  />
                  <ButtonDashboard onClick={onPwdUpdate}>
                    Zmień hasło
                  </ButtonDashboard>
                  {/* <ButtonDashboard
                    onClick={() => setIsChangingPwd(!isChangingPwd)}
                  >
                    Anuluj zmianę hasła
                  </ButtonDashboard> */}
                </PasswordChangeContainer>
              </>
            )}
            <ButtonsContainer>
              <ButtonDashboard onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Anuluj edycję' : 'Edytuj profil'}
              </ButtonDashboard>
              <ButtonDashboard onClick={() => setIsChangingPwd(!isChangingPwd)}>
                {isChangingPwd ? 'Anuluj zmianę' : 'Zmień hasło'}
              </ButtonDashboard>
              <ButtonDashboard onClick={() => setIsDelete(true)}>
                Usuń konto
              </ButtonDashboard>
            </ButtonsContainer>
          </VitalInfoContainer>

          {(isUser || isDoctor) && (
            <DashboardVisitContainer>
              <DashboardVisit primary>
                <DashboardVisitTitle>Najbliższa wizyta</DashboardVisitTitle>
                <DashboardVisitText primary>Usługa</DashboardVisitText>
                <DashboardVisitText>
                  Badanie lekarsko-stomatologiczne
                </DashboardVisitText>
                <DashboardVisitText primary>Specjalista</DashboardVisitText>
                <DashboardVisitText>Tosia Dyskretka</DashboardVisitText>
                <DashboardVisitText primary>Data</DashboardVisitText>
                <DashboardVisitText>21.03.21</DashboardVisitText>
                <DashboardVisitText primary>Godzina</DashboardVisitText>
                <DashboardVisitText>12:30</DashboardVisitText>
                <DashboardVisitButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Przejdź do wizyty
                </DashboardVisitButton>
              </DashboardVisit>
              <DashboardVisit>
                <DashboardVisitTitle>Ostatnia wizyta</DashboardVisitTitle>
                <DashboardVisitText primary>Usługa</DashboardVisitText>
                <DashboardVisitText>
                  Badanie lekarsko-stomatologiczne
                </DashboardVisitText>
                <DashboardVisitText primary>Specjalista</DashboardVisitText>
                <DashboardVisitText>Adrian Kotletka</DashboardVisitText>
                <DashboardVisitText primary>Data</DashboardVisitText>
                <DashboardVisitText>06.01.21</DashboardVisitText>
                <DashboardVisitText primary>Godzina</DashboardVisitText>
                <DashboardVisitText>11:00</DashboardVisitText>
                <DashboardVisitButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Przejdź do wizyty
                </DashboardVisitButton>
              </DashboardVisit>
            </DashboardVisitContainer>
          )}
        </DashboardContainer>
        {isDelete && (
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
                Na pewno chcesz usunąć konto?
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
                  onClick={() => setIsDelete(false)}
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
                  onClick={deleteAccount}
                >
                  Tak
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Pattern
        src='/Pattern.png'
        top={'70%'}
        left={'5%'}
        transition={{ type: 'spring', bounce: 0.7, duration: 3, delay: 0.4 }}
        initial={{ opacity: 0, x: -200, rotate: 60 }}
        animate={{ opacity: 1, x: 0, rotate: 90 }}
      />
      <Pattern
        src='/Pattern.png'
        top={'5%'}
        left={'80%'}
        transition={{ type: 'spring', bounce: 0.5, duration: 2, delay: 0.6 }}
        initial={{ opacity: 0, rotate: 90, scale: 1 }}
        animate={{ opacity: 1, rotate: 45, scale: 1.2 }}
      />
    </PageWrapper>
  )
}

export default ProfilePage
