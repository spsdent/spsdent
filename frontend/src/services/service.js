import http from '../http-common'

const getAll = () => {
  return http.get('/services')
}

const get = (id) => {
  return http.get(`/services/${id}`)
}

const create = (data) => {
  return http.post('/services', data)
}

const update = (id, data) => {
  return http.put(`/services/${id}`, data)
}

const remove = (id) => {
  return http.delete(`/services/${id}`)
}

export default {
  getAll,
  get,
  create,
  remove,
  update,
}
