import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styled, { css } from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, getDay } from 'date-fns'
import pl from 'date-fns/locale/pl'

import VisitData from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import { addVisitNonAuthValidationSchema } from '../../utils/validationSchemas'
import { PageWrapper } from '../../components/PageWrapper'

import { initialAddVisitValues, minDate } from '../../helpers'
import {
  useFetchAllDoctors,
  useFetchAllServices,
  useFetchAllVisits,
  useFetchAllUsers,
} from '../../hooks'

import { register } from '../../store/actions/auth'
import { SET_MESSAGE } from '../../store/actions/types'
import { clearMessage } from '../../store/actions/message'
import HashLoader from 'react-spinners/HashLoader'

import {
  Title,
  FormButton,
  FormContainer,
  FormInput,
  ModalContainer,
  ModalVisitContentContainer,
  ModalVisitData,
  ModalVisitDataLabel,
  ModalVisitDataText,
  ModalVisitTextContainer,
  RegisterText,
  TextContainer,
} from './AddVisitPageElements'

import {
  ModalShadow,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from '../VisitPage/VisitPageElements'
import {
  ErrorText,
  StyledButton,
} from '../ControlPanelPage/ControlPanelPageElements'

import {
  TitleContainer,
  AddVisitContainer,
  LoginContainer,
  StyledLink,
} from '../LoginPage/LoginPageElements'

const PageButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const PageButton = styled.button`
  width: 18em;
  padding: 1em 0;
  max-width: 350px;
  margin-top: 20px;
  border: 2px solid #01d4bf;
  background-size: 100% 200%;
  background-image: linear-gradient(to bottom, transparent 50%, #01d4bf 50%);
  transition: background-position 1s;
  cursor: pointer;
  font-size: 15px;

  @media screen and (max-width: 1500px) {
    font-size: 13px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 11px;
  }
  @media screen and (max-width: 960px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 7px;
    max-width: 400px;
  }

  ${({ values }) =>
    values.grupa &&
    values.usluga &&
    values.specjalista &&
    values.data &&
    values.godzina &&
    css`
      background-position: 0 -97%;
    `}

  &:disabled {
    background-color: transparent;
    border: 2px solid #ddd;
    cursor: not-allowed;
  }
`

const ProgressIconContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const ProgressIcon = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #01d4bf;
  background-size: 100% 200%;
  background-image: linear-gradient(to bottom, transparent 50%, #01d4bf 50%);
  transition: background-position 1s;

  &:nth-child(1) {
    ${({ values }) =>
      values.grupa &&
      values.usluga &&
      values.specjalista &&
      values.data &&
      values.godzina &&
      css`
        background-position: 0 -97%;
      `}
  }

  &:nth-child(2) {
    border: 2px solid ${({ page }) => (page === 0 ? '#ccc' : '#01d4bf')};
    ${({ values }) =>
      values.imie &&
      values.nazwisko &&
      values.email &&
      values.telefon &&
      values.miasto &&
      values.kodPocztowy &&
      css`
        background-position: 0 -97%;
        border: 2px solid #01d4bf;
      `}
  }
`

export const FI = styled(FormInput)`
  background-color: transparent;
  border: 2px solid #333;
  padding: 0.5em 0 0.5em 1em;
  width: 18em;
  margin: 0.6em 0;
  outline: none;
  color: #333;
  font-family: 'Poppins';
  font-size: 15px;
  max-width: 350px;

  @media screen and (max-width: 1500px) {
    font-size: 13px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 11px;
  }
  @media screen and (max-width: 960px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 7px;
    max-width: 400px;
  }
`

const Styles = styled.div`
  padding: 0;
  .react-datepicker__input-container input {
    width: 18em;
    padding-left: 1em;
    padding: 0.5em 0 0.5em 1em;
    outline: none;
    border: 2px solid #333;
    background-color: #fff;
    background: transparent;
    font-family: 'poppins';
    font-size: 15px;
    color: #333;
    @media screen and (max-width: 1500px) {
      font-size: 13px;
    }
    @media screen and (max-width: 1280px) {
      font-size: 11px;
    }
    @media screen and (max-width: 960px) {
      font-size: 9px;
    }
    @media screen and (max-width: 768px) {
      font-size: 7px;
    }
  }

  .react-datepicker__input-container input:disabled {
    border: 2px solid rgba(3, 3, 3, 0.5);
  }
`

const MyStyledSelect = FI.withComponent('select')
const MyStyledInput = FI.withComponent('input')
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
  const [page, setPage] = useState(0)

  const { message } = useSelector((state) => state.message)
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  registerLocale('pl', pl)

  const allVisitsFromDb = useFetchAllVisits()
  const allServicesFromDb = useFetchAllServices()
  const allDoctorsFromDb = useFetchAllDoctors()
  const allUsersFromDb = useFetchAllUsers()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

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

  const onServiceGroupSelect = (values) => {
    if (serviceGroupSelected !== values.grupa) {
      values.specjalista = ''
      values.data = ''
      values.godzina = ''
      values.usluga = ''
      setDoctorSelected(null)
      setStartDate(null)
      setServiceSelected('')
    }

    setServiceGroupSelected(values.grupa)

    const doctorsSpecArr = allDoctorsFromDb
      .map((item) => item.specjalnosci)
      .flat()

    const servicesAssigned = allServicesFromDb.filter((service) =>
      doctorsSpecArr.includes(service._id)
    )

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

    return servicesAssigned.map((service) => (
      <option value={service.grupa}>{service.grupa}</option>
    ))
  }

  const onServiceSelect = (values) => {
    const selectedGroupServices = allServicesFromDb
      .filter((service) => service.grupa === serviceGroupSelected)
      .map((service) => service.uslugi)
      .flatMap((item) => item)

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

    setServiceSelected(values.usluga)

    return selectedGroupServices.map((item) => (
      <option value={item.nazwa}>{item.nazwa}</option>
    ))
  }

  let arrToReturn = [new Date()]

  const counts = allVisitsFromDb.reduce(
    (acc, value) => ({
      ...acc,
      [value.data]: (acc[value.data] || 0) + 1,
    }),
    {}
  )

  let datesToExclude = Object.entries(counts)
    .filter((item) => item[1] > 7)
    .map((item) => [
      ...arrToReturn,
      addDays(new Date(), +item[0].split('.')[0] - new Date().getDate()),
    ])
    .flat()

  let toExclude = []

  const onDoctorSelect = (values) => {
    const selectedGroupData = allServicesFromDb.filter(
      (service) => service.grupa === serviceGroupSelected
    )

    setDoctorSelected(values.specjalista)

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

      const doctorDatesToExclude = allVisitsFromDb
        .filter((visit) => visit.specjalista.sid === values.specjalista)
        .map((item) => item.data)
        .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {})

      const foundDoctor = allDoctorsFromDb.find(
        (doctor) => doctor.doctorId === values.specjalista
      )

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

  const onHourSelect = (values) => {
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

    if (
      serviceSelected &&
      serviceGroupSelected &&
      startDate &&
      doctorSelected
    ) {
      const servicePrice = allServicesFromDb
        .filter((service) => service.grupa === serviceGroupSelected)[0]
        .uslugi.filter((usluga) => usluga.nazwa === serviceSelected)[0]

      setSelectedServicePrice(servicePrice.cena)

      updatedHours = selectedDoctorData.godzinyPracy
        .filter((item) => !currentDayDoctorVisits.includes(item))
        .filter((hour) => {
          if (today.getDate() === values.split('.')[0]) {
            return hour > today.getHours()
          } else {
            return hour
          }
        })
    }
    return updatedHours.map((item) => (
      <option value={`${item}`} key={`${item}`}>{`${item}`}</option>
    ))
  }

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  const onVisitSubmit = (values) => {
    setIsSubmit(false)
    createVisit(values)
  }

  return (
    <PageWrapper>
      <HashLoader
        color='#01d4bf'
        loading={isLoading}
        size={50}
        css={{ width: '100%', height: '100%' }}
      />
      {!isLoading && (
        <AddVisitContainer>
          <>
            <Formik
              enableReinitialize
              initialValues={visit}
              validationSchema={addVisitNonAuthValidationSchema}
              onSubmit={() => setIsSubmit(true)}
              onReset={() => {
                setVisit(initialAddVisitValues)
                setPage(0)
              }}
            >
              {({ values, setValues, handleBlur, resetForm }) => (
                <Form>
                  <FormContainer>
                    <LoginContainer
                      register
                      initial={{ opacity: 0, scale: 0, rotate: -60 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <TitleContainer>
                        <Title>Zarezerwuj</Title>
                        <Title primary>wizytę</Title>
                      </TitleContainer>

                      {page === 0 && (
                        <>
                          <Field name='grupa' as={MyStyledSelect}>
                            <option value=''>Wybierz grupę usług</option>
                            {onServiceGroupSelect(values)}
                          </Field>
                          <ErrorMessage name='grupa'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Field
                            as={MyStyledSelect}
                            name='usluga'
                            disabled={!serviceGroupSelected}
                          >
                            <option value=''>Wybierz usługę</option>
                            {onServiceSelect(values)}
                          </Field>
                          <ErrorMessage name='usluga'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Field
                            as={MyStyledSelect}
                            name='specjalista'
                            disabled={!serviceSelected}
                          >
                            <option value=''>Wybierz specjalistę</option>
                            {onDoctorSelect(values)}
                          </Field>
                          <ErrorMessage name='specjalista'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Styles>
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
                              locale='pl'
                              onBlur={handleBlur}
                              withPortal
                            />
                          </Styles>
                          <ErrorMessage name='data'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Field
                            disabled={!values.data}
                            as={MyStyledSelect}
                            name='godzina'
                          >
                            <option value=''>Wybierz godzinę</option>
                            {onHourSelect(values.data)}
                          </Field>
                          <ErrorMessage name='godzina'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                        </>
                      )}
                      {page === 1 && (
                        <>
                          <Field
                            as={MyStyledInput}
                            name='imie'
                            type='text'
                            placeholder='Imie'
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='imie'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Field
                            as={MyStyledInput}
                            name='nazwisko'
                            type='text'
                            placeholder='Nazwisko'
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='nazwisko'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Field
                            as={MyStyledInput}
                            name='email'
                            type='email'
                            placeholder='E-mail'
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='email'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Field
                            as={MyStyledInput}
                            name='telefon'
                            type='number'
                            placeholder='Telefon'
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='telefon'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Field
                            as={MyStyledInput}
                            name='miasto'
                            type='text'
                            placeholder='Miasto'
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='miasto'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Field
                            as={MyStyledInput}
                            name='ulica'
                            type='text'
                            placeholder='Ulica'
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='ulica'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          <Field
                            as={MyStyledInput}
                            name='kodPocztowy'
                            type='number'
                            placeholder='Kod pocztowy'
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name='kodPocztowy'>
                            {(msg) => (
                              <ErrorText primary panel>
                                {msg}
                              </ErrorText>
                            )}
                          </ErrorMessage>
                          {isCreateAccount ? (
                            <>
                              <TextContainer primary>
                                <RegisterText>
                                  Jednak nie chcesz tworzyc konta?
                                </RegisterText>
                                <RegisterText
                                  primary
                                  onClick={() => {
                                    const { password, ...oldValues } = values
                                    setIsCreateAccount(false)
                                    setValues(oldValues)
                                  }}
                                >
                                  Kliknij tutaj
                                </RegisterText>
                              </TextContainer>
                              <Field
                                as={MyStyledInput}
                                name='password'
                                type='password'
                                placeholder='Hasło do konta'
                                onBlur={handleBlur}
                              />
                              <ErrorMessage name='password'>
                                {(msg) => (
                                  <ErrorText primary panel>
                                    {msg}
                                  </ErrorText>
                                )}
                              </ErrorMessage>
                            </>
                          ) : (
                            <TextContainer primary>
                              <RegisterText>
                                Chcesz utworzyć konto?
                              </RegisterText>
                              <RegisterText
                                primary
                                onClick={() => setIsCreateAccount(true)}
                              >
                                Kliknij tutaj
                              </RegisterText>
                            </TextContainer>
                          )}
                          <StyledButton addVisit type='submit'>
                            Podsumowanie
                          </StyledButton>
                          <StyledButton addVisit type='reset'>
                            Wyczyść formularz
                          </StyledButton>
                        </>
                      )}
                      <ProgressIconContainer>
                        <ProgressIcon values={values}></ProgressIcon>
                        <ProgressIcon
                          page={page}
                          values={values}
                        ></ProgressIcon>
                      </ProgressIconContainer>
                      <PageButtonContainer>
                        {page === 1 && (
                          <PageButton
                            onClick={() => setPage(0)}
                            values={values}
                          >
                            Poprzednia strona
                          </PageButton>
                        )}
                        {page === 0 && (
                          <PageButton
                            disabled={
                              !values.usluga ||
                              !values.grupa ||
                              !values.specjalista ||
                              !values.data ||
                              !values.godzina ||
                              page === 1
                            }
                            values={values}
                            onClick={() => setPage(1)}
                          >
                            Nastepna strona
                          </PageButton>
                        )}
                      </PageButtonContainer>
                      {isSuccessful && (
                        <>
                          {message && <ErrorText>{message}</ErrorText>}
                          {accountCreated && (
                            <StyledLink
                              to='/logowanie'
                              onClick={() => dispatch(clearMessage())}
                            >
                              Przejdź do logowania!
                            </StyledLink>
                          )}
                        </>
                      )}
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
                    </LoginContainer>
                  </FormContainer>
                </Form>
              )}
            </Formik>
          </>
        </AddVisitContainer>
      )}
    </PageWrapper>
  )
}

export default AddVisitNonAuth
