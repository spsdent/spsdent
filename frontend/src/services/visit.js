import http from '../http-common'

const getAll = () => {
  return http.get('/visits')
}

const get = (id) => {
  return http.get(`/visits/${id}`)
}

const create = (data) => {
  return http.post('/visits', data)
}

const update = (id, data) => {
  return http.put(`/visits/${id}`, data)
}

const remove = (id) => {
  return http.delete(`/visits/${id}`)
}

const removeAll = () => {
  return http.delete(`/visits`)
}

const findByTitle = (title) => {
  return http.get(`/visits?title=${title}`)
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
}
