import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form } from 'formik'

import { refreshApp } from '../../store/actions/refresh'
import DoctorService from '../../services/doctor'
import UserService from '../../services/user'
import VisitService from '../../services/visit'
import RoleService from '../../services/role'

const UpdateDoctor = () => {
  let initialState = {
    userId: '',
    imie: '',
    nazwisko: '',
    telefon: '',
    email: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
    roles: [{}],
  }
  const [user, setUser] = useState(initialState)
  const [doctorsArr, setDoctorsArr] = useState([])
  const [usersArr, setUsersArr] = useState([])
  const [rolesArr, setRolesArr] = useState([])
  const [btnType, setBtnType] = useState('')
  const { isRefresh } = useSelector((state) => state.refresh)
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    retrieveUsers()
    retrieveDoctors()
    retrieveRoles()
  }, [isRefresh])

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        console.log('users', response.data)
        setUsersArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveDoctors = () => {
    DoctorService.getAll()
      .then((response) => {
        // console.log(response.data)
        setDoctorsArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveRoles = () => {
    RoleService.getAll()
      .then((response) => {
        setRolesArr(response.data)
        console.log('roles', response.data)
      })
      .catch((e) => console.log(e))
  }

  const onDataChange = (values, setValues) => {
    if (btnType === 'dane') {
      setBtnType('')
    } else {
      setBtnType('dane')
      const { userId } = values
      const { imie, nazwisko, email, telefon, miasto, ulica, kodPocztowy } =
        usersArr.filter((user) => user._id === userId)[0]
      const updatedVisit = {
        ...user,
        imie,
        nazwisko,
        email,
        telefon,
        miasto,
        ulica,
        kodPocztowy,
        userId,
      }
      setValues(updatedVisit)
    }
  }

  const updateUser = (values) => {
    const {
      imie,
      nazwisko,
      email,
      telefon,
      kodPocztowy,
      miasto,
      ulica,
      userId,
    } = values
    let userObj = {
      imie,
      nazwisko,
      telefon,
      email,
      kodPocztowy,
      miasto,
      ulica,
    }
    UserService.updateUser(userId, userObj)
      .then((response) => {
        console.log(response)
        setBtnType('')
      })
      .catch((e) => console.log(e))
  }

  const updateRoles = (values) => {
    const { userId } = values
    let userObj = {
      roles: [values.roles],
    }
    UserService.updateUser(userId, userObj)
      .then((response) => {
        console.log(response)
        setBtnType('')
        setUser({
          roles: [{}],
        })
      })
      .catch((e) => console.log(e))
  }

  return (
    <>
      <p>Modyfikuj uzytkownika</p>
      <Formik
        initialValues={user}
        // onSubmit={(values) => updateVisit(values)}
      >
        {({ errors, touched, values, setValues, handleSubmit }) => (
          <Form
            style={{ width: '300px', display: 'flex', flexDirection: 'column' }}
          >
            <label>Wybierz uzytkownika</label>
            <Field
              as='select'
              name='userId'
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #333',
                height: '3em',
                margin: '10px 0',
              }}
            >
              <option value=''>Wybierz uzytkownika</option>
              {usersArr.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.imie} {user.nazwisko}
                </option>
              ))}
            </Field>
            {values.userId && (
              <div
                style={{ width: '100%', display: 'flex', marginTop: '20px' }}
              >
                <button
                  style={{
                    width: '100%',
                    height: '40px',
                    border: btnType === 'dane' ? 'none' : '2px solid #333',
                    background: btnType === 'dane' ? '#01D4BF' : 'transparent',
                    fontSize: '14px',
                    cursor: 'pointer',
                    marginRight: '10px',
                    padding: '10px',
                  }}
                  onClick={() => onDataChange(values, setValues)}
                >
                  Zmien dane
                </button>
                <button
                  style={{
                    width: '100%',
                    height: '40px',
                    border:
                      btnType === 'uprawnienia' ? 'none' : '2px solid #333',
                    background:
                      btnType === 'uprawnienia' ? '#01D4BF' : 'transparent',
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: '10px',
                  }}
                  onClick={() => {
                    if (btnType === 'uprawnienia') {
                      setBtnType('')
                    } else {
                      setBtnType('uprawnienia')
                    }
                  }}
                >
                  Zmien uprawnienia
                </button>
              </div>
            )}
            {btnType === 'dane' && (
              <>
                <label>Imie</label>
                <Field
                  name='imie'
                  style={{
                    width: '300px',
                    backgroundColor: 'transparent',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                    paddingLeft: '1em',
                  }}
                  placeholder='Imie'
                />
                {errors.imie && touched.imie ? (
                  <p style={{ color: 'red' }}>{errors.imie}</p>
                ) : null}
                <label>Nazwisko</label>
                <Field
                  name='nazwisko'
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                    paddingLeft: '1em',
                  }}
                  placeholder='Nazwisko'
                />
                {errors.nazwisko && touched.nazwisko ? (
                  <p style={{ color: 'red' }}>{errors.nazwisko}</p>
                ) : null}
                <label>E-mail</label>
                <Field
                  name='email'
                  type='email'
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                    paddingLeft: '1em',
                  }}
                  placeholder='E-mail'
                />
                {errors.email && touched.email ? (
                  <p style={{ color: 'red' }}>{errors.email}</p>
                ) : null}
                <label>Telefon</label>
                <Field
                  name='telefon'
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                    paddingLeft: '1em',
                  }}
                  placeholder='Telefon'
                />
                {errors.telefon && touched.telefon ? (
                  <p style={{ color: 'red' }}>{errors.telefon}</p>
                ) : null}
                <label>Miasto</label>
                <Field
                  name='miasto'
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                    paddingLeft: '1em',
                  }}
                  placeholder='Miasto'
                />
                {errors.miasto && touched.miasto ? (
                  <p style={{ color: 'red' }}>{errors.miasto}</p>
                ) : null}
                <label>Ulica</label>
                <Field
                  name='ulica'
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                    paddingLeft: '1em',
                  }}
                  placeholder='Ulica'
                />
                {errors.ulica && touched.ulica ? (
                  <p style={{ color: 'red' }}>{errors.ulica}</p>
                ) : null}
                <label>Kod-pocztowy</label>
                <Field
                  name='kodPocztowy'
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                    paddingLeft: '1em',
                  }}
                  placeholder='Kod-pocztowy'
                />
                {errors.kodPocztowy && touched.kodPocztowy ? (
                  <p style={{ color: 'red' }}>{errors.kodPocztowy}</p>
                ) : null}
                <button
                  type='submit'
                  style={{
                    backgroundColor: 'none',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                  }}
                  onClick={() => updateUser(values)}
                >
                  Aktualizuj dane
                </button>
              </>
            )}
            {btnType === 'uprawnienia' && (
              <>
                <div id='checkbox-group'>Wybierz role</div>
                <Field name='roles' as='select'>
                  <option value=''>Wybierz role</option>
                  {rolesArr.map((role) => (
                    <option value={`${role._id}`}> {role.name}</option>
                  ))}
                </Field>
                <button
                  type='submit'
                  style={{
                    backgroundColor: 'none',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                  }}
                  onClick={() => updateRoles(values)}
                >
                  Aktualizuj dane
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default UpdateDoctor
