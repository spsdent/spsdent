import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { useNavigate, Link } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, getDay } from 'date-fns'

import VisitData from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import { addVisitNonAuthValidationSchema } from '../../utils/validationSchemas'
import { PageWrapper } from '../../components/PageWrapper'

import { initialAddVisitValues, dentHours, minDate } from '../../helpers'
import {
  useFetchAllDoctors,
  useFetchAllServices,
  useFetchAllVisits,
  useFetchAllUsers,
} from '../../hooks'

import { register } from '../../store/actions/auth'
import { SET_MESSAGE } from '../../store/actions/types'
import { clearMessage } from '../../store/actions/message'

const styles = {
  inputStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  buttonBook: {
    backgroundColor: '#01D4BF',
    border: 'none',
    height: '3em',
    margin: '10px 5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  selectStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
  errorStyle: {
    color: 'red',
  },
}

const AddVisitNonAuth = () => {
  const [visit, setVisit] = useState(initialAddVisitValues)
  const [serviceGroupSelected, setServiceGroupSelected] = useState('')
  const [serviceSelected, setServiceSelected] = useState('')
  const [doctorSelected, setDoctorSelected] = useState('')
  const [selectedServicePrice, setSelectedServicePrice] = useState('')
  const [isCreateAccount, setIsCreateAccount] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const { message } = useSelector((state) => state.message)
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const allVisitsFromDb = useFetchAllVisits()
  const allServicesFromDb = useFetchAllServices()
  const allDoctorsFromDb = useFetchAllDoctors()
  const allUsersFromDb = useFetchAllUsers()

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
      specjalista: {
        sid: specjalista,
        imie: imie,
        nazwisko: nazwisko,
      },
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

    // Create new visit based on provide visitData object
    VisitData.create(visitData)
      .then((response) => {
        setIsSuccessful(true)
        dispatch(refreshApp())
        dispatch({
          type: SET_MESSAGE,
          payload: 'Wizyta została utworzona!',
        })
      })
      .catch((e) => {
        setIsSuccessful(false)
        dispatch({
          type: SET_MESSAGE,
          payload: 'Wystapił błąd podczas tworzenia rezerwacji, przepraszamy.',
        })
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
        .then(() => {
          setIsSuccessful(true)
          setAccountCreated(true)
        })
        .catch((e) => {
          setIsSuccessful(false)
        })
    }
  }

  // function responsible for display services from db as options to select
  const serviceGroupHandler = (values) => {
    // set serviceGroupSelected state with value selected in form field "grupa usluga"
    setServiceGroupSelected(values.grupa)
    const doctorsSpecArr = allDoctorsFromDb
      .map((item) => item.specjalnosci)
      .flat()
    const servicesToDisplay = allServicesFromDb.filter((service) =>
      doctorsSpecArr.includes(service._id)
    )
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
    return servicesToDisplay.map((service) => (
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
      setStartDate(null)
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

  // const selectDates = dates.map((item, index) => (
  //   <option
  //     value={`${item.date.getDate()}.${
  //       item.date.getMonth() + 1
  //     }.${item.date.getFullYear()}`}
  //     key={`${item.date.getDate()}.${
  //       item.date.getMonth() + 1
  //     }.${item.date.getFullYear()}`}
  //   >
  //     {`${days[item.date.getDay()]}, ${item.date.getDate()} ${
  //       months[item.date.getMonth()]
  //     } ${item.date.getFullYear()}`}
  //   </option>
  // ))

  const pickingHours = (values) => {
    const selectedDoctorData = allDoctorsFromDb.find(
      (doctor) => doctor.doctorId === doctorSelected
    )
    const today = new Date()

    const currentDayDoctorVisits = allVisitsFromDb
      .filter(
        (visit) =>
          visit.data.split('.')[0] === values.split('.')[0] &&
          visit.specjalista.sid === `${selectedDoctorData.doctorId}`
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

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  const counts = allVisitsFromDb.reduce(
    (acc, value) => ({
      ...acc,
      [value.data]: (acc[value.data] || 0) + 1,
    }),
    {}
  )

  let arrToReturn = [new Date()]

  let datesToExclude = Object.entries(counts)
    .filter((item) => item[1] > 7)
    .map((item) => [
      ...arrToReturn,
      addDays(new Date(), +item[0].split('.')[0] - new Date().getDate()),
    ])
    .flat()

  const onVisitSubmit = (values) => {
    setIsSubmit(false)
    createVisit(values)
  }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {allDoctorsFromDb.length > 0 ? (
          !isSuccessful ? (
            <>
              <h1>Zarezerwuj wizyte</h1>
              <Formik
                enableReinitialize
                initialValues={visit}
                validationSchema={addVisitNonAuthValidationSchema}
                onSubmit={() => setIsSubmit(true)}
                onReset={() => setVisit(initialAddVisitValues)}
              >
                {({
                  errors,
                  touched,
                  values,
                  setValues,
                  handleBlur,
                  resetForm,
                }) => (
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
                              <p style={styles.errorStyle}>
                                {errors.specjalista}
                              </p>
                            ) : null}
                            {doctorSelected && (
                              <>
                                <label>Data</label>
                                <DatePicker
                                  selected={startDate}
                                  dateFormat='dd/MM/yyyy'
                                  onChange={(date) => {
                                    setStartDate(date)
                                    values.data = `${date.getDate()}.${
                                      date.getMonth() + 1
                                    }.${date.getFullYear()}`
                                    setValues(values)
                                  }}
                                  minDate={minDate}
                                  placeholderText='Wybierz termin wizyty'
                                  filterDate={isWeekday}
                                  excludeDates={datesToExclude}
                                  name='data'
                                  onBlur={handleBlur}
                                />
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
                                      <option value=''>
                                        Wybierz godzine...
                                      </option>
                                      {pickingHours(values.data)}
                                    </Field>
                                    {errors.godzina && touched.godzina ? (
                                      <p style={styles.errorStyle}>
                                        {errors.godzina}
                                      </p>
                                    ) : null}
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
                      type='text'
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
                      type='text'
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
                      type='number'
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
                      type='text'
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
                      type='text'
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
                      type='number'
                      style={styles.inputStyle}
                      placeholder='Kod-pocztowy'
                      onBlur={handleBlur}
                    />
                    {errors.kodPocztowy && touched.kodPocztowy ? (
                      <p style={styles.errorStyle}>{errors.kodPocztowy}</p>
                    ) : null}
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
                    <button type='submit' style={styles.buttonStyle}>
                      Podsumowanie
                    </button>
                    <button type='reset' style={styles.buttonStyle}>
                      Wyczysc formularz
                    </button>
                    {isSubmit && (
                      <div
                        style={{
                          width: '100vw',
                          height: '100vh',
                          position: 'absolute',
                          left: '0',
                          top: '0',
                          backgroundColor: 'rgba(3,3,3,.5)',
                          zIndex: '999',
                        }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            width: '50%',
                            height: '50%',
                            backgroundColor: '#fff',
                            left: '0',
                            right: '0',
                            top: '25%',
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <h2 style={{ marginBottom: '20px' }}>Podsumowanie</h2>
                          <div
                            style={{
                              position: 'relative',
                              backgroundColor: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '50%',
                              }}
                            >
                              <h3>Twoje dane</h3>
                              <p>
                                {values.imie} {values.nazwisko}
                              </p>
                              <p>{values.email}</p>
                              <p>{values.telefon}</p>
                              <p>{values.miasto}</p>
                              <p>{values.ulica}</p>
                              <p>{values.kodPocztowy}</p>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '50%',
                              }}
                            >
                              <h3>Umówiona wizyta</h3>
                              <p>{values.grupa}</p>
                              <p>{values.usluga}</p>
                              <p>{values.data}r.</p>
                              <p>{values.godzina}:00</p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <button
                              onClick={() => setIsSubmit(false)}
                              style={styles.buttonStyle}
                            >
                              Anuluj
                            </button>
                            <button
                              style={styles.buttonBook}
                              onClick={() => {
                                onVisitSubmit(values)
                                resetForm()
                                setIsSubmit(false)
                              }}
                            >
                              Potwierdz rezerwacje
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#333',
                fontSize: '24px',
              }}
            >
              {message && (
                <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
              )}
              {accountCreated && (
                <Link
                  style={{ textDecoration: 'none', color: '#01D4BF' }}
                  to='/login'
                  onClick={() => dispatch(clearMessage())}
                >
                  Przejdź do logowania!
                </Link>
              )}
            </div>
          )
        ) : (
          <p>Przykro nam, ale nie oferujemy żadnych usług</p>
        )}
      </div>
    </PageWrapper>
  )
}

export default AddVisitNonAuth
