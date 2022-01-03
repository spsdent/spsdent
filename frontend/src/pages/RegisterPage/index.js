import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'

import { register } from '../../store/actions/auth'
import { signupValidationSchema } from '../../utils/validationSchemas'

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
  const navigate = useNavigate()

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
        navigate('/login')
      })
      .catch(() => {
        setSuccessful(false)
      })
  }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Zarejestruj sie</h1>

        {!successful && (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              handleRegister(values, actions)
            }}
            validationSchema={signupValidationSchema}
          >
            {({ values, errors }) => (
              <Form style={{ display: 'flex', flexDirection: 'column' }}>
                <Field
                  type='text'
                  name='imie'
                  value={values.imie}
                  style={styles.inputStyle}
                  placeholder='Imie'
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {errors.imie}
                </p>
                <Field
                  type='text'
                  name='nazwisko'
                  value={values.nazwisko}
                  style={styles.inputStyle}
                  placeholder='Nazwisko'
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {errors.nazwisko}
                </p>
                <Field
                  type='text'
                  name='telefon'
                  value={values.telefon}
                  style={styles.inputStyle}
                  placeholder='Telefon'
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {errors.telefon}
                </p>
                <Field
                  type='text'
                  name='miasto'
                  value={values.miasto}
                  style={styles.inputStyle}
                  placeholder='Miasto'
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {errors.miasto}
                </p>
                <Field
                  type='text'
                  name='ulica'
                  value={values.ulica}
                  style={styles.inputStyle}
                  placeholder='Ulica'
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {errors.ulica}
                </p>
                <Field
                  type='text'
                  name='kodPocztowy'
                  value={values.kodPocztowy}
                  style={styles.inputStyle}
                  placeholder='Kod-pocztowy'
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {errors.kodPocztowy}
                </p>
                <Field
                  type='text'
                  name='email'
                  value={values.email}
                  style={styles.inputStyle}
                  placeholder='E-mail'
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {errors.email}
                </p>
                <Field
                  type='password'
                  name='password'
                  value={values.password}
                  style={styles.inputStyle}
                  placeholder='Haslo'
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {errors.password}
                </p>
                <button style={styles.buttonStyle}>Zarejestruj</button>
                <button style={styles.buttonStyle} type='reset'>
                  Wyczysc pola
                </button>
                {message && <p>{message}</p>}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </PageWrapper>
  )
}

export default Register
