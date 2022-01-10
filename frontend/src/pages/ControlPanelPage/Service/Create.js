import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, setIn } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { createServiceValidationSchema } from '../../../utils/validationSchemas'

import ServiceData from '../../../services/service'
import { SET_MESSAGE } from '../../../store/actions/types'
import { clearMessage } from '../../../store/actions/message'

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

const NewService = () => {
  let initialState = {
    grupa: '',
  }
  const [inputArr, setInputArr] = useState([{}])
  const [services, setServices] = useState(initialState)
  const [servicesArr, setServicesArr] = useState([])
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  useEffect(() => {
    retrieveSpecializations()
  }, [])

  const retrieveSpecializations = () => {
    ServiceData.getAll()
      .then((response) => {
        setServicesArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const newServiceInput = () => {
    if (inputArr.length > 4) {
      dispatch({
        type: SET_MESSAGE,
        payload: 'Maksymalna liczba uslug do dodania za jednym razem to 5.',
      })
    } else {
      setInputArr([...inputArr, {}])
    }
  }

  const deleteInputService = () => {
    setInputArr(inputArr.slice(0, -1))
  }

  const onSubmitHandle = (values) => {
    const servicesToUpdate = servicesArr.filter(
      (service) => service.grupa === values.grupa
    )
    const { grupa, ...uslugi } = values
    let obj = []
    if ('u1nazwa' in uslugi) {
      for (let i = 0; i < inputArr.length; i++) {
        if (uslugi[`u${i + 1}nazwa`]) {
          obj = [
            ...obj,
            {
              nazwa: uslugi[`u${i + 1}nazwa`],
              cena: uslugi[`u${i + 1}cena`],
            },
          ]
        }
      }
    }
    let servicesObj = { grupa: grupa, uslugi: [...obj] }
    if (servicesToUpdate.length) {
      dispatch({
        type: SET_MESSAGE,
        payload: 'Ta specjalizacja znajduje się w kolekcji',
      })
      setInputArr([{}])
      setServices({
        ...values,
      })
    } else {
      ServiceData.create(servicesObj)
        .then((response) => {
          dispatch({
            type: SET_MESSAGE,
            payload: 'Specjalizacja została utworzona!',
          })
        })
        .catch((e) => console.log(e))
      setInputArr([{}])
      setServices({
        grupa: '',
        u1nazwa: '',
        u1cena: null,
        u2nazwa: '',
        u2cena: null,
        u3nazwa: '',
        u3cena: null,
        u4nazwa: '',
        u4cena: null,
        u5nazwa: '',
        u5cena: null,
      })
    }
  }

  return (
    <>
      <h1> Dodaj specjalizacje </h1>
      <Formik
        enableReinitialize
        initialValues={services}
        validationSchema={createServiceValidationSchema}
        onSubmit={(values, actions) => {
          onSubmitHandle(values)
          actions.resetForm()
        }}
      >
        {({ errors, touched, values, handleBlur, setValues }) => (
          <Form
            style={{
              width: '350px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label> Nazwa grupy specjalizacji </label>
            <Field
              style={styles.inputStyles}
              placeholder='Nazwa grupy uslug'
              name='grupa'
              onBlur={handleBlur}
              type='text'
            />
            {errors.grupa && touched.grupa ? (
              <p style={{ color: 'red' }}>{errors.grupa}</p>
            ) : null}
            {values.grupa && (
              <>
                {inputArr.map((item, index) => (
                  <React.Fragment key={index}>
                    <label> Usluga {index + 1} </label>
                    <Field
                      style={styles.inputStyles}
                      type='text'
                      placeholder='Nazwa uslugi'
                      name={`u${index + 1}nazwa`}
                      onBlur={handleBlur}
                    />
                    {errors[`u${index + 1}nazwa`] &&
                    touched[`u${index + 1}nazwa`] ? (
                      <p style={{ color: 'red' }}>
                        {errors[`u${index + 1}nazwa`]}
                      </p>
                    ) : null}
                    <Field
                      type='number'
                      style={styles.inputStyles}
                      placeholder='Cena uslugi'
                      name={`u${index + 1}cena`}
                      onBlur={handleBlur}
                    />
                    {errors[`u${index + 1}cena`] &&
                    touched[`u${index + 1}cena`] ? (
                      <p style={{ color: 'red' }}>
                        {errors[`u${index + 1}cena`]}
                      </p>
                    ) : null}
                  </React.Fragment>
                ))}
                {inputArr.length !== 5 && (
                  <button
                    type='button'
                    style={{
                      height: '40px',
                      border: '2px solid #333',
                      background: 'transparent',
                      fontSize: '18px',
                      cursor: 'pointer',
                      marginTop: '10px',
                    }}
                    onClick={newServiceInput}
                  >
                    Dodaj kolejna usluge
                  </button>
                )}
                {inputArr.length > 1 && (
                  <button
                    type='button'
                    style={{
                      height: '40px',
                      border: '2px solid #333',
                      background: 'transparent',
                      fontSize: '18px',
                      cursor: 'pointer',
                      marginTop: '10px',
                    }}
                    onClick={deleteInputService}
                  >
                    Usun ostatnia usluge
                  </button>
                )}
              </>
            )}
            {values.grupa && (
              <button
                type='submit'
                style={{
                  height: '40px',
                  border: '2px solid #333',
                  background: 'transparent',
                  fontSize: '18px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Dodaj
              </button>
            )}
            {message && (
              <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default NewService
