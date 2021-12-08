import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'
import { login } from '../store/actions/auth'
import { Formik, Form, Field } from 'formik'

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail jest wymagany...')
    .email()
    .label('E-mail'),
  password: Yup.string()
    .required('Haslo jest wymagane...')
    .label('Haslo')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym min.: 1 dużą, 1 małą, cyfre i znak specjalny'
    ),
})

const Login = (props) => {
  const initialState = {
    email: '',
    password: '',
  }
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()

  const handleLogin = (values) => {
    const { email, password } = values

    dispatch(login(email, password))
      .then(() => {
        props.history.push('/profile')
        window.location.reload()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  if (isLoggedIn) {
    return <Navigate to='/profile' />
  }

  return (
    <>
      <h1>Login Page</h1>
      <Formik
        initialValues={initialState}
        onSubmit={(values, actions) => {
          handleLogin(values)
          actions.resetForm()
        }}
        validationSchema={loginValidationSchema}
      >
        {({ errors, touched, values }) => (
          <Form
            style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
          >
            <label htmlFor='email'>E-mail</label>
            <Field type='email' name='email' id='email' placeholder='Email' />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label htmlFor='password'>Password</label>
            <Field
              type='password'
              name='password'
              id='password'
              placeholder='Password'
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type='submit'>
              {loading && <span></span>}
              <span>Login</span>
            </button>
            <button type='reset'>Reset</button>
          </Form>
        )}
      </Formik>
      {message && <h1>{message}</h1>}
    </>
  )
}

export default Login
