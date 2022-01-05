import { useState, useEffect } from 'react'
import UserData from '../services/user'

export default function useFetchAllUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    UserData.getAll()
      .then((response) => {
        setUsers(response.data)
      })
      .catch((e) => console.log('Errors in retrieveUsers'))
  }, [])

  return users
}
