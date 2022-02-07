import React, { useEffect, useState } from 'react'
import VisitDataService from '../../services/visit'
import { useSelector, useDispatch } from 'react-redux'
import { refreshApp } from '../../store/actions/refresh'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import { PageWrapper } from '../../components/PageWrapper'
import { FaTrashAlt } from 'react-icons/fa'
import { Pattern } from '../../components/Pattern'
import {
  VisitsPageContainer,
  VisitsPageTitleContainer,
  VisitsPageTitle,
  VisitsContainer,
  Headers,
  Header,
  HeaderText,
  TriangleAsc,
  TriangleDesc,
  TriangleDescActive,
  VisitsListContainer,
  Visit,
  VisitContent,
  VisitDelete,
} from '../VisitsPage/VisitsPageElements'
import useFetchAllUsers from '../../hooks/useFetchAllUsers'
import { MyPaginate } from '../VisitsPage/VisitsPageElements'

const ArchiveVisitsList = () => {
  const [filterPosition, setFilterPosition] = useState({
    usluga: 0,
    lekarz: 0,
    data: 0,
    godzina: 0,
    cena: 0,
  })
  const [visitsList, setVisitsList] = useState([])
  const { user: currentUser } = useSelector((state) => state.auth)
  const { refresh: isRefresh } = useSelector((state) => state)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const allUsers = useFetchAllUsers()
  const [pageNumber, setPageNumber] = useState(0)
  const visitsPerPage = 5
  const pagesVisited = pageNumber * visitsPerPage

  useEffect(() => {
    retrieveVisits()
  }, [isRefresh])

  const retrieveVisits = () => {
    VisitDataService.getAll()
      .then((response) => {
        const visitsArr = response.data.filter((item) => item.status === true)
        if (currentUser.roles.includes('ROLE_ADMIN')) {
          setVisitsList(visitsArr)
        } else if (currentUser.roles.includes('ROLE_SPEC')) {
          const specificDoctorVisits = visitsArr.filter(
            (visit) => visit.specjalista.sid === currentUser.id
          )
          setVisitsList(specificDoctorVisits)
        } else {
          const userVisitsArr = visitsArr.filter(
            (visit) => visit.email === currentUser.email
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
    navigate(`/archiwum-wizyt/${item.id}`, { state: { item } })
  }

  const displayVisits = visitsList
    .slice(pagesVisited, pagesVisited + visitsPerPage)
    .map((visit, i) => {
      if (allUsers.length > 0) {
        return (
          <Visit
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.2 }}
            key={visit._id}
            onClick={() => goToVisit(visit)}
          >
            <VisitContent primary>{visit.usluga}</VisitContent>
            <VisitContent>
              {`${visit.specjalista.imie} ${visit.specjalista.nazwisko}`}
            </VisitContent>
            <VisitContent>{visit.data}</VisitContent>
            <VisitContent>{visit.godzina}:00</VisitContent>
            <VisitContent>{visit.cena}zł</VisitContent>
            <VisitDelete onClick={() => deleteVisit(visit)}>
              <FaTrashAlt />
            </VisitDelete>
          </Visit>
        )
      }
    })

  const pageCount = Math.ceil(visitsList.length / visitsPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const onFilterByService = () => {
    if (filterPosition.usluga === 0) {
      const descArr = visitsList.sort((a, b) =>
        b.usluga.toLowerCase() > a.usluga.toLowerCase() ? 1 : -1
      )
      setVisitsList(descArr)
      setFilterPosition({ usluga: 1, data: 0, godzina: 0, cena: 0, lekarz: 0 })
    } else if (filterPosition.usluga === 1) {
      const ascArr = visitsList.sort((a, b) =>
        a.usluga.toLowerCase() > b.usluga.toLowerCase() ? 1 : -1
      )
      setVisitsList(ascArr)
      setFilterPosition({ usluga: 2, data: 0, godzina: 0, cena: 0, lekarz: 0 })
    } else if (filterPosition.usluga === 2) {
      retrieveVisits()
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 })
    }
  }

  const onFilterBySpecialist = () => {
    if (filterPosition.lekarz === 0) {
      const descArr = visitsList.sort((a, b) =>
        b.specjalista.nazwisko.toLowerCase() >
        a.specjalista.nazwisko.toLowerCase()
          ? 1
          : -1
      )
      setVisitsList(descArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 1 })
    } else if (filterPosition.lekarz === 1) {
      const ascArr = visitsList.sort((a, b) =>
        a.specjalista.nazwisko.toLowerCase() >
        b.specjalista.nazwisko.toLowerCase()
          ? 1
          : -1
      )
      setVisitsList(ascArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 2 })
    } else if (filterPosition.lekarz === 2) {
      retrieveVisits()
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 })
    }
  }

  const onFilterByDate = () => {
    if (filterPosition.data === 0) {
      const descArr = visitsList.sort((a, b) => {
        let aa = a.data.split('.').reverse().join()
        let bb = b.data.split('.').reverse().join()
        return aa > bb ? -1 : aa > bb ? 1 : 0
      })
      setVisitsList(descArr)
      setFilterPosition({ usluga: 0, data: 1, godzina: 0, cena: 0, lekarz: 0 })
    } else if (filterPosition.data === 1) {
      const ascArr = visitsList.sort((a, b) => {
        let aa = a.data.split('.').reverse().join()
        let bb = b.data.split('.').reverse().join()
        return aa < bb ? -1 : aa > bb ? 1 : 0
      })
      setVisitsList(ascArr)
      setFilterPosition({ usluga: 0, data: 2, godzina: 0, cena: 0, lekarz: 0 })
    } else if (filterPosition.data === 2) {
      retrieveVisits()
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 })
    }
  }

  const onFilterByHour = () => {
    if (filterPosition.godzina === 0) {
      const descArr = visitsList.sort((a, b) => b.godzina - a.godzina)
      setVisitsList(descArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 1, cena: 0, lekarz: 0 })
    } else if (filterPosition.godzina === 1) {
      const ascArr = visitsList.sort((a, b) => a.godzina - b.godzina)
      setVisitsList(ascArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 2, cena: 0, lekarz: 0 })
    } else if (filterPosition.godzina === 2) {
      retrieveVisits()
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 })
    }
  }

  const onFilterByPrice = () => {
    if (filterPosition.cena === 0) {
      const descArr = visitsList.sort((a, b) => b.cena - a.cena)
      setVisitsList(descArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 1, lekarz: 0 })
    } else if (filterPosition.cena === 1) {
      const ascArr = visitsList.sort((a, b) => a.cena - b.cena)
      setVisitsList(ascArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 2, lekarz: 0 })
    } else if (filterPosition.cena === 2) {
      retrieveVisits()
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 1,
        staggerChildren: 1,
      },
    },
  }
  const itemOne = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <PageWrapper>
      {allUsers.length > 0 && (
        <>
          <VisitsPageContainer>
            <VisitsPageTitleContainer>
              <VisitsPageTitle
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Archiwum
              </VisitsPageTitle>
              <VisitsPageTitle
                primary
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Rezerwacji
              </VisitsPageTitle>
            </VisitsPageTitleContainer>
            <VisitsContainer>
              {visitsList.length > 0 ? (
                <>
                  <Headers variants={container} initial='hidden' animate='show'>
                    <Header primary onClick={onFilterByService}>
                      <HeaderText variants={itemOne}>usługa</HeaderText>
                      {filterPosition.usluga === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.usluga === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                    <Header onClick={onFilterBySpecialist}>
                      <HeaderText>lekarz</HeaderText>
                      {filterPosition.lekarz === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.lekarz === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                    <Header onClick={onFilterByDate}>
                      <HeaderText>data</HeaderText>
                      {filterPosition.data === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.data === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                    <Header onClick={onFilterByHour}>
                      <HeaderText>godzina</HeaderText>
                      {filterPosition.godzina === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.godzina === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                    <Header onClick={onFilterByPrice}>
                      <HeaderText>cena</HeaderText>
                      {filterPosition.cena === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.cena === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                  </Headers>
                  <VisitsListContainer
                    variants={container}
                    initial='hidden'
                    animate='show'
                  >
                    {displayVisits}
                    <MyPaginate
                      previousLabel={'Poprzednia strona'}
                      nextLabel={'Następna strona'}
                      pageCount={pageCount}
                      onPageChange={changePage}
                    />
                  </VisitsListContainer>
                </>
              ) : (
                <VisitsPageTitle
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Brak archiwalnych wizyt
                </VisitsPageTitle>
              )}
            </VisitsContainer>
          </VisitsPageContainer>
        </>
      )}
      <Pattern
        src='Pattern.png'
        top={'12%'}
        left={'70%'}
        transition={{ duration: 0.5 }}
        initial={{ y: -400 }}
        animate={{ y: 0 }}
      />
      <Pattern
        src='Pattern.png'
        top={'70%'}
        left={'13%'}
        transition={{ duration: 1 }}
        initial={{ y: 400 }}
        animate={{ y: 0 }}
      />
    </PageWrapper>
  )
}

export default ArchiveVisitsList
