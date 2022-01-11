import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DoctorTimesheetPage from './DoctorTimesheet'
import AdminTimesheetPage from './AdminTimesheet'

const TimesheetPage = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [showSpecBoard, setShowSpecBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setShowSpecBoard(currentUser.roles.includes('ROLE_SPEC'))
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
    }
  }, [currentUser])

  return (
    <>
      {currentUser && (
        <>
          {showSpecBoard && <DoctorTimesheetPage />}
          {showAdminBoard && <AdminTimesheetPage />}
        </>
      )}
    </>
  )
}

export default TimesheetPage
