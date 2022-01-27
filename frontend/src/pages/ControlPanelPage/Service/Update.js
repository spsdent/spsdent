import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form } from 'formik'

import ServiceData from '../../../services/service'
import { refreshApp } from '../../../store/actions/refresh'

import { updateServiceValidationSchema } from '../../../utils/validationSchemas'
import { SET_MESSAGE } from '../../../store/actions/types'
import { clearMessage } from '../../../store/actions/message'

import styled from 'styled-components'
import { StyledContainer, StyledHeading } from '..//ControlPanelPageElements'

const StyledLabel = styled.label`
  font-size: 0.813rem;
`

const StyledHeadingCreate = styled(StyledHeading)`
  font-size: 1rem;
  margin-bottom: 1rem;
`

const styles = {
  inputStyles: {
    width: '100%',
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
}

const UpdateService = () => {
  const [servicesArr, setServicesArr] = useState([])
  const [btnType, setBtnType] = useState('')
  const [isDelete, setIsDelete] = useState(false)
  const [serviceData, setServiceData] = useState('')
  const { isRefresh } = useSelector((state) => state.refresh)
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  useEffect(() => {
    retrieveServices()
  }, [isRefresh])

  const retrieveServices = () => {
    ServiceData.getAll()
      .then((response) => {
        setServicesArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const addNewService = (values) => {
    const isDuplicate = servicesArr
      .filter((item) => item.grupa === values.grupa)[0]
      .uslugi.filter((usluga) => usluga.nazwa === values.nazwa)
    if (!isDuplicate.length) {
      const serviceToUpdate = servicesArr.filter(
        (service) => service.grupa === values.grupa
      )
      const [serviceObj] = serviceToUpdate
      serviceObj.uslugi = [
        ...serviceObj.uslugi,
        { nazwa: values.nazwa, cena: values.cena },
      ]
      ServiceData.update(serviceObj._id, serviceObj)
        .then((response) => {
          dispatch({ type: SET_MESSAGE, payload: 'Usługa została dodana!' })
          setBtnType('')
          values.nazwa = ''
          values.cena = ''
        })
        .catch((e) => console.log(e))
    } else {
      dispatch({
        type: SET_MESSAGE,
        payload: 'Ta usługa znajduje się w kolekcji!',
      })
    }
  }

  const onServiceDelete = (service, usluga) => {
    const { _id: serviceId } = service
    const updatedServiceArr = service.uslugi.filter(
      (serv) => serv._id !== usluga._id
    )
    service.uslugi = updatedServiceArr
    ServiceData.update(serviceId, service)
      .then((response) => {
        dispatch({ type: SET_MESSAGE, payload: 'Usługa została usunięta!' })
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
  }

  const onServiceDeleteModal = () => {
    onServiceDelete(serviceData.service, serviceData.usluga)
    setIsDelete(false)
  }

  return (
    <StyledContainer>
      <StyledHeadingCreate>Zaktualizuj specjalizacje</StyledHeadingCreate>
      <Formik
        initialValues={{ grupa: '', nazwa: '', cena: '' }}
        validationSchema={updateServiceValidationSchema}
        onSubmit={(values) => {
          addNewService(values)
        }}
      >
        {({ values, errors, touched, handleBlur }) => (
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <StyledLabel>Wybierz grupe</StyledLabel>
            <Field
              as='select'
              name='grupa'
              onBlur={handleBlur}
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #333',
                height: '3em',
                margin: '10px 0',
              }}
              onClick={() => {
                if (!values.grupa) {
                  setBtnType('')
                }
              }}
            >
              <option value=''>Wybierz grupe uslug</option>
              {servicesArr.map((service) => (
                <option key={service.grupa} value={service.grupa}>
                  {service.grupa}
                </option>
              ))}
            </Field>
            {errors.grupa && touched.grupa ? (
              <p style={{ color: 'red' }}>{errors.grupa}</p>
            ) : null}
            {values.grupa && (
              <div style={{ display: 'flex', marginTop: '20px' }}>
                <button
                  type='button'
                  style={{
                    height: '40px',
                    border: btnType === 'dodaj' ? 'none' : '2px solid #333',
                    background: btnType === 'dodaj' ? '#01D4BF' : 'transparent',
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginRight: '10px',
                    padding: '10px',
                  }}
                  onClick={() => {
                    dispatch(clearMessage())
                    if (btnType === 'dodaj') {
                      setBtnType('')
                    } else {
                      setBtnType('dodaj')
                    }
                  }}
                >
                  Dodaj usluge
                </button>
                <button
                  style={{
                    height: '40px',
                    border: btnType === 'usun' ? 'none' : '2px solid #333',
                    background: btnType === 'usun' ? '#01D4BF' : 'transparent',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '10px',
                  }}
                  type='button'
                  onClick={() => {
                    dispatch(clearMessage())
                    if (btnType === 'usun') {
                      setBtnType('')
                    } else {
                      setBtnType('usun')
                    }
                  }}
                >
                  Usun usluge
                </button>
              </div>
            )}
            {btnType === 'usun' && (
              <>
                <label>Wybierz usluge do usuniecia</label>
                {servicesArr
                  .filter((item) => item.grupa === values.grupa)
                  .map((service) =>
                    service.uslugi.map((usluga, index) => (
                      <div
                        style={{
                          display: 'flex',
                          backgroundColor: 'transparent',
                          marginBottom: '20px',
                          padding: '10px',
                        }}
                        key={index}
                      >
                        <p style={{ color: '#333' }}>{usluga.nazwa}</p>
                        <button
                          style={{
                            marginLeft: '10px',
                            backgroundColor: 'transparent',
                            border: '2px solid #333',
                            color: '#333',
                            padding: '5px 10px',
                            cursor: 'pointer',
                          }}
                          type='button'
                          onClick={() => {
                            setServiceData({ service, usluga })
                            setIsDelete(true)
                          }}
                        >
                          Usun
                        </button>
                      </div>
                    ))
                  )}
              </>
            )}
            {btnType === 'dodaj' && (
              <>
                <label>Dodaj usluge</label>
                <Field
                  style={styles.inputStyles}
                  placeholder='Nazwa uslugi'
                  name='nazwa'
                  onBlur={handleBlur}
                  type='text'
                />
                {errors.nazwa && touched.nazwa ? (
                  <p style={{ color: 'red' }}>{errors.nazwa}</p>
                ) : null}
                <Field
                  style={styles.inputStyles}
                  placeholder='Cena uslugi'
                  name='cena'
                  type='number'
                  onBlur={handleBlur}
                />
                {errors.cena && touched.cena ? (
                  <p style={{ color: 'red' }}>{errors.cena}</p>
                ) : null}
                <button
                  style={{
                    height: '40px',
                    border: '2px solid #333',
                    background: 'transparent',
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                  type='submit'
                >
                  Dodaj
                </button>
              </>
            )}
            {message && (
              <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
            )}
          </Form>
        )}
      </Formik>
      {isDelete && (
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
            <h2 style={{ marginBottom: '20px' }}>
              Na pewno chcesz usunąć tę usługę?
            </h2>
            <div
              style={{
                position: 'relative',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #333',
                  padding: '.75em 50px',
                  marginRight: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => setIsDelete(false)}
              >
                Nie
              </button>
              <button
                style={{
                  backgroundColor: '#01d4bf',
                  border: '2px solid transparent',
                  padding: '.75em 50px',
                  marginLeft: '5px',
                  cursor: 'pointer',
                }}
                onClick={onServiceDeleteModal}
              >
                Tak
              </button>
            </div>
          </div>
        </div>
      )}
    </StyledContainer>
  )
}

export default UpdateService
