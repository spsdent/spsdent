import React, { useState, useEffect } from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import { Pattern } from '../../components/Pattern'
import '../../styles/index.css'
import styled from 'styled-components'

import { Formik, Field, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { addDays, getDay } from 'date-fns'
import { useNavigate } from 'react-router'
import { FaTrashAlt } from 'react-icons/fa'
import {
  VisitsPageContainer,
  VisitsPageTitleContainer,
  VisitsPageTitle,
  VisitsContainer,
  Headers,
  Header,
  HeaderText,
  TriangleAsc,
  TriangleDesc,
  TriangleDescActive,
  VisitsListContainer,
  Visit,
  VisitContent,
  VisitDelete,
  MyPaginate,
} from '../VisitsPage/VisitsPageElements'
import {
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from '../VisitPage/VisitPageElements'
import { useFetchAllServices, useFetchAllUsers } from '../../hooks'
import { refreshApp } from '../../store/actions/refresh'
import { Option, TimesheetPick } from './TimesheetPageElements'

import DoctorData from '../../services/doctor'
import UserData from '../../services/user'
import VisitData from '../../services/visit'
import { addVisitAdminTimesheetValidationSchema } from '../../utils/validationSchemas'
import { register } from '../../store/actions/auth'
import { SET_MESSAGE } from '../../store/actions/types'
import { clearMessage } from '../../store/actions/message'

const StyledContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

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

const AdminTimesheetPage = () => {
  const [filterPosition, setFilterPosition] = useState({
    usluga: 0,
    lekarz: 0,
    data: 0,
    godzina: 0,
    cena: 0,
  })
  const { user: currentUser } = useSelector((state) => state.auth)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [users, setUsers] = useState([])
  const [visits, setVisits] = useState([])
  const [updatedVisits, setUpdatedVisits] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateVisits, setSelectedDateVisits] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [selectedServicePrice, setSelectedServicePrice] = useState('')
  const [visitId, setVisitId] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [bookingInfo, setBookingInfo] = useState({})
  const [isSelected, setIsSelected] = useState(false)
  const [visitState, setVisitState] = useState({
    grupa: '',
    usluga: '',
    nazwisko: '',
    imie: '',
    telefon: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
  })
  const [serviceGroupSelected, setServiceGroupSelected] = useState('')
  const [serviceSelected, setServiceSelected] = useState('')
  const [isCreateAccount, setIsCreateAccount] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const visitsPerPage = 5
  const pagesVisited = pageNumber * visitsPerPage
  const allUsers = useFetchAllUsers()
  const allServicesFromDb = useFetchAllServices()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    retrieveDoctors()
    retrieveUsers()
    retrieveVisits()
    let helperArr = []
    let today = new Date()
    for (let i = 8; i <= 16; i++) {
      helperArr = [
        ...helperArr,
        {
          data: `${today.getDate()}.${
            today.getMonth() + 1
          }.${today.getFullYear()}`,
          godzina: `${i}`,
        },
      ]
    }
    setUpdatedVisits(helperArr)
  }, [])

  const retrieveDoctors = () => {
    DoctorData.getAll().then((response) => {
      setDoctors(response.data)
    })
  }

  const retrieveUsers = () => {
    UserData.getAll().then((response) => {
      setUsers(response.data)
    })
  }

  const retrieveVisits = () => {
    VisitData.getAll().then((response) => {
      setVisits(response.data)
    })
  }

  const filteredUsers = users.filter((user) =>
    doctors.some((doctor) => doctor.doctorId === user._id)
  )

  const handleChange = (e) => {
    setSelectedDoctor(filteredUsers[e.target.value])
  }

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  const onDateSelect = (date) => {
    setSelectedDate(date)
    let selectedDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`
    const selectedDateVisitsArr = visits.filter(
      (visit) => visit.data === selectedDate
    )
    const updatedArr = updatedVisits.filter((el) =>
      selectedDateVisitsArr.some((f) => f.godzina !== el.godzina)
    )
    const arrToDisplay = [...updatedArr, ...selectedDateVisitsArr]
    setSelectedDateVisits(arrToDisplay)
  }

  const goToVisit = (item) => {
    navigate(`/visits/${item.id}`, {
      state: { item: item, bRoute: 'timesheet' },
    })
  }

  const onVisitDelete = () => {
    setIsDelete(false)
    VisitData.remove(visitId.id)
      .then((response) => {
        console.log('Usunieto wizyte pomyslnie!')
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
  }

  const displayVisits = selectedDateVisits
    .slice(pagesVisited, pagesVisited + visitsPerPage)
    .map((visit, i) => {
      if (allUsers.length > 0) {
        return (
          <>
            {visit.usluga ? (
              <Visit
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.2 }}
                key={visit._id}
                onClick={() => goToVisit(visit)}
              >
                <VisitContent primary>{visit.usluga}</VisitContent>
                <VisitContent>
                  {`${visit.specjalista.imie} ${visit.specjalista.nazwisko}`}
                </VisitContent>
                <VisitContent>{visit.data}</VisitContent>
                <VisitContent>{visit.godzina}:00</VisitContent>
                <VisitContent>{visit.cena}zł</VisitContent>
                <VisitDelete
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDelete(true)
                    setVisitId(visit)
                  }}
                >
                  <FaTrashAlt />
                </VisitDelete>
              </Visit>
            ) : (
              <Visit
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.2 }}
                onClick={() => {
                  if (isSelected) {
                    setIsSelected(false)
                  } else {
                    setIsSelected(true)
                    setBookingInfo({
                      data: visit.data,
                      godzina: visit.godzina,
                      specjalista: {
                        sid: selectedDoctor._id,
                        imie: selectedDoctor.imie,
                        nazwisko: selectedDoctor.nazwisko,
                      },
                    })
                  }
                }}
              >
                <VisitContent primary>
                  Zarezerwuj godzinę {visit.godzina}
                </VisitContent>
              </Visit>
            )}
          </>
        )
      }
    })

  const pageCount = Math.ceil(selectedDateVisits.length / visitsPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const onFilterByHour = () => {
    if (filterPosition.godzina === 0) {
      const descArr = selectedDateVisits.sort((a, b) => b.godzina - a.godzina)
      setSelectedDateVisits(descArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 1, cena: 0, lekarz: 0 })
    } else if (filterPosition.godzina === 1) {
      const ascArr = selectedDateVisits.sort((a, b) => a.godzina - b.godzina)
      setSelectedDateVisits(ascArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 2, cena: 0, lekarz: 0 })
    } else if (filterPosition.godzina === 2) {
      retrieveVisits()
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 1,
        staggerChildren: 1,
      },
    },
  }
  const itemOne = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  // function responsible for display services from db as options to select
  const serviceGroupHandler = (values) => {
    // set serviceGroupSelected state with value selected in form field "grupa usluga"
    setServiceGroupSelected(values.grupa)
    const currentSelectedDoctor = doctors
      .filter((doctor) => doctor.doctorId === selectedDoctor._id)
      .map((item) => item.specjalnosci)
      .flat()
    const servicesToDisplay = allServicesFromDb.filter((service) =>
      currentSelectedDoctor.includes(service._id)
    )
    // this conditon is responsible for clear select form fields when we
    // chose default options in select fields
    if (serviceGroupSelected && !serviceSelected) {
      values.specjalista = ''
      values.data = ''
      values.godzina = ''
    } else if (!serviceGroupSelected) {
      setServiceSelected('')
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

    // we set serviceSelected state to value usluga chosen in form field
    setServiceSelected(values.usluga)

    // return services selected group
    return selectedGroupServices.map((item) => (
      <option value={item.nazwa}>{item.nazwa}</option>
    ))
  }

  const createVisit = (values) => {
    const {
      grupa,
      usluga,
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
        sid: bookingInfo.specjalista.sid,
        imie: bookingInfo.specjalista.imie,
        nazwisko: bookingInfo.specjalista.nazwisko,
      },
      data: bookingInfo.data,
      godzina: bookingInfo.godzina,
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

  const onVisitSubmit = (values) => {
    setIsSubmit(false)
    createVisit(values)
  }

  return (
    <PageWrapper>
      <StyledContainer>
        <VisitsPageTitleContainer>
          <VisitsPageTitle
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Grafik
          </VisitsPageTitle>
        </VisitsPageTitleContainer>
        <TimesheetPick
          name='selectedDoctor'
          value={selectedDoctor}
          onChange={handleChange}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Option value='true' selected>
            Wybierz lekarza
          </Option>
          {filteredUsers.map((user, i) => (
            <Option value={i}>
              {user.imie} {user.nazwisko}
            </Option>
          ))}
        </TimesheetPick>

        {selectedDoctor ? (
          <>
            <DatePicker
              selected={false}
              dateFormat='dd/MM/yyyy'
              onChange={(date) => onDateSelect(date)}
              filterDate={isWeekday}
              name='data'
              inline
            />
            <VisitsPageContainer>
              <VisitsContainer>
                {selectedDate !== null ? (
                  selectedDateVisits.length > 0 ? (
                    <>
                      <Headers
                        variants={container}
                        initial='hidden'
                        animate='show'
                      >
                        <Header onClick={onFilterByHour}>
                          <HeaderText>godzina</HeaderText>
                          {filterPosition.godzina === 0 ? (
                            <TriangleDesc />
                          ) : filterPosition.godzina === 1 ? (
                            <TriangleDescActive />
                          ) : (
                            <TriangleAsc />
                          )}
                        </Header>
                      </Headers>
                      <VisitsListContainer
                        variants={container}
                        initial='hidden'
                        animate='show'
                      >
                        {displayVisits}
                        <MyPaginate
                          previousLabel={'Poprzednia strona'}
                          nextLabel={'Następna strona'}
                          pageCount={pageCount}
                          onPageChange={changePage}
                        />
                      </VisitsListContainer>
                    </>
                  ) : (
                    <VisitsPageTitle
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      Brak wizyt tego dnia
                    </VisitsPageTitle>
                  )
                ) : (
                  <VisitsPageTitle
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Wybierz datę
                  </VisitsPageTitle>
                )}
              </VisitsContainer>
            </VisitsPageContainer>
          </>
        ) : (
          <VisitsPageTitle
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Wybierz lekarza
          </VisitsPageTitle>
        )}
        {isSelected && (
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
                height: 'auto',
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
              <h2 style={{ marginBottom: '20px' }}>Zarezerwuj</h2>
              <Formik
                enableReinitialize
                initialValues={visitState}
                validationSchema={addVisitAdminTimesheetValidationSchema}
                onSubmit={() => setIsSubmit(true)}
                onReset={() => setVisitState({})}
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
                          right: '0',
                          top: '0',
                          backgroundColor: 'rgba(3,3,3,.8)',
                          zIndex: '9999',
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
                              <p>
                                {bookingInfo.specjalista.imie}
                                {bookingInfo.specjalista.nazwisko}
                              </p>
                              <p>{values.grupa}</p>
                              <p>{values.usluga}</p>
                              <p>{bookingInfo.data}r.</p>
                              <p>{bookingInfo.godzina}:00</p>
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
            </div>
          </div>
        )}
      </StyledContainer>

      <Pattern
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          damping: 7,
          stiffness: 50,
          duration: 0.5,
          delay: 0.6,
        }}
        src='Pattern.png'
        top='15%'
        left='70%'
      />
    </PageWrapper>
  )
}

export default AdminTimesheetPage
