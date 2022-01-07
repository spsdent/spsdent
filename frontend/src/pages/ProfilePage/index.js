import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { Formik, Form, Field } from 'formik'
import { Pattern } from '../../components/Pattern'
import { useNavigate } from 'react-router'

import {
  updateUserDataValidationSchema,
  signInChangePasswordValidationSchema,
} from '../../utils/validationSchemas'

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
import { logout, changePassword } from '../../store/actions/auth'
import { refreshApp } from '../../store/actions/refresh'
import UserData from '../../services/user'
import { useFetchAllUsers } from '../../hooks'

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
  const [oldUserValues, setOldUserValues] = useState()
  const { user: currentUser } = useSelector((state) => state.auth)
  const { isRefresh } = useSelector((state) => state.refresh)
  const { message } = useSelector((state) => state.message)
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPwd, setIsChangingPwd] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [userData, setUserData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const allUsers = useFetchAllUsers()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    UserData.getAll().then((response) => {
      setIsLoading(false)
      const signInUser = response.data.filter(
        (user) => user._id === currentUser.id
      )[0]
      const { imie, nazwisko, kodPocztowy, email, ulica, miasto, telefon } =
        signInUser
      const obj = {
        imie,
        nazwisko,
        kodPocztowy,
        email,
        ulica,
        miasto,
        telefon,
      }
      setUserData(obj)
      setInitialValues(obj)
      setOldUserValues(obj)
    })
  }, [isRefresh])

  const isUser = currentUser.roles[currentUser.roles.length - 1] === 'ROLE_USER'
  const isDoctor =
    currentUser.roles[currentUser.roles.length - 1] === 'ROLE_SPEC'

  const onAccountDelete = () => {
    setIsDelete(false)
    UserData.deleteUser(currentUser.id)
      .then((response) => {
        dispatch(logout())
        navigate('/login')
      })
      .catch((e) => console.log('Blad podczas usuwania'))
  }

  const onPwdUpdate = (values, actions) => {
    let updateObj = { ...values, email: currentUser.email }
    dispatch(changePassword(updateObj))
      .then((response) => {
        dispatch(logout())
        actions.resetForm()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onUserUpdate = (values, actions) => {
    UserData.updateUser(currentUser.id, values)
      .then((response) => {
        setIsEditing(false)
        dispatch(refreshApp())
      })
      .catch((e) => {
        console.log(e)
      })
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
              validationSchema={updateUserDataValidationSchema}
              onSubmit={(values, actions) => {
                onUserUpdate(values, actions)
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
                      <VitalInfoText>{userData.imie}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <>
                        <VitalInfoEdit
                          type='text'
                          name='imie'
                          placeholder='Imie'
                          value={values.imie}
                          onBlur={handleBlur}
                        />
                        {errors.imie && touched.imie ? (
                          <p style={{ color: 'red' }}>{errors.imie}</p>
                        ) : null}
                      </>
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Nazwisko:</VitalInfoText>
                      <VitalInfoText>{userData.nazwisko}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <>
                        <VitalInfoEdit
                          type='text'
                          name='nazwisko'
                          placeholder='Nazwisko'
                          value={values.nazwisko}
                          onBlur={handleBlur}
                        />
                        {errors.nazwisko && touched.nazwisko ? (
                          <p style={{ color: 'red' }}>{errors.nazwisko}</p>
                        ) : null}
                      </>
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Telefon:</VitalInfoText>
                      <VitalInfoText>{userData.telefon}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <>
                        <VitalInfoEdit
                          type='text'
                          name='telefon'
                          placeholder='Telefon'
                          value={values.telefon}
                          onBlur={handleBlur}
                        />
                        {errors.telefon && touched.telefon ? (
                          <p style={{ color: 'red' }}>{errors.telefon}</p>
                        ) : null}
                      </>
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Miasto:</VitalInfoText>
                      <VitalInfoText>{userData.miasto}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <>
                        <VitalInfoEdit
                          type='text'
                          name='miasto'
                          placeholder='Miasto'
                          value={values.miasto}
                          onBlur={handleBlur}
                        />
                        {errors.miasto && touched.miasto ? (
                          <p style={{ color: 'red' }}>{errors.miasto}</p>
                        ) : null}
                      </>
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
                      <VitalInfoText>{userData.ulica}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <>
                        <VitalInfoEdit
                          type='text'
                          name='ulica'
                          placeholder='Ulica'
                          value={values.ulica}
                          onBlur={handleBlur}
                        />
                        {errors.miasto && touched.miasto ? (
                          <p style={{ color: 'red' }}>{errors.miasto}</p>
                        ) : null}
                      </>
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Kod pocztowy:</VitalInfoText>
                      <VitalInfoText>{userData.kodPocztowy}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <>
                        <VitalInfoEdit
                          type='text'
                          name='kodPocztowy'
                          placeholder='Kod-pocztowy'
                          value={values.kodPocztowy}
                          onBlur={handleBlur}
                        />
                        {errors.kodPocztowy && touched.kodPocztowy ? (
                          <p style={{ color: 'red' }}>{errors.kodPocztowy}</p>
                        ) : null}
                      </>
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Email:</VitalInfoText>
                      <VitalInfoText>{userData.email}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <>
                        <VitalInfoEdit
                          type='text'
                          name='email'
                          placeholder='E-mail'
                          value={values.email}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                          <p style={{ color: 'red' }}>{errors.email}</p>
                        ) : null}
                      </>
                    )}
                    {isEditing && (
                      <ButtonVitalInfo type='submit'>
                        Zapisz zmiany
                      </ButtonVitalInfo>
                    )}
                  </Form>
               
                </>
              )}
            </Formik>
            <Formik
              enableReinitialize
              initialValues={{ oldPassword: '', newPassword: '' }}
              validationSchema={signInChangePasswordValidationSchema}
              onSubmit={(values, actions) => onPwdUpdate(values, actions)}
            >
              {({ errors, touched, values, setValues }) => (
                <>
                <Form>
                  {isChangingPwd && (
                    <>
                      <PasswordChangeContainer>
                        <VitalInfoText password>Zmiana hasła</VitalInfoText>
                        <VitalInfoEdit
                          type='password'
                          name='oldPassword'
                          placeholder='Stare haslo'
                          value={values.oldPassword}
                        />
                        {errors.oldPassword && touched.oldPassword ? (
                          <p style={{ color: 'red' }}>{errors.oldPassword}</p>
                        ) : null}
                        <VitalInfoEdit
                          type='password'
                          name='newPassword'
                          placeholder='Nowe haslo'
                          value={values.newPassword}
                        />
                        {errors.newPassword && touched.newPassword ? (
                          <p style={{ color: 'red' }}>{errors.newPassword}</p>
                        ) : null}
                        <ButtonDashboard type='submit'>
                          Zmień hasło
                        </ButtonDashboard>
                        {message && (
                          <p style={{ color: 'red', textAlign: 'center' }}>
                            {message}
                          </p>
                        )}
                      </PasswordChangeContainer>
                    </>
                  )}
                  
                </Form>
                   <ButtonsContainer>
                   <ButtonDashboard
                     type='button'
                     onClick={() => {
                       if (isEditing) {
                         setIsEditing(false)
                       } else {
                         setIsEditing(true)
                       }
                       setValues(oldUserValues)
                     }}
                   >
                     {isEditing ? 'Anuluj edycję' : 'Edytuj profil'}
                   </ButtonDashboard>
                   <ButtonDashboard
                     type='button'
                     onClick={() => setIsChangingPwd(!isChangingPwd)}
                   >
                     {isChangingPwd ? 'Anuluj zmianę' : 'Zmień hasło'}
                   </ButtonDashboard>
                   <ButtonDashboard onClick={() => setIsDelete(true)}>
                     Usuń konto
                   </ButtonDashboard>
                 </ButtonsContainer>
                 </>
              )}
            </Formik>
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
                  onClick={onAccountDelete}
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
