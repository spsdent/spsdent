import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'

import { useDispatch, useSelector } from 'react-redux'
import { useFetchAllServices } from '../../hooks'
import { addVisitAdminTimesheetValidationSchema } from '../../utils/validationSchemas'
import { register } from '../../store/actions/auth'
import { SET_MESSAGE } from '../../store/actions/types'
import { refreshApp } from '../../store/actions/refresh'
import VisitData from '../../services/visit'

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

const AdminCreateVisit = ({
  bookingInfo,
  doctors,
  selectedDoctor,
  isSelectedFunc,
}) => {
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
  const [selectedServicePrice, setSelectedServicePrice] = useState('')
  const [serviceSelected, setServiceSelected] = useState('')
  const [isCreateAccount, setIsCreateAccount] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const allServicesFromDb = useFetchAllServices()
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const serviceGroupHandler = (values) => {
    setServiceGroupSelected(values.grupa)
    const currentSelectedDoctor = doctors
      .filter((doctor) => doctor.doctorId === selectedDoctor._id)
      .map((item) => item.specjalnosci)
      .flat()
    const servicesToDisplay = allServicesFromDb.filter((service) =>
      currentSelectedDoctor.includes(service._id)
    )
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

    return servicesToDisplay.map((service) => (
      <option value={service.grupa}>{service.grupa}</option>
    ))
  }

  const serviceHandler = (values) => {
    setServiceSelected(values.usluga)
    const selectedGroupServices = allServicesFromDb
      .filter((service) => service.grupa === serviceGroupSelected)
      .map((service) => service.uslugi)
      .flatMap((item) => item)

    if (values.usluga) {
      const price = selectedGroupServices.find(
        (item) => item.nazwa.toLowerCase() === values.usluga.toLowerCase()
      ).cena
      setSelectedServicePrice(price)
    }

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
    setIsSubmit(false)
    isSelectedFunc(false)
  }

  const onVisitSubmit = (values) => {
    createVisit(values)
    setVisitState({
      grupa: '',
      usluga: '',
      nazwisko: '',
      imie: '',
      telefon: '',
      miasto: '',
      ulica: '',
      kodPocztowy: '',
    })
  }

  return (
    <Formik
      enableReinitialize
      initialValues={visitState}
      validationSchema={addVisitAdminTimesheetValidationSchema}
      onSubmit={() => setIsSubmit(true)}
    >
      {({ errors, touched, values, setValues, handleBlur, resetForm }) => (
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
            Zarezerwuj
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
                bottom: '0',
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
  )
}

export default AdminCreateVisit
