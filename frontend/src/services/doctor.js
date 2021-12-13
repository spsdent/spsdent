import http from '../http-common'

const getAll = () => {
  return http.get('/doctors')
}

const get = (id) => {
  return http.get(`/doctors/${id}`)
}

const create = (data) => {
return http.post('/doctors', data)
}

const remove = (id) => {
  return http.delete(`/doctors/${id}`)
}

const update = (id, data) => {
  return http.put(`/doctors/${id}`, data)
}

// const update = 

export default {
  getAll,
  get,
  create,
  remove,
  update
}
