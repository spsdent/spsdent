import React, { useState, useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
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

import {
  AddVisitContainer,
  Title,
  TitleContainer,
  FormButton,
  FormColumn,
  FormContainer,
  FormError,
  FormInput,
  ModalContainer,
  ModalVisitContentContainer,
  ModalVisitData,
  ModalVisitDataLabel,
  ModalVisitDataText,
  ModalVisitTextContainer,
} from './AddVisitPageElements'

import {
  ModalShadow,
  ModalContainer as MC,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from '../VisitPage/VisitPageElements'

const MyStyledSelect = FormInput.withComponent('select')
const MyStyledInput = FormInput.withComponent('input')
const MyStyledButton = FormButton.withComponent('button')

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

    const doctor = allUsersFromDb.find((user) => user._id === specjalista)

    // Create object with values from form
    let visitData = {
      grupa,
      usluga,
      specjalista: {
        sid: specjalista,
        imie: doctor.imie,
        nazwisko: doctor.nazwisko,
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
    let usersToDisplay = []
    if (serviceSelected && serviceGroupSelected) {
      const selectedGroupDoctors = allDoctorsFromDb
        .filter((doctor) =>
          doctor.specjalnosci.includes(selectedGroupData[0]._id)
        )
        .map((item) => item.doctorId)
      usersToDisplay = allUsersFromDb.filter((user) =>
        selectedGroupDoctors.includes(user._id)
      )
      const servicePrice = allServicesFromDb
        .filter((service) => service.grupa === serviceGroupSelected)[0]
        .uslugi.filter((usluga) => usluga.nazwa === serviceSelected)[0]
      setSelectedServicePrice(servicePrice.cena)
    }
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
    let updatedHours = []
    if (startDate) {
      updatedHours = selectedDoctorData.godzinyPracy
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
    return updatedHours.map((item) => (
      <option value={`${item}`} key={`${item}`}>{`${item}`}</option>
    ))
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
      <AddVisitContainer>
        <Suspense fallback={<p>Loading...</p>}>
          {!isSuccessful ? (
            <>
              <TitleContainer>
                <Title>Zarezerwuj</Title>
                <Title primary>wizytę</Title>
              </TitleContainer>
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
                  <Form>
                    <FormContainer>
                      <FormColumn>
                        <label>Grupa uslug</label>
                        <Field name='grupa' as={MyStyledSelect}>
                          <option value=''>Wybierz grupę usługi...</option>
                          {serviceGroupHandler(values)}
                        </Field>
                        <ErrorMessage name='grupa'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          as={MyStyledSelect}
                          name='usluga'
                          disabled={!serviceGroupSelected}
                        >
                          <option value=''>Wybierz usługę...</option>
                          {serviceHandler(values)}
                        </Field>
                        <ErrorMessage name='usluga'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          as={MyStyledSelect}
                          name='specjalista'
                          disabled={!serviceSelected}
                        >
                          <option value=''>Wybierz specjalistę...</option>
                          {doctorHandler(values)}
                        </Field>
                        <ErrorMessage name='specjalista'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <DatePicker
                          disabled={!doctorSelected}
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
                          withPortal
                        />
                        <ErrorMessage name='data'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          disabled={!values.data}
                          as={MyStyledSelect}
                          name='godzina'
                        >
                          <option value=''>Wybierz godzinę...</option>
                          {pickingHours(values.data)}
                        </Field>
                        <ErrorMessage name='godzina'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          name='imie'
                          type='text'
                          placeholder='Imie'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='imie'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          name='nazwisko'
                          type='text'
                          placeholder='Nazwisko'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='nazwisko'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          name='email'
                          type='email'
                          placeholder='E-mail'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='email'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          name='telefon'
                          type='number'
                          placeholder='Telefon'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='telefon'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          name='miasto'
                          type='text'
                          placeholder='Miasto'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='miasto'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          name='ulica'
                          type='text'
                          placeholder='Ulica'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='ulica'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        <Field
                          as={MyStyledInput}
                          name='kodPocztowy'
                          type='number'
                          placeholder='Kod-pocztowy'
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name='kodPocztowy'>
                          {(msg) => <FormError>{msg}</FormError>}
                        </ErrorMessage>
                        {isCreateAccount ? (
                          <>
                            <p style={{ fontSize: '.75em' }}>
                              Jednak nie chcesz tworzyć konta?
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
                            <Field
                              as={MyStyledInput}
                              name='password'
                              type='password'
                              placeholder='Hasło do konta'
                              onBlur={handleBlur}
                            />
                            <ErrorMessage name='password'>
                              {(msg) => <FormError>{msg}</FormError>}
                            </ErrorMessage>
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
                        <MyStyledButton type='submit'>
                          Podsumowanie
                        </MyStyledButton>
                        <MyStyledButton type='reset'>
                          Wyczyść formularz
                        </MyStyledButton>
                        {isSubmit && (
                          <ModalShadow>
                            <ModalContainer>
                              <ModalText>Podsumowanie</ModalText>
                              <ModalVisitContentContainer>
                                <ModalVisitData>
                                  <h3>Twoje dane</h3>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      Imie i nazwisko
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.imie} {values.nazwisko}
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      E-mail
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.email}
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      Telefon
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.telefon}
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      Miasto
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.miasto}
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      Ulica
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.ulica}
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      Kod-pocztowy
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.kodPocztowy}
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                </ModalVisitData>
                                <ModalVisitData>
                                  <h3>Umówiona wizyta</h3>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      Grupa
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.grupa}
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      Usługa
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.usluga}
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      Data wizyty
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.data}r.
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                  <ModalVisitTextContainer>
                                    <ModalVisitDataLabel>
                                      Godzina wizyty
                                    </ModalVisitDataLabel>
                                    <ModalVisitDataText>
                                      {values.godzina}:00
                                    </ModalVisitDataText>
                                  </ModalVisitTextContainer>
                                </ModalVisitData>
                              </ModalVisitContentContainer>
                              <ModalButtonsContainer>
                                <MyStyledButton
                                  onClick={() => setIsSubmit(false)}
                                >
                                  Anuluj
                                </MyStyledButton>
                                <ModalButton
                                  onClick={() => {
                                    onVisitSubmit(values)
                                    resetForm()
                                    setIsSubmit(false)
                                  }}
                                >
                                  Potwierdź rezerwacje
                                </ModalButton>
                              </ModalButtonsContainer>
                            </ModalContainer>
                          </ModalShadow>
                        )}
                      </FormColumn>
                    </FormContainer>
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
          )}
        </Suspense>
      </AddVisitContainer>
    </PageWrapper>
  )
}

export default AddVisitNonAuth
