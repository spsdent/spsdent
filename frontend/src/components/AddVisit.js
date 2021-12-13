import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import VisitData from '../services/visit'
import { useDispatch, useSelector } from 'react-redux'
import { refreshApp } from '../store/actions/refresh'
import ServiceData from '../services/service'
import DoctorData from '../services/doctor'
import UserData from '../services/user'
import { PageWrapper } from './PageWrapper'

const AddVisitSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupe uslug...'),
  usluga: Yup.string().required('Wybierz usluge...'),
  specjalista: Yup.string().required('Wybierz specjaliste'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzine wizyty'),
  imie: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Wprowadz imie...'),
  nazwisko: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Wprowadz nazwisko...'),
  email: Yup.string()
    .email('Invalid email')
    .required('Wprowadz adres e-mail...'),
  telefon: Yup.string()
    .matches(/^\d{9}$/, 'Wprowadz prawidlowy numer telefonu')
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miejscowosc musi miec co najmniej 3 znaki')
    .max(50, 'Miejscowosc moze miec maksymalnie 50 znakow')
    .required('Wprowadz miejscowosc...'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Wprowadz ulice...'),
  kodPocztowy: Yup.string()
    .matches(/^\d{5}$/, 'Wprowadz prawidlowy kod pocztowy')
    .required('Wprowadz kod pocztowy'),
})

