import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { login } from '../../store/actions/auth'
import { PageWrapper } from '../../components/PageWrapper'
import { ErrorMessage, Formik, Form } from 'formik'
import { loginValidationSchema } from '../../utils/validationSchemas'
import { clearMessage } from '../../store/actions/message'
import { Title, FormContainer } from '../AddVisitPage/AddVisitPageElements'
import {
  UserText,
  StyledField,
  ErrorText,
} from '../ControlPanelPage/ControlPanelPageElements'
import {
  LoginButton,
  TitleContainer,
  AddVisitContainer,
  LoginContainer,
  FieldContainer,
  TextContainer,
  StyledLink,
} from './LoginPageElements'

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  }
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)
  let navigate = useNavigate()

  const dispatch = useDispatch()

  // funkcja zarzadzajaca zalogowaniem sie
  // jesli logowanie sie powiedzie to przenosi nas na podstrone profil
  // jesli sie nie powiedzie to MESSAGE ze stanu wyswietli komunikat o bledzie
  // login jest zdefiniowana w store/actions/auth
  const handleLogin = (values) => {
    const { email, password } = values

    dispatch(login(email, password)).then(() => {
      dispatch(clearMessage())
      navigate('/profil')
    })
  }

  if (isLoggedIn) {
    return <Navigate to='/profil' />
  }

  return (
    <PageWrapper>
      <AddVisitContainer>
        <Formik
          onSubmit={(values) => handleLogin(values)}
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
        >
          {({ handleBlur }) => (
            <Form>
              <FormContainer>
                <LoginContainer
                  initial={{ opacity: 0, scale: 0, rotate: 60 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TitleContainer>
                    <Title>Zaloguj</Title>
                    <Title primary>się</Title>
                  </TitleContainer>
                  <FieldContainer>
                    <StyledField
                      type='email'
                      name='email'
                      placeholder='E-mail'
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name='email'>
                      {(msg) => (
                        <ErrorText primary panel>
                          {msg}
                        </ErrorText>
                      )}
                    </ErrorMessage>
                  </FieldContainer>
                  <FieldContainer>
                    <StyledField
                      type='password'
                      name='password'
                      placeholder='Hasło'
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name='password'>
                      {(msg) => (
                        <ErrorText primary panel>
                          {msg}
                        </ErrorText>
                      )}
                    </ErrorMessage>
                  </FieldContainer>
                  <LoginButton>Zaloguj się</LoginButton>

                  {message && <ErrorText primary>{message}</ErrorText>}
                  <TextContainer>
                    <UserText>Chcesz utworzyć konto?</UserText>
                    <StyledLink to='/rejestracja'>Kliknij tutaj!</StyledLink>
                  </TextContainer>
                  <TextContainer>
                    <UserText>Zapomniałeś hasła?</UserText>
                    <StyledLink to='/zresetuj-haslo'>
                      Zresetuj hasło!
                    </StyledLink>
                  </TextContainer>
                </LoginContainer>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </AddVisitContainer>
    </PageWrapper>
  )
}

export default LoginPage
