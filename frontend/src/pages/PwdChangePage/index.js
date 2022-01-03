import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { changePassword, logout } from '../../store/actions/auth'
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
  let navigate = useNavigate()

  const onPwdUpdate = (values, actions) => {
    const { email, newPassword: password } = values
    dispatch(changePassword({ email, password }))
      .then(() => {
        if (currentUser) {
          dispatch(logout())
        }
        actions.resetForm()
        navigate('/login')
      })
      .catch((e) => {
        console.log(e)
      })
    // AuthData.passwordChange({ email, password })
    //   .then((response) => {
    //     if (currentUser) {
    //       dispatch(logout())
    //     }
    //     values = initialValues
    //     return <Navigate to='/login' />
    //   })
    //   .catch((e) => console.log(e))
  }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Zmien haslo</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            onPwdUpdate(values, actions)
          }}
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
              {message && (
                <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </PageWrapper>
  )
}

export default PwdChangePage
