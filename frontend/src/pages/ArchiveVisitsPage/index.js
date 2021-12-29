import React, { useEffect, useState } from 'react'
import VisitDataService from '../../services/visit'
import { useSelector, useDispatch } from 'react-redux'
import { refreshApp } from '../../store/actions/refresh'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import { PageWrapper } from '../../components/PageWrapper'

import {
  Title,
  Container,
  TitleContainer,
  EmptyListHeading,
} from './ArchiveVisitsPageElements'

const ArchiveVisitsList = () => {
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

  return (
    <PageWrapper>
      <Container>
        <TitleContainer>
          <Title>Archiwum </Title>
          <Title primary>wizyt</Title>
        </TitleContainer>

        {visitsList.length > 0 ? (
          <>
            <div
              style={{
                width: '95%',
                display: 'grid',
                gridTemplateColumns: '350px 2fr 1fr 1fr 1fr 1fr',
                columnGap: '30px',
                padding: '.5rem',
                margin: '0 auto',
              }}
            >
              <p>Usluga</p>
              <p>Lekarz</p>
              <p>Data</p>
              <p>Godzina</p>
              <p>Cena</p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {visitsList.map((item) => (
                <div
                  style={{
                    width: '95%',
                    backgroundColor: '#FFFFFF',
                    color: 'rgba(75,75,75,.75)',
                    padding: '.5rem',
                    marginBottom: '.5rem',
                    cursor: 'pointer',
                    borderRadius: '.75rem',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    display: 'grid',
                    gridTemplateColumns: '350px 2fr 1fr 1fr 1fr 1fr',
                    columnGap: '30px',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                  onClick={() => goToVisit(item)}
                >
                  <p>{item.usluga}</p>
                  <p>Leno Paleno</p>
                  <p>{item.data}</p>
                  <p>{item.godzina}</p>
                  <p>{item.cena}zl</p>
                  <button
                    onClick={() => deleteVisit(item)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '2px solid #333',
                      color: '#333',
                      padding: '5px',
                      marginRight: '5px',
                      cursor: 'pointer',
                      width: '30px',
                      height: '30px',
                      borderRadius: '30px',
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyListHeading>Brak archiwalnych wizyt</EmptyListHeading>
        )}
      </Container>
    </PageWrapper>
  )
}

export default ArchiveVisitsList
