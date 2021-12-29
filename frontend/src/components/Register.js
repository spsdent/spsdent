import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageWrapper } from './PageWrapper'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'

import { register } from '../store/actions/auth'

const styles = {
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
  buttonStyle: {
    backgroundColor: 'none',
    border: '2px solid #333',
    height: '3em',
    width: '200px',
    margin: '10px 0',
    cursor: 'pointer',
  },
}

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

const vimie = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        Imie must be between 3 and 20 characters.
      </div>
    )
  }
}

const vnazwisko = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        Nazwisko must be between 3 and 20 characters.
      </div>
    )
  }
}

const vtelefon = (value) => {
  if (value.length < 8 || value.length > 10) {
    return (
      <div className='alert alert-danger' role='alert'>
        Telefon must be have 9 digits.
      </div>
    )
  }
}

const vmiasto = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        Miasto must be between 3 and 20 characters.
      </div>
    )
  }
}

const vulica = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        Ulica must be between 3 and 20 characters.
      </div>
    )
  }
}

const vkodpocztowy = (value) => {
  if (value.length < 4 || value.length > 6) {
    return (
      <div className='alert alert-danger' role='alert'>
        Kod pocztowy must be have 5 digits.
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

  return (
    <PageWrapper>
      <div>
        <form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div style={styles.formGroup}>
                <label htmlFor='imie'>Imie</label>
                <input
                  type='text'
                  name='imie'
                  value={imie}
                  onChange={onChangeImie}
                  validations={[required, vimie]}
                  style={styles.inputStyle}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor='nazwisko'>Nazwisko</label>
                <input
                  type='text'
                  name='nazwisko'
                  value={nazwisko}
                  onChange={onChangeNazwisko}
                  validations={[required, vnazwisko]}
                  style={styles.inputStyle}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor='telefon'>Telefon</label>
                <input
                  type='text'
                  name='telefon'
                  value={telefon}
                  onChange={onChangeTelefon}
                  validations={[required, vtelefon]}
                  style={styles.inputStyle}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor='miasto'>Miasto</label>
                <input
                  type='text'
                  name='miasto'
                  value={miasto}
                  onChange={onChangeMiasto}
                  validations={[required, vmiasto]}
                  style={styles.inputStyle}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor='ulica'>Ulica</label>
                <input
                  type='text'
                  name='ulica'
                  value={ulica}
                  onChange={onChangeUlica}
                  validations={[required, vulica]}
                  style={styles.inputStyle}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor='kodpocztowy'>kodpocztowy</label>
                <input
                  type='text'
                  name='kodpocztowy'
                  value={kodPocztowy}
                  onChange={onChangeKodPocztowy}
                  validations={[required, vkodpocztowy]}
                  style={styles.inputStyle}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  name='email'
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                  style={styles.inputStyle}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                  style={styles.inputStyle}
                />
              </div>

              <div style={styles.formGroup}>
                <button style={styles.buttonStyle}>Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div>
              <div role='alert'>{message}</div>
            </div>
          )}
        </form>
      </div>
    </PageWrapper>
  )
}

export default Register
