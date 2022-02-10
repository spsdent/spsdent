import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { register } from '../../store/actions/auth'
import { signupValidationSchema } from '../../utils/validationSchemas'
import { clearMessage } from '../../store/actions/message'
import styled from 'styled-components'

import {
  Title,
  FormContainer,
  FormInput,
} from '../AddVisitPage/AddVisitPageElements'
import {
  ErrorText,
} from '../ControlPanelPage/ControlPanelPageElements'

import {
  TitleContainer,
  AddVisitContainer,
  LoginContainer,
  StyledLink,
} from '../LoginPage/LoginPageElements'
import HashLoader from 'react-spinners/HashLoader'

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

const Register = () => {
  const initialValues = {
    imie: '',
    nazwisko: '',
    telefon: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
    email: '',
    password: '',
  }
  const [successful, setSuccessful] = useState(false)
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  // funkcja zajmujaca sie rejestracja
  // values sa z formularza, a actions to obiekt ktory jest dostarczany przez formik ze zdefiniowanymi metodami
  // register jest zdefiniowana w store/actions/auth
  const handleRegister = (values, actions) => {
    const {
      imie,
      nazwisko,
      telefon,
      miasto,
      ulica,
      kodPocztowy,
      email,
      password,
    } = values

    dispatch(
      register(
        imie,
        nazwisko,
        telefon,
        miasto,
        ulica,
        kodPocztowy,
        email,
        password
      )
    )
      .then(() => {
        setSuccessful(true)
        actions.resetForm()
      })
      .catch(() => {
        setSuccessful(false)
      })
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
          {!successful ? (
            <>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  handleRegister(values, actions)
                }}
                validationSchema={signupValidationSchema}
              >
                {({ handleBlur }) => (
                  <Form>
                    <FormContainer>
                      <LoginContainer
                        register
                        initial={{ opacity: 0, scale: 0, rotate: -60 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <TitleContainer>
                          <Title>Zarejestruj</Title>
                          <Title primary>się</Title>
                        </TitleContainer>

                        <Field
                          type='text'
                          name='imie'
                          as={MyStyledInput}
                          placeholder='Imię'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='imie'>
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          type='text'
                          name='nazwisko'
                          placeholder='Nazwisko'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='nazwisko'>
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          type='number'
                          name='telefon'
                          placeholder='Telefon'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='telefon'>
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          type='text'
                          name='miasto'
                          placeholder='Miasto'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='miasto'>
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          type='text'
                          name='ulica'
                          placeholder='Ulica'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='ulica'>
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          type='number'
                          name='kodPocztowy'
                          placeholder='Kod-pocztowy'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='kodPocztowy'>
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          type='text'
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
                          placeholder='Haslo'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='password'>
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>

                        <StyledBtn type='submit'>Zarejestruj się</StyledBtn>
                        <StyledBtn type='reset'>Wyczyść pola</StyledBtn>
                        {message && <ErrorText primary>{message}</ErrorText>}
                      </LoginContainer>
                    </FormContainer>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <>
              {message && <ErrorText>{message}</ErrorText>}
              <StyledLink
                to='/logowanie'
                onClick={() => dispatch(clearMessage())}
              >
                Przejdź do logowania!
              </StyledLink>
            </>
          )}
        </AddVisitContainer>
      )}
    </PageWrapper>
  )
}

export default Register
