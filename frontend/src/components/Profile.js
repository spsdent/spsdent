import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  if (!currentUser) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <header>
        <h3>
          <strong>{currentUser.email}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
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
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  )
}

export default Profile
