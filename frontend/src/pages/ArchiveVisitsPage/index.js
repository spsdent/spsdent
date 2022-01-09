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
  Triangle,
  VisitsListContainer,
  Visit,
  VisitContent,
  VisitDelete,
} from '../VisitsPage/VisitsPageElements'
import useFetchAllUsers from '../../hooks/useFetchAllUsers'
import { MyPaginate } from '../VisitsPage/VisitsPageElements'

const ArchiveVisitsList = () => {
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
        const visitsArr = response.data.filter((item) => item.status !== false)
        if (currentUser.roles.includes('ROLE_ADMIN')) {
          setVisitsList(visitsArr)
        } else if (currentUser.roles.includes('ROLE_SPEC')) {
          const specificDoctorVisits = visitsArr.filter(
            (visit) => visit.specjalista === currentUser.id
          )
          setVisitsList(specificDoctorVisits)
        } else {
          const userVisitsArr = response.data.filter(
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
    navigate(`/archive/${item.id}`, { state: item })
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
              {`${
                allUsers.find((user) => user._id === visit.specjalista).imie
              } ${
                allUsers.find((user) => user._id === visit.specjalista).nazwisko
              }`}
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
                    <Header primary>
                      <HeaderText variants={itemOne}>usługa</HeaderText>{' '}
                      <Triangle />
                    </Header>
                    <Header>
                      <HeaderText>lekarz</HeaderText> <Triangle />
                    </Header>
                    <Header>
                      <HeaderText>data</HeaderText> <Triangle />
                    </Header>
                    <Header>
                      <HeaderText>godzina</HeaderText> <Triangle />
                    </Header>
                    <Header>
                      <HeaderText>cena</HeaderText> <Triangle />
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
