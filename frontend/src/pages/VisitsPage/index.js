import React, { useEffect, useState } from 'react'
import VisitDataService from '../../services/visit'
import { useSelector, useDispatch } from 'react-redux'
import { refreshApp } from '../../store/actions/refresh'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../../components/PageWrapper'
import { FaTrashAlt } from 'react-icons/fa'
import { Pattern } from '../../components/Pattern'
import HashLoader from 'react-spinners/HashLoader'

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
  MyPaginate,
} from './VisitsPageElements'
import {
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from '../VisitPage/VisitPageElements'
import useFetchAllUsers from '../../hooks/useFetchAllUsers'

const VisitsPage = () => {
  const [filterPosition, setFilterPosition] = useState({
    usluga: 0,
    lekarz: 0,
    data: 0,
    godzina: 0,
    cena: 0,
  })
  const [visitsList, setVisitsList] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [visitId, setVisitId] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { user: currentUser } = useSelector((state) => state.auth)
  const { refresh: isRefresh } = useSelector((state) => state)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const allUsers = useFetchAllUsers()
  const visitsPerPage = 5
  const pagesVisited = pageNumber * visitsPerPage

  // pobieranie wizyt z bazy wraz z załadowaniem komponentu
  // isRefresh jest stanem, ktory jest odpowiedzialny za odswiezanie useEffect jesli zmieni swoja wartosc(isRefresh)
  useEffect(() => {
    retrieveVisits()
  }, [isRefresh])

  // funkcja ktora definiuje pobieranie wizyt z bazdy i sprawdzajaca od razu jaki uzytkownik jest zalogowany i pod tym warunkiem
  // dodaje konkretne wizyty do stanu visitsList
  // tutaj zwracane sa wizyty ktorych status jest false, czyli nie zostaly zarchiwizowane
  const retrieveVisits = () => {
    setIsLoading(true)
    VisitDataService.getAll()
      .then((response) => {
        const visitsArr = response.data.filter((item) => item.status === false)
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
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  // funkcja ktora odpowiada za przeniesienie nas do podstrony z konkretna wizyta, wraz z informacjami o tej wizycie
  const goToVisit = (item) => {
    navigate(`/wizyty/${item.id}`, { state: { item } })
  }

  // funkcja odpowiedzialna za usuniecie wizyty z bazy
  const onVisitDelete = () => {
    setIsDelete(false)
    VisitDataService.remove(visitId.id)
      .then((response) => {
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
  }

  // funkcja odpowiedzialna za wyswietlanie wizyt
  // jest tutaj rowniez dodana paginacja zeby mozna bylo pogrupowac wizyty na strony(5 wizyt na strone)
  const displayVisits = visitsList
    .slice(pagesVisited, pagesVisited + visitsPerPage)
    .map((visit, i) => {
      if (allUsers.length > 0) {
        return (
          <>
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
              <VisitDelete
                onClick={(e) => {
                  e.stopPropagation()
                  setIsDelete(true)
                  setVisitId(visit)
                }}
              >
                <FaTrashAlt />
              </VisitDelete>
            </Visit>
          </>
        )
      }
    })

  // funkcja obliczajaca liczbe stron bazujac na pobranych wizytach tego uzytkownika z bazy
  const pageCount = Math.ceil(visitsList.length / visitsPerPage)

  // funkcja zmieniajaca strone
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // filtrowanie po nazwie uslugi
  // jest tutaj resetowanie pozycji innych filtrow w razie gdybysmy np filtrowali po usludze, a nagle chcemy po cenie
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

  // filtrowanie po nazwisku specjalisty
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

  // filtrowanie po dacie
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

  // filtrowanie po godzinie
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

  // filtrowanie po cenie
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

  // Macka kontener z animacjami
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

  // jw.
  const itemOne = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }
  return (
    <PageWrapper>
      <HashLoader
        color='#01d4bf'
        loading={isLoading}
        size={50}
        css={{ width: '100%', height: '100%' }}
      />
      {!isLoading && (
        <>
          <VisitsPageContainer>
            <VisitsPageTitleContainer>
              <VisitsPageTitle
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Aktualne
              </VisitsPageTitle>
              <VisitsPageTitle
                primary
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Rezerwacje
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
                  Brak aktualnych wizyt
                </VisitsPageTitle>
              )}
            </VisitsContainer>
          </VisitsPageContainer>
          {isDelete && (
            <ModalShadow>
              <ModalContainer>
                <ModalText>Na pewno chcesz usunąć wizytę?</ModalText>
                <ModalButtonsContainer>
                  <ModalButton primary onClick={() => setIsDelete(false)}>
                    Nie
                  </ModalButton>
                  <ModalButton onClick={onVisitDelete}>Tak</ModalButton>
                </ModalButtonsContainer>
              </ModalContainer>
            </ModalShadow>
          )}
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

export default VisitsPage
