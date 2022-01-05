import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'

import VisitData from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import {
  addVisitAdminValidationSchema,
  addVisitSearchUserValidationSchema,
} from '../../utils/validationSchemas'
import { PageWrapper } from '../../components/PageWrapper'

import { months, days, initialAddVisitValues, dentHours } from '../../helpers'
import {
  useFetchAllDoctors,
  useFetchAllServices,
  useFetchAllVisits,
  useFetchAllUsers,
  useCreateDates,
} from '../../hooks'
import UserData from '../../services/user'

import { register } from '../../store/actions/auth'

const styles = {
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
    margin: '10px 0',
  },
  selectStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
  errorStyle: { color: 'red' },
}

const AddVisitAdmin = () => {
  const [visit, setVisit] = useState(initialAddVisitValues)
  const [serviceGroupSelected, setServiceGroupSelected] = useState('')
  const [serviceSelected, setServiceSelected] = useState('')
  const [doctorSelected, setDoctorSelected] = useState('')
  const [selectedServicePrice, setSelectedServicePrice] = useState('')
  const [isCreateAccount, setIsCreateAccount] = useState(false)
  const [foundUsers, setFoundUsers] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const allVisitsFromDb = useFetchAllVisits()
  const allServicesFromDb = useFetchAllServices()
  const allDoctorsFromDb = useFetchAllDoctors()
  const allUsersFromDb = useFetchAllUsers()
  const dates = useCreateDates()

  const createVisit = (values) => {
    const {
      grupa,
      usluga,
      specjalista,
      data,
      godzina,
      imie,
      nazwisko,
      email,
      telefon,
      miasto,
      kodPocztowy,
      ulica,
      status,
    } = values

    // Create object with values from form
    let visitData = {
      grupa,
      usluga,
      specjalista,
      data,
      godzina,
      imie,
      nazwisko,
      email,
      telefon,
      miasto,
      kodPocztowy,
      ulica,
      status,
      cena: selectedServicePrice,
      uid: currentUser !== null ? currentUser.id : null,
    }

    //Create new visit based on provide visitData object
    VisitData.create(visitData)
      .then((response) => {
        dispatch(refreshApp())
        navigate('/visits')
      })
      .catch((e) => {
        console.log(e)
      })
    if (values.password) {
      // Create new visit based on provide visitData object
      dispatch(
        register(
          imie,
          nazwisko,
          telefon,
          miasto,
          ulica,
          kodPocztowy,
          email,
          values.password
        )
      )
        .then((e) => {
          console.log(e)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  // function responsible for display services from db as options to select
  const serviceGroupHandler = (values) => {
    // set serviceGroupSelected state with value selected in form field "grupa usluga"
    setServiceGroupSelected(values.grupa)

    // this conditon is responsible for clear select form fields when we
    // chose default options in select fields
    if (serviceGroupSelected && !serviceSelected) {
      values.specjalista = ''
      values.data = ''
      values.godzina = ''
      setDoctorSelected('')
    } else if (!serviceGroupSelected) {
      setServiceSelected('')
      setDoctorSelected('')
      values.usluga = ''
      values.data = ''
      values.godzina = ''
    }

    // returns options for select field depends on services fetched from db
    return allServicesFromDb.map((service) => (
      <option value={service.grupa}>{service.grupa}</option>
    ))
  }

  // function responsible for display services relative to before chosen value in field "grupa uslug"
  const serviceHandler = (values) => {
    // selectedGroupServices is an array which store speficic services for current selected
    // group in field "grupa uslug"
    // 1. filter all services which are accesible in DB by service.grupa name
    // 2. using map we return only properties uslugi which are arrays
    // 3. by flatMap we iterate over returned before arrays and flat from two dimensional arrays
    // to one dimensional
    const selectedGroupServices = allServicesFromDb
      .filter((service) => service.grupa === serviceGroupSelected)
      .map((service) => service.uslugi)
      .flatMap((item) => item)

    // as before we clear form select fields when change to default values
    if (serviceSelected && !doctorSelected) {
      values.godzina = ''
      values.data = ''
    } else if (!serviceSelected) {
      values.godzina = ''
      values.data = ''
      setDoctorSelected('')
    }

    // we set serviceSelected state to value usluga chosen in form field
    setServiceSelected(values.usluga)

    // return services selected group
    return selectedGroupServices.map((item) => (
      <option value={item.nazwa}>{item.nazwa}</option>
    ))
  }

  const doctorHandler = (values) => {
    const selectedGroupData = allServicesFromDb.filter(
      (service) => service.grupa === serviceGroupSelected
    )
    const selectedGroupDoctors = allDoctorsFromDb
      .filter((doctor) =>
        doctor.specjalnosci.includes(selectedGroupData[0]._id)
      )
      .map((item) => item.doctorId)
    const usersToDisplay = allUsersFromDb.filter((user) =>
      selectedGroupDoctors.includes(user._id)
    )
    const servicePrice = allServicesFromDb
      .filter((service) => service.grupa === serviceGroupSelected)[0]
      .uslugi.filter((usluga) => usluga.nazwa === serviceSelected)[0]
    setSelectedServicePrice(servicePrice.cena)
    if (doctorSelected && !values.data) {
      values.godzina = ''
    }
    setDoctorSelected(values.specjalista)
    return usersToDisplay.map((doctor) => (
      <option value={`${doctor._id}`}>
        {doctor.imie} {doctor.nazwisko}
      </option>
    ))
  }

  const selectDates = dates.map((item, index) => (
    <option
      value={`${item.date.getDate()}.${
        item.date.getMonth() + 1
      }.${item.date.getFullYear()}`}
      key={`${item.date.getDate()}.${
        item.date.getMonth() + 1
      }.${item.date.getFullYear()}`}
    >
      {`${days[item.date.getDay()]}, ${item.date.getDate()} ${
        months[item.date.getMonth()]
      } ${item.date.getFullYear()}`}
    </option>
  ))

  const pickingHours = (values) => {
    const selectedDoctorData = allDoctorsFromDb.find(
      (doctor) => doctor.doctorId === doctorSelected
    )
    const today = new Date()

    const currentDayDoctorVisits = allVisitsFromDb
      .filter(
        (visit) =>
          visit.data.split('.')[0] === values.split('.')[0] &&
          visit.specjalista === `${selectedDoctorData.doctorId}`
      )
      .map((item) => +item.godzina)
    const updatedHours = selectedDoctorData.godzinyPracy
      .filter((item) => !currentDayDoctorVisits.includes(item))
      .filter((hour) => {
        if (today.getDate() === values.split('.')[0]) {
          return hour > today.getHours()
        } else {
          return hour
        }
      })

    if (updatedHours.length > 0) {
      return updatedHours.map((item) => (
        <option value={`${item}`} key={`${item}`}>{`${item}`}</option>
      ))
    } else {
      return dentHours.map((item) => (
        <option value={`${item}`} key={`${item}`}>{`${item}`}</option>
      ))
    }
  }

  const searchUser = (values) => {
    const { pacjent } = values
    if (!pacjent) {
      setErrorMsg('Podaj nazwisko pacjenta')
    } else {
      UserData.getUsersByLastName(pacjent)
        .then((response) => {
          console.log(response.data)
          setFoundUsers(response.data)
        })
        .catch((e) => console.log(e))
    }
    console.log('test1', values)
  }

  const fillFormHandler = (user, setValues) => {
    const { imie, nazwisko, email, telefon, miasto, ulica, kodPocztowy } = user
    console.log('test2', user)
    const updatedVisit = {
      ...visit,
      imie,
      nazwisko,
      email,
      telefon,
      miasto,
      ulica,
      kodPocztowy,
    }
    setValues(updatedVisit)
    setFoundUsers([])
    setErrorMsg(null)
  }

  const resetFormField = (values, setValues) => {
    const { password, ...oldValues } = values
    setIsCreateAccount(false)
    setValues(oldValues)
  }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Zarezerwuj wizyte</h1>
        <Formik
          enableReinitialize={true}
          initialValues={visit}
          validationSchema={addVisitAdminValidationSchema}
          onSubmit={(values, actions) => {
            createVisit(values)
            actions.resetForm()
          }}
          onReset={() => setVisit(initialAddVisitValues)}
        >
          {({ errors, touched, values, setValues, handleBlur }) => (
            <>
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '300px',
                }}
              >
                <label>Grupa uslug</label>
                <Field
                  as='select'
                  name='grupa'
                  style={styles.selectStyle}
                  onBlur={handleBlur}
                >
                  <option value=''>Wybierz grupe uslugi...</option>
                  {serviceGroupHandler(values)}
                </Field>
                {errors.grupa && touched.grupa ? (
                  <p style={styles.errorStyle}>{errors.grupa}</p>
                ) : null}
                {serviceGroupSelected && (
                  <>
                    <label>Usluga</label>
                    <Field
                      as='select'
                      name='usluga'
                      style={styles.inputStyle}
                      onBlur={handleBlur}
                    >
                      <option value=''>Wybierz usluge...</option>
                      {serviceHandler(values)}
                    </Field>
                    {errors.usluga && touched.usluga ? (
                      <p style={styles.errorStyle}>{errors.usluga}</p>
                    ) : null}
                    {serviceSelected && (
                      <>
                        <label>Specjalista</label>
                        <Field
                          as='select'
                          name='specjalista'
                          style={styles.selectStyle}
                          onBlur={handleBlur}
                        >
                          <option value=''>Wybierz specjaliste...</option>
                          {doctorHandler(values)}
                        </Field>
                        {errors.specjalista && touched.specjalista ? (
                          <p style={styles.errorStyle}>{errors.specjalista}</p>
                        ) : null}
                        {doctorSelected && (
                          <>
                            <label>Data</label>
                            <Field
                              as='select'
                              name='data'
                              style={styles.selectStyle}
                              onBlur={handleBlur}
                            >
                              <option value=''>Wybierz date...</option>
                              {selectDates}
                            </Field>
                            {errors.data && touched.data ? (
                              <p style={styles.errorStyle}>{errors.data}</p>
                            ) : null}
                            {values.data && (
                              <>
                                <label>Godzina</label>
                                <Field
                                  as='select'
                                  name='godzina'
                                  style={styles.inputStyle}
                                  onBlur={handleBlur}
                                >
                                  <option value=''>Wybierz godzine...</option>
                                  {pickingHours(values.data)}
                                </Field>
                                {errors.godzina && touched.godzina ? (
                                  <p style={styles.errorStyle}>
                                    {errors.godzina}
                                  </p>
                                ) : null}
                                {/* {setChoseHour(values.godzina)} */}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                <label>Imie</label>
                <Field
                  name='imie'
                  style={styles.inputStyle}
                  placeholder='Imie'
                  onBlur={handleBlur}
                />
                {errors.imie && touched.imie ? (
                  <p style={styles.errorStyle}>{errors.imie}</p>
                ) : null}
                <label>Nazwisko</label>
                <Field
                  name='nazwisko'
                  style={styles.inputStyle}
                  placeholder='Nazwisko'
                  onBlur={handleBlur}
                />
                {errors.nazwisko && touched.nazwisko ? (
                  <p style={styles.errorStyle}>{errors.nazwisko}</p>
                ) : null}
                <label>E-mail</label>
                <Field
                  name='email'
                  type='email'
                  style={styles.inputStyle}
                  placeholder='E-mail'
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p style={styles.errorStyle}>{errors.email}</p>
                ) : null}
                <label>Telefon</label>
                <Field
                  name='telefon'
                  style={styles.inputStyle}
                  placeholder='Telefon'
                  onBlur={handleBlur}
                />
                {errors.telefon && touched.telefon ? (
                  <p style={styles.errorStyle}>{errors.telefon}</p>
                ) : null}
                <label>Miasto</label>
                <Field
                  name='miasto'
                  style={styles.inputStyle}
                  placeholder='Miasto'
                  onBlur={handleBlur}
                />
                {errors.miasto && touched.miasto ? (
                  <p style={styles.errorStyle}>{errors.miasto}</p>
                ) : null}
                <label>Ulica</label>
                <Field
                  name='ulica'
                  style={styles.inputStyle}
                  placeholder='Ulica'
                  onBlur={handleBlur}
                />
                {errors.ulica && touched.ulica ? (
                  <p style={styles.errorStyle}>{errors.ulica}</p>
                ) : null}
                <label>Kod-pocztowy</label>
                <Field
                  name='kodPocztowy'
                  style={styles.inputStyle}
                  placeholder='Kod-pocztowy'
                  onBlur={handleBlur}
                />
                {errors.kodPocztowy && touched.kodPocztowy ? (
                  <p style={styles.errorStyle}>{errors.kodPocztowy}</p>
                ) : null}
                {!allUsersFromDb.filter((user) => user.email === values.email)
                  .length ? (
                  <>
                    {isCreateAccount ? (
                      <>
                        <p style={{ fontSize: '.75em' }}>
                          Jednak nie chcesz tworzyc konta?
                          <span
                            style={{
                              color: '#01D4BF',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              const { password, ...oldValues } = values
                              setIsCreateAccount(false)
                              setValues(oldValues)
                            }}
                          >
                            Kliknij tutaj
                          </span>
                        </p>
                        <label>Haslo</label>
                        <Field
                          name='password'
                          type='password'
                          style={{
                            backgroundColor: 'transparent',
                            border: '2px solid #333',
                            height: '3em',
                            margin: '10px 0',
                            paddingLeft: '1em',
                          }}
                          placeholder='Haslo do konta'
                          onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                          <p style={{ color: 'red' }}>{errors.password}</p>
                        ) : null}
                      </>
                    ) : (
                      <p style={{ fontSize: '.75em' }}>
                        Chcesz utworzyć konto?
                        <span
                          style={{
                            color: '#01D4BF',
                            cursor: 'pointer',
                          }}
                          onClick={() => setIsCreateAccount(true)}
                        >
                          Kliknij tutaj
                        </span>
                      </p>
                    )}
                  </>
                ) : null}
                <button type='submit' style={styles.buttonStyle}>
                  Zarezerwuj
                </button>
                <button type='reset' style={styles.buttonStyle}>
                  Wyczysc formularz
                </button>
                {currentUser &&
                  currentUser.roles[currentUser.roles.length - 1] ===
                    'ROLE_ADMIN' && (
                    <>
                      <label>Wyszukaj uzytkownika w bazie</label>
                      <Field
                        name='pacjent'
                        style={{
                          backgroundColor: 'transparent',
                          border: '2px solid #333',
                          height: '3em',
                          margin: '10px 0',
                          paddingLeft: '1em',
                        }}
                        placeholder='Wyszukaj pacjenta...'
                      />
                      <button
                        onClick={() => searchUser(values)}
                        type='button'
                        style={{
                          backgroundColor: 'none',
                          border: '2px solid #333',
                          height: '3em',
                          margin: '10px 0',
                        }}
                      >
                        Wyszukaj
                      </button>
                      {errors.pacjent && touched.pacjent ? (
                        <p style={{ color: 'red' }}>{errors.pacjent}</p>
                      ) : null}
                    </>
                  )}

                {foundUsers.length > 0 ? (
                  <>
                    {foundUsers.map((user) => (
                      <div
                        style={{
                          backgroundColor: '#333',
                          width: '300px',
                          padding: '15px',
                          color: 'white',
                        }}
                      >
                        <p>Imie: {user.imie}</p>
                        <p>Nazwisko: {user.nazwisko}</p>
                        <p>Telefon: {user.telefon}</p>
                        <p>Miasto: {user.miasto}</p>
                        <p>Ulica: {user.ulica}</p>
                        <p>Kod-pocztowy: {user.kodPocztowy}</p>
                        <button
                          onClick={() => {
                            fillFormHandler(user, setValues)
                          }}
                          type='submit'
                          style={{
                            backgroundColor: 'none',
                            border: '2px solid #333',
                            height: '3em',
                            margin: '10px 0',
                            padding: '10px',
                            cursor: 'pointer',
                          }}
                        >
                          Wybierz tego pacjenta
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <p style={{ color: 'red' }}>{errorMsg}</p>
                )}
              </Form>
            </>
          )}
        </Formik>
      </div>
    </PageWrapper>
  )
}

export default AddVisitAdmin
