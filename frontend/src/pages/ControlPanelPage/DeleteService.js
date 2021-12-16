import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ServiceData from '../../services/service'
import { refreshApp } from '../../store/actions/refresh'

const DeleteService = () => {
  const [servicesArr, setServicesArr] = useState([])
  const { isRefresh } = useSelector((state) => state.refresh)
  const dispatch = useDispatch()

  useEffect(() => {
    retrieveServices()
  }, [isRefresh])

  const retrieveServices = () => {
    ServiceData.getAll()
      .then((response) => {
        console.log(response.data)
        setServicesArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const onServiceDelete = (service) => {
    ServiceData.remove(service)
      .then((response) => {
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
    console.log(isRefresh)
  }

  return (
    <>
      <h1>Usun specjalizacje</h1>
      {servicesArr.map((service) => (
        <div
          style={{
            width: '300px',
            backgroundColor: '#333',
            color: '#fff',
            marginBottom: '10px',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <h2>Grupa: {service.grupa}</h2>
          {service.uslugi.map((usluga) => (
            <div style={{ margin: '10px 0' }}>
              <p>Nazwa uslugi: {usluga.nazwa}</p>
              <p>Cena uslugi: {usluga.cena}</p>
            </div>
          ))}
          <button
            style={{
              height: '40px',
              border: '2px solid #fff',
              background: 'transparent',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '10px',
              padding: '5px',
              color: '#fff',
            }}
            onClick={() => onServiceDelete(service._id)}
          >
            Usun specjalizacje
          </button>
        </div>
      ))}
    </>
  )
}

export default DeleteService
