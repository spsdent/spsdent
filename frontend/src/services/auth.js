import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'

const register = (
  imie,
  nazwisko,
  telefon,
  miasto,
  ulica,
  kodPocztowy,
  email,
  password
) => {
  return axios.post(API_URL + 'signup', {
    imie,
    nazwisko,
    telefon,
    miasto,
    ulica,
    kodPocztowy,
    email,
    password,
  })
}

const login = (email, password) => {
  return axios
    .post(API_URL + 'signin', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
}

const passwordChange = (data) => {
  return axios.post(API_URL + 'passwordchange', data)
}

const logout = () => {
  localStorage.removeItem('user')
}

const auth = {
  register,
  login,
  logout,
  passwordChange,
}

export default auth
