import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { login } from '../../store/actions/auth'
import { PageWrapper } from '../../components/PageWrapper'
import { Field, Form, Formik } from 'formik'
import { loginValidationSchema } from '../../utils/validationSchemas'
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

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  }
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)
  let navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogin = (values) => {
    const { email, password } = values

    dispatch(login(email, password))
      .then(() => {
        dispatch(clearMessage())
        navigate('/settings')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  if (isLoggedIn) {
    return <Navigate to='/settings' />
  }

  return (
    <PageWrapper>
      <AddVisitContainer>
        <TitleContainer>
          <Title>Zaloguj</Title>
          <Title primary>się</Title>
        </TitleContainer>
        <Formik
          onSubmit={(values) => handleLogin(values)}
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
        >
          {({ errors, values, touched, handleBlur }) => (
            <Form>
              <FormContainer>
                <FormColumn>
                  <Field
                    type='email'
                    name='email'
                    as={MyStyledInput}
                    placeholder='E-mail'
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p style={{ color: 'red' }}>{errors.email}</p>
                  ) : null}

                  <Field
                    type='password'
                    name='password'
                    as={MyStyledInput}
                    placeholder='Haslo'
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p style={{ color: 'red' }}>{errors.password}</p>
                  ) : null}

                  <FormButton>Zaloguj</FormButton>

                  {message && (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                      {message}
                    </p>
                  )}
                  <div style={{ display: 'flex', color: '#333' }}>
                    <p style={{ marginRight: '5px' }}>Chcesz utworzyć konto?</p>
                    <Link
                      style={{ textDecoration: 'none', color: '#01D4BF' }}
                      to='/register'
                    >
                      Kliknij tutaj!
                    </Link>
                  </div>
                  <div style={{ display: 'flex', color: '#333' }}>
                    <p style={{ marginRight: '5px' }}>Zapomniales hasla?</p>
                    <Link
                      style={{ textDecoration: 'none', color: '#01D4BF' }}
                      to='/password-change'
                    >
                      Zresetuj haslo!
                    </Link>
                  </div>
                </FormColumn>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </AddVisitContainer>
    </PageWrapper>
  )
}

export default LoginPage
