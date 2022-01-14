import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
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

const DoctorTimesheetPage = () => {
  const [state, setState] = useState({
    input: '',
    timesheet: true,
  })
  const { user: currentUser } = useSelector((state) => state.auth)
  const [isSelected, setIsSelected] = useState(false)
  const [selectedDoctorVisits, setSelectedDoctorVisits] = useState([])
  const daysOfWeek = ['Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek']
  const [week, setWeek] = useState([])
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16]
  const [firstDay, setFirstDay] = useState('')
  const [selectedVisit, setSelectedVisit] = useState(null)

  useEffect(() => {
    retrieveVisits()
  }, [])

  useEffect(() => {
    let curr = new Date()
    let week = []

    let first = curr.getDate() - curr.getDay()
    setFirstDay(first)
    for (let i = 1; i <= 5; i++) {
      let day = new Date(curr.setDate(first + i))
        .toLocaleDateString('en-US')
        .slice(0, 10)
      week.push({
        dayOfWeek: `${daysOfWeek[i - 1]}`,
        data: `${day.split('/')[1]}.${day.split('/')[0]}.${day.split('/')[2]}`,
      })
    }
    setWeek(week)
  }, [])

  const retrieveVisits = () => {
    VisitData.getAll().then((response) => {
      const visitsArr = response.data.filter(
        (visit) => visit.specjalista.sid === currentUser.id
      )
      setSelectedDoctorVisits(visitsArr)
    })
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

  const onPreviousWeek = () => {
    let curr = new Date()
    let updateWeek = []
    for (let i = 1; i <= 5; i++) {
      let day = new Date(curr.setDate(firstDay - 7 + i))
        .toLocaleDateString('en-US')
        .slice(0, 10)
      updateWeek.push({
        dayOfWeek: `${daysOfWeek[i - 1]}`,
        data: `${day.split('/')[1]}.${day.split('/')[0]}.${day.split('/')[2]}`,
      })
    }
    setWeek(updateWeek)
    setFirstDay(firstDay - 7)
  }

  const onNextWeek = () => {
    let curr = new Date()
    let updateWeek = []
    for (let i = 1; i <= 5; i++) {
      let day = new Date(curr.setDate(firstDay + 7 + i))
        .toLocaleDateString('en-US')
        .slice(0, 10)
      updateWeek.push({
        dayOfWeek: `${daysOfWeek[i - 1]}`,
        data: `${day.split('/')[1]}.${day.split('/')[0]}.${day.split('/')[2]}`,
      })
    }
    setFirstDay(firstDay + 7)
    setWeek(updateWeek)
  }

  const checkIfExists = (hour, day) => {
    return selectedDoctorVisits.find(
      (visit) => visit.godzina === `${hour}` && visit.data === day.data
    )
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
            Grafik
          </TimesheetTitle>
        </TimesheetTitleContainer>
        {selectedDoctorVisits.length > 0 && (
          <TimesheetContainer style={state.timesheet ? enabled : disabled}>
            <button onClick={onPreviousWeek}>Poprzedni tydzień</button>
            <button onClick={onNextWeek}>Następny tydzień</button>
            <TimesheetDaysContainer
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {week.map((day, i) => (
                <Day key={i}>{day.dayOfWeek}</Day>
              ))}
            </TimesheetDaysContainer>
            <TimesheetWrap>
              <TimesheetHoursContainer
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {hours.map((hour) => (
                  <Hour>{hour}</Hour>
                ))}
              </TimesheetHoursContainer>
              <Timesheet
                variants={container}
                initial='hidden'
                animate='visible'
              >
                {hours.map((hour) => (
                  <VisitRow variants={itemOne} key={hour}>
                    {week.map((day, i) => (
                      <React.Fragment key={i}>
                        {checkIfExists(hour, day) ? (
                          <Visit
                            available
                            onClick={() => {
                              setIsSelected(!isSelected)
                              setSelectedVisit(checkIfExists(hour, day))
                            }}
                          >
                            {checkIfExists(hour, day).usluga}
                          </Visit>
                        ) : (
                          <Visit
                            onClick={() => {
                              setIsSelected(!isSelected)
                              setSelectedVisit(null)
                            }}
                          ></Visit>
                        )}
                      </React.Fragment>
                    ))}
                  </VisitRow>
                ))}
              </Timesheet>
            </TimesheetWrap>
          </TimesheetContainer>
        )}
        {isSelected && (
          <div
            style={{
              width: '100vw',
              height: 'calc(100vh - 4.2em)',
              position: 'absolute',
              left: '73%',
              top: '4.2em',
              zIndex: '999',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '400px',
                height: '100%',
                padding: '0 20px',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {console.log(selectedVisit)}
              {selectedVisit !== null ? (
                <>
                  <h2 style={{ marginBottom: '20px' }}>Podsumowanie</h2>
                  <div
                    style={{
                      position: 'relative',
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                      }}
                    >
                      <h3>Twoje dane</h3>
                      <p>
                        {selectedVisit.imie} {selectedVisit.nazwisko}
                      </p>
                      <p>{selectedVisit.email}</p>
                      <p>{selectedVisit.telefon}</p>
                      <p>{selectedVisit.miasto}</p>
                      <p>{selectedVisit.ulica}</p>
                      <p>{selectedVisit.kodPocztowy}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                      }}
                    >
                      <h3>Umówiona wizyta</h3>
                      <p>{selectedVisit.grupa}</p>
                      <p>{selectedVisit.usluga}</p>
                      <p>{selectedVisit.data}r.</p>
                      <p>{selectedVisit.godzina}:00</p>
                    </div>
                  </div>
                </>
              ) : (
                <h2>Tutaj bedzie formularz do rezerwacji wizyty</h2>
              )}
            </div>
          </div>
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
