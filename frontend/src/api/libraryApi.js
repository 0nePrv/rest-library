import axios from 'axios';

export const libraryApi = (resource = 'book') => {

  const fetchData = async ({
    method = 'GET',
    pathVar = '',
    params = {},
    payload = {}
  }) => {
    const url = `/api/${resource}${pathVar === '' ? '' : '/' + pathVar}`
    console.log('REQUEST:', method, url, params, payload)
    const response = await axios({
      url, method, params, data: payload
    })
    console.log('RESPONSE:', response)
    return response.data
  }

  const getAll = ({params = {}}) => fetchData(
      {method: 'GET', params})
  const get = ({pathVar, params = {}}) => fetchData(
      {method: 'GET', pathVar, params})
  const create = ({payload, params = {}}) => fetchData(
      {method: 'POST', params, payload})
  const update = ({pathVar, payload, params = {}}) => fetchData(
      {method: 'PUT', pathVar, params, payload})
  const remove = ({pathVar, params = {}}) => fetchData(
      {method: 'DELETE', pathVar, params})

  return {create, getAll, get, update, remove}
}
