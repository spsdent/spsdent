import React, { useState, useEffect } from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import { Pattern } from '../../components/Pattern'
import '../../styles/index.css'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { getDay } from 'date-fns'
import { useNavigate } from 'react-router'
import { FaTrashAlt } from 'react-icons/fa'
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
} from '../VisitsPage/VisitsPageElements'
import {
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from '../VisitPage/VisitPageElements'
import { useFetchAllUsers } from '../../hooks'
import { refreshApp } from '../../store/actions/refresh'
import { Option, TimesheetPick } from './TimesheetPageElements'

import DoctorData from '../../services/doctor'
import UserData from '../../services/user'
import VisitData from '../../services/visit'
import AdminCreateVisit from './AdminCreateVisit'

const StyledContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AdminTimesheetPage = () => {
  const [filterPosition, setFilterPosition] = useState({
    usluga: 0,
    lekarz: 0,
    data: 0,
    godzina: 0,
    cena: 0,
  })
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [doctors, setDoctors] = useState([])
  const [users, setUsers] = useState([])
  const [visits, setVisits] = useState([])
  const [updatedVisits, setUpdatedVisits] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateVisits, setSelectedDateVisits] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [visitId, setVisitId] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [bookingInfo, setBookingInfo] = useState({})
  const [isSelected, setIsSelected] = useState(false)
  const [oldDate, setOldDate] = useState('')
  const visitsPerPage = 5
  const pagesVisited = pageNumber * visitsPerPage
  const allUsers = useFetchAllUsers()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    retrieveDoctors()
    retrieveUsers()
    retrieveVisits()
    let helperArr = []
    let today = new Date()
    for (let i = 8; i <= 16; i++) {
      helperArr = [
        ...helperArr,
        {
          data: `${today.getDate()}.${
            today.getMonth() + 1
          }.${today.getFullYear()}`,
          godzina: `${i}`,
        },
      ]
    }
    setUpdatedVisits(helperArr)
  }, [])

  const retrieveDoctors = () => {
    DoctorData.getAll().then((response) => {
      setDoctors(response.data)
    })
  }

  const retrieveUsers = () => {
    UserData.getAll().then((response) => {
      setUsers(response.data)
    })
  }

  const retrieveVisits = () => {
    VisitData.getAll().then((response) => {
      setVisits(response.data)
    })
  }

  const filteredUsers = users.filter((user) =>
    doctors.some((doctor) => doctor.doctorId === user._id)
  )

  const handleChange = (e) => {
    const user = filteredUsers.find((user) => user._id === e.target.value)
    setSelectedDoctor(user)
  }

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  const onDateSelect = (date) => {
    setSelectedDate(date)
    let today = new Date()
    let todayDate = `${today.getDate()}.${
      today.getMonth() + 1
    }.${today.getFullYear()}`
    let selectedDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`
    const selectedDateVisitsArr = visits.filter(
      (visit) => visit.data === selectedDate
    )
    let aa = todayDate.split('.').reverse().join()
    let bb = selectedDate.split('.').reverse().join()
    if (aa > bb) {
      setSelectedDateVisits(selectedDateVisitsArr)
    } else if (bb >= aa) {
      if (selectedDateVisitsArr.length > 0) {
        const updatedArr = updatedVisits
          .filter((el) =>
            selectedDateVisitsArr.some((f) => f.godzina !== el.godzina)
          )
          .filter((item) => item.godzina > today.getHours())
        let arrToDisplay = [...updatedArr, ...selectedDateVisitsArr]
        setSelectedDateVisits(arrToDisplay)
      } else {
        setSelectedDateVisits(updatedVisits)
      }
    }
  }

  const goToVisit = (item) => {
    navigate(`/visits/${item.id}`, {
      state: { item: item, bRoute: 'timesheet' },
    })
  }

  const onVisitDelete = () => {
    setIsDelete(false)
    VisitData.remove(visitId.id)
      .then((response) => {
        console.log('Usunieto wizyte pomyslnie!')
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
  }

  const displayVisits = selectedDateVisits
    .slice(pagesVisited, pagesVisited + visitsPerPage)
    .map((visit, i) => {
      if (allUsers.length > 0) {
        return (
          <>
            {visit.usluga ? (
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
            ) : (
              <Visit
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.2 }}
                onClick={() => {
                  if (isSelected) {
                    setIsSelected(false)
                  } else {
                    setIsSelected(true)
                    setBookingInfo({
                      data: visit.data,
                      godzina: visit.godzina,
                      specjalista: {
                        sid: selectedDoctor._id,
                        imie: selectedDoctor.imie,
                        nazwisko: selectedDoctor.nazwisko,
                      },
                    })
                  }
                }}
              >
                <VisitContent primary>
                  Zarezerwuj godzinę {visit.godzina}
                </VisitContent>
              </Visit>
            )}
          </>
        )
      }
    })

  const pageCount = Math.ceil(selectedDateVisits.length / visitsPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const onFilterByHour = () => {
    if (filterPosition.godzina === 0) {
      const descArr = selectedDateVisits.sort((a, b) => b.godzina - a.godzina)
      setSelectedDateVisits(descArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 1, cena: 0, lekarz: 0 })
    } else if (filterPosition.godzina === 1) {
      const ascArr = selectedDateVisits.sort((a, b) => a.godzina - b.godzina)
      setSelectedDateVisits(ascArr)
      setFilterPosition({ usluga: 0, data: 0, godzina: 2, cena: 0, lekarz: 0 })
    } else if (filterPosition.godzina === 2) {
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

  return (
    <PageWrapper>
      <StyledContainer>
        <VisitsPageTitleContainer>
          <VisitsPageTitle
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Grafik
          </VisitsPageTitle>
        </VisitsPageTitleContainer>
        <TimesheetPick
          name='selectedDoctor'
          onChange={handleChange}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          value={selectedDoctor}
        >
          <Option value='' disabled>
            Wybierz lekarza
          </Option>
          {filteredUsers.map((user, i) => (
            <Option value={user._id}>
              {user.imie} {user.nazwisko}
            </Option>
          ))}
        </TimesheetPick>

        {selectedDoctor ? (
          <>
            <DatePicker
              selected={false}
              dateFormat='dd/MM/yyyy'
              onChange={(date) => onDateSelect(date)}
              filterDate={isWeekday}
              name='data'
              inline
            />
            <VisitsPageContainer>
              <VisitsContainer>
                {selectedDate !== null ? (
                  selectedDateVisits.length > 0 ? (
                    <>
                      <Headers
                        variants={container}
                        initial='hidden'
                        animate='show'
                      >
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
                      Brak wizyt tego dnia
                    </VisitsPageTitle>
                  )
                ) : (
                  <VisitsPageTitle
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Wybierz datę
                  </VisitsPageTitle>
                )}
              </VisitsContainer>
            </VisitsPageContainer>
          </>
        ) : (
          <VisitsPageTitle
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Wybierz lekarza
          </VisitsPageTitle>
        )}
        {isSelected && (
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
                height: 'auto',
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
              <h2 style={{ marginBottom: '20px' }}>Zarezerwuj</h2>
              <AdminCreateVisit
                isDelete={isDelete}
                bookingInfo={bookingInfo}
                doctors={doctors}
                selectedDoctor={selectedDoctor}
              />
            </div>
          </div>
        )}
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
      </StyledContainer>

      <Pattern
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          damping: 7,
          stiffness: 50,
          duration: 0.5,
          delay: 0.6,
        }}
        src='Pattern.png'
        top='15%'
        left='70%'
      />
    </PageWrapper>
  )
}

export default AdminTimesheetPage
