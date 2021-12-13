import React, { useEffect, useState } from 'react'
import VisitDataService from '../services/visit'
import { useSelector, useDispatch } from 'react-redux'
import { refreshApp } from '../store/actions/refresh'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from './PageWrapper'

const VisitsList = () => {
  const [visitsList, setVisitsList] = useState([])
  const { user: currentUser } = useSelector((state) => state.auth)
  const { refresh: isRefresh } = useSelector((state) => state)
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
        const visitsArr = response.data.filter((item) => item.status === false)
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

  return (
    <PageWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Aktualne wizyty</h1>
        {visitsList.length > 0 ? (
          <div>
            {visitsList.map((item) => (
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
                <button
                  onClick={() => deleteVisit(item)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid white',
                    color: '#fff',
                    padding: '5px',
                    marginRight: '5px',
                    cursor: 'pointer',
                  }}
                >
                  X
                </button>
                <button
                  onClick={() => goToVisit(item)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid white',
                    color: '#fff',
                    padding: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Przejdz do wizyty
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h1>Brak wizyt</h1>
        )}
      </div>
    </PageWrapper>
  )
}

export default VisitsList
