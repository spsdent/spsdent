import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form } from 'formik'

import ServiceData from '../../services/service'
import { refreshApp } from '../../store/actions/refresh'

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
  const [errorMsg, setErrorMsg] = useState('')
  const { isRefresh } = useSelector((state) => state.refresh)
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
          console.log(response.data)
          dispatch(refreshApp())
          values.nazwa = ''
          values.cena = ''
        })
        .catch((e) => console.log(e))
    } else {
      setErrorMsg('to juz jest w kolekcji')
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
        console.log(response.data)
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
  }

  return (
    <>
      <h1>Zaktualizuj specjalizacje</h1>
      <Formik
        initialValues={{ grupa: '', nazwa: '' }}
        onSubmit={(actions) => actions.resetForm()}
      >
        {({ values, errors, touched }) => (
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Wybierz grupe</label>
            <Field
              as='select'
              name='grupa'
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #333',
                height: '3em',
                margin: '10px 0',
              }}
            >
              <option value=''>Wybierz grupe uslug</option>
              {servicesArr.map((service) => (
                <option key={service.grupa} value={service.grupa}>
                  {service.grupa}
                </option>
              ))}
            </Field>
            {values.grupa && (
              <div style={{ display: 'flex', marginTop: '20px' }}>
                <button
                  style={{
                    height: '40px',
                    border: btnType === 'dodaj' ? 'none' : '2px solid #333',
                    background: btnType === 'dodaj' ? '#01D4BF' : 'transparent',
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginRight: '10px',
                    padding: '10px',
                  }}
                  onClick={() => setBtnType('dodaj')}
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
                  onClick={() => setBtnType('usun')}
                >
                  Usun usluge
                </button>
              </div>
            )}
            {btnType === 'usun' && (
              <>
                <label>Wybierz usluge do usuniecia</label>
                {servicesArr.map((service) =>
                  service.uslugi.map((usluga, index) => (
                    <div
                      style={{
                        display: 'flex',
                        backgroundColor: '#333',
                        marginBottom: '20px',
                        padding: '10px',
                      }}
                      key={index}
                    >
                      <p style={{ color: '#fff' }}>Usluga: {usluga.nazwa}</p>
                      <button
                        style={{
                          marginLeft: '10px',
                          backgroundColor: 'transparent',
                          border: '2px solid #fff',
                          color: '#fff',
                          padding: '5px 10px',
                          cursor: 'pointer',
                        }}
                        onClick={() => onServiceDelete(service, usluga)}
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
                ></Field>
                <Field
                  style={styles.inputStyles}
                  placeholder='Cena uslugi'
                  name='cena'
                ></Field>
                <button onClick={() => addNewService(values)}>Dodaj</button>
                <p style={{ color: 'red' }}>{errorMsg}</p>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default UpdateService
