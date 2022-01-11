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

const AdminTimesheetPage = () => {
  const [state, setState] = useState({
    input: '',
    timesheet: true,
  })
  const [doctors, setDoctors] = useState([])
  const [users, setUsers] = useState([])
  const [visits, setVisits] = useState([])
  const daysOfWeek = ['Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek']
  const [week, setWeek] = useState([])

  useEffect(() => {
    retrieveDoctors()
    retrieveUsers()
    retrieveVisits()
    let curr = new Date()
    const daysOfWeek = ['Pon', 'Wt', 'Sr', 'Czw', 'Pt']
    let week = []

    for (let i = 1; i <= 5; i++) {
      let first = curr.getDate() - curr.getDay() + i
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(
        `${daysOfWeek[i - 1]}, ${day.split('-')[2]}.${day.split('-')[1]}.${
          day.split('-')[0]
        }`
      )
    }
    setWeek(week)
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

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const filteredUsers = users.filter((user) =>
    doctors.some((doctor) => doctor.doctorId === user._id)
  )

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
            Grafik
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
            {filteredUsers.map((user) => (
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
              {week.map((day) => (
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
                {/* {doctors
                  .filter((doctor) => doctor.doctorId === state.input)[0]
                  .godzinyPracy.map((hour) => (
                    <VisitRow variants={itemOne}>
                      <Visit></Visit>
                      <Visit></Visit>
                      <Visit available></Visit>
                      <Visit></Visit>
                      <Visit></Visit>
                    </VisitRow>
                  ))} */}
                {console.log('czy to id lekarza?', state.input)}
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

export default AdminTimesheetPage
