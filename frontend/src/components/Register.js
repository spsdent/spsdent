import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../store/actions/auth'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'

export const signupValidationSchema = Yup.object().shape({
  imie: Yup.string()
    .min(3, 'Imie musi miec co najmniej 3 znaki')
    .max(25, 'Imie moze miec maksymalnie 25 znakow')
    .required('Wprowadz imie...'),
  nazwisko: Yup.string()
    .min(3, 'Nazwisko musi miec co najmniej 3 znaki')
    .max(50, 'Nazwisko moze miec maksymalnie 50 znakow')
    .required('Wprowadz nazwisko...'),
  email: Yup.string()
    .required('Wprowadz adres e-mail...')
    .email('E-mail jest wymagany...')
    .label('E-mail'),
  password: Yup.string()
    .required('Wprowadz haslo...')
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym min.: 1 dużą, 1 małą, cyfre i znak specjalny'
    ),
  confirmPassword: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym min.: 1 dużą, 1 małą, cyfre i znak specjalny'
    )
    .oneOf([Yup.ref('password')], 'Powtarzane haslo musi byc takie same.')
    .required('Wprowadz potwierdzenie hasla...'),
  telefon: Yup.string()
    .matches(/^\d{9}$/, 'Wprowadz prawidlowy numer telefonu')
    .required('Wprowadz numer telefonu...'),
  miasto: Yup.string()
    .min(3, 'Miasto musi miec co najmniej 3 znaki')
    .max(50, 'Miasto moze miec maksymalnie 50 znakow')
    .required('Wprowadz miasto...'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Wprowadz ulice...'),
  kodPocztowy: Yup.string()
    .matches(/^\d{5}$/, 'Wprowadz prawidlowy kod pocztowy(5 znakow)')
    .required('Wprowadz kod pocztowy...'),
})

const Register = (props) => {
  const initialState = {
    imie: '',
    nazwisko: '',
    telefon: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  const handleRegister = (values) => {
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
        props.history.push('/profile')
        window.location.reload()
      })
      .catch((e) => console.log(e))
  }

  return (
    <>
      <h1>Register page</h1>
      <Formik
        initialValues={initialState}
        onSubmit={(values, actions) => {
          handleRegister(values)
          actions.resetForm()
        }}
        validationSchema={signupValidationSchema}
      >
        {({ errors, touched }) => (
          <Form
            style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
          >
            <label htmlFor='imie'>Imie</label>
            <Field name='imie' id='imie' placeholder='Imie' />
            {errors.imie && touched.imie ? <div>{errors.imie}</div> : null}
            <label htmlFor='nazwisko'>Nazwisko</label>
            <Field name='nazwisko' id='nazwisko' placeholder='Nazwisko' />
            {errors.nazwisko && touched.nazwisko ? (
              <div>{errors.nazwisko}</div>
            ) : null}

            <label htmlFor='telefon'>Telefon</label>
            <Field name='telefon' id='telefon' placeholder='Telefon' />
            {errors.telefon && touched.telefon ? (
              <div>{errors.telefon}</div>
            ) : null}
            <label htmlFor='miasto'>Miasto</label>
            <Field name='miasto' id='miasto' placeholder='Miasto' />
            {errors.miasto && touched.miasto ? (
              <div>{errors.miasto}</div>
            ) : null}
            <label htmlFor='ulica'>Ulica</label>
            <Field name='ulica' id='ulica' placeholder='Ulica' />
            {errors.ulica && touched.ulica ? <div>{errors.ulica}</div> : null}
            <label htmlFor='kodpocztowy'>Kod-pocztowy</label>
            <Field
              name='kodPocztowy'
              id='kodpocztowy'
              placeholder='Kod-pocztowy'
            />
            {errors.kodPocztowy && touched.kodPocztowy ? (
              <div>{errors.kodPocztowy}</div>
            ) : null}
            <label htmlFor='email'>E-mail</label>
            <Field type='email' name='email' id='email' placeholder='Email' />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label htmlFor='password'>Haslo</label>
            <Field
              type='password'
              name='password'
              id='password'
              placeholder='Password'
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <label htmlFor='confirmPassword'>Potworz haslo</label>
            <Field
              type='password'
              name='confirmPassword'
              id='password'
              placeholder='Powtorz haslo'
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            <button type='submit'>Register</button>
            <button type='reset'>Reset</button>
          </Form>
        )}
      </Formik>
      {message && <h1>{message}</h1>}
    </>
  )
}

export default Register