const SearchUserSchema = Yup.object().shape({
  user: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Wprowadz imie...'),
})
const AddVisit = () => {
  const initialVisitState = {
    grupa: '',
    usluga: '',
    specjalista: '',
    data: '',
    godzina: '',
    imie: '',
    nazwisko: '',
    email: '',
    telefon: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
    status: false,
    pacjent: '',
  }
  const initialSearchUserState = {
    user: '',
  }
  const daysOfWeek = ['Nd', 'Pon', 'Wt', 'Sr', 'Czw', 'Pt', 'Sb']
  const months = [
    'Sty',
    'Luty',
    'Mar',
    'Kw',
    'Maj',
    'Cze',
    'Lip',
    'Sie',
    'Wrz',
    'Paz',
    'Lis',
    'Gru',
  ]
  const [visit, setVisit] = useState(initialVisitState)
  const [services, setServices] = useState([])
  const [doctors, setDoctors] = useState([])
  const [serviceGroupSelected, setServiceGroupSelected] = useState('')
  const [serviceSelected, setServiceSelected] = useState('')
  const [doctorSelected, setDoctorSelected] = useState('')
  const [visitDates, setVisitDates] = useState([])
  const [choseDate, setChoseDate] = useState('')
  const [allVisitsArr, setAllVisitsArr] = useState([])
  const [choseHour, setChoseHour] = useState('')
  const [foundUsers, setFoundUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(false)
  const [doctorToUpdateData, setDoctorToUpdateData] = useState('')
  const { user: currentUser } = useSelector((state) => state.auth)
  const { refresh: isRefresh } = useSelector((state) => state.refresh)
  const dispatch = useDispatch()

  useEffect(() => {
    const today = new Date()
    // let hours = []
    // for (let i = 8; i <= 16; i++) {
    //   hours.push(i)
    // }
    let arrOfDays = []
    for (let i = 0; i < 6; i++) {
      arrOfDays.push({
        dateId: {
          date: `${today.getDate() + i}`,
          month: `${today.getMonth()}`,
        },
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i
        ),
      })
    }
    let updatedDates = []
    updatedDates = arrOfDays.filter(
      (item) => item.dateId.date == today.getDate() && today.getHours() <= 16
    )
    if (today.getHours() >= 16) {
      updatedDates = arrOfDays.filter(
        (item) => item.dateId.date != today.getDate()
      )
      setVisitDates(updatedDates)
    } else {
      setVisitDates([...arrOfDays])
    }
  }, [])

  useEffect(() => {
    retrieveVisits()
    retrieveServices()
    retrieveDoctors()
  }, [isRefresh])

  const retrieveVisits = () => {
    VisitData.getAll()
      .then((response) => {
        const visitsArr = response.data
        setAllVisitsArr(visitsArr)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const retrieveServices = () => {
    ServiceData.getAll()
      .then((response) => {
        // console.log('Response in retrieveServices', response.data)
        setServices(response.data)
      })
      .catch((e) => console.log('Errors in retrieveServices'))
  }

  const retrieveDoctors = () => {
    DoctorData.getAll()
      .then((response) => {
        // console.log('Response in retrieveDoctors', response.data)
        setDoctors(response.data)
      })
      .catch((e) => console.log('Errors in retrieveDoctors'))
  }

  const createVisit = (values) => {
    let visitData = {
      grupa: values.grupa,
      usluga: values.usluga,
      specjalista: values.specjalista,
      data: values.data,
      godzina: values.godzina,
      imie: values.imie,
      nazwisko: values.nazwisko,
      email: values.email,
      telefon: values.telefon,
      miasto: values.miasto,
      kodPocztowy: values.kodPocztowy,
      ulica: values.ulica,
      status: values.status,
      uid: currentUser !== null ? currentUser.id : null,
    }
    // const doctorDetails = doctors.find(
    //   (doctor) =>
    //     doctor.imie === doctorSelected.split(' ')[0] &&
    //     doctor.nazwisko === doctorSelected.split(' ')[1]
    // )
    // const doctorHoursUpdate = doctorDetails.godzinyPracy.filter(
    //   (godzina) => godzina != values.godzina
    // )

    // let doctorData = {
    //   imie: doctorToUpdateData.imie,
    //   nazwisko: doctorToUpdateData.nazwisko,
    //   email: doctorToUpdateData.email,
    //   telefon: doctorToUpdateData.telefon,
    //   specjalnosci: doctorToUpdateData.specjalnosci,
    //   godzinyPracy: doctorHoursUpdate,
    // }
    // const { _id: doctorId } = doctorDetails

    // DoctorData.update(doctorId, doctorData)
    //   .then((response) => {
    //     console.log(response)
    //     dispatch(refreshApp())
    //   })
    //   .catch((e) => console.log(e))

    VisitData.create(visitData)
      .then((response) => {
        // setChoseDate('')
        // setChoseHour('')
        dispatch(refreshApp())
        console.log(response)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const serviceGroupHandler = (values) => {
    setServiceGroupSelected(values.grupa)
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
    return services.map((service) => (
      <option value={service.grupa}>{service.grupa}</option>
    ))
  }

  const serviceHandler = (values) => {
    const selectedGroupServices = services
      .filter((service) => service.grupa === serviceGroupSelected)
      .map((service) => service.uslugi)
      .flatMap((item) => item)
    if (serviceSelected && !doctorSelected) {
      values.godzina = ''
      values.data = ''
    } else if (!serviceSelected) {
      values.godzina = ''
      values.data = ''
      setDoctorSelected('')
    }
    setServiceSelected(values.usluga)

    return selectedGroupServices.map((item) => (
      <option value={item.nazwa}>{item.nazwa}</option>
    ))
  }

  const doctorHandler = (values) => {
    const selectedGroupDoctors = doctors.filter((doctor) =>
      doctor.specjalnosci.includes(serviceGroupSelected)
    )
    if (doctorSelected && !values.data) {
      values.godzina = ''
    }
    setDoctorSelected(values.specjalista)
    return selectedGroupDoctors.map((doctor) => (
      <option value={doctor.imie + ' ' + doctor.nazwisko}>
        {doctor.imie} {doctor.nazwisko}
      </option>
    ))
  }

  const selectDates = visitDates.map((item, index) => (
    <option
      value={`${item.date.getDate()}.${
        item.date.getMonth() + 1
      }.${item.date.getFullYear()}`}
      key={`${item.date.getDate()}.${
        item.date.getMonth() + 1
      }.${item.date.getFullYear()}`}
    >
      {`${daysOfWeek[item.date.getDay()]}, ${item.date.getDate()} ${
        months[item.date.getMonth()]
      } ${item.date.getFullYear()}`}
    </option>
  ))

  // const helperFunc = (value) => {
  //   const dateChose = choseDate.split('.')[0]
  //   const choseDateFromDb = allVisitsArr
  //     .filter((item) => item.data.split('.')[0] === dateChose)
  //     .map((item) => Number(item.godzina))
  //   const updatedHours = value.hours.filter(
  //     (val) => !choseDateFromDb.includes(val)
  //   )
  //   const selectedDoctorData = doctors.find(
  //     (doctor) =>
  //       doctor.imie === doctorSelected.split(' ')[0] &&
  //       doctor.nazwisko === doctorSelected.split(' ')[1]
  //   )
  //   console.log('znalezieni doktorzy', selectedDoctorData.godzinyPracy)
  //   // if (choseDateFromDb.length <= 0) {
  //   //   return value.hours
  //   // } else {
  //   //   return (value.hours = updatedHours)
  //   // }
  //   return selectedDoctorData.godzinyPracy
  // }

  // const wybranyTerminArr = visitDates.filter((termin) => {
  //   const dateChose = choseDate.split('.')[0]
  //   if (termin.dateId.date === dateChose) {
  //     // const hoursArray = helperFunc(termin)
  //     const selectedDoctorData = doctors.find(
  //       (doctor) =>
  //         doctor.imie === doctorSelected.split(' ')[0] &&
  //         doctor.nazwisko === doctorSelected.split(' ')[1]
  //     )
  //     return selectedDoctorData.godzinyPracy
  //     // console.log('co tutaj zwracam', selectedDoctorData.godzinyPracy)
  //   }
  // })

  const pickingHours = (values) => {
    const dentHours = [8, 9, 10, 11, 12, 13, 14, 15, 16]
    const selectedDoctorData = doctors.find(
      (doctor) =>
        doctor.imie === doctorSelected.split(' ')[0] &&
        doctor.nazwisko === doctorSelected.split(' ')[1]
    )

    const currentDayDoctorVisits = allVisitsArr
      .filter(
        (visit) =>
          visit.data.split('.')[0] === values.split('.')[0] &&
          visit.specjalista ===
            `${selectedDoctorData.imie} ${selectedDoctorData.nazwisko}`
      )
      .map((item) => +item.godzina)

    const updatedHours = selectedDoctorData.godzinyPracy.filter(
      (item) => !currentDayDoctorVisits.includes(item)
    )

    if (updatedHours.length > 0) {
      return updatedHours.map((item) => (
        <option value={`${item}`} key={`${item}`}>{`${item}`}</option>
      ))
    }
    return dentHours.map((item) => (
      <option value={`${item}`} key={`${item}`}>{`${item}`}</option>
    ))
  }

  const searchUser = (values) => {
    const { pacjent } = values
    UserData.getAllUsers(pacjent)
      .then((response) => {
        console.log(response.data)
        setFoundUsers(response.data)
      })
      .catch((e) => console.log(e))
  }

  const fillFormHandler = (user, setValues) => {
    const { imie, nazwisko, email, telefon, miasto, ulica, kodPocztowy } = user
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
  }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Zarezerwuj wizyte</h1>
        <Formik
          enableReinitialize
          initialValues={visit}
          validationSchema={AddVisitSchema}
          onSubmit={(values, actions) => {
            createVisit(values)
            actions.resetForm()
          }}
          onReset={() => setVisit(initialVisitState)}
        >
          {({ errors, touched, values, setValues }) => (
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
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #333',
                  height: '3em',
                  margin: '10px 0',
                  paddingLeft: '1em',
                }}
              >
                <option value=''>Wybierz grupe uslugi...</option>
                {serviceGroupHandler(values)}
              </Field>
              {errors.grupa && touched.grupa ? (
                <p style={{ color: 'red' }}>{errors.grupa}</p>
              ) : null}
              {serviceGroupSelected && (
                <>
                  <label>Usluga</label>
                  <Field
                    as='select'
                    name='usluga'
                    style={{
                      backgroundColor: 'transparent',
                      border: '2px solid #333',
                      height: '3em',
                      margin: '10px 0',
                      paddingLeft: '1em',
                    }}
                  >
                    <option value=''>Wybierz usluge...</option>
                    {serviceHandler(values)}
                  </Field>
                  {errors.usluga && touched.usluga ? (
                    <p style={{ color: 'red' }}>{errors.usluga}</p>
                  ) : null}
                </>
              )}
              {serviceSelected && (
                <>
                  <label>Specjalista</label>
                  <Field
                    as='select'
                    name='specjalista'
                    style={{
                      backgroundColor: 'transparent',
                      border: '2px solid #333',
                      height: '3em',
                      margin: '10px 0',
                      paddingLeft: '1em',
                    }}
                  >
                    <option value=''>Wybierz specjaliste...</option>
                    {doctorHandler(values)}
                  </Field>
                  {errors.specjalista && touched.specjalista ? (
                    <p style={{ color: 'red' }}>{errors.specjalista}</p>
                  ) : null}
                </>
              )}
              {doctorSelected && (
                <>
                  <label>Data</label>
                  <Field
                    as='select'
                    name='data'
                    style={{
                      backgroundColor: 'transparent',
                      border: '2px solid #333',
                      height: '3em',
                      margin: '10px 0',
                      paddingLeft: '1em',
                    }}
                  >
                    <option value=''>Wybierz date...</option>
                    {selectDates}
                  </Field>
                  {errors.data && touched.data ? (
                    <p style={{ color: 'red' }}>{errors.data}</p>
                  ) : null}
                </>
              )}
              {values.data && (
                <>
                  <label>Godzina</label>
                  <Field
                    as='select'
                    name='godzina'
                    style={{
                      backgroundColor: 'transparent',
                      border: '2px solid #333',
                      height: '3em',
                      margin: '10px 0',
                      paddingLeft: '1em',
                    }}
                  >
                    <option value=''>Wybierz godzine...</option>
                    {pickingHours(values.data)}
                  </Field>
                  {errors.godzina && touched.godzina ? (
                    <p style={{ color: 'red' }}>{errors.godzina}</p>
                  ) : null}
                  {setChoseHour(values.godzina)}
                </>
              )}
              <label>Imie</label>
              <Field
                name='imie'
                style={{
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
              >
                Zarezerwuj
              </button>
              <button
                type='reset'
                style={{
                  backgroundColor: 'none',
                  border: '2px solid #333',
                  height: '3em',
                  margin: '10px 0',
                }}
              >
                Wyczysc formularz
              </button>
              {currentUser && currentUser.roles.includes('ROLE_ADMIN') && (
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
                  {foundUsers.length > 0 && (
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
                            onClick={() => fillFormHandler(user, setValues)}
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
                  )}
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </PageWrapper>
  )
}

export default AddVisit
