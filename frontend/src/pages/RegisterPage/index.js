import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../../store/actions/auth'
import { signupValidationSchema } from '../../utils/validationSchemas'
import { clearMessage } from '../../store/actions/message'

import {
  AddVisitContainer,
  Title,
  TitleContainer,
  FormButton,
  FormColumn,
  FormContainer,
  FormError,
  FormInput,
} from '../AddVisitPage/AddVisitPageElements'

import {
  ModalShadow,
  ModalContainer as MC,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from '../VisitPage/VisitPageElements'
import styled from 'styled-components'

const MyStyledInput = FormInput.withComponent('input')
const MyStyledButton = FormButton.withComponent('button')

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
  // const navigate = useNavigate()

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
        // navigate('/login')
      })
      .catch(() => {
        setSuccessful(false)
      })
  }

  return (
    <PageWrapper>
      <AddVisitContainer>
        {!successful ? (
          <>
            <TitleContainer>
                <Title>Zarejestruj</Title>
                <Title primary>się</Title>
              </TitleContainer>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                handleRegister(values, actions)
              }}
              validationSchema={signupValidationSchema}
            >
              {({ values, errors, touched, handleBlur }) => (
                <Form>
                  <FormContainer>
                    <FormColumn>
                      <Field
                        type='text'
                        name='imie'
                        as={MyStyledInput}
                        placeholder='Imie'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='imie'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>
                      <Field
                        type='text'
                        name='nazwisko'
                        as={MyStyledInput}
                        placeholder='Nazwisko'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='nazwisko'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>
                      <Field
                        type='number'
                        name='telefon'
                        as={MyStyledInput}
                        placeholder='Telefon'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='telefon'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>
                      <Field
                        type='text'
                        name='miasto'
                        as={MyStyledInput}
                        placeholder='Miasto'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='miasto'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>
                      <Field
                        type='text'
                        name='ulica'
                        as={MyStyledInput}
                        placeholder='Ulica'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='ulica'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>
                      <Field
                        type='number'
                        name='kodPocztowy'
                        as={MyStyledInput}
                        placeholder='Kod-pocztowy'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='kodPocztowy'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>
                      <Field
                        type='text'
                        name='email'
                        as={MyStyledInput}
                        placeholder='E-mail'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='email'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>
                      <Field
                        type='password'
                        name='password'
                        as={MyStyledInput}
                        placeholder='Haslo'
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name='password'>
                        {(msg) => <FormError>{msg}</FormError>}
                      </ErrorMessage>
                      <FormButton type='submit'>Zarejestruj</FormButton>
                      <FormButton type='reset'>Wyczysc pola</FormButton>
                      {message && (
                        <p style={{ color: 'red', textAlign: 'center' }}>
                          {message}
                        </p>
                      )}
                    </FormColumn>
                  </FormContainer>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <div
            style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#333' }}
          >
            {message && (
              <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
            )}
            <Link
              style={{ textDecoration: 'none', color: '#01D4BF' }}
              to='/login'
              onClick={() => dispatch(clearMessage())}
            >
              Przejdź do logowania!
            </Link>
          </div>
        )}
      </AddVisitContainer>
    </PageWrapper>
  )
}

export default Register
