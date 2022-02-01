import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { login } from '../../store/actions/auth'
import { PageWrapper } from '../../components/PageWrapper'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { loginValidationSchema } from '../../utils/validationSchemas'
import { clearMessage } from '../../store/actions/message'
import {
  AddVisitContainer,
  Title,
  TitleContainer,
  FormButton,
  FormColumn,
  FormContainer,
  FormInput,
  FormError,
} from '../AddVisitPage/AddVisitPageElements'

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
