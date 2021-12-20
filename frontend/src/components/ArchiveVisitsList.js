import React, { useEffect, useState } from 'react'
import VisitDataService from '../services/visit'
import { useSelector, useDispatch } from 'react-redux'
import { refreshApp } from '../store/actions/refresh'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import useDebounce from '../hooks/useDebounce'
import { PageWrapper } from './PageWrapper'

const SearchVisitSchema = Yup.object().shape({
  usluga: Yup.string().required('Wpisz nazwe uslugi do wyszukania...'),
})

const VisitsList = () => {
  const initialState = {
    usluga: '',
  }
  const [visitSearch, setVisitSearch] = useState(initialState)
  const [visitsList, setVisitsList] = useState([])
  const { user: currentUser } = useSelector((state) => state.auth)
  const { refresh: isRefresh } = useSelector((state) => state)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      currentUser.roles.includes('ROLE_SPEC')
      currentUser.roles.includes('ROLE_ADMIN')
    }
  }, [currentUser])

  useEffect(() => {
    retrieveVisits()
  }, [isRefresh])

  const retrieveVisits = () => {
    VisitDataService.getAll()
      .then((response) => {
        const visitsArr = response.data.filter((item) => item.status !== false)
        if (
          currentUser.roles.includes('ROLE_ADMIN') ||
          currentUser.roles.includes('ROLE_SPEC')
        ) {
          setVisitsList(visitsArr)
        } else {
          const userVisitsArr = response.data.filter(
            (visit) => visit.uid === currentUser.id
          )
          setVisitsList(userVisitsArr)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteVisit = (item) => {
    VisitDataService.remove(item.id)
      .then((response) => {
        console.log('Usunieto wizyte pomyslnie!')
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
  }

  const goToVisit = (item) => {
    navigate(`/visits/${item.id}`, { state: item })
  }

  // const searchService = (value) => {
  //   VisitDataService.findByTitle(value.usluga)
  //     .then((response) => {
  //       setVisitsList(response.data)
  //     })
  //     .catch((e) => console.log(e))
  // }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Archive Visits List</h1>
        {/* <Formik
        initialValues={visitSearch}
        validationSchema={SearchVisitSchema}
        onSubmit={(values) => {
          searchService(values)
        }}
      >
        {({ errors, touched }) => (
          <Form
            style={{ display: 'flex', flexDirection: 'column', width: '200px' }}
          >
            <label>Usluga</label>
            <Field name='usluga'></Field>
            {errors.usluga && touched.usluga ? (
              <div>{errors.usluga}</div>
            ) : null}
            <button type='submit'>Szukaj</button>
          </Form>
        )}
      </Formik> */}
        {visitsList.length > 0 ? (
          visitsList.map((item) => (
            <div
              style={{
                width: '250px',
                backgroundColor: '#333',
                color: '#fff',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <p>Usluga: {item.usluga}</p>
              <p>Specjalista: {item.specjalista}</p>
              <p>Data: {item.data}</p>
              <p>Godzina: {item.godzina}</p>
              <p>Status: {item.status === false ? 'W trakcie' : 'Odbyta'}</p>
              <button
                onClick={() => deleteVisit(item)}
                style={{ backgroundColor: 'red', border: 0, color: '#fff' }}
              >
                X
              </button>
              <button onClick={() => goToVisit(item)}>Przejdz do wizyty</button>
            </div>
          ))
        ) : (
          <h2>Brak wizyt</h2>
        )}
      </div>
    </PageWrapper>
  )
}

export default VisitsList
