import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { refreshApp } from '../../../store/actions/refresh'
import UserService from '../../../services/user'
import { PageWrapper } from '../../../components/PageWrapper'
import { Container } from '../../ProfilePage/ProfilePageElements'
import useDebounce from '../../../hooks/useDebounce'

const styles = {
  inputStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    cursor: 'pointer',
  },
  selectStyle: {
    backgroundColor: 'transparent',
    border: '2px solid #333',
    height: '3em',
    margin: '10px 0',
    paddingLeft: '1em',
  },
  errorStyle: { color: 'red' },
}

const DeleteUser = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [usersArr, setUsersArr] = useState([])
  const [searchBySurname, setSearchBySurname] = useState('')
  const debouncedSearchTerm = useDebounce(searchBySurname, 500)
  const { isRefresh } = useSelector((state) => state.refresh)
  const dispatch = useDispatch()

  useEffect(() => {
    retrieveUsers()
  }, [isRefresh])

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
    UserService.deleteUser(userId)
      .then((response) => {
        console.log(response.data)
        dispatch(refreshApp())
        setIsDelete(false)
      })
      .catch((e) => console.log(e))
  }

  return (
    <PageWrapper>
      <Container>
        <h1>Usun uzytkownika</h1>
        <input
          type='text'
          placeholder='Wyszukaj po nazwisku'
          onChange={(e) => setSearchBySurname(e.target.value)}
          name='nazwisko'
          style={styles.inputStyle}
        />
        {debouncedSearchTerm ? (
          <>
            {usersArr.filter(
              (item) =>
                item.nazwisko.toLowerCase() ===
                debouncedSearchTerm.toLowerCase()
            ).length ? (
              <>
                {usersArr
                  .filter(
                    (item) =>
                      item.nazwisko.toLowerCase() ===
                      debouncedSearchTerm.toLowerCase()
                  )
                  .map((user) => (
                    <div
                      style={{
                        width: '350px',
                        display: 'flex',
                        backgroundColor: 'transparent',
                        marginBottom: '20px',
                        padding: '10px',
                        border: '2px solid #333',
                        color: '#333',
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
                      <button
                        onClick={() => {
                          setIsDelete(true)
                          setUserToDelete(user)
                        }}
                        style={styles.buttonStyle}
                      >
                        Usun
                      </button>
                    </div>
                  ))}
              </>
            ) : (
              <p>Nie ma takiego użytkownika</p>
            )}
          </>
        ) : (
          <>
            {usersArr.length ? (
              <>
                {usersArr.map((user) => (
                  <div
                    style={{
                      width: '350px',
                      display: 'flex',
                      backgroundColor: 'transparent',
                      marginBottom: '20px',
                      padding: '10px',
                      border: '2px solid #333',
                      color: '#333',
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
                    <button
                      onClick={() => {
                        setIsDelete(true)
                        setUserToDelete(user)
                      }}
                      style={styles.buttonStyle}
                    >
                      Usun
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p>Brak uzytkownikow do wyswietlenia</p>
              </>
            )}
          </>
        )}
        {isDelete && (
          <div
            style={{
              width: '100vw',
              height: '100vh',
              position: 'absolute',
              left: '0',
              top: '0',
              bottom: '0',
              backgroundColor: 'rgba(3,3,3,.5)',
              zIndex: '999',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '50%',
                height: '50%',
                backgroundColor: '#fff',
                left: '0',
                right: '0',
                top: '25%',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2 style={{ marginBottom: '20px' }}>Na pewno chcesz usunąć</h2>
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #333',
                    padding: '.75em 50px',
                    marginRight: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsDelete(false)}
                >
                  Nie
                </button>
                <button
                  style={{
                    backgroundColor: '#01d4bf',
                    border: '2px solid transparent',
                    padding: '.75em 50px',
                    marginLeft: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    onUserDelete(userToDelete)
                  }}
                >
                  Tak
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </PageWrapper>
  )
}

export default DeleteUser
