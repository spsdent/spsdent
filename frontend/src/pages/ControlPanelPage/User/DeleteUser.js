import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { refreshApp } from '../../../store/actions/refresh'
import UserService from '../../../services/user'
import { PageWrapper } from '../../../components/PageWrapper'
import useDebounce from '../../../hooks/useDebounce'
import { SET_MESSAGE } from '../../../store/actions/types'
import { clearMessage } from '../../../store/actions/message'
import styled from 'styled-components'
import {
  StyledContainer,
  SubTitle,
  StyledInput,
  ErrorText,
  UserContainer,
  UserTextWrap,
  UserText,
  StyledButton,
} from '../ControlPanelPageElements'
import {
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from '../../VisitPage/VisitPageElements'
import DoctorService from '../../../services/doctor'
const DeleteUser = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [usersArr, setUsersArr] = useState([])
  const [doctorsArr, setDoctorsArr] = useState([])
  const [searchBySurname, setSearchBySurname] = useState('')
  const debouncedSearchTerm = useDebounce(searchBySurname, 500)
  const { isRefresh } = useSelector((state) => state.refresh)
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  useEffect(() => {
    retrieveUsers()
    retrieveDoctors()
  }, [isRefresh])

  const retrieveDoctors = () => {
    DoctorService.getAll()
      .then((response) => {
        setDoctorsArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        console.log('users', response.data)
        setUsersArr(response.data)
      })
      .catch((e) => console.log(e))
  }

  //

  const onUserDelete = (user) => {
    const { _id: userId } = user
    const doctorToDelete = doctorsArr.find(
      (doctor) => doctor.doctorId === userId
    )
    if (doctorToDelete) {
      DoctorService.remove(doctorToDelete._id)
        .then((res) => console.log('Usunięto pomyślnie', res))
        .catch((e) => console.log(e))
    }
    UserService.deleteUser(userId)
      .then((response) => {
        dispatch({ type: SET_MESSAGE, payload: 'Użytkownik został usunięty!' })
        dispatch(refreshApp())
        setIsDelete(false)
      })
      .catch((e) => console.log(e))
  }

  return (
    <StyledContainer>
      <SubTitle>Usuń użytkownika</SubTitle>
      <StyledInput
        type='text'
        placeholder='Wyszukaj po nazwisku'
        onChange={(e) => setSearchBySurname(e.target.value)}
        name='nazwisko'
      />
      {message && <ErrorText primary>{message}</ErrorText>}
      {debouncedSearchTerm && (
        <>
          {usersArr.filter((item) =>
            item.nazwisko
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
          ).length ? (
            <>
              {usersArr
                .filter((item) =>
                  item.nazwisko
                    .toLowerCase()
                    .includes(debouncedSearchTerm.toLowerCase())
                )
                .map((user) => (
                  <UserContainer key={user._id}>
                    <UserTextWrap>
                      <UserText primary>Imie:</UserText>{' '}
                      <UserText>{user.imie}</UserText>
                    </UserTextWrap>
                    <UserTextWrap>
                      <UserText primary>Nazwisko:</UserText>{' '}
                      <UserText>{user.nazwisko}</UserText>
                    </UserTextWrap>
                    <UserTextWrap>
                      <UserText primary>E-mail:</UserText>{' '}
                      <UserText>{user.email}</UserText>
                    </UserTextWrap>
                    <UserTextWrap>
                      <UserText primary>Telefon:</UserText>{' '}
                      <UserText>{user.telefon}</UserText>
                    </UserTextWrap>
                    <UserTextWrap>
                      <UserText primary>Miasto:</UserText>{' '}
                      <UserText>{user.miasto}</UserText>
                    </UserTextWrap>
                    <UserTextWrap>
                      <UserText primary>Ulica:</UserText>{' '}
                      <UserText>{user.ulica}</UserText>
                    </UserTextWrap>
                    <UserTextWrap primary>
                      <UserText primary>Kod-pocztowy:</UserText>{' '}
                      <UserText>{user.kodPocztowy}</UserText>
                    </UserTextWrap>

                    <StyledButton
                      onClick={() => {
                        dispatch(clearMessage())
                        setIsDelete(true)
                        setUserToDelete(user)
                      }}
                    >
                      Usuń
                    </StyledButton>
                  </UserContainer>
                ))}
            </>
          ) : (
            <ErrorText>Nie ma takiego użytkownika</ErrorText>
          )}
        </>
      )}
      {isDelete && (
        <ModalShadow>
          <ModalContainer>
            <ModalText>Na pewno chcesz usunąć?</ModalText>
            <ModalButtonsContainer>
              <ModalButton primary onClick={() => setIsDelete(false)}>
                Nie
              </ModalButton>
              <ModalButton
                onClick={() => {
                  onUserDelete(userToDelete)
                }}
              >
                Tak
              </ModalButton>
            </ModalButtonsContainer>
          </ModalContainer>
        </ModalShadow>
      )}
    </StyledContainer>
  )
}

export default DeleteUser
