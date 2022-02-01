import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { changePassword, logout } from '../../store/actions/auth'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { passwordChangeValidationSchema } from '../../utils/validationSchemas'
import { Link } from 'react-router-dom'
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

const PwdChangePage = () => {
  const initialValues = {
    email: '',
    oldPassword: '',
    newPassword: '',
  }
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.message)

  const onPwdUpdate = (values, actions) => {
    dispatch(changePassword(values))
      .then(() => {
        actions.resetForm()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <PageWrapper>
      <AddVisitContainer>
        <TitleContainer>
          <Title>Zmień</Title>
          <Title primary>hasło</Title>
        </TitleContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            onPwdUpdate(values, actions)
          }}
          validationSchema={passwordChangeValidationSchema}
        >
          {({ values, errors, touched, handleBlur }) => (
            <Form>
              <FormContainer>
                <FormColumn>
                  <Field
                    type='text'
                    name='email'
                    placeholder='E-mail'
                    as={MyStyledInput}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name='email'>
                    {(msg) => <FormError>{msg}</FormError>}
                  </ErrorMessage>

                  <Field
                    type='password'
                    name='oldPassword'
                    placeholder='Stare haslo'
                    as={MyStyledInput}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name='oldPassword'>
                    {(msg) => <FormError>{msg}</FormError>}
                  </ErrorMessage>
                  <Field
                    type='password'
                    name='newPassword'
                    placeholder='Nowe haslo'
                    as={MyStyledInput}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name='newPassword'>
                    {(msg) => <FormError>{msg}</FormError>}
                  </ErrorMessage>
                  <FormButton>Zmien haslo</FormButton>
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
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#333',
            fontSize: '24px',
          }}
        >
          <p style={{ marginRight: '5px' }}>Chcesz utworzyć konto?</p>
          <Link
            style={{ textDecoration: 'none', color: '#01D4BF' }}
            to='/register'
            onClick={() => dispatch(clearMessage())}
          >
            Kliknij tutaj!
          </Link>
        </div>
      </AddVisitContainer>
    </PageWrapper>
  )
}

export default PwdChangePage
