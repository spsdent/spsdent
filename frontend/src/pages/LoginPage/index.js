import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { login } from '../../store/actions/auth'
import { PageWrapper } from '../../components/PageWrapper'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import { loginValidationSchema } from '../../utils/validationSchemas'
import { clearMessage } from '../../store/actions/message'
import {
  Title,
  FormContainer,
  FormInput,
} from '../AddVisitPage/AddVisitPageElements'
import {
  UserText,
  ErrorText,
} from '../ControlPanelPage/ControlPanelPageElements'
import {
  TitleContainer,
  AddVisitContainer,
  LoginContainer,
  FieldContainer,
  TextContainer,
  StyledLink,
} from './LoginPageElements'
import HashLoader from 'react-spinners/HashLoader'
import styled from 'styled-components'

export const FI = styled(FormInput)`
  background-color: transparent;
  border: 2px solid #333;
  padding: 0.5em 0 0.5em 1em;
  width: 18em;
  margin: 0.6em 0;
  outline: none;
  color: #333;
  font-family: 'Poppins';
  font-size: 15px;
  max-width: 350px;

  @media screen and (max-width: 1500px) {
    font-size: 13px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 11px;
  }
  @media screen and (max-width: 960px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 7px;
    max-width: 400px;
  }
`

const StyledBtn = styled.button`
  width: 18em;
  padding: 1em 0;
  max-width: 350px;
  margin-top: 20px;
  border: 2px solid #333;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s ease;

  &:hover {
    background-color: #01d4bf;
    color: #fff;
    border-color: #fff;
  }

  @media screen and (max-width: 1500px) {
    font-size: 13px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 11px;
  }
  @media screen and (max-width: 960px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 7px;
    max-width: 400px;
  }
`

const MyStyledInput = FI.withComponent('input')

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  }
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)
  let navigate = useNavigate()

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

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
      <HashLoader
        color='#01d4bf'
        loading={isLoading}
        size={50}
        css={{ width: '100%', height: '100%' }}
      />
      {!isLoading && (
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
                    <Field
                      as={MyStyledInput}
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
                    <Field
                      as={MyStyledInput}
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
                    <StyledBtn>Zaloguj się</StyledBtn>

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
      )}
    </PageWrapper>
  )
}

export default LoginPage
