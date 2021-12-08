import http from '../http-common'

const getAll = () => {
  return http.get('/specializations')
}

const get = (id) => {
  return http.get(`/specializations/${id}`)
}

const create = (data) => {
  return http.post('/specializations', data)
}

const remove = (id) => {
  return http.delete(`/specializations/${id}`)
}

export default {
  getAll,
  get,
  create,
  remove,
}
