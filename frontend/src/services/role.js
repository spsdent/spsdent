import http from '../http-common'

const getAll = () => {
  return http.get('/roles')
}

const role = {
  getAll,
}

export default role
