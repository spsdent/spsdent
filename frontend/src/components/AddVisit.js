import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import VisitDataService from '../services/visit'
import { useDispatch, useSelector } from 'react-redux'
import { refreshApp } from '../store/actions/refresh'

const AddVisitSchema = Yup.object().shape({
  usluga: Yup.string().required('Wybierz usluge...'),
  specjalista: Yup.string().required('Wybierz specjaliste'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzine wizyty'),
  imie: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  nazwisko: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
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
    .required('Kod pocztowy jest wymagany'),
})

const AddVisit = () => {
  const initialVisitState = {
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
  const [visitDates, setVisitDates] = useState([])
  const [choseDate, setChoseDate] = useState('')
  const [allVisitsArr, setAllVisitsArr] = useState([])
  const [choseHour, setChoseHour] = useState('')
  const { user: currentUser } = useSelector((state) => state.auth)
  const { refresh: isRefresh } = useSelector((state) => state.refresh)
  const dispatch = useDispatch()

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
    setVisitDates(arrOfDays)
    console.log('currentUser', currentUser)
  }, [])

  useEffect(() => {
    retrieveVisits()
    
  }, [isRefresh])

  const retrieveVisits = () => {
    VisitDataService.getAll()
      .then((response) => {
        const visitsArr = response.data
        setAllVisitsArr(visitsArr)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const createVisit = (values, resetForm) => {
    let data = {
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

    VisitDataService.create(data)
      .then((response) => {
        setChoseDate('')
        setChoseHour('')
        dispatch(refreshApp())
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const helperFunc = (value) => {
    const dateChose = choseDate.split('.')[0]
    console.log('test', allVisitsArr)
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

  return (
    <>
      <h1>Signup</h1>
      <Formik
        initialValues={visit}
        validationSchema={AddVisitSchema}
        onSubmit={(values, actions) => {
          createVisit(values)
          actions.resetForm()
        }}
        onReset={() => setVisit(initialVisitState)}
      >
        {({ errors, touched, values, resetForm }) => (
          <Form
            style={{ display: 'flex', flexDirection: 'column', width: '200px' }}
          >
            <label>Usluga</label>
            <Field as='select' name='usluga'>
              <option value=''>Wybierz usluge...</option>
              <option value='wybielanie'>Wybielanie</option>
              <option value='usuwanie'>Usuwanie</option>
            </Field>
            {errors.usluga && touched.usluga ? (
              <div>{errors.usluga}</div>
            ) : null}
            <label>Specjalista</label>
            <Field as='select' name='specjalista'>
              <option value=''>Wybierz specjaliste...</option>
              <option value='Jan Nowak'>Jan Nowak</option>
              <option value='Krzysztof Kowalski'>Krzysztof Kowalski</option>
              <option value='Jan Matejko'>Jan Matejko</option>
            </Field>
            {errors.specjalista && touched.specjalista ? (
              <div>{errors.specjalista}</div>
            ) : null}
            <label>Data</label>
            <Field as='select' name='data'>
              <option value=''>Wybierz date...</option>
              {selectDates}
            </Field>
            {errors.data && touched.data ? <div>{errors.data}</div> : null}
            {setChoseDate(values.data)}
            <label>Godzina</label>
            <Field as='select' name='godzina'>
              <option value=''>Wybierz godzine...</option>
              {pickingHours}
            </Field>
            {errors.godzina && touched.godzina ? (
              <div>{errors.godzina}</div>
            ) : null}
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
            <button type='submit'>Submit</button>
            <button type='reset'>Reset</button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AddVisit
