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
  email: Yup.string().email('Invalid email').required('Required'),
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
  const { user: currentUser } = useSelector((state) => state.auth)
  const { refresh: isRefresh } = useSelector((state) => state.refresh)
  const dispatch = useDispatch()
  // const isAdmin = currentUser.roles.includes('ROLE_ADMIN')

  useEffect(() => {
    const today = new Date()
    let hours = []
    for (let i = 8; i <= 16; i++) {
      hours.push(i)
    }
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
        hours: [...hours],
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
    let data = {
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

    VisitData.create(data)
      .then((response) => {
        setChoseDate('')
        setChoseHour('')
        dispatch(refreshApp())
        console.log(response)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const helperFunc = (value) => {
    const dateChose = choseDate.split('.')[0]
    const choseDateFromDb = allVisitsArr
      .filter((item) => item.data.split('.')[0] === dateChose)
      .map((item) => Number(item.godzina))
    const updatedHours = value.hours.filter(
      (val) => !choseDateFromDb.includes(val)
    )
    if (choseDateFromDb.length <= 0) {
      return value.hours
    } else {
      return (value.hours = updatedHours)
    }
  }

  const serviceGroupHandler = (values) => {
    setServiceGroupSelected(values.grupa)
    if (serviceGroupSelected && !serviceSelected) {
      values.specjalista = ''
    } else if (!serviceGroupSelected) {
      setServiceSelected('')
      values.usluga = ''
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
    if (!serviceSelected) {
      setServiceSelected('')
      values.specjalista = ''
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

  const wybranyTerminArr = visitDates.filter((termin) => {
    const dateChose = choseDate.split('.')[0]
    if (termin.dateId.date === dateChose) {
      const hoursArray = helperFunc(termin)
      return hoursArray
    }
  })

  const pickingHours = wybranyTerminArr.map((termin, index) => {
    return termin.hours.map((item) => {
      return <option value={`${item}`} key={`${item}`}>{`${item}`}</option>
    })
  })

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
      <h1>Signup</h1>
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
            style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
          >
            <label>Grupa uslug</label>
            <Field as='select' name='grupa'>
              <option value=''>Wybierz grupe uslugi...</option>
              {serviceGroupHandler(values)}
            </Field>
            {errors.grupa && touched.grupa ? <div>{errors.grupa}</div> : null}
            {serviceGroupSelected && (
              <>
                <label>Usluga</label>
                <Field as='select' name='usluga'>
                  <option value=''>Wybierz usluge...</option>
                  {serviceHandler(values)}
                </Field>
                {errors.usluga && touched.usluga ? (
                  <div>{errors.usluga}</div>
                ) : null}
              </>
            )}
            {serviceSelected && (
              <>
                <label>Specjalista</label>
                <Field as='select' name='specjalista'>
                  <option value=''>Wybierz specjaliste...</option>
                  {doctorHandler(values)}
                </Field>
                {errors.specjalista && touched.specjalista ? (
                  <div>{errors.specjalista}</div>
                ) : null}
              </>
            )}
            <label>Data</label>
            <Field as='select' name='data'>
              <option value=''>Wybierz date...</option>
              {selectDates}
            </Field>
            {errors.data && touched.data ? <div>{errors.data}</div> : null}
            {setChoseDate(values.data)}
            {choseDate && (
              <>
                <label>Godzina</label>
                <Field as='select' name='godzina'>
                  <option value=''>Wybierz godzine...</option>
                  {pickingHours}
                </Field>
                {errors.godzina && touched.godzina ? (
                  <div>{errors.godzina}</div>
                ) : null}
              </>
            )}
            {setChoseHour(values.godzina)}
            <label>Imie</label>
            <Field name='imie' />
            {errors.imie && touched.imie ? <div>{errors.imie}</div> : null}
            <label>Nazwisko</label>
            <Field name='nazwisko' />
            {errors.nazwisko && touched.nazwisko ? (
              <div>{errors.nazwisko}</div>
            ) : null}
            <label>E-mail</label>
            <Field name='email' type='email' />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label>Telefon</label>
            <Field name='telefon' />
            {errors.telefon && touched.telefon ? (
              <div>{errors.telefon}</div>
            ) : null}
            <label>Miasto</label>
            <Field name='miasto' />
            {errors.miasto && touched.miasto ? (
              <div>{errors.miasto}</div>
            ) : null}
            <label>Ulica</label>
            <Field name='ulica' />
            {errors.ulica && touched.ulica ? <div>{errors.ulica}</div> : null}
            <label>Kod-pocztowy</label>
            <Field name='kodPocztowy' />
            {errors.kodPocztowy && touched.kodPocztowy ? (
              <div>{errors.kodPocztowy}</div>
            ) : null}
            <button type='submit'>Zarezerwuj</button>
            <button type='reset'>Wyczysc formularz</button>
            {currentUser && currentUser.roles.includes('ROLE_ADMIN') && (
              <>
                <label>Wyszukaj uzytkownika w bazie</label>
                <Field name='pacjent' />
                <button onClick={() => searchUser(values)}>Wyszukaj</button>
                {errors.pacjent && touched.pacjent ? (
                  <div>{errors.pacjent}</div>
                ) : null}
                {foundUsers.length > 0 ? (
                  <>
                    {foundUsers.map((user) => (
                      <>
                        <p>Imie: {user.imie}</p>
                        <p>Nazwisko: {user.nazwisko}</p>
                        <p>Telefon: {user.telefon}</p>
                        <p>Miasto: {user.miasto}</p>
                        <p>Ulica: {user.ulica}</p>
                        <p>Kod-pocztowy: {user.kodPocztowy}</p>
                        <button
                          onClick={() => fillFormHandler(user, setValues)}
                        >
                          Wybierz tego pacjenta
                        </button>
                      </>
                    ))}
                  </>
                ) : (
                  <p>Nie ma takiego uzytkownika</p>
                )}
              </>
            )}
          </Form>
        )}
      </Formik>
    </PageWrapper>
  )
}

export default AddVisit
