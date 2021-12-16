import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
// import * as Yup from 'yup'

import ServiceData from '../../services/service'

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
    uslugi: [{}],
  }
  const [inputArr, setInputArr] = useState([{}])
  const [services, setServices] = useState(initialState)
  const [errorMsg, setErrorMsg] = useState('')

  const newServiceInput = () => {
    if (inputArr.length > 4) {
      setErrorMsg('Maksymalna liczba uslug to 5.')
    } else {
      setInputArr([...inputArr, {}])
    }
  }

  const onSubmitHandle = (values) => {
    ServiceData.create(values)
      .then((response) => console.log('Dodano pomyslnie'))
      .catch((e) => console.log(e))
    setInputArr([{}])
    setServices({
      grupa: '',
      uslugi: [
        {
          nazwa: '',
          cena: '',
        },
      ],
    })
  }

  return (
    <>
      <h1>Dodaj specjalizacje</h1>
      <Formik
        enableReinitialize
        initialValues={services}
        // validationSchema={AddVisitSchema}
        onSubmit={(values, actions) => {
          onSubmitHandle(values)
          actions.resetForm()
        }}
      >
        {({ errors, touched, values }) => (
          <Form
            style={{ width: '350px', display: 'flex', flexDirection: 'column' }}
          >
            <label>Nazwa grupy specjalizacji</label>
            <Field
              style={styles.inputStyles}
              placeholder='Nazwa grupy uslug'
              name='grupa'
            ></Field>
            {inputArr.map((item, index) => (
              <React.Fragment key={index}>
                <label>Usluga {index + 1}</label>
                <Field
                  style={styles.inputStyles}
                  placeholder='Nazwa uslugi'
                  name={`uslugi[${index}].nazwa`}
                ></Field>
                <Field
                  style={styles.inputStyles}
                  placeholder='Cena uslugi'
                  name={`uslugi[${index}].cena`}
                ></Field>
              </React.Fragment>
            ))}
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
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
          </Form>
        )}
      </Formik>
    </>
  )
}

export default NewService
