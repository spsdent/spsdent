import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  if (!currentUser) {
    return <Navigate to='/login' />
  }

  return (
    <div>
      <p>
        <strong>Imie:</strong> {currentUser.imie}
      </p>
      <p>
        <strong>Nazwisko:</strong> {currentUser.nazwisko}
      </p>
      <p>
        <strong>Telefon:</strong> {currentUser.telefon}
      </p>
      <p>
        <strong>Miasto:</strong> {currentUser.miasto}
      </p>
      <p>
        <strong>Ulica:</strong> {currentUser.ulica}
      </p>
      <p>
        <strong>Kod-pocztowy:</strong> {currentUser.kodPocztowy}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
    </div>
  )
}

export default Profile
