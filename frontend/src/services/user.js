import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/'

const getPublicContent = () => {
  return axios.get(API_URL + 'test/all')
}

const getUsersByLastName = (nazwisko) => {
  return axios.get(API_URL + `users/${nazwisko}`, {
    headers: authHeader(),
  })
}

const getAll = () => {
  return axios.get(API_URL + 'users', {
    headers: authHeader(),
  })
}

const deleteUser = (id) => {
  return axios.delete(API_URL + `users/${id}`, { headers: authHeader() })
}

const updateUser = (id, data) => {
  return axios.put(API_URL + `users/${id}`, data, { headers: authHeader() })
}

const user = {
  getPublicContent,
  getUsersByLastName,
  getAll,
  deleteUser,
  updateUser,
}

export default user
