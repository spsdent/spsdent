import http from '../http-common'

const getAll = () => {
  return http.get('/roles')
}

export default {
  getAll,
}
