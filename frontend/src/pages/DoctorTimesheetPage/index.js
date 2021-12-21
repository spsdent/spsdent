import React, { useState, useEffect } from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import { Pattern } from '../../components/Pattern'
import '../../styles/index.css'
import {
  TimesheetPageContainer,
  TimesheetTitleContainer,
  TimesheetTitle,
  TimesheetPickContainer,
  TimesheetPick,
  TimesheetContainer,
  TimesheetDaysContainer,
  Day,
  TimesheetWrap,
  TimesheetHoursContainer,
  Hour,
  Timesheet,
  VisitRow,
  Visit,
  Option,
  TimesheetLegend,
  LegendItemWrap,
  CircleFree,
  CircleReserved,
  CircleActive,
  LegendText,
} from './TimesheetPageElements'

import DoctorData from '../../services/doctor'
import UserData from '../../services/user'
import VisitData from '../../services/visit'

const disabled = {
  opacity: 0.4,
  pointerEvents: 'none',
}
const enabled = {
  opacity: 1,
}
const container = {
  hidden: { opacity: 0.99 },
  visible: {
    opacity: 0.99,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
}

const itemOne = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', duration: 0.5, damping: 7, stiffness: 50 },
  },
}
const itemTwo = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', duration: 0.5, damping: 7, stiffness: 50 },
  },
}

const DoctorTimesheetPage = () => {
  const [state, setState] = useState({
    input: '',
    timesheet: true,
  })
  const [doctors, setDoctors] = useState([])
  const [users, setUsers] = useState([])
  const [usersToDisplay, setUsersToDisplay] = useState([])
  const [visits, setVisits] = useState([])
  const daysOfWeek = ['Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek']

  useEffect(() => {
    retrieveDoctors()
    retrieveUsers()
    retrieveVisits()
    const filteredUsers = users.filter((user) =>
      doctors.some((doctor) => doctor.doctorId === user._id)
    )
    setUsersToDisplay(filteredUsers)
  }, [])

  const retrieveDoctors = () => {
    DoctorData.getAll().then((response) => {
      console.log('doctors', response.data)
      setDoctors(response.data)
    })
  }

  const retrieveUsers = () => {
    UserData.getAll().then((response) => {
      console.log('users', response.data)
      setUsers(response.data)
    })
  }

  const retrieveVisits = () => {
    VisitData.getAll().then((response) => {
      setVisits(response.data)
    })
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <PageWrapper>
      <TimesheetPageContainer>
        <TimesheetTitleContainer>
          <TimesheetTitle
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              damping: 7,
              stiffness: 50,
              duration: 0.5,
            }}
          >
            Zarezerwuj
          </TimesheetTitle>
          <TimesheetTitle
            primary
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              damping: 7,
              stiffness: 50,
              duration: 0.5,
              delay: 0.3,
            }}
          >
            Wizytę
          </TimesheetTitle>
        </TimesheetTitleContainer>
        <TimesheetPickContainer>
          <TimesheetPick
            name='input'
            value={state.input}
            onChange={handleChange}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Option value='true' selected>
              Wybierz lekarza
            </Option>
            {usersToDisplay.map((user) => (
              <Option value={user._id}>
                {user.imie} {user.nazwisko}
              </Option>
            ))}
          </TimesheetPick>
        </TimesheetPickContainer>
        {state.input && (
          <TimesheetContainer
            style={typeof state.timesheet === 'string' ? enabled : disabled}
          >
            <TimesheetDaysContainer
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {daysOfWeek.map((day) => (
                <Day>{day}</Day>
              ))}
            </TimesheetDaysContainer>
            <TimesheetWrap>
              <TimesheetHoursContainer
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {doctors
                  .filter((doctor) => doctor.doctorId === state.input)[0]
                  .godzinyPracy.map((hour) => (
                    <Hour>{hour}</Hour>
                  ))}
              </TimesheetHoursContainer>

              <Timesheet
                variants={container}
                initial='hidden'
                animate='visible'
              >
                {doctors
                  .filter((doctor) => doctor.doctorId === state.input)[0]
                  .godzinyPracy.map((hour) => (
                    <VisitRow variants={itemOne}>
                      <Visit></Visit>
                      <Visit></Visit>
                      <Visit available></Visit>
                      <Visit></Visit>
                      <Visit></Visit>
                    </VisitRow>
                  ))}
              </Timesheet>
            </TimesheetWrap>
          </TimesheetContainer>
        )}
      </TimesheetPageContainer>

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
      <TimesheetLegend>
        <LegendItemWrap>
          <CircleFree
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              damping: 3,
              stiffness: 150,
            }}
          />
          <LegendText
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Wolny termin
          </LegendText>
        </LegendItemWrap>
        <LegendItemWrap>
          <CircleReserved
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              damping: 3,
              stiffness: 150,
            }}
          />
          <LegendText
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Zarezerwowany termin
          </LegendText>
        </LegendItemWrap>
        <LegendItemWrap>
          <CircleActive
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              damping: 3,
              stiffness: 150,
            }}
          />
          <LegendText
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Zaznaczony termin
          </LegendText>
        </LegendItemWrap>
      </TimesheetLegend>
    </PageWrapper>
  )
}

export default DoctorTimesheetPage
