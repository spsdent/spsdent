import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import DoctorService from '../../../services/doctor'
import UserService from '../../../services/user'
import RoleService from '../../../services/role'
import ServiceData from '../../../services/service'
import UpdatePermissions from './UpdatePermissions'
import UpdateData from './UpdateData'
import { clearMessage } from '../../../store/actions/message'

const UpdateUser = () => {
  let initialState = {
    userId: '',
    imie: '',
    nazwisko: '',
    telefon: '',
    email: '',
    miasto: '',
    ulica: '',
    kodPocztowy: '',
    roles: [{}],
    doctorId: '',
    specjalnosci: [],
    godzinyStart: '',
    godzinyKoniec: '',
  }
  const [doctorsArr, setDoctorsArr] = useState([])
  const [usersArr, setUsersArr] = useState([])
  const [rolesArr, setRolesArr] = useState([])
  const [specsArr, setSpecsArr] = useState([])
  const [btnType, setBtnType] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const { isRefresh } = useSelector((state) => state.refresh)
  const { user: currentUser } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  useEffect(() => {
    retrieveUsers()
    retrieveDoctors()
    retrieveRoles()
    retrieveSpecs()
  }, [isRefresh])

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        setUsersArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveDoctors = () => {
    DoctorService.getAll()
      .then((response) => {
        setDoctorsArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveRoles = () => {
    RoleService.getAll()
      .then((response) => {
        setRolesArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveSpecs = () => {
    ServiceData.getAll()
      .then((response) => {
        setSpecsArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const onDataChange = (type, userInfo) => {
    if (btnType === type) {
      setBtnType('')
    } else {
      setBtnType(type)
    }
  }

  return (
    <>
      <label>Wybierz uzytkownika</label>
      <Select
        isClearable
        defaultValue={selectedUser}
        onChange={(value) => {
          setSelectedUser(value)
          if (!value) {
            setBtnType('')
          }
        }}
        options={usersArr.map((user) => ({
          value: user._id,
          label: `${user.imie} ${user.nazwisko}`,
        }))}
      />
      {selectedUser && (
        <div style={{ width: '100%', display: 'flex', marginTop: '20px' }}>
          <button
            style={{
              width: '100%',
              height: '40px',
              border: btnType === 'dane' ? 'none' : '2px solid #333',
              background: btnType === 'dane' ? '#01D4BF' : 'transparent',
              fontSize: '14px',
              cursor: 'pointer',
              marginRight: '10px',
              padding: '10px',
            }}
            onClick={() => {
              dispatch(clearMessage())
              onDataChange('dane')
            }}
          >
            Zmien dane
          </button>
          <button
            style={{
              width: '100%',
              height: '40px',
              border: btnType === 'uprawnienia' ? 'none' : '2px solid #333',
              background: btnType === 'uprawnienia' ? '#01D4BF' : 'transparent',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '10px',
            }}
            onClick={() => {
              dispatch(clearMessage())
              onDataChange('uprawnienia')
            }}
          >
            Zmien uprawnienia
          </button>
        </div>
      )}
      {message && (
        <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
      )}
      {btnType === 'dane' && (
        <UpdateData
          setBtnType={setBtnType}
          selectedUser={selectedUser && selectedUser.value}
        />
      )}
      {btnType === 'uprawnienia' && (
        <UpdatePermissions
          setBtnType={setBtnType}
          selectedUser={selectedUser && selectedUser.value}
        />
      )}
    </>
  )
}

export default UpdateUser
