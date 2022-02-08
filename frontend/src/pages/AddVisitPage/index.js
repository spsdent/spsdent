import React from 'react'
import { useSelector } from 'react-redux'

import AddVisitAuthUser from './AddVisitAuthUser'
import AddVisitNonAuth from './AddVisitNonAuth'

const AddVisitPage = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  return (
    <>
      {!currentUser && <AddVisitNonAuth />}
      {currentUser && currentUser.roles.includes('ROLE_USER') && (
        <AddVisitAuthUser />
      )}
    </>
  )
}

export default AddVisitPage
