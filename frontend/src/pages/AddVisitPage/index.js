import React from 'react'
import { useSelector } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'

import AddVisitAuthUser from './AddVisitAuthUser'
import AddVisitAdmin from './AddVisitAdmin'
import AddVisitNonAuth from './AddVisitNonAuth'

const AddVisitPage = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  return (
    <>
      {currentUser &&
        currentUser.roles[currentUser.roles.length - 1] === 'ROLE_ADMIN' && (
          <AddVisitAdmin />
        )}
      {currentUser &&
        currentUser.roles[currentUser.roles.length - 1] === 'ROLE_USER' && (
          <AddVisitAuthUser />
        )}
      {!currentUser && <AddVisitNonAuth />}
    </>
  )
}

export default AddVisitPage
