import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'

import VisitData from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import { addVisitUserValidationSchema } from '../../utils/validationSchemas'
import { PageWrapper } from '../../components/PageWrapper'

import { months, days, initialAddVisitValues, dentHours } from '../../helpers'
import {
  useFetchAllDoctors,
  useFetchAllServices,
  useFetchAllVisits,
  useFetchAllUsers,
  useCreateDates,
} from '../../hooks'

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

const AddVisitAuthUser = () => {
  const [visit, setVisit] = useState(initialAddVisitValues)
  const [serviceGroupSelected, setServiceGroupSelected] = useState('')
  const [serviceSelected, setServiceSelected] = useState('')
  const [doctorSelected, setDoctorSelected] = useState('')
  const [selectedServicePrice, setSelectedServicePrice] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)

  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const allVisitsFromDb = useFetchAllVisits()
  const allServicesFromDb = useFetchAllServices()
  const allDoctorsFromDb = useFetchAllDoctors()
  const allUsersFromDb = useFetchAllUsers()
  const dates = useCreateDates()

  const createVisit = (values) => {
    const { imie, nazwisko, email, telefon, miasto, kodPocztowy, ulica, id } =
      currentUser
    const { grupa, usluga, specjalista, data, godzina, status } = values

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
      uid: currentUser !== null ? id : null,
    }

    // Create new visit based on provide visitData object
    VisitData.create(visitData)
      .then((response) => {
        dispatch(refreshApp())
        navigate('/visits')
      })
      .catch((e) => {
        console.log(e)
      })
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
      <option value={service.grupa}> {service.grupa} </option>
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
      <option value={item.nazwa}> {item.nazwa} </option>
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
        <option value={`${item}`} key={`${item}`}>
          {`${item}`}
        </option>
      ))
    } else {
      return dentHours.map((item) => (
        <option value={`${item}`} key={`${item}`}>
          {`${item}`}
        </option>
      ))
    }
  }

  return (
    <PageWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1> Zarezerwuj wizyte - user </h1>
        <Formik
          enableReinitialize
          initialValues={visit}
          validationSchema={addVisitUserValidationSchema}
          onSubmit={() => setIsSubmit(true)}
          onReset={() => setVisit(initialAddVisitValues)}
        >
          {({ errors, touched, values, setValues, resetForm }) => (
            <Form
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
              }}
            >
              <label> Grupa uslug </label>
              <Field as='select' name='grupa' style={styles.selectStyle}>
                <option value=''> Wybierz grupe uslugi... </option>
                {serviceGroupHandler(values)}
              </Field>
              {errors.grupa && touched.grupa ? (
                <p style={styles.errorStyle}> {errors.grupa} </p>
              ) : null}
              {serviceGroupSelected && (
                <>
                  <label> Usluga </label>
                  <Field as='select' name='usluga' style={styles.inputStyle}>
                    <option value=''> Wybierz usluge... </option>
                    {serviceHandler(values)}
                  </Field>
                  {errors.usluga && touched.usluga ? (
                    <p style={styles.errorStyle}> {errors.usluga} </p>
                  ) : null}
                  {serviceSelected && (
                    <>
                      <label> Specjalista </label>
                      <Field
                        as='select'
                        name='specjalista'
                        style={styles.selectStyle}
                      >
                        <option value=''> Wybierz specjaliste... </option>
                        {doctorHandler(values)}
                      </Field>
                      {errors.specjalista && touched.specjalista ? (
                        <p style={styles.errorStyle}> {errors.specjalista} </p>
                      ) : null}
                      {doctorSelected && (
                        <>
                          <label> Data </label>
                          <Field
                            as='select'
                            name='data'
                            style={styles.selectStyle}
                          >
                            <option value=''> Wybierz date... </option>
                            {selectDates}
                          </Field>
                          {errors.data && touched.data ? (
                            <p style={styles.errorStyle}> {errors.data} </p>
                          ) : null}
                          {values.data && (
                            <>
                              <label> Godzina </label>
                              <Field
                                as='select'
                                name='godzina'
                                style={styles.inputStyle}
                              >
                                <option value=''> Wybierz godzine... </option>
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
              <button type='submit' style={styles.buttonStyle}>
                Podsumowanie
              </button>
              <button type='reset' style={styles.buttonStyle}>
                Wyczysc formularz
              </button>
              {isSubmit && (
                <div
                  style={{
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'rgba(3,3,3, .5)',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    zIndex: '999',
                    fontFamily: 'Poppins',
                    fontSize: '.75rem',
                    fontWeight: '500',
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
                    <h1>Podsumowanie</h1>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '30px',
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
                          {currentUser.imie} {currentUser.nazwisko}
                        </p>
                        <p>{currentUser.email}</p>
                        <p>{currentUser.telefon}</p>
                        <p>{currentUser.miasto}</p>
                        <p>{currentUser.ulica}</p>
                        <p>{currentUser.kodPocztowy}</p>
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
                          createVisit(values)
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
      </div>
    </PageWrapper>
  )
}

export default AddVisitAuthUser
