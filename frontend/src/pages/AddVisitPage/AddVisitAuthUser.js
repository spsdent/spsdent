import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'

import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, getDay } from 'date-fns'
import pl from 'date-fns/locale/pl'

import VisitData from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import { addVisitUserValidationSchema } from '../../utils/validationSchemas'
import { PageWrapper } from '../../components/PageWrapper'

import {
  months,
  days,
  initialAddVisitValues,
  dentHours,
  minDate,
} from '../../helpers'
import {
  useFetchAllDoctors,
  useFetchAllServices,
  useFetchAllVisits,
  useFetchAllUsers,
  useCreateDates,
} from '../../hooks'

import {
  AddVisitContainer,
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
  Title,
  TitleContainer,
} from './AddVisitPageElements'

import {
  ModalShadow,
  ModalText,
  ModalButtonsContainer,
} from '../VisitPage/VisitPageElements'
import { StyledModalButton } from '../DoctorTimesheetPage/AdminCreateVisitElements'
import styled from 'styled-components'

const MyStyledSelect = FormInput.withComponent('select')

const AddVisitAuthUser = () => {
  const [visit, setVisit] = useState(initialAddVisitValues)
  const [serviceGroupSelected, setServiceGroupSelected] = useState('')
  const [serviceSelected, setServiceSelected] = useState('')
  const [doctorSelected, setDoctorSelected] = useState('')
  const [selectedServicePrice, setSelectedServicePrice] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [datesToExc, setDatesToExc] = useState([])
  registerLocale('pl', pl)

  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const allVisitsFromDb = useFetchAllVisits()
  const allServicesFromDb = useFetchAllServices()
  const allDoctorsFromDb = useFetchAllDoctors()
  const allUsersFromDb = useFetchAllUsers()

  const createVisit = (values) => {
    const { imie, nazwisko, email, telefon, miasto, kodPocztowy, ulica, id } =
      currentUser
    const { grupa, usluga, specjalista, data, godzina, status } = values

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
      setStartDate(null)
    } else if (!serviceGroupSelected) {
      setServiceSelected('')
      setDoctorSelected('')
      values.usluga = ''
      values.data = ''
      values.godzina = ''
      setStartDate(null)
    }

    // returns options for select field depends on services fetched from db
    return servicesToDisplay.map((service) => (
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
      setStartDate(null)
    } else if (!serviceSelected) {
      values.godzina = ''
      values.data = ''
      setDoctorSelected('')
      setStartDate(null)
    }

    // we set serviceSelected state to value usluga chosen in form field
    setServiceSelected(values.usluga)

    // return services selected group
    return selectedGroupServices.map((item) => (
      <option value={item.nazwa}> {item.nazwa} </option>
    ))
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
  let toExclude = []

  const doctorHandler = (values) => {
    const selectedGroupData = allServicesFromDb.filter(
      (service) => service.grupa === serviceGroupSelected
    )
    setDoctorSelected(values.specjalista)
    const foundDoctor = allDoctorsFromDb.find(
      (doctor) => doctor.doctorId === values.specjalista
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

      const doctorDatesToExclude = allVisitsFromDb
        .filter((visit) => visit.specjalista.sid === values.specjalista)
        .map((item) => item.data)
        .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {})

      toExclude = Object.entries(doctorDatesToExclude)
        .filter((item) => item[1] > foundDoctor.godzinyPracy.length - 1)
        .map((item) => [
          ...datesToExclude,
          addDays(new Date(), +item[0].split('.')[0] - new Date().getDate()),
        ])
        .flat()
    }

    if (!doctorSelected) {
      values.godzina = ''
      setStartDate(null)
    }
    
    return usersToDisplay.map((doctor) => (
      <option value={`${doctor._id}`}>
        {doctor.imie} {doctor.nazwisko}
      </option>
    ))
  }

  const pickingHours = (values) => {
    const selectedDoctorData = allDoctorsFromDb.find(
      (doctor) => doctor.doctorId === doctorSelected
    )
    const today = new Date()

    let updatedHours = []
    if (
      serviceSelected &&
      serviceGroupSelected &&
      startDate &&
      doctorSelected
    ) {
      const currentDayDoctorVisits = allVisitsFromDb
        .filter(
          (visit) =>
            visit.data.split('.')[0] === values.split('.')[0] &&
            visit.specjalista.sid === `${selectedDoctorData.doctorId}`
        )
        .map((item) => +item.godzina)
      updatedHours = selectedDoctorData.godzinyPracy
        .filter((item) => !currentDayDoctorVisits.includes(item))
        .filter((hour) => {
          if (today.getDate() === values.split('.')[0]) {
            return hour > today.getHours()
          } else {
            return hour
          }
        })

      // if (updatedHours.length > 0) {
      //   return updatedHours.map((item) => (
      //     <option value={`${item}`} key={`${item}`}>
      //       {`${item}`}
      //     </option>
      //   ))
      // } else {
      //   return dentHours.map((item) => (
      //     <option value={`${item}`} key={`${item}`}>
      //       {`${item}`}
      //     </option>
      //   ))
      // }
    }
    return updatedHours.map((item) => (
      <option value={`${item}`} key={`${item}`}>{`${item}`}</option>
    ))
  }

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  return (
    <PageWrapper>
      <AddVisitContainer>
        <TitleContainer>
          <Title>Zarezerwuj</Title>
          <Title primary>Wizytę</Title>
        </TitleContainer>
        {allDoctorsFromDb.length > 0 ? (
          <Formik
            enableReinitialize
            initialValues={visit}
            validationSchema={addVisitUserValidationSchema}
            onSubmit={() => setIsSubmit(true)}
            onReset={() => setVisit(initialAddVisitValues)}
          >
            {({
              errors,
              touched,
              values,
              setValues,
              resetForm,
              handleBlur,
            }) => (
              <Form>
                <FormContainer>
                  <FormColumn>
                    <Field as={MyStyledSelect} name='grupa' onBlur={handleBlur}>
                      <option value=''> Wybierz grupę usługi... </option>
                      {serviceGroupHandler(values)}
                    </Field>
                    <ErrorMessage name='grupa'>
                      {(msg) => <FormError>{msg}</FormError>}
                    </ErrorMessage>
                    <Field
                      as={MyStyledSelect}
                      name='usluga'
                      onBlur={handleBlur}
                      disabled={!serviceGroupSelected}
                    >
                      <option value=''> Wybierz usługę... </option>
                      {serviceHandler(values)}
                    </Field>
                    <ErrorMessage name='usluga'>
                      {(msg) => <FormError>{msg}</FormError>}
                    </ErrorMessage>
                    <Field
                      as={MyStyledSelect}
                      name='specjalista'
                      onBlur={handleBlur}
                      disabled={!serviceSelected}
                    >
                      <option value=''> Wybierz specjalistę... </option>
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
                      excludeDates={toExclude}
                      name='data'
                      onBlur={handleBlur}
                      withPortal
                      locale='pl'
                    />
                    <ErrorMessage name='data'>
                      {(msg) => <FormError>{msg}</FormError>}
                    </ErrorMessage>
                    <Field
                      disabled={!values.data}
                      as={MyStyledSelect}
                      name='godzina'
                      onBlur={handleBlur}
                    >
                      <option value=''> Wybierz godzinę... </option>
                      {pickingHours(values.data)}
                    </Field>
                    <ErrorMessage name='godzina'>
                      {(msg) => <FormError>{msg}</FormError>}
                    </ErrorMessage>

                    <FormButton type='submit'>Podsumowanie</FormButton>
                    <FormButton type='reset'>Wyczyść formularz</FormButton>
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
                                  {currentUser.imie} {currentUser.nazwisko}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  E-mail
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.email}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Telefon
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.telefon}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Miasto
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.miasto}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>Ulica</ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.ulica}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Kod-pocztowy
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.kodPocztowy}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                            </ModalVisitData>
                            <ModalVisitData>
                              <h3>Umówiona wizyta</h3>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>Grupa</ModalVisitDataLabel>
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
                            <StyledModalButton
                              onClick={() => setIsSubmit(false)}
                            >
                              Anuluj
                            </StyledModalButton>
                            <StyledModalButton
                              onClick={() => {
                                createVisit(values)
                                resetForm()
                                setIsSubmit(false)
                              }}
                            >
                              Potwierdź rezerwację
                            </StyledModalButton>
                          </ModalButtonsContainer>
                        </ModalContainer>
                      </ModalShadow>
                    )}
                  </FormColumn>
                </FormContainer>
              </Form>
            )}
          </Formik>
        ) : (
          <p>Przykro nam, ale nie oferujemy żadnych usług</p>
        )}
      </AddVisitContainer>
    </PageWrapper>
  )
}

export default AddVisitAuthUser
