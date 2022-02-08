import React, { useState, useEffect } from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import { Pattern } from '../../components/Pattern'
import '../../styles/index.css'
import styled from 'styled-components'

import { getDay } from 'date-fns'
import pl from 'date-fns/locale/pl'
import { useDispatch } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { useNavigate } from 'react-router'
import { FaTrashAlt } from 'react-icons/fa'
import {
  VisitsPageContainer,
  VisitsPageTitleContainer,
  VisitsPageTitle,
  VisitsContainer,
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
import { refreshApp } from '../../store/actions/refresh'
import { Option, TimesheetPick } from './TimesheetPageElements'

import DoctorData from '../../services/doctor'
import UserData from '../../services/user'
import VisitData from '../../services/visit'
import AdminCreateVisit from './AdminCreateVisit'

const StyledContainer = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-content: center;

  @media only screen and (min-width: 1076px) {
    grid-template-columns: 2fr 3fr;
  }
`

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media only screen and (min-width: 768px) {
    grid-column: ${({ isSelected }) => (isSelected ? '1 / 2' : '1 / -1')};
    justify-self: center;
  }
`

const StyledList = styled.div`
  height: 100%;
  width: 100%;
  display: ${({ isSelected }) => (isSelected ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`

const AdminTimesheetPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [doctors, setDoctors] = useState([])
  const [users, setUsers] = useState([])
  const [updatedVisits, setUpdatedVisits] = useState([])
  const [selectedDateVisits, setSelectedDateVisits] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [visitId, setVisitId] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [bookingInfo, setBookingInfo] = useState({})
  const [isSelected, setIsSelected] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [isCreated, setIsCreated] = useState(false)
  const visitsPerPage = 5
  const pagesVisited = pageNumber * visitsPerPage
  const dispatch = useDispatch()
  const navigate = useNavigate()
  registerLocale('pl', pl)

  useEffect(() => {
    retrieveUsers()
    DoctorData.getAll().then((response) => {
      setDoctors(response.data)
      const workingHours = response.data.find(
        (doctor) => doctor.doctorId === selectedDoctor
      )
      if (selectedDoctor) {
        let helperArr = []
        for (
          let i = workingHours.godzinyPracy[0];
          i <= workingHours.godzinyPracy[workingHours.godzinyPracy.length - 1];
          i++
        ) {
          helperArr = [
            ...helperArr,
            {
              godzina: `${i}`,
            },
          ]
        }
        setUpdatedVisits(helperArr)
      }
    })

    return () => {
      setUpdatedVisits([])
    }
  }, [selectedDoctor])

  useEffect(() => {
    VisitData.getAll().then((response) => {
      let today = new Date()

      let todayDate = `${today.getDate()}.${
        today.getMonth() + 1
      }.${today.getFullYear()}`

      let selectedDate = `${startDate.getDate()}.${
        startDate.getMonth() + 1
      }.${startDate.getFullYear()}`

      console.log('selectedDate', selectedDate)

      const selectedDateVisitsArr = response.data
        .filter((visit) => visit.data === selectedDate)
        .filter((visit) => visit.specjalista.sid === selectedDoctor)

      const updatedArr = updatedVisits.filter(
        (ar) => !selectedDateVisitsArr.find((rm) => rm.godzina === ar.godzina)
      )

      let aa = todayDate.split('.').reverse().join()
      let bb = selectedDate.split('.').reverse().join()

      if (aa > bb) {
        setSelectedDateVisits(selectedDateVisitsArr)
      } else if (bb >= aa) {
        if (selectedDateVisitsArr.length > 0) {
          let arrToDisplay = []
          if (selectedDate == todayDate) {
            let arr = updatedArr.filter(
              (item) => item.godzina > today.getHours()
            )
            arrToDisplay = [...arr, ...selectedDateVisitsArr].sort(
              (a, b) => a.godzina - b.godzina
            )
            setSelectedDateVisits(arrToDisplay)
          } else {
            arrToDisplay = [...updatedArr, ...selectedDateVisitsArr].sort(
              (a, b) => a.godzina - b.godzina
            )
            setSelectedDateVisits(arrToDisplay)
          }
        } else {
          setSelectedDateVisits(updatedVisits)
        }
      }
    })
  }, [isCreated, startDate, updatedVisits, selectedDoctor])

  const retrieveUsers = () => {
    UserData.getAll().then((response) => {
      setUsers(response.data)
    })
  }

  const filteredUsers = users.filter((user) =>
    doctors.some((doctor) => doctor.doctorId === user._id)
  )

  const onDoctorChange = (e) => {
    if (e.target.value === '') {
      setSelectedDoctor('')
    } else {
      const user = doctors.find((user) => user.doctorId === e.target.value)
      setSelectedDoctor(user.doctorId)
    }
  }

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  const goToVisit = (item) => {
    navigate(`/wizyty/${item.id}`, {
      state: { item: item, bRoute: 'grafik' },
    })
  }

  const onVisitDelete = () => {
    setIsDelete(false)
    VisitData.remove(visitId.id)
      .then((response) => {
        dispatch(refreshApp())
        setIsCreated(!isCreated)
      })
      .catch((e) => console.log(e))
  }

  const displayVisits = selectedDateVisits
    .slice(pagesVisited, pagesVisited + visitsPerPage)
    .map((visit, i) => {
      if (users.length > 0) {
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
                      data: `${startDate.getDate()}.${
                        startDate.getMonth() + 1
                      }.${startDate.getFullYear()}`,
                      godzina: visit.godzina,
                      specjalista: {
                        sid: selectedDoctor,
                        imie: users.find((user) => user._id === selectedDoctor)
                          .imie,
                        nazwisko: users.find(
                          (user) => user._id === selectedDoctor
                        ).nazwisko,
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

  const Styles = styled.div`
    .react-datepicker__input-container input {
      width: 25em;
      height: 3em;
      text-align: center;
      outline: none;
      border: 2px solid #333;
      background-color: #fff;
      font-family: 'poppins';
      color: #333;
      margin-top: 2em;
    }
  `
  return (
    <PageWrapper>
      <StyledContainer>
        <StyledHeader isSelected={selectedDoctor}>
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
            onChange={onDoctorChange}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            value={selectedDoctor}
          >
            <Option value=''>Wybierz lekarza</Option>
            {filteredUsers.map((doctor) => (
              <Option value={doctor._id} key={doctor._id}>
                {doctor.imie} {doctor.nazwisko}
              </Option>
            ))}
          </TimesheetPick>
        </StyledHeader>
        <StyledList isSelected={selectedDoctor}>
          {selectedDoctor && (
            <>
              <Styles>
                <DatePicker
                  selected={startDate}
                  dateFormat='dd/MM/yyyy'
                  onChange={(date) => setStartDate(date)}
                  value={startDate}
                  filterDate={isWeekday}
                  name='data'
                  withPortal
                  locale='pl'
                />
              </Styles>
              <VisitsPageContainer>
                <VisitsContainer>
                    {selectedDateVisits ? (
                      <>
                        <VisitsListContainer
                          primary
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
                    )}
                </VisitsContainer>
              </VisitsPageContainer>
            </>
          )}
        </StyledList>
        {isSelected && (
          <ModalShadow>
            <AdminCreateVisit
              isDelete={isDelete}
              bookingInfo={bookingInfo}
              doctors={doctors}
              selectedDoctor={selectedDoctor}
              isSelectedFunc={setIsSelected}
              onCreate={setIsCreated}
            />
          </ModalShadow>
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
