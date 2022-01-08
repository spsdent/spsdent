import React, { useEffect, useState } from 'react'
import VisitDataService from '../../services/visit'
import { useSelector, useDispatch } from 'react-redux'
import { refreshApp } from '../../store/actions/refresh'
import { useNavigate } from 'react-router-dom'
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
} from './VisitsPageElements'
import useFetchAllUsers from '../../hooks/useFetchAllUsers'

const VisitsPage = () => {
  const [visitsList, setVisitsList] = useState([])
  const [isHover, setIsHover] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [visitId, setVisitId] = useState('')
  const { user: currentUser } = useSelector((state) => state.auth)
  const { refresh: isRefresh } = useSelector((state) => state)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const allUsers = useFetchAllUsers()
  const specialistData = (sid) => allUsers.find((user) => user._id === sid)

  useEffect(() => {
    retrieveVisits()
  }, [isRefresh])

  const retrieveVisits = () => {
    VisitDataService.getAll()
      .then((response) => {
        const visitsArr = response.data.filter((item) => item.status === false)
        if (currentUser.roles.includes('ROLE_ADMIN')) {
          setVisitsList(visitsArr)
        } else if (currentUser.roles.includes('ROLE_SPEC')) {
          const specificDoctorVisits = visitsArr.filter(
            (visit) => visit.specjalista === currentUser.id
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

  const goToVisit = (item) => {
    navigate(`/visits/${item.id}`, { state: item })
  }

  const onVisitDelete = () => {
    setIsDelete(false)
    VisitDataService.remove(visitId.id)
      .then((response) => {
        console.log('Usunieto wizyte pomyslnie!')
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
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
                    {visitsList.map((item, i) => (
                      <Visit
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.2 }}
                        key={item._id}
                        onClick={() => goToVisit(item)}
                      >
                        <VisitContent primary>{item.usluga}</VisitContent>
                        <VisitContent>
                          {`${
                            allUsers.find(
                              (user) => user._id === item.specjalista
                            ).imie
                          } ${
                            allUsers.find(
                              (user) => user._id === item.specjalista
                            ).nazwisko
                          }`}
                        </VisitContent>
                        <VisitContent>{item.data}</VisitContent>
                        <VisitContent>{item.godzina}:00</VisitContent>
                        <VisitContent>{item.cena}zł</VisitContent>
                        <VisitDelete
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsDelete(true)
                            setVisitId(item)
                          }}
                          onMouseOver={() => setIsHover(true)}
                          onMouseOut={() => setIsHover(false)}
                        >
                          <FaTrashAlt />
                        </VisitDelete>
                      </Visit>
                    ))}
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
                <h2 style={{ marginBottom: '20px' }}>
                  Na pewno chcesz usunąć wizytę?
                </h2>
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
                    onClick={onVisitDelete}
                  >
                    Tak
                  </button>
                </div>
              </div>
            </div>
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
