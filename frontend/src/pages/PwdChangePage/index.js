import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { changePassword, logout } from '../../store/actions/auth'
import { Formik, Field, Form } from 'formik'
import { passwordChangeValidationSchema } from '../../utils/validationSchemas'
import { Link } from 'react-router-dom'

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Zmien haslo</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            onPwdUpdate(values, actions)
          }}
          validationSchema={passwordChangeValidationSchema}
        >
          {({ values, errors, touched }) => (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <Field
                type='text'
                name='email'
                placeholder='E-mail'
                value={values.email}
                style={styles.inputStyle}
              />
              {errors.email && touched.email ? (
                <p style={{ color: 'red' }}>{errors.email}</p>
              ) : null}
              <Field
                type='password'
                name='oldPassword'
                placeholder='Stare haslo'
                value={values.oldPassword}
                style={styles.inputStyle}
              />
              {errors.oldPassword && touched.oldPassword ? (
                <p style={{ color: 'red' }}>{errors.oldPassword}</p>
              ) : null}
              <Field
                type='password'
                name='newPassword'
                placeholder='Nowe haslo'
                value={values.newPassword}
                style={styles.inputStyle}
              />
              {errors.newPassword && touched.newPassword ? (
                <p style={{ color: 'red' }}>{errors.newPassword}</p>
              ) : null}
              <button style={styles.buttonStyle}>Zmien haslo</button>
              {message && (
                <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
              )}
            </Form>
          )}
        </Formik>
        <div style={{ display: 'flex', color: '#333' }}>
          <p style={{ marginRight: '5px' }}>Chcesz utworzyć konto?</p>
          <Link
            style={{ textDecoration: 'none', color: '#01D4BF' }}
            to='/register'
          >
            Kliknij tutaj!
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}

export default PwdChangePage
