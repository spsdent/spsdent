import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ServiceData from '../../../services/service'
import { refreshApp } from '../../../store/actions/refresh'
import { PageWrapper } from '../../../components/PageWrapper'
import { Container } from '../../ProfilePage/ProfilePageElements'

import styled from 'styled-components'
import { StyledContainer, StyledHeading, ButtonControl } from '..//ControlPanelPageElements'

const StyledLabel = styled.label`
  font-size: 0.813rem;
`

const StyledHeadingCreate = styled(StyledHeading)`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: "poppins";
`

const DeleteService = () => {
  const [servicesArr, setServicesArr] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)
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

  const onServiceDelete = (service) => {
    ServiceData.remove(service)
      .then((response) => {
        dispatch(refreshApp())
        setIsDelete(false)
      })
      .catch((e) => console.log(e))
    console.log(isRefresh)
  }

  return (
    
      <StyledContainer>
        <StyledHeadingCreate>Usuń specjalizację</StyledHeadingCreate>
        {servicesArr.map((service) => (
          <div
        
          >
            <h2 style={{ verticalAlign: 'middle' }}>{service.grupa}</h2>
            {/* {service.uslugi.map((usluga) => (
            <div style={{ margin: '10px 0' }}>
              <p>Nazwa uslugi: {usluga.nazwa}</p>
              <p>Cena uslugi: {usluga.cena}</p>
            </div>
          ))} */}
            <ButtonControl
         
              onClick={() => {
                setIsDelete(true)
                setServiceToDelete(service._id)
              }}
            >
              Usuń specjalizację
            </ButtonControl>
          </div>
        ))}
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
              <h2 style={{ marginBottom: '20px' }}>Na pewno chcesz usunąć</h2>
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
                  onClick={() => {
                    onServiceDelete(serviceToDelete)
                  }}
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

export default DeleteService
