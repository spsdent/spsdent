import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/'

const getPublicContent = () => {
  return axios.get(API_URL + 'test/all')
}

const getAllUsers = (nazwisko) => {
  return axios.get(API_URL + `users/${nazwisko}`, {
    headers: authHeader(),
  })
}

const getUserBoard = () => {
  return axios.get(API_URL + 'test/user', { headers: authHeader() })
}

const getSpecBoard = () => {
  return axios.get(API_URL + 'test/spec', { headers: authHeader() })
}

const getAdminBoard = () => {
  return axios.get(API_URL + 'test/admin', { headers: authHeader() })
}

export default {
  getPublicContent,
  getUserBoard,
  getSpecBoard,
  getAdminBoard,
  getAllUsers,
}
