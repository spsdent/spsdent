import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

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
    value: {
      usluga1: '',
      cena1: '',
    },
  }
  const [inpArr, setInpArr] = useState([
    {
      id: 1,
      value: {
        usluga: 'usluga1',
        cena: 'cena1',
      },
    },
  ])
  const [services, setServices] = useState(initialState)
  const [counter, setCounter] = useState(2)
  const [errorMsg, setErrorMsg] = useState('')

  const newServiceInput = () => {
    if (inpArr.length > 4) {
      setErrorMsg('Maksymalna liczba specjalizacji to 5')
    } else {
      setCounter(counter + 1)
      setInpArr([
        ...inpArr,
        {
          id: counter,
          value: { usluga: `usluga${counter}`, cena: `cena${counter}` },
        },
      ])
      setServices({
        ...services,
        value: {
          [`usluga${counter}`]: '',
          [`cena${counter}`]: '',
        },
      })
    }
  }

  const onSubmitHandle = (values) => {
    const { grupa, ...uslugi } = values
    // const uslugiArr = Object.entries(uslugi).map((item) => item[1])
    console.log(inpArr)
  }

  return (
    <>
      <h1>Dodaj specjalizacje lub uslugi</h1>
      <Formik
        // enableReinitialize
        initialValues={services}
        // validationSchema={AddVisitSchema}
        onSubmit={(values) => {
          onSubmitHandle(values)
        }}
        // onReset={() => }
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
            {inpArr.map((item) => (
              <React.Fragment key={item.id}>
                <label>{item.id} Specjalizacja</label>
                <Field
                  style={styles.inputStyles}
                  placeholder='Nazwa uslugi'
                  name={item.value.usluga}
                ></Field>
                <Field
                  style={styles.inputStyles}
                  placeholder='Cena uslugi'
                  name={item.value.cena}
                ></Field>
              </React.Fragment>
            ))}
            <button
              style={{
                height: '40px',
                border: '2px solid #333',
                background: 'transparent',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              onClick={newServiceInput}
            >
              Dodaj kolejna specjalizacje
            </button>
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
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
