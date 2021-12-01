import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'

import { register } from '../actions/auth'

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    )
  }
}

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    )
  }
}

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The username must be between 3 and 20 characters.
      </div>
    )
  }
}

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

const Register = () => {
  const form = useRef()
  const checkBtn = useRef()

  const [imie, setImie] = useState('')
  const [nazwisko, setNazwisko] = useState('')
  const [telefon, setTelefon] = useState('')
  const [miasto, setMiasto] = useState('')
  const [ulica, setUlica] = useState('')
  const [kodPocztowy, setKodPocztowy] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  const onChangeImie = (e) => {
    const imie = e.target.value
    setImie(imie)
  }

  const onChangeNazwisko = (e) => {
    const nazwisko = e.target.value
    setNazwisko(nazwisko)
  }

  const onChangeTelefon = (e) => {
    const telefon = e.target.value
    setTelefon(telefon)
  }

  const onChangeMiasto = (e) => {
    const miasto = e.target.value
    setMiasto(miasto)
  }

  const onChangeUlica = (e) => {
    const ulica = e.target.value
    setUlica(ulica)
  }

  const onChangeKodPocztowy = (e) => {
    const kodPocztowy = e.target.value
    setKodPocztowy(kodPocztowy)
  }

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleRegister = (e) => {
    e.preventDefault()

    setSuccessful(false)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
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
        })
        .catch(() => {
          setSuccessful(false)
        })
    }
  }

  return (
    <div>
      <div>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div>
                <label htmlFor='imie'>Imie</label>
                <Input
                  type='text'
                  name='imie'
                  value={imie}
                  onChange={onChangeImie}
                />
              </div>

              <div>
                <label htmlFor='nazwisko'>Nazwisko</label>
                <Input
                  type='text'
                  name='nazwisko'
                  value={nazwisko}
                  onChange={onChangeNazwisko}
                />
              </div>

              <div>
                <label htmlFor='telefon'>Telefon</label>
                <Input
                  type='text'
                  name='telefon'
                  value={telefon}
                  onChange={onChangeTelefon}
                />
              </div>

              <div>
                <label htmlFor='miasto'>Miasto</label>
                <Input
                  type='text'
                  name='miasto'
                  value={miasto}
                  onChange={onChangeMiasto}
                />
              </div>

              <div>
                <label htmlFor='ulica'>Ulica</label>
                <Input
                  type='text'
                  name='ulica'
                  value={ulica}
                  onChange={onChangeUlica}
                />
              </div>

              <div>
                <label htmlFor='kodpocztowy'>kodpocztowy</label>
                <Input
                  type='text'
                  name='kodpocztowy'
                  value={kodPocztowy}
                  onChange={onChangeKodPocztowy}
                />
              </div>

              <div>
                <label htmlFor='email'>Email</label>
                <Input
                  type='text'
                  name='email'
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>

              <div>
                <label htmlFor='password'>Password</label>
                <Input
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChangePassword}
                />
              </div>

              <div>
                <button>Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div>
              <div role='alert'>{message}</div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
}

export default Register
