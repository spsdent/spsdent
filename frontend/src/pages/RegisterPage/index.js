import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { Formik, Form, Field } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../../store/actions/auth'
import { signupValidationSchema } from '../../utils/validationSchemas'
import { clearMessage } from '../../store/actions/message'

const styles = {
  inputStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
    width: '300px',
  },
  buttonStyle: {
    backgroundColor: 'none',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    cursor: 'pointer',
    width: '300px',
  },
}

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!successful ? (
          <>
            <h1>Zarejestruj sie</h1>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                handleRegister(values, actions)
              }}
              validationSchema={signupValidationSchema}
            >
              {({ values, errors, touched, handleBlur }) => (
                <Form style={{ display: 'flex', flexDirection: 'column' }}>
                  <Field
                    type='text'
                    name='imie'
                    value={values.imie}
                    style={styles.inputStyle}
                    placeholder='Imie'
                    onBlur={handleBlur}
                  />
                  {errors.imie && touched.imie ? (
                    <p style={{ color: 'red' }}>{errors.imie}</p>
                  ) : null}
                  <Field
                    type='text'
                    name='nazwisko'
                    value={values.nazwisko}
                    style={styles.inputStyle}
                    placeholder='Nazwisko'
                    onBlur={handleBlur}
                  />
                  {errors.nazwisko && touched.nazwisko ? (
                    <p style={{ color: 'red' }}>{errors.nazwisko}</p>
                  ) : null}
                  <Field
                    type='number'
                    name='telefon'
                    value={values.telefon}
                    style={styles.inputStyle}
                    placeholder='Telefon'
                    onBlur={handleBlur}
                  />
                  {errors.telefon && touched.telefon ? (
                    <p style={{ color: 'red' }}>{errors.telefon}</p>
                  ) : null}
                  <Field
                    type='text'
                    name='miasto'
                    value={values.miasto}
                    style={styles.inputStyle}
                    placeholder='Miasto'
                    onBlur={handleBlur}
                  />
                  {errors.miasto && touched.miasto ? (
                    <p style={{ color: 'red' }}>{errors.miasto}</p>
                  ) : null}
                  <Field
                    type='text'
                    name='ulica'
                    value={values.ulica}
                    style={styles.inputStyle}
                    placeholder='Ulica'
                    onBlur={handleBlur}
                  />
                  {errors.ulica && touched.ulica ? (
                    <p style={{ color: 'red' }}>{errors.ulica}</p>
                  ) : null}
                  <Field
                    type='number'
                    name='kodPocztowy'
                    value={values.kodPocztowy}
                    style={styles.inputStyle}
                    placeholder='Kod-pocztowy'
                    onBlur={handleBlur}
                  />
                  {errors.kodPocztowy && touched.kodPocztowy ? (
                    <p style={{ color: 'red' }}>{errors.kodPocztowy}</p>
                  ) : null}
                  <Field
                    type='text'
                    name='email'
                    value={values.email}
                    style={styles.inputStyle}
                    placeholder='E-mail'
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p style={{ color: 'red' }}>{errors.email}</p>
                  ) : null}
                  <Field
                    type='password'
                    name='password'
                    value={values.password}
                    style={styles.inputStyle}
                    placeholder='Haslo'
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p style={{ color: 'red' }}>{errors.password}</p>
                  ) : null}
                  <button style={styles.buttonStyle} type='submit'>
                    Zarejestruj
                  </button>
                  <button style={styles.buttonStyle} type='reset'>
                    Wyczysc pola
                  </button>
                  {message && (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                      {message}
                    </p>
                  )}
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <div
            style={{ display: 'flex', flexDirection: 'column', color: '#333' }}
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
      </div>
    </PageWrapper>
  )
}

export default Register
