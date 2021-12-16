import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form } from 'formik'

import { refreshApp } from '../../store/actions/refresh'
import DoctorService from '../../services/doctor'
import UserService from '../../services/user'

const DeleteDoctor = () => {
  const [doctorsArr, setDoctorsArr] = useState([])
  const [usersArr, setUsersArr] = useState([])
  const { isRefresh } = useSelector((state) => state.refresh)
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    retrieveUsers()
    retrieveDoctors()
  }, [isRefresh])

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        console.log('users', response.data)
        setUsersArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveDoctors = () => {
    DoctorService.getAll()
      .then((response) => {
        // console.log(response.data)
        setDoctorsArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const onUserDelete = (user) => {
    const { _id: userId } = user
    UserService.deleteUser(userId)
      .then((response) => {
        console.log(response.data)
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
  }

  return (
    <>
      <h1>Usun uzytkownika</h1>
      {usersArr.map((user) => (
        <div
          style={{
            width: '350px',
            display: 'flex',
            backgroundColor: '#333',
            marginBottom: '20px',
            padding: '10px',
            color: '#fff',
            flexDirection: 'column',
          }}
          key={user._id}
        >
          <p>Imie: {user.imie}</p>
          <p>Nazwisko: {user.nazwisko}</p>
          <p>E-mail: {user.email}</p>
          <p>Telefon: {user.telefon}</p>
          <p>Miasto: {user.miasto}</p>
          <p>Ulica: {user.ulica}</p>
          <p>Kod-pocztowy: {user.kodPocztowy}</p>
          <button onClick={() => onUserDelete(user)}>Usun</button>
        </div>
      ))}
    </>
  )
}

export default DeleteDoctor
