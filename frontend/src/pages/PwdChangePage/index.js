import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import AuthData from '../../services/auth'
import { logout } from '../../store/actions/auth'
import { Formik, Field, Form } from 'formik'
import { passwordChangeValidationSchema } from '../../utils/validationSchemas'

const styles = {
  inputStyle: {
    width: '300px',
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
  buttonStyle: {
    width: '300px',
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    cursor: 'pointer',
  },
}

const PwdChangePage = () => {
  const initialValues = {
    email: '',
    newPassword: '',
  }
  const dispatch = useDispatch()
  const { user: currentUser } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const onPwdUpdate = (values) => {
    const { email, newPassword: password } = values
    console.log(values)
    AuthData.passwordChange({ email, password })
      .then((response) => {
        if (currentUser) {
          dispatch(logout())
        }
        return <Navigate to='/login' />
      })
      .catch((e) => console.log(e))
  }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Zmien haslo</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => onPwdUpdate(values)}
          validationSchema={passwordChangeValidationSchema}
        >
          {({ values, errors }) => (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <Field
                type='text'
                name='email'
                placeholder='E-mail'
                value={values.email}
                style={styles.inputStyle}
              />
              <p style={{ color: 'red', textAlign: 'center' }}>
                {errors.email}
              </p>
              <Field
                type='password'
                name='newPassword'
                placeholder='Nowe haslo'
                value={values.newPassword}
                style={styles.inputStyle}
              />
              <p style={{ color: 'red', textAlign: 'center' }}>
                {errors.newPassword}
              </p>
              <button style={styles.buttonStyle}>Zmien haslo</button>
            </Form>
          )}
        </Formik>
        {message && (
          <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
        )}
      </div>
    </PageWrapper>
  )
}

export default PwdChangePage
