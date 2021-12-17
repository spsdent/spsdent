import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form } from 'formik'
import Select from 'react-select'

import { refreshApp } from '../../store/actions/refresh'
import DoctorService from '../../services/doctor'
import UserService from '../../services/user'
import RoleService from '../../services/role'
import ServiceData from '../../services/service'

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
    doctorId: '',
    specjalnosci: [],
    godzinyStart: '',
    godzinyKoniec: '',
  }
  const [user, setUser] = useState(initialState)
  const [doctorsArr, setDoctorsArr] = useState([])
  const [usersArr, setUsersArr] = useState([])
  const [rolesArr, setRolesArr] = useState([])
  const [specsArr, setSpecsArr] = useState([])
  const [btnType, setBtnType] = useState('')
  const [selectedSpecs, setSelectedSpecs] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const { isRefresh } = useSelector((state) => state.refresh)
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    retrieveUsers()
    retrieveDoctors()
    retrieveRoles()
    retrieveSpecs()
  }, [isRefresh])

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        setUsersArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveDoctors = () => {
    DoctorService.getAll()
      .then((response) => {
        setDoctorsArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveRoles = () => {
    RoleService.getAll()
      .then((response) => {
        setRolesArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveSpecs = () => {
    ServiceData.getAll()
      .then((response) => {
        setSpecsArr(response.data)
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
        setBtnType('')
        setUser({
          roles: [{}],
        })
        setSelectedOption(null)
        setErrorMsg('')
      })
      .catch((e) => console.log(e))
  }

  const updateRoles = (values) => {
    const { userId } = values
    const rolesIdArr = selectedOption.map((option) => option.value)
    let userObj = {
      roles: rolesIdArr,
    }
    UserService.updateUser(userId, userObj)
      .then((response) => {
        setBtnType('')
        setUser({
          roles: [{}],
        })
        setSelectedOption(null)
        setErrorMsg('')
      })
      .catch((e) => console.log(e))
  }

  const handleDoctor = (values) => {
    const specsIdArr = selectedSpecs.map((spec) => ({
      id: spec.value,
      nazwa: spec.label,
    }))
    let godzinyPracy = []
    for (let i = +values.godzinyStart; i <= +values.godzinyKoniec; i++) {
      godzinyPracy = [...godzinyPracy, i]
    }
    let doctorObj = {
      doctorId: values.userId,
      specjalnosci: specsIdArr,
      godzinyPracy,
    }
    DoctorService.create(doctorObj)
      .then((response) => {
        setBtnType('')
        setUser({
          godzinyStart: '',
          godzinyKoniec: '',
        })
        setSelectedSpecs(null)
        setErrorMsg('')
        console.log(response)
      })
      .catch((e) => console.log(e))
  }

  const handleUpdateMethods = (values) => {
    if (selectedOption && !selectedSpecs) {
      updateRoles(values)
    } else if (selectedOption && selectedSpecs) {
      updateRoles(values)
      handleDoctor(values)
    } else if (selectedSpecs) {
      handleDoctor(values)
    } else {
      setErrorMsg('Jesli chcesz zaktualizowac wprowadz dane')
    }
  }

  const onFillInputs = (values) => {
    let arr = doctorsArr.filter(
      (doctor) => doctor.doctorId === values.userId
    )[0].godzinyPracy

    values.godzinyStart = arr[0]
    values.godzinyKoniec = arr[arr.length - 1]
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
                {/* <div id='checkbox-group'>Wybierz role</div>
                <Field
                  name='roles'
                  as='select'
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                  }}
                >
                  <option value=''>Wybierz role</option>
                  {rolesArr.map((role) => (
                    <option value={`${role._id}`}> {role.name}</option>
                  ))}
                </Field> */}
                <label>Role</label>
                <Select
                  isMulti
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={rolesArr.map((role) => ({
                    value: role._id,
                    label: role.name,
                  }))}
                />
                {doctorsArr.filter(
                  (doctor) => doctor.doctorId === values.userId
                ).length > 0 ? (
                  <>
                    <label>Specjalizacja</label>
                    <Select
                      isMulti
                      defaultValue={selectedSpecs}
                      onChange={setSelectedSpecs}
                      options={specsArr.map((spec) => ({
                        value: spec._id,
                        label: spec.grupa,
                      }))}
                    />
                    {onFillInputs(values)}
                    <label>Godziny pracy</label>
                    <div style={{ display: 'flex' }}>
                      <p>Od</p>
                      <Field
                        name='godzinyStart'
                        style={{
                          backgroundColor: 'transparent',
                          border: '2px solid #333',
                          height: '3em',
                          paddingLeft: '1em',
                          width: '100%',
                          marginRight: '5px',
                        }}
                        placeholder='Start pracy'
                      />
                      <p>do</p>
                      <Field
                        name='godzinyKoniec'
                        style={{
                          backgroundColor: 'transparent',
                          border: '2px solid #333',
                          height: '3em',
                          paddingLeft: '1em',
                          width: '100%',
                          marginLeft: '5px',
                        }}
                        placeholder='Koniec pracy'
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <label>Specjalizacja</label>
                    <Select
                      isMulti
                      defaultValue={selectedSpecs}
                      onChange={setSelectedSpecs}
                      options={specsArr.map((spec) => ({
                        value: spec._id,
                        label: spec.grupa,
                      }))}
                    />

                    <label>Godziny pracy</label>
                    <div style={{ display: 'flex' }}>
                      <p>Od</p>
                      <Field
                        name='godzinyStart'
                        style={{
                          backgroundColor: 'transparent',
                          border: '2px solid #333',
                          height: '3em',
                          paddingLeft: '1em',
                          width: '100%',
                          marginRight: '5px',
                        }}
                        placeholder='Start pracy'
                      />
                      <p>do</p>
                      <Field
                        name='godzinyKoniec'
                        style={{
                          backgroundColor: 'transparent',
                          border: '2px solid #333',
                          height: '3em',
                          paddingLeft: '1em',
                          width: '100%',
                          marginLeft: '5px',
                        }}
                        placeholder='Koniec pracy'
                      />
                    </div>
                  </>
                )}
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <button
                  type='submit'
                  style={{
                    backgroundColor: 'none',
                    border: '2px solid #333',
                    height: '3em',
                    margin: '10px 0',
                  }}
                  onClick={() => handleUpdateMethods(values)}
                >
                  Aktualizuj uprawnienia
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
