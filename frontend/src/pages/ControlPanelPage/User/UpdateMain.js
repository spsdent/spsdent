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
import styled from 'styled-components'
import {
  StyledButton,
  StyledContainer,
  StyledButtonContainer,
} from '..//ControlPanelPageElements'

const StyledButtonData = styled(StyledButton)`
  border: ${({ btnType }) => (btnType === 'dane' ? 'none' : '2px solid #333')};
  background-color: ${({ btnType }) =>
    btnType === 'dane' ? '#01D4BF' : 'transparent'};
`
const StyledButtonPerm = styled(StyledButton)`
  border: ${({ btnType }) =>
    btnType === 'uprawnienia' ? 'none' : '2px solid #333'};
  background-color: ${({ btnType }) =>
    btnType === 'uprawnienia' ? '#01D4BF' : 'transparent'};
`

const StyledLabel = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`

const StyledSelect = styled(Select)`
  width: 100%;
`

const UpdateUser = (props) => {
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
    <StyledContainer>
      <StyledLabel>Wybierz użytkownika</StyledLabel>
      <StyledSelect
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
        <StyledButtonContainer>
          <StyledButtonData
            btnType={btnType}
            onClick={() => {
              dispatch(clearMessage())
              onDataChange('dane')
            }}
          >
            Zmień dane
          </StyledButtonData>
          <StyledButtonPerm
            btnType={btnType}
            onClick={() => {
              dispatch(clearMessage())
              onDataChange('uprawnienia')
            }}
          >
            Zmień uprawnienia
          </StyledButtonPerm>
        </StyledButtonContainer>
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
    </StyledContainer>
  )
}

export default UpdateUser
