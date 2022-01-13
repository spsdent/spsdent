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

const DoctorTimesheetPage = () => {
  const [state, setState] = useState({
    input: '',
    timesheet: true,
  })
  const { user: currentUser } = useSelector((state) => state.auth)
  const [visits, setVisits] = useState([])
  const [isSelected, setIsSelected] = useState(false)
  const [selectedDoctorVisits, setSelectedDoctorVisits] = useState([])
  const daysOfWeek = ['Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek']
  const [week, setWeek] = useState([])
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16]
  const [firstDay, setFirstDay] = useState('')

  useEffect(() => {
    retrieveVisits()
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
      setVisits(response.data)
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
    let week = []
    for (let i = 1; i <= 5; i++) {
      let day = new Date(curr.setDate(firstDay - 7 + i))
        .toLocaleDateString('en-US')
        .slice(0, 10)
      week.push({
        dayOfWeek: `${daysOfWeek[i - 1]}`,
        data: `${day.split('/')[1]}.${day.split('/')[0]}.${day.split('/')[2]}`,
      })
    }
    setFirstDay(firstDay - 7)
    setWeek(week)
  }

  const onNextWeek = () => {
    let curr = new Date()
    let week = []
    for (let i = 1; i <= 5; i++) {
      let day = new Date(curr.setDate(firstDay + 7 + i))
        .toLocaleDateString('en-US')
        .slice(0, 10)
      week.push({
        dayOfWeek: `${daysOfWeek[i - 1]}`,
        data: `${day.split('/')[1]}.${day.split('/')[0]}.${day.split('/')[2]}`,
      })
    }
    setFirstDay(firstDay + 7)
    setWeek(week)
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
            <button onClick={onPreviousWeek}>Wcześniejszy tydzień</button>
            <button onClick={onNextWeek}>Następny tydzień</button>
            <TimesheetDaysContainer
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {week.map((day, i) => (
                <Day key={day.dayOfWeek}>{day.dayOfWeek}</Day>
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
                <VisitRow variants={itemOne}>
                  {week.map((day) => (
                    <React.Fragment key={day}>
                      {selectedDoctorVisits.find(
                        (visit) =>
                          visit.godzina === '8' && visit.data === day.data
                      ) ? (
                        <Visit
                          available
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        >
                          {
                            selectedDoctorVisits.find(
                              (visit) =>
                                visit.godzina === '8' && visit.data === day.data
                            ).usluga
                          }
                        </Visit>
                      ) : (
                        <Visit
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        ></Visit>
                      )}
                    </React.Fragment>
                  ))}
                </VisitRow>
                <VisitRow variants={itemOne}>
                  {week.map((day) => (
                    <React.Fragment key={day}>
                      {visits.length > 0 &&
                      selectedDoctorVisits.find(
                        (visit) =>
                          visit.godzina === '9' && visit.data === day.data
                      ) ? (
                        <Visit
                          available
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        >
                          {
                            selectedDoctorVisits.find(
                              (visit) =>
                                visit.godzina === '9' && visit.data === day.data
                            ).usluga
                          }
                        </Visit>
                      ) : (
                        <Visit
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        ></Visit>
                      )}
                    </React.Fragment>
                  ))}
                </VisitRow>
                <VisitRow variants={itemOne}>
                  {week.map((day) => (
                    <React.Fragment key={day}>
                      {selectedDoctorVisits.find(
                        (visit) =>
                          visit.godzina === '10' && visit.data === day.data
                      ) ? (
                        <Visit
                          available
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        >
                          {
                            selectedDoctorVisits.find(
                              (visit) =>
                                visit.godzina === '10' &&
                                visit.data === day.data
                            ).usluga
                          }
                        </Visit>
                      ) : (
                        <Visit
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        ></Visit>
                      )}
                    </React.Fragment>
                  ))}
                </VisitRow>
                <VisitRow variants={itemOne}>
                  {week.map((day) => (
                    <React.Fragment key={day}>
                      {selectedDoctorVisits.find(
                        (visit) =>
                          visit.godzina === '11' && visit.data === day.data
                      ) ? (
                        <Visit
                          available
                          selected={isSelected}
                          onClick={() => setIsSelected(!isSelected)}
                        >
                          {
                            selectedDoctorVisits.find(
                              (visit) =>
                                visit.godzina === '11' &&
                                visit.data === day.data
                            ).usluga
                          }
                        </Visit>
                      ) : (
                        <Visit
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        ></Visit>
                      )}
                    </React.Fragment>
                  ))}
                </VisitRow>
                <VisitRow variants={itemOne}>
                  {week.map((day) => (
                    <React.Fragment key={day}>
                      {selectedDoctorVisits.find(
                        (visit) =>
                          visit.godzina === '12' && visit.data === day.data
                      ) ? (
                        <Visit
                          available
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        >
                          {
                            selectedDoctorVisits.find(
                              (visit) =>
                                visit.godzina === '12' &&
                                visit.data === day.data
                            ).usluga
                          }
                        </Visit>
                      ) : (
                        <Visit
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        ></Visit>
                      )}
                    </React.Fragment>
                  ))}
                </VisitRow>
                <VisitRow variants={itemOne}>
                  {week.map((day) => (
                    <React.Fragment key={day}>
                      {selectedDoctorVisits.find(
                        (visit) =>
                          visit.godzina === '13' && visit.data === day.data
                      ) ? (
                        <Visit
                          available
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        >
                          {
                            selectedDoctorVisits.find(
                              (visit) =>
                                visit.godzina === '13' &&
                                visit.data === day.data
                            ).usluga
                          }
                        </Visit>
                      ) : (
                        <Visit
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        ></Visit>
                      )}
                    </React.Fragment>
                  ))}
                </VisitRow>
                <VisitRow variants={itemOne}>
                  {week.map((day) => (
                    <React.Fragment key={day}>
                      {selectedDoctorVisits.find(
                        (visit) =>
                          visit.godzina === '14' && visit.data === day.data
                      ) ? (
                        <Visit
                          available
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        >
                          {
                            selectedDoctorVisits.find(
                              (visit) =>
                                visit.godzina === '14' &&
                                visit.data === day.data
                            ).usluga
                          }
                        </Visit>
                      ) : (
                        <Visit
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        ></Visit>
                      )}
                    </React.Fragment>
                  ))}
                </VisitRow>
                <VisitRow variants={itemOne}>
                  {week.map((day) => (
                    <React.Fragment key={day}>
                      {selectedDoctorVisits.find(
                        (visit) =>
                          visit.godzina === '15' && visit.data === day.data
                      ) ? (
                        <Visit
                          available
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        >
                          {
                            selectedDoctorVisits.find(
                              (visit) =>
                                visit.godzina === '15' &&
                                visit.data === day.data
                            ).usluga
                          }
                        </Visit>
                      ) : (
                        <Visit
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        ></Visit>
                      )}
                    </React.Fragment>
                  ))}
                </VisitRow>
                <VisitRow variants={itemOne}>
                  {week.map((day) => (
                    <React.Fragment key={day}>
                      {selectedDoctorVisits.find(
                        (visit) =>
                          visit.godzina === '16' && visit.data === day.data
                      ) ? (
                        <Visit
                          available
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        >
                          {
                            selectedDoctorVisits.find(
                              (visit) =>
                                visit.godzina === '16' &&
                                visit.data === day.data
                            ).usluga
                          }
                        </Visit>
                      ) : (
                        <Visit
                          onClick={() => setIsSelected(!isSelected)}
                          selected={isSelected}
                        ></Visit>
                      )}
                    </React.Fragment>
                  ))}
                </VisitRow>
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
              left: '75%',
              top: '4.2em',
              zIndex: '999',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '25%',
                height: '100%',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2 style={{ marginBottom: '20px' }}>Wizyta</h2>
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
